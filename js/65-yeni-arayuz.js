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
@media (max-width:899px){
#home:not([hidden]){display:grid!important;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:12px;align-content:start}
#home>*{grid-column:1/-1;min-width:0;order:9}
#home>.greet{order:0}#home>#mDaily{order:1}#home>#gbonus{order:2;grid-column:1}#home>#mQuest{order:3;grid-column:2}#home>#mst{order:4}#home>.grid{order:5}
#home:not(:has(>#gbonus:not([hidden])))>#mQuest,#home:not(:has(>#mQuest:not([hidden])))>#gbonus{grid-column:1/-1}
#home>.rules,#home>.dock{display:none!important}
/* Günün kelimesi: geniş kahraman kart, harf kutuları + Oyna */
#mDaily.feat{display:grid!important;grid-template-columns:minmax(0,1fr) auto;align-items:end;column-gap:12px;padding:18px 18px 16px;border-radius:24px}
#mDaily.feat>.tag,#mDaily.feat>b,#mDaily.feat>small,#mDaily.feat>.dst{grid-column:1/-1}
#mDaily .yh{display:flex;gap:5px;margin-top:14px}
#mDaily .yh i{width:26px;height:30px;border-radius:8px;background:color-mix(in srgb,var(--acf) 18%,transparent);border:1.5px solid color-mix(in srgb,var(--acf) 45%,transparent)}
#mDaily .go{margin-top:14px!important;align-self:end;padding:9px 20px!important}
/* Bonus ve görevler: yan yana küçük kutular */
#home>#gbonus,#home>#mQuest{display:flex!important;flex-direction:column!important;align-items:flex-start!important;gap:5px!important;padding:13px 14px!important;border-radius:22px!important;text-align:left;margin:0!important;min-height:0}
#gbonus>div,#mQuest>span:not(.qi):not(.qd){display:flex;flex-direction:column;gap:2px}
#gbonus b,#mQuest b{font-size:14px!important;line-height:1.2}
#gbonus>div>small{display:none!important}
#home>#gbonus .yi,#home>#mQuest .yi{width:32px!important;height:32px!important;border-radius:10px!important}
#home>#gbonus .yi svg,#home>#mQuest .yi svg{width:18px;height:18px}
#gbonus small,#mQuest small{font-size:11.5px!important;line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
#gbonus .gp{font-size:13px!important;font-weight:800;margin:0!important}
#mQuest .qd{margin:0!important}
/* İkon kutuları */
#home .yi{display:grid!important;place-items:center;width:38px!important;height:38px!important;border-radius:12px!important;background:color-mix(in srgb,var(--ac) 13%,transparent)!important;color:var(--ac);font-size:0!important;flex:none;margin:0!important}
#home .yi svg{width:21px;height:21px;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}
/* İstatistik şeridi + XP çubuğu */
#home>#mst{border-radius:20px!important;padding:12px 6px 10px!important;flex-wrap:wrap}
#mst .yx{flex:0 0 calc(100% - 24px)!important;margin:8px 12px 0;text-align:left!important}
#mst .yx small{display:flex;justify-content:space-between;font-size:10.5px;color:var(--dim);font-weight:700;margin-bottom:4px}
#mst .yx u{display:block;height:5px;border-radius:9px;background:color-mix(in srgb,var(--ac) 14%,transparent);overflow:hidden;text-decoration:none}
#mst .yx u i{display:block;height:100%;border-radius:9px;background:var(--ac)}
/* Modlar: bento */
#home .grid{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:12px!important;border:0!important;background:none!important;overflow:visible!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important;border-radius:0!important;box-shadow:none!important}
#home .grid .cd{display:flex!important;flex-direction:column!important;align-items:flex-start!important;gap:4px!important;padding:15px!important;border:1px solid var(--line)!important;border-radius:22px!important;background:var(--panel)!important;box-shadow:var(--sh)!important;min-height:112px;text-align:left}
#home .grid .cd::after{display:none!important}
#home .grid .cd .yi{margin-bottom:6px!important}
#home .grid .cd b{font-size:15px!important}
#home .grid .cd small{font-size:12px!important}
#home #mStreak{grid-row:span 2}
#home #mLb{grid-column:1/-1;min-height:0}
#mStreak .yr{margin-top:auto;padding-top:10px;width:100%}
#mStreak .yr b{display:block;font-size:26px!important;font-weight:800;letter-spacing:-.5px;line-height:1}
#mStreak .yr small{display:block;margin-top:2px}
#mStreak .yr svg{display:block;width:100%;height:34px;margin-top:8px;fill:none;stroke:var(--ac);stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
#mLb .yt{display:flex;flex-direction:column;gap:6px;width:100%;margin-top:8px}
#mLb .yt span{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:700}
#mLb .yt span em{font-style:normal;width:18px;text-align:center}
#mLb .yt span .avs{width:24px;height:24px;font-size:14px}
#mLb .yt span strong{margin-left:auto;font-variant-numeric:tabular-nums;color:var(--dim);font-weight:700}
}
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
  if(!r){e.insertAdjacentHTML('beforeend','<span class="yr"><b></b><small>Seri rekoru</small><svg viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true"><path d="M2 26 L18 20 L32 23 L48 13 L62 16 L78 7 L98 3"/></svg></span>');r=e.querySelector('.yr')}
  r.querySelector('b').textContent=String((prof&&+prof.best_score)||0);
}
function xpCubugu(){
  const m=$('mst');if(!m||m.hidden||!prof||typeof lvlOf!=='function'||typeof lvXp!=='function')return;
  const xp=+prof.xp||0,L=lvlOf(xp),a=lvXp(L),b=lvXp(L+1),p=L>=100?100:Math.max(0,Math.min(100,Math.round((xp-a)/Math.max(1,b-a)*100)));
  let x=m.querySelector('.yx');
  if(!x){m.insertAdjacentHTML('beforeend','<div class="yx"><small><span></span><span></span></small><u><i></i></u></div>');x=m.querySelector('.yx')}
  const s=x.querySelectorAll('small span');s[0].textContent='Seviye '+L;s[1].textContent=L>=100?'Maks.':(xp-a)+' / '+(b-a)+' XP';
  x.querySelector('i').style.width=p+'%';
}
// Skor tablosu kutusunda sınıfın ilk 3'ü (yalnız sınıf/öğretmen; 60 sn önbellek)
let T3=null,T3t=0,T3b=false;
async function ilk3(){
  const e=$('mLb');if(!e)return;
  const ok=sb&&prof&&(prof.cls||prof.teacher);
  let t=e.querySelector('.yt');
  if(!ok){if(t)t.remove();return}
  if(!t){e.insertAdjacentHTML('beforeend','<span class="yt"></span>');t=e.querySelector('.yt')}
  const ciz=()=>{if(!T3)return;const md=['🥇','🥈','🥉'];t.innerHTML=T3.map((x,i)=>'<span><em>'+md[i]+'</em>'+(typeof av==='function'?av(x.avatar,24):'')+esc(x.username||'?')+'<strong>'+(+x.best_score||0)+'</strong></span>').join('')};
  ciz();
  if(T3b||Date.now()-T3t<60000)return;
  T3b=true;
  try{
    const r=await sb.from('profiles').select('username,avatar,best_score').eq('banned',false).or('cls.eq.true,teacher.eq.true').order('best_score',{ascending:false}).limit(3);
    if(!r.error&&Array.isArray(r.data)){T3=r.data;T3t=Date.now();ciz()}
  }catch(x){}finally{T3b=false}
}
function guncelle(){try{ikonla();kahraman();seriKutusu();xpCubugu();ilk3()}catch(e){}}
const _rh=rHome;rHome=function(){const r=_rh.apply(this,arguments);guncelle();return r};
// Sonradan eklenen bonus/görev kartları ve istatistik şeridi için de
new MutationObserver(()=>{if(!$('home').hidden)guncelle()}).observe($('home'),{childList:true,subtree:false,attributes:true,attributeFilter:['hidden']});
guncelle();
Object.assign(EN,{'Seri rekoru':'Best streak','Maks.':'Max'});
})();
