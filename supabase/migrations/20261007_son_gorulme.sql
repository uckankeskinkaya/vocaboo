-- Arkadaş ve sınıf listesine "en son ne zaman çevrimiçiydi" bilgisi: 'ls' = last_seen'den bu yana saniye (sunucu saatiyle; yoksa null).
create or replace function public.friend_list() returns jsonb language plpgsql security definer set search_path=public as $$
declare u uuid := auth.uid();
begin
  if u is null then raise exception 'giris'; end if;
  return jsonb_build_object('code', friend_code(),
    'friends', coalesce((select jsonb_agg(jsonb_build_object('id', p.id, 'u', p.username, 'im', p.avatar, 'fr', p.frame, 'bs', p.best_score, 'ws', p.words_solved, 'xp', p.xp, 'c', p.cls,
        'on', coalesce(p.last_seen > now() - interval '45 seconds', false),
        'ls', case when p.last_seen is null then null else greatest(0, extract(epoch from (now() - p.last_seen))::bigint) end)
        order by coalesce(p.last_seen > now() - interval '45 seconds', false) desc, p.last_seen desc nulls last, p.username)
      from friendships f join profiles p on p.id = (case when f.a = u then f.b else f.a end) where f.ok and (f.a = u or f.b = u)), '[]'::jsonb),
    'incoming', coalesce((select jsonb_agg(jsonb_build_object('id', p.id, 'u', p.username, 'im', p.avatar, 'fr', p.frame))
      from friendships f join profiles p on p.id = f.a where f.b = u and not f.ok and not f.blk), '[]'::jsonb));
end $$;

create or replace function public.class_list() returns jsonb language plpgsql security definer set search_path=public as $$
begin
  if auth.uid() is null then raise exception 'giris'; end if;
  if not coalesce((select cls from profiles where id = auth.uid()), false) then return '[]'::jsonb; end if;
  return coalesce((select jsonb_agg(jsonb_build_object('id', id, 'u', username, 'im', avatar, 'fr', frame, 'bs', best_score, 'ws', words_solved, 'xp', xp,
    'on', coalesce(last_seen > now() - interval '45 seconds', false),
    'ls', case when last_seen is null then null else greatest(0, extract(epoch from (now() - last_seen))::bigint) end)
    order by coalesce(last_seen > now() - interval '45 seconds', false) desc, best_score desc) from profiles where cls), '[]'::jsonb);
end $$;
