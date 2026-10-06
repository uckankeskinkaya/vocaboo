
// v3: alt menü + arayüz dili (TR/EN). Oyun mantığına dokunmaz; metinleri çalışma anında çevirir.
const LG=()=>{try{return localStorage.getItem('ka_lang')||'tr'}catch(e){return'tr'}};
const EN={
'Oyna':'Play','Sıralama':'Ranks','Arkadaşlar':'Friends','Profil':'Profile','Ayarlar':'Settings',
'Hoş geldin':'Welcome','Bugün hangi kelimeyi avlıyoruz?':'Which word are we hunting today?','Yeri doğru':'Right spot','Yeri yanlış':'Wrong spot','Kelimede yok':'Not in word',
'Günün kelimesi':'Word of the day','Herkes aynı kelimeyi çözüyor':'Everyone solves the same word','Sadece 3 hak. Her gün yeni bir kelime.':'Only 3 tries. A new word every day.',
'Seri Modu':'Streak Mode','3 can, giderek zorlaşan kelimeler':'3 lives, increasingly hard words','Alıştırma':'Practice','Seviyeni seç, rahat çalış':'Pick your level, study at ease',
'1v1 ya da grup, oda koduyla':'1v1 or group, with a room code','Skor tablosu':'Leaderboard','Haftalık ve tüm zamanlar':'Weekly and all-time','İngilizce kelime oyunu':'English word game','Giriş yap veya kayıt ol':'Log in or sign up',
'Günlük konuşma kelimeleri':'Everyday words','Biraz daha zor':'A bit harder','Akıcı kullanım':'Fluent usage','İleri kelimeler':'Advanced words','Ana menü':'Main menu','Seviyeler':'Levels','Çık':'Exit','Geri':'Back',
'Sil':'Del','Gönder':'Submit','Pas':'Skip','Boş kutuları doldur.':'Fill in the empty boxes.','Doğru!':'Correct!','Haklar bitti. Cevap:':'Out of tries. Answer:','Paylaş':'Share','Kelimeler':'Words',
'Sonraki kelime':'Next word','Yeniden oyna':'Play again','Sonuçlar':'Results','Kapat':'Close','Devam et':'Keep going','Vazgeç':'Cancel','Tamam':'OK','Evet':'Yes','İptal':'Cancel',
'Seri bitti.':'Streak over.','Pas hakkı kazandın!':'You earned a skip!','Bağlantı hatası':'Connection error','Bağlantı hatası, tekrar dene.':'Connection error, try again.','Yükleniyor...':'Loading...','Bekle...':'Please wait...',
'Seri modu için giriş yap':'Log in for Streak mode','Online için giriş yap':'Log in for Online','Günlük için giriş yap':'Log in for Daily','Arkadaşlar için giriş yap':'Log in for Friends',
'Kullanıcı adı (3-16 karakter: a-z, 0-9, _)':'Username (3-16 chars: a-z, 0-9, _)','Şifre (en az 8 karakter)':'Password (min 8 characters)',
'Sınıf kodu (sınıftansan gir, dışarıdansan boş bırak)':'Class code (enter if you are in a class, otherwise leave blank)','Giriş yap':'Log in','Kayıt ol':'Sign up',
'Mail ya da telefon istenmez. Şifreni unutursan kurtarma yolu yoktur.':'No email or phone needed. If you forget your password there is no recovery.',
'Kullanıcı adı ya da şifre yanlış.':'Wrong username or password.','Bu kullanıcı adı alınmış.':'That username is taken.',
'Rozetler':'Badges','Unvan ilerlemesi':'Title progress','Seri rekoru':'Streak record','En uzun seri':'Longest streak','Doğruluk':'Accuracy','Ortalama tahmin':'Avg. guesses','İlk denemede':'First try',
'İpucu kullanımı':'Hints used','Toplam puan':'Total points','Seri oyunu':'Streak runs','Günlük kazanılan':'Daily wins','Günlük seri':'Daily streak','Kelime defterim':'My word book',
'Fotoğraf yükle':'Upload photo','Hazır avatar seç':'Choose avatar','Çıkış yap':'Log out','Avatarını seç':'Pick your avatar','Açık':'On','Kapalı':'Off','Kilitli':'Locked',
'Çaylak':'Rookie','Meraklı':'Curious','Kelime Avcısı':'Word Hunter','Usta':'Master','Efsane':'Legend',
'Tüm zamanlar':'All-time','Haftalık':'Weekly','Geçen hafta':'Last week','Henüz kayıt yok.':'No records yet.','Skor tablosu yüklenemedi.':'Could not load the leaderboard.',
'Bu haftanın Seri Modu puanı. Pazartesi sıfırlanır.':"This week's Streak score. Resets on Monday.",'Geçen haftanın şampiyonları':"Last week's champions",
'Sınıf':'Class','Kodun:':'Your code:','Kopyala':'Copy','Arkadaş ekle':'Add friend','Arkadaş kodu':'Friend code','İstekler':'Requests','Kabul':'Accept','Reddet':'Decline','Kabul et':'Accept',
'Çevrimiçi':'Online','Çevrimdışı':'Offline','Henüz arkadaşın yok. Kodunu paylaş veya arkadaşının kodunu gir.':'No friends yet. Share your code or enter a friend\'s code.',
'Rastgele maç (1v1)':'Random match (1v1)','Oda kur':'Create room','Ya da oda kodunu gir':'Or enter a room code','Odaya katıl':'Join room','Oyuncu:':'Player:','Rakip aranıyor...':'Searching for opponent...',
'Oda kodu':'Room code','Kurucunun başlatması bekleniyor.':'Waiting for the host to start.','Rakip':'Opponent','Sen':'You','Kişi':'Players','Mod':'Mode','Seviye':'Level','Odayı kur':'Create room',
'1v1 (2 kişi)':'1v1 (2 players)','Grup':'Group','Puan yarışı, 15 kelime':'Points race, 15 words','Puan yarışı, 20 kelime':'Points race, 20 words','Hayatta kalma, 3 dakika':'Survival, 3 minutes','Hayatta kalma, 5 dakika':'Survival, 5 minutes',
'Karışık (B1 ile B2)':'Mixed (B1 to B2)','Elendin!':'Eliminated!','Son kelime!':'Last word!','Oda dolu.':'Room is full.',
'Ses':'Sound','Titreşim':'Vibration','Müzik':'Music','Renk körü modu':'Colorblind mode','Müzik sesi:':'Music volume:','Tema seç':'Choose theme','Ana ekrana ekle':'Add to home screen',
'Titreşim iPhone ve iPad tarayıcılarında çalışmaz.':'Vibration does not work in iPhone and iPad browsers.','Yönetici paneli':'Admin panel','Arayüz dili':'Interface language',
'Aydınlık':'Light','Karanlık':'Dark','Gün batımı':'Sunset','Nane':'Mint','Orman':'Forest','Deniz':'Sea','Kahve':'Coffee','Lavanta':'Lavender'};
const RX=[[/^Merhaba, /,'Hello, '],[/^(\d+) puan$/,'$1 pts'],[/^\+(\d+) puan$/,'+$1 pts'],[/^Kalan hak: (\d+)$/,'Tries left: $1'],[/^(\d+) harf$/,'$1 letters'],
[/^Seviye (.+)$/,'Level $1'],[/\bSeri (\d+) Pas (\d+)/,'Streak $1 Skips $2'],[/^Pas \((\d+)\)$/,'Skip ($1)'],[/^Seri: (\d+)/,'Streak: $1'],[/^Puan: /,'Score: '],
[/^1 can kaybettin, kalan: (\d+)$/,'You lost 1 life, left: $1'],[/\(-10 puan\)/,'(-10 pts)'],[/^Örnek cümle: /,'Example sentence: '],[/^İpucu: ilk harf (.), (\d+) harf/,'Hint: first letter $1, $2 letters'],
[/^Rozetler \((.+)\)$/,'Badges ($1)'],[/^Bu oyundaki kelimeler \((\d+)\)$/,'Words in this game ($1)'],[/^Kelime defterim \((\d+)\)$/,'My word book ($1)'],
[/^Arkadaşların \((\d+)\)$/,'Your friends ($1)'],[/^Sınıftakiler \((\d+)\)$/,'Classmates ($1)'],[/^Başlat \((\d+) oyuncu\)$/,'Start ($1 players)'],[/^(\d+) kelime$/,'$1 words'],[/^rekor (\d+)$/,'best $1'],
[/^Gerçekten çıkmak istiyor musun\? /,'Do you really want to quit? '],[/^Doğru (\d+)/,'Correct $1'],[/^Kelime (\d+)\/(\d+)$/,'Word $1/$2'],[/^Ses: (Açık|Kapalı)$/,m=>'Sound: '+(/Açık/.test(m)?'On':'Off')]];
RX.push([/^Son görülme: (az önce|1 aydan uzun süre önce|\d+ (?:dk|sa|gün) önce)$/,(m,v)=>'Last seen: '+v.replace('az önce','just now').replace('1 aydan uzun süre önce','over a month ago').replace(/(\d+) dk önce/,'$1 min ago').replace(/(\d+) sa önce/,'$1 h ago').replace(/(\d+) gün önce/,'$1 d ago')]);
['Titreşim:Vibration','Müzik:Music','Renk körü modu:Colorblind mode'].forEach(p=>{const [a,b]=p.split(':');RX.push([new RegExp('^'+a+': (Açık|Kapalı)$'),(m,v)=>b+': '+(v==='Açık'?'On':'Off')])});
function l1(x){if(EN[x])return EN[x];for(const [r,t] of RX){if(r.test(x))return x.replace(r,t)}
  if(/, | · /.test(x)){const p=x.split(/(, | · )/).map((s,i)=>i%2?s:(EN[s]||l1b(s)));return p.join('')}return x}
