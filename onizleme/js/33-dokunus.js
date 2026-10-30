// v21: Dokunuş hissi: tuşlarda ve menülerde basış animasyonu, ekran geçişinde yumuşak giriş, dokunmatik cihazlarda hafif titreşim.
(function(){
document.head.insertAdjacentHTML('beforeend',`<style id="dokunus">
button,.cd,.lvl,.ot,.tt,.ft,.k,#nav button,.seg button,.och button,.chip,#fbtn,#passbtn,.pl.tap{transition:transform .14s cubic-bezier(.2,.9,.25,1.2),box-shadow .14s,background-color .18s,border-color .18s,filter .14s,color .18s;-webkit-tap-highlight-color:transparent}
button:not(:disabled):active,.cd:active,.lvl:active,.ot:active,.tt:active,.ft:active,.och button:active,.seg button:active{transform:scale(.955);filter:brightness(.95)}
.k:not(:disabled):active{transform:translateY(3px) scale(.92);filter:brightness(.88);box-shadow:none}
#nav button:not(:disabled):active{transform:scale(.88)}
.feat:active{transform:scale(.975)}
/* seçilince küçük bir "tık" zıplaması */
.och button.on,.ot.on,.seg button.on{animation:dk-pop .26s cubic-bezier(.2,.9,.25,1.4)}
@keyframes dk-pop{0%{transform:scale(.94)}60%{transform:scale(1.04)}100%{transform:scale(1)}}
/* ekran değişince içerik yukarı süzülerek gelir */
#online.dk-ent,#home.dk-ent{animation:dk-ent .3s cubic-bezier(.2,.8,.2,1)}
@keyframes dk-ent{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
#tpv{animation:dk-up .26s cubic-bezier(.2,.9,.25,1.1)}
@keyframes dk-up{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
#gbonus{animation:dk-ent .35s cubic-bezier(.2,.8,.2,1)}
#toast,.toast{animation:dk-toast .26s cubic-bezier(.2,.9,.25,1.1)}
@keyframes dk-toast{from{opacity:0;transform:translate(-50%,20px)}to{opacity:1;transform:translateX(-50%)}}
:root[data-perf=low] .och button.on,:root[data-perf=low] .ot.on,:root[data-perf=low] .seg button.on,:root[data-perf=low] #online.dk-ent,:root[data-perf=low] #home.dk-ent{animation:none}
:root[data-perf=low] button,:root[data-perf=low] .cd,:root[data-perf=low] .k{transition-duration:.06s}
@media (prefers-reduced-motion:reduce){
 button:not(:disabled):active,.cd:active,.lvl:active,.ot:active,.tt:active,.ft:active,.och button:active,.seg button:active,.k:not(:disabled):active,#nav button:not(:disabled):active,.feat:active{transform:none}
 .och button.on,.ot.on,.seg button.on,#online.dk-ent,#home.dk-ent,#tpv,#gbonus,#toast,.toast{animation:none}
}
</style>`);
// Ekran içeriği değişince (ilk 30 karakter farklıysa) giriş animasyonu; aynı ekranın yeniden çizilmesi (seçim değişimi) animasyonsuz
let imza='';
const _on=on;on=function(h){_on(h);const k=String(h).slice(0,30);if(k!==imza){imza=k;const e=$('online');e.classList.remove('dk-ent');void e.offsetWidth;e.classList.add('dk-ent')}};
const _rh=rHome;let ilk=true;rHome=function(){_rh();if(ilk){ilk=false;return}const e=$('home');if(e&&!e.hidden&&!e._dk){e._dk=1;e.classList.remove('dk-ent');void e.offsetWidth;e.classList.add('dk-ent');setTimeout(()=>{e._dk=0},400)}};
// Hafif titreşim (dokunmatik cihazlarda, desteklenirse)
try{
  if(navigator.vibrate&&window.matchMedia&&matchMedia('(pointer:coarse)').matches){
    document.addEventListener('pointerdown',e=>{
      const b=e.target.closest&&e.target.closest('button:not(:disabled),.cd,.ot,.k');
      if(b&&!(window.matchMedia('(prefers-reduced-motion:reduce)').matches)&&(typeof VI!=='function'||VI()))navigator.vibrate(b.classList.contains('k')?4:7);
    },{passive:true});
  }
}catch(e){}
})();
