-- Eski kayıtların temizliği. Gerekli olanlar saklanır, gereksizler silinir.
--   guess_log   14 gün  (şüpheli oyuncu raporu 24 saate bakar)
--   xp_log      30 gün  (XP tavanı 24 saate bakar, kalanı denetim içindir)
--   admin_log   365 gün (yönetici işlem denetimi)
--   username_log 90 gün, pw_requests (tamamlanmış) 30 gün
--   oda kayıtları (arena/maç) 3 gün: sonuçlar odalarda 3 saat görünür, sonrası gereksiz
--   davetler 1 gün, eşleşme kuyruğu 1 saat, günlük oyun kaydı 120 gün, haftalık skor 26 hafta
-- SAKLANANLAR (silinmez): profiles, words, shop_items, owned_items, app_settings, daily_pick, friendships,
--   friend_codes, runs, pruns, weekly_champs, ve profillerdeki tüm toplam istatistikler.
create or replace function public.bakim()
 returns jsonb
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare r jsonb := '{}'; n int;
begin
  delete from guess_log where ts < now() - interval '14 days';        get diagnostics n = row_count; r := r || jsonb_build_object('guess_log', n);
  delete from xp_log where ts < now() - interval '30 days';           get diagnostics n = row_count; r := r || jsonb_build_object('xp_log', n);
  delete from admin_log where ts < now() - interval '365 days';       get diagnostics n = row_count; r := r || jsonb_build_object('admin_log', n);
  delete from invites where ts < now() - interval '1 day';            get diagnostics n = row_count; r := r || jsonb_build_object('invites', n);
  delete from mm_queue where ts < now() - interval '1 hour';          get diagnostics n = row_count; r := r || jsonb_build_object('mm_queue', n);
  delete from daily_plays where day < current_date - 120;             get diagnostics n = row_count; r := r || jsonb_build_object('daily_plays', n);
  delete from weekly_scores where week < current_date - 7 * 26;       get diagnostics n = row_count; r := r || jsonb_build_object('weekly_scores', n);
  -- Arena odaları ve ona bağlı satırlar
  delete from arena_ans where arena_id in (select id from arenas where created < now() - interval '3 days');
  delete from arena_sc  where arena_id in (select id from arenas where created < now() - interval '3 days');
  delete from arena_qs  where arena_id in (select id from arenas where created < now() - interval '3 days');
  delete from arenas where created < now() - interval '3 days';       get diagnostics n = row_count; r := r || jsonb_build_object('arenas', n);
  -- Maç odaları
  delete from match_players where match_id in (select id from matches where created < now() - interval '3 days');
  delete from matches where created < now() - interval '3 days';      get diagnostics n = row_count; r := r || jsonb_build_object('matches', n);
  -- Sonradan eklenen (SQL'i çalıştırılmış olmayabilir) tablolar
  if to_regclass('public.username_log') is not null then
    execute 'delete from public.username_log where ts < now() - interval ''90 days'''; get diagnostics n = row_count; r := r || jsonb_build_object('username_log', n);
  end if;
  if to_regclass('public.pw_requests') is not null then
    execute 'delete from public.pw_requests where done is not null and done < now() - interval ''30 days'''; get diagnostics n = row_count; r := r || jsonb_build_object('pw_requests', n);
  end if;
  return r;
end $function$;
revoke execute on function public.bakim() from public, anon, authenticated;
