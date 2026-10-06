-- ============ BAKIM MODU (1/2: işlevler) ============
-- Açıkken yönetici olmayan hiç kimse (anon dahil, giriş yapmış olanlar dahil) hiçbir tablo/işlev isteği yapamaz.
-- Kapı: PostgREST'in her istekten önce çalıştırdığı "db_pre_request" işlevi (maint_gate). İstemci ekranı sadece bilgi içindir, güvenlik buradadır.
-- İzinli olanlar: maint_get (herkes), is_admin (giriş yapmış herkes, "yönetici miyim" sorusu), service_role (kenar işlevleri), yöneticiler.
-- Not: Supabase Auth'un kendi giriş ucu (GoTrue) bu kapının dışındadır; oradan oturum alınabilir ama o oturumla hiçbir veriye erişilemez.

create or replace function public.maint_get() returns jsonb
language sql stable security definer set search_path=public as $$
  select jsonb_build_object('on', coalesce((select value from app_settings where key = 'maintenance'), '0') = '1',
                            'msg', coalesce((select value from app_settings where key = 'maintenance_msg'), '')) $$;
grant execute on function public.maint_get() to anon, authenticated;

create or replace function public.admin_maint_set(_on boolean, _msg text) returns text
language plpgsql security definer set search_path=public as $$
declare m text := left(regexp_replace(coalesce(_msg, ''), '[<>]', '', 'g'), 200);
begin
  if not is_admin() then raise exception 'yetki yok'; end if;
  update app_settings set value = case when coalesce(_on, false) then '1' else '0' end where key = 'maintenance';
  if not found then insert into app_settings(key, value) values ('maintenance', case when coalesce(_on, false) then '1' else '0' end); end if;
  update app_settings set value = m where key = 'maintenance_msg';
  if not found then insert into app_settings(key, value) values ('maintenance_msg', m); end if;
  perform alog(case when coalesce(_on, false) then 'maint_on' else 'maint_off' end, m, null);
  return 'ok';
end $$;
revoke execute on function public.admin_maint_set(boolean, text) from anon, public;
grant execute on function public.admin_maint_set(boolean, text) to authenticated;

create or replace function public.maint_gate() returns void
language plpgsql security definer set search_path=public as $$
declare v text; p text; claims jsonb; r text; uid uuid;
begin
  select value into v from app_settings where key = 'maintenance';
  if v is distinct from '1' then return; end if;
  p := coalesce(current_setting('request.path', true), '');
  if p = '/rpc/maint_get' then return; end if;
  begin claims := nullif(current_setting('request.jwt.claims', true), '')::jsonb; exception when others then claims := null; end;
  r := claims ->> 'role';
  if r = 'service_role' then return; end if;
  if r = 'authenticated' then
    begin uid := (claims ->> 'sub')::uuid; exception when others then uid := null; end;
    if uid is not null and coalesce((select admin from profiles where id = uid), false) then return; end if;
    if p = '/rpc/is_admin' then return; end if;
  end if;
  raise exception 'bakim' using errcode = 'PT503', hint = 'Bakım modu';
end $$;
revoke execute on function public.maint_gate() from public;
grant execute on function public.maint_gate() to anon, authenticated, service_role;

-- (Kapıyı devreye alan 2 satır ayrı dosyada: 20261008_bakim_kapisini_ac.sql. Önce bu dosyayı çalıştır, sonra o dosyayı.)

-- ============ ÖDEV SON GÜN HATIRLATMASI ============
-- Son günü bugün/yarın olan ve bitirmediği ödevi olan sınıf öğrencilerine (bildirimi açık olanlara) günde 1 bildirim.
-- O gün ödev bildirimi alacak olan, aynı gün ayrıca "günlük" hatırlatma almaz.
create or replace function public.push_due() returns table(endpoint text, p256dh text, auth text, title text, body text)
language plpgsql security definer set search_path=public as $$
declare d date := (now() at time zone 'Europe/Istanbul')::date; h int := extract(hour from now() at time zone 'Europe/Istanbul')::int;
  msgs text[] := array['Günün kelimesi seni bekliyor! 🐥🤓','Hadi biraz Vocaboo oynayalım! 🐥🤓','Kelime avına çıkma vakti! 🤓📚','Bugünkü görevlerin hazır, gel bakalım! 🎯🔥'];
begin
  if h < 18 or h > 20 then return; end if;
  return query
  with od as (
    select p.id uid, a.title t, a.due, array_length(a.wids, 1) n,
      (select count(distinct g.word_id) from guess_log g where g.user_id = p.id and g.word_id = any(a.wids) and g.ts >= a.created and g.res = repeat('g', length(g.guess))) done
    from profiles p cross join assignments a
    where a.active and a.due in (d, d + 1) and p.cls and not p.teacher and not p.admin and not p.banned
      and exists (select 1 from push_subs s where s.user_id = p.id and s.active)
  ), od1 as (
    select distinct on (uid) uid, t, due, n - done as kalan from od where done < n order by uid, due, t
  ), odm as (
    select uid, case when due = d then 'Ödevin son günü bugün: "' || t || '" (' || kalan || ' kelime kaldı) 📚'
                     else '"' || t || '" ödevinin son günü yarın, ' || kalan || ' kelime kaldı! 📚' end m
    from od1 where not exists (select 1 from push_log l where l.user_id = od1.uid and l.day = d and l.kind = 'odev')
  ), insod as (
    insert into push_log(user_id, day, kind) select uid, d, 'odev' from odm on conflict do nothing returning user_id
  ), sec as (
    select p.id uid, case when p.bonus_streak > 0 and random() < .5 then 'Serini bozma, bugünkü bonusun seni bekliyor! 🔥🐥' else msgs[1 + floor(random() * array_length(msgs, 1))::int] end as m
    from profiles p
    where not p.banned and exists (select 1 from push_subs s where s.user_id = p.id and s.active)
      and not exists (select 1 from daily_plays dp where dp.user_id = p.id and dp.day = d)
      and not exists (select 1 from push_log l where l.user_id = p.id and l.day = d and l.kind in ('daily', 'odev'))
      and not exists (select 1 from od1 where od1.uid = p.id)
  ), ins as (
    insert into push_log(user_id, day, kind) select uid, d, 'daily' from sec on conflict do nothing returning user_id
  )
  select s.endpoint, s.p256dh, s.auth, 'Ödev hatırlatması'::text, odm.m
    from odm join insod on insod.user_id = odm.uid join push_subs s on s.user_id = odm.uid and s.active
  union all
  select s.endpoint, s.p256dh, s.auth, 'Vocaboo'::text, sec.m
    from sec join ins on ins.user_id = sec.uid join push_subs s on s.user_id = sec.uid and s.active;
end $$;
revoke execute on function public.push_due() from anon, authenticated, public;
