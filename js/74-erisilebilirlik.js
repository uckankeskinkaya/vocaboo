// v54: Erişilebilirlik ve dürüstlük düzeltmeleri (Impeccable denetimi).
// 1) Klavyede turuncu tuş/kutuda koyu harf, yeşil tuş biraz koyu: harf kontrastı WCAG AA (4.5:1) üstünde.
// 2) Ekran okuyucu: her tahminden sonra harf harf sonuç okunur (gizli aria-live alanı); sonuç mesajı (#res) da okunur.
// 3) "Hareketi azalt" açıkken süs animasyonları kapalı kalır ama kutuların renk açılışı kısa bir geçişle görünür.
// 4) Seri Modu kartındaki çizgi artık sabit çizim değil: bu cihazda oynanan son Seri oyunlarının skorları (en fazla 8).
//    2'den az oyun varsa çizgi yerine kısa bir not gösterilir.
(function(){
document.head.insertAdjacentHTML('beforeend',`<style id="erisilebilirlik">
.k.o,.tile.o{color:#2b1600}
.k.g{background:color-mix(in srgb,var(--g) 78%,#000)}
.sr-only{position:absolute!important;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}
@media (prefers-reduced-motion:reduce){
  .tile,.k{transition:background-color .18s ease-out,color .18s ease-out,border-color .18s ease-out!important}
}
#mStreak .yr .ynot{display:block;margin-top:8px;font-size:11.5px;line-height:1.35;color:var(--dim)}
</style>`);

// ---------- Ekran okuyucu ----------
const res=$('res');if(res){res.setAttribute('role','status');res.setAttribute('aria-live','polite')}
const duyuru=document.createElement('div');duyuru.className='sr-only';duyuru.setAttribute('aria-live','polite');duyuru.setAttribute('role','status');
document.body.appendChild(duyuru);
const ANLAM={g:'doğru yerde',o:'kelimede var, yeri yanlış',r:'kelimede yok'},ANLAM_EN={g:'correct spot',o:'in the word, wrong spot',r:'not in the word'};
let sonSay=0;
function oku(){
  if(typeof guesses==='undefined'||!Array.isArray(guesses))return;
  if(guesses.length<sonSay)sonSay=0;
  if(guesses.length===sonSay)return;
  sonSay=guesses.length;const g=guesses[guesses.length-1];if(!g||!g.w||!g.s)return;
  const en=document.documentElement.lang==='en',A=en?ANLAM_EN:ANLAM;
  duyuru.textContent=(en?'Guess ':'Tahmin ')+sonSay+': '+[...g.w].map((c,i)=>c+' '+(A[g.s[i]]||'')).join(', ');
}

// ---------- Seri geçmişi (yalnız bu cihaz) ----------
const ANAHTAR='ka_seri';
const gecmis=()=>{try{const v=JSON.parse(localStorage.getItem(ANAHTAR)||'[]');return Array.isArray(v)?v.filter(n=>Number.isFinite(n)):[]}catch(e){return []}};
let kayitli=null;
function seriKaydet(){
  if(typeof mode==='undefined'||mode!=='streak'||typeof run==='undefined'||!run)return;
  if(!run.dead){kayitli=null;return}
  if(kayitli===run)return;kayitli=run;
  try{const h=gecmis();h.push(+run.score||0);localStorage.setItem(ANAHTAR,JSON.stringify(h.slice(-8)))}catch(e){}
}
function seriCiz(){
  const e=$('mStreak');const r=e&&e.querySelector('.yr');if(!r)return;
  const sv=r.querySelector('svg'),h=gecmis();
  let n=r.querySelector('.ynot');
  if(h.length<2){
    if(sv)sv.style.display='none';
    if(!n){n=document.createElement('small');n.className='ynot';r.appendChild(n)}
    n.textContent='Birkaç Seri oyunu oyna, son skorların burada çizilsin.';return;
  }
  if(n)n.remove();
  if(!sv)return;sv.style.display='';
  const mx=Math.max(...h),mn=Math.min(...h),ar=Math.max(1,mx-mn);
  const d=h.map((v,i)=>(i?'L':'M')+(2+i*96/(h.length-1)).toFixed(1)+' '+(29-(v-mn)/ar*28).toFixed(1)).join(' ');
  const p=sv.querySelector('path');if(p)p.setAttribute('d',d);
  sv.setAttribute('role','img');sv.removeAttribute('aria-hidden');
  sv.setAttribute('aria-label','Son '+h.length+' Seri oyunu: '+h.join(', '));
}

if(typeof draw==='function'){const _d=draw;draw=function(){const r=_d.apply(this,arguments);try{oku();seriKaydet()}catch(e){}return r}}
if(typeof rHome==='function'){const _h=rHome;rHome=function(){const r=_h.apply(this,arguments);try{seriCiz()}catch(e){}return r}}
Object.assign(EN,{'Birkaç Seri oyunu oyna, son skorların burada çizilsin.':'Play a few Streak games to see your recent scores here.'});
})();