function l1b(x){for(const [r,t] of RX){if(r.test(x))return x.replace(r,t)}return x}
function trs(s){const m=s.match(/^(\s*)([\s\S]*?)(\s*)$/);if(!m[2])return s;return m[1]+(EN[m[2]]||m[2].split('\n').map(l1).join('\n'))+m[3]}
const OR=new WeakMap(),AP=new WeakMap();let SWU=0;
function sweep(){
  const en=LG()==='en';if(!en&&!SWU)return;SWU=en;const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;
  while(n=w.nextNode()){
    const p=n.parentNode&&n.parentNode.nodeName;if(p==='SCRIPT'||p==='STYLE')continue;
    const v=n.nodeValue;let o=OR.get(n);
    if(o===undefined||(v!==o&&v!==AP.get(n))){o=v;OR.set(n,o)}
    const t=en?trs(o):o;AP.set(n,t);if(t!==v)n.nodeValue=t;
  }
  document.querySelectorAll('[placeholder],[aria-label]').forEach(e=>['placeholder','aria-label'].forEach(a=>{
    if(!e.hasAttribute(a))return;const k='o'+a.length;if(!(k in e.dataset)||(e.getAttribute(a)!==e.dataset[k]&&e.getAttribute(a)!==e.dataset[k+'t']))e.dataset[k]=e.getAttribute(a);
    const t=en?trs(e.dataset[k]):e.dataset[k];e.dataset[k+'t']=t;if(e.getAttribute(a)!==t)e.setAttribute(a,t)}));
}
function setLang(l){try{localStorage.setItem('ka_lang',l)}catch(e){}document.documentElement.lang=l;sweep()}
new MutationObserver(sweep).observe(document.body,{childList:true,subtree:true,characterData:true});
const _al=window.alert;window.alert=m=>_al(LG()==='en'?trs(String(m)):m);

