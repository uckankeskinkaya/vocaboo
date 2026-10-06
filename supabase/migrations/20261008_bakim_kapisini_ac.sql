-- BAKIM KAPISINI DEVREYE AL (2/2). Önce 20261008_bakim_modu_ve_odev_hatirlatma.sql çalışmış olmalı.
-- Bu iki satırdan sonra PostgREST her isteğin başında maint_gate()'i çalıştırır. Bakım modu kapalıyken hiçbir şey değişmez.
alter role authenticator set pgrst.db_pre_request = 'public.maint_gate';
notify pgrst, 'reload config';

-- ACİL GERİ ALMA (bir sorun olursa SQL Editor'da çalıştır, kapı kalkar):
-- alter role authenticator reset pgrst.db_pre_request;
-- notify pgrst, 'reload config';
-- Bakım modunu elle kapatmak için:
-- update public.app_settings set value = '0' where key = 'maintenance';
