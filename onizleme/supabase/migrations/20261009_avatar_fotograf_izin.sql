-- Profil fotoğrafı yükleme: chk_avatar tetikleyicisi sadece hazır avatarlara (p:xxx) izin veriyordu, bu yüzden her fotoğraf
-- "gecersiz avatar" ile reddediliyordu. Tablodaki CHECK kısıtıyla aynı kural: hazır avatar ya da en fazla 40 KB'lık JPEG.
create or replace function public.chk_avatar()
 returns trigger language plpgsql set search_path to '' as $$
begin
  if new.avatar is not null and new.avatar <> ''
     and new.avatar !~ '^p:[a-z]{2,12}$'
     and not (new.avatar ~ '^data:image/jpeg;base64,[A-Za-z0-9+/=]+$' and length(new.avatar) < 40000) then
    raise exception 'gecersiz avatar';
  end if;
  return new;
end $$;
revoke execute on function public.chk_avatar() from public, anon, authenticated;
