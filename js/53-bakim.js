// v35: Bakım modu + yeni sürüm bildirimi.
// Güvenlik: asıl kapı SUNUCUDA (maint_gate, PostgREST ön-istek kancası). Bakımdayken yönetici olmayan kimse hiçbir veri işlevini çağıramaz;
// bu dosyadaki ekran sadece kullanıcıya durumu gösterir (ekranı gizlemek erişim sağlamaz). Yönetici girişi buradan yapılır, yönetici olmayan oturum hemen kapatılır.
const MN={on:false,msg:'',adm:false,kilit:0,hata:0};
document.head.insertAdjacentHTML('beforeend',`<style>
#mnov{position:fixed;inset:0;z-index:99999;background:var(--bg,#0f1530);color:var(--fg,#fff);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:24px;text-align:center}
#mnov h2{margin:0;font-size:22px}#mnov p{margin:0;max-width:340px;opacity:.85}
#mnov .lvl{max-width:320px;width:100%}
#mnov input{width:100%;max-width:320px;padding:12px;border-radius:12px;border:1px solid var(--line,#556);background:var(--panel,#1c2442);color:inherit;font-size:16px}
#mnbn{position:fixed;top:0;left:0;right:0;z-index:9998;background:#e8a33d;color:#222;text-align:center;font:700 12px sans-serif;padding:3px 8px}
#upb{position:fixed;left:12px;right:12px;bottom:84px;z-index:9997;background:var(--panel,#1c2442);border:1px solid var(--ac,#4b5cf0);border-radius:14px;padding:10px 12px;display:flex;align-items:center;gap:10px;justify-content:space-between;font-weight:600;box-shadow:0 6px 24px rgba(0,0,0,.3)}
#upb button{border:0;border-radius:10px;background:var(--ac,#4b5cf0);color:#fff;padding:8px 14px;font-weight:700}
</style>`);
const mnTemiz=s=>String(s||'').replace(/[<>]/g,'').slice(0,200);
function mnKaldir(){const o=document.getElementById('mnov');if(o)o.remove();const b=document.getElementById('mnbn');if(b)b.remove()}
function mnGoster(giris){
  mnKaldir();
  const o=document.createElement('div');o.id='mnov';
  o.innerHTML='<div style="font-size:44px">🔧</div><h2>Bakımdayız</h2><p id="mnm"></p><button class="lvl" id="mnr" style="justify-content:center">Yeniden dene</button><button class="lvl" id="mng" style="justify-content:center">Yönetici girişi</button><div id="mnf" hidden style="display:none;flex-direction:column;gap:8px;align-items:center;width:100%"><input id="mnu" placeholder="Kullanıcı adı" autocapitalize="none" autocomplete="username" maxlength="16"><input id="mnp" type="password" placeholder="Şifre" autocomplete="current-password" maxlength="72"><button class="lvl" id="mns" style="justify-content:center">Giriş yap</button></div><p id="mne" style="color:#ff8b8b"></p>';
  document.body.appendChild(o);
  document.getElementById('mnm').textContent=MN.msg||'Uygulamayı güncelliyoruz. Birazdan tekrar dene.';
  document.getElementById('mnr').onclick=mnKontrol;
  const f=document.getElementById('mnf');
  document.getElementById('mng').onclick=()=>{f.style.display=f.style.display==='none'?'flex':'none'};
  if(giris)f.style.display='flex';
  document.getElementById('mns').onclick=mnGiris;
}
async function mnGiris(){
  const e=document.getElementById('mne'),t=Date.now();
  if(t<MN.kilit){e.textContent='Çok fazla deneme. '+Math.ceil((MN.kilit-t)/1000)+' sn bekle.';return}
  const u=document.getElementById('mnu').value.trim().toLowerCase(),p=document.getElementById('mnp').value;
  if(!/^[a-z0-9_]{3,16}$/.test(u)||!p){e.textContent='Kullanıcı adı ve şifre gerekli.';return}
  e.textContent='...';
  let r;try{r=await sb.auth.signInWithPassword({email:u+MD,password:p})}catch(x){r={error:x}}
  if(r.error||!r.data||!r.data.session){MN.hata++;if(MN.hata>=5){MN.kilit=Date.now()+30000*Math.min(8,MN.hata-4);e.textContent='Çok fazla deneme. Biraz bekle.'}else e.textContent='Kullanıcı adı ya da şifre yanlış.';return}
  // Yönetici mi? (sunucu söyler; değilse oturum anında kapatılır)
  let adm=false;try{const a=await sb.rpc('is_admin');adm=!a.error&&a.data===true}catch(x){}
  if(!adm){try{await sb.auth.signOut()}catch(x){}prof=null;e.textContent='Bakım sürüyor: sadece yöneticiler giriş yapabilir.';return}
  MN.hata=0;document.getElementById('mnp').value='';
  mnKaldir();await loadProf();if(prof)oExit();mnBanner();
}
function mnBanner(){if(!MN.on||!MN.adm||document.getElementById('mnbn'))return;const b=document.createElement('div');b.id='mnbn';b.textContent='🔧 Bakım modu açık: sadece yöneticiler giriş yapabilir';document.body.appendChild(b)}
async function mnKontrol(){
  if(!sb||(typeof navigator!=='undefined'&&navigator.onLine===false))return;
  let r;try{r=await sb.rpc('maint_get')}catch(e){return}
  if(!r||r.error||!r.data||typeof r.data!=='object')return;   // kapı/ağ hatasında kullanıcıyı kilitleme
  MN.on=!!r.data.on;MN.msg=mnTemiz(r.data.msg);
  if(!MN.on){MN.adm=false;mnKaldir();return}
  let adm=!!(prof&&prof.admin&&!prof._stale);
  if(!adm&&hasSess()){try{const a=await sb.rpc('is_admin');adm=!a.error&&a.data===true}catch(e){}}
  MN.adm=adm;
  if(adm){const o=document.getElementById('mnov');if(o)o.remove();mnBanner();return}
  if(hasSess()){try{await sb.auth.signOut()}catch(e){}}
  prof=null;pcClear();
  if(!document.getElementById('mnov')||document.getElementById('mnm').textContent!==(MN.msg||'Uygulamayı güncelliyoruz. Birazdan tekrar dene.'))mnGoster();
}
if(window.sb!==undefined||typeof sb!=='undefined'){
  setTimeout(mnKontrol,400);
  setInterval(()=>{if(!document.hidden)mnKontrol()},45000);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)mnKontrol()});
  addEventListener('online',mnKontrol);
}
// Yönetici paneli: bakım modunu aç/kapat
{const _a=aAdmin;aAdmin=function(){
  _a.apply(this,arguments);
  const a=$('ad4');if(!a||$('ad9'))return;
  a.insertAdjacentHTML('afterend',btn('ad9','Bakım modu'+(MN.on?': Açık':': Kapalı')));$('ad9').onclick=aAdMaint;
}}
async function aAdMaint(){
  panel('<p>Yükleniyor...</p>');
  const r=await sb.rpc('maint_get');
  if(r.error||!r.data){panel('<p>Durum alınamadı.</p>'+btn('ob','Geri'));$('ob').onclick=aAdmin;return}
  const on=!!r.data.on;MN.on=on;
  panel('<p><b>🔧 Bakım modu</b></p><p class="cap">Açıkken yönetici olmayan herkes (giriş yapmış olanlar dahil) uygulamayı kullanamaz; sunucu tüm istekleri reddeder. Yöneticiler normal kullanır. Güncelleme yapmadan önce aç, bitince kapat.</p><p>Durum: '+(on?'AÇIK':'Kapalı')+'</p><p>Kullanıcılara görünen mesaj</p><textarea id="mmsg" rows="3" maxlength="200" placeholder="Uygulamayı güncelliyoruz. Birazdan tekrar dene." style="'+SEL+';width:100%;font-family:inherit"></textarea>'+btn('mt',on?'Bakım modunu KAPAT':'Bakım modunu AÇ')+'<p id="mte" style="color:var(--r)"></p>'+btn('ob','Geri'));
  $('mmsg').value=mnTemiz(r.data.msg);$('ob').onclick=aAdmin;
  $('mt').onclick=()=>cfAsk(on?'Bakım modu kapatılsın mı? Herkes uygulamayı tekrar kullanabilir.':'Bakım modu açılsın mı? Yönetici olmayan herkesin (giriş yapmış olanlar dahil) erişimi hemen kesilir.','Evet','Vazgeç',async()=>{
    const x=await sb.rpc('admin_maint_set',{_on:!on,_msg:mnTemiz($('mmsg').value)});
    if(x.error||x.data!=='ok'){toast('Yapılamadı');return}
    MN.on=!on;toast(!on?'Bakım modu AÇIK':'Bakım modu kapatıldı');aAdMaint();
  });
}
// Yeni sürüm: servis çalışanı sayfayı eski önbellekten açtıysa ve yenisi indiyse küçük bir çubuk gösterilir
if('serviceWorker' in navigator)navigator.serviceWorker.addEventListener('message',e=>{
  if(!e.data||e.data.t!=='yeni-surum'||document.getElementById('upb'))return;
  const b=document.createElement('div');b.id='upb';b.innerHTML='<span>Yeni sürüm hazır</span><button id="upr">Yenile</button>';document.body.appendChild(b);
  document.getElementById('upr').onclick=()=>location.reload();
});
Object.assign(EN,{'Bakımdayız':'Under maintenance','Uygulamayı güncelliyoruz. Birazdan tekrar dene.':"We're updating the app. Please try again shortly.",'Yeniden dene':'Try again','Yönetici girişi':'Admin login','Şifre':'Password','Kullanıcı adı':'Username','Giriş yap':'Log in','Kullanıcı adı ve şifre gerekli.':'Username and password are required.','Kullanıcı adı ya da şifre yanlış.':'Wrong username or password.','Çok fazla deneme. Biraz bekle.':'Too many attempts. Wait a bit.','Bakım sürüyor: sadece yöneticiler giriş yapabilir.':'Maintenance in progress: only admins can log in.','🔧 Bakım modu açık: sadece yöneticiler giriş yapabilir':'🔧 Maintenance mode is on: only admins can log in','Yeni sürüm hazır':'New version ready','Yenile':'Refresh','Bakım modu: Açık':'Maintenance mode: On','Bakım modu: Kapalı':'Maintenance mode: Off','🔧 Bakım modu':'🔧 Maintenance mode','Durum alınamadı.':'Could not get the status.','Kullanıcılara görünen mesaj':'Message shown to users','Bakım modunu AÇ':'Turn maintenance mode ON','Bakım modunu KAPAT':'Turn maintenance mode OFF','Bakım modu AÇIK':'Maintenance mode ON','Bakım modu kapatıldı':'Maintenance mode turned off','Bakım modu kapatılsın mı? Herkes uygulamayı tekrar kullanabilir.':'Turn off maintenance mode? Everyone can use the app again.','Bakım modu açılsın mı? Yönetici olmayan herkesin (giriş yapmış olanlar dahil) erişimi hemen kesilir.':'Turn on maintenance mode? Access for everyone who is not an admin (including logged-in users) is cut immediately.','Açıkken yönetici olmayan herkes (giriş yapmış olanlar dahil) uygulamayı kullanamaz; sunucu tüm istekleri reddeder. Yöneticiler normal kullanır. Güncelleme yapmadan önce aç, bitince kapat.':'While on, everyone who is not an admin (including logged-in users) cannot use the app; the server rejects all requests. Admins use it normally. Turn it on before an update and off afterwards.'});
RX.push([/^Durum: (AÇIK|Kapalı)$/,(m,v)=>'Status: '+(v==='AÇIK'?'ON':'Off')],[/^Çok fazla deneme\. (\d+) sn bekle\.$/,(m,n)=>'Too many attempts. Wait '+n+' s.']);
