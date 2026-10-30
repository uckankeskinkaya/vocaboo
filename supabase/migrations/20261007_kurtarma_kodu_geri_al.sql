-- Kurtarma kodu sistemi geri alındı: şifre sıfırlama yine sadece yönetici onayıyla (eski hali).
-- İşlevlerin çalıştırma yetkisi kaldırıldı; boş kalan recovery_codes tablosu ve pw_requests.verified sütunu zararsız, istenirse silinebilir.
create or replace function public.admin_pw_requests() returns jsonb language plpgsql security definer set search_path=public as $$
begin
  if not is_admin() then raise exception 'yetki yok'; end if;
  return coalesce((select jsonb_agg(jsonb_build_object('id', r.id, 'uid', r.user_id, 'u', p.username, 't', r.created) order by r.created)
                   from pw_requests r join profiles p on p.id = r.user_id where r.done is null), '[]'::jsonb);
end $$;
revoke execute on function public.pw_request_code(text, text) from anon, authenticated, public;
revoke execute on function public.recovery_new() from anon, authenticated, public;
revoke execute on function public.recovery_has() from anon, authenticated, public;
