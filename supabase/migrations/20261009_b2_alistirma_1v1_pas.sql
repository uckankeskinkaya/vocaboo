-- B2 (140 kolay kelime) artık sadece Alıştırma'da. Online, Arena, günlük ve seri B1 + B1+ kullanır.
create or replace function public.pick_lvl(sc integer)
 returns integer language plpgsql set search_path to 'public' as $$
declare t numeric := least(sc/1200.0, 1); w0 numeric;
begin
  w0 := 65*(1-t) + 35*t;
  if random()*100 < w0 then return 0; end if;
  return 1;
end $$;

create or replace function public.daily_word(d date)
 returns integer language plpgsql security definer set search_path to 'public' as $$
declare w int;
begin
  select word_id into w from daily_pick where day = d;
  if w is null then
    select id into w from words where lvl = 1 order by md5(id::text || d::text || 'vb-d-7q2k') limit 1;
    insert into daily_pick(day, word_id) values (d, w) on conflict (day) do nothing;
    select word_id into w from daily_pick where day = d;
  end if;
  return w;
end $$;

do $$
declare s text;
begin
  -- m_host: karışık = B1 + B1+, B2/B2+ seçilemez
  s := pg_get_functiondef('public.m_host'::regproc);
  s := replace(s, '(v_l < 0 and lvl < 4) or lvl = v_l', '(v_l < 0 and lvl < 2) or lvl = v_l');
  s := replace(s, 'v_l not between -1 and 4 or', 'v_l not between -1 and 4 or v_l between 2 and 3 or');
  execute s;
  -- a_host (Arena): aynı kural
  s := pg_get_functiondef('public.a_host'::regproc);
  s := replace(s, 'floor(random() * 3)::int', 'floor(random() * 2)::int');
  s := replace(s, 'v_l not between -1 and 4 or', 'v_l not between -1 and 4 or v_l between 2 and 3 or');
  execute s;
end $$;

-- 1v1 Puan yarışında sınırsız pas: kelime yanlış sayılır (0 puan), cevap gösterilir, sıradaki kelimeye geçilir.
create or replace function public.m_pass()
 returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare u uuid := auth.uid(); p public.match_players; m public.matches; w public.words; v_fin boolean;
begin
  if u is null then raise exception 'giris'; end if;
  select mp.* into p from match_players mp join matches mm on mm.id = mp.match_id
    where mp.user_id = u and not mp.fin and mm.created > now() - interval '3 hours' order by mm.created desc limit 1 for update of mp;
  if not found then raise exception 'mac yok'; end if;
  select * into m from matches where id = p.match_id;
  if m.maxp <> 2 or m.mode <> 'c' then raise exception 'pas yok'; end if;
  if clock_timestamp() - p.last_at < interval '700 milliseconds' then raise exception 'cok hizli'; end if;
  select * into w from words where id = m.wids[p.idx + 1];
  v_fin := (p.idx + 1 >= m.n) or (p.idx + 1 >= array_length(m.wids, 1));
  update match_players set guesses = '{}', hint = false, idx = idx + 1, ng = ng + 1, failed = failed + 1,
    fin = v_fin, last_at = clock_timestamp() where match_id = p.match_id and user_id = u;
  update profiles set words_failed = words_failed + 1 where id = u;
  return jsonb_build_object('s', '', 'done', true, 'win', false, 'pass', true, 'pts', 0, 'ans', w.word, 'def', w.def, 'ex', w.ex,
    'score', p.score, 'solved', p.solved, 'alive', true, 'fin', v_fin, 'idx', p.idx + 1);
end $$;
revoke all on function public.m_pass() from public, anon;
grant execute on function public.m_pass() to authenticated;
