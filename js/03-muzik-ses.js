
let sel=-1,dg=null,mg=null,mT=null,mN=0,mB=0;
const MV=()=>{try{const v=localStorage.getItem('ka_vol');return v===null?40:+v}catch(e){return 40}};
const MO=()=>{try{return localStorage.getItem('ka_mus')!=='0'}catch(e){return true}};
// Sürükle bırak: dolu kutuyu tut, başka kutuya bırak (boşsa taşınır, doluysa yer değişir). Boş kutuya dokun: sıradaki harf oraya gider.
$('gridwrap').addEventListener('pointerdown',e=>{
  if(over||e.button>0)return;
  const t=e.target.closest('[data-s]');if(!t)return;
  dg={s:+t.dataset.s,x:e.clientX,y:e.clientY,g:null,t};
});
addEventListener('pointermove',e=>{
  if(!dg)return;
  if(!dg.g){
    if(!cur[dg.s]||Math.hypot(e.clientX-dg.x,e.clientY-dg.y)<8)return;
    const g=document.createElement('div'),z=$('gridwrap').style.getPropertyValue('--t');
    g.className='ghost';g.textContent=cur[dg.s];g.style.width=g.style.height=z;
    document.body.appendChild(g);dg.g=g;dg.t.style.opacity='.3';
  }
  dg.g.style.left=e.clientX+'px';dg.g.style.top=e.clientY+'px';
});
addEventListener('pointerup',e=>{
  if(!dg)return;
  const d=dg;dg=null;
  if(d.g){
    d.g.remove();
    const el=document.elementFromPoint(e.clientX,e.clientY),t=el&&el.closest('[data-s]');
    if(t&&+t.dataset.s!==d.s){const j=+t.dataset.s,a=cur[d.s];cur[d.s]=cur[j];cur[j]=a;sfx('key')}
    draw();
  }else if(!cur[d.s]){sel=d.s;draw()}
});
addEventListener('pointercancel',()=>{if(dg){if(dg.g){dg.g.remove();draw()}dg=null}});
function vsLive(L){
  const me=L.find(x=>x.k===myId),op=L.find(x=>x.k!==myId);
  const sd=(x,r,img)=>'<div class="mv'+(r?' r':'')+'">'+frameWrap(av(img,40),x&&x.fr)+'<div><b>'+esc(x?x.n:'Rakip yok')+'</b><span>'+(x?(cfg.m==='s'?x.w+' kelime':x.p+' puan')+(x.a?'':' (elendi)'):'')+'</span></div></div>';
  return '<div class="mvs">'+sd(me,0,prof&&prof.avatar)+'<span class="vs-x" style="font-size:16px">VS</span>'+sd(op,1,op&&op.im)+'</div>';
}
// Müzik: dosya yok, kod üretiyor. Am-F-C-G akoru, yumuşak pad ve seyrek arpej.
const CH=[[220,261.63,329.63],[174.61,220,261.63],[261.63,329.63,392],[196,246.94,293.66]];
function mn(f,t,d,v,ty,at){const o=ac.createOscillator(),g=ac.createGain();o.type=ty;o.frequency.value=f;g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+at);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(mg);o.start(t);o.stop(t+d+.1)}
function mTick(){
  while(mN<ac.currentTime+1.5){
    const b=mB%16,c=CH[b>>2];
    if(b%4===0)c.forEach(f=>mn(f,mN,3.8,.05,'sine',.9));
    if(Math.random()<.7){const o=Math.random()<.65?2:4;mn(c[Math.random()*3|0]*o,mN,1.8,o===2?.08:.05,'triangle',.03)}
    mN+=.8;mB++;
  }
}
function musicStart(){
  if(!MO()||MV()<=0){musicStop();return}
  ac=ac||new (window.AudioContext||window.webkitAudioContext)();if(ac.state==='suspended')ac.resume();
  if(!mg){mg=ac.createGain();mg.gain.value=0;mg.connect(ac.destination)}
  mg.gain.setTargetAtTime(MV()/100*.9,ac.currentTime,.3);
  if(!mT){mN=ac.currentTime+.1;mB=0;mT=setInterval(mTick,500)}
}
function musicStop(){if(mg&&ac)mg.gain.setTargetAtTime(0,ac.currentTime,.2);if(mT){clearInterval(mT);mT=null}}
const mGo=()=>{if(!mT&&MO()&&MV()>0)musicStart()};
addEventListener('pointerdown',mGo);addEventListener('keydown',mGo);
document.addEventListener('visibilitychange',()=>{if(ac)document.hidden?ac.suspend():ac.resume()});
