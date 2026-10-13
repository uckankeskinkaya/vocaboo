// v40: Yavaş telefonlar için otomatik hafifletme. Canlı sahneli bir tema (ör. Synthwave) açıkken oyun ekranında kare hızı
// kısaca ölçülür; telefon yavaşsa (medyan kare süresi > 33 ms, yaklaşık 30 fps altı) animasyonlar kendiliğinden kapanır ve
// bu cihaz için hatırlanır. Sadece Ayarlar > Performans "Otomatik" iken çalışır; "Tam" seçen kullanıcının tercihine dokunulmaz.
// "Hafif" modda ayrıca parlama gölgeleri ve geçiş efektleri kapatılır (tuş/kare çizimi hızlanır).
(function(){
Object.assign(EN,{'Telefon yavaş çalışıyor, animasyonlar kapatıldı. Ayarlar > Performans bölümünden "Tam" seçebilirsin.':'Your phone is running slowly, animations were turned off. You can pick "Full" in Settings > Performance.'});
document.head.insertAdjacentHTML('beforeend',`<style>
:root[data-perf=low] :is(.tile,.k,.cd,.pl,.sc,.bi,.lvl,#def,.cfb,.mstat,.feat,.tt),:root[data-perf=low] :is(h1,h2,.greet h2,.feat b){box-shadow:none!important;text-shadow:none!important;transition:none!important}
:root[data-perf=low] .k:active{transform:none}
</style>`);
const SLOW='ka_slow';
const get=()=>{try{return localStorage.getItem(SLOW)==='1'}catch(e){return false}};
// "Otomatik" modda bu cihaz yavaş olarak işaretlendiyse hafif mod
{const _a=applyPerf;applyPerf=function(){_a.apply(this,arguments);if(PF()==='auto'&&get())document.documentElement.dataset.perf='low'}}
applyPerf();
// Kare süreleri (ms) yavaş mı? İlk kareler (açılış yükü) atılır, kalanın medyanına bakılır.
window.yavasMi=(d)=>{const x=d.slice(3).sort((a,b)=>a-b);if(x.length<20)return false;return x[Math.floor(x.length/2)]>33};
let sayac=0,olcuyor=false;
function olc(){
  const r=document.documentElement;
  if(olcuyor||sayac>=3||PF()!=='auto'||get()||r.dataset.perf==='low'||!r.dataset.scene||document.hidden)return;
  olcuyor=true;sayac++;
  const d=[];let son=0,bas=0;
  const f=t=>{
    if(document.hidden){olcuyor=false;return}            // arka plana alındıysa ölçüm geçersiz
    if(!bas)bas=t;if(son)d.push(t-son);son=t;
    if(t-bas<3000){requestAnimationFrame(f);return}
    olcuyor=false;
    if(window.yavasMi(d)&&PF()==='auto'){
      try{localStorage.setItem(SLOW,'1')}catch(e){}
      applyPerf();toast('Telefon yavaş çalışıyor, animasyonlar kapatıldı. Ayarlar > Performans bölümünden "Tam" seçebilirsin.');
    }
  };
  requestAnimationFrame(f);
}
// Oyun ekranı açılınca (sahneli tema) kısa süre sonra ölç
const g=$('game');
if(g)new MutationObserver(()=>{if(!g.hidden)setTimeout(olc,1500)}).observe(g,{attributes:true,attributeFilter:['hidden']});
})();
