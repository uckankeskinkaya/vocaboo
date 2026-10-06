
const SB_URL='https://bzijkiljqlruwupqwtcm.supabase.co',SB_KEY='sb_publishable_OIoMDW6WF-72Dg8DLQQvPQ_HHZ8JUfx';
let sb=null,ch=null,isHost=false,myName='',started=false,tmr=null,cfg=null,seq=[],si=0,room='';
const myId=Math.random().toString(36).slice(2,9),t0=Date.now(),LBL=['B1','B1+','B2','B2+'];
let ost={p:0,w:0,a:1,fin:false,end:0,n:0,m:'c'};
const SEL='width:100%;padding:12px;margin-bottom:10px;border-radius:10px;border:1px solid var(--line);background:var(--panel);color:var(--fg);font-size:16px;box-sizing:border-box';

function esc(s){return String(s).replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';')}
function sc(){return mode==='streak'?run.score:mode==='online'?ost.p:score}
function on(h){$('online').innerHTML=h}
function btn(id,t){return '<button class="lvl" id="'+id+'" style="justify-content:center">'+t+'</button>'}
function rng(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function mkSeq(seed,l){
  const r=rng(seed),a=[];
  (l<0?[0,1,2,3]:[l]).forEach(i=>W[i].forEach(w=>a.push({w,l:i})));
  for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}
  return a;
}
function mine(){return{n:myName,t:t0,h:isHost?1:0,c:isHost?cfg:null,mo:(isHost&&cfg&&cfg.mod)?1:0,q:ost.q||0,p:ost.p,w:ost.w,a:ost.a,d:ost.fin?1:0,im:myThumb,ti:titleOf(prof),fr:(prof&&prof.frame)||''}}
function plist(){
  const s=ch.presenceState();
  return Object.keys(s).map(k=>{const v=s[k][s[k].length-1];return{k,n:String(v.n||'?').slice(0,16),t:+v.t||0,h:v.h,c:v.c,mo:v.mo?1:0,q:+v.q||0,p:+v.p||0,w:+v.w||0,a:v.a,d:v.d,im:String(v.im||'').slice(0,6000),ti:String(v.ti||'').slice(0,20),fr:String(v.fr||'').slice(0,12)}});
}
function rank(L){return L.filter(x=>!(x.h&&x.mo)).sort((a,b)=>cfg&&cfg.m==='s'?(b.w-a.w)||(b.p-a.p):(b.p-a.p))}

function oHome(){
  $('home').hidden=true;$('online').hidden=false;
  if(!window.supabase||SB_URL.indexOf('PASTE')===0){
    on('<p>Online mod için Supabase adresi ve anahtarı dosyaya eklenmeli.</p>'+btn('ob','Ana menü'));
    $('ob').onclick=()=>oExit();return;
  }
  sb=sb||supabase.createClient(SB_URL,SB_KEY);
  if(!prof){aAuth('Online için giriş yap');return}
  myName=prof.username;
  on('<p>Oyuncu: <b>'+esc(myName)+'</b></p>'+btn('orm','Rastgele maç (1v1)')+btn('oc','Oda kur')+'<p>Ya da oda kodunu gir</p><input id="cd" maxlength="4" style="'+SEL+';text-transform:uppercase">'+btn('oj','Odaya katıl')+btn('ob','Ana menü'));
  $('ob').onclick=()=>oExit();
  $('oc').onclick=oSetup;$('orm').onclick=oRandom;
  $('oj').onclick=()=>{const c=$('cd').value.trim().toUpperCase();if(c.length<4)return;oJoin(c,false)};
}

function oSetup(){
  on('<p>Kişi</p><select id="s1" style="'+SEL+'"><option value="2">1v1 (2 kişi)</option><option value="50">Grup</option></select><p>Mod</p><select id="s2" style="'+SEL+'"><option value="c15">Puan yarışı, 15 kelime</option><option value="c20">Puan yarışı, 20 kelime</option><option value="s180">Hayatta kalma, 3 dakika</option><option value="s300">Hayatta kalma, 5 dakika</option></select><p>Seviye</p><select id="s3" style="'+SEL+'"><option value="-1">Karışık (B1 ile B1+)</option>'+LBL.map((l,i)=>i===2||i===3?'':'<option value="'+i+'">'+l+'</option>').join('')+'</select><p>Moderatör modu (sadece grup)</p><select id="s4" style="'+SEL+'"><option value="0">Kapalı, ben de oynarım</option><option value="1">Açık, ben oyunu takip ederim</option></select>'+btn('ok2','Odayı kur')+btn('ob','Geri'));
  $('ob').onclick=oHome;
  $('ok2').onclick=()=>{
    const m=$('s2').value;
    cfg={max:+$('s1').value,m:m[0],n:m[0]==='c'?+m.slice(1):0,dur:m[0]==='s'?+m.slice(1):0,l:+$('s3').value,mod:(+$('s1').value>2&&$('s4').value==='1')?1:0};
    oJoin(Math.random().toString(36).slice(2,6).toUpperCase(),true);
  };
}

