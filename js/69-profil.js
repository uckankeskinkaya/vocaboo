// v49: Profil ekranı yeni arayüz diliyle. Üst kart yatay (avatar solda; ad, unvan, XP çubuğu sağda),
// istatistikler ikonlu kompakt kutucuklar, rozet şeridine dokununca tüm rozetler açılır,
// sık kullanılanlar (Görevler, Başarılar, İstatistikler, Kelime defteri) 2x2 bento kutularda; geri kalanı "Ayarlar ve hesap" menüsünde.
// Düğmelerin kendi işlevleri aynen kullanılır (49-profil-menu'nün sakladığı PMD düğmelerine tıklanır).
(function(){
if(typeof aProfile!=='function')return;
const SV=p=>'<svg viewBox="0 0 24 24" aria-hidden="true">'+p+'</svg>';
const IK={
  'Doğruluk':SV('<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>'),
  'Çözülen kelime':SV('<path d="M4 5.5A2.5 2.5 0 016.5 3H20v15H6.5A2.5 2.5 0 004 20.5zM4 20.5A2.5 2.5 0 016.5 18H20v3H6.5A2.5 2.5 0 014 20.5z"/><path d="M9 9.5l2 2 4-4"/>'),
  'Toplam puan':SV('<path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z"/>'),
  'Seri rekoru':SV('<path d="M13 2L4.5 13.5H11L10 22l8.5-11.5H12L13 2z"/>'),
  'En uzun seri':SV('<path d="M4 19h16M7 19V11M12 19V6M17 19v-5"/>'),
  'Günlük seri':SV('<path d="M12 21.5c-4 0-7-2.8-7-6.6 0-3.1 2-5.1 3.6-6.9.4 1.6 1.3 2.7 2.4 3.2-.2-3.3 1.1-6.3 3.9-8.7.3 3 1.7 4.6 3 6.2 1.4 1.7 2.1 3.4 2.1 5.9 0 3.9-3 6.9-8 6.9z"/>')
};
const KISA=[
  ['qab','Başarılar','Kazandıkların',SV('<circle cx="12" cy="9" r="5.5"/><path d="M8.5 13.5L7 21l5-2.5 5 2.5-1.5-7.5"/>')],
  ['stb','İstatistikler','Detaylı oyun',SV('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>')],
  ['nb','Kelime defteri','Kaydettiklerin',SV('<path d="M6 3h11a2 2 0 012 2v16l-7.5-4L4 21V5a2 2 0 012-2z"/>')]
];
const AYAR=SV('<path d="M4 8h10M18 8h2M4 16h2M10 16h10"/><circle cx="16" cy="8" r="2"/><circle cx="8" cy="16" r="2"/>');
const HOCA=SV('<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2.5 9 2.5 12 0v-5M22 9v6"/>');
document.head.insertAdjacentHTML('beforeend',`<style id="profil-yeni">
/* Üst kart: yatay */
#online>.pf-h{display:grid!important;grid-template-columns:auto minmax(0,1fr);grid-template-rows:auto auto auto auto;column-gap:16px;row-gap:3px;align-items:center;text-align:left!important;padding:16px!important;border-radius:24px!important;margin-bottom:10px!important}
#online>.pf-h>.pfav{grid-row:1/5;align-self:center}
#online>.pf-h>.pfnm{justify-content:flex-start!important;margin:0!important}
#online>.pf-h>.pfnm h2{font-size:22px!important;margin:0!important}
#online>.pf-h>.chip{justify-self:start;margin:0!important;font-size:12px!important;padding:3px 10px!important}
#online>.pf-h>.pbar{width:100%!important;margin:6px 0 2px!important;height:6px}
#online>.pf-h>small{font-size:11.5px!important;line-height:1.35;margin:0!important;color:var(--dim)}
#online>.pf-h>small:last-of-type{grid-column:2}
#online>.pf-h>small+small{grid-column:1/-1;text-align:center;margin-top:6px!important;padding-top:8px!important;border-top:1px solid var(--line)}
/* İstatistikler */
#online>.sg3{gap:8px!important;margin-bottom:10px!important}
#online>.sg3 .st{display:grid!important;grid-template-columns:auto minmax(0,1fr);grid-template-rows:auto auto;column-gap:8px;row-gap:4px;align-items:center;text-align:left!important;padding:9px 10px!important;border-radius:16px!important;background:color-mix(in srgb,var(--panel) 70%,transparent)!important;-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px)}
#online>.sg3 .st .yi{grid-row:1;display:grid;place-items:center;width:28px;height:28px;border-radius:9px;background:color-mix(in srgb,var(--ac) 13%,transparent);color:var(--ac)}
#online>.sg3 .st .yi svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}
#online>.sg3 .st b{font-size:15px!important;line-height:1.1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#online>.sg3 .st span:not(.yi){grid-column:1/-1;font-size:10.5px!important;line-height:1.2}
/* Rozetler */
#online>.bdr{border-radius:18px!important;cursor:pointer;margin-bottom:10px!important}
#online>.bdr::after{content:'›';margin-left:6px;color:var(--dim);font-size:20px}
/* Kısa yollar */
.ypk{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:8px;margin-bottom:10px}
.ypk button{display:grid;grid-template-columns:auto minmax(0,1fr);grid-template-rows:auto auto;column-gap:9px;row-gap:1px;align-items:center;padding:11px 12px;border:1px solid var(--line);border-radius:18px;background:color-mix(in srgb,var(--panel) 70%,transparent);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);box-shadow:var(--sh);text-align:left;color:var(--fg)}
.ypk .yi,#online .pmb .yi{grid-row:1/3;display:grid;place-items:center;width:32px;height:32px;border-radius:10px;background:color-mix(in srgb,var(--ac) 13%,transparent);color:var(--ac)}
.ypk .yi svg,#online .pmb .yi svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}
.ypk b{font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ypk small{font-size:11px;color:var(--dim);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ypk em{position:absolute;top:6px;right:8px;font-style:normal}
.ypk button{position:relative}
#online .pmb{border-radius:18px!important;padding:11px 12px!important;margin-top:0!important;margin-bottom:8px}
#online .pmb>span.yi{font-size:0}
:root[data-perf=low] #online>.sg3 .st,:root[data-perf=low] .ypk button{-webkit-backdrop-filter:none;backdrop-filter:none;background:var(--panel)}
</style>`);
function duzenle(){
  const o=$('online');if(!o||!o.querySelector(':scope>.pf-h'))return;
  // İstatistik ikonları (ve eksik değer için 0)
  o.querySelectorAll(':scope>.sg3 .st').forEach(t=>{
    const b=t.querySelector('b'),s=t.querySelector('span');if(!b||!s||t.querySelector('.yi'))return;
    if(/^(undefined|null|NaN)$/.test(b.textContent))b.textContent='0';
    const k=IK[s.textContent.trim()];if(!k)return;
    const i=document.createElement('span');i.className='yi';i.innerHTML=k;t.prepend(i);
  });
  // Rozetler: dokununca tüm rozetler
  const bd=o.querySelector(':scope>.bdr');
  if(bd&&typeof PMD!=='undefined'&&PMD&&PMD.bb)bd.onclick=()=>PMD.bb.click();
  // Kısa yollar
  const m=$('pmb');if(!m||o.querySelector('.ypk'))return;
  const var_=KISA.filter(k=>typeof PMD!=='undefined'&&PMD&&PMD[k[0]]);
  if(var_.length){
    const g=document.createElement('div');g.className='ypk';
    g.innerHTML=var_.map(k=>'<button data-yk="'+k[0]+'"><span class="yi">'+k[3]+'</span><b>'+k[1]+'</b><small>'+k[2]+'</small>'+(PMD[k[0]].querySelector('.qd:not([hidden]),.dot,.bdg')?'<em>🔴</em>':'')+'</button>').join('');
    g.insertAdjacentHTML('beforeend','<button data-ya="1"><span class="yi">'+AYAR+'</span><b>Ayarlar</b><small>Avatar, şifre…</small></button>');
    const ilk=$('hcb')||m;ilk.before(g);
    g.querySelectorAll('[data-yk]').forEach(b=>b.onclick=()=>{const x=PMD[b.dataset.yk];if(x)x.click()});
    g.querySelector('[data-ya]').onclick=()=>m.click();
    m.hidden=true;
  }
  const ic=m.querySelector(':scope>span');if(ic){ic.className='yi';ic.innerHTML=AYAR}
  const d=m.querySelector(':scope>div');if(d&&d.firstChild&&d.firstChild.nodeType===3)d.firstChild.textContent='Ayarlar ve hesap';
  const sm=m.querySelector('small');if(sm)sm.textContent='Avatar, şifre, oturum…';
  const h=$('hcb');if(h){const hi=h.querySelector(':scope>span');if(hi){hi.className='yi';hi.innerHTML=HOCA}}
}
const _p=aProfile;
aProfile=function(){const r=_p.apply(this,arguments);try{duzenle()}catch(e){}return r};
Object.assign(EN,{'Görevler':'Quests','Günlük ödüller':'Daily rewards','Başarılar':'Achievements','Kazandıkların':'Earned','İstatistikler':'Statistics','Detaylı oyun':'Detailed stats',
  'Kelime defteri':'Word book','Kaydettiklerin':'Saved words','Ayarlar':'Settings','Avatar, şifre…':'Avatar, password…','Ayarlar ve hesap':'Settings & account','Avatar, şifre, oturum…':'Avatar, password, session…'});
})();
