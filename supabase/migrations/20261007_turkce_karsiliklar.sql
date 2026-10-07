-- Tüm 1463 kelimenin Türkçe karşılığı (words.tr) tamamlandı (veri doğrudan tabloya yazıldı).
-- p_next artık Türkçe karşılığı da döndürür; words_pack() tüm kelime paketini giriş yapmış kullanıcıya verir
-- (çevrimdışı alıştırma ve kelime defterindeki Türkçe karşılıklar için).
create or replace function public.p_next(_l integer) returns jsonb language plpgsql security definer set search_path=public as $$
declare u uuid := auth.uid(); r public.pruns; w public.words; sn int[];
begin
  if u is null then raise exception 'giris'; end if;
  if _l is null or _l not between 0 and 3 then raise exception 'gecersiz'; end if;
  insert into pruns(user_id, lvl) values (u, _l) on conflict (user_id) do nothing;
  select * into r from pruns where user_id = u for update;
  if r.word_id is not null and r.lvl = _l then
    select * into w from words where id = r.word_id;
  else
    sn := case when r.lvl = _l then r.seen else '{}'::int[] end;
    select * into w from words where lvl = _l and not (id = any(sn)) order by random() limit 1;
    if not found then sn := '{}'::int[]; select * into w from words where lvl = _l order by random() limit 1; end if;
    if w.id is null then raise exception 'kelime yok'; end if;
    update pruns set lvl = _l, word_id = w.id, guesses = '{}', hint = false, seen = array_append(sn, w.id), last_at = clock_timestamp() where user_id = u;
    r.guesses := '{}';
  end if;
  return jsonb_build_object('def', w.def, 'tr', w.tr, 'len', length(w.word), 'tries', 5, 'lvl', w.lvl,
    'guesses', coalesce((select jsonb_agg(jsonb_build_object('w', x, 's', eval_guess(x, w.word)) order by o) from unnest(r.guesses) with ordinality as t(x, o)), '[]'::jsonb));
end $$;
create or replace function public.words_pack() returns jsonb language plpgsql stable security definer set search_path=public as $$
begin
  if auth.uid() is null then raise exception 'giris'; end if;
  return coalesce((select jsonb_agg(jsonb_build_array(lvl, word, def, tr, ex) order by lvl, id) from words), '[]'::jsonb);
end $$;
revoke execute on function public.words_pack() from anon, public;
grant execute on function public.words_pack() to authenticated;
