-- Kullanıcı hata bildirimi ("Hata bildir"): kullanıcı açıklama yazar, yönetici panelinde listelenir,
-- bildirimi açık yöneticilere anlık bildirim gider (push-gonder, {bug: id}).
create table if not exists public.bug_reports (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  kat text not null default 'diger' check (kat in ('oyun','online','gorunum','hesap','diger')),
  msg text not null check (length(msg) between 5 and 1000),
  ctx jsonb not null default '{}'::jsonb,
  ts timestamptz not null default now(),
  durum text not null default 'yeni' check (durum in ('yeni','bakiliyor','cozuldu')),
  notified_at timestamptz
);
create index if not exists bug_reports_ts on public.bug_reports (ts desc);
alter table public.bug_reports enable row level security;
revoke all on public.bug_reports from anon, authenticated;

-- Gönder: giriş şart, 30 sn'de bir, saatte en çok 5. ctx: ekran, sürüm, cihaz bilgisi (kısaltılır).
create or replace function public.bug_send(_k text, _m text, _c jsonb)
 returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare u uuid := auth.uid(); i bigint; c jsonb := '{}'::jsonb; k text;
begin
  if u is null then raise exception 'giris'; end if;
  _m := btrim(regexp_replace(coalesce(_m, ''), '[<>]', ' ', 'g'));
  if length(_m) < 5 or length(_m) > 1000 then return jsonb_build_object('err', 'uzunluk'); end if;
  if _k is null or _k not in ('oyun','online','gorunum','hesap','diger') then _k := 'diger'; end if;
  if exists (select 1 from bug_reports where user_id = u and ts > now() - interval '30 seconds')
     or (select count(*) from bug_reports where user_id = u and ts > now() - interval '1 hour') >= 5 then
    return jsonb_build_object('err', 'bekle');
  end if;
  if jsonb_typeof(_c) = 'object' then
    for k in select unnest(array['ekran','surum','cihaz','tema','dil','mod','boyut']) loop
      if _c ? k then c := c || jsonb_build_object(k, left(regexp_replace(_c->>k, '[<>]', ' ', 'g'), 200)); end if;
    end loop;
  end if;
  insert into bug_reports(user_id, kat, msg, ctx) values (u, _k, _m, c) returning id into i;
  return jsonb_build_object('id', i);
end $$;

-- Yönetici: liste (son 200) ve yeni sayısı
create or replace function public.admin_bugs(_durum text default null)
 returns jsonb language plpgsql security definer set search_path to 'public' as $$
begin
  if not is_admin() then raise exception 'yetki yok'; end if;
  return jsonb_build_object('yeni', (select count(*) from bug_reports where durum = 'yeni'),
    'list', coalesce((select jsonb_agg(jsonb_build_object('id', b.id, 'u', p.username, 'k', b.kat, 'm', b.msg, 'c', b.ctx, 't', b.ts, 'd', b.durum) order by b.ts desc)
      from (select * from bug_reports where _durum is null or durum = _durum order by ts desc limit 200) b left join profiles p on p.id = b.user_id), '[]'::jsonb));
end $$;

create or replace function public.admin_bug_set(_id bigint, _durum text)
 returns text language plpgsql security definer set search_path to 'public' as $$
begin
  if not is_admin() then raise exception 'yetki yok'; end if;
  if _durum not in ('yeni','bakiliyor','cozuldu') then return 'gecersiz'; end if;
  update bug_reports set durum = _durum where id = _id;
  return case when found then 'ok' else 'yok' end;
end $$;

revoke all on function public.bug_send(text, text, jsonb) from public, anon;
revoke all on function public.admin_bugs(text) from public, anon;
revoke all on function public.admin_bug_set(bigint, text) from public, anon;
grant execute on function public.bug_send(text, text, jsonb) to authenticated;
grant execute on function public.admin_bugs(text) to authenticated;
grant execute on function public.admin_bug_set(bigint, text) to authenticated;
