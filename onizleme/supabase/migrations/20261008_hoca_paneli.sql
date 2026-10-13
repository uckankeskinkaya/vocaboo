-- Hoca rolü: sınıf kelimeleri (seviye 4) + kısıtlı hoca paneli.
-- Hoca: kendi kelimelerini ekler/siler, sadece sınıf (cls) öğrencilerinin ilerlemesini görür. Kullanıcı yönetimi/banlama yetkisi YOK.
alter table public.profiles add column if not exists teacher boolean not null default false;
alter table public.words add column if not exists owner uuid;
alter table public.words drop constraint if exists words_lvl_check;
alter table public.words add constraint words_lvl_check check (lvl >= 0 and lvl <= 5)  -- 4 = sınıf kelimeleri, 5 = hoca tarafından silinmiş (arşiv);
alter table public.words drop constraint if exists words_word_key;
create unique index if not exists words_word_live_key on public.words(word, lvl) where lvl < 5;
create unique index if not exists words_word_lvl_key on public.words(word, lvl);

create or replace function public.is_teacher() returns boolean language sql stable security definer set search_path=public as $$
  select coalesce((select teacher or admin from profiles where id = auth.uid()), false) $$;
revoke execute on function public.is_teacher() from anon, public;
grant execute on function public.is_teacher() to authenticated;

-- Mevcut oyun işlevlerine seviye 4 (sınıf kelimeleri) desteği: sadece sınıf üyesi/hoca kullanabilir, "Karışık"a girmez.
do $$
declare d text; d0 text;
begin
  d0 := pg_get_functiondef('public.a_host(text,jsonb)'::regprocedure);
  d := replace(d0, 'v_l not between -1 and 3', 'v_l not between -1 and 4 or (v_l = 4 and not (is_teacher() or coalesce((select cls from profiles where id = u), false)))');
  if d = d0 then raise exception 'a_host degismedi'; end if; execute d;

  d0 := pg_get_functiondef('public.m_host(text,jsonb)'::regprocedure);
  d := replace(d0, 'v_l not between -1 and 3', 'v_l not between -1 and 4 or (v_l = 4 and not (is_teacher() or coalesce((select cls from profiles where id = u), false)))');
  d := replace(d, '(v_l < 0 or lvl = v_l)', '((v_l < 0 and lvl < 4) or lvl = v_l)');
  if d = d0 then raise exception 'm_host degismedi'; end if; execute d;

  d0 := pg_get_functiondef('public.p_next(integer)'::regprocedure);
  d := replace(d0, '_l not between 0 and 3', '_l not between 0 and 4 or (_l = 4 and not (is_teacher() or coalesce((select cls from profiles where id = u), false)))');
  if d = d0 then raise exception 'p_next degismedi'; end if; execute d;

end $$;

-- Yönetici: hoca yetkisi ver/al
create or replace function public.admin_teacher(_id uuid, _on boolean) returns text
language plpgsql security definer set search_path=public as $$
declare nm text;
begin
  if not is_admin() then raise exception 'yetki yok'; end if;
  select username into nm from profiles where id = _id;
  if nm is null then return 'yok'; end if;
  update profiles set teacher = coalesce(_on, false) where id = _id;
  perform alog(case when _on then 'teacher_on' else 'teacher_off' end, nm, null);
  return 'ok';
end $$;

create or replace function public.admin_users(_q text default '') returns jsonb
language plpgsql security definer set search_path=public as $$
begin
  if not is_admin() then raise exception 'yetki yok'; end if;
  return coalesce((select jsonb_agg(x) from (select jsonb_build_object('id', id, 'u', username, 'c', cls, 'b', banned, 'a', admin, 't', teacher, 'bs', best_score, 'ws', words_solved, 'xp', xp,
      'on', coalesce(last_seen > now() - interval '45 seconds', false)) as x
    from profiles where username ilike '%' || coalesce(_q, '') || '%' order by last_seen desc nulls last, username limit 60) t), '[]'::jsonb);
end $$;

-- Hoca: sınıf kelimeleri
create or replace function public.teacher_words() returns jsonb
language plpgsql security definer set search_path=public as $$
begin
  if not is_teacher() then raise exception 'yetki yok'; end if;
  return coalesce((select jsonb_agg(jsonb_build_object('id', id, 'w', word, 'd', def, 'tr', tr, 'x', ex) order by word) from words where lvl = 4), '[]'::jsonb);
end $$;

create or replace function public.teacher_word_save(_id integer, _w text, _d text, _tr text, _x text) returns text
language plpgsql security definer set search_path=public as $$
declare w text := lower(trim(coalesce(_w, '')));
begin
  if not is_teacher() then raise exception 'yetki yok'; end if;
  if w !~ '^[a-z]{3,14}$' then return 'kelime'; end if;
  if length(trim(coalesce(_d, ''))) < 3 or length(_d) > 200 then return 'tanim'; end if;
  if length(coalesce(_tr, '')) > 100 then return 'tr'; end if;
  if trim(coalesce(_x, '')) <> '' and (length(_x) > 200 or _x !~* ('\m' || w)) then return 'cumle'; end if;
  if _id is null and (select count(*) from words where lvl = 4) >= 500 then return 'dolu'; end if;
  begin
    if _id is null then
      insert into words(lvl, word, def, tr, ex, owner) values (4, w, trim(_d), nullif(trim(coalesce(_tr, '')), ''), nullif(trim(coalesce(_x, '')), ''), auth.uid());
    else
      update words set word = w, def = trim(_d), tr = nullif(trim(coalesce(_tr, '')), ''), ex = nullif(trim(coalesce(_x, '')), '') where id = _id and lvl = 4;
      if not found then return 'yok'; end if;
    end if;
  exception when unique_violation then return 'var';
  end;
  return 'ok';
