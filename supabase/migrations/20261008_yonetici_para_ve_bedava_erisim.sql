-- Yönetici de Pazar'dan satın almak zorunda: çerçeve kilidinde yönetici istisnası kalktı, kendi seviyesini ayarlayamaz.
-- Yönetici kullanıcıya (kendisi dahil) Pazar parası ekleyebilir (1 - 10.000.000, kayıt altına alınır).
create or replace function public.set_frame(_k text) returns text
language plpgsql security definer set search_path=public as $$
declare x int; r int;
begin
  if auth.uid() is null then raise exception 'giris'; end if;
  if _k is null or _k = '' then update profiles set frame = null where id = auth.uid(); return 'ok'; end if;
  r := frame_lv(_k);
  if r is null then return 'gecersiz'; end if;
  select xp into x from profiles where id = auth.uid();
  if lvl_of(x) < r and not exists (select 1 from owned_items where user_id = auth.uid() and item = 'frame:' || _k) then return 'kilitli'; end if;
  update profiles set frame = _k where id = auth.uid();
  return 'ok';
end $$;

create or replace function public.admin_set_level(_id uuid, _lvl integer) returns text
language plpgsql security definer set search_path=public as $$
declare nm text;
begin
  if not is_admin() then raise exception 'yetki yok'; end if;
  if _id = auth.uid() then return 'kendin'; end if;
  if _lvl is null or _lvl not between 1 and 100 then return 'gecersiz'; end if;
  select username into nm from profiles where id = _id;
  if nm is null then return 'yok'; end if;
  perform set_config('app.bypass', '1', true);
  update profiles set xp = 10 * _lvl * (_lvl - 1) where id = _id;
  perform alog('set_level', nm, _lvl::text);
  return 'ok';
end $$;

create or replace function public.admin_add_points(_id uuid, _n integer) returns text
language plpgsql security definer set search_path=public as $$
declare nm text;
begin
  if not is_admin() then raise exception 'yetki yok'; end if;
  if _n is null or _n < 1 or _n > 10000000 then return 'gecersiz'; end if;
  select username into nm from profiles where id = _id;
  if nm is null then return 'yok'; end if;
  perform reward_pay(_id, _n);
  perform alog('add_points', nm, _n::text);
  return 'ok';
end $$;
revoke execute on function public.admin_add_points(uuid, integer) from anon, public;
grant execute on function public.admin_add_points(uuid, integer) to authenticated;
