-- BEKLEYENLER: Supabase SQL Editor'de tek seferde çalıştır. Otomatik üretildi (tools/bekleyenler.py), elle düzenleme.

-- ================= 20261005_sifre_sifirlama.sql =================
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

-- ================= 20261005_bakim.sql =================
-- Eski kayıtların temizliği. Gerekli olanlar saklanır, gereksizler silinir.
--   guess_log   14 gün  (şüpheli oyuncu raporu 24 saate bakar)
--   xp_log      30 gün  (XP tavanı 24 saate bakar, kalanı denetim içindir)
--   admin_log   365 gün (yönetici işlem denetimi)
--   username_log 90 gün, pw_requests (tamamlanmış) 30 gün
--   oda kayıtları (arena/maç) 3 gün: sonuçlar odalarda 3 saat görünür, sonrası gereksiz
--   davetler 1 gün, eşleşme kuyruğu 1 saat, günlük oyun kaydı 120 gün, haftalık skor 26 hafta
-- SAKLANANLAR (silinmez): profiles, words, shop_items, owned_items, app_settings, daily_pick, friendships,
--   friend_codes, runs, pruns, weekly_champs, ve profillerdeki tüm toplam istatistikler.
create or replace function public.bakim()
 returns jsonb
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare r jsonb := '{}'; n int;
begin
  delete from guess_log where ts < now() - interval '14 days';        get diagnostics n = row_count; r := r || jsonb_build_object('guess_log', n);
  delete from xp_log where ts < now() - interval '30 days';           get diagnostics n = row_count; r := r || jsonb_build_object('xp_log', n);
  delete from admin_log where ts < now() - interval '365 days';       get diagnostics n = row_count; r := r || jsonb_build_object('admin_log', n);
  delete from invites where ts < now() - interval '1 day';            get diagnostics n = row_count; r := r || jsonb_build_object('invites', n);
  delete from mm_queue where ts < now() - interval '1 hour';          get diagnostics n = row_count; r := r || jsonb_build_object('mm_queue', n);
  delete from daily_plays where day < current_date - 120;             get diagnostics n = row_count; r := r || jsonb_build_object('daily_plays', n);
  delete from weekly_scores where week < current_date - 7 * 26;       get diagnostics n = row_count; r := r || jsonb_build_object('weekly_scores', n);
  -- Arena odaları ve ona bağlı satırlar
  delete from arena_ans where arena_id in (select id from arenas where created < now() - interval '3 days');
  delete from arena_sc  where arena_id in (select id from arenas where created < now() - interval '3 days');
  delete from arena_qs  where arena_id in (select id from arenas where created < now() - interval '3 days');
  delete from arenas where created < now() - interval '3 days';       get diagnostics n = row_count; r := r || jsonb_build_object('arenas', n);
  -- Maç odaları
  delete from match_players where match_id in (select id from matches where created < now() - interval '3 days');
  delete from matches where created < now() - interval '3 days';      get diagnostics n = row_count; r := r || jsonb_build_object('matches', n);
  -- Sonradan eklenen (SQL'i çalıştırılmış olmayabilir) tablolar
  if to_regclass('public.username_log') is not null then
    execute 'delete from public.username_log where ts < now() - interval ''90 days'''; get diagnostics n = row_count; r := r || jsonb_build_object('username_log', n);
  end if;
  if to_regclass('public.pw_requests') is not null then
    execute 'delete from public.pw_requests where done is not null and done < now() - interval ''30 days'''; get diagnostics n = row_count; r := r || jsonb_build_object('pw_requests', n);
  end if;
  return r;
end $function$;
revoke execute on function public.bakim() from public, anon, authenticated;

-- ================= 20261005_yedek_ve_zamanlama.sql =================
-- Otomatik yedek (2 günde bir), günlük bakım, haftalık şampiyon ödülü ve süresi geçen geçici şifrelerin iptali.
-- pg_cron ve auth şemasını kullandığı için Supabase SQL Editor'de çalıştırılır.
-- Önce 20261005_sifre_sifirlama.sql ve 20261005_bakim.sql çalıştırılmış olmalı (supabase/BEKLEYENLER.sql hepsini sırayla içerir).

create extension if not exists pg_cron;

-- 1) Yedek: önemli tabloların tarihli kopyası + giriş kayıtları. Son 4 yedek günü saklanır, eskileri silinir.
--    Kopyalar API'den erişilemeyen yedek_otomatik şemasında. Geri yüklemek için satırları public tablolarına kopyala.
create schema if not exists yedek_otomatik;
revoke all on schema yedek_otomatik from public, anon, authenticated;

