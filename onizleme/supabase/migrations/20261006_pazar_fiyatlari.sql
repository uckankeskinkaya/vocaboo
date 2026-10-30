-- Pazar fiyatları kaliteye göre yeniden sıralandı (aralık aynı: 60-150 bin). Piksel çerçevesi kaldırıldı (sahibi yoktu).
update public.shop_items set active=false where id='frame:piksel';
update public.shop_items s set price=v.p from (values
 ('frame:cyberc',150000),('frame:galaksi',135000),('frame:altinyagmur',130000),('frame:simsek',120000),('frame:ates',120000),
 ('frame:matrix',95000),('frame:lav',90000),('frame:neongece',85000),('frame:kalp',75000),('frame:hayalet',60000),
 ('theme:cyber',150000),('theme:minecraft',150000),('theme:witcher',145000),
 ('theme:galaksi',130000),('theme:synthwave',130000),('theme:okyanus',120000),('theme:ejder',120000),('theme:kod',115000),
 ('theme:buyulu',110000),('theme:yagmur',105000),('theme:petal',100000),('theme:kis',95000),
 ('theme:aurora',80000),('theme:nebula',80000),('theme:volkan',75000),('theme:siber',70000),('theme:safak',65000),('theme:seker',60000)
) as v(id,p) where s.id=v.id;
