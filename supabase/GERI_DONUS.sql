-- 20261005_guvenlik_yetki_sikilastirma.sql dosyasını geri almak için Supabase SQL Editor'de çalıştır.
-- Eski yetkiler yedek_20261005 şemasındaki tablolarda saklı.

-- Tablo yetkilerini eski haline getir
do $$ declare r record; begin
  for r in select * from yedek_20261005.tablo_yetkileri loop
    execute format('grant %s on public.%I to %I', r.privilege_type, r.table_name, r.grantee);
  end loop;
end $$;

-- Fonksiyon yetkileri ve search_path
grant execute on function public.handle_new_user(), public.profiles_gain_cap(), public.rls_auto_enable(), public.chk_avatar()
  to public, anon, authenticated;
alter function public.chk_avatar()    reset search_path;
alter function public.lvl_of(integer) reset search_path;
alter function public.frame_lv(text)  reset search_path;

-- Fonksiyon gövdelerini yedekten yeniden oluşturmak gerekirse:
--   select tanim from yedek_20261005.fonksiyonlar where imza like 'ad_%';
-- çıkan metni SQL Editor'de çalıştır.

-- ---------------------------------------------------------------
-- 20261005_kullanici_adi_ve_silme.sql dosyasını geri almak için:
-- (Önceden değiştirilmiş kullanıcı adları olduğu gibi kalır; giriş de yeni adla çalışmaya devam eder.)
drop function if exists public.set_username(text);
drop function if exists public.admin_user_delete(uuid);
drop table if exists public.username_log;

-- ---------------------------------------------------------------
-- 20261005_ban_oturum_duzeyi.sql dosyasını geri almak için:
-- Eski admin_user_act gövdesini yedekten alıp çalıştır:
--   select tanim from yedek_20261005.fonksiyonlar where imza like 'admin_user_act%';
-- Daha önce banlanmış kullanıcıların oturum engelini kaldırmak için:
--   update auth.users set banned_until = null where id in (select id from public.profiles where banned);

-- ---------------------------------------------------------------
-- 20261005_sifre_sifirlama.sql dosyasını geri almak için:
drop function if exists public.pw_request(text);
drop function if exists public.admin_pw_requests();
drop function if exists public.admin_pw_reset(uuid);
drop function if exists public.pw_must_change();
drop function if exists public.pw_changed();
drop table if exists public.pw_requests;
drop table if exists public.pw_temp;

-- ---------------------------------------------------------------
-- 20261005_realtime_ozel_kanal.sql dosyasını geri almak için:
drop policy if exists "ka kanallarini giris yapanlar okur" on realtime.messages;
drop policy if exists "ka kanallarina giris yapanlar yazar" on realtime.messages;