function oJoin(code,h){
  autoSent=false;isHost=h;started=false;room=code;mkThumb();
  ost={p:0,w:0,a:1,fin:false,end:0,n:0,m:'c'};
  oKanal(code,true);
}
// Oda kanalı: önce özel (yalnızca giriş yapmış kullanıcılar, realtime.messages politikalarıyla).
// Politika kurulu değilse ve açık kanallara izin varsa bir kez açık kanala geri düşer.
function oKanal(code,ozel){
  const k=ch=sb.channel('ka-'+code,{config:{private:ozel,broadcast:{self:true},presence:{key:myId}}});
  ch.on('presence',{event:'sync'},oSync);
  ch.on('broadcast',{event:'start'},e=>oBegin(e.payload));
  ch.on('broadcast',{event:'end'},()=>oEnd());['kq','kr','kf'].forEach(ev=>ch.on('broadcast',{event:ev},e=>kOn(ev,e.payload)));
  ch.on('broadcast',{event:'emo'},e=>{try{if(typeof tepkiGeldi==='function')tepkiGeldi(e.payload)}catch(x){}});
  ch.subscribe(s=>{
    if(k!==ch)return;
    if(s==='SUBSCRIBED'){ch.track(mine());oLobby()}
    else if(s==='CHANNEL_ERROR'||s==='TIMED_OUT'){
      if(ozel){try{sb.removeChannel(k)}catch(e){}oKanal(code,false);return}
      oExit('Bağlantı kurulamadı. Supabase adresini ve anahtarını kontrol et.');
    }
  });
}

function oSync(){
  if(!ch)return;
  const L=plist().sort((a,b)=>a.t-b.t),H=L.find(x=>x.h);
  if(H&&H.c){const cc=cfgClean(H.c);if(cc)cfg=cc}
  if(isHost&&auto&&!started&&!autoSent&&L.length>=2){autoSent=true;ch.send({type:'broadcast',event:'start',payload:{seed:Math.floor(Math.random()*1e9),c:cfg}})}
  if(!started){
    if(cfg&&!isHost&&L.findIndex(x=>x.k===myId)>=cfg.max+(cfg.mod?1:0)){oExit('Oda dolu.');return}
    oLobby(L);
  }else oLive(L);
}

function oLobby(L){
  L=L||plist();
  const c=cfg,info=c?(c.max===2?'1v1':'Grup'+(c.mod?' (moderatörlü)':''))+', '+(c.m==='c'?'Puan yarışı, '+c.n+' kelime':'Hayatta kalma, '+(c.dur/60)+' dakika')+', '+(c.l<0?'Karışık':LBL[c.l]):'Oda bilgisi bekleniyor';
  on('<p>Oda kodu</p><h1 style="letter-spacing:6px;margin:0 0 6px">'+esc(room)+'</h1><p>'+info+'</p>'+(c&&c.max===2?vsHTML(L):L.map(x=>oPlayerRow({n:x.n,im:x.im,tag:x.h?(x.mo?'(moderatör)':'(kurucu)'):'',me:x.k===myId})).join(''))+(isHost?btn('go','Başlat ('+L.filter(x=>!(x.h&&x.mo)).length+' oyuncu)'):'<p>Kurucunun başlatması bekleniyor.</p>')+btn('ob','Çık'));
  $('ob').onclick=()=>oExit();
  if(isHost)$('go').onclick=()=>{
    if(plist().filter(x=>!(x.h&&x.mo)).length<(cfg.mod?1:2)){alert(cfg.mod?'En az 1 oyuncu gerekli.':'En az 2 kişi gerekli.');return}
    ch.send({type:'broadcast',event:'start',payload:{seed:Math.floor(Math.random()*1e9),c:cfg}});
  };
}

function oBegin(pl){clearInterval(mmT);mmT=null;sess=[];
  if(started||!pl||!pl.c)return;
  started=true;cfg=cfgClean(pl.c)||cfg;
  ost={p:0,w:0,a:1,fin:false,end:0,n:cfg.n,m:cfg.m};
  seq=mkSeq(pl.seed,cfg.l);si=0;mode='online';
  $('live').hidden=false;
  ch.track(mine());
  if(isHost&&cfg.mod){modStart();return}
  if(cfg.max===2)oVs(3);else oGo();
}
function oGo(){
  if(cfg.m==='s'){ost.end=Date.now()+cfg.dur*1000;clearInterval(tmr);tmr=setInterval(oTick,500)}
  next();
}

function oTick(){
  if(ost.fin){clearInterval(tmr);return}
  if(Date.now()>=ost.end){clearInterval(tmr);ost.fin=true;over=true;ch.track(mine());oResults();return}
  oHud();
}
function oHud(){
  if(ost.m==='s'){
    const r=Math.max(0,Math.ceil((ost.end-Date.now())/1000));
    $('badge').textContent='Doğru '+ost.w+'  '+Math.floor(r/60)+':'+String(r%60).padStart(2,'0');
  }else $('badge').textContent='Kelime '+Math.min(si+1,ost.n||(cfg&&cfg.n)||15)+'/'+(ost.n||(cfg&&cfg.n)||15);
}
function oWin(p){
  ost.p+=p;ost.w++;ost.q=(ost.q||0)+1;
  if(ost.m==='c'&&si+1>=ost.n)ost.fin=true;
  ch.track(mine());
  return ost.fin?'<br>Son kelime!':'';
}
function oLose(){ost.q=(ost.q||0)+1;
  if(ost.m==='s'){ost.a=0;ost.fin=true}
  else if(si+1>=ost.n)ost.fin=true;
  ch.track(mine());
  return ost.m==='s'?'<br><b>Elendin!</b>':'';
}
function oNext(){
  if(ost.fin){oResults();return}
  si++;next();
}

function oLive(L){if(modView){oModRender(rank(L||plist()));return}
  L=rank(L||plist());
  $('live').innerHTML=cfg.max===2?vsLive(L):L.slice(0,4).map((x,i)=>'<span class="lv"><em>'+(i+1)+'</em>'+frameWrap(av(x.im,30),(ovGet(x.n)||{}).fr)+'<b>'+esc(x.n)+'</b>'+(cfg.m==='s'?x.w+' kelime':x.p+'p')+(x.a?'':' (elendi)')+'</span>').join('');
  if(!$('online').hidden&&ost.fin)oResults();
}
function oResults(){
  clearInterval(tmr);
  $('game').hidden=true;$('online').hidden=false;
  const L=rank(plist()),left=L.filter(x=>!x.d).length;
  on('<p>'+(left?'Bitirmeyen oyuncu: '+left:'Sonuçlar')+'</p>'+L.map((x,i)=>oPlayerRow({n:x.n,im:x.im,rank:i+1,me:x.k===myId,tag:x.a?'':'(elendi)',sc:x.p+' puan',sub:cfg.m==='s'?x.w+' kelime':''})).join('')+btn('ob','Ana menü'));
  $('ob').onclick=()=>oExit();
}