// Alt menü
const IC={m:'<path d="M5 8h14l-1 12H6z"/><path d="M9 8a3 3 0 016 0"/>',p:'<path d="M8 5v14l11-7z"/>',r:'<path d="M6 20V10M12 20V4M18 20v-7"/>',f:'<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5M17 11a3 3 0 100-6M21 20c0-2-1.5-3.5-3-4"/>',u:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',s:'<path d="M4 8h10M18 8h2M4 16h2M10 16h10"/><circle cx="16" cy="8" r="2"/><circle cx="8" cy="16" r="2"/>'};
const NV=[['p','Oyna',()=>oExit()],['r','Sıralama',()=>aBoard()],['f','Arkadaşlar',()=>aFriends('f')],['m','Pazar',()=>aShop()],['u','Profil',()=>prof?aProfile():aAuth()],['s','Ayarlar',()=>aSettings()]];
document.body.insertAdjacentHTML('beforeend','<nav id="nav">'+NV.map(x=>'<button><svg viewBox="0 0 24 24">'+IC[x[0]]+'</svg><span>'+x[1]+'</span></button>').join('')+'</nav>');
function setTab(i){document.querySelectorAll('#nav button').forEach((b,j)=>b.classList.toggle('on',j===i))}
document.querySelectorAll('#nav button').forEach((b,i)=>b.onclick=()=>{
  $('menu').hidden=true;$('wv').hidden=true;
  if(i===0||ch||mmOn)oExit();
  if(i>0)NV[i][2]();
  setTab(i);
});
$('fb')&&document.querySelectorAll('#nav button')[2].appendChild($('fb'));
const _oe=oExit;oExit=function(m){_oe(m);setTab(0)};
const _as=aSettings;
aSettings=function(){
  _as();const o=$('ob');if(!o)return;
  o.insertAdjacentHTML('beforebegin','<p>Arayüz dili</p><div class="seg"><button data-lg="tr">Türkçe</button><button data-lg="en">English</button></div>');
  document.querySelectorAll('[data-lg]').forEach(b=>{b.classList.toggle('on',b.dataset.lg===LG());b.onclick=()=>{setLang(b.dataset.lg);aSettings()}});
};
setTab(0);setLang(LG());
