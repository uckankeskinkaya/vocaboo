-- Seri modunda pas yalnızca kelimeye hiç tahmin yapılmadan kullanılabilir (tahmin edip son hakta pas geçerek can kaybından kaçınma engellenir).
create or replace function public.run_pass() returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare u uuid := auth.uid(); r public.runs;
begin
  if u is null then raise exception 'giris'; end if;
  select * into r from runs where user_id = u for update;
  if not found or r.dead or r.word_id is null or r.passes < 1 then raise exception 'pas yok'; end if;
  if coalesce(array_length(r.guesses, 1), 0) > 0 then raise exception 'tahmin yapildi'; end if;
  update runs set passes = passes - 1 where user_id = u;
  return run_pick(u) || jsonb_build_object('lives', r.lives, 'streak', r.streak, 'passes', r.passes - 1, 'score', r.score);
end $$;
