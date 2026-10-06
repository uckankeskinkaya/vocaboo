-- Alıştırma modunda İngilizce açıklama cümlesinin Türkçe çevirisi (TR düğmesi).
-- words.def_tr: her kelimenin açıklamasının Türkçesi (1463 kelime için veri doğrudan yazıldı; bu dosya yapıyı kaydeder).
alter table public.words add column if not exists def_tr text;

do $$
declare d text; d0 text;
begin
  d0 := pg_get_functiondef('public.p_next(integer)'::regprocedure);
  d := replace(d0, '''tr'', w.tr,', '''tr'', w.tr, ''dtr'', w.def_tr,');
  if d = d0 then raise exception 'p_next degismedi'; end if; execute d;
end $$;

create or replace function public.words_pack() returns jsonb
language plpgsql stable security definer set search_path=public as $$
begin
  if auth.uid() is null then raise exception 'giris'; end if;
  return coalesce((select jsonb_agg(jsonb_build_array(lvl, word, def, tr, ex, def_tr) order by lvl, id) from words where lvl < 4 or (lvl = 4 and (is_teacher() or coalesce((select cls from profiles where id = auth.uid()), false)))), '[]'::jsonb);
end $$;

-- Öğretmen kelimelerinde "Türkçesi" alanı artık tanımın çevirisidir (def_tr)
create or replace function public.teacher_words() returns jsonb
language plpgsql security definer set search_path=public as $$
begin
  if not is_teacher() then raise exception 'yetki yok'; end if;
  return coalesce((select jsonb_agg(jsonb_build_object('id', id, 'w', word, 'd', def, 'tr', def_tr, 'x', ex) order by word) from words where lvl = 4), '[]'::jsonb);
end $$;

create or replace function public.teacher_word_save(_id integer, _w text, _d text, _tr text, _x text) returns text
language plpgsql security definer set search_path=public as $$
declare w text := lower(trim(coalesce(_w, '')));
begin
  if not is_teacher() then raise exception 'yetki yok'; end if;
  if w !~ '^[a-z]{3,14}$' then return 'kelime'; end if;
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
