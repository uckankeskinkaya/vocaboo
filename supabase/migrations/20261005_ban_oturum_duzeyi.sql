-- Ban artık yalnızca profiles.banned bayrağı değil: Supabase oturumu da kapatılır.
-- Banlı kullanıcı yeni giriş yapamaz, token yenileyemez; açık oturumları silinir.
-- auth şemasına yazdığı için Supabase SQL Editor'de çalıştırılır.
-- Geri dönüş: supabase/GERI_DONUS.sql dosyasının sonundaki "ban" bölümü.
create or replace function public.admin_user_act(_id uuid, _act text)
 returns text
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare nm text;
begin
  if not is_admin() then raise exception 'yetki yok'; end if;
  select username into nm from profiles where id = _id;
  if nm is null then return 'yok'; end if;
  if _act = 'reset' then
    update profiles set best_score = 0, best_streak = 0 where id = _id;
    delete from weekly_scores where user_id = _id;
  elsif _act = 'avatar' then update profiles set avatar = null where id = _id;
  elsif _act = 'cls_on' then update profiles set cls = true where id = _id;
  elsif _act = 'cls_off' then update profiles set cls = false where id = _id;
  elsif _act = 'ban' then
    if _id = auth.uid() then return 'kendin'; end if;
    update profiles set banned = true, cls = false where id = _id;
    update auth.users set banned_until = 'infinity' where id = _id;
    delete from auth.sessions where user_id = _id;
  elsif _act = 'unban' then
    update profiles set banned = false where id = _id;
    update auth.users set banned_until = null where id = _id;
  else return 'gecersiz'; end if;
  perform alog(_act, nm, null);
  return 'ok';
end $function$;
