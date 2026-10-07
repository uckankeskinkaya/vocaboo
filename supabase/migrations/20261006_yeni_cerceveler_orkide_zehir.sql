-- Pazar'a iki yeni çerçeve: Orkide ve Zehir.
create or replace function public.frame_lv(_k text) returns integer
language sql immutable set search_path = '' as $$
  select case _k when 'nane' then 3 when 'sakura' then 5 when 'lavanta' then 7 when 'orman' then 9 when 'limon' then 11
   when 'buz' then 13 when 'deniz' then 16 when 'kahve' then 19 when 'altin' then 20 when 'mercan' then 23
   when 'gunbatimi' then 26 when 'gece' then 30 when 'zumrut' then 35 when 'seker' then 40 when 'safak' then 45
   when 'elmas' then 50 when 'siber' then 60 when 'volkan' then 70 when 'nebula' then 80 when 'aurora' then 88
   when 'tac' then 95 when 'prizma' then 100
   when 'neongece' then 999 when 'kalp' then 999 when 'matrix' then 999 when 'lav' then 999
   when 'hayalet' then 999 when 'altinyagmur' then 999
   when 'ates' then 999 when 'simsek' then 999 when 'galaksi' then 999 when 'cyberc' then 999
   when 'kurt' then 999 when 'piksel' then 999
   when 'orkide' then 999 when 'zehir' then 999 else null end $$;
insert into public.shop_items(id,kind,price,active) values ('frame:orkide','frame',85000,true),('frame:zehir','frame',125000,true)
on conflict (id) do update set price=excluded.price, active=true;
