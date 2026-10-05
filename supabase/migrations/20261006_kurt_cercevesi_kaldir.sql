-- Kurt çerçevesi Pazar'dan kaldırıldı (sahibi yoktu). Kayıt silinmez, sadece pasif.
update public.shop_items set active=false where id='frame:kurt';
