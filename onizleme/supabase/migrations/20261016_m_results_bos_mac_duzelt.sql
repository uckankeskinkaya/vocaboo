-- Hata: 1v1'de kurucunun canlı skor sorgusu (m_results) oyuncular katılmadan önce gelirse maç "bitti" sayılıp ödüllendiriliyor,
-- sonra m_join 'yok' döndürüp "Maça katılınamadı" çıkıyordu. Artık hiç oyuncu yokken maç kapanmaz.
create or replace function public.m_results(_room text) returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare u uuid := auth.uid(); m public.matches; left_n int; dl boolean; tot int;
begin
  if u is null then raise exception 'giris'; end if;
  select * into m from matches where room = upper(_room) and created > now() - interval '3 hours' order by created desc limit 1 for update;
  if not found then return null; end if;
  if not exists (select 1 from match_players where match_id = m.id and user_id = u) and m.host <> u then return null; end if;
  select count(*) into tot from match_players where match_id = m.id;
  if not m.awarded and tot > 0 then
    select count(*) into left_n from match_players where match_id = m.id and not fin;
    dl := (m.mode = 's' and (select max(end_at) from match_players where match_id = m.id) < now() - interval '30 seconds')
       or (m.mode = 'c' and (select min(joined) from match_players where match_id = m.id) < now() - interval '15 minutes');
    if left_n = 0 or coalesce(dl, false) then
      update match_players set fin = true where match_id = m.id;
      perform m_award(m.id);
      update matches set awarded = true where id = m.id;
      m.awarded := true;
    end if;
  end if;
  select count(*) into left_n from match_players where match_id = m.id and not fin;
  return jsonb_build_object('done', m.awarded, 'left', left_n, 'mode', m.mode,
    'players', coalesce((select jsonb_agg(jsonb_build_object('u', p.username, 'im', p.avatar, 'fr', p.frame, 'sc', mp.score, 'w', mp.solved,
        'ng', mp.ng, 'f', mp.fin, 'a', mp.alive, 'xp', mp.xp, 'me', mp.user_id = u)
        order by (case when m.mode = 's' then mp.solved else mp.score end) desc, mp.score desc, mp.joined)
      from match_players mp join profiles p on p.id = mp.user_id where mp.match_id = m.id), '[]'::jsonb));
end $$;
