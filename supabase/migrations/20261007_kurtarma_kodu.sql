-- Kurtarma kodu: kullanıcı kayıt olunca bir kez görür. Şifreyi unutursa "kullanıcı adı + kurtarma kodu" ile talep açar.
-- Talep yine yönetici onayından geçer; kod doğruysa talep "doğrulandı" işaretiyle yöneticinin listesinde öne çıkar.
alter table public.pw_requests add column if not exists verified boolean not null default false;

create table if not exists public.recovery_codes(
  user_id uuid primary key references auth.users(id) on delete cascade,
  code_hash text not null,
  created timestamptz not null default now(),
  fails int not null default 0,
  locked_until timestamptz
);
alter table public.recovery_codes enable row level security;
revoke all on public.recovery_codes from anon, authenticated;

create or replace function public.recovery_new() returns text language plpgsql security definer set search_path=public as $$
declare uid uuid := auth.uid(); alpha text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; code text := ''; b bytea; i int;
begin
  if uid is null then raise exception 'giris'; end if;
  b := extensions.gen_random_bytes(10);
  for i in 0..9 loop code := code || substr(alpha, (get_byte(b, i) % 32) + 1, 1); end loop;
  insert into recovery_codes(user_id, code_hash) values (uid, extensions.crypt(code, extensions.gen_salt('bf', 10)))
    on conflict (user_id) do update set code_hash = excluded.code_hash, created = now(), fails = 0, locked_until = null;
  return substr(code,1,5) || '-' || substr(code,6,5);
end $$;

create or replace function public.recovery_has() returns boolean language plpgsql security definer set search_path=public as $$
begin
  if auth.uid() is null then raise exception 'giris'; end if;
  return exists (select 1 from recovery_codes where user_id = auth.uid());
end $$;

-- Giriş yapmadan çağrılır. Cevap kullanıcı var mı yok mu belli etmez: 'ok' | 'hatali' | 'bekle'
create or replace function public.pw_request_code(_u text, _c text) returns text language plpgsql security definer set search_path=public as $$
declare n text := lower(trim(coalesce(_u,''))); c text := upper(regexp_replace(coalesce(_c,''), '[^A-Za-z0-9]', '', 'g')); pid uuid; nm text; rc recovery_codes;
begin
  if n !~ '^[a-z0-9_]{3,16}$' or c !~ '^[A-Z0-9]{10}$' then return 'hatali'; end if;
  select id, username into pid, nm from profiles where username = n and not banned and not admin;
  if pid is null then return 'hatali'; end if;
  select * into rc from recovery_codes where user_id = pid;
  if not found then return 'hatali'; end if;
  if rc.locked_until is not null and rc.locked_until > now() then return 'bekle'; end if;
  if extensions.crypt(c, rc.code_hash) = rc.code_hash then
    update recovery_codes set fails = 0, locked_until = null where user_id = pid;
    if (select count(*) from pw_requests where done is null) >= 100
       and not exists (select 1 from pw_requests where user_id = pid and done is null) then return 'ok'; end if;
    insert into pw_requests(user_id, username, verified) values (pid, nm, true)
      on conflict (user_id) where done is null do update set verified = true;
    return 'ok';
  end if;
  if rc.fails + 1 >= 5 then
    update recovery_codes set fails = 0, locked_until = now() + interval '1 hour' where user_id = pid;
  else
    update recovery_codes set fails = fails + 1 where user_id = pid;
  end if;
  return 'hatali';
end $$;

create or replace function public.admin_pw_requests() returns jsonb language plpgsql security definer set search_path=public as $$
begin
  if not is_admin() then raise exception 'yetki yok'; end if;
  return coalesce((select jsonb_agg(jsonb_build_object('id', r.id, 'uid', r.user_id, 'u', p.username, 't', r.created, 'v', r.verified) order by r.verified desc, r.created)
                   from pw_requests r join profiles p on p.id = r.user_id where r.done is null), '[]'::jsonb);
end $$;

revoke execute on function public.recovery_new(), public.recovery_has() from anon, public;
grant execute on function public.recovery_new(), public.recovery_has() to authenticated;
revoke execute on function public.pw_request_code(text,text) from public;
grant execute on function public.pw_request_code(text,text) to anon, authenticated;
