-- Sahneli temalar (12) ve yeni Pazar çerçeveleri (6): fiyatlar ve sahiplik sunucuda.
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
   when 'piksel' then 999 when 'kurt' then 999 else null end $$;

insert into public.shop_items(id,kind,price,active) values
 ('theme:cyber','theme',150000,true),('theme:witcher','theme',150000,true),('theme:minecraft','theme',150000,true),
 ('theme:galaksi','theme',120000,true),('theme:yagmur','theme',90000,true),('theme:kis','theme',90000,true),
 ('theme:okyanus','theme',100000,true),('theme:synthwave','theme',110000,true),('theme:buyulu','theme',100000,true),
 ('theme:petal','theme',90000,true),('theme:kod','theme',100000,true),('theme:ejder','theme',110000,true),
 ('frame:ates','frame',110000,true),('frame:simsek','frame',120000,true),('frame:galaksi','frame',130000,true),
 ('frame:cyberc','frame',90000,true),('frame:piksel','frame',70000,true),('frame:kurt','frame',140000,true)
on conflict (id) do update set price=excluded.price, active=true;
