-- Oda kanalları ('ka-ODAKODU') özel kanal: yalnızca giriş yapmış kullanıcılar katılır, okur ve yazar.
-- UYGULANDI (2026-10-05).
-- ÖNEMLİ: Politikalar yalnızca ÖZEL kanalları korur. Herkesin açık kanal kullanmasını da engellemek için
-- Supabase paneli > Realtime > Settings > "Allow public access" ayarını KAPAT.
-- (İstemci önce özel kanalı dener, kurulamazsa bir kez açık kanala geri düşer.)
create policy "ka kanallarini giris yapanlar okur"
  on realtime.messages for select to authenticated
  using (realtime.messages.extension in ('broadcast', 'presence') and (select realtime.topic()) like 'ka-%');

create policy "ka kanallarina giris yapanlar yazar"
  on realtime.messages for insert to authenticated
  with check (realtime.messages.extension in ('broadcast', 'presence') and (select realtime.topic()) like 'ka-%');