function oExit(msg){rndStop();modView=false;modDone=false;
  clearInterval(tmr);
  if(ch&&sb)sb.removeChannel(ch);
  ch=null;started=false;mode='practice';
  $('live').hidden=true;$('game').hidden=true;$('online').hidden=true;$('home').hidden=false;
  $('score').textContent=score+' puan';
  if(msg)alert(msg);
}
$('mOnline').onclick=oHome;

// Gerçek e-posta değil: sadece Supabase giriş sistemi e-posta biçimi istediği için kullanıcı adından üretilir.
const MD='@kelimeavi.app';
let prof=null;
// Oturum önbelleği: şifre tekrar sorulmasın, açılış hızlı olsun. Profil özeti (gizli bilgi yok) tarayıcıda tutulur; ağ yoksa ya da yavaşsa onunla açılır,
// arka planda sunucudan tazelenir. Sadece oturum gerçekten geçersizse (çıkış / süresi dolmuş / engel) giriş ekranı gelir.
const PC_KEY='ka_prof';
const pcGet=()=>{try{const o=JSON.parse(localStorage.getItem(PC_KEY));return o&&o.id&&o.username?o:null}catch(e){return null}};
const pcSet=p=>{try{localStorage.setItem(PC_KEY,JSON.stringify(p))}catch(e){}};
const pcClear=()=>{try{localStorage.removeItem(PC_KEY)}catch(e){}};
const hasSess=()=>{try{for(let i=0;i<localStorage.length;i++){if(/^sb-.*-auth-token$/.test(localStorage.key(i)))return true}}catch(e){}return false};
const netErr=e=>!!e&&(!navigator.onLine||/fetch|network|retryable|timeout|failed|abort/i.test(String(e.name||'')+' '+String(e.message||''))||e.status===0||e.status>=500);
const pcStale=()=>{const c=pcGet();return c&&hasSess()?Object.assign({},c,{_stale:1}):null};
if(window.supabase&&SB_URL.indexOf('PASTE')!==0){
  sb=supabase.createClient(SB_URL,SB_KEY);
  sb.auth.onAuthStateChange(ev=>{if(ev==='SIGNED_OUT')pcClear()});
  const c0=pcStale();
  if(c0){prof=c0;addEventListener('DOMContentLoaded',()=>{if(prof&&prof._stale&&$('game').hidden&&$('online').hidden)rHome()})}
  else{$('online').hidden=false;on('<p>Yükleniyor...</p>')}
  sb.auth.getSession().then(async r=>{
    if((r.data&&r.data.session)||(prof&&prof._stale))await loadProf();
    if(prof&&!prof._stale&&typeof pwMust==='function'&&await pwMust()){aNewPw();return}
    if(prof)oExit();else aAuth();
  }).catch(()=>{if(prof)oExit();else aAuth()});
  addEventListener('online',()=>{if(prof&&prof._stale)loadProf()});
}else $('home').hidden=false;
async function loadProf(){
  let u;try{u=await sb.auth.getUser()}catch(e){u={error:e}}
  if(!u.data||!u.data.user){
    const c=pcStale();
    if(c&&netErr(u.error)){prof=c;rHome();return}
    prof=null;rHome();return}
  let r;try{r=await sb.from('profiles').select('*').eq('id',u.data.user.id).single()}catch(e){r={error:e}}
  if(r.error&&netErr(r.error)){const c=pcStale();if(c&&c.id===u.data.user.id){prof=c;rHome();return}}
  prof=r.data||null;if(prof&&prof.banned){await sb.auth.signOut();pcClear();prof=null;rHome();aAuth('Hesabın engellendi.');return}
  if(prof)pcSet(prof);
  rHome();checkBadges();fbadge();
}
function panel(h){$('home').hidden=true;$('online').hidden=false;on(h)}
function noSb(){panel('<p>Bu özellik için Supabase ayarı gerekli.</p>'+btn('ob','Ana menü'));$('ob').onclick=()=>oExit()}