end $$;

create or replace function public.teacher_word_del(_id integer) returns text
language plpgsql security definer set search_path=public as $$
declare w text;
begin
  if not is_teacher() then raise exception 'yetki yok'; end if;
  select word into w from words where id = _id and lvl = 4;
  if w is null then return 'yok'; end if;
  while exists (select 1 from words where word = w and lvl = 5) loop w := w || 'x'; end loop;
  update pruns set word_id = null where word_id = _id;
  update runs set word_id = null where word_id = _id;
  update words set lvl = 5, word = w where id = _id and lvl = 4;
  return 'ok';
end $$;

create or replace function public.words_pack() returns jsonb
language plpgsql stable security definer set search_path=public as $$
begin
  if auth.uid() is null then raise exception 'giris'; end if;
  return coalesce((select jsonb_agg(jsonb_build_array(lvl, word, def, tr, ex) order by lvl, id) from words where lvl < 4 or (lvl = 4 and (is_teacher() or coalesce((select cls from profiles where id = auth.uid()), false)))), '[]'::jsonb);
end $$;

-- Hoca: sınıf özeti (sadece cls öğrencileri; e-posta/şifre/yönetim bilgisi yok)
create or replace function public.teacher_class() returns jsonb
language plpgsql security definer set search_path=public as $$
declare d date := (now() at time zone 'Europe/Istanbul')::date;
begin
  if not is_teacher() then raise exception 'yetki yok'; end if;
  return coalesce((select jsonb_agg(jsonb_build_object(
      'id', p.id, 'u', p.username, 'xp', p.xp, 'ws', p.words_solved, 'wf', p.words_failed, 'ds', p.daily_streak,
      'w7', coalesce(s.solved, 0), 'd7', coalesce(s.days, 0),
      'ls', case when p.last_seen is null then null else greatest(0, extract(epoch from (now() - p.last_seen))::bigint) end)
      order by coalesce(s.solved, 0) desc, p.username)
    from profiles p
    left join (select user_id, sum(solved) solved, count(*) filter (where solved > 0) days from daily_stats where day > d - 7 group by user_id) s on s.user_id = p.id
    where p.cls and not p.teacher and not p.admin and not p.banned), '[]'::jsonb);
end $$;

create or replace function public.teacher_student(_id uuid) returns jsonb
language plpgsql security definer set search_path=public as $$
declare d date := (now() at time zone 'Europe/Istanbul')::date;
begin
  if not is_teacher() then raise exception 'yetki yok'; end if;
  if not exists (select 1 from profiles where id = _id and cls) then return null; end if;
  return jsonb_build_object('days', coalesce((select jsonb_agg(jsonb_build_object('d', g::date, 's', coalesce(s.solved, 0)) order by g)
      from generate_series(d - 13, d, interval '1 day') g left join daily_stats s on s.user_id = _id and s.day = g::date), '[]'::jsonb));
end $$;

create or replace function public.teacher_hard() returns jsonb
language plpgsql security definer set search_path=public as $$
begin
  if not is_teacher() then raise exception 'yetki yok'; end if;
  return coalesce((select jsonb_agg(x) from (
    select jsonb_build_object('w', w.word, 'd', w.def, 'tr', w.tr, 'n', count(*), 'ok', count(*) filter (where t.solved), 'avg', round(avg(t.n) filter (where t.solved), 1)) x
    from (select gl.user_id, gl.word_id, count(*) n, bool_or(gl.res = repeat('g', length(gl.guess))) solved
          from guess_log gl join profiles p on p.id = gl.user_id and p.cls and not p.teacher and not p.admin
          where gl.ts > now() - interval '30 days' and gl.word_id is not null group by gl.user_id, gl.word_id) t
    join words w on w.id = t.word_id
    group by w.id, w.word, w.def, w.tr
    having count(*) >= 2 and count(*) filter (where t.solved) < count(*)
    order by (count(*) - count(*) filter (where t.solved))::numeric / count(*) desc, count(*) desc limit 20) q), '[]'::jsonb);
end $$;

revoke execute on function public.teacher_words(), public.teacher_word_save(integer,text,text,text,text), public.teacher_word_del(integer), public.teacher_class(), public.teacher_student(uuid), public.teacher_hard(), public.admin_teacher(uuid,boolean) from anon, public;
grant execute on function public.teacher_words(), public.teacher_word_save(integer,text,text,text,text), public.teacher_word_del(integer), public.teacher_class(), public.teacher_student(uuid), public.teacher_hard(), public.admin_teacher(uuid,boolean) to authenticated;
