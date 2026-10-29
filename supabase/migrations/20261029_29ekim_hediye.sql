-- 29 Ekim: Cumhuriyet teması ve çerçevesi bütün kullanıcılara hediye (fiyat 0 = iade edilemez). Pazar'da satılmaz (active=false).
-- ONAY BEKLİYOR: kullanıcı revize ettikten sonra uygulanacak.
insert into public.shop_items(id,kind,price,active) values ('theme:cumhuriyet','theme',0,false),('frame:cumhuriyet','frame',0,false)
on conflict (id) do update set price=0,active=false,kind=excluded.kind;
insert into public.owned_items(user_id,item,price)
select p.id, x.item, 0 from public.profiles p cross join (values ('theme:cumhuriyet'),('frame:cumhuriyet')) as x(item)
where not exists (select 1 from public.owned_items o where o.user_id=p.id and o.item=x.item);
