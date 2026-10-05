-- Günün ilk oyun bonusu: Günlük ya da Seri modunda o gün ilk kelime bitince bir kez verilir (Türkiye saatiyle gün).
-- 1000 puan; art arda gün başına +200 (en çok 7. gün: 2200). Bir gün atlanırsa seri 1'e döner.
alter table public.profiles add column if not exists last_bonus date;
alter table public.profiles add column if not exists bonus_streak integer not null default 0;

create or replace function public.stat_word(_u uuid, _win boolean, _n integer, _p integer, _h boolean)
returns void language plpgsql security definer set search_path to 'public' as $$
declare d date := (now() at time zone 'Europe/Istanbul')::date; lb date; bs int; b int := 0;
begin
  select last_bonus, bonus_streak into lb, bs from profiles where id = _u for update;
  if lb is distinct from d then
    bs := case when lb = d - 1 then least(coalesce(bs, 0), 6) + 1 else 1 end;
    b := 1000 + (bs - 1) * 200;
  end if;
  update profiles set
    words_solved = words_solved + (case when _win then 1 else 0 end),
    words_failed = words_failed + (case when _win then 0 else 1 end),
    total_guesses = total_guesses + (case when _win then _n else 0 end),
    first_try = first_try + (case when _win and _n = 1 then 1 else 0 end),
    hints_used = hints_used + (case when _h then 1 else 0 end),
    total_points = total_points + _p + b,
    last_bonus = case when b > 0 then d else last_bonus end,
    bonus_streak = case when b > 0 then bs else bonus_streak end,
    xp = xp + (case when _win then 20 + _p/5 + (case when _n = 1 then 10 else 0 end) else 4 end)
  where id = _u;
end $$;