create or replace function public.yedek_al()
 returns text
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare
  d text := to_char(now() at time zone 'Europe/Istanbul', 'YYYYMMDD');
  t text; eski text; sayi int := 0;
  adlar text[] := array['profiles','weekly_scores','weekly_champs','words','shop_items','owned_items','app_settings',
                        'daily_pick','daily_plays','friendships','friend_codes','xp_log','admin_log','runs','username_log','pw_requests'];
begin
  foreach t in array adlar loop
    if to_regclass('public.' || t) is null then continue; end if;
    execute format('drop table if exists yedek_otomatik.%I', t || '_' || d);
    execute format('create table yedek_otomatik.%I as select * from public.%I', t || '_' || d, t);
    execute format('alter table yedek_otomatik.%I enable row level security', t || '_' || d);
    sayi := sayi + 1;
  end loop;
  -- Giriş kayıtları (kullanıcı hesaplarını geri yüklemek için)
  execute format('drop table if exists yedek_otomatik.%I', 'auth_users_' || d);
  execute format('create table yedek_otomatik.%I as select id, email, encrypted_password, created_at, last_sign_in_at, raw_user_meta_data, banned_until from auth.users', 'auth_users_' || d);
  execute format('alter table yedek_otomatik.%I enable row level security', 'auth_users_' || d);
  -- Yalnızca en yeni 4 yedek günü kalsın
  for eski in
    select distinct right(c.relname, 8) as g from pg_class c join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'yedek_otomatik' and c.relkind = 'r' and right(c.relname, 8) ~ '^[0-9]{8}$'
    order by 1 desc offset 4
  loop
    for t in select c.relname from pg_class c join pg_namespace n on n.oid = c.relnamespace
             where n.nspname = 'yedek_otomatik' and c.relkind = 'r' and right(c.relname, 8) = eski
    loop
      execute format('drop table yedek_otomatik.%I', t);
    end loop;
  end loop;
  return d || ': ' || sayi || ' tablo + giriş kayıtları';
end $function$;
revoke execute on function public.yedek_al() from public, anon, authenticated;

-- 2) Geçici şifre 3 gün içinde kullanılmazsa iptal edilir (eski şifre zaten kapalıydı, rastgele bir şifre konur).
create or replace function public.pw_temp_temizle()
 returns int
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare n int := 0;
begin
  if to_regclass('public.pw_temp') is null then return 0; end if;
  update auth.users u set encrypted_password = extensions.crypt(encode(extensions.gen_random_bytes(18), 'hex'), extensions.gen_salt('bf', 10)), updated_at = now()
  where u.id in (select user_id from pw_temp where issued < now() - interval '3 days');
  get diagnostics n = row_count;
  delete from auth.sessions where user_id in (select user_id from pw_temp where issued < now() - interval '3 days');
  delete from pw_temp where issued < now() - interval '3 days';
  return n;
end $function$;
revoke execute on function public.pw_temp_temizle() from public, anon, authenticated;

-- 3) Zamanlama (saatler UTC; İstanbul = UTC+3)
select cron.unschedule(jobid) from cron.job where jobname in ('vocaboo-bakim','vocaboo-yedek','vocaboo-haftalik-sampiyon','vocaboo-gecici-sifre');
select cron.schedule('vocaboo-bakim',              '30 2 * * *',  'select public.bakim()');            -- her gün 05:30
select cron.schedule('vocaboo-yedek',              '0 1 */2 * *', 'select public.yedek_al()');         -- 2 günde bir 04:00
select cron.schedule('vocaboo-haftalik-sampiyon',  '10 21 * * 0', 'select public.weekly_award()');     -- her pazartesi 00:10
select cron.schedule('vocaboo-gecici-sifre',       '15 2 * * *',  'select public.pw_temp_temizle()');  -- her gün 05:15

-- 4) İlk yedek hemen alınır
select public.yedek_al();
