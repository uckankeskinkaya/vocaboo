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
