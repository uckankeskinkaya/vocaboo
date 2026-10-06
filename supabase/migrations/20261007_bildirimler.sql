-- Web Push bildirimleri: abonelikler, günlük hatırlatma seçimi, Edge Function tetikleme (pg_cron + pg_net).
-- VAPID anahtarları ve cron sırrı yalnızca bu veritabanında durur (push_config); istemci sadece açık anahtarı okur.
create extension if not exists pg_net;

create table if not exists public.push_config(
  id int primary key default 1 check (id = 1),
  cron_secret text not null default encode(extensions.gen_random_bytes(24), 'hex'),
  vapid_public text, vapid_private text);
insert into public.push_config(id) values (1) on conflict do nothing;
create table if not exists public.push_subs(
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  endpoint text not null unique, p256dh text not null, auth text not null,
  created timestamptz not null default now(), last_ok timestamptz, active boolean not null default true);
create table if not exists public.push_log(
  user_id uuid not null references auth.users(id) on delete cascade,
  day date not null, kind text not null default 'daily', ts timestamptz not null default now(),
  primary key (user_id, day, kind));
alter table public.push_config enable row level security;
alter table public.push_subs enable row level security;
alter table public.push_log enable row level security;
revoke all on public.push_config, public.push_subs, public.push_log from anon, authenticated;

-- istemci: açık anahtar (gizli değil)
create or replace function public.push_pub() returns text language sql stable security definer set search_path=public as $$
  select vapid_public from push_config where id = 1 $$;
grant execute on function public.push_pub() to anon, authenticated;

create or replace function public.push_save(_e text, _p text, _a text) returns text language plpgsql security definer set search_path=public as $$
declare u uuid := auth.uid();
begin
  if u is null then raise exception 'giris'; end if;
  if _e !~ '^https://[^ ]+$' or length(_e) not between 20 and 900 or length(_p) not between 20 and 200 or length(_a) not between 10 and 100 then return 'gecersiz'; end if;
  if (select count(*) from push_subs where user_id = u and active and endpoint <> _e) >= 5 then return 'cok'; end if;
  insert into push_subs(user_id, endpoint, p256dh, auth, active) values (u, _e, _p, _a, true)
    on conflict (endpoint) do update set user_id = u, p256dh = excluded.p256dh, auth = excluded.auth, active = true;
  return 'ok';
end $$;
create or replace function public.push_remove(_e text) returns void language plpgsql security definer set search_path=public as $$
begin
  if auth.uid() is null then raise exception 'giris'; end if;
  update push_subs set active = false where user_id = auth.uid() and endpoint = _e;
end $$;
create or replace function public.push_status(_e text) returns boolean language plpgsql security definer set search_path=public as $$
begin
  if auth.uid() is null then raise exception 'giris'; end if;
  return exists (select 1 from push_subs where user_id = auth.uid() and endpoint = _e and active);
end $$;
grant execute on function public.push_save(text,text,text), public.push_remove(text), public.push_status(text) to authenticated;
revoke execute on function public.push_save(text,text,text), public.push_remove(text), public.push_status(text) from anon, public;

-- sunucu: şimdi bildirim gitmesi gerekenler (günde 1 kez, İstanbul saatiyle 18-20 arası, günün kelimesini oynamamış olanlar)
create or replace function public.push_due() returns table(endpoint text, p256dh text, auth text, title text, body text)
language plpgsql security definer set search_path=public as $$
declare d date := (now() at time zone 'Europe/Istanbul')::date; h int := extract(hour from now() at time zone 'Europe/Istanbul')::int;
  msgs text[] := array['Günün kelimesi seni bekliyor! 🐥🤓','Hadi biraz Vocaboo oynayalım! 🐥🤓','Kelime avına çıkma vakti! 🤓📚','Bugünkü görevlerin hazır, gel bakalım! 🎯🔥'];
begin
  if h < 18 or h > 20 then return; end if;
  return query
  with sec as (
    select p.id uid, case when p.bonus_streak > 0 and random() < .5 then 'Serini bozma, bugünkü bonusun seni bekliyor! 🔥🐥' else msgs[1 + floor(random() * array_length(msgs,1))::int] end as m
    from profiles p
    where not p.banned and exists (select 1 from push_subs s where s.user_id = p.id and s.active)
      and not exists (select 1 from daily_plays dp where dp.user_id = p.id and dp.day = d)
      and not exists (select 1 from push_log l where l.user_id = p.id and l.day = d and l.kind = 'daily')
  ), ins as (
    insert into push_log(user_id, day, kind) select uid, d, 'daily' from sec on conflict do nothing returning user_id
  )
  select s.endpoint, s.p256dh, s.auth, 'Vocaboo'::text, sec.m
  from sec join ins on ins.user_id = sec.uid join push_subs s on s.user_id = sec.uid and s.active;
end $$;
revoke execute on function public.push_due() from anon, authenticated, public;

create or replace function public.push_dead(_e text[]) returns void language sql security definer set search_path=public as $$
  update push_subs set active = false where endpoint = any(_e) $$;
revoke execute on function public.push_dead(text[]) from anon, authenticated, public;

-- kullanıcı kendi cihazına deneme bildirimi: bu işlev hız sınırını koyar, ardından istemci push-gonder'i kendi oturumuyla çağırır
create or replace function public.push_test() returns text language plpgsql security definer set search_path=public as $$
declare u uuid := auth.uid();
begin
  if u is null then raise exception 'giris'; end if;
  if not exists (select 1 from push_subs where user_id = u and active) then return 'abone yok'; end if;
  if exists (select 1 from push_log where user_id = u and kind = 'test' and ts > now() - interval '1 minute') then return 'bekle'; end if;
  insert into push_log(user_id, day, kind) values (u, (now() at time zone 'Europe/Istanbul')::date, 'test')
    on conflict (user_id, day, kind) do update set ts = now();
  return 'ok';
end $$;
grant execute on function public.push_test() to authenticated;
revoke execute on function public.push_test() from anon, public;

-- 15 dakikada bir tetikle
select cron.schedule('push-hatirlat', '*/15 * * * *', $$
  select net.http_post(url := 'https://bzijkiljqlruwupqwtcm.supabase.co/functions/v1/push-gonder',
    headers := jsonb_build_object('Content-Type','application/json','x-cron-secret', (select cron_secret from public.push_config where id = 1)),
    body := '{}'::jsonb) $$);
