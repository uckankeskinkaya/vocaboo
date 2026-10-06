-- Yönetici: toplu altın (🪙 Pazar bakiyesi) gönderme. Hedef: hepsi | sinif | dis | ogretmen | liste (kullanıcı adları). Engelliler hariç.
create or replace function public.gold_targets(_h text, _l text[])
 returns setof uuid language sql stable security definer set search_path to 'public' as $$
  select p.id from profiles p
  where not coalesce(p.banned, false) and (
    _h = 'hepsi'
    or (_h = 'sinif' and coalesce(p.cls, false))
    or (_h = 'dis' and not coalesce(p.cls, false))
    or (_h = 'ogretmen' and coalesce(p.teacher, false))
    or (_h = 'liste' and p.username = any (_l))
  )
$$;
revoke all on function public.gold_targets(text, text[]) from public, anon, authenticated;

-- Önizleme: kaç kişiye gider, listede bulunamayan adlar
create or replace function public.admin_gold_count(_h text, _l text[])
 returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare n int; yok text[];
begin
  if not is_admin() then raise exception 'yetki yok'; end if;
  if _h not in ('hepsi','sinif','dis','ogretmen','liste') then return jsonb_build_object('err', 'hedef'); end if;
  if _h = 'liste' then
    _l := (select coalesce(array_agg(distinct lower(btrim(x))), '{}') from unnest(coalesce(_l, '{}')) x where btrim(x) <> '');
    if array_length(_l, 1) is null or array_length(_l, 1) > 200 then return jsonb_build_object('err', 'liste'); end if;
    select coalesce(array_agg(x), '{}') into yok from unnest(_l) x where not exists (select 1 from profiles p where p.username = x and not coalesce(p.banned, false));
  end if;
  select count(*) into n from gold_targets(_h, _l);
  return jsonb_build_object('n', n, 'yok', coalesce(yok, '{}'));
end $$;

-- Gönder: kişi başı 1 - 1.000.000, tek seferde en çok 5.000 kişi, kayıt altına alınır. Aynı istek 30 sn içinde tekrarlanamaz (çift tıklama).
create or replace function public.admin_gold_send(_h text, _l text[], _n integer)
 returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare cnt int; v_info text;
begin
  if not is_admin() then raise exception 'yetki yok'; end if;
  if _h not in ('hepsi','sinif','dis','ogretmen','liste') then return jsonb_build_object('err', 'hedef'); end if;
  if _n is null or _n < 1 or _n > 1000000 then return jsonb_build_object('err', 'miktar'); end if;
  if _h = 'liste' then
    _l := (select coalesce(array_agg(distinct lower(btrim(x))), '{}') from unnest(coalesce(_l, '{}')) x where btrim(x) <> '');
    if array_length(_l, 1) is null or array_length(_l, 1) > 200 then return jsonb_build_object('err', 'liste'); end if;
  end if;
  select count(*) into cnt from gold_targets(_h, _l);
  if cnt = 0 then return jsonb_build_object('err', 'kimse'); end if;
  if cnt > 5000 then return jsonb_build_object('err', 'cok'); end if;
  v_info := _n::text || ' x ' || cnt::text;
  if exists (select 1 from admin_log a where a.admin_id = auth.uid() and a.act = 'gold_send' and a.target = _h and a.info = v_info and a.ts > now() - interval '30 seconds') then
    return jsonb_build_object('err', 'bekle');
  end if;
  perform set_config('app.bypass', '1', true);
  update profiles set total_points = total_points + _n where id in (select gold_targets(_h, _l));
  perform set_config('app.bypass', '', true);
  perform alog('gold_send', _h, v_info);
  return jsonb_build_object('ok', true, 'n', cnt, 'toplam', _n::bigint * cnt);
end $$;
revoke all on function public.admin_gold_count(text, text[]) from public, anon;
revoke all on function public.admin_gold_send(text, text[], integer) from public, anon;
grant execute on function public.admin_gold_count(text, text[]) to authenticated;
grant execute on function public.admin_gold_send(text, text[], integer) to authenticated;
