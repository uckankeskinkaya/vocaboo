-- Dört yeni sahneli tema Pazar'a eklendi: Saat İşleri, Gök Adaları, Korsan Koyu, Lo-fi Oda.
insert into public.shop_items(id,kind,price,active) values
 ('theme:saat','theme',125000,true),('theme:korsan','theme',125000,true),
 ('theme:lofi','theme',115000,true),('theme:adalar','theme',110000,true)
on conflict (id) do update set price=excluded.price,active=true;
