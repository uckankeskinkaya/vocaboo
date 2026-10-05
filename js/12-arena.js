
// Arena modu (canlı sınıf yarışması): kurucu sunucu gibi çalışır. Doğru cevap ve süre ölçümü sadece kurucuda.
const AN='Arena';
document.head.insertAdjacentHTML('beforeend','<style>body.kmode #nav{display:none}body.kmode #app{padding-bottom:14px}.kq{font-size:22px;font-weight:800;line-height:1.35;text-align:center;margin:10px 0 14px}.ksc{font-size:34px;font-weight:800;letter-spacing:6px;text-align:center;margin:0 0 12px;word-break:break-all}.x2{text-align:center;color:var(--o);font-weight:800;margin:0 0 6px}.kbar{height:8px;border-radius:4px;background:var(--key);margin-bottom:14px;overflow:hidden}.kbar i{display:block;height:100%;width:100%;background:var(--ac)}.kbar.hot i{background:var(--r)}.kg{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px}.ko{display:flex;align-items:center;gap:8px;min-height:84px;padding:12px;border:0;border-radius:16px;color:#fff;font-weight:700;font-size:15px;text-align:left}.ko b{font-size:22px}.ko em{margin-left:auto;font-style:normal;font-size:20px;font-weight:800}.k0{background:#e5484d}.k1{background:#2f6fed}.k2{background:#f59e0b}.k3{background:#22a35a}.ko:disabled{opacity:.55}.ko.sel{opacity:1;outline:3px solid var(--fg)}.ko.no{opacity:.35}.kres{text-align:center;padding:18px;border-radius:20px;color:#fff;margin-bottom:10px}.kres.ok{background:var(--g)}.kres.bad{background:var(--r)}.kres h1,.kres h2{margin:0}.kcd{position:fixed;left:50%;top:38%;z-index:60;font-size:130px;font-weight:800;color:var(--r);pointer-events:none;animation:kp .9s ease-out both}@keyframes kp{from{transform:translate(-50%,-50%) scale(1.6);opacity:1}to{transform:translate(-50%,-50%) scale(.8);opacity:0}}.pod{display:flex;align-items:flex-end;justify-content:center;gap:8px;margin:14px 0}.pc{flex:1;max-width:130px;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;border-radius:14px 14px 0 0;padding:8px 4px;color:#fff;font-weight:700;text-align:center;word-break:break-all;animation:in .5s ease both}.pc i{font-style:normal;font-size:26px;font-weight:800}.p1{height:170px;background:#f59e0b}.p2{height:130px;background:#94a3b8}.p3{height:100px;background:#b45309}</style>');
Object.assign(EN,{'Soruyu bitir':'End question','Sonraki soru':'Next question','Yanlış':'Wrong','Süre doldu':"Time's up",'En yüksekler':'Top players','Podyum':'Podium','Tüm sonuçlar':'All results','Sıran:':'Rank:','Sıradaki soru bekleniyor...':'Waiting for the next question...','Hazır ol...':'Get ready...','Karışık':'Mixed','Cevabın gönderildi':'Answer sent','Soru süresi (Arena)':'Question time (Arena)','Son odaya geri dön':'Rejoin last room','⚡ 2x puan':'⚡ 2x points','Doğru cevap:':'Correct answer:','Tebrikler, kazandın!':'Congratulations, you won!'});
RX.push([/^Soru (\d+)\/(\d+)$/,'Question $1/$2'],[/^(\d+) soru$/,'$1 questions'],[/^(\d+)\/(\d+) cevapladı$/,'$1/$2 answered'],[/^(\d+) sn$/,'$1 s'],[/^Son odaya geri dön /,'Rejoin last room '],[/^🔥 (\d+) üst üste$/,'🔥 $1 in a row'],[/^(\d+) puan geride:$/,'$1 pts behind:'],[/^Otomatik geçiş: (\d+) sn$/,'Auto-advance: $1 s']);
const KS=['▲','◆','●','■'],KT=()=>(cfg&&cfg.T)||20,RD=3000,RV=7000,krn=a=>a[Math.random()*a.length|0],shf=a=>a.slice().sort(()=>Math.random()-.5);
const ksn=(f,t,d)=>{if(SO())tone(f,t,d)},kOrd=id=>!id?-1:id==='f'?1e9:(+id.slice(1))*2+(id[0]==='r'?1:0);
const kRoom=()=>{try{localStorage.setItem('ka_room',JSON.stringify({c:room,t:Date.now()}))}catch(e){}};
const kQuit=()=>{try{localStorage.removeItem('ka_room')}catch(e){}oExit()};
const kc=(q,j)=>q.t==='tf'?(j?0:1):j,kgl=(q,j)=>q.t==='tf'?['✔','✘'][j]:KS[j];
let K={q:[],i:-1,ans:Object.create(null),sc:Object.create(null),rv:false,my:-1};
// Soru tipleri: şıklı (4 alt tür), doğru/yanlış, yazarak cevap, harfleri sırala. Rastgele sorular 2x puan.
function kGen(n,l){
  const out=[],ls=l<0?[0,1,2,3]:[l];
  while(out.length<n){
    const P=W[krn(ls)],p=krn(P).split('|'),w=p[0],r=Math.random(),x2=Math.random()<.15;
    if(r<.15){
      const x=krn(P).split('|'),ok=Math.random()<.5||x[0]===w,d=ok?p[1]:x[1];
      out.push({t:'tf',q:w.toUpperCase()+': '+d,o:['Doğru','Yanlış'],a:ok?0:1,x2});continue;
    }
    if(r<.5&&w.length<=9){
      let sc=w;for(let k=0;k<9&&sc===w;k++)sc=shf([...w]).join('');
      out.push(r<.33?{t:'ty',q:p[1],a:w,len:w.length,x2}:{t:'ty',q:p[1],a:w,len:w.length,sc:sc.toUpperCase(),x2});continue;
    }
    const ds=[];while(ds.length<3){const x=krn(P).split('|');if(x[0]!==w&&!ds.some(y=>y[0]===x[0]))ds.push(x)}
    const all=shf([p,...ds]),a=all.indexOf(p),ex=EX[w],ty=['d','w'];
    if(ex)ty.push('s');if(HT[w])ty.push('t');
    const t=krn(ty);let q,o=all.map(x=>x[0]);
    if(t==='d')q=p[1];else if(t==='w'){q=w;o=all.map(x=>x[1])}
    else if(t==='s')q=ex.replace(new RegExp('\\b'+w+'\\w*','ig'),'____');else q=HT[w];
    out.push({t:'q',q,o,a,x2});
  }
  return out;
}
const kSend=(ev,pl)=>ch.send({type:'broadcast',event:ev,payload:pl});
const kTop=()=>Object.keys(K.sc).map(k=>({k,n:K.sc[k].n,p:K.sc[k].p})).sort((a,b)=>b.p-a.p);
const kPub=(q,i)=>({i,n:cfg.n,t:q.t,q:q.q,o:q.o||[],x2:q.x2,len:q.len,sc:q.sc});
// Güvenlik: Realtime üzerinden gelen veri başka bir oyuncunun kontrolünde. Sayılar sayıya, metinler kısa metne indirilir.
function nz(v,a,b){v=Math.trunc(+v);if(!isFinite(v))v=0;return Math.min(b,Math.max(a,v))}
function cfgClean(c){if(!c||typeof c!=='object')return null;return{max:nz(c.max,2,50),m:c.m==='s'||c.m==='k'?c.m:'c',n:nz(c.n,0,200),dur:nz(c.dur,0,3600),l:nz(c.l,-1,3),mod:c.mod?1:0,T:nz(c.T||20,5,120)}}
function kClean(ev,p){
  if(!p||typeof p!=='object')return null;
  const S=(v,n)=>String(v==null?'':v).slice(0,n);
  const mp=o=>{const r=Object.create(null);if(o&&typeof o==='object')Object.keys(o).slice(0,200).forEach(k=>{r[k]=nz(o[k],-1,1e7)});return r};
  const tp=t=>Array.isArray(t)?t.slice(0,200).map(x=>({n:S(x&&x.n,16),p:nz(x&&x.p,-1e7,1e7)})):[];
  const qn=()=>{const o={i:nz(p.i,0,200),n:nz(p.n,0,200),t:p.t==='tf'||p.t==='ty'?p.t:'q',q:S(p.q,600),o:Array.isArray(p.o)?p.o.slice(0,4).map(x=>S(x,300)):[],x2:p.x2?1:0,len:nz(p.len,0,40),rd:nz(p.rd,0,15000),el:nz(p.el,-1e6,1e6)};if(p.sc)o.sc=S(p.sc,40);return o};
  const rn=r=>({i:nz(r.i,0,200),a:r.t==='ty'?S(r.a,40):nz(r.a,0,3),d:Array.isArray(r.d)?r.d.slice(0,4).map(v=>nz(v,0,1e5)):[0,0],pts:mp(r.pts),st:mp(r.st),top:tp(r.top),t:r.t==='tf'||r.t==='ty'?r.t:'q'});
  if(ev==='kq')return qn();
  if(ev==='kr')return rn(p);
  if(ev==='kf')return{top:tp(p.top)};
  if(ev==='ks'){const c=cfgClean(p.c);if(!c)return null;if(p.f)return{c,f:tp(p.f)};if(p.r&&typeof p.r==='object')return{c,i:nz(p.i,0,200),r:rn(p.r)};return{c,...qn()}}
  return null;
}
function kBegin(pl){
  started=true;cfg=cfgClean(pl.c)||cfg;mode='online';document.body.classList.add('kmode');
  K={q:[],i:-1,ans:Object.create(null),sc:Object.create(null),rv:false,my:-1,sh:null,pk:new Set(plist().map(x=>x.k))};
  if(isHost){plist().forEach(x=>{if(!(x.h&&x.mo))K.sc[x.n]={n:x.n,p:0,s:0}});K.q=kGen(cfg.n,cfg.l);kHostQ(0)}
  else panel('<h2 style="text-align:center;margin:40px 0">Hazır ol...</h2>');
}
function kHostQ(i){
  clearTimeout(K.nx);K.i=i;K.ans=Object.create(null);K.rv=false;K.t0=Date.now()+RD;const q=K.q[i];
  kSend('kq',{...kPub(q,i),rd:RD});
  kShowQ(kPub(q,i),i,true,-RD);
  clearTimeout(K.tm);K.tm=setTimeout(kReveal,RD+KT()*1000+800);
}
function kShowQ(q,i,host,el){
  K.my=-1;K.sh='q'+i;K.ls=9;if(!host)kRoom();clearInterval(K.cd);ksn(660,0,.08);ksn(880,.09,.1);
  const T0=Date.now()-(el||0),ty=q.t==='ty';
  let body;
  if(ty)body=host?'<div class="ksc">'+'_ '.repeat(q.len).trim()+'</div>':'<input id="kin" maxlength="20" autocapitalize="none" autocomplete="off" style="'+SEL+';text-transform:uppercase;text-align:center;font-size:22px;letter-spacing:3px">'+btn('ksnd','Gönder');
  else body='<div class="kg">'+q.o.map((o,j)=>'<'+(host?'div':'button')+' class="ko k'+kc(q,j)+'" data-j="'+j+'"><b>'+kgl(q,j)+'</b><span>'+esc(o)+'</span></'+(host?'div':'button')+'>').join('')+'</div>';
  panel('<p class="cap">Soru '+(i+1)+'/'+cfg.n+'</p>'+(q.x2?'<p class="x2">⚡ 2x puan</p>':'')+'<div class="kq">'+esc(q.q)+'</div>'+(q.sc?'<div class="ksc">'+esc(q.sc)+'</div>':'')+(ty?'<p class="cap" style="text-align:center">'+q.len+' harf</p>':'')+'<div class="kbar"><i id="kbi"></i></div><div id="kgw" hidden>'+body+'</div><p id="kn"></p>'+(host?btn('kskip','Soruyu bitir'):'')+btn('ob','Çık'));
  $('ob').onclick=kQuit;
  K.cd=setInterval(()=>{
    const rem=KT()*1000-(Date.now()-T0),sec=Math.ceil(rem/1000),b=$('kbi'),g=$('kgw');
    if(g&&g.hidden&&rem<=KT()*1000)g.hidden=false;
    if(b){b.style.width=Math.min(1,Math.max(0,rem/(KT()*1000)))*100+'%';b.parentNode.classList.toggle('hot',sec<=5)}
    if(sec<=5&&sec>0&&sec!==K.ls){K.ls=sec;ksn(500+(5-sec)*70,0,.12);if(VI()&&navigator.vibrate)try{navigator.vibrate(30)}catch(e){}const d=document.createElement('div');d.className='kcd';d.textContent=sec;document.body.appendChild(d);setTimeout(()=>d.remove(),900)}
    if(rem<=0)clearInterval(K.cd)},100);
  if(host){$('kskip').onclick=kReveal;return}
  const send=(c,el2)=>{if(K.my!==-1)return;K.my=c;ksn(440,0,.06);kSend('ka',{k:myName,i,c});document.querySelectorAll('.ko,#kin,#ksnd').forEach(x=>x.disabled=true);if(el2)el2.classList.add('sel');$('kn').textContent='Cevabın gönderildi'};
  document.querySelectorAll('.ko').forEach(b=>b.onclick=()=>send(+b.dataset.j,b));
  if(ty){const f=()=>{const v=$('kin').value.toLowerCase().replace(/[^a-z]/g,'');if(v)send(v)};$('ksnd').onclick=f;$('kin').onkeydown=e=>{if(e.key==='Enter')f()}}
}
function kOnA(p){
  if(!isHost||!started||K.rv||p.i!==K.i||typeof p.k!=='string'||K.ans[p.k]||!K.sc[p.k])return;
  const q=K.q[K.i],ty=q.t==='ty';
  if(ty?!(typeof p.c==='string'&&/^[a-z]{1,20}$/.test(p.c)):!(Number.isInteger(p.c)&&p.c>=0&&p.c<q.o.length))return;
  const dt=Date.now()-K.t0;if(dt<-300||dt>KT()*1000+1500)return;
  K.ans[p.k]={c:p.c,dt:Math.max(0,dt)};
  const pr=new Set(plist().map(x=>x.n)),n=Object.keys(K.ans).filter(k=>pr.has(k)).length,m=Object.keys(K.sc).filter(k=>pr.has(k)).length;
  if($('kn'))$('kn').textContent=n+'/'+m+' cevapladı';
  if(n>=m)kReveal();
}
function kReveal(){
  if(!isHost||K.rv||!started)return;K.rv=true;clearTimeout(K.tm);
  const q=K.q[K.i],ty=q.t==='ty',d=ty?[0,0]:q.o.map(()=>0),pts=Object.create(null),st=Object.create(null);
  for(const k in K.sc){
    const a=K.ans[k],s=K.sc[k];
    if(!a){s.s=0;pts[k]=-1}
    else{
      const ok=a.c===q.a;
      if(ty)d[ok?0:1]++;else d[a.c]++;
      if(ok){const p=Math.round(1000*(1-Math.min(a.dt/(KT()*1000),1)/2))*(q.x2?2:1)+Math.min(s.s,5)*100;s.p+=p;s.s++;pts[k]=p}else{s.s=0;pts[k]=0}
    }
    st[k]=s.s;
  }
  K.last={a:q.a,d,pts,st,top:kTop(),t:q.t};
  kSend('kr',{i:K.i,...K.last});
  kShowR(K.last,true);
  clearTimeout(K.nx);K.nx=setTimeout(()=>K.i+1>=cfg.n?kFinish():kHostQ(K.i+1),RV);
}
function kShowR(R,host){
  clearInterval(K.cd);K.sh='r'+K.i;const top=R.top,ty=R.t==='ty';
  const board='<p>En yüksekler</p>'+top.slice(0,5).map((x,i)=>'<div class="pl"><span>'+(i+1)+'. '+esc(x.n)+'</span><b>'+x.p+'</b></div>').join('');
  if(host){
    const q=K.q[K.i],last=K.i+1>=cfg.n;ksn(330,0,.15);
    panel((ty?'<div class="kres ok"><h2>'+esc(R.a.toUpperCase())+'</h2></div><p style="text-align:center">✔ '+R.d[0]+' &nbsp; ✘ '+R.d[1]+'</p>':'<div class="kg">'+q.o.map((o,j)=>'<div class="ko k'+kc(q,j)+(j===R.a?'':' no')+'"><b>'+kgl(q,j)+'</b><span>'+esc(o)+'</span><em>'+R.d[j]+'</em></div>').join('')+'</div>')+board+'<p class="cap">Otomatik geçiş: '+RV/1000+' sn</p>'+btn('knx',last?'Sonuçlar':'Sonraki soru')+btn('ob','Çık'));
    $('knx').onclick=()=>last?kFinish():kHostQ(K.i+1);
  }else{
    const me=R.pts[myName],rk=top.findIndex(x=>x.n===myName),sk=R.st[myName]||0;sfx(me>0?'win':'lose');
    panel('<div class="kres '+(me>0?'ok':'bad')+'"><h1>'+(me>0?'Doğru!':me===0?'Yanlış':'Süre doldu')+'</h1>'+(me>0?'<h2>+'+me+' puan</h2>':'')+'</div>'+(me>0&&sk>1?'<p>🔥 '+sk+' üst üste</p>':'')+(me<=0&&ty?'<p>Doğru cevap: <b>'+esc(R.a.toUpperCase())+'</b></p>':'')+(rk>=0?'<p>Sıran: <b>'+(rk+1)+'.</b></p><p>'+top[rk].p+' puan</p>':'')+(rk>0?'<p>'+(top[rk-1].p-top[rk].p)+' puan geride: <b>'+esc(top[rk-1].n)+'</b></p>':'')+board+'<p>Sıradaki soru bekleniyor...</p>'+btn('ob','Çık'));
  }
  $('ob').onclick=kQuit;
}
function kFinish(){clearTimeout(K.nx);const top=kTop();K.fin=top;kSend('kf',{top});kShowF(top)}
function kShowF(top){
  clearInterval(K.cd);K.sh='f';try{localStorage.removeItem('ka_room')}catch(e){}sfx('badge');const rk=top.findIndex(x=>x.n===myName);
  const pc=(x,i,c)=>'<div class="pc '+c+'">'+(x?'<b>'+esc(x.n)+'</b><span>'+x.p+'</span><i>'+(i+1)+'</i>':'')+'</div>';
  panel('<h2 style="text-align:center">Podyum</h2>'+(rk===0&&!isHost?'<p style="text-align:center"><b>Tebrikler, kazandın!</b></p>':'')+'<div class="pod">'+pc(top[1],1,'p2')+pc(top[0],0,'p1')+pc(top[2],2,'p3')+'</div>'+(rk>2?'<p>Sıran: <b>'+(rk+1)+'.</b></p>':'')+(top.length>3?'<p>Tüm sonuçlar</p>'+top.slice(3).map((x,i)=>'<div class="pl"><span>'+(i+4)+'. '+esc(x.n)+'</span><b>'+x.p+'</b></div>').join(''):'')+btn('ob','Ana menü'));
  $('ob').onclick=kQuit;
}
function kOn(ev,p){
  if(!p)return;
  if(ev!=='ka'){p=kClean(ev,p);if(!p)return}
  if(ev==='ks'){if(!isHost)kResume(p);return}
  if(!started||!cfg||cfg.m!=='k')return;
  if(ev==='ka')return kOnA(p);
  if(isHost)return;
  if(ev==='kq'){K.i=p.i;cfg.n=p.n;kShowQ(p,p.i,false,-(p.rd||0))}
  else if(ev==='kr'){K.i=p.i;kShowR(p,false)}
  else if(ev==='kf')kShowF(p.top);
}
// Yeniden bağlanma: kurucu yeni gelen veya dönen oyuncuya mevcut durumu yollar
function kState(){
  if(!isHost||!started||!cfg||cfg.m!=='k')return;
  if(K.fin)return kSend('ks',{c:cfg,f:K.fin});
  if(K.i<0)return;
  if(K.rv&&K.last)kSend('ks',{c:cfg,i:K.i,r:K.last});
  else kSend('ks',{c:cfg,...kPub(K.q[K.i],K.i),el:Date.now()-K.t0});
}
function kResume(p){
  const id=p.f?'f':p.r?'r'+p.i:'q'+p.i;
  if(!started){if(!p.c)return;started=true;cfg=p.c;mode='online';document.body.classList.add('kmode');K={q:[],i:-1,ans:Object.create(null),sc:Object.create(null),rv:false,my:-1,sh:null}}
  if(kOrd(id)<=kOrd(K.sh))return;
  K.i=p.i;
  if(p.f)kShowF(p.f);else if(p.r)kShowR(p.r,false);else kShowQ(p,p.i,false,p.el);
}
function kPresence(){
  if(!isHost||!started||!cfg||cfg.m!=='k'||!ch||!K.pk)return;
  const L=plist().filter(x=>!(x.h&&x.mo));let nw=false;
  L.forEach(x=>{if(!K.pk.has(x.k)){nw=true;if(!K.sc[x.n])K.sc[x.n]={n:x.n,p:0,s:0}}});
  K.pk=new Set(L.map(x=>x.k));
  if(nw)setTimeout(kState,400);
}
const _ob=oBegin;oBegin=function(pl){if(pl&&pl.c&&pl.c.m==='k'){if(started)return;clearInterval(mmT);mmT=null;kBegin(pl);return}_ob(pl)};
const _ol=oLobby;oLobby=function(L){_ol(L);if(cfg&&cfg.m==='k')document.querySelectorAll('#online p').forEach(p=>{if(/Hayatta kalma/.test(p.textContent))p.textContent=AN+', '+cfg.n+' soru, '+(cfg.T||20)+' sn, '+(cfg.l<0?'Karışık':LBL[cfg.l])})};
const _os=oSetup;oSetup=function(){
  _os();const s=$('s2');if(!s)return;
  s.insertAdjacentHTML('beforeend',[10,15,20].map(n=>'<option value="k'+n+'">'+AN+', '+n+' soru</option>').join(''));
  s.insertAdjacentHTML('afterend','<p>Soru süresi ('+AN+')</p><select id="skt" style="'+SEL+'">'+[10,15,20,30,45,60].map(v=>'<option value="'+v+'"'+(v===20?' selected':'')+'>'+v+' sn</option>').join('')+'</select>');
  const o=$('ok2').onclick;
  $('ok2').onclick=()=>{const m=s.value;if(m[0]!=='k')return o();cfg={max:50,m:'k',n:+m.slice(1),dur:0,l:+$('s3').value,mod:1,T:+$('skt').value};oJoin(Math.random().toString(36).slice(2,6).toUpperCase(),true)};
};
const _oe2=oExit;oExit=function(m){clearTimeout(K.tm);clearTimeout(K.nx);clearInterval(K.cd);document.body.classList.remove('kmode');_oe2(m)};
const _osy=oSync;oSync=function(){_osy();kPresence()};
const _oh=oHome;oHome=function(){
  _oh();let r=null;try{r=JSON.parse(localStorage.getItem('ka_room'))}catch(e){}
  const b=$('oc');if(!r||!b||Date.now()-r.t>18e5)return;
  b.insertAdjacentHTML('beforebegin','<button class="lvl" id="orj" style="justify-content:center">Son odaya geri dön ('+esc(r.c)+')</button>');
  $('orj').onclick=()=>{myName=prof.username;oJoin(r.c,false)};
};
$('mOnline').onclick=oHome;
