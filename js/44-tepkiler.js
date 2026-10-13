// v28: Online oyunda emoji tepkileri.
// 1v1: kendi kartına dokun, emoji seç; tepki oyuncunun profil kartının yanında çıkar (rakip sağda, sen solda).
// Grup: tepki sağdan bir bildirim olarak (avatar + çerçeve + isim + emoji) gelir ve sadece sonraki soru beklenirken gösterilir.
// Sunucuya yazılmaz; oda kanalındaki "emo" yayınıyla gider. Sadece izinli emojiler ve hız sınırı geçerli.
(function(){
const SET=['👋','👏','😮','😂','🔥','😎','🤝','💪'];
const kuyruk=[],son={};let bekleBos=0,gon=0;
document.head.insertAdjacentHTML('beforeend',`<style>
.tpb{position:fixed;z-index:70;pointer-events:none;font-size:34px;line-height:1;filter:drop-shadow(0 3px 6px rgba(0,0,0,.35));animation:tp-pop 2.4s ease-out forwards}
@keyframes tp-pop{0%{transform:translateY(8px) scale(.3);opacity:0}12%{transform:translateY(0) scale(1.25);opacity:1}22%{transform:scale(1)}80%{opacity:1}100%{transform:translateY(-14px) scale(1);opacity:0}}
.tpn{position:fixed;right:10px;top:78px;z-index:80;display:flex;align-items:center;gap:8px;padding:8px 12px 8px 8px;border-radius:99px;background:var(--panel);border:1px solid var(--line);box-shadow:var(--sh);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);animation:tp-in 3.4s ease both;pointer-events:none;max-width:70vw}
.tpn .tpa{flex:none;width:40px;height:40px;display:grid;place-items:center;overflow:hidden;border-radius:50%}.tpn b{font-size:13px;max-width:30vw;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tpn .e{font-size:26px;line-height:1}
@keyframes tp-in{0%{transform:translateX(120%)}10%{transform:translateX(0)}88%{transform:translateX(0)}100%{transform:translateX(120%)}}
.tpp{position:fixed;z-index:75;display:flex;gap:4px;padding:6px;border-radius:16px;background:var(--panel);border:1px solid var(--line);box-shadow:var(--sh);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px)}
.tpp button,.tpbar button{font-size:24px;line-height:1;width:38px;height:38px;border-radius:12px;border:0;background:transparent}
.tpp button:active,.tpbar button:active{transform:scale(.88);background:var(--key)}
.tpbar{display:flex;gap:4px;justify-content:center;flex-wrap:wrap;margin:8px 0 0}
.mv:not(.r){cursor:pointer}
:root[data-perf=low] .tpn,:root[data-perf=low] .tpb{animation-duration:.01s}
</style>`);
const okEmo=e=>SET.indexOf(e)>=0;
const kimdir=k=>{try{return plist().find(x=>x.k===k)||null}catch(e){return null}};
const bekliyor=()=>{const g=$('game'),o=$('online');return (mode==='online'&&typeof over!=='undefined'&&over===true)||(g&&g.hidden&&o&&!o.hidden)};
function balon(sol,emo){
  const l=$('live');if(!l)return;
  const kartlar=l.querySelectorAll('.mv'),kart=kartlar[sol?0:1]||l,r=kart.getBoundingClientRect();
  const b=document.createElement('div');b.className='tpb';b.textContent=emo;
  b.style.fontSize='28px';b.style.left=Math.max(4,Math.min(innerWidth-40,sol?r.left+6:r.right-36))+'px';b.style.top=Math.max(4,r.top-26)+'px';
  document.body.appendChild(b);setTimeout(()=>b.remove(),2500);
}
function bildirim(x,emo){
  const v=(typeof ovGet==='function'&&ovGet(x.n))||{};
  while(document.querySelectorAll('.tpn').length>=2)document.querySelector('.tpn').remove();
  const d=document.createElement('div');d.className='tpn';
  d.innerHTML='<span class="tpa">'+frameWrap(av(x.im,28),v.fr||null)+'</span>'+'<b>'+esc(x.n)+'</b><span class="e">'+emo+'</span>';
  const top=78+document.querySelectorAll('.tpn').length*60;d.style.top=top+'px';
  document.body.appendChild(d);setTimeout(()=>d.remove(),3500);
}
function akitKuyruk(){
  if(!bekliyor())return;
  while(kuyruk.length){const [x,e]=kuyruk.shift();bildirim(x,e)}
}
window.tepkiGeldi=function(p){
  if(!p||!okEmo(p.e)||typeof p.k!=='string'||p.k.length>64)return;
  const t=Date.now();if(son[p.k]&&t-son[p.k]<1200)return;son[p.k]=t;
  const x=kimdir(p.k);if(!x)return;
  const ben=p.k===myId;
  if(cfg&&cfg.max===2&&typeof started!=='undefined'&&started&&!$('game').hidden){balon(ben,p.e);return}
  if(ben)return;                      // grup: kendi tepkini bildirim olarak gösterme
  kuyruk.push([x,p.e]);if(kuyruk.length>4)kuyruk.shift();
  akitKuyruk();
};
function yolla(e){
  if(!ch||!okEmo(e))return false;
  const t=Date.now();if(t-gon<1500)return false;gon=t;
  ch.send({type:'broadcast',event:'emo',payload:{k:myId,e}});
  return true;
}
function secici(x,y){
  kapat();
  const d=document.createElement('div');d.className='tpp';d.id='tpp';
  d.innerHTML=SET.map(e=>'<button data-e="'+e+'" aria-label="'+e+'">'+e+'</button>').join('');
  document.body.appendChild(d);
  const w=d.offsetWidth;d.style.left=Math.max(6,Math.min(innerWidth-w-6,x))+'px';d.style.top=y+'px';
  d.onclick=ev=>{const b=ev.target.closest('button');if(b){yolla(b.dataset.e);kapat()}};
  setTimeout(()=>document.addEventListener('pointerdown',kapatDis,{once:true}),50);
}
const kapat=()=>{const d=$('tpp');if(d)d.remove()};
const kapatDis=e=>{if(!e.target.closest('#tpp'))kapat()};
// 1v1: kendi kartına dokununca seçici
document.addEventListener('click',e=>{
  const k=e.target.closest&&e.target.closest('#live .mv:not(.r)');
  if(!k||!cfg||cfg.max!==2||$('game').hidden)return;
  const r=k.getBoundingClientRect();secici(r.left,r.bottom+6);
});
// Sonraki soruyu beklerken (sonuç satırı) hızlı tepki çubuğu ve bekleyen bildirimler
const _f=finish;
finish=function(){
  _f.apply(this,arguments);
  if(mode!=='online')return;
  const res=$('res');if(res&&!$('tpbar')){
    res.insertAdjacentHTML('beforeend','<div class="tpbar" id="tpbar">'+SET.map(e=>'<button data-e="'+e+'" aria-label="'+e+'">'+e+'</button>').join('')+'</div>');
    $('tpbar').onclick=ev=>{const b=ev.target.closest('button');if(b)yolla(b.dataset.e)};
  }
  akitKuyruk();
};
const _on=oResults;oResults=function(){_on.apply(this,arguments);setTimeout(akitKuyruk,50)};
})();
