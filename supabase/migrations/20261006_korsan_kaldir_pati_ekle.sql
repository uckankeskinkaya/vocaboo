-- Korsan Koyu teması kaldırıldı (sahibi yoktu), yerine Pati Bahçesi eklendi.
update public.shop_items set active=false where id='theme:korsan';
insert into public.shop_items(id,kind,price,active) values ('theme:pati','theme',115000,true)
on conflict (id) do update set price=excluded.price,active=true;
