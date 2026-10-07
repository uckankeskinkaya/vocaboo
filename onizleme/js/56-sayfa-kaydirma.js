// v36: iPhone Safari dikey ekranda kaydırma. Ana ekran / Online / Seviyeler iç içe bir kaydırma kutusundaydı
// (#home{overflow-y:auto}); iOS Safari dikeyde bu kutuyu kaydırmıyordu. Artık oyun ekranı dışında sayfanın kendisi kayar
// (normal web sayfası gibi). Oyun ekranı açıkken eski tam ekran düzen (sabit klavye) korunur.
(function(){
document.head.insertAdjacentHTML('beforeend',`<style>
:root:not(.oyunda),:root:not(.oyunda) body{height:auto!important;min-height:100%;overflow-y:visible}
:root:not(.oyunda) #app{height:auto;min-height:100%}
:root:not(.oyunda) #home,:root:not(.oyunda) #online,:root:not(.oyunda) #menu{flex:none;min-height:0;overflow:visible}
:root:not(.oyunda) header{top:env(safe-area-inset-top,0px);margin:0 -16px;padding:4px 16px;background:color-mix(in srgb,var(--bg) 82%,transparent);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px)}
:root.oyunda,:root.oyunda body{height:100%;overflow:hidden}
@supports (height:100dvh){:root.oyunda,:root.oyunda body{height:100dvh}}
</style>`);
const g=$('game'),ekr=['home','online','menu','game'].map($).filter(Boolean);
let son='';
function guncelle(){
  const oy=!!g&&!g.hidden;
  document.documentElement.classList.toggle('oyunda',oy);
  // başka bir ekrana geçince sayfanın başına dön
  const a=(ekr.find(e=>!e.hidden)||{}).id||'';
  if(a!==son){son=a;try{scrollTo(0,0)}catch(e){}}
}
const mo=new MutationObserver(guncelle);
ekr.forEach(e=>mo.observe(e,{attributes:true,attributeFilter:['hidden']}));
guncelle();
// Pazar, profil, ayarlar gibi panellere geçişte de başa dön (canlı oda yenilemeleri on() ile gelir, onlar kaydırmayı bozmaz)
const _pn=panel;panel=function(){const r=_pn.apply(this,arguments);try{scrollTo(0,0)}catch(e){}return r};
})();
