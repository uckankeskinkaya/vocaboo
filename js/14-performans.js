
// v5: performans modu, klavye ve telefon düzeni
const PF=()=>{try{return localStorage.getItem('ka_perf')||'auto'}catch(e){return'auto'}};
function applyPerf(){const p=PF(),low=p==='low'||(p==='auto'&&((navigator.deviceMemory&&navigator.deviceMemory<=2)||(navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=2)));document.documentElement.dataset.perf=low?'low':''}
applyPerf();
Object.assign(EN,{'Performans':'Performance','Otomatik':'Auto','Hafif':'Light','Tam':'Full','Buz':'Ice','Limon':'Lemon','Mercan':'Coral','Gece':'Night','Zümrüt':'Emerald','Siber':'Cyber','Volkan':'Volcano','Şafak':'Dawn'});
document.head.insertAdjacentHTML('beforeend',`<style>
html,body{overscroll-behavior:none}body{touch-action:manipulation}
@supports (height:100dvh){html,body{height:100dvh}}
.pl,.sc,.bi,.lvl,#def,.vs-s,.cd{-webkit-backdrop-filter:none;backdrop-filter:none}
body::after{content:'';display:none;position:fixed;inset:0;pointer-events:none;opacity:0;background:radial-gradient(60% 45% at 10% 0%,var(--m2),transparent 70%),radial-gradient(50% 40% at 100% 8%,var(--m3),transparent 70%),radial-gradient(70% 50% at 50% 112%,var(--m1),transparent 70%)}
@keyframes xf{0%,100%{opacity:0}50%{opacity:1}}
:root[data-perf=low] .grid,:root[data-perf=low] .mstat,:root[data-perf=low] .cfb{-webkit-backdrop-filter:none;backdrop-filter:none;background:color-mix(in srgb,var(--panel) 60%,var(--bg))}
:root[data-perf=low] body::after{display:none!important;animation:none!important}
@media (prefers-reduced-motion:reduce){body::after{animation:none!important}}
#kb{gap:6px;padding:0 0 4px;width:100%;max-width:620px;align-self:center;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;touch-action:manipulation}
.kr{display:grid;grid-template-columns:repeat(20,1fr);gap:6px}
.kr .k{grid-column:span 2;max-width:none;width:auto;min-width:0;padding:0;height:clamp(46px,7.4vh,62px);font-size:clamp(15px,4.4vw,20px);border-radius:10px;transition:transform .06s,filter .06s}
.kr:nth-child(2) .k:first-child{grid-column:2/span 2}
.kr .k.w{grid-column:span 3;flex:none;font-size:clamp(10px,3vw,13px)}
.k:active{transform:scale(.93);filter:brightness(.9);box-shadow:none}
.k[data-k=ENTER]{background:var(--ac);color:var(--acf)}
@media (max-width:380px){#kb,.kr{gap:4px}}
@media (max-height:560px){.kr .k{height:38px;font-size:15px}}
@media (orientation:landscape) and (min-width:640px){.kr .k{height:clamp(38px,9vh,62px)}}
</style>`);
$('kb').addEventListener('pointerdown',e=>{if(e.button>0)return;const b=e.target.closest('.k');if(!b||b.disabled)return;e.preventDefault();press(b.dataset.k)});
const _as3=aSettings;aSettings=function(){
  _as3();const o=$('ob');if(!o)return;
  o.insertAdjacentHTML('beforebegin','<p>Performans</p><div class="seg"><button data-pf="auto">Otomatik</button><button data-pf="low">Hafif</button><button data-pf="full">Tam</button></div>');
  document.querySelectorAll('[data-pf]').forEach(b=>{b.classList.toggle('on',b.dataset.pf===PF());b.onclick=()=>{try{localStorage.setItem('ka_perf',b.dataset.pf)}catch(e){}applyPerf();aSettings()}});
};

// Alt menünün gerçek yüksekliği (iPhone alt çubuğu dahil) içeriğin altına boşluk olarak verilir; son kart menünün altında kalmasın
(function(){const f=()=>{const n=document.getElementById('nav');if(n&&n.offsetHeight>0)document.documentElement.style.setProperty('--navh',n.offsetHeight+'px')};
addEventListener('load',f);addEventListener('resize',f);addEventListener('orientationchange',()=>setTimeout(f,250));setTimeout(f,300);setTimeout(f,1500)})();
