-- Uygulandı: 2026-10-05 (Supabase proje bzijkiljqlruwupqwtcm)
-- Öncesinde yedek: yedek_20261005 şeması (fonksiyonlar, politikalar, tablo/kolon yetkileri).

-- 1) Tetikleyici ve iç fonksiyonlar API'den (/rest/v1/rpc/...) çağrılamasın.
--    Tetikleyiciler çalışmaya devam eder; EXECUTE yetkisi oluşturma anında denetlenir.
revoke execute on function public.handle_new_user()   from public, anon, authenticated;
revoke execute on function public.profiles_gain_cap() from public, anon, authenticated;
revoke execute on function public.rls_auto_enable()   from public, anon, authenticated;
revoke execute on function public.chk_avatar()        from public, anon, authenticated;

-- 2) Sabit olmayan search_path uyarısı
alter function public.chk_avatar()    set search_path = '';
alter function public.lvl_of(integer) set search_path = '';
alter function public.frame_lv(text)  set search_path = '';

-- 3) anon/authenticated rollerinin gereğinden geniş tablo yetkileri (TRUNCATE, TRIGGER, REFERENCES dahil)
--    Uygulama tablolara yalnızca RPC fonksiyonlarıyla erişir; doğrudan erişim sadece aşağıdaki üçü.
revoke all on all tables    in schema public from anon, authenticated;
revoke all on all sequences in schema public from anon, authenticated;
grant select          on public.profiles      to authenticated;
grant update (avatar) on public.profiles      to authenticated;
grant select          on public.weekly_scores to authenticated;

-- 4) Bundan sonra oluşturulacak tablolar kendiliğinden herkese açılmasın
alter default privileges in schema public revoke all on tables    from anon, authenticated;
alter default privileges in schema public revoke all on sequences from anon, authenticated;
