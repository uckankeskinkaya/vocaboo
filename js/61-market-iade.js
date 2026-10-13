// v41: Market iadesi. Satın alınan tema ve çerçeve, satın alındıktan sonraki 2 saat içinde ödenen fiyatla iade edilebilir.
// Markette üstte "İade edilebilir" bölümü çıkar (kalan süre + geri gelecek 🪙). Sunucu shop_refund: ödenen fiyat bakiyeye döner,
// takılı çerçeve çıkarılır; iade edilen tema kullanımdaysa varsayılana dönülür. İade edilen eşya tekrar satın alınabilir.
(function(){
Object.assign(EN,{'↩ İade edilebilir':'↩ Refundable','2 saat içinde ödediğin fiyatın tamamı geri döner.':'Within 2 hours you get back the full price you paid.','İade et':'Refund','Vazgeç':'Cancel','Tema':'Theme','Çerçeve':'Frame',
  'İade edilemedi.':'Could not refund.','İade süresi doldu.':'The refund period has ended.','Bu eşya sende değil.':"You don't own this item.",'Ücretsiz eşya iade edilmez.':'Free items cannot be refunded.','İade edildi':'Refunded'});
RX.push([/^İade et: \+([\d.,]+) 🪙$/,'Refund: +$1 🪙'],[/^Kalan süre: (.+)$/,'Time left: $1'],[/^(.+) iade edilsin mi\? ([\d.,]+) 🪙 bakiyene geri döner\.$/,'Refund $1? $2 🪙 returns to your balance.'],[/^İade edildi: \+([\d.,]+) 🪙$/,'Refunded: +$1 🪙'],
  [/^(\d+) sa (\d+) dk$/,'$1 h $2 min'],[/^(\d+) dk$/,'$1 min']);
document.head.insertAdjacentHTML('beforeend',`<style>
.rfb{border:1px solid var(--line);border-radius:18px;background:var(--panel);padding:12px 14px;margin:0 0 12px}
.rfb h4{margin:0 0 2px;font-size:14px}.rfb p{margin:0 0 8px!important;font-size:12px!important}
.rfr{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 0;border-top:1px solid var(--line)}
.rfr:first-of-type{border-top:0}.rfr b{display:block;font-size:14px}.rfr small{color:var(--dim);font-size:11.5px}
.rfr button{flex:none;height:36px;padding:0 12px;border-radius:12px;border:1px solid var(--line);background:var(--panel);color:var(--fg);font-weight:700;font-size:12.5px}
</style>`);
let RF={};
const _so=shopOwned;shopOwned=async function(){const d=await _so.apply(this,arguments);RF=(d&&d.refund)||{};return d};
const nf=n=>(+n).toLocaleString('tr-TR');
const ad=id=>{const k=id.slice(id.indexOf(':')+1);return id.startsWith('frame:')?((FRM[k]||[])[0]||k):((TM[k]||[])[0]||k)};
const kalan=s=>{s=Math.max(60,+s||0);const h=Math.floor(s/3600),m=Math.floor(s%3600/60);return h?h+' sa '+m+' dk':Math.max(1,m)+' dk'};
const HT={yok:'Bu eşya sende değil.',sure:'İade süresi doldu.',ucretsiz:'Ücretsiz eşya iade edilmez.'};
function iadeBolumu(tab){
  const ids=Object.keys(RF);if(!ids.length)return;
  const b=document.querySelector('#online .bal');if(!b||$('rfb'))return;
  b.insertAdjacentHTML('afterend','<div class="rfb" id="rfb"><h4>↩ İade edilebilir</h4><p>2 saat içinde ödediğin fiyatın tamamı geri döner.</p>'
    +ids.map(id=>'<div class="rfr"><span><b>'+esc(ad(id))+'</b><small>'+(id.startsWith('frame:')?'Çerçeve':'Tema')+' · Kalan süre: '+kalan(RF[id].s)+'</small></span><button data-rf="'+esc(id)+'">İade et: +'+nf(RF[id].p)+' 🪙</button></div>').join('')+'</div>');
  $('rfb').querySelectorAll('[data-rf]').forEach(bt=>bt.onclick=()=>{
    const id=bt.dataset.rf,p=RF[id]&&RF[id].p;
    cfAsk(ad(id)+' iade edilsin mi? '+nf(p)+' 🪙 bakiyene geri döner.','İade et','Vazgeç',async()=>{
      bt.disabled=true;let r;try{r=await sb.rpc('shop_refund',{_id:id})}catch(e){r={error:e}}
      const d=r&&r.data;
      if(r.error||!d||!d.ok){toast(d&&HT[d.err]||'İade edilemedi.');aShop(tab);return}
      // kullanımdaki tema iade edildiyse varsayılana dön
      if(id.startsWith('theme:')&&document.documentElement.dataset.theme===id.slice(6)){try{thPrevEnd()}catch(e){}setTheme('light');try{thApply('light')}catch(e){}}
      toast('İade edildi: +'+nf(d.p)+' 🪙');
      try{await loadProf()}catch(e){}
      aShop(tab);
    });
  });
}
const _as=aShop;aShop=async function(tab){await _as.apply(this,arguments);iadeBolumu(tab||'f')};
})();
