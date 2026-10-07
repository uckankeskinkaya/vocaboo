-- Başarılar (kalıcı) ve günlük görevler. Hepsi sunucuda hesaplanır, ödül tek seferlik ve sunucuda doğrulanır.
create table if not exists public.daily_stats(
  user_id uuid not null references auth.users(id) on delete cascade,
  day date not null,
  solved int not null default 0, first_try int not null default 0, hints int not null default 0, dwins int not null default 0,
  primary key (user_id, day));
create table if not exists public.quest_claims(
  user_id uuid not null references auth.users(id) on delete cascade, day date not null, k text not null,
  ts timestamptz not null default now(), primary key (user_id, day, k));
create table if not exists public.ach_claims(
  user_id uuid not null references auth.users(id) on delete cascade, k text not null,
  ts timestamptz not null default now(), primary key (user_id, k));
alter table public.daily_stats enable row level security;
alter table public.quest_claims enable row level security;
alter table public.ach_claims enable row level security;
revoke all on public.daily_stats, public.quest_claims, public.ach_claims from anon, authenticated;

-- Her profil güncellemesinde bugünkü sayaçları biriktir (tüm oyun modları için tek nokta)
create or replace function public.daily_stats_t() returns trigger language plpgsql security definer set search_path=public as $$
declare d date := (now() at time zone 'Europe/Istanbul')::date;
begin
  insert into daily_stats(user_id, day, solved, first_try, hints, dwins)
  values (new.id, d, greatest(0, new.words_solved - old.words_solved), greatest(0, new.first_try - old.first_try),
          greatest(0, new.hints_used - old.hints_used), greatest(0, new.daily_wins - old.daily_wins))
  on conflict (user_id, day) do update set
    solved = daily_stats.solved + greatest(0, new.words_solved - old.words_solved),
    first_try = daily_stats.first_try + greatest(0, new.first_try - old.first_try),
    hints = daily_stats.hints + greatest(0, new.hints_used - old.hints_used),
    dwins = daily_stats.dwins + greatest(0, new.daily_wins - old.daily_wins);
  return null;
end $$;
drop trigger if exists daily_stats_trg on public.profiles;
create trigger daily_stats_trg after update on public.profiles for each row
  when (new.words_solved is distinct from old.words_solved or new.first_try is distinct from old.first_try
        or new.hints_used is distinct from old.hints_used or new.daily_wins is distinct from old.daily_wins)
  execute function public.daily_stats_t();

-- ödeme yardımcısı (sadece sunucu içinden)
create or replace function public.reward_pay(_u uuid, _n int) returns void language plpgsql security definer set search_path=public as $$
begin
  perform set_config('app.bypass', '1', true);
  update profiles set total_points = total_points + _n where id = _u;
  perform set_config('app.bypass', '', true);
end $$;
revoke execute on function public.reward_pay(uuid, int) from anon, authenticated, public;

-- bugünün 3 görevi: [anahtar, hedef, ödül]
create or replace function public.quest_defs(_d date) returns jsonb language sql immutable as $$
  select jsonb_build_array(
    (array['["s3",3,300]','["s5",5,400]']::jsonb[])[1 + (extract(doy from _d)::int % 2)],
    (array['["f1",1,500]','["s10",10,600]','["d1",1,500]']::jsonb[])[1 + ((extract(doy from _d)::int * 7) % 3)],
    (array['["f3",3,800]','["s20",20,900]','["n8",8,800]']::jsonb[])[1 + ((extract(doy from _d)::int * 5 + 1) % 3)]
  )
$$;

create or replace function public.quest_cur(_u uuid, _d date, _k text) returns int language sql stable security definer set search_path=public as $$
  select case _k
    when 's3' then solved when 's5' then solved when 's10' then solved when 's20' then solved
    when 'f1' then first_try when 'f3' then first_try
    when 'd1' then dwins
    when 'n8' then greatest(0, solved - hints)
    else 0 end
  from (select coalesce((select solved from daily_stats where user_id=_u and day=_d),0) solved,
               coalesce((select first_try from daily_stats where user_id=_u and day=_d),0) first_try,
               coalesce((select hints from daily_stats where user_id=_u and day=_d),0) hints,
               coalesce((select dwins from daily_stats where user_id=_u and day=_d),0) dwins) x
$$;
revoke execute on function public.quest_cur(uuid, date, text) from anon, authenticated, public;

create or replace function public.quest_list() returns jsonb language plpgsql security definer set search_path=public as $$
declare u uuid := auth.uid(); d date := (now() at time zone 'Europe/Istanbul')::date; q jsonb; out jsonb := '[]'; i int; qk text; goal int; rew int; cur int; cl boolean; nclaimed int := 0;
begin
  if u is null then raise exception 'giris'; end if;
  q := quest_defs(d);
  for i in 0..2 loop
    qk := q->i->>0; goal := (q->i->>1)::int; rew := (q->i->>2)::int;
    cur := quest_cur(u, d, qk); cl := exists (select 1 from quest_claims c where c.user_id=u and c.day=d and c.k=qk);
    if cl then nclaimed := nclaimed + 1; end if;
    out := out || jsonb_build_object('k', qk, 'cur', least(cur, goal), 'goal', goal, 'rew', rew, 'claimed', cl);
  end loop;
  return jsonb_build_object('q', out, 'bonus', 500, 'bonus_claimed', exists (select 1 from quest_claims c where c.user_id=u and c.day=d and c.k='all'), 'all_done', nclaimed = 3);
