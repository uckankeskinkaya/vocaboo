-- Market iadesi: satın alınan tema / çerçeve, satın alındıktan sonraki 2 saat içinde ödenen fiyatla iade edilebilir.
-- Kayıt silinmez, refunded_at ile işaretlenir (geçmiş korunur). İade edilen eşya sahiplikten düşer, tekrar satın alınabilir.
alter table public.owned_items add column if not exists refunded_at timestamptz;

create or replace function public.shop_list()
 returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare u uuid := auth.uid(); b int;
begin
  if u is null then raise exception 'giris'; end if;
  select total_points - points_spent into b from profiles where id = u;
  return jsonb_build_object('bal', greatest(coalesce(b, 0), 0),
    'owned', coalesce((select jsonb_agg(item) from owned_items where user_id = u and refunded_at is null), '[]'::jsonb),
    -- iade edilebilir eşyalar: {eşya: {s: kalan saniye, p: ödenen fiyat}}
    'refund', coalesce((select jsonb_object_agg(item, jsonb_build_object('s', greatest(1, extract(epoch from (ts + interval '2 hours' - now()))::int), 'p', price))
                        from owned_items where user_id = u and refunded_at is null and price > 0 and ts > now() - interval '2 hours'), '{}'::jsonb),
    'items', coalesce((select jsonb_agg(jsonb_build_object('id', s.id, 'price', s.price,
        'owned', exists (select 1 from owned_items o where o.user_id = u and o.item = s.id and o.refunded_at is null)) order by s.price)
      from shop_items s where s.active), '[]'::jsonb));
end $$;

create or replace function public.shop_buy(_id text)
 returns text language plpgsql security definer set search_path to 'public' as $$
declare u uuid := auth.uid(); it public.shop_items; b int;
begin
  if u is null then raise exception 'giris'; end if;
  select * into it from shop_items where id = _id and active;
  if not found then return 'yok'; end if;
  select total_points - points_spent into b from profiles where id = u for update;
  if exists (select 1 from owned_items where user_id = u and item = _id and refunded_at is null) then return 'sahip'; end if;
  if coalesce(b, 0) < it.price then return 'yetersiz'; end if;
  update profiles set points_spent = points_spent + it.price where id = u;
  -- daha önce iade edilmişse aynı kayıt yeniden sahiplenilir
  update owned_items set refunded_at = null, ts = now(), price = it.price where user_id = u and item = _id and refunded_at is not null;
  if not found then insert into owned_items(user_id, item, price) values (u, _id, it.price); end if;
  return 'ok';
end $$;

-- İade: 2 saat içinde, ödenen fiyatın tamamı bakiyeye döner. Takılı çerçeve ise çıkarılır.
create or replace function public.shop_refund(_id text)
 returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare u uuid := auth.uid(); o public.owned_items;
begin
  if u is null then raise exception 'giris'; end if;
  perform 1 from profiles where id = u for update;
  select * into o from owned_items where user_id = u and item = _id and refunded_at is null for update;
  if not found then return jsonb_build_object('err', 'yok'); end if;
  if coalesce(o.price, 0) <= 0 then return jsonb_build_object('err', 'ucretsiz'); end if;
  if o.ts <= now() - interval '2 hours' then return jsonb_build_object('err', 'sure'); end if;
  update owned_items set refunded_at = now() where user_id = u and item = _id;
  update profiles set points_spent = greatest(0, points_spent - o.price) where id = u;
  if _id like 'frame:%' then
    update profiles set frame = null where id = u and frame = substr(_id, 7)
      and lvl_of(xp) < coalesce(frame_lv(substr(_id, 7)), 0);
  end if;
  return jsonb_build_object('ok', true, 'p', o.price);
end $$;

-- Sahiplik kontrolü yapan diğer işlevler iade edilmişleri saymasın
do $$
declare s text;
begin
  s := pg_get_functiondef('public.set_frame'::regproc);
  s := replace(s, 'and item = ''frame:'' || _k)', 'and item = ''frame:'' || _k and refunded_at is null)');
  execute s;
  s := pg_get_functiondef('public.ach_cur'::regproc);
  s := replace(s, 'where user_id=_u and item like ''theme:%''', 'where user_id=_u and refunded_at is null and item like ''theme:%''');
  execute s;
end $$;
revoke all on function public.shop_refund(text) from public, anon;
grant execute on function public.shop_refund(text) to authenticated;
