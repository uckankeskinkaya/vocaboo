-- Tema fiyatları sahnenin zenginliğine göre yeniden kademelendi. Çerçeve fiyatlarına dokunulmadı.
update public.shop_items s set price=v.p from (values
 ('theme:cyber',150000),('theme:witcher',150000),
 ('theme:ejder',135000),('theme:adalar',135000),('theme:galaksi',135000),
 ('theme:okyanus',125000),('theme:synthwave',125000),('theme:saat',125000),
 ('theme:yagmur',115000),('theme:lofi',115000),('theme:pati',115000),('theme:petal',115000),
 ('theme:kis',105000),('theme:buyulu',105000),('theme:kod',105000),
 ('theme:aurora',80000),('theme:nebula',80000),('theme:volkan',70000),('theme:siber',70000),('theme:safak',65000),('theme:seker',60000)
) as v(id,p) where s.id=v.id;
