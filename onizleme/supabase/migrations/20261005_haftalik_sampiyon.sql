-- Haftalık şampiyon: haftanın ilk 3'üne puan (pazar parası) ve rozet verir. Her hafta bir kez.
-- 1. 20.000, 2. 15.000, 3. 10.000 puan (mağazada çerçeve 60.000-150.000, yani 3-8 şampiyonluk). Yalnızca skoru 0'dan büyük ve banlı olmayanlar.

alter table public.profiles
  add column if not exists weekly_wins int not null default 0,
  add column if not exists weekly_podiums int not null default 0;

create table if not exists public.weekly_champs (
  week date not null,
  rank int not null check (rank between 1 and 3),
  user_id uuid not null references public.profiles(id) on delete cascade,
  score int not null,
  pts int not null,
  seen boolean not null default false,
  primary key (week, rank)
);
alter table public.weekly_champs enable row level security;
revoke all on public.weekly_champs from anon, authenticated;

-- Ödülü dağıtır. Yalnızca zamanlayıcı/yönetici SQL'i çağırır (API'den kapalı). Aynı hafta ikinci kez çağrılırsa 'zaten' döner.
create or replace function public.weekly_award(_week date default null)
 returns text
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare w date := coalesce(_week, (date_trunc('week', now() at time zone 'Europe/Istanbul')::date - 7)); n int;
begin
  if exists (select 1 from weekly_champs where week = w) then return 'zaten'; end if;
  insert into weekly_champs(week, rank, user_id, score, pts)
  select w, t.rk, t.user_id, t.best_score, (array[20000, 15000, 10000])[t.rk]
  from (select s.user_id, s.best_score, row_number() over (order by s.best_score desc, p.username)::int as rk
        from weekly_scores s join profiles p on p.id = s.user_id
        where s.week = w and s.best_score > 0 and not p.banned) t
  where t.rk <= 3;
  get diagnostics n = row_count;
  if n = 0 then return 'yok'; end if;
  perform set_config('app.bypass', '1', true);  -- puan tavanı tetikleyicisini atla (sistem ödülü)
  update profiles p set total_points = p.total_points + c.pts, weekly_podiums = p.weekly_podiums + 1,
                        weekly_wins = p.weekly_wins + (case when c.rank = 1 then 1 else 0 end)
  from weekly_champs c where c.week = w and c.user_id = p.id;
  return 'ok:' || n;
end $function$;
revoke execute on function public.weekly_award(date) from public, anon, authenticated;

-- Oyuncu: son ödüllü haftanın podyumu ve (varsa) benim ödülüm
create or replace function public.champ_week()
 returns jsonb
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare w date; u uuid := auth.uid();
begin
  if u is null then raise exception 'giris'; end if;
  select max(week) into w from weekly_champs;
  if w is null then return null; end if;
  return jsonb_build_object('week', w,
    'podium', (select jsonb_agg(jsonb_build_object('r', c.rank, 'u', p.username, 's', c.score) order by c.rank)
               from weekly_champs c join profiles p on p.id = c.user_id where c.week = w),
    'me', (select jsonb_build_object('r', c.rank, 'pts', c.pts, 'seen', c.seen) from weekly_champs c where c.week = w and c.user_id = u));
end $function$;

create or replace function public.champ_seen()
 returns void
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
begin
  if auth.uid() is null then raise exception 'giris'; end if;
  update weekly_champs set seen = true where user_id = auth.uid() and not seen;
end $function$;

revoke execute on function public.champ_week() from public, anon;
grant  execute on function public.champ_week() to authenticated;
revoke execute on function public.champ_seen() from public, anon;
grant  execute on function public.champ_seen() to authenticated;