function aAuth(msg){
  if(!sb){noSb();return}
  panel(heroHTML()+(msg?'<p><b>'+esc(msg)+'</b></p>':'')+'<p>Kullanıcı adı (3-16 karakter: a-z, 0-9, _)</p><input id="au" maxlength="16" autocapitalize="none" autocomplete="username" style="'+SEL+'"><p>Şifre (en az 8 karakter)</p><input id="ap" type="password" autocomplete="current-password" style="'+SEL+'"><p>Sınıf kodu (sınıftansan gir, dışarıdansan boş bırak)</p><input id="ac" maxlength="40" autocapitalize="none" autocomplete="off" style="'+SEL+'"><p id="ae" style="color:var(--r)"></p>'+btn('al','Giriş yap')+btn('as','Kayıt ol')+btn('af','Şifremi unuttum')+'<p>Mail ya da telefon istenmez. Şifreni unutursan "Şifremi unuttum" ile yöneticiye talep gönderebilirsin.</p>'+(prof?btn('ob','Ana menü'):''));
  if(prof)$('ob').onclick=()=>oExit();
  $('al').onclick=()=>aGo(false);
  $('as').onclick=()=>aGo(true);
  $('af').onclick=()=>aForgot();
}
async function aGo(reg){
  const u=$('au').value.trim().toLowerCase(),p=$('ap').value,err=t=>{$('ae').textContent=t};
  if(!/^[a-z0-9_]{3,16}$/.test(u))return err('Kullanıcı adı 3-16 karakter olmalı: a-z, 0-9 ve _.');
  if(p.length<8)return err('Şifre en az 8 karakter olmalı.');
  err('Bekle...');
  const em=u+MD;
  const r=reg?await sb.auth.signUp({email:em,password:p,options:{data:{username:u,code:($('ac').value||'').trim()}}}):await sb.auth.signInWithPassword({email:em,password:p});
  if(r.error)return err(reg?(/registered|exists/i.test(r.error.message)?'Bu kullanıcı adı alınmış.':'Kayıt yapılamadı. Sınıf kodunu ve kullanıcı adını kontrol et.'):'Kullanıcı adı ya da şifre yanlış.');
  if(!r.data.session)return err('Hesap açıldı ama oturum başlamadı. Supabase ayarlarında Confirm email kapalı olmalı.');
  await loadProf();
  if(!prof)return err('Profil oluşturulamadı. SQL kurulumunu kontrol et.');
  if(typeof pwMust==='function'&&await pwMust()){aNewPw();return}
  oExit();
}

function aPhoto(e){
  const f=e.target.files[0];if(!f)return;
  const im=new Image,u=URL.createObjectURL(f);
  im.onload=async()=>{
    const c=document.createElement('canvas');c.width=c.height=128;
    const m=Math.min(im.width,im.height);
    c.getContext('2d').drawImage(im,(im.width-m)/2,(im.height-m)/2,m,m,0,0,128,128);
    URL.revokeObjectURL(u);
    const d=c.toDataURL('image/jpeg',.7);
    const r=await sb.from('profiles').update({avatar:d}).eq('id',prof.id);
    if(r.error){alert('Fotoğraf kaydedilemedi.');return}
    prof.avatar=d;aProfile();
  };
  im.onerror=()=>alert('Görsel açılamadı.');
  im.src=u;
}

async function submitRun(){
  pend.runs++;flushStats();
  if(!sb||!prof||!run.score)return;
  const s=Math.min(run.score,20000),st=Math.min(run.max||0,500);
  const r=await sb.rpc('submit_score',{s,st});
  if(!r.error){prof.best_score=Math.max(prof.best_score,s);prof.best_streak=Math.max(prof.best_streak,st);rHome()}
}
$('mProf').onclick=()=>prof?aProfile():aAuth();
$('mLb').onclick=()=>aBoard();

const TH=[['light','Aydınlık','#eef2f7','#16202e'],['dark','Karanlık','#0f1622','#e8eef7'],['sakura','Sakura','#fdf0f4','#4a2b36'],['deniz','Deniz','#0b2a3a','#e3f4fb'],['orman','Orman','#eaf3e6','#1f3a26'],['gunbatimi','Gün batımı','#231633','#ffe9d6']];
function setTheme(t){document.documentElement.dataset.theme=t;try{localStorage.setItem('ka_theme',t)}catch(e){}}

let pend={w:0,f:0,g:0,ft:0,h:0,pts:0,runs:0,n:0};
function bump(win,p){
  sfx(win?'win':'lose');
  if(win){pend.w++;pend.g+=guesses.length;if(guesses.length===1)pend.ft++;if(mode!=='daily')pend.pts+=p}
  else pend.f++;
  if(hintUsed)pend.h++;
  pend.n++;
  if(pend.n>=5)flushStats();
  return '';
}
document.addEventListener('visibilitychange',()=>{if(document.hidden)flushStats()});

function dayNum(){return Math.floor((Date.now()+108e5)/864e5)}
function dStr(n){return new Date(n*864e5).toISOString().slice(0,10)}
function dailyPick(){
  const a=[];[1,2,3].forEach(i=>W[i].forEach(w=>a.push({w,l:i})));
  const r=rng(777);
  for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}
  return a[dayNum()%a.length];
}
function getD(){try{const d=JSON.parse(localStorage.getItem('ka_daily'));return d&&d.d===dStr(dayNum())?d:null}catch(e){return null}}
function putD(d){try{localStorage.setItem('ka_daily',JSON.stringify(d))}catch(e){}}
async function dSubmit(win){if(!sb||!prof)return;await sb.rpc('submit_daily',{win});loadProf()}
function dEnd(win){
  const d=getD()||{d:dStr(dayNum())};
  d.res=win?'win':'lose';d.n=guesses.length;putD(d);dSubmit(win);
  return '';
}
async function startDaily(){
  if(!sb||!prof){aAuth('Günlük için giriş yap');return}
  if(busy)return;busy=true;
  const r=await sb.rpc('daily_start');busy=false;
  if(r.error){toast('Bağlantı hatası');return}
  if(r.data.done){dDone(r.data);return}
  sess=[];mode='daily';SR=r.data;next();
}
function dDone(d){
  const p=[d.ans,d.def],ms=(dayNum()+1)*864e5-108e5-Date.now(),h=Math.floor(ms/36e5),m=Math.floor(ms%36e5/6e4);
  panel('<p>Günün kelimesi</p><h2 style="margin:0 0 6px;letter-spacing:2px">'+esc(p[0].toUpperCase())+'</h2><p>'+esc(p[1])+'.</p><p>'+(d.res==='win'?'Bugün bildin ('+d.n+' denemede).':'Bugün bilemedin.')+'</p><p>Yeni kelime '+h+' saat '+m+' dakika sonra.</p>'+btn('ob','Ana menü'));
  $('ob').onclick=()=>oExit();
}


