// v37: Hata bildir. Ayarlar'ın en altında "🐞 Hata bildir": kullanıcı konu seçer ve ne olduğunu yazar; sürüm, cihaz, ekran boyutu,
// tema ve dil otomatik eklenir. Kayıt sunucuda (bug_send, hız sınırlı) tutulur; bildirimi açık yöneticilere anlık bildirim gider.
// Yönetici panelinde "Hata bildirimleri": liste, durum (Yeni / Bakılıyor / Çözüldü).
(function(){
Object.assign(EN,{'🐞 Hata bildir':'🐞 Report a bug','Hata bildir':'Report a bug','Konu':'Topic','Oyun':'Game','Görünüm':'Look','Hesap':'Account','Diğer':'Other','Ne oldu?':'What happened?',
  'Ne yaparken oldu, ne bekliyordun, ne oldu? Ne kadar detaylı yazarsan o kadar hızlı düzeltiriz.':'What were you doing, what did you expect, what happened? The more detail, the faster we fix it.',
  'Bildirimle birlikte uygulama sürümü, cihaz, ekran boyutu, tema ve dil de gönderilir. Şifren ya da kişisel bilgin gönderilmez.':'The app version, device, screen size, theme and language are sent with the report. Your password or personal info is not sent.',
  'Gönder':'Send','Gönderiliyor...':'Sending...','Biraz daha detay yaz (en az 5 karakter).':'Write a bit more detail (at least 5 characters).','Çok sık bildirim gönderdin, biraz sonra tekrar dene.':'You sent reports too often, try again a bit later.',
  'Gönderilemedi, bağlantını kontrol et.':'Could not send, check your connection.','Teşekkürler! Bildirimin yöneticiye iletildi. 🐞':'Thanks! Your report was sent to the admin. 🐞','Hata bildirmek için giriş yap':'Sign in to report a bug',
  'Hata bildirimleri':'Bug reports','Yeni':'New','Bakılıyor':'In progress','Çözüldü':'Solved','Hepsi':'All','Bildirim yok 🎉':'No reports 🎉'});
RX.push([/^Hata bildirimleri \((\d+) yeni\)$/,'Bug reports ($1 new)']);
const KAT=[['oyun','🎮','Oyun'],['online','🌐','Online'],['gorunum','🎨','Görünüm'],['hesap','👤','Hesap'],['diger','💬','Diğer']];
const DUR={yeni:'Yeni',bakiliyor:'Bakılıyor',cozuldu:'Çözüldü'};
document.head.insertAdjacentHTML('beforeend',`<style>
.bgk{display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin:4px 0 10px}
.bgk button{display:flex;flex-direction:column;align-items:center;gap:2px;padding:9px 2px;border-radius:14px;border:1px solid var(--line);background:var(--panel);color:var(--fg);font-size:11.5px;font-weight:700}
.bgk button i{font-style:normal;font-size:19px}
.bgk button.on{border-color:var(--ac);background:color-mix(in srgb,var(--ac) 14%,var(--panel));color:var(--ac)}
.bgn{font-size:12px;color:var(--dim);line-height:1.4;margin:6px 0 10px}
.bgr{border:1px solid var(--line);border-radius:16px;background:var(--panel);padding:12px 14px;margin-bottom:8px}
.bgr .bh{display:flex;justify-content:space-between;gap:8px;font-size:12px;color:var(--dim)}
.bgr .bm{margin:6px 0;font-size:14.5px;line-height:1.45;white-space:pre-wrap;word-break:break-word}
.bgr .bc{font-size:11px;color:var(--dim);word-break:break-word}
.bgr .bs{display:flex;gap:6px;margin-top:8px}
.bgr .bs button{flex:1;height:34px;border-radius:10px;border:1px solid var(--line);background:var(--panel);color:var(--fg);font-size:12px;font-weight:700}
.bgr .bs button.on{background:var(--ac);color:var(--acf);border-color:var(--ac)}
.bgt{display:inline-block;padding:1px 8px;border-radius:999px;font-weight:700;font-size:11px;border:1px solid var(--line)}
.bgt.yeni{color:var(--r);border-color:var(--r)}.bgt.bakiliyor{color:var(--o);border-color:var(--o)}.bgt.cozuldu{color:var(--g);border-color:var(--g)}
</style>`);
const surum=()=>((document.querySelector('script[src*="js/01-"]')||{}).src||'').split('v=')[1]||'';
function cihaz(){
  const u=navigator.userAgent||'';
  const os=/iPhone|iPad|iPod/.test(u)?'iOS '+((u.match(/OS (\d+[_\d]*)/)||[])[1]||'').replace(/_/g,'.'):/Android/.test(u)?'Android '+((u.match(/Android ([\d.]+)/)||[])[1]||''):/Windows/.test(u)?'Windows':/Mac OS X/.test(u)?'macOS':'?';
  const br=/CriOS|Chrome\//.test(u)&&!/Edg/.test(u)?'Chrome':/Edg/.test(u)?'Edge':/FxiOS|Firefox/.test(u)?'Firefox':/Safari/.test(u)?'Safari':'?';
  const pwa=(matchMedia&&matchMedia('(display-mode: standalone)').matches)||navigator.standalone?' · ana ekran':'';
  return os+' · '+br+pwa;
}
let kat='oyun',taslak='';
function aBug(){
  if(!sb||!prof){aAuth('Hata bildirmek için giriş yap');return}
  panel('<p><b>🐞 Hata bildir</b></p><p>Konu</p><div class="bgk">'+KAT.map(k=>'<button data-bk="'+k[0]+'"'+(k[0]===kat?' class="on"':'')+'><i>'+k[1]+'</i>'+k[2]+'</button>').join('')+'</div>'
    +'<p>Ne oldu?</p><textarea id="bgm" rows="6" maxlength="1000" placeholder="Ne yaparken oldu, ne bekliyordun, ne oldu? Ne kadar detaylı yazarsan o kadar hızlı düzeltiriz." style="'+SEL+';width:100%;font-family:inherit;line-height:1.4"></textarea>'
    +'<p class="bgn">Bildirimle birlikte uygulama sürümü, cihaz, ekran boyutu, tema ve dil de gönderilir. Şifren ya da kişisel bilgin gönderilmez.</p>'
    +'<p id="bge" style="color:var(--r)"></p>'+btn('bgs','Gönder')+btn('ob','Geri'));
  const m=$('bgm');m.value=taslak;m.oninput=()=>{taslak=m.value};
  $('online').querySelectorAll('[data-bk]').forEach(b=>b.onclick=()=>{kat=b.dataset.bk;$('online').querySelectorAll('[data-bk]').forEach(x=>x.classList.toggle('on',x===b))});
  $('ob').onclick=aSettings;
  $('bgs').onclick=async()=>{
    const t=m.value.trim(),e=x=>{$('bge').textContent=x};
    if(t.length<5)return e('Biraz daha detay yaz (en az 5 karakter).');
    $('bgs').disabled=true;e('Gönderiliyor...');
    const ctx={surum:surum(),cihaz:cihaz(),boyut:innerWidth+'x'+innerHeight+(innerWidth>innerHeight?' yatay':' dikey'),tema:document.documentElement.dataset.theme||'light',dil:document.documentElement.lang||'tr',mod:typeof mode==='string'?mode:''};
    let r;try{r=await sb.rpc('bug_send',{_k:kat,_m:t,_c:ctx})}catch(x){r={error:x}}
    if(r.error||!r.data){$('bgs').disabled=false;return e('Gönderilemedi, bağlantını kontrol et.')}
    if(r.data.err){$('bgs').disabled=false;return e(r.data.err==='bekle'?'Çok sık bildirim gönderdin, biraz sonra tekrar dene.':'Biraz daha detay yaz (en az 5 karakter).')}
    // yöneticilere anlık bildirim (olmazsa da kayıt panelde durur)
    try{const ss=await sb.auth.getSession(),tok=ss&&ss.data&&ss.data.session&&ss.data.session.access_token;
      if(tok)fetch(SB_URL+'/functions/v1/push-gonder',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+tok,apikey:SB_KEY},body:JSON.stringify({bug:r.data.id})}).catch(()=>{})}catch(x){}
    taslak='';toast('Teşekkürler! Bildirimin yöneticiye iletildi. 🐞');aSettings();
  };
}
window.aBug=aBug;
// Ayarlar'ın en altına (Geri'den hemen önce)
{const _s=aSettings;aSettings=function(){
  _s.apply(this,arguments);
  const o=$('ob');if(!o||$('bgb'))return;
  o.insertAdjacentHTML('beforebegin',btn('bgb','🐞 Hata bildir'));$('bgb').onclick=aBug;
}}
// --- Yönetici: Hata bildirimleri
let bgF='yeni';
async function aAdBugs(){
  panel('<p>Yükleniyor...</p>');
  const r=await sb.rpc('admin_bugs',{_durum:bgF==='hepsi'?null:bgF});
  if(r.error||!r.data){panel('<p>'+(typeof adErr==='function'?adErr(r):'Yapılamadı')+'</p>'+btn('ob','Geri'));$('ob').onclick=aAdmin;return}
  const l=r.data.list||[],sg=(id,t)=>'<button data-bf="'+id+'"'+(bgF===id?' class="on"':'')+'>'+t+'</button>';
  const tarih=t=>{try{return new Date(t).toLocaleString('tr-TR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'})}catch(e){return ''}};
  const kt=k=>(KAT.find(x=>x[0]===k)||KAT[4]);
  panel('<p><b>🐞 Hata bildirimleri</b></p><div class="seg sm">'+sg('yeni','Yeni')+sg('bakiliyor','Bakılıyor')+sg('cozuldu','Çözüldü')+sg('hepsi','Hepsi')+'</div>'
    +(l.length?l.map(x=>{const c=x.c||{};return '<div class="bgr"><div class="bh"><span><b style="color:var(--fg)">'+esc(x.u||'?')+'</b> · '+kt(x.k)[1]+' '+esc(kt(x.k)[2])+'</span><span>'+esc(tarih(x.t))+' <i class="bgt '+esc(x.d)+'">'+esc(DUR[x.d]||x.d)+'</i></span></div>'
      +'<div class="bm">'+esc(x.m)+'</div><div class="bc">'+['cihaz','boyut','tema','dil','mod','surum'].filter(k=>c[k]).map(k=>esc(c[k])).join(' · ')+'</div>'
      +'<div class="bs">'+Object.keys(DUR).map(d=>'<button data-bid="'+x.id+'" data-bd="'+d+'"'+(x.d===d?' class="on"':'')+'>'+DUR[d]+'</button>').join('')+'</div></div>'}).join(''):'<p>Bildirim yok 🎉</p>')
    +btn('ob','Geri'));
  $('ob').onclick=aAdmin;
  $('online').querySelectorAll('[data-bf]').forEach(b=>b.onclick=()=>{bgF=b.dataset.bf;aAdBugs()});
  $('online').querySelectorAll('[data-bid]').forEach(b=>b.onclick=async()=>{
    const q=await sb.rpc('admin_bug_set',{_id:+b.dataset.bid,_durum:b.dataset.bd});
    if(q.error||q.data!=='ok'){toast('Yapılamadı');return}
    aAdBugs();
  });
}
{const _a=aAdmin;aAdmin=function(){
  _a.apply(this,arguments);
  const a=$('ad1');if(!a||$('ad11'))return;
  a.insertAdjacentHTML('beforebegin',btn('ad11','Hata bildirimleri'));$('ad11').onclick=aAdBugs;
  Promise.resolve(sb.rpc('admin_bugs',{_durum:'yeni'})).then(r=>{const n=r&&r.data&&+r.data.yeni;const b=$('ad11');if(b&&n)b.textContent='Hata bildirimleri ('+n+' yeni)'}).catch(()=>{});
}}
})();
