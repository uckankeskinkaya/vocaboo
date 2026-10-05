-- Şifre sıfırlama: kullanıcı talep eder, yönetici geçici kod üretir, kullanıcı kodla girip yeni şifre belirler.
-- auth şemasına yazdığı için Supabase SQL Editor'de çalıştırılır.
-- Geri dönüş: supabase/GERI_DONUS.sql dosyasının sonundaki "şifre sıfırlama" bölümü.

create table if not exists public.pw_requests (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  username text not null,
  created timestamptz not null default now(),
  done timestamptz
);
create unique index if not exists pw_requests_tek_bekleyen on public.pw_requests (user_id) where done is null;

-- Geçici şifre verilmiş kullanıcılar: yeni şifre belirleyene kadar işaretli kalır.
create table if not exists public.pw_temp (
  user_id uuid primary key references auth.users(id) on delete cascade,
  temp_hash text not null,
  issued timestamptz not null default now()
);
alter table public.pw_requests enable row level security;
alter table public.pw_temp enable row level security;
revoke all on public.pw_requests from anon, authenticated;
revoke all on public.pw_temp from anon, authenticated;

-- 1) Talep (giriş yapmadan çağrılır). Kullanıcı var mı yok mu belli etmez, her zaman 'ok' döner.
create or replace function public.pw_request(_u text)
 returns text
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare n text := lower(trim(coalesce(_u, ''))); pid uuid; nm text;
begin
  if n !~ '^[a-z0-9_]{3,16}$' then return 'ok'; end if;
  select id, username into pid, nm from profiles where username = n and not banned and not admin;
  if pid is null then return 'ok'; end if;
  if (select count(*) from pw_requests where done is null) >= 100 then return 'ok'; end if;
  insert into pw_requests(user_id, username) values (pid, nm) on conflict (user_id) where done is null do nothing;
  return 'ok';
end $function$;

-- 2) Yönetici: bekleyen talepler
create or replace function public.admin_pw_requests()
 returns jsonb
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
begin
  if not is_admin() then raise exception 'yetki yok'; end if;
  return coalesce((select jsonb_agg(jsonb_build_object('id', r.id, 'uid', r.user_id, 'u', p.username, 't', r.created) order by r.created)
                   from pw_requests r join profiles p on p.id = r.user_id where r.done is null), '[]'::jsonb);
end $function$;

-- 3) Yönetici: geçici şifre üret (8 karakter, karışabilecek harfler yok). Kod yalnızca burada döner, sunucuda şifrelenmiş saklanır.
create or replace function public.admin_pw_reset(_id uuid)
 returns jsonb
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare nm text; adm boolean; code text := ''; alpha text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; b bytea; i int; h text;
begin
  if not is_admin() then raise exception 'yetki yok'; end if;
  if _id = auth.uid() then return jsonb_build_object('err', 'kendin'); end if;
  select username, admin into nm, adm from profiles where id = _id;
  if nm is null then return jsonb_build_object('err', 'yok'); end if;
  if adm then return jsonb_build_object('err', 'yonetici'); end if;
  b := extensions.gen_random_bytes(8);
  for i in 0..7 loop code := code || substr(alpha, (get_byte(b, i) % 32) + 1, 1); end loop;
  h := extensions.crypt(code, extensions.gen_salt('bf', 10));
  update auth.users set encrypted_password = h, updated_at = now() where id = _id;
  delete from auth.sessions where user_id = _id;
  insert into pw_temp(user_id, temp_hash) values (_id, h)
    on conflict (user_id) do update set temp_hash = excluded.temp_hash, issued = now();
  update pw_requests set done = now() where user_id = _id and done is null;
  perform alog('pw_reset', nm, null);
  return jsonb_build_object('ok', true, 'u', nm, 'code', code);
end $function$;

-- 4) Kullanıcı: geçici şifreyle mi giriş yaptı? (yeni şifre belirlemesi gerekir)
create or replace function public.pw_must_change()
 returns boolean
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
begin
  if auth.uid() is null then raise exception 'giris'; end if;
  return exists (select 1 from pw_temp where user_id = auth.uid());
end $function$;

-- 5) Kullanıcı: şifreyi değiştirdi. Sunucu gerçekten değiştiğini kontrol eder (geçici şifrenin özeti artık aynı olmamalı).
create or replace function public.pw_changed()
 returns boolean
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare uid uuid := auth.uid(); cur text;
begin
  if uid is null then raise exception 'giris'; end if;
  select encrypted_password into cur from auth.users where id = uid;
  delete from pw_temp t where t.user_id = uid and t.temp_hash <> cur;
  return not exists (select 1 from pw_temp where user_id = uid);
end $function$;

revoke execute on function public.pw_request(text) from public;
grant  execute on function public.pw_request(text) to anon, authenticated;
revoke execute on function public.admin_pw_requests() from public, anon;
grant  execute on function public.admin_pw_requests() to authenticated;
revoke execute on function public.admin_pw_reset(uuid) from public, anon;
grant  execute on function public.admin_pw_reset(uuid) to authenticated;
revoke execute on function public.pw_must_change() from public, anon;
grant  execute on function public.pw_must_change() to authenticated;
revoke execute on function public.pw_changed() from public, anon;
grant  execute on function public.pw_changed() to authenticated;
