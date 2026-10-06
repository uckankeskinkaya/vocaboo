// v34: İngilizce arayüz çevirileri: görevler, istatistik, öğretmen paneli, ödev, hata mesajları. (tests/dil-yeni.test.js ile doğrulanır)
Object.assign(EN,{
'Metinde < ve > karakterleri kullanılamaz.':'The characters < and > cannot be used in the text.',
'✓ Alındı':'✓ Claimed','🎁 Üç görevi de bitirince ekstra ödül:':'🎁 Extra reward for finishing all three:','📚 Ödevlerim':'📚 My assignments','🎓 Öğretmen paneli':'🎓 Teacher panel',
'Son 30 gün, sınıf öğrencileri. En az 2 kişinin denediği, çözülemeyenler öne çıkar.':'Last 30 days, class students. Words tried by at least 2 people and not solved come first.',
'Bu kelimeler sadece sınıftakilere ve sana "Sınıf" seviyesinde (alıştırma ve oda kurarken) görünür.':'These words are only visible to your class and you, at the "Class" level (in practice and when creating rooms).',
'Düzenle':'Edit','Ekle':'Add','bugün':'today','hiç girmedi':'never logged in','az önce':'just now','sunucu hatası':'server error','hata':'error',
'Kelime (a-z, 3-14 harf)':'Word (a-z, 3-14 letters)','Örnek cümle (isteğe bağlı, kelimeyi içermeli)':'Example sentence (optional, must contain the word)',
'Her satıra bir kelime:':'One word per line:','kelime | İngilizce tanım | tanımın Türkçesi | örnek cümle':'word | English definition | Turkish translation of the definition | example sentence',
". Türkçe ve örnek cümle boş bırakılabilir. Excel'den yapıştırırsan sekmeyle ayrılmış da olur. En fazla 100 satır.":". The Turkish translation and the example sentence can be left empty. Tab-separated text pasted from Excel also works. Up to 100 lines.",
'Örn. Hafta 3 kelimeleri':'E.g. Week 3 words','(son 7 gün)':'(last 7 days)','Önce kelimeleri yaz.':'Write the words first.','Sınıfta henüz öğrenci yok.':'There are no students in the class yet.',
'Henüz yeterli veri yok.':'Not enough data yet.','Henüz kelime eklemedin.':'You have not added any words yet.','Yetkin yok.':'You do not have permission.','Yapılamadı':'Could not do it',
'Kelime 3-14 harf, sadece a-z olmalı.':'The word must be 3-14 letters, a-z only.','Tanım 3-200 karakter olmalı.':'The definition must be 3-200 characters.','Türkçesi en fazla 200 karakter.':'The Turkish text can be at most 200 characters.',
'Örnek cümle kelimeyi içermeli.':'The example sentence must contain the word.','Bu kelime zaten sınıf listende.':'This word is already in your class list.','Sınıf listesi dolu (500).':'The class list is full (500).','Kelime bulunamadı.':'Word not found.',
'Yüklenemedi. Biraz sonra tekrar dene.':'Could not load. Try again in a bit.','Bu özellik sunucuda henüz kurulmadı.':'This feature is not set up on the server yet.',
'Başlık 2-60 karakter olmalı (< ve > kullanılamaz).':'The title must be 2-60 characters (< and > not allowed).','Son gün geçmiş olamaz.':'The due date cannot be in the past.','En az 1, en fazla 50 sınıf kelimesi seç.':'Pick between 1 and 50 class words.','En fazla 30 aktif ödev olabilir.':'There can be at most 30 active assignments.',
'Ödevler yüklenemedi. Biraz sonra tekrar dene.':'Could not load assignments. Try again in a bit.','Kaydedilemedi.':'Could not save.','Kaydedildi':'Saved','Silindi':'Deleted'
,'Hesap açıldı ama oturum başlamadı. Supabase ayarlarında Confirm email kapalı olmalı.':'Account created but no session started. "Confirm email" must be turned off in Supabase settings.',
'Profil oluşturulamadı. SQL kurulumunu kontrol et.':'Could not create the profile. Check the SQL setup.','Fotoğraf kaydedilemedi.':'Could not save the photo.','Görsel açılamadı.':'Could not open the image.',
'Kod kopyalandı':'Code copied','Çıkmak için tekrar geri bas':'Press back again to exit','Davetin süresi dolmuş.':'The invite has expired.','Bu tarayıcı sesli okumayı desteklemiyor.':'This browser does not support text-to-speech.',
'Sonuç kopyalandı':'Result copied','Kopyalanamadı':'Could not copy','Kaydedilemedi, tekrar dene.':'Could not save, try again.','Oyun herkes için bitsin mi?':'End the game for everyone?',
'Tüm kullanıcıların skorları (haftalık ve tüm zamanlar) sıfırlanacak. Emin misin?':'Everyone\'s scores (weekly and all-time) will be reset. Are you sure?','Oda sunucuda kurulamadı':'Could not create the room on the server'
});
// Birleşik metinler: ' · ' ile bölününce her parça ayrı çevrilir
RX.unshift([/^Seviye (\d+) · (.+)$/,(m,a,b)=>'Level '+a+' · '+l1(b)]);
RX.push(
 [/^Bağlantı sorunu, yerel alıştırma açıldı \((.*)\)$/,(m,a)=>'Connection problem, local practice opened ('+a+')'],
 [/^Son uyarı: (.+) hesabı tamamen silinecek\. Emin misin\?$/,(m,a)=>'Final warning: the account '+a+' will be permanently deleted. Are you sure?'],
 [/^(.+) kalıcı olarak silinsin mi\? Hesabı, skorları, arkadaşlıkları ve satın alımları geri alınamaz şekilde silinir\.$/,(m,a)=>'Permanently delete '+a+'? Their account, scores, friendships and purchases will be deleted and cannot be restored.'],
 [/^(.+) için öğretmen yetkisi alınsın mı\?$/,(m,a)=>'Remove the teacher role from '+a+'?'],
 [/^(.+) öğretmen yapılsın mı\? Sınıf öğrencilerinin ilerlemesini görür ve kendi kelimelerini ekler\.$/,(m,a)=>'Make '+a+' a teacher? They can see class progress and add their own words.'],
 [/^"(.+)" ödevi silinsin mi\? Öğrencilerin listesinden kalkar\.$/,(m,a)=>'Delete the assignment "'+a+'"? It will disappear from students\' lists.'],
 [/^(.+) silinsin mi\?$/,(m,a)=>'Delete '+a+'?'],
 [/^(\d+)\/(\d+) tamamlandı$/,(m,a,b)=>a+'/'+b+' completed'],
 [/^(\d+)\/(\d+) kelime ·$/,(m,a,b)=>a+'/'+b+' words ·'],
 [/^(\d+)\/(\d+) öğrenci bitirdi$/,(m,a,b)=>a+'/'+b+' students finished'],
 [/^Son 7 günde oynayan: (.+)$/,(m,a)=>'Played in the last 7 days: '+a],
 [/^Bu hafta (\d+) kelime$/,(m,a)=>'This week '+a+' words'],
 [/^(\d+)\/7 gün$/,(m,a)=>a+'/7 days'],
 [/^doğruluk (.+)$/,(m,a)=>'accuracy '+a],
 [/^(\d+) dk önce$/,(m,a)=>a+' min ago'],[/^(\d+) sa önce$/,(m,a)=>a+' h ago'],[/^(\d+) gün önce$/,(m,a)=>a+' days ago'],
 [/^(\d+) kelime çözdü$/,(m,a)=>'solved '+a+' words'],
 [/^günlük seri (\d+)$/,(m,a)=>'daily streak '+a],
 [/^(\d+)\/(\d+) çözemedi$/,(m,a,b)=>a+'/'+b+' failed'],
 [/^(\d+) kelime eklendi\.$/,(m,a)=>a+' words added.'],
 [/^(\d+)\. satır \((.*)\): (.+)$/,(m,a,b,c)=>'Line '+a+' ('+b+'): '+l1(c)]
);
