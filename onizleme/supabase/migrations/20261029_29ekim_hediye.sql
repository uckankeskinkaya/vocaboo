-- 29 Ekim: Cumhuriyet teması bütün kullanıcılara hediye (fiyat 0 = iade edilemez). Pazar'da satılmadığı için shop_items satırı yok
-- (shop_items fiyatı > 0 olmalı). Çerçeve şimdilik iptal: frame:cumhuriyet verilmez.
insert into public.owned_items(user_id,item,price)
select p.id, 'theme:cumhuriyet', 0 from public.profiles p
where not exists (select 1 from public.owned_items o where o.user_id=p.id and o.item='theme:cumhuriyet');
