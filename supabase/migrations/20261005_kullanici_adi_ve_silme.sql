-- Kullanıcı adı değiştirme (profil) ve kullanıcı silme (admin paneli).
-- Giriş e-postası "kullaniciadi@kelimeavi.app" biçiminde olduğu için ad değişince giriş kaydı (auth) da güncellenir.
-- auth şemasına yazdığı için Supabase SQL Editor'de çalıştırılır.
-- Geri dönüş: supabase/GERI_DONUS.sql dosyasının sonundaki bölüm.

-- 1) Ad değişikliği kaydı: günde bir değişiklik sınırı için. API'den erişilemez.
create table if not exists public.username_log (
  id bigint generated always as identity primary key,
  user_id uuid not null,
  old_name text,
  new_name text,
  ts timestamptz not null default now()
);
create index if not exists username_log_user_ts on public.username_log (user_id, ts desc);
alter table public.username_log enable row level security;
revoke all on public.username_log from anon, authenticated;

-- 2) Kullanıcı adını değiştir (giriş yapmış kullanıcı kendi adını)
create or replace function public.set_username(_u text)
 returns text
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare uid uuid := auth.uid(); n text := lower(trim(coalesce(_u, ''))); old text; em text;
begin
  if uid is null then raise exception 'giris'; end if;
  select username into old from profiles where id = uid;
  if old is null then return 'yok'; end if;
  if n !~ '^[a-z0-9_]{3,16}$'
     or n in ('admin','hoca','teacher','ogretmen','vocaboo','moderator','kelimeavi','root','system','destek','support') then
    return 'gecersiz';
  end if;
  if n = old then return 'ayni'; end if;
  em := n || '@kelimeavi.app';
  if exists (select 1 from profiles where username = n)
     or exists (select 1 from auth.users where lower(email) = em) then
    return 'var';
  end if;
  if not is_admin() and exists (select 1 from username_log where user_id = uid and ts > now() - interval '24 hours') then
    return 'bekle';
  end if;
  begin
    update auth.users u set
      email = em,
      updated_at = now(),
      raw_user_meta_data = coalesce(u.raw_user_meta_data, '{}'::jsonb)
        || case when u.raw_user_meta_data ? 'username' then jsonb_build_object('username', n) else '{}'::jsonb end
        || case when u.raw_user_meta_data ? 'email' then jsonb_build_object('email', em) else '{}'::jsonb end
    where u.id = uid;
    update auth.identities set
      provider_id = em,
      identity_data = jsonb_set(coalesce(identity_data, '{}'::jsonb), '{email}', to_jsonb(em)),
      updated_at = now()
    where user_id = uid and provider = 'email';
    update profiles set username = n where id = uid;
  exception when unique_violation then
    return 'var';
  end;
  insert into username_log(user_id, old_name, new_name) values (uid, old, n);
  return 'ok';
end $function$;

revoke execute on function public.set_username(text) from public, anon;
grant  execute on function public.set_username(text) to authenticated;

-- 3) Kullanıcıyı sil (yalnızca yönetici; yönetici hesabı ve kendi hesabı silinemez)
create or replace function public.admin_user_delete(_id uuid)
 returns text
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare nm text; isadm boolean;
begin
  if not is_admin() then raise exception 'yetki yok'; end if;
  if _id = auth.uid() then return 'kendin'; end if;
  select username, admin into nm, isadm from profiles where id = _id;
  if nm is null then return 'yok'; end if;
  if isadm then return 'yonetici'; end if;
  -- Yabancı anahtarı olmayan bağlı kayıtlar
  delete from owned_items   where user_id = _id;
  delete from xp_log        where user_id = _id;
  delete from pruns         where user_id = _id;
  delete from match_players where user_id = _id;
  delete from arena_sc      where user_id = _id;
  delete from arena_ans     where user_id = _id;
  delete from guess_log     where user_id = _id;
  delete from username_log  where user_id = _id;
  -- profiles, runs, daily_plays, friendships, invites, friend_codes, mm_queue, weekly_scores zincirleme silinir
  delete from auth.users where id = _id;
  perform alog('delete', nm, null);
  return 'ok';
end $function$;

revoke execute on function public.admin_user_delete(uuid) from public, anon;
grant  execute on function public.admin_user_delete(uuid) to authenticated;

-- Kontrol (isteğe bağlı):
--   select proname from pg_proc where proname in ('set_username','admin_user_delete');
