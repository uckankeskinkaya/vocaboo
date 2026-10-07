-- İstemci hata günlüğü: tarayıcıdaki beklenmeyen hatalar (kısa, sınırlı) kaydedilir; sadece yönetici görür.
create table if not exists public.error_log (
  id bigserial primary key,
  ts timestamptz not null default now(),
  user_id uuid,
  msg text not null,
  src text,
  ver text
);
alter table public.error_log enable row level security;
revoke all on public.error_log from anon, authenticated;

create or replace function public.log_error(_m text, _s text, _v text) returns void
language plpgsql security definer set search_path=public as $$
begin
  if _m is null or length(_m) < 1 then return; end if;
  -- sel koruması: saatte en fazla 300 kayıt (tüm kullanıcılar), kullanıcı başına 20
  if (select count(*) from error_log where ts > now() - interval '1 hour') >= 300 then return; end if;
  if auth.uid() is not null and (select count(*) from error_log where user_id = auth.uid() and ts > now() - interval '1 hour') >= 20 then return; end if;
  insert into error_log(user_id, msg, src, ver) values (auth.uid(), left(_m, 300), left(coalesce(_s,''), 200), left(coalesce(_v,''), 40));
end $$;
grant execute on function public.log_error(text,text,text) to anon, authenticated;

create or replace function public.admin_errors() returns table(ts timestamptz, uname text, msg text, src text, ver text, n bigint)
language plpgsql security definer set search_path=public as $$
begin
  if not is_admin() then raise exception 'yetki yok'; end if;
  return query
    select max(e.ts), max(p.username), e.msg, max(e.src), max(e.ver), count(*)
    from error_log e left join profiles p on p.id = e.user_id
    where e.ts > now() - interval '7 days'
    group by e.msg order by max(e.ts) desc limit 40;
end $$;
revoke execute on function public.admin_errors() from anon, public;
grant execute on function public.admin_errors() to authenticated;