$('mDaily').onclick=startDaily;
$('mSet').onclick=aSettings;

let ac=null,dip=null;
const SO=()=>{try{return localStorage.getItem('ka_snd')!=='0'}catch(e){return true}};
const VI=()=>{try{return localStorage.getItem('ka_vib')!=='0'}catch(e){return true}};
function tone(f,t,d){
  try{
    ac=ac||new (window.AudioContext||window.webkitAudioContext)();if(ac.state==='suspended')ac.resume();
    const o=ac.createOscillator(),g=ac.createGain(),s=ac.currentTime+t;
    o.frequency.value=f;g.gain.setValueAtTime(.08,s);g.gain.exponentialRampToValueAtTime(.0001,s+d);
    o.connect(g);g.connect(ac.destination);o.start(s);o.stop(s+d);
  }catch(e){}
}
function sfx(k){
  if(!k)return;
  if(k==='key'){if(SO())tone(760+Math.random()*260,0,.05);return}
  const S={tick:[[660,0,.08]],win:[[523,0,.12],[659,.12,.12],[784,.24,.2]],lose:[[220,0,.25],[165,.2,.3]],badge:[[784,0,.1],[988,.1,.1],[1319,.2,.25]]};
  const V={tick:15,win:[30,40,30],lose:120,badge:[40,60,40,60,40]};
  if(SO())S[k].forEach(a=>tone(a[0],a[1],a[2]));
  if(VI()&&navigator.vibrate)try{navigator.vibrate(V[k])}catch(e){}
}
function toast(t){
  const d=document.createElement('div');d.className='toast';d.textContent=t;
  document.body.appendChild(d);setTimeout(()=>d.remove(),3500);
}
addEventListener('beforeinstallprompt',e=>{e.preventDefault();dip=e});
function aSettings(){
  const sn=SO(),vb=VI();
  panel('<p>Ayarlar</p>'+btn('s1','Ses: '+(sn?'Açık':'Kapalı'))+btn('s2','Titreşim: '+(vb?'Açık':'Kapalı'))+btn('s5','Müzik: '+(MO()?'Açık':'Kapalı'))+'<p>Müzik sesi: <b id="vv">'+MV()+'%</b></p><input id="vr" type="range" min="0" max="100" value="'+MV()+'" style="width:100%;accent-color:var(--ac);margin-bottom:12px">'+btn('s6','Renk körü modu: '+(CB()?'Açık':'Kapalı'))+btn('s3','Tema seç')+btn('s4','Ana ekrana ekle')+'<p id="si">Titreşim iPhone ve iPad tarayıcılarında çalışmaz.</p>'+(prof&&prof.admin?btn('adm','Yönetici paneli'):'')+btn('ob','Ana menü'));
  $('s1').onclick=()=>{try{localStorage.setItem('ka_snd',sn?'0':'1')}catch(e){}aSettings();sfx('win')};
  $('s2').onclick=()=>{try{localStorage.setItem('ka_vib',vb?'0':'1')}catch(e){}aSettings();sfx('tick')};
  $('s3').onclick=aTheme;if($('adm'))$('adm').onclick=aAdmin;
  $('s6').onclick=()=>{try{localStorage.setItem('ka_cb',CB()?'0':'1')}catch(e){}applyCB();aSettings()};
  $('s5').onclick=()=>{try{localStorage.setItem('ka_mus',MO()?'0':'1')}catch(e){}MO()?musicStart():musicStop();aSettings()};
  $('vr').oninput=e=>{const v=+e.target.value;try{localStorage.setItem('ka_vol',v)}catch(x){}$('vv').textContent=v+'%';musicVol();if(v===0)musicStop();else if(MO()&&(!mA||mA.paused))musicStart()};
  $('s4').onclick=()=>{
    if(dip){dip.prompt();dip=null}
    else $('si').textContent='Tarayıcı menüsünden "Ana ekrana ekle" ya da "Uygulamayı yükle" seçeneğini kullan. iPad ve iPhone Safari: Paylaş simgesi, sonra Ana Ekrana Ekle.';
  };
  $('ob').onclick=()=>oExit();
}

const BD=[
['İlk kelime','🌱',p=>p.words_solved>=1],
['50 kelime','📘',p=>p.words_solved>=50],
['250 kelime','📚',p=>p.words_solved>=250],
['İlk denemede 10','🎯',p=>p.first_try>=10],
['İlk denemede 50','🏹',p=>p.first_try>=50],
['Seri 10','🔥',p=>p.best_streak>=10],
['Seri 25','⚡',p=>p.best_streak>=25],
['500 puan rekoru','⭐',p=>p.best_score>=500],
['1500 puan rekoru','👑',p=>p.best_score>=1500],
['Günlük 3 gün','📅',p=>p.best_daily_streak>=3],
['Günlük 7 gün','🗓️',p=>p.best_daily_streak>=7],
['Günlük 30 gün','🏆',p=>p.best_daily_streak>=30],
['10 günlük zafer','☀️',p=>p.daily_wins>=10],
['Keskin nişancı','💎',p=>{const t=(p.words_solved||0)+(p.words_failed||0);return t>=50&&p.words_solved/t>=.8}],
['Fotoğraflı profil','🖼️',p=>!!p.avatar],
['Haftanın şampiyonu','🥇',p=>(p.weekly_wins||0)>=1],
['3 hafta şampiyon','🏅',p=>(p.weekly_wins||0)>=3],
['Podyum 5 kez','🎖️',p=>(p.weekly_podiums||0)>=5]
];
function bdHTML(P){
  const n=BD.filter(b=>b[2](P)).length;
  return '<p style="margin:14px 0 8px">Rozetler ('+n+'/'+BD.length+')</p><div class="bg">'+BD.map(b=>'<div class="bd'+(b[2](P)?'':' off')+'"><i>'+b[1]+'</i>'+b[0]+'</div>').join('')+'</div><div style="height:8px"></div>';
}
function checkBadges(){
  if(!prof)return;
  const now=BD.filter(b=>b[2](prof)).map(b=>b[0]),key='ka_bd_'+prof.id;
  let old=null;try{old=JSON.parse(localStorage.getItem(key))}catch(e){}
  try{localStorage.setItem(key,JSON.stringify(now))}catch(e){}
  if(!old)return;
  const nw=now.filter(x=>!old.includes(x));
  if(nw.length){toast('Yeni rozet: '+nw.join(', '));sfx('badge')}
}


