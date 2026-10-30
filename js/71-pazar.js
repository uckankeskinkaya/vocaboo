// v51: Pazar yeni arayüz diliyle: bakiye kartı, tek seçici sekmeler, fiyat hapları (alabileceğin fiyatlar vurgulu, alamadıkların soluk),
// "Sahipsin" rozeti, daha sıkı kart ızgarası, iade bölümü aynı kart dilinde. Satın alma / önizleme / iade işlevleri aynı.
(function(){
if(typeof aShop!=='function')return;
const SV=p=>'<svg viewBox="0 0 24 24" aria-hidden="true">'+p+'</svg>';
const CUZDAN=SV('<path d="M4 7.5A2.5 2.5 0 016.5 5H18v3"/><rect x="3.5" y="7.5" width="17" height="12" rx="2.5"/><path d="M16 13.5h2"/>');
const TIK=SV('<path d="M5 12.5l4.5 4.5L19 7.5"/>');
document.head.insertAdjacentHTML('beforeend',`<style id="pazar-yeni">
#online .ybal{display:flex;align-items:center;gap:12px;padding:14px 16px;border:1px solid var(--line);border-radius:22px;background:var(--panel);box-shadow:var(--sh);margin-bottom:10px;text-align:left}
#online .ybal .yi{display:grid;place-items:center;width:42px;height:42px;border-radius:14px;background:color-mix(in srgb,var(--ac) 13%,transparent);color:var(--ac);flex:none}
#online .ybal .yi svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}
#online .ybal small{display:block;font-size:11px;font-weight:700;color:var(--dim);text-transform:uppercase;letter-spacing:.06em}
#online .ybal b{display:block;font-size:24px;font-weight:800;letter-spacing:-.3px;font-variant-numeric:tabular-nums}
#online .seg.sm.yps{display:grid!important;grid-template-columns:1fr 1fr;gap:4px;padding:4px;border-radius:16px;margin-bottom:10px}
#online .seg.sm.yps button{min-height:38px;border-radius:12px;font-size:14px}
/* Çerçeve ızgarası */
#online .fg{gap:8px!important}
#online .fg .ft{padding:10px 6px 10px!important;border-radius:20px!important;border-width:1px!important;gap:4px!important}
#online .fg .ft b{font-size:12.5px!important;line-height:1.2;min-height:2.4em;display:flex;align-items:center;justify-content:center;text-align:center}
#online .fg .ft.cur{border-width:2px!important}
/* Fiyat hapı */
#online .ypr{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:999px;font-size:11.5px!important;font-weight:800;font-variant-numeric:tabular-nums;background:color-mix(in srgb,var(--dim) 14%,transparent);color:var(--dim);opacity:1!important;white-space:nowrap}
#online .ypr.ok{background:color-mix(in srgb,var(--ac) 14%,transparent);color:var(--ac)}
#online .ypr.own{background:var(--g);color:#fff}
#online .ypr svg{width:12px;height:12px;fill:none;stroke:currentColor;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
/* Tema kartları */
#online .tg{gap:8px!important}
#online .tg .tt{border-radius:20px!important}
#online .tg .tt span em{display:none}
#online .tg .tt small.ypr{display:inline-flex!important;align-self:flex-start;width:auto;margin:0 0 12px 12px;padding:3px 9px!important;font-size:11.5px!important}
#online .tg .tt small.ypr:not(.own){background:color-mix(in srgb,var(--f) 10%,transparent);color:color-mix(in srgb,var(--f) 60%,transparent)}
#online .tg .tt small.ypr.ok{background:color-mix(in srgb,var(--a) 18%,transparent);color:var(--a)}
#online .ycap{font-size:11px!important;text-align:center;color:var(--dim);background:none!important;margin:10px 0 0!important}
#online .yhid{display:none!important}
/* İade */
#online .rfb{border-radius:20px!important;box-shadow:var(--sh)}
#online .rfb h4{font-size:13px!important}
#online .rfr button{background:color-mix(in srgb,var(--ac) 13%,transparent)!important;color:var(--ac)!important;border-color:transparent!important}
</style>`);
function fiyat(sm){
  if(!sm||sm.classList.contains('ypr'))return;
  const t=sm.textContent.trim();
  sm.classList.add('ypr');
  if(/^(Sahipsin|Owned)/.test(t)){sm.classList.add('own');sm.innerHTML=TIK+esc(t);return}
  const ok=/✓/.test(t);if(ok)sm.classList.add('ok');
  sm.textContent=t.replace(/\s*✓\s*$/,'');
}
function duzenle(){
  const o=$('online');if(!o||o.hidden)return;
  const bal=o.querySelector(':scope>.bal');
  if(bal&&!bal.classList.contains('ybal')){
    const m=/([\d.,]+)/.exec(bal.textContent),v=m?m[1]:'0';
    bal.classList.add('ybal');bal.innerHTML='<span class="yi">'+CUZDAN+'</span><div><small>Bakiye</small><b>🪙 '+esc(v)+'</b></div>';
  }
  const sf=$('sf');if(sf&&sf.parentElement)sf.parentElement.classList.add('yps');
  o.querySelectorAll('.fg .ft small,.tg .tt small').forEach(fiyat);
  o.querySelectorAll(':scope>p.cap').forEach(p=>{
    if(/Alabilirsin|can afford/.test(p.textContent))p.classList.add('yhid');
    else if(/hayran yapımı|fan-made/i.test(p.textContent))p.classList.add('ycap');
  });
}
const _a=aShop;
aShop=async function(){const r=await _a.apply(this,arguments);try{duzenle()}catch(e){}return r};
Object.assign(EN,{'Bakiye':'Balance'});
})();
