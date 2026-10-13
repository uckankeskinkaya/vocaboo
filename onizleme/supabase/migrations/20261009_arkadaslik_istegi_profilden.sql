-- Profilden arkadaşlık isteği: kullanıcı adıyla. Karşı taraf zaten istek göndermişse otomatik kabul olur.
create or replace function public.friend_request(_u text)
 returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare u uuid := auth.uid(); t uuid; nm text;
begin
  if u is null then raise exception 'giris'; end if;
  select id, username into t, nm from profiles where username = lower(btrim(_u)) and not coalesce(banned, false);
  if t is null then return jsonb_build_object('err', 'yok'); end if;
  if t = u then return jsonb_build_object('err', 'kendin'); end if;
  if exists (select 1 from friendships where a = t and b = u and not blk) then
    update friendships set ok = true where a = t and b = u;
    return jsonb_build_object('ok', 'kabul', 'n', nm);
  end if;
  if exists (select 1 from friendships where (a = u and b = t) or (a = t and b = u)) then return jsonb_build_object('err', 'zaten'); end if;
  if (select count(*) from friendships where a = u and not ok) >= 20 then return jsonb_build_object('err', 'cok istek'); end if;
  insert into friendships(a, b) values (u, t);
  return jsonb_build_object('ok', 'istek', 'n', nm);
end $$;
revoke all on function public.friend_request(text) from public, anon;
grant execute on function public.friend_request(text) to authenticated;

-- Profil görüntülemeye kullanıcı kimliği ve ilişki durumu: friend | sent | incoming | none
create or replace function public.profile_view(_u text)
 returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare p public.profiles; u uuid := auth.uid(); rel text := 'none'; f public.friendships;
begin
  if u is null then raise exception 'giris'; end if;
  select * into p from profiles where username = lower(btrim(_u)) and not coalesce(banned, false);
  if not found then return null; end if;
  select * into f from friendships where (a = u and b = p.id) or (a = p.id and b = u) limit 1;
  if found and not coalesce(f.blk, false) then
    rel := case when f.ok then 'friend' when f.a = u then 'sent' else 'incoming' end;
  end if;
  return jsonb_build_object('id', p.id, 'rel', rel, 'username', p.username, 'avatar', p.avatar, 'frame', p.frame, 'xp', p.xp,
    'words_solved', p.words_solved, 'words_failed', p.words_failed, 'first_try', p.first_try,
    'best_score', p.best_score, 'best_streak', p.best_streak, 'best_daily_streak', p.best_daily_streak,
    'daily_streak', case when p.last_daily >= (now() at time zone 'Europe/Istanbul')::date - 1 then p.daily_streak else 0 end,
    'daily_wins', p.daily_wins, 'weekly_wins', p.weekly_wins, 'weekly_podiums', p.weekly_podiums,
    'joined', p.created_at, 'teacher', coalesce(p.teacher, false), 'cls', coalesce(p.cls, false), 'me', p.id = u,
    'on', coalesce(p.last_seen > now() - interval '45 seconds', false));
end $$;
revoke all on function public.profile_view(text) from public, anon;
grant execute on function public.profile_view(text) to authenticated;
