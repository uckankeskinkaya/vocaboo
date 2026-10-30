// v24: (1) "Nasıl oynanır?" kısa tur: ilk açılışta bir kez, Ayarlar'dan her zaman. (2) Kelime defteri "Tekrar et" testi.
(function(){
Object.assign(EN,{
  'Nasıl oynanır?':'How to play','Atla':'Skip','İleri':'Next','Geri':'Back','Başla':'Start',
  'Gizli kelimeyi bul':'Find the hidden word','Gizli bir İngilizce kelime var. İpucu olarak anlamını görürsün. Harfleri yaz ve Gönder\'e bas.':'There is a hidden English word. You see its meaning as a clue. Type the letters and press Send.',
  'Renkler ne demek?':'What do the colors mean?','Doğru harf, doğru yerde':'Right letter, right place','Harf kelimede var ama yeri yanlış':'Letter is in the word but in the wrong place','Harf kelimede yok':'Letter is not in the word',
  'Oyun modları':'Game modes','Günlük: herkes aynı kelimeyi çözer, 3 hak':'Daily: everyone solves the same word, 3 tries','Seri: 3 can, giderek zorlaşan kelimeler':'Streak: 3 lives, words get harder','Alıştırma: seviyeni seç, rahat çalış':'Practice: pick your level and study calmly','Online: arkadaşınla ya da sınıfla yarış':'Online: compete with a friend or your class',
  'Puan, Pazar ve bonus':'Points, Market and bonus','Kelimeleri bildikçe puan kazanırsın. Pazar\'dan tema ve çerçeve alabilirsin.':'You earn points for every word. Spend them on themes and frames in the Market.','Her gün ilk oyununa bonus puan var, art arda gelince büyür.':'You get bonus points on your first game each day, and it grows when you come back every day.','Haftanın en iyileri ödül kazanır.':'The top players of the week win prizes.',
  'Tekrar et':'Review','Tekrar':'Review','Doğru bildin':'Correct','Yanlış, doğrusu:':'Wrong, the answer is:','Devam':'Continue','Kapat':'Close','Tekrar testi bitti':'Review finished',
  'Defterden çıkarıldı (öğrendin):':'Removed from your book (learned):','Bir daha dene':'Try again','Boşluğa hangi kelime gelir?':'Which word fits the blank?','Tekrar için defterinde en az 4 kelime olmalı.':'You need at least 4 words in your book to review.'
});
RX.push([/^Yanlış, doğrusu: (.+)$/,'Wrong, the answer is: $1'],[/^Tekrar et \((\d+) kelime\)$/,'Review ($1 words)'],[/^Doğru: (\d+)\/(\d+)$/,'Correct: $1/$2'],[/^Soru (\d+)\/(\d+)$/,'Question $1 of $2'],[/^(\d+) \/ (\d+)$/,'$1 / $2']);
document.head.insertAdjacentHTML('beforeend',`<style id="yardim-css">
#how{position:fixed;inset:0;z-index:80;display:flex;align-items:flex-end;justify-content:center;background:rgba(5,8,18,.55);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);animation:dk-ent .25s ease}
#how[hidden]{display:none}
#how .hw{width:100%;max-width:520px;max-height:92vh;overflow:auto;background:var(--bg,#fff);color:var(--fg);border-radius:24px 24px 0 0;padding:22px 20px calc(20px + env(safe-area-inset-bottom,0px));box-shadow:0 -10px 40px rgba(0,0,0,.35);border:1px solid var(--line)}
#how h2{margin:0 0 6px;font-size:22px}#how p{color:var(--dim);font-size:14.5px;line-height:1.5;margin:6px 0}
#how .hs{min-height:230px}
#how .hex{display:flex;gap:6px;margin:14px 0 8px}
#how .hex b{width:44px;height:44px;border-radius:11px;display:grid;place-items:center;color:#fff;font-size:20px}
#how .hl{display:flex;align-items:center;gap:12px;margin:12px 0}#how .hl b{flex:none;width:36px;height:36px;border-radius:9px;display:grid;place-items:center;color:#fff;font-size:17px}#how .hl span{font-size:14px;line-height:1.35}
#how ul{padding:0;list-style:none;margin:10px 0}#how li{padding:10px 12px;margin:6px 0;border-radius:12px;border:1px solid var(--line);font-size:14px}
#how li i,#how p i{font-style:normal}#how .hd{display:flex;justify-content:center;gap:7px;margin:12px 0}#how .hd i{width:8px;height:8px;border-radius:50%;background:var(--line);transition:all .2s}#how .hd i.on{width:22px;border-radius:5px;background:var(--ac)}
#how .hb{display:flex;gap:10px;margin-top:6px}#how .hb button{flex:1;height:50px;border-radius:14px;border:1px solid var(--line);background:var(--panel);font-weight:700;font-size:15px}
#how .hb button.m{background:var(--ac);color:var(--acf);border-color:var(--ac)}
#how .hk{text-align:right;margin:-8px 0 0}#how .hk button{background:none;border:0;color:var(--dim);font-size:13px;padding:6px}
.rq{margin:6px 0 12px;padding:12px 14px;border-radius:14px;border:1px solid var(--line);background:var(--panel)}.rq small{color:var(--dim)}
.rq .ex{font-style:italic;color:var(--dim);font-size:14px;margin-top:6px}
.rqo{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0}.rqo button{min-height:52px;border-radius:14px;border:2px solid var(--line);background:var(--panel);font-weight:700;font-size:16px}
.rqo button.ok{background:var(--g);color:#fff;border-color:transparent}.rqo button.bad{background:var(--r);color:#fff;border-color:transparent}
.rqs{font-size:30px;font-weight:800;text-align:center;margin:10px 0}
</style>`);
// ---- Nasıl oynanır? ----
const tile=(c,h)=>'<b style="background:var(--'+c+')">'+h+'</b>';
const li=(i,t)=>'<li><i>'+i+'</i> '+t+'</li>';
const SL=[
  ()=>'<h2>Gizli kelimeyi bul</h2><p>Gizli bir İngilizce kelime var. İpucu olarak anlamını görürsün. Harfleri yaz ve Gönder\'e bas.</p><div class="hex">'+tile('g','S')+tile('o','H')+tile('r','O')+tile('g','W')+tile('r','E')+tile('g','R')+'</div>',
  ()=>'<h2>Renkler ne demek?</h2><div class="hl">'+tile('g','A')+'<span>Doğru harf, doğru yerde</span></div><div class="hl">'+tile('o','B')+'<span>Harf kelimede var ama yeri yanlış</span></div><div class="hl">'+tile('r','C')+'<span>Harf kelimede yok</span></div><p>Yeşil harfler kilitlenir, onları tekrar yazman gerekmez.</p>',
  ()=>'<h2>Kutuları kullan</h2><ul>'+li('👆','Bir kutuya dokunursan seçilir, yazdığın harf o kutuya gider.')+li('⌫','Seçili kutuda Sil\'e basarsan sadece o kutudaki harf silinir.')+li('↔️','Bir harfi tutup başka kutuya sürükleyerek yerini değiştirebilirsin.')+li('💡','Üçüncü tahminden sonra ? düğmesi çıkar: ilk harfi ve örnek cümleyi verir, biraz puan düşer.')+'</ul>',
  ()=>'<h2>Oyun modları</h2><ul>'+li('📅','Günlük: herkes aynı kelimeyi çözer, 3 hak')+li('⚡','Seri: 3 can, giderek zorlaşan kelimeler')+li('📚','Alıştırma: seviyeni seç, rahat çalış')+li('🌐','Online: arkadaşınla ya da sınıfla yarış')+li('🏆','Skor tablosu: haftalık ve tüm zamanların en iyileri')+'</ul>',
  ()=>'<h2>Alıştırma ve Türkçe yardım</h2><ul>'+li('🇹🇷','Açıklama İngilizce gelir. Anlamazsan TR düğmesine bas, o cümlenin Türkçesini görürsün.')+li('🔊','Kelime bitince hoparlör düğmesiyle doğru söylenişini dinleyebilirsin.')+li('📖','Öğrendiğin kelimeler Menü, Defterim bölümünde birikir. 4 kelime olunca Tekrar et testi açılır.')+li('✈️','İnternet yoksa da alıştırma çalışır, ama puan ve XP verilmez.')+'</ul>',
  ()=>'<h2>Online ve sınıf yarışı</h2><ul>'+li('🏠','Online bölümünde Oda kur\'a bas, 4 harfli kodu ya da bağlantıyı arkadaşlarına gönder.')+li('👥','1v1 ya da grup oyna. Arena modunda sorular tek tek gelir ve canlı sıralama görürsün.')+li('👋','Maçta kendi profil kartına dokunarak rakibe emoji gönderebilirsin.')+'</ul>',
  ()=>'<h2>Görevler ve başarılar</h2><ul>'+li('🎯','Her gün 3 yeni görev gelir. Bitirince Ödülü al\'a bas, 🪙 kazan.')+li('🎁','Üç görevi de bitirirsen ekstra ödül var.')+li('🏅','Başarılar kalıcıdır, uzun vadeli hedeflerin için ödül verir.')+li('📊','İlerlemeni Profil, Menü, İstatistik ekranından takip edebilirsin.')+'</ul>',
  ()=>'<h2>Puan, Pazar ve bonus</h2><p>Kelimeleri bildikçe puan kazanırsın. Pazar\'dan tema ve çerçeve alabilirsin.</p><p><i>🎁</i> Her gün ilk oyununa bonus puan var, art arda gelince büyür.</p><p><i>🏆</i> Haftanın en iyileri ödül kazanır.</p><p><i>🖼️</i> Profilindeki avatara dokunarak avatarını, fotoğrafını ve çerçeveni değiştirebilirsin.</p>',
  ()=>(typeof clsOK==='function'&&clsOK())?'<h2>Sınıf ödevleri</h2><ul>'+li('📚','Menü, Ödevlerim bölümünde öğretmeninin verdiği kelime ödevleri görünür.')+li('⏰','Her ödevde kaç kelime kaldığını ve son günü görürsün.')+li('🔔','Bildirimleri açarsan son gün yaklaşınca hatırlatma gelir.')+'</ul>':'',
  ()=>'<h2>Telefona ekle</h2><p>Siteyi ana ekrana eklersen uygulama gibi açılır, daha hızlı yüklenir ve bildirim alabilirsin.</p><ul>'+li('🍎','iPhone: Safari\'de Paylaş düğmesi, sonra Ana Ekrana Ekle.')+li('🤖','Android: Chrome menüsü, sonra Uygulamayı yükle ya da Ana ekrana ekle.')+li('🔔','Ayarlar\'dan Bildirimleri aç. iPhone\'da bunun için önce ana ekrana eklemelisin.')+'</ul>'
];
let hi=0;
function howClose(){const e=$('how');if(e)e.hidden=true;try{localStorage.setItem('ka_how','1')}catch(x){}}
function howRender(){
  let e=$('how');if(!e){e=document.createElement('div');e.id='how';e.setAttribute('role','dialog');e.setAttribute('aria-modal','true');document.body.appendChild(e)}
  e.hidden=false;
  const L=SL.map(f=>f()).filter(Boolean);if(hi>=L.length)hi=L.length-1;
  const son=hi===L.length-1;
  e.innerHTML='<div class="hw"><div class="hk">'+(son?'':'<button id="hsk">Atla</button>')+'</div><div class="hs">'+L[hi]+'</div><div class="hd">'+L.map((_,i)=>'<i'+(i===hi?' class="on"':'')+'></i>').join('')+'</div><div class="hb">'+(hi?'<button id="hbk">Geri</button>':'')+'<button class="m" id="hnx">'+(son?'Başla':'İleri')+'</button></div></div>';
  if($('hsk'))$('hsk').onclick=howClose;
  if($('hbk'))$('hbk').onclick=()=>{hi--;howRender()};
  $('hnx').onclick=()=>{if(son){howClose();return}hi++;howRender()};
}
window.nasilOynanir=()=>{hi=0;howRender()};
const _as=aSettings;aSettings=function(){
  _as();const o=$('ob');if(!o)return;
  o.insertAdjacentHTML('beforebegin',btn('how1','Nasıl oynanır?'));
  $('how1').onclick=window.nasilOynanir;
};
// ilk açılışta bir kez (oyun ya da başka bir pencere açık değilse)
let ilk=true;
const _rh=rHome;rHome=function(){
  _rh();
  if(!ilk)return;ilk=false;
  let g=null;try{g=localStorage.getItem('ka_how')}catch(e){}
  if(g)return;
  setTimeout(()=>{const c=$('cf'),w=$('wv');if(($('game')&&!$('game').hidden)||(c&&!c.hidden)||(w&&!w.hidden))return;window.nasilOynanir()},900);
};
// ---- Kelime defteri: Tekrar et ----
const mix=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const maske=x=>{const w=x.w.toLowerCase(),t=x.ex||'';if(!t)return '';return t.replace(new RegExp('\\b'+w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'\\w*','gi'),'_____')};
let Q=null;
function qSoru(){
  const x=Q.l[Q.i],tum=bookGet(),dig=mix(tum.filter(y=>y.w!==x.w)).slice(0,3),sec=mix([x].concat(dig));
  const m=maske(x);
  $('wvt').textContent='Tekrar et';
  $('wvl').innerHTML='<p class="rqs" style="font-size:14px;font-weight:600;color:var(--dim)">'+(Q.i+1)+' / '+Q.l.length+'</p><div class="rq"><b>Boşluğa hangi kelime gelir?</b><div style="margin-top:6px">'+esc(x.d||'')+'</div>'+(m?'<div class="ex">'+esc(m)+'</div>':'')+'</div><div class="rqo">'+sec.map(y=>'<button data-w="'+esc(y.w)+'">'+esc(y.w)+'</button>').join('')+'</div>';
  document.querySelectorAll('.rqo button').forEach(b=>b.onclick=()=>qCevap(b));
}
function qCevap(b){
  if(!Q||Q.kilit)return;Q.kilit=1;
  const x=Q.l[Q.i],dogru=b.dataset.w===x.w,defter=bookGet(),e=defter.find(y=>y.w===x.w);
  document.querySelectorAll('.rqo button').forEach(k=>{k.disabled=true;if(k.dataset.w===x.w)k.classList.add('ok');else if(k===b)k.classList.add('bad')});
  if(e){if(dogru){e.ok=(e.ok||0)+1}else e.ok=0;bookSet(defter)}
  if(dogru){Q.ok++;if(e&&e.ok>=3)Q.ogrenilen.push(x.w)}
  const dev=()=>{if(!Q)return;Q.kilit=0;Q.i++;if(Q.i>=Q.l.length)qBitti();else qSoru()};
  if(dogru)setTimeout(dev,650);
  else{$('wvl').querySelector('.rq').insertAdjacentHTML('beforeend','<div style="margin-top:8px;color:var(--r);font-weight:700">Yanlış, doğrusu: '+esc(x.w)+'</div>');$('wvl').insertAdjacentHTML('beforeend','<button class="lvl" id="rqn" style="justify-content:center;font-weight:800">Devam</button>');$('rqn').onclick=dev}
}
function qBitti(){
  const og=Q.ogrenilen;
  if(og.length)bookSet(bookGet().filter(y=>og.indexOf(y.w)<0));
  $('wvt').textContent='Tekrar testi bitti';
  $('wvl').innerHTML='<div class="rqs">Doğru: '+Q.ok+'/'+Q.l.length+'</div>'+(og.length?'<div class="rq"><small>Defterden çıkarıldı (öğrendin):</small><div><b>'+og.map(esc).join(', ')+'</b></div></div>':'')+btn('rqa','Bir daha dene');
  $('rqa').onclick=qBasla;
  const kalan=bookGet().length;if(kalan<4)$('rqa').remove();
  Q=null;
}
function qBasla(){
  const b=bookGet();
  if(b.length<4){toast('Tekrar için defterinde en az 4 kelime olmalı.');return}
  Q={l:mix(b).slice(0,10),i:0,ok:0,ogrenilen:[],kilit:0};qSoru();
}
const _ab=aBook;aBook=function(){
  _ab();
  const b=bookGet(),l=$('wvl');
  if(b.length>=4&&l){l.insertAdjacentHTML('afterbegin','<button class="lvl" id="rpt" style="justify-content:center;font-weight:800">Tekrar et ('+b.length+' kelime)</button>');$('rpt').onclick=qBasla}
};
window.tekrarBasla=qBasla;
$('wvc').addEventListener('click',()=>{Q=null});
})();
