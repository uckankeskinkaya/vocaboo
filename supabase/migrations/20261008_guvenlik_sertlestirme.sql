-- Öğretmen metinlerinde HTML karakteri (< >) yasak (istemci de metinleri kaçırır); tetikleyici işlev dışarıdan çağrılamaz; arama yolu sabit.
revoke execute on function public.daily_stats_t() from anon, authenticated, public;
alter function public.quest_defs(date) set search_path = public;
alter function public.ach_defs() set search_path = public;

create or replace function public.teacher_word_save(_id integer, _w text, _d text, _tr text, _x text) returns text
language plpgsql security definer set search_path=public as $$
declare w text := lower(trim(coalesce(_w, '')));
begin
  if not is_teacher() then raise exception 'yetki yok'; end if;
  if w !~ '^[a-z]{3,14}$' then return 'kelime'; end if;
  if coalesce(_d, '') ~ '[<>]' or coalesce(_tr, '') ~ '[<>]' or coalesce(_x, '') ~ '[<>]' then return 'karakter'; end if;
  if length(trim(coalesce(_d, ''))) < 3 or length(_d) > 200 then return 'tanim'; end if;
  if length(coalesce(_tr, '')) > 200 then return 'tr'; end if;
  if trim(coalesce(_x, '')) <> '' and (length(_x) > 200 or _x !~* ('\m' || w)) then return 'cumle'; end if;
  if _id is null and (select count(*) from words where lvl = 4) >= 500 then return 'dolu'; end if;
  begin
    if _id is null then
      insert into words(lvl, word, def, def_tr, ex, owner) values (4, w, trim(_d), nullif(trim(coalesce(_tr, '')), ''), nullif(trim(coalesce(_x, '')), ''), auth.uid());
    else
      update words set word = w, def = trim(_d), def_tr = nullif(trim(coalesce(_tr, '')), ''), ex = nullif(trim(coalesce(_x, '')), '') where id = _id and lvl = 4;
      if not found then return 'yok'; end if;
    end if;
  exception when unique_violation then return 'var';
  end;
  return 'ok';
end $$;

create or replace function public.teacher_assign_save(_title text, _due date, _wids int[]) returns jsonb
language plpgsql security definer set search_path=public as $$
declare t text := trim(coalesce(_title, '')); n int; id1 int;
begin
  if not is_teacher() then raise exception 'yetki yok'; end if;
  if length(t) < 2 or length(t) > 60 or t ~ '[<>]' then return jsonb_build_object('err', 'baslik'); end if;
  if _due is not null and _due < (now() at time zone 'Europe/Istanbul')::date then return jsonb_build_object('err', 'tarih'); end if;
  select count(*) into n from words where id = any(_wids) and lvl = 4;
  if _wids is null or n < 1 or n > 50 or n <> (select count(distinct x) from unnest(_wids) x) then return jsonb_build_object('err', 'kelime'); end if;
  if (select count(*) from assignments where active) >= 30 then return jsonb_build_object('err', 'dolu'); end if;
  insert into assignments(teacher, title, due, wids) values (auth.uid(), t, _due, (select array_agg(distinct x) from unnest(_wids) x)) returning id into id1;
  return jsonb_build_object('ok', true, 'id', id1);
end $$;
