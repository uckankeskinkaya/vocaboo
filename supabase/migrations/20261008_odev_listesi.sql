-- Ödev listesi: öğretmen sınıf kelimelerinden ödev verir; öğrenci çözer; ilerleme guess_log'dan (doğru çözülen kelimeler) hesaplanır.
create table if not exists public.assignments (
  id serial primary key,
  teacher uuid not null,
  title text not null check (length(title) between 2 and 60),
  due date,
  wids int[] not null check (array_length(wids, 1) between 1 and 50),
  created timestamptz not null default now(),
  active boolean not null default true
);
alter table public.assignments enable row level security;
revoke all on public.assignments from anon, authenticated;
revoke all on sequence public.assignments_id_seq from anon, authenticated;

create or replace function public.teacher_assign_save(_title text, _due date, _wids int[]) returns jsonb
language plpgsql security definer set search_path=public as $$
declare t text := trim(coalesce(_title, '')); n int; id1 int;
begin
  if not is_teacher() then raise exception 'yetki yok'; end if;
  if length(t) < 2 or length(t) > 60 then return jsonb_build_object('err', 'baslik'); end if;
  if _due is not null and _due < (now() at time zone 'Europe/Istanbul')::date then return jsonb_build_object('err', 'tarih'); end if;
  select count(*) into n from words where id = any(_wids) and lvl = 4;
  if _wids is null or n < 1 or n > 50 or n <> (select count(distinct x) from unnest(_wids) x) then return jsonb_build_object('err', 'kelime'); end if;
  if (select count(*) from assignments where active) >= 30 then return jsonb_build_object('err', 'dolu'); end if;
  insert into assignments(teacher, title, due, wids) values (auth.uid(), t, _due, (select array_agg(distinct x) from unnest(_wids) x)) returning id into id1;
  return jsonb_build_object('ok', true, 'id', id1);
end $$;

create or replace function public.teacher_assign_list() returns jsonb
language plpgsql security definer set search_path=public as $$
begin
  if not is_teacher() then raise exception 'yetki yok'; end if;
  return coalesce((select jsonb_agg(jsonb_build_object('id', a.id, 'title', a.title, 'due', a.due, 'n', array_length(a.wids, 1), 'created', a.created,
      'students', (select count(*) from profiles p where p.cls and not p.teacher and not p.admin and not p.banned),
      'finished', (select count(*) from profiles p where p.cls and not p.teacher and not p.admin and not p.banned
          and (select count(distinct g.word_id) from guess_log g where g.user_id = p.id and g.word_id = any(a.wids) and g.ts >= a.created and g.res = repeat('g', length(g.guess))) = array_length(a.wids, 1)))
      order by a.created desc) from assignments a where a.active), '[]'::jsonb);
end $$;

create or replace function public.teacher_assign_progress(_id int) returns jsonb
language plpgsql security definer set search_path=public as $$
declare a public.assignments;
begin
  if not is_teacher() then raise exception 'yetki yok'; end if;
  select * into a from assignments where id = _id and active;
  if not found then return null; end if;
  return jsonb_build_object('title', a.title, 'due', a.due, 'n', array_length(a.wids, 1),
    'students', coalesce((select jsonb_agg(jsonb_build_object('u', p.username, 'done',
        (select count(distinct g.word_id) from guess_log g where g.user_id = p.id and g.word_id = any(a.wids) and g.ts >= a.created and g.res = repeat('g', length(g.guess)))) order by p.username)
      from profiles p where p.cls and not p.teacher and not p.admin and not p.banned), '[]'::jsonb));
end $$;

create or replace function public.teacher_assign_del(_id int) returns text
language plpgsql security definer set search_path=public as $$
begin
  if not is_teacher() then raise exception 'yetki yok'; end if;
  update assignments set active = false where id = _id and active;
  if not found then return 'yok'; end if;
  return 'ok';
end $$;

create or replace function public.h_list() returns jsonb
language plpgsql security definer set search_path=public as $$
declare u uuid := auth.uid();
begin
  if u is null then raise exception 'giris'; end if;
  if not (is_teacher() or coalesce((select cls from profiles where id = u), false)) then return '[]'::jsonb; end if;
  return coalesce((select jsonb_agg(jsonb_build_object('id', a.id, 'title', a.title, 'due', a.due, 'n', array_length(a.wids, 1),
      'done', (select count(distinct g.word_id) from guess_log g where g.user_id = u and g.word_id = any(a.wids) and g.ts >= a.created and g.res = repeat('g', length(g.guess))))
      order by a.due nulls last, a.created desc) from assignments a where a.active), '[]'::jsonb);
end $$;

create or replace function public.h_next(_aid int) returns jsonb
language plpgsql security definer set search_path=public as $$
declare u uuid := auth.uid(); a public.assignments; w public.words; r public.pruns;
begin
  if u is null then raise exception 'giris'; end if;
  if not (is_teacher() or coalesce((select cls from profiles where id = u), false)) then raise exception 'yetki yok'; end if;
  select * into a from assignments where id = _aid and active;
  if not found then return jsonb_build_object('err', 'yok'); end if;
  insert into pruns(user_id, lvl) values (u, 4) on conflict (user_id) do nothing;
  select * into r from pruns where user_id = u for update;
  if r.word_id is not null and r.word_id = any(a.wids) then
    select * into w from words where id = r.word_id;
  end if;
  if w.id is null then
    select * into w from words x where x.id = any(a.wids) and not exists (
      select 1 from guess_log g where g.user_id = u and g.word_id = x.id and g.ts >= a.created and g.res = repeat('g', length(g.guess))) order by random() limit 1;
    if not found then return jsonb_build_object('done', true); end if;
    update pruns set lvl = 4, word_id = w.id, guesses = '{}', hint = false, seen = array_append(coalesce(r.seen, '{}'::int[]), w.id), last_at = clock_timestamp() where user_id = u;
    r.guesses := '{}';
  end if;
  return jsonb_build_object('def', w.def, 'tr', w.tr, 'dtr', w.def_tr, 'len', length(w.word), 'tries', 5, 'lvl', 4,
    'guesses', coalesce((select jsonb_agg(jsonb_build_object('w', x, 's', eval_guess(x, w.word)) order by o) from unnest(r.guesses) with ordinality as t(x, o)), '[]'::jsonb));
end $$;

revoke execute on function public.teacher_assign_save(text,date,int[]), public.teacher_assign_list(), public.teacher_assign_progress(int), public.teacher_assign_del(int), public.h_list(), public.h_next(int) from anon, public;
grant execute on function public.teacher_assign_save(text,date,int[]), public.teacher_assign_list(), public.teacher_assign_progress(int), public.teacher_assign_del(int), public.h_list(), public.h_next(int) to authenticated;
