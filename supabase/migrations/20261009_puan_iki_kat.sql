-- Kelime puanları iki katına: ilk denemede B1 100, B1+ 150 (B2 200). İpucu cezası 10 -> 20.
-- XP ve zorluk ilerlemesi eskisi gibi kalsın diye puandan türeyen bölenler de iki katına çıkarıldı.
do $$
declare s text;
begin
  s := pg_get_functiondef('public.m_guess'::regproc);
  s := replace(s, 'lp int[] := array[10,15,20,25]', 'lp int[] := array[20,30,40,50]');
  s := replace(s, '(case when p.hint then 10 else 0 end)', '(case when p.hint then 20 else 0 end)');
  execute s;

  s := pg_get_functiondef('public.run_guess'::regproc);
  s := replace(s, 'lp int[] := array[10,15,20,25]', 'lp int[] := array[20,30,40,50]');
  s := replace(s, '(case when r.hint then 10 else 0 end)', '(case when r.hint then 20 else 0 end)');
  execute s;

  s := pg_get_functiondef('public.stat_word'::regproc);
  s := replace(s, '_p/5', '_p/10');
  execute s;

  s := pg_get_functiondef('public.m_award'::regproc);
  s := replace(s, 'r.score / 20', 'r.score / 40');
  s := replace(s, 'r.score / 10', 'r.score / 20');
  execute s;

  s := pg_get_functiondef('public.pick_lvl'::regproc);
  s := replace(s, 'sc/1200.0', 'sc/2400.0');
  execute s;
end $$;
