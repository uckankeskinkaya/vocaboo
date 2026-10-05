
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
  const sd=(x,r,img)=>'<div class="mv'+(r?' r':'')+'">'+frameWrap(av(img,40),x&&(ovGet(x.n)||{}).fr)+'<div><b>'+esc(x?x.n:'Rakip yok')+'</b><span>'+(x?(cfg.m==='s'?x.w+' kelime':x.p+' puan')+(x.a?'':' (elendi)'):'')+'</span></div></div>';
  return '<div class="mvs">'+sd(me,0,prof&&prof.avatar)+'<span class="vs-x" style="font-size:16px">VS</span>'+sd(op,1,op&&op.im)+'</div>';
}
// Müzik: audio/warm-piano.mp3 (kullanıcının eklediği parça). Sonda yumuşakça kısılır, başta yumuşakça açılır, döngüye girer.
const MF=3;let mA=null,mOn=false;
function mFade(){
  if(!mA)return;
  const t=mA.currentTime,d=mA.duration||0,f=d>2*MF?Math.min(1,t/MF,(d-t)/MF):1;
  mA.volume=Math.max(0,Math.min(1,MV()/100*Math.max(0,f)));
}
function musicVol(){mFade()}
function musicStart(){
  if(!MO()||MV()<=0){musicStop();return}
  if(!mA){mA=new Audio('audio/warm-piano.mp3');mA.loop=true;mA.preload='auto';mA.volume=0;mA.addEventListener('timeupdate',mFade)}
  mOn=true;mFade();
  const p=mA.play();if(p&&p.catch)p.catch(()=>{mOn=false});
  mT=mOn?1:null;
}
function musicStop(){if(mA)mA.pause();mOn=false;mT=null}
const mGo=()=>{if((!mA||mA.paused)&&MO()&&MV()>0)musicStart()};
addEventListener('pointerdown',mGo);addEventListener('keydown',mGo);
document.addEventListener('visibilitychange',()=>{if(ac)document.hidden?ac.suspend():ac.resume();if(mA){if(document.hidden)mA.pause();else if(mOn&&MO()&&MV()>0)mA.play().catch(()=>{})}});