const EX={travel:"We like to travel by train in the summer.",ticket:"I bought a ticket for the concert online.",narrow:"The street was so narrow that cars could not pass.",advice:"My teacher gave me good advice about learning English.",reduce:"We should reduce the amount of plastic we use.",polite:"It is polite to say thank you.",brave:"The brave boy jumped into the river to help the dog.",garden:"They grow tomatoes in their garden.",lazy:"He felt lazy and stayed in bed all morning.",empty:"The fridge was empty, so we ordered pizza.",beach:"Children were building sandcastles on the beach.",market:"My mother buys fresh fruit at the market.",winter:"It snows a lot here in winter.",pocket:"He put the keys in his pocket.",island:"They spent a week on a small island.",nervous:"I always feel nervous before an exam.",rescue:"Firefighters came to rescue the cat from the tree.",shelf:"The books are on the top shelf.",tiny:"A tiny spider was sitting on the wall.",whisper:"Please whisper because the baby is sleeping.",useful:"This app is very useful for learning words.",volunteer:"She works as a volunteer at the animal shelter.",weekend:"What are you doing this weekend?",address:"Please write your address on the form.",bottle:"He drank a whole bottle of water after the run.",careful:"Be careful when you cross the road.",comfort:"She listened to music for comfort.",cotton:"This shirt is made of soft cotton.",desert:"Very little rain falls in the desert.",disease:"Washing your hands helps stop the spread of disease.",double:"Please add a double portion of rice.",enough:"Do we have enough chairs for everyone?",event:"The school is planning a big event in May.",factory:"He works in a car factory.",fever:"She stayed home because she had a fever.",flight:"Our flight to London was two hours late.",friendly:"The people in this town are very friendly.",guest:"Our guest will stay with us for three days.",habit:"Reading before bed is a good habit.",hungry:"I am so hungry that I could eat a horse.",injury:"He missed the match because of a knee injury.",knowledge:"Her knowledge of history is impressive.",mistake:"It was a big mistake to leave early.",neighbour:"Our neighbour has a very friendly dog.",parcel:"A parcel arrived for you this morning.",pleasant:"We had a pleasant walk along the river.",recipe:"This recipe needs only three ingredients.",salary:"He gets his salary at the end of the month.",shout:"Please do not shout in the library.",strange:"The house was quiet and a little strange.",ancient:"We visited an ancient temple on the island.",support:"My family always supports me.",improve:"I want to improve my English this year.",request:"He made a request for a day off.",explore:"We plan to explore the old town tomorrow.",respond:"Please respond to my email today.",suggest:"I suggest we leave before it gets dark.",abroad:"She studied abroad for two years.",access:"Students have free access to the library.",adapt:"Animals adapt to changes in their environment.",admit:"He had to admit that he was wrong.",afford:"We cannot afford a new car this year.",announce:"The airline will announce the delay soon.",appeal:"The charity made an appeal for help.",attitude:"A positive attitude can change your day.",aware:"Are you aware of the new rules?",belief:"Her belief in hard work never changed.",branch:"A bird sat on the branch of the tree.",category:"This book belongs to the travel category.",character:"The main character in the film is very brave.",collapse:"The old bridge could collapse in the storm.",comment:"She left a nice comment under my photo.",complain:"Customers complain about the slow service.",consider:"Please consider my offer carefully.",convince:"I could not convince him to stay.",crisis:"The country is facing an economic crisis.",custom:"It is a custom to remove your shoes at home.",declare:"The judge will declare the winner today.",defend:"Soldiers defend their country.",depend:"It will depend on the weather.",destroy:"The fire destroyed the whole building.",disappear:"My keys seem to disappear every morning.",distant:"We could hear a distant sound of music.",doubt:"I have no doubt that you will pass.",embarrass:"Do not embarrass me in front of my friends.",encourage:"Teachers should encourage students to ask questions.",environment:"We must protect the environment.",exhausted:"After the long walk, we were exhausted.",familiar:"Her face looks familiar to me.",generous:"He is generous and often helps others.",guilty:"I felt guilty about forgetting her birthday.",imagine:"Imagine living on a small island.",include:"The price does include breakfast.",influence:"Parents have a strong influence on children.",install:"Can you install this app on my phone?",launch:"The company will launch a new product in May.",neglect:"Do not neglect your health.",occur:"Accidents often occur on wet roads.",permit:"The school does not permit phones in class.",procedure:"The procedure takes about ten minutes.",evidence:"The police found new evidence at the scene.",flexible:"My job has flexible working hours.",ambition:"Her ambition is to become a doctor.",generate:"Solar panels generate clean energy.",tendency:"He has a tendency to talk too fast.",estimate:"I estimate the trip will take three hours.",conclude:"The study concluded that sleep improves memory.",abandon:"They had to abandon the car in the snow.",accommodate:"The hotel can accommodate two hundred guests.",acknowledge:"He did not acknowledge his mistake.",adequate:"The room was small but adequate.",alternative:"Is there an alternative to this plan?",apparent:"It was apparent that she was upset.",arbitrary:"The rules seemed arbitrary and unfair.",assess:"Teachers assess students every term.",assure:"I assure you that everything is fine.",bias:"The article showed a clear bias against the team.",campaign:"They started a campaign to save the forest.",cautious:"Be cautious when you cross the river.",collaborate:"The two schools collaborate on many projects.",compensate:"The airline will compensate passengers for the delay.",comprehensive:"We offer a comprehensive guide to the city.",considerable:"It took a considerable amount of time.",constant:"The constant noise made it hard to sleep.",controversy:"The decision caused a lot of controversy.",credible:"The witness seemed honest and credible.",crucial:"Sleep is crucial for good health.",demonstrate:"The teacher will demonstrate how the machine works.",dilemma:"She faced a dilemma between work and family.",discourage:"Bad weather can discourage people from travelling.",distinct:"The two brothers have distinct personalities.",dominate:"One company dominates the market.",eliminate:"We must eliminate waste in the kitchen.",emphasis:"The school puts great emphasis on reading.",encounter:"We encounter many problems when we travel.",ensure:"Please ensure that the door is locked.",exceed:"The cost must not exceed one hundred euros.",exploit:"Some companies exploit cheap labour.",feasible:"Is it feasible to finish this by Friday?",formulate:"Scientists formulate a theory first.",gradual:"There has been a gradual change in the climate.",hypothesis:"The experiment tested her hypothesis.",illustrate:"Let me illustrate this with an example.",imply:"His silence seemed to imply that he agreed.",indicate:"The sign indicates the way to the station.",innovation:"The company is famous for its innovation.",integrate:"New students find it easy to integrate here.",isolate:"Doctors isolate patients who have the virus.",maintain:"It is hard to maintain a healthy diet.",negotiate:"The two sides will negotiate a new deal.",inevitable:"Change is inevitable in life.",resilient:"Children are often more resilient than adults.",ambiguous:"The instructions were ambiguous and confusing.",mitigate:"Trees help to mitigate the effects of heat.",plausible:"His story sounded plausible to everyone.",diligent:"She is a diligent student who never misses class.",deteriorate:"His health began to deteriorate last winter.",abstract:"Love is an abstract idea.",advocate:"Doctors advocate regular exercise.",albeit:"He finished the race, albeit very slowly.",analogy:"The teacher used an analogy to explain the idea.",arbitrate:"A neutral judge will arbitrate the dispute.",assertive:"You need to be more assertive in meetings.",autonomy:"Teachers need autonomy in their classrooms.",bureaucracy:"Getting a permit meant dealing with endless bureaucracy.",coincide:"Her holiday will coincide with my birthday.",compatible:"This charger is not compatible with my phone.",compromise:"After a long talk, they reached a compromise.",condemn:"Leaders around the world condemn the attack.",conscientious:"A conscientious worker checks every detail.",contemplate:"He sat quietly to contemplate his future.",controversial:"It was a controversial decision.",credibility:"The scandal damaged the politician's credibility.",deduce:"From the clues, we can deduce who did it.",detrimental:"Too much sugar is detrimental to your health.",disparity:"There is a big disparity between rich and poor areas.",disrupt:"Heavy snow can disrupt train services.",dubious:"I am dubious about his promises.",elusive:"Success remained elusive for the young team.",endorse:"The mayor will endorse the new plan.",equilibrium:"The body tries to keep its equilibrium.",explicit:"She gave explicit instructions for the task.",fallacy:"It is a fallacy that money brings happiness.",formidable:"They faced a formidable opponent in the final.",hinder:"Bad weather may hinder the rescue work.",implicit:"There was an implicit threat in his words.",inadvertent:"The error was inadvertent, not deliberate.",indigenous:"The museum shows indigenous art and culture.",ingenious:"It was an ingenious solution to a hard problem.",integrity:"A judge must act with integrity.",intuition:"My intuition told me something was wrong.",lucrative:"Selling software can be a lucrative business.",marginal:"There was only a marginal improvement in sales.",notorious:"The city is notorious for its heavy traffic.",obsolete:"Floppy disks are now obsolete.",perceive:"Many people perceive him as shy.",precedent:"The ruling set a precedent for future cases.",rational:"Let us make a rational decision, not an emotional one.",reconcile:"It is hard to reconcile these two views.",subtle:"There is a subtle difference between the two words."};
function hintFor(w){
  const k=w.toLowerCase(),e=EX[k];
  if(e)return 'Örnek cümle: '+e.replace(new RegExp('\\b'+k+'\\w*','ig'),'____');
  return 'İpucu: ilk harf '+w[0]+', '+w.length+' harf';
}
if('serviceWorker' in navigator)addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));

