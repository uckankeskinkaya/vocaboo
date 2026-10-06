-- 1) Şüpheli raporu: herkesi listelemek yerine puanlama. Kurallar (yeterli veri olan oyuncular için):
--    ilk deneme oranı, kelime başına ortalama tahmin, hiç yanılmama, tahminler arası medyan süre (bot belirtisi).
--    60+ "Yüksek", 30-59 "Orta"; altı listelenmez.
create or replace function public.admin_suspects()
 returns jsonb language plpgsql security definer set search_path to 'public' as $$
begin
  if not is_admin() then raise exception 'yetki yok'; end if;
  return coalesce((select jsonb_agg(to_jsonb(t) - 'sc2' order by t.sc2 desc) from (
    select x.id, x.u, x.score as sc, x.score as sc2, case when x.score >= 60 then 'yuksek' else 'orta' end as lvl,
           array_remove(x.reasons, null) as reasons, x.ws, x.wf, x.ftp as ft, x.ort, x.sec, x.n
    from (
      select s.*,
        (case when s.ws >= 30 and s.ftp >= 80 then 60 when s.ws >= 15 and s.ftp >= 80 then 40
              when s.ws >= 30 and s.ftp >= 70 then 30 when s.ws >= 15 and s.ftp >= 70 then 15 else 0 end)
        + (case when s.ws >= 20 and s.ort <= 1.3 then 15 else 0 end)
        + (case when s.ws >= 30 and s.wf = 0 then 10 else 0 end)
        + (case when s.n >= 20 and s.sec < 4 then 40 when s.n >= 20 and s.sec < 8 then 20 else 0 end) as score,
        array[
          case when s.ws >= 15 and s.ftp >= 70 then 'İlk denemede çözme oranı %' || s.ftp || ' (' || s.ws || ' kelime)' end,
          case when s.ws >= 20 and s.ort <= 1.3 then 'Kelime başına ortalama ' || s.ort || ' tahmin' end,
          case when s.ws >= 30 and s.wf = 0 then 'Hiç yanılmamış (' || s.ws || ' kelime)' end,
          case when s.n >= 20 and s.sec < 8 then 'Tahminler arası medyan ' || s.sec || ' sn (bot belirtisi)' end
        ] as reasons
      from (
        select p.id, p.username as u, coalesce(p.words_solved, 0) as ws, coalesce(p.words_failed, 0) as wf,
               coalesce(round(100.0 * p.first_try / nullif(p.words_solved, 0)), 0)::int as ftp,
               coalesce(round(p.total_guesses::numeric / nullif(p.words_solved, 0), 2), 9) as ort,
               coalesce(g.sec, 99) as sec, coalesce(g.n, 0) as n
        from profiles p
        left join lateral (
          select count(*)::int as n, round((percentile_cont(0.5) within group (order by gap))::numeric, 1) as sec
          from (select extract(epoch from (ts - lag(ts) over (order by ts))) as gap from guess_log l
                where l.user_id = p.id and l.ts > now() - interval '7 days') z
          where gap is not null and gap < 120) g on true
        where not coalesce(p.admin, false) and not coalesce(p.banned, false)
      ) s
    ) x where x.score >= 30 order by x.score desc limit 20
  ) t), '[]'::jsonb);
end $$;

-- 2) Profil görüntüleme: giriş yapmış herkes bir kullanıcının herkese açık istatistiklerini görebilir (bakiye, son görülme gibi özel bilgiler yok).
create or replace function public.profile_view(_u text)
 returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare p public.profiles;
begin
  if auth.uid() is null then raise exception 'giris'; end if;
  select * into p from profiles where username = lower(btrim(_u)) and not coalesce(banned, false);
  if not found then return null; end if;
  return jsonb_build_object('username', p.username, 'avatar', p.avatar, 'frame', p.frame, 'xp', p.xp,
    'words_solved', p.words_solved, 'words_failed', p.words_failed, 'first_try', p.first_try,
    'best_score', p.best_score, 'best_streak', p.best_streak, 'best_daily_streak', p.best_daily_streak,
    'daily_streak', case when p.last_daily >= (now() at time zone 'Europe/Istanbul')::date - 1 then p.daily_streak else 0 end,
    'daily_wins', p.daily_wins, 'weekly_wins', p.weekly_wins, 'weekly_podiums', p.weekly_podiums,
    'joined', p.created_at, 'teacher', coalesce(p.teacher, false), 'cls', coalesce(p.cls, false), 'me', p.id = auth.uid());
end $$;
revoke all on function public.admin_suspects() from public, anon;
revoke all on function public.profile_view(text) from public, anon;
grant execute on function public.admin_suspects() to authenticated;
grant execute on function public.profile_view(text) to authenticated;

-- Profil görüntülemede çevrimiçi bilgisi (son 45 sn içinde uygulamayı açık tutan)
create or replace function public.profile_view(_u text)
 returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare p public.profiles;
begin
  if auth.uid() is null then raise exception 'giris'; end if;
  select * into p from profiles where username = lower(btrim(_u)) and not coalesce(banned, false);
  if not found then return null; end if;
  return jsonb_build_object('username', p.username, 'avatar', p.avatar, 'frame', p.frame, 'xp', p.xp,
    'words_solved', p.words_solved, 'words_failed', p.words_failed, 'first_try', p.first_try,
    'best_score', p.best_score, 'best_streak', p.best_streak, 'best_daily_streak', p.best_daily_streak,
    'daily_streak', case when p.last_daily >= (now() at time zone 'Europe/Istanbul')::date - 1 then p.daily_streak else 0 end,
    'daily_wins', p.daily_wins, 'weekly_wins', p.weekly_wins, 'weekly_podiums', p.weekly_podiums,
    'joined', p.created_at, 'teacher', coalesce(p.teacher, false), 'cls', coalesce(p.cls, false), 'me', p.id = auth.uid(),
    'on', coalesce(p.last_seen > now() - interval '45 seconds', false));
end $$;
revoke all on function public.profile_view(text) from public, anon;
grant execute on function public.profile_view(text) to authenticated;

-- Geçen haftanın şampiyonları podyumu: sadece sınıftan kişiler (sınıf üyesi ya da öğretmen) görünür
do $$
declare s text;
begin
  s := pg_get_functiondef('public.champ_week'::regproc);
  s := replace(s, 'from weekly_champs c join profiles p on p.id = c.user_id where c.week = w)', 'from weekly_champs c join profiles p on p.id = c.user_id where c.week = w and (coalesce(p.cls, false) or coalesce(p.teacher, false)))');
  execute s;
end $$;
