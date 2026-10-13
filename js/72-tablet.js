// v52: Tablet ve geniş ekran (yatay) düzeni yeni arayüzle. Ana ekran 4 sütunlu bento: solda Günün kelimesi, bonus/görevler,
// istatistik şeridi; sağda modlar. Oyun ekranında sol sütun tanım + harf kutuları (kutular ekranı doldurur), sağ sütun klavye.
// Diğer paneller ortada 680px. Dikey tablette telefon düzeni geniş haliyle kalır (içerik ortalı, en fazla 760px).
(function(){
document.head.insertAdjacentHTML('beforeend',`<style id="tablet">
@media (min-width:700px) and (orientation:portrait){
  #home:not([hidden]),#online,#menu{max-width:760px;width:100%;margin-left:auto!important;margin-right:auto!important}
}
@media (orientation:landscape) and (min-width:640px){
  #home:not([hidden]){grid-template-columns:repeat(4,minmax(0,1fr))!important;grid-template-areas:"g g g g" "d d m m" "b q m m" "s s m m" "x x m m"!important;grid-template-rows:auto auto auto auto 1fr!important;column-gap:16px!important;row-gap:12px!important}
  #home>*{order:0!important}
  #home>.greet{grid-area:g!important}
  #home>#mDaily{grid-area:d!important}
  #home>#gbonus{grid-area:b!important}
  #home>#mQuest{grid-area:q!important}
  #home:not(:has(>#gbonus:not([hidden])))>#mQuest{grid-area:b / b / b / q!important;grid-column:1/3!important}
  #home:not(:has(>#mQuest:not([hidden])))>#gbonus{grid-column:1/3!important}
  #home>#mst{grid-area:s!important;align-self:start}
  #home>.grid{grid-area:m!important;align-self:start;grid-auto-rows:auto!important}
  #home .grid .cd{min-height:0!important}
  #online,#menu{max-width:680px!important}
  /* Oyun: sol tanım + kutular, sağ klavye; oyun alanı ekran yüksekliğini kullanır */
  :root.oyunda #app{height:100dvh;display:flex;flex-direction:column}
  :root.oyunda #game:not([hidden]){flex:1;min-height:0;grid-template-rows:auto auto auto auto minmax(0,1fr)!important;grid-template-areas:"top top" "live live" "def def" "hint hint" "grid kb"!important;column-gap:28px!important}
  #game #gridwrap{min-height:0;align-self:stretch}
  #game #kb{align-self:center!important}
  #game #res{grid-area:kb;align-self:end}
  #game #defrow{max-width:900px;width:100%;justify-self:center}
}
</style>`);
// Ekran dönünce / büyüklük değişince kutuları yeniden boyutlandır
let zt=null;
const yeniden=()=>{requestAnimationFrame(()=>requestAnimationFrame(()=>{try{if(!$('game').hidden&&typeof draw==='function')draw()}catch(e){}}))};
// Oyun ekranı açılınca (düzen oturduktan sonra) bir kez daha boyutlandır
new MutationObserver(()=>{if(!$('game').hidden)yeniden()}).observe($('game'),{attributes:true,attributeFilter:['hidden']});
addEventListener('resize',()=>{clearTimeout(zt);zt=setTimeout(()=>{try{if(!$('game').hidden&&typeof draw==='function')draw()}catch(e){}},120)});
})();