const TT=[[0,'Çaylak'],[25,'Meraklı'],[100,'Kelime Avcısı'],[250,'Usta'],[500,'Efsane']];
let myThumb='';
function vsHTML(L){
  const op=L.find(x=>x.k!==myId);
  const side=(img,n,t,l)=>'<div class="vs-s"><div class="vs-l">'+l+'</div>'+img+'<b>'+esc(n)+'</b><span>'+esc(t)+'</span></div>';
  return '<div class="vs">'+side(frameWrap(av(prof&&prof.avatar,72),prof&&prof.frame),myName,titleOf(prof),'Sen')+'<div class="vs-x">VS</div>'+(op?side(frameWrap(av(op.im,72),(ovGet(op.n)||{}).fr),op.n,ovTitle(op.n),'Rakip'):side('<div class="vs-w">?</div>','Rakip bekleniyor','','Rakip'))+'</div>';
}
function oVs(n){
  if(!ch||!started)return;
  panel(vsHTML(plist().sort((a,b)=>a.t-b.t))+'<h1 style="text-align:center;font-size:56px;margin:10px 0">'+(n||'Başla!')+'</h1>');
  sfx('tick');
  if(n>0)setTimeout(()=>oVs(n-1),900);else setTimeout(()=>{if(ch&&started)oGo()},600);
}







