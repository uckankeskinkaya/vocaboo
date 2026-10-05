// İngilizce arayüz çevirileri (ek): rozetler, şifre sıfırlama, kullanıcı adı, skor tablosu, şampiyon penceresi, Arena, yönetici.
// Yeni bir ekran/metin eklenince buraya da eklenmeli; tests/dil.test.js çevrilmemiş Türkçe metni yakalar.
Object.assign(EN,{
// Rozet adları
'İlk kelime':'First word','50 kelime':'50 words','100 kelime':'100 words','250 kelime':'250 words','500 kelime':'500 words','1000 kelime':'1000 words',
'İlk denemede 10':'10 on first try','İlk denemede 50':'50 on first try','İlk denemede 100':'100 on first try',
'Seri 10':'Streak 10','Seri 25':'Streak 25','Seri 50':'Streak 50',
'500 puan rekoru':'500-point record','1500 puan rekoru':'1500-point record','3000 puan rekoru':'3000-point record','5000 puan rekoru':'5000-point record',
'Günlük 3 gün':'Daily: 3 days','Günlük 7 gün':'Daily: 7 days','Günlük 30 gün':'Daily: 30 days','Günlük 50 gün':'Daily: 50 days',
'10 günlük zafer':'10 daily wins','25 günlük zafer':'25 daily wins','Keskin nişancı':'Sharpshooter','Fotoğraflı profil':'Profile photo',
'Haftanın şampiyonu':'Weekly champion','3 hafta şampiyon':'3-week champion','Podyum 5 kez':'5 podium finishes','Seri oyuncusu':'Streak player','Bağımsız':'Independent',
// Rozet açıklamaları (sabit olanlar)
'Herhangi bir kelimeyi doğru bil.':'Guess any word correctly.',
'En az 50 kelime oyna ve doğruluğunu yüzde 80 üstünde tut.':'Play at least 50 words and keep your accuracy above 80%.',
'Profiline bir fotoğraf veya avatar ekle.':'Add a photo or an avatar to your profile.',
'Son seviye olan 100. seviyeye ulaş.':'Reach level 100, the final level.',
'En az 100 kelime çöz ve en fazla 5 ipucu kullan.':'Solve at least 100 words and use at most 5 hints.',
'Bir haftayı Seri Modu puanında birinci bitir.':'Finish a week in first place on the Streak Mode score.',
// Rozet ekranı ve bildirimler
'Sıran':'Your rank','Kazanıldı':'Earned','Puan yarışı':'Points race','Grup (moderatörlü)':'Group (moderated)','Hayatta kalma':'Survival','Şu an:':'Current:','Geçen haftanın sıralaması.':"Last week's ranking.",'Tüm tablo':'Full table','Devam':'Continue','Evet, sil':'Yes, delete',
// Giriş, şifre sıfırlama
'Mail ya da telefon istenmez. Şifreni unutursan "Şifremi unuttum" ile yöneticiye talep gönderebilirsin.':'No email or phone needed. If you forget your password, use "Forgot password" to send a request to the admin.',
'Kullanıcı adını yaz. Talebin yöneticiye gider. Yönetici sana 8 karakterli geçici bir kod verince, giriş ekranında kodu şifre yerine yaz. Sonra yeni şifreni belirlersin.':'Enter your username. Your request goes to the admin. When the admin gives you an 8-character temporary code, type it as your password on the login screen. Then you set a new password.',
'Geçici kodla giriş yaptın. Devam etmek için kendi şifreni belirle. En az 8 karakter.':'You logged in with a temporary code. Set your own password to continue. At least 8 characters.',
'En az 8 karakter.':'At least 8 characters.','Yeni şifre':'New password','Yeni şifre (tekrar)':'New password (repeat)','Çıkış yap':'Log out','Kopyala':'Copy','Tamam':'OK','Kopyalandı':'Copied',
'Kopyalanamadı, kodu elle yaz':'Could not copy, type the code by hand','Geçici şifre:':'Temporary password:',
'Bu kodu şimdi kullanıcıya ilet, bir daha gösterilmez. Kullanıcı giriş ekranında kodu şifre yerine yazacak, sonra kendi şifresini belirleyecek.':'Give this code to the user now, it will not be shown again. The user types the code as the password on the login screen, then sets their own password.',
'Talebin yöneticiye iletildi. Geçici kodu alınca şifre yerine yazıp giriş yap.':'Your request was sent to the admin. When you get the temporary code, type it as your password and log in.',
'Kullanıcı adı 3-16 karakter olmalı: a-z, 0-9 ve _.':'Username must be 3-16 characters: a-z, 0-9 and _.','Şifre en az 8 karakter olmalı.':'Password must be at least 8 characters.','İki şifre aynı değil.':"The two passwords don't match.",
'Yeni şifre eskisinden farklı olmalı.':'The new password must be different from the old one.','Şifre kabul edilmedi. Daha uzun ya da farklı bir şifre dene.':'Password not accepted. Try a longer or different one.',
'Şifre değiştirilemedi. Biraz sonra tekrar dene.':'Could not change the password. Try again in a moment.','Şifre değişti ama doğrulanamadı. Çıkış yapıp yeni şifrenle giriş yap.':'Password changed but could not be verified. Log out and log in with your new password.',
'Şifren değişti.':'Your password was changed.','Talep gönderilemedi. Biraz sonra tekrar dene.':'Could not send the request. Try again in a moment.','Bu özellik sunucuda henüz kurulmadı.':'This feature is not set up on the server yet.',
'Bu özellik sunucuda henüz kurulmadı. Yöneticiye haber ver.':'This feature is not set up on the server yet. Tell the admin.','Şifre sıfırlama sunucuda henüz kurulmadı.':'Password reset is not set up on the server yet.',
'Şifre sıfırlama sunucuda henüz kurulmadı':'Password reset is not set up on the server yet','Silme özelliği sunucuda henüz kurulmadı':'Deleting is not set up on the server yet',
// Kullanıcı adı
'3-16 karakter: a-z, 0-9 ve _. Giriş yaparken de yeni adını kullanacaksın. Günde bir kez değiştirebilirsin.':'3-16 characters: a-z, 0-9 and _. You will use the new name to log in too. You can change it once a day.',
'Bu zaten senin kullanıcı adın.':'That is already your username.','Bu kullanıcı adı kullanılamaz.':'That username cannot be used.','Kullanıcı adını günde bir kez değiştirebilirsin.':'You can change your username once a day.',
'Profil bulunamadı.':'Profile not found.','Değiştirilemedi. Biraz sonra tekrar dene.':'Could not change it. Try again in a moment.','Değiştirilemedi.':'Could not change it.',
// Yönetici
'Kullanıcılar':'Users','Kelimeler':'Words','Sınıf kodu ve duyuru':'Class code and announcement','Şüpheli raporu':'Suspicious report','Tüm skorları sıfırla':'Reset all scores',
'Skorunu sıfırla':'Reset score','Avatarını sil':'Delete avatar','Sınıftan çıkar':'Remove from class','Sınıfa al':'Add to class','Engelle':'Ban','Engeli kaldır':'Unban','Seviye ayarla':'Set level',
'Bekleyen talep yok.':'No pending requests.','Kendi hesabını silemezsin':"You can't delete your own account",'Yönetici hesabı silinemez':'An admin account cannot be deleted','Kullanıcı bulunamadı':'User not found',
'Kendi şifreni burada sıfırlayamazsın':"You can't reset your own password here",'Yönetici hesabı sıfırlanamaz':'An admin account cannot be reset',
// Arena
'Arena başlatılamadı. Oda sunucuda kurulamadı.':'Arena could not start. The room could not be created on the server.','Arenaya katılınamadı.':'Could not join the Arena.','Arena dolu.':'The Arena is full.',
'Sonraki soru alınamadı.':'Could not get the next question.','Sonuçlar alınamadı.':'Could not get the results.','Çok fazla oda kurdun, biraz bekle.':'You created too many rooms, wait a bit.','Arena sunucuda kurulamadı':'Arena could not be created on the server'
});
const ord=n=>{n=+n;return n+(n%100>=11&&n%100<=13?'th':({1:'st',2:'nd',3:'rd'})[n%10]||'th')};
RX.push(
[/^(\d+) dakika$/,'$1 minutes'],
// Rozet açıklamaları (sayılı)
[/^Toplam (\d+) kelimeyi doğru çöz\.$/,'Solve $1 words correctly in total.'],
[/^(\d+) kelimeyi ilk tahminde bil\.$/,'Guess $1 words on the first try.'],
[/^Seri Modunda üst üste (\d+) kelime bil\.$/,'Guess $1 words in a row in Streak Mode.'],
[/^Seri Modunda tek oyunda (\d+) puana ulaş\.$/,'Reach $1 points in a single Streak Mode game.'],
[/^Günün kelimesini (\d+) gün üst üste bil\.$/,'Guess the word of the day $1 days in a row.'],
[/^Günün kelimesini toplam (\d+) kere bil\.$/,'Guess the word of the day $1 times in total.'],
[/^(\d+)\. seviyeye ulaş\.$/,'Reach level $1.'],
[/^Seri Modunu (\d+) kez başlat\.$/,'Start Streak Mode $1 times.'],
[/^(\d+) haftayı Seri Modu puanında birinci bitir\.$/,'Finish $1 weeks in first place on the Streak Mode score.'],
[/^Haftalık sıralamada (\d+) kez ilk 3'e gir\.$/,'Reach the top 3 in the weekly ranking $1 times.'],
// Rozet ekranı, bildirimler
[/^(\d+)\/(\d+) rozet açık\. Kilitli rozetlerin altında nasıl kazanacağın yazıyor\.$/,'$1/$2 badges unlocked. Locked badges show how to earn them.'],
[/^Yeni rozet: (.+)$/,(m,l)=>'New badge: '+l.split(', ').map(x=>EN[x]||x).join(', ')],
[/^Sen (\d+)\. oldun! \+([\d.]+) puan ve rozet kazandın\.$/,(m,r,p)=>'You came in '+ord(r)+'! +'+p.replace(/\./g,',')+' points and a badge.'],
[/^Şifre talepleri \((\d+)\)$/,'Password requests ($1)'],
[/^Pas, (\d+) hakkın var$/,'Skip, $1 left'],
// Yönetici
[/^: (sınıf|dışarıdan)(, engelli)?, rekor (\d+), Sv\.(\d+), (\d+) XP$/,(m,a,b,c,d,e)=>': '+(a==='sınıf'?'class':'external')+(b?', banned':'')+', best '+c+', Lv.'+d+', '+e+' XP'],
[/^(.+) kalıcı olarak silinsin mi\? Hesabı, skorları, arkadaşlıkları ve satın alımları geri alınamaz şekilde silinir\.$/,'$1 will be permanently deleted. Their account, scores, friendships and purchases are removed and cannot be restored.'],
[/^Son uyarı: (.+) hesabı tamamen silinecek\. Emin misin\?$/,'Final warning: the account $1 will be completely deleted. Are you sure?'],
[/^(.+) için geçici şifre üretilsin mi\? Kullanıcının açık oturumları kapanır ve eski şifresi geçersiz olur\.$/,'Generate a temporary password for $1? Their open sessions end and the old password stops working.']
);
