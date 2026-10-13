// v45: Yeni arayüz (Canva "B" taslağı: sade, bento ızgara). Telefonda (900px altı) ana ekran bento düzenine geçer:
// selamlama, büyük "Günün kelimesi" kartı, yan yana bonus + görevler, istatistik şeridi (XP çubuğuyla), modlar bento kutularında
// (Seri Modu uzun kutu + rekor, Alıştırma, Online, Skor tablosunda sınıfın ilk 3'ü). Emojiler yerine ince çizgi ikonlar.
// Alt menüden Sıralama kalktı (Skor tablosu ana ekranda). Oyun ekranında logo gizli; klavye düzeni aynı (Sil solda, Gönder sağda).
// Yalnız düzen ve renk değişkenleri (var(--ac), var(--panel)...) kullanılır: bütün temalar bu düzenin üstüne giyilir.
(function(){
const SV=p=>'<svg viewBox="0 0 24 24" aria-hidden="true">'+p+'</svg>';
const IK={
  mStreak:SV('<path d="M13 2L4.5 13.5H11L10 22l8.5-11.5H12L13 2z"/>'),
  mPractice:SV('<path d="M4 5.5A2.5 2.5 0 016.5 3H20v15H6.5A2.5 2.5 0 004 20.5z"/><path d="M4 20.5A2.5 2.5 0 016.5 18H20v3H6.5A2.5 2.5 0 014 20.5zM8 7h8M8 10.5h6"/>'),
  mOnline:SV('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.7 2.6 15.3 0 18M12 3c-2.6 2.7-2.6 15.3 0 18"/>'),
  mLb:SV('<path d="M8 4h8v5a4 4 0 01-8 0zM8 6H5a3 3 0 003 4M16 6h3a3 3 0 01-3 4M12 13v4M8.5 20h7M10 17h4v3h-4z"/>'),
  gi:SV('<rect x="3.5" y="8" width="17" height="4" rx="1"/><path d="M5 12v8h14v-8M12 8v12M12 8c-1.5-3-5-3.5-5-1.2C7 8 9.5 8 12 8zm0 0c1.5-3 5-3.5 5-1.2C17 8 14.5 8 12 8z"/>'),
  qi:SV('<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>')
};
document.head.insertAdjacentHTML('beforeend',`<style id="yeni-arayuz">
@media all{
#home:not([hidden]){display:grid!important;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:10px;align-content:start}
#home>*{grid-column:1/-1;min-width:0;order:9}
#home>.greet{order:0}#home>#mDaily{order:1}#home>#gbonus{order:2;grid-column:1}#home>#mQuest{order:3;grid-column:2}#home>#mst{order:4}#home>.grid{order:5}
#home:not(:has(>#gbonus:not([hidden])))>#mQuest,#home:not(:has(>#mQuest:not([hidden])))>#gbonus{grid-column:1/-1}
#home>.rules,#home>.dock{display:none!important}
#home .greet h2{font-size:23px!important;margin:2px 0 0!important}
#home .greet p{font-size:13px!important}
/* Günün kelimesi */
#mDaily.feat{display:grid!important;grid-template-columns:minmax(0,1fr) auto;align-items:end;column-gap:10px;row-gap:1px;padding:14px 16px!important;border-radius:22px!important}
#mDaily.feat>.tag,#mDaily.feat>b,#mDaily.feat>small,#mDaily.feat>.dst{grid-column:1/-1}
#mDaily .tag{font-size:11px!important;margin:0 0 2px!important}
#mDaily>b{font-size:17px!important}
#mDaily>small{font-size:12px!important}
#mDaily .yh{display:flex;gap:4px;margin-top:10px}
#mDaily .yh i{width:22px;height:26px;border-radius:7px;background:color-mix(in srgb,var(--acf) 18%,transparent);border:1.5px solid color-mix(in srgb,var(--acf) 45%,transparent)}
#mDaily .go{margin-top:10px!important;align-self:end;padding:7px 18px!important;font-size:13px!important}
/* Bonus ve görevler: ince yan yana satırlar */
#home>#gbonus,#home>#mQuest{display:grid!important;grid-template-columns:auto minmax(0,1fr);grid-template-rows:auto auto;align-items:center;column-gap:9px;row-gap:1px;padding:10px 12px!important;border-radius:18px!important;text-align:left;margin:0!important;min-height:0}
#home>#gbonus>.yi,#home>#mQuest>.yi{grid-row:1/3}
#gbonus>div,#mQuest>span:not(.qi):not(.qd){display:contents}
#gbonus b,#mQuest b{font-size:13px!important;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#gbonus>div>small{display:none!important}
#mQuest small{font-size:11px!important;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--dim)}
#gbonus .gp{font-size:11px!important;font-weight:800;margin:0!important;grid-column:2;line-height:1.25}
#home>#mQuest{position:relative}
#mQuest .qd:not([hidden]){position:absolute;top:6px;right:8px;margin:0!important;font-size:10.5px}
/* İkonlar */
#home .yi{display:grid!important;place-items:center;width:30px!important;height:30px!important;border-radius:10px!important;background:color-mix(in srgb,var(--ac) 13%,transparent)!important;color:var(--ac);font-size:0!important;flex:none;margin:0!important;padding:0!important}
#home .yi svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}
/* İstatistik şeridi + XP */
#home>#mst{border-radius:18px!important;padding:8px 4px 9px!important;flex-wrap:wrap}
#mst>div:not(.yx) b{font-size:17px!important}
#mst>div:not(.yx) span{font-size:10.5px!important}
#mst .yx{flex:0 0 calc(100% - 28px)!important;margin:6px 14px 0;text-align:left!important}
#mst .yx small{display:flex;justify-content:space-between;font-size:10px;color:var(--dim);font-weight:700;margin-bottom:3px}
#mst .yx u{display:block;height:4px;border-radius:9px;background:color-mix(in srgb,var(--ac) 14%,transparent);overflow:hidden;text-decoration:none}
#mst .yx u i{display:block;height:100%;border-radius:9px;background:var(--ac)}
/* Modlar */
#home .grid{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:10px!important;border:0!important;background:none!important;overflow:visible!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important;border-radius:0!important;box-shadow:none!important;padding:0!important}
#home .grid .cd{padding:10px 12px!important;border:1px solid var(--line)!important;border-radius:18px!important;background:var(--panel)!important;box-shadow:var(--sh)!important;min-height:0!important;text-align:left;margin:0!important}
#home .grid .cd::after{display:none!important}
#home .grid .cd b{font-size:13.5px!important;line-height:1.2}
#home .grid .cd small{font-size:11px!important;line-height:1.25;color:var(--dim)}
#home #mPractice,#home #mOnline{display:grid!important;grid-template-columns:auto minmax(0,1fr);grid-template-rows:auto auto;align-items:center;column-gap:9px;row-gap:1px}
#home #mPractice .yi,#home #mOnline .yi{grid-row:1/3}
#home #mPractice small,#home #mOnline small{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#home #mStreak{grid-row:span 2;display:flex!important;flex-direction:column!important;align-items:flex-start!important;gap:3px!important}
#home #mStreak .yi{margin-bottom:4px!important}
#home #mStreak small{display:none}
#mStreak .yr{margin-top:auto;width:100%}
#mStreak .yr b{display:block;font-size:20px!important;font-weight:800;letter-spacing:-.4px;line-height:1}
#mStreak .yr small{display:block!important;margin-top:1px}
#mStreak .yr svg{display:block;width:100%;height:40px;margin-top:5px;fill:none;stroke:var(--ac);stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
/* Ana ekran kartları yarı saydam + bulanık: tema arka planı görünür ama yazılarla karışmaz */
#home>#gbonus,#home>#mQuest,#home>#mst,#home .grid .cd{background:color-mix(in srgb,var(--panel) 62%,transparent)!important;-webkit-backdrop-filter:blur(12px) saturate(1.2)!important;backdrop-filter:blur(12px) saturate(1.2)!important}
:root[data-perf=low] #home>#gbonus,:root[data-perf=low] #home>#mQuest,:root[data-perf=low] #home>#mst,:root[data-perf=low] #home .grid .cd{background:color-mix(in srgb,var(--panel) 85%,transparent)!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important}
/* Skor tablosu: sınıfın ilk 3'ü, profil fotoğraflarıyla */
#home #mLb{grid-column:1/-1;display:grid!important;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;column-gap:9px;row-gap:6px;padding:11px 12px!important}
#home #mLb>small{display:none}
#mLb .ya{font-size:12px;font-weight:700;color:var(--ac)}
#mLb .yt{grid-column:1/-1;display:flex;flex-direction:column;gap:2px;width:100%}
#mLb .yt>span{display:grid;grid-template-columns:20px 40px minmax(0,1fr) auto;align-items:center;column-gap:8px;padding:4px 6px;border-radius:12px;font-size:13px;font-weight:700}
#mLb .yt>span:active{background:color-mix(in srgb,var(--ac) 10%,transparent)}
#mLb .yt>span.ben{background:color-mix(in srgb,var(--ac) 9%,transparent)}
#mLb .yt em{font-style:normal;text-align:center;font-size:14px}
#mLb .yt .yav{display:grid;place-items:center;width:40px;height:34px;overflow:visible}
#mLb .yt .yav>*{margin:0!important}
#mLb .yt .yu{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#mLb .yt strong{font-variant-numeric:tabular-nums;color:var(--dim);font-weight:800;font-size:12.5px}
}
/* Açılış animasyonu bitince bırakılır (kalıcı opacity/transform arka plan bulanıklığını engelliyordu) */
#home{animation-fill-mode:backwards!important}
/* Alt menü: buzlu cam, aktif sekme hapı */
#nav{-webkit-backdrop-filter:blur(18px) saturate(1.4);backdrop-filter:blur(18px) saturate(1.4)}
#nav button{border-radius:16px}
/* Oyun ekranında logo yok (puan sağda kalır) */
body:has(#game:not([hidden])) header .brand{visibility:hidden}
</style>`);

// İkonlar: emojiyi ince çizgi ikonla değiştir (tekrar çizimlerde de korunur)
function ikonla(){
  [['mStreak','.ic'],['mPractice','.ic'],['mOnline','.ic'],['mLb','.ic'],['gbonus','.gi'],['mQuest','.qi']].forEach(([id,s])=>{
    const e=$(id),i=e&&e.querySelector(s);if(!i||i.dataset.yk)return;
    i.dataset.yk='1';i.classList.add('yi');i.innerHTML=IK[id==='gbonus'?'gi':id==='mQuest'?'qi':id];
  });
}
function kahraman(){
  const d=$('mDaily');if(!d||d.querySelector('.yh'))return;
  const g=d.querySelector('.go');if(!g)return;
  g.insertAdjacentHTML('beforebegin','<span class="yh" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>');
}
function seriKutusu(){
  const e=$('mStreak');if(!e)return;
  let r=e.querySelector('.yr');
  if(!r){e.insertAdjacentHTML('beforeend','<span class="yr"><b></b><small>Seri rekoru</small><svg viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true"><path d="M2 29 L30 27.5 L44 28.5 L60 21 L72 22.5 L87 7 L98 1"/></svg></span>');r=e.querySelector('.yr')}
  r.querySelector('b').textContent=String((prof&&+prof.best_score)||0);
}
function xpCubugu(){
  const m=$('mst');if(!m||m.hidden||!prof||typeof lvlOf!=='function'||typeof lvXp!=='function')return;
  const xp=+prof.xp||0,L=lvlOf(xp),a=lvXp(L),b=lvXp(L+1),p=L>=100?100:Math.max(0,Math.min(100,Math.round((xp-a)/Math.max(1,b-a)*100)));
  let x=m.querySelector('.yx');
  if(!x){m.insertAdjacentHTML('beforeend','<div class="yx"><small><span></span><span></span></small><u><i></i></u></div>');x=m.querySelector('.yx')}
  const s=x.querySelectorAll('small span');s[0].textContent=L>=100?'En yüksek seviye':'Sonraki seviye: '+(L+1);s[1].textContent=L>=100?'Maks.':(xp-a)+' / '+(b-a)+' XP';
  x.querySelector('i').style.width=p+'%';
}
// Skor tablosu kutusunda sınıfın ilk 3'ü (yalnız sınıf/öğretmen; 60 sn önbellek)
let T3=null,T3t=0,T3b=false;
async function ilk3(){
  const e=$('mLb');if(!e)return;
  const ok=sb&&prof&&(prof.cls||prof.teacher);
  let t=e.querySelector('.yt');
  if(!ok){if(t)t.remove();return}
  if(!e.querySelector('.ya'))e.querySelector('b').insertAdjacentHTML('afterend','<span class="ya">Tümü ›</span>');
  if(!t){e.insertAdjacentHTML('beforeend','<span class="yt"></span>');t=e.querySelector('.yt')}
  const ciz=()=>{if(!T3)return;const md=['🥇','🥈','🥉'];
    t.innerHTML=T3.map((x,i)=>{const a=typeof av==='function'?av(x.avatar,28):'';const fa=typeof frameWrap==='function'?frameWrap(a,x.frame):a;
      return '<span data-yu="'+esc(x.username||'')+'"'+(prof&&x.username===prof.username?' class="ben"':'')+'><em>'+md[i]+'</em><span class="yav">'+fa+'</span><span class="yu">'+esc(x.username||'?')+'</span><strong>'+(+x.best_score||0)+'</strong></span>'}).join('');
    t.querySelectorAll('[data-yu]').forEach(r=>r.onclick=ev=>{ev.stopPropagation();ev.preventDefault();const u=r.dataset.yu;if(!u)return;
      if(typeof aPView==='function'){$('home').hidden=true;aPView(u,()=>oExit())}else aBoard()});
  };
  ciz();
  if(T3b||Date.now()-T3t<60000)return;
  T3b=true;
  try{
    const r=await sb.from('profiles').select('username,avatar,frame,best_score').eq('banned',false).or('cls.eq.true,teacher.eq.true').order('best_score',{ascending:false}).limit(3);
    if(!r.error&&Array.isArray(r.data)){T3=r.data;T3t=Date.now();ciz()}
  }catch(x){}finally{T3b=false}
}
function kisaYazi(){
  const b=$('gbonus')&&$('gbonus').querySelector('b');if(b&&b.textContent==='Günün ilk oyun bonusu')b.textContent='Günlük bonus';
  const q=$('mQuest')&&$('mQuest').querySelector('b');if(q&&q.textContent==='Günlük görevler')q.textContent='Görevler';
  const pr=$('mPractice')&&$('mPractice').querySelector('small');if(pr&&pr.textContent!=='Seviye seç')pr.textContent='Seviye seç';
  const on=$('mOnline')&&$('mOnline').querySelector('small');if(on&&on.textContent!=='1v1 ya da grup')on.textContent='1v1 ya da grup';
  const qs=$('qS');if(qs&&/^Bugünkü 3 görevi tamamla/.test(qs.textContent))qs.textContent='3 görev, ödüller';
}
function guncelle(){try{kisaYazi();ikonla();kahraman();seriKutusu();xpCubugu();ilk3()}catch(e){}}
const _rh=rHome;rHome=function(){const r=_rh.apply(this,arguments);guncelle();return r};
// Sonradan eklenen bonus/görev kartları ve istatistik şeridi için de
new MutationObserver(()=>{if(!$('home').hidden)guncelle()}).observe($('home'),{childList:true,subtree:false,attributes:true,attributeFilter:['hidden']});
guncelle();
RX.push([/^Sonraki seviye: (\d+)$/,'Next level: $1']);
Object.assign(EN,{'Seri rekoru':'Best streak','Maks.':'Max','Tümü ›':'All ›','Günlük bonus':'Daily bonus','Görevler':'Quests','Seviye seç':'Pick a level','1v1 ya da grup':'1v1 or group','3 görev, ödüller':'3 quests, rewards','Sonraki seviye: ':'Next level: ','En yüksek seviye':'Max level'});
})();
