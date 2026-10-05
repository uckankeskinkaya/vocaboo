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
