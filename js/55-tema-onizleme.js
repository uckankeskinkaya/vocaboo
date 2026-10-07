// v35: Pazar'da tam tema önizlemesi. Temaya dokununca küçük bir telefon ekranında temanın tamamı görünür:
// "Ana menü" (karşılama, günün kelimesi, mod kartları) ve "Oyun içi" (tanım, renkli bloklar, klavye). Sahneli temalarda
// arka planda temanın gerçek canlı sahnesi oynar (oyun içi sekmesinde oyun sahnesi). Satın alma / kapatma alttaki çubuktan.
(function(){
Object.assign(EN,{'Ana menü':'Main menu','Oyun içi':'In-game','Hoş geldin, elif':'Welcome, elif','Bugün hangi kelimeyi avlıyoruz?':'Which word are we hunting today?','Kelime 3/15':'Word 3/15'});
document.head.insertAdjacentHTML('beforeend',`<style>
#tvw{position:fixed;inset:0;z-index:58;display:flex;flex-direction:column;align-items:center;gap:10px;padding:calc(14px + env(safe-area-inset-top,0px)) 12px calc(150px + env(safe-area-inset-bottom,0px));pointer-events:none}
#tvw .tvt{pointer-events:auto;display:flex;gap:4px;padding:4px;border-radius:999px;background:var(--panel);border:1px solid var(--line);box-shadow:var(--sh)}
#tvw .tvt button{border:0;background:none;color:var(--dim);font-weight:700;font-size:13px;padding:8px 16px;border-radius:999px}
#tvw .tvt button.on{background:var(--ac);color:var(--acf)}
#tvw .tvf{position:relative;flex:none;border-radius:30px;border:6px solid color-mix(in srgb,var(--fg) 82%,transparent);box-shadow:0 18px 50px rgba(0,0,0,.4);overflow:hidden;background:transparent}
#tvw .tvf::before{content:'';position:absolute;top:6px;left:50%;width:70px;height:6px;margin-left:-35px;border-radius:9px;background:color-mix(in srgb,var(--fg) 30%,transparent);z-index:2}
#tvw .tvs{position:absolute;left:0;top:0;width:380px;height:760px;transform-origin:0 0;padding:26px 18px 18px;box-sizing:border-box;display:flex;flex-direction:column;gap:12px;color:var(--fg);font-family:inherit;pointer-events:none}
#tvw .tvs.duz{background:var(--bg)}
#tvw .tvs.duz::before{content:'';position:absolute;inset:0;z-index:-1;background:radial-gradient(500px 260px at 50% -90px,color-mix(in srgb,var(--ac) 16%,transparent),transparent)}
#tvw .tvs header h1{margin:0;font-size:18px}
#tvw .tvs .sc{font-weight:700;font-size:13px;color:var(--dim)}
#tvw .tvs .cd{pointer-events:none}
#tvw .tvs .dfx{background:var(--panel);border:1px solid var(--line);border-radius:18px;padding:14px 16px;font-size:16px;line-height:1.45;font-weight:500;box-shadow:var(--sh)}
#tvw .tvs .tp{display:flex;justify-content:space-between;align-items:center}
#tvw .tvs .tp span:first-child{padding:8px 14px;border-radius:12px;border:1px solid var(--line);background:var(--panel);font-weight:700;font-size:13px}
#tvw .tvs .gw{display:flex;flex-direction:column;gap:6px;align-items:center;--t:56px;margin:4px 0}
#tvw .tvs .kbw{margin-top:auto;display:flex;flex-direction:column;gap:6px}
#tvw .tvs .k{display:grid;place-items:center;height:48px;color:var(--fg)}
#tvw .tvs .k.w{max-width:64px;flex:1.6;font-size:11px;padding:0 2px}
#tvw .tvs .cap{text-align:center;font-size:12px;color:var(--dim)}
:root[data-tvw] body>*:not(#tvw):not(#tpv):not(#sahne):not(#oyunsahne):not(#cf):not(.toast):not(script):not(style){visibility:hidden}
</style>`);
const mark='<span class="mark"><i style="background:var(--g)"></i><i style="background:var(--g)"></i><i style="background:var(--o)"></i><i style="background:var(--r)"></i><i style="background:var(--g)"></i><i style="background:var(--g)"></i></span>';
const ust='<header><div class="brand">'+mark+'<h1>vocaboo</h1></div><span class="sc">1.250 puan</span></header>';
function menuHTML(){
  return ust+'<div class="greet"><h2>Hoş geldin, elif</h2><p>Bugün hangi kelimeyi avlıyoruz?</p></div>'
    +'<div class="rules"><span style="--c:var(--g)">Yeri doğru</span><span style="--c:var(--o)">Yeri yanlış</span><span style="--c:var(--r)">Kelimede yok</span></div>'
    +'<div class="cd feat"><span class="tag">Günün kelimesi</span><b>Herkes aynı kelimeyi çözüyor</b><small>Sadece 3 hak. Her gün yeni bir kelime.</small><span class="go">Oyna</span></div>'
    +'<div class="grid"><div class="cd"><span class="ic">⚡</span><b>Seri Modu</b><small>3 can, giderek zorlaşan kelimeler</small></div><div class="cd"><span class="ic">📚</span><b>Alıştırma</b><small>Seviyeni seç, rahat çalış</small></div><div class="cd"><span class="ic">🌐</span><b>Online</b><small>1v1 ya da grup, oda koduyla</small></div><div class="cd"><span class="ic">🏆</span><b>Skor tablosu</b><small>Haftalık ve tüm zamanlar</small></div></div>'
    +'<div class="dock"><div class="cd"><span><b>Profil</b><br><small>Seviye 12 · Kelime Avcısı</small></span></div><div class="cd"><span class="ic" style="margin:0">⚙️</span></div></div>';
}
function oyunHTML(){
  // Cevap: BROOM. Bloklar ve klavye gerçek oyun renkleriyle.
  const G=[['BREAD','ggrrr'],['BLOOM','grggg'],['BROOM','ggggg']];
  let h=ust+'<div class="tp"><span>Seviyeler</span><span id="tvb" class="sc">Kelime 3/15</span></div><div class="dfx">Something you use to clean the floor.</div><div class="gw"><div class="cap">Kalan hak: 2</div>';
  G.forEach(([w,s])=>{h+='<div class="row">'+[...w].map((c,i)=>'<div class="tile '+s[i]+'">'+c+'</div>').join('')+'</div>'});
  for(let r=0;r<2;r++)h+='<div class="row">'+'<div class="tile"></div>'.repeat(5)+'</div>';
  const ks={B:'g',R:'g',O:'g',M:'g',E:'r',A:'r',D:'r',L:'r'};
  h+='</div><div class="kbw">'+['QWERTYUIOP','ASDFGHJKL','ZXCVBNM'].map((r,ri)=>'<div class="kr">'+(ri===2?'<span class="k w">Sil</span>':'')+[...r].map(c=>'<span class="k '+(ks[c]||'')+'">'+c+'</span>').join('')+(ri===2?'<span class="k w">Gönder</span>':'')+'</div>').join('')+'</div>';
  return h;
}
let sek='m',tema=null;
const sahneli=k=>typeof SCN!=='undefined'&&!!SCN[k];
function boyut(){
  const f=document.querySelector('#tvw .tvf'),s=document.querySelector('#tvw .tvs');if(!f||!s)return;
  const ah=innerHeight-150-80,aw=Math.min(innerWidth-36,420);
  const k=Math.max(.3,Math.min(aw/380,ah/760,1));
  s.style.transform='scale('+k+')';f.style.width=Math.round(380*k)+'px';f.style.height=Math.round(760*k)+'px';
}
function ciz(){
  const o=$('tvw');if(!o)return;
  const s=o.querySelector('.tvs');s.innerHTML=sek==='m'?menuHTML():oyunHTML();
  s.classList.toggle('duz',!sahneli(tema));
  o.querySelectorAll('.tvt button').forEach(b=>b.classList.toggle('on',b.dataset.s===sek));
  if(window.oyunSahnesiZorla)oyunSahnesiZorla(sek==='o');
  boyut();
}
function kapat(){const o=$('tvw');if(o)o.remove();delete document.documentElement.dataset.tvw;if(window.oyunSahnesiZorla)oyunSahnesiZorla(false);tema=null}
function ac(k){
  tema=k;sek='m';
  let o=$('tvw');
  if(!o){o=document.createElement('div');o.id='tvw';o.innerHTML='<div class="tvt"><button data-s="m">Ana menü</button><button data-s="o">Oyun içi</button></div><div class="tvf" aria-hidden="true"><div class="tvs"></div></div>';document.body.appendChild(o);
    o.querySelectorAll('.tvt button').forEach(b=>b.onclick=()=>{sek=b.dataset.s;ciz()})}
  document.documentElement.dataset.tvw='1';
  ciz();
}
addEventListener('resize',boyut);
const _p=thPrev;thPrev=function(k,price,owned){
  _p(k,price,owned);
  if(!$('tpv'))return;
  // eski "Maç içi" düğmesi ve görünümü yerine bu önizleme
  const eski=$('tpvo');if(eski)eski.remove();const g=$('tpvg');if(g)g.remove();delete document.documentElement.dataset.ovo;
  ac(k);
};
const _e=thPrevEnd;thPrevEnd=function(keep){kapat();return _e(keep)};
})();