end $$;

create or replace function public.quest_claim(_k text) returns jsonb language plpgsql security definer set search_path=public as $$
declare u uuid := auth.uid(); d date := (now() at time zone 'Europe/Istanbul')::date; q jsonb; i int; goal int; rew int; n int;
begin
  if u is null then raise exception 'giris'; end if;
  q := quest_defs(d);
  if _k = 'all' then
    select count(*) into n from quest_claims where user_id=u and day=d and k <> 'all';
    if n < 3 then return jsonb_build_object('err','bitmedi'); end if;
    insert into quest_claims(user_id, day, k) values (u, d, 'all') on conflict do nothing;
    if not found then return jsonb_build_object('err','alindi'); end if;
    perform reward_pay(u, 500);
    return jsonb_build_object('ok', true, 'rew', 500);
  end if;
  for i in 0..2 loop
    if q->i->>0 = _k then
      goal := (q->i->>1)::int; rew := (q->i->>2)::int;
      if quest_cur(u, d, _k) < goal then return jsonb_build_object('err','bitmedi'); end if;
      insert into quest_claims(user_id, day, k) values (u, d, _k) on conflict do nothing;
      if not found then return jsonb_build_object('err','alindi'); end if;
      perform reward_pay(u, rew);
      return jsonb_build_object('ok', true, 'rew', rew);
    end if;
  end loop;
  return jsonb_build_object('err','yok');
end $$;

-- Başarılar: [anahtar, ölçü, hedef, ödül]
create or replace function public.ach_defs() returns jsonb language sql immutable as $$
  select '[["w10","solved",10,500],["w50","solved",50,1000],["w100","solved",100,2000],["w250","solved",250,3000],["w500","solved",500,5000],["w1000","solved",1000,8000],
   ["f1","first",1,300],["f10","first",10,1000],["f50","first",50,3000],["f150","first",150,6000],
   ["s5","streak",5,500],["s10","streak",10,1500],["s20","streak",20,4000],
   ["d3","dstreak",3,500],["d7","dstreak",7,2000],["d30","dstreak",30,8000],
   ["dw1","dwins",1,300],["dw10","dwins",10,1500],["dw30","dwins",30,5000],
   ["b7","bonus",7,1500],
   ["fr1","friends",1,500],["fr5","friends",5,1500],
   ["th1","themes",1,1000],["th5","themes",5,4000],
   ["x1000","xp",1000,2000],["x5000","xp",5000,6000]]'::jsonb
$$;

create or replace function public.ach_cur(_u uuid, _m text) returns int language plpgsql stable security definer set search_path=public as $$
declare p profiles; r int;
begin
  select * into p from profiles where id = _u;
  r := case _m
    when 'solved' then p.words_solved when 'first' then p.first_try when 'streak' then p.best_streak
    when 'dstreak' then p.best_daily_streak when 'dwins' then p.daily_wins when 'bonus' then p.bonus_streak
    when 'xp' then p.xp
    when 'friends' then (select count(*) from friendships f where f.ok and (f.a=_u or f.b=_u))
    when 'themes' then (select count(*) from owned_items where user_id=_u and item like 'theme:%')
    else 0 end;
  return coalesce(r, 0);
end $$;
revoke execute on function public.ach_cur(uuid, text) from anon, authenticated, public;

create or replace function public.ach_list() returns jsonb language plpgsql security definer set search_path=public as $$
declare u uuid := auth.uid(); out jsonb := '[]'; e jsonb;
begin
  if u is null then raise exception 'giris'; end if;
  for e in select * from jsonb_array_elements(ach_defs()) loop
    out := out || jsonb_build_object('k', e->>0, 'm', e->>1, 'goal', (e->>2)::int, 'rew', (e->>3)::int,
      'cur', least(ach_cur(u, e->>1), (e->>2)::int), 'claimed', exists (select 1 from ach_claims where user_id=u and ach_claims.k = e->>0));
  end loop;
  return out;
end $$;

create or replace function public.ach_claim(_k text) returns jsonb language plpgsql security definer set search_path=public as $$
declare u uuid := auth.uid(); e jsonb;
begin
  if u is null then raise exception 'giris'; end if;
  select x into e from jsonb_array_elements(ach_defs()) x where x->>0 = _k;
  if e is null then return jsonb_build_object('err','yok'); end if;
  if ach_cur(u, e->>1) < (e->>2)::int then return jsonb_build_object('err','bitmedi'); end if;
  insert into ach_claims(user_id, k) values (u, _k) on conflict do nothing;
  if not found then return jsonb_build_object('err','alindi'); end if;
  perform reward_pay(u, (e->>3)::int);
  return jsonb_build_object('ok', true, 'rew', (e->>3)::int);
end $$;

revoke execute on function public.quest_list(), public.quest_claim(text), public.ach_list(), public.ach_claim(text) from anon, public;
grant execute on function public.quest_list(), public.quest_claim(text), public.ach_list(), public.ach_claim(text) to authenticated;
