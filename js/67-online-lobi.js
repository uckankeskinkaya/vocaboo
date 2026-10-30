// v47: Online ekranları yeni arayüz diliyle (ana ekrandaki bento tarzı): emojiler yerine çizgi ikonlar, daha küçük kartlar.
// Online ana sayfa: Rastgele maç / Oda kur kutuları, oda kodu girişi. Oda kurma: kompakt mod kartları ve seçim düğmeleri.
// Lobi: oda kodu kartı (kopyalama düğmesiyle) + ayar çipleri; 1v1'de tek kartta "Sen VS Rakip"; grupta 2 sütun oyuncu ızgarası;
// Başlat ana düğme, Davet ve Çık yan yana. Mantık değişmez, yalnız görünüm (oLobby her çizildiğinde yeniden düzenlenir).
(function(){
if(typeof oLobby!=='function')return;
const SV=p=>'<svg viewBox="0 0 24 24" aria-hidden="true">'+p+'</svg>';
const IK={
  orm:SV('<path d="M4 4l9.5 9.5M14.5 4H20v5.5L10.5 19M7 14l3 3M4 20l3-3M20 20l-4.5-4.5"/>'),
  oc:SV('<path d="M4 10.5L12 4l8 6.5V20a1 1 0 01-1 1h-4.5v-6h-5v6H5a1 1 0 01-1-1z"/>'),
  orj:SV('<path d="M9 14L4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 010 11H11"/>'),
  c:SV('<path d="M5 21V4M5 4h12l-2.5 4L17 12H5"/>'),
  s:SV('<circle cx="12" cy="13.5" r="7.5"/><path d="M12 9.5v4l2.5 2M9.5 2.5h5"/>'),
  k:SV('<path d="M4 20h16M6 20v-6h4v6M10 20V9h4v11M14 20v-8h4v8"/>'),
  p2:SV('<circle cx="8" cy="8.5" r="3"/><circle cx="16" cy="8.5" r="3"/><path d="M2.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5M10.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5"/>'),
  p50:SV('<circle cx="12" cy="7.5" r="2.8"/><circle cx="5.5" cy="10" r="2.2"/><circle cx="18.5" cy="10" r="2.2"/><path d="M7 19.5c0-2.8 2.2-4.8 5-4.8s5 2 5 4.8M1.5 18.5c0-2 1.6-3.6 4-3.6M22.5 18.5c0-2-1.6-3.6-4-3.6"/>'),
  kop:SV('<rect x="8.5" y="8.5" width="11" height="11" rx="2.5"/><path d="M15.5 8.5V6a1.5 1.5 0 00-1.5-1.5H6A1.5 1.5 0 004.5 6v8A1.5 1.5 0 006 15.5h2.5"/>'),
  dav:SV('<path d="M15 8a3 3 0 10-2.8-4M4 12l16-7-7 16-2-7z"/>')
};
document.head.insertAdjacentHTML('beforeend',`<style id="online-lobi">
#online .yi{display:grid;place-items:center;width:34px;height:34px;border-radius:11px;background:color-mix(in srgb,var(--ac) 13%,transparent);color:var(--ac);flex:none;font-size:0;margin:0 0 4px}
#online .yi svg{width:19px;height:19px;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}
/* Online ana sayfa */
#online .ot{border-width:1px;border-radius:20px}
#online .ot.on{border-width:2px}
#online .otg .ot.big{min-height:0;padding:14px}
#online .otg .ot b{font-size:15px}
#online .ot.wide .yi{margin:0}
#online .ojc{border-radius:20px;padding:12px 14px}
#online .ojr input{font-size:20px;padding:9px;border-radius:14px}
#online .ojr button{border-radius:14px}
/* Oda kurma */
#online .os h3{margin:12px 0 6px;font-size:11.5px}
#online .otm .ot{min-height:0;padding:12px 6px 10px}
#online .otm .ot .yi{margin:0 auto 4px}
#online .otm .ot b{font-size:13.5px}
#online .otm .ot small{font-size:10.5px}
#online .och{gap:8px}
#online .och button{min-height:44px;padding:8px;border-radius:14px;border-width:1px;font-size:14px}
#online .och button.on{border-width:1px}
#online .och.lv{grid-template-columns:repeat(auto-fit,minmax(64px,1fr))}
#online .och.lv button:first-child{grid-column:auto}
#online .opp .ot{padding:10px 12px}
#online .opp .ot .yi{margin:0}
#online .osum{margin:12px 0 8px;border-radius:14px}
/* Lobi: oda kartı */
.yoda{display:flex;align-items:center;gap:12px;padding:14px 14px 14px 18px;border:1px solid var(--line);border-radius:22px;background:var(--panel);box-shadow:var(--sh);margin-bottom:10px}
.yoda>div{flex:1;min-width:0}
.yoda small{display:block;font-size:11.5px;font-weight:700;color:var(--dim);text-transform:uppercase;letter-spacing:.06em}
.yoda b{display:block;font-size:30px;font-weight:800;letter-spacing:.32em;line-height:1.2;font-variant-numeric:tabular-nums}
.yoda button{display:grid;place-items:center;width:44px;height:44px;border-radius:14px;border:0;background:color-mix(in srgb,var(--ac) 13%,transparent);color:var(--ac)}
.yoda button svg{width:21px;height:21px;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}
.yinf{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 12px}
.yinf span{padding:5px 11px;border-radius:999px;border:1px solid var(--line);background:var(--panel);font-size:12px;font-weight:700;color:var(--dim)}
/* 1v1: tek kart, ortada VS rozeti */
#online .vs,#vsw .vs{background:var(--panel);border:1px solid var(--line);border-radius:24px;box-shadow:var(--sh);padding:18px 8px 16px;gap:2px;margin:0 0 12px;align-items:stretch}
#online .vs-s{border:0;background:transparent;box-shadow:none;padding:4px;-webkit-backdrop-filter:none;backdrop-filter:none;justify-content:flex-start}
#online .vs-s>*:not(.vs-l){order:1}
#online .vs-s .vs-l{order:2;margin-top:6px;padding:2px 10px;border-radius:999px;background:color-mix(in srgb,var(--ac) 12%,transparent);color:var(--ac);font-weight:800;font-size:11px}
#online .vs-x{align-self:center;display:grid;place-items:center;width:44px;height:44px;flex:none;border-radius:50%;background:var(--ac);color:var(--acf);font-size:15px;box-shadow:0 6px 16px color-mix(in srgb,var(--ac) 35%,transparent)}
/* Grup: iki sütun oyuncu ızgarası */
.ylh{display:flex;justify-content:space-between;align-items:baseline;margin:2px 2px 8px;font-size:12px;font-weight:700;color:var(--dim);text-transform:uppercase;letter-spacing:.06em}
.ylist{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:8px;margin-bottom:12px}
.ylist .pr{grid-template-columns:52px minmax(0,1fr)!important;gap:8px;padding:8px 10px!important;margin:0!important;border-radius:16px}
.ylist .pr .pr-a{width:52px;height:46px;display:grid;place-items:center;overflow:visible}
.ylist .pr .pr-a>*{transform:scale(.74);transform-origin:center;margin:0!important}
.ylist .pr .pr-u b{font-size:13.5px}
.ylist .pr .pr-t{font-size:10.5px}
.ylist .pr .pr-tag{display:block;margin:0;font-size:10.5px}
/* Düğmeler: Başlat ana, Davet + Çık yan yana */
#online #go{background:var(--ac)!important;color:var(--acf)!important;border-color:var(--ac)!important;font-weight:800}
.ybt{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.ybt>*{margin:0!important}
#online #osh{display:flex;align-items:center;justify-content:center;gap:8px}
#online #osh svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}
</style>`);
const ik=(el,k)=>{if(!el)return;const i=el.querySelector(':scope>i');if(!i||i.classList.contains('yi'))return;i.className='yi';i.innerHTML=IK[k]};
// Online ana sayfa ve oda kurma: emojiler yerine ikon (ekran her çizildiğinde)
function ikonlar(){
  const o=$('online');if(!o||o.hidden)return;
  ik($('orm'),'orm');ik($('oc'),'oc');ik($('orj'),'orj');
  o.querySelectorAll('[data-mode]').forEach(b=>ik(b,b.dataset.mode));
  o.querySelectorAll('[data-ppl]').forEach(b=>ik(b,b.dataset.ppl==='2'?'p2':'p50'));
}
new MutationObserver(ikonlar).observe($('online'),{childList:true});
// Lobi düzeni
const _ol=oLobby;
oLobby=function(){
  const r=_ol.apply(this,arguments);
  try{duzenle()}catch(e){}
  return r;
};
function duzenle(){
  const o=$('online');if(!o||o.hidden)return;
  const ps=[...o.children];
  const h=ps.find(e=>e.tagName==='H1');if(!h||o.querySelector('.yoda'))return;
  const ust=h.previousElementSibling,alt=h.nextElementSibling;
  const kod=h.textContent.trim();
  const kart=document.createElement('div');kart.className='yoda';
  kart.innerHTML='<div><small>Oda kodu</small><b>'+esc(kod)+'</b></div><button id="ykop" aria-label="Kodu kopyala" title="Kodu kopyala">'+IK.kop+'</button>';
  h.replaceWith(kart);
  if(ust&&ust.tagName==='P'&&/Oda kodu|Room code/.test(ust.textContent))ust.remove();
  if(alt&&alt.tagName==='P'){
    const inf=document.createElement('div');inf.className='yinf';
    inf.innerHTML=alt.textContent.split(', ').filter(Boolean).map(x=>'<span>'+esc(x)+'</span>').join('');
    alt.replaceWith(inf);
  }
  $('ykop').onclick=async()=>{try{await navigator.clipboard.writeText(kod);toast('Oda kodu kopyalandı')}catch(e){toast('Kopyalanamadı')}};
  // Grup oyuncuları: iki sütun
  const rows=[...o.children].filter(e=>e.classList&&e.classList.contains('pr'));
  if(rows.length){
    const l=document.createElement('div');l.className='ylist';
    rows[0].before(l);
    const bas=document.createElement('div');bas.className='ylh';bas.innerHTML='<span>Oyuncular</span><span>'+rows.length+'</span>';
    l.before(bas);
    rows.forEach(x=>l.appendChild(x));
  }
  // Düğmeler
  const sh=$('osh'),ob=$('ob');
  if(sh&&!sh.querySelector('svg')){sh.setAttribute('aria-label','Odaya davet et');sh.innerHTML=IK.dav+'<span>Davet et</span>'}
  if(sh&&ob&&sh.parentElement===o&&ob.parentElement===o){
    const w=document.createElement('div');w.className='ybt';
    sh.before(w);w.appendChild(sh);w.appendChild(ob);
  }
}
Object.assign(EN,{'Oda kodu kopyalandı':'Room code copied','Kopyalanamadı':'Could not copy','Kodu kopyala':'Copy code','Oyuncular':'Players','Davet et':'Invite'});
})();
