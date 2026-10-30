-- İstatistik ekranı: kişisel özet, kaç denemede çözdüğün, son 14 gün, en çok/az doğru harfler, mod dağılımı.
create or replace function public.stats_me() returns jsonb language plpgsql security definer set search_path=public as $$
declare u uuid := auth.uid(); tot jsonb; dist jsonb; days jsonb; letters jsonb; modes jsonb;
begin
  if u is null then raise exception 'giris'; end if;
  with x as (
    select ts, mode, word_id, res,
      case when ts - lag(ts) over (partition by mode, word_id order by ts) > interval '30 minutes' then 1 else 0 end as brk
    from (select * from guess_log where user_id = u order by ts desc limit 6000) y
  ), g as (
    select ts, mode, word_id, res, sum(brk) over (partition by mode, word_id order by ts) as ses from x
  ), a as (
    select mode, word_id, ses, ts, res, row_number() over (partition by mode, word_id, ses order by ts) as k from g
  ), wins as (
    select mode, ts, k from a where res !~ '[or]' and length(res) > 0
  )
  select
    coalesce((select jsonb_agg(c order by n) from (select n, coalesce(count(w.k),0) c from generate_series(1,5) n left join wins w on w.k = n group by n) t), '[]'),
    coalesce((select jsonb_agg(jsonb_build_object('d', d::date, 'w', coalesce(c,0)) order by d) from generate_series(((now() at time zone 'Europe/Istanbul')::date - 13)::timestamp, (now() at time zone 'Europe/Istanbul')::date::timestamp, interval '1 day') d
       left join (select (ts at time zone 'Europe/Istanbul')::date dd, count(*) c from wins group by 1) q on q.dd = d::date), '[]'),
    coalesce((select jsonb_object_agg(mode, c) from (select mode, count(*) c from wins group by mode) m), '{}')
  into dist, days, modes;
  select coalesce(jsonb_agg(jsonb_build_object('l', l, 'n', n, 'g', gr) order by n desc), '[]') into letters from (
    select upper(substr(guess, i, 1)) l, count(*) n, count(*) filter (where substr(res, i, 1) = 'g') gr
    from (select guess, res from guess_log where user_id = u order by ts desc limit 3000) z, generate_series(1, 9) i
    where i <= length(guess) and length(res) >= i group by 1 having count(*) >= 12) q;
  select jsonb_build_object('solved', words_solved, 'failed', words_failed, 'first', first_try, 'guesses', total_guesses, 'hints', hints_used,
     'streak', best_streak, 'dstreak', best_daily_streak, 'dwins', daily_wins, 'dplayed', daily_played, 'xp', xp, 'points', total_points, 'bonus', bonus_streak)
    into tot from profiles where id = u;
  return jsonb_build_object('t', tot, 'dist', dist, 'days', days, 'letters', letters, 'modes', modes);
end $$;
revoke execute on function public.stats_me() from anon, public;
grant execute on function public.stats_me() to authenticated;