let logoOK=false;
function mark(s){
  const k=Math.round(s*.2),g=Math.round(s*.09);
  return '<span class="mark" style="width:'+s+'px;height:'+s+'px;border-radius:'+Math.round(s*.3)+'px;grid-template-columns:repeat(3,'+k+'px);gap:'+g+'px">'+['g','g','o','r','g','g'].map(c=>'<i style="width:'+k+'px;height:'+k+'px;background:var(--'+c+')"></i>').join('')+'</span>';
}
function logoHTML(s){return logoOK?'<img src="logo.png" width="'+s+'" height="'+s+'" alt="" style="border-radius:'+Math.round(s*.28)+'px;object-fit:contain">':mark(s)}
function heroHTML(){return '<div class="hero"><div class="hero-logo">'+logoHTML(60)+'</div><h2>vocaboo</h2><p>İngilizce kelime oyunu</p></div>'}
const LI=new Image();
LI.onload=()=>{logoOK=true;$('logo').src='logo.png';$('logo').hidden=false;$('mark').hidden=true};
LI.src='logo.png';

function rHome(){
  const t=$('profT');if(!t)return;
  t.textContent=prof?prof.username:'Profil';
  $('profS').textContent=prof?titleOf(prof)+', rekor '+prof.best_score:'Giriş yap veya kayıt ol';
  $('hi').textContent=prof?'Merhaba, '+prof.username:'Hoş geldin';
  $('hav').innerHTML=av(prof&&prof.avatar,40);
}

const TH2=[['light','Aydınlık','#f5f6f8','#14171f','#293c77'],['dark','Karanlık','#0c0f14','#eef1f6','#8ea2ff'],['amoled','Amoled','#000000','#f2f2f2','#ffffff'],['sakura','Sakura','#fff4f7','#4a2b36','#e0658a'],['lavanta','Lavanta','#f6f3ff','#2a2146','#7c5cf0'],['nane','Nane','#eefaf5','#123b32','#12b886'],['orman','Orman','#f1f7ee','#1d3523','#3f9b62'],['deniz','Deniz','#071e2b','#e6f6fb','#3ec6c0'],['gunbatimi','Gün batımı','#1b1128','#fff0e3','#ff9b6b'],['kahve','Kahve','#1c1511','#f4e8dc','#d9a066']];

const BI={
'İlk kelime':['Herhangi bir kelimeyi doğru bil.',p=>p.words_solved,1],
'50 kelime':['Toplam 50 kelimeyi doğru çöz.',p=>p.words_solved,50],
'250 kelime':['Toplam 250 kelimeyi doğru çöz.',p=>p.words_solved,250],
'İlk denemede 10':['10 kelimeyi ilk tahminde bil.',p=>p.first_try,10],
'İlk denemede 50':['50 kelimeyi ilk tahminde bil.',p=>p.first_try,50],
'Seri 10':['Seri Modunda üst üste 10 kelime bil.',p=>p.best_streak,10],
'Seri 25':['Seri Modunda üst üste 25 kelime bil.',p=>p.best_streak,25],
'500 puan rekoru':['Seri Modunda tek oyunda 500 puana ulaş.',p=>p.best_score,500],
'1500 puan rekoru':['Seri Modunda tek oyunda 1500 puana ulaş.',p=>p.best_score,1500],
'Günlük 3 gün':['Günün kelimesini 3 gün üst üste bil.',p=>p.best_daily_streak,3],
'Günlük 7 gün':['Günün kelimesini 7 gün üst üste bil.',p=>p.best_daily_streak,7],
'Günlük 30 gün':['Günün kelimesini 30 gün üst üste bil.',p=>p.best_daily_streak,30],
'10 günlük zafer':['Günün kelimesini toplam 10 kere bil.',p=>p.daily_wins,10],
'Keskin nişancı':['En az 50 kelime oyna ve doğruluğunu yüzde 80 üstünde tut.',null,0],
'Fotoğraflı profil':['Profiline bir fotoğraf veya avatar ekle.',null,0],
'Haftanın şampiyonu':['Bir haftayı Seri Modu puanında birinci bitir.',p=>p.weekly_wins,1],
'3 hafta şampiyon':['3 haftayı Seri Modu puanında birinci bitir.',p=>p.weekly_wins,3],
'Podyum 5 kez':['Haftalık sıralamada 5 kez ilk 3\'e gir.',p=>p.weekly_podiums,5]
};
function aBadges(){
  const P=prof,list=BD.slice().sort((a,b)=>b[2](P)-a[2](P)),u=BD.filter(b=>b[2](P)).length;
  panel('<p>'+u+'/'+BD.length+' rozet açık. Kilitli rozetlerin altında nasıl kazanacağın yazıyor.</p>'+list.map(b=>{
    const on=b[2](P),i=BI[b[0]]||['',null,0],cur=i[1]?Math.min(i[1](P)||0,i[2]):0;
    return '<div class="bi '+(on?'on':'off')+'"><span class="bi-i">'+b[1]+'</span><div class="bi-t"><b>'+b[0]+'</b><small>'+i[0]+'</small>'+(!on&&i[1]?'<div class="bi-b"><i style="width:'+Math.round(cur/i[2]*100)+'%"></i></div><small>'+cur+' / '+i[2]+'</small>':'')+'</div><span class="bi-s">'+(on?'Kazanıldı':'Kilitli')+'</span></div>';
  }).join('')+btn('ob','Profil'));
  $('ob').onclick=aProfile;
}

