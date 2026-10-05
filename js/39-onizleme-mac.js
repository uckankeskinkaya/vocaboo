// v26: Pazar tema önizlemesinde "Maç içi" görünümü: tema satın alınmadan oyun ekranında nasıl duracağı görülür.
(function(){
Object.assign(EN,{'Maç içi':'In-game','Menü':'Menu'});
document.head.insertAdjacentHTML('beforeend',`<style>
#tpvg{position:fixed;inset:0;z-index:58;display:flex;flex-direction:column;align-items:center;gap:14px;padding:calc(70px + env(safe-area-inset-top,0px)) 16px 0;pointer-events:none}
#tpvg .gw{display:flex;flex-direction:column;gap:6px;--t:min(52px,calc((100vw - 62px)/6))}
#tpvg .cap{text-align:center;font-size:12px;color:var(--dim);margin-bottom:4px}
#tpvg .kbw{position:fixed;left:8px;right:8px;bottom:calc(150px + env(safe-area-inset-bottom,0px));display:flex;flex-direction:column;gap:6px;max-width:560px;margin:0 auto}
#tpvg .k{display:grid;place-items:center;height:46px;color:var(--fg)}
:root[data-ovo] body>*:not(#tpvg):not(#tpv):not(#sahne):not(#oyunsahne):not(script):not(style){visibility:hidden}
</style>`);
const ornek=()=>{
  const G=[['SHAKER','ggrrog'],['SHOVEL','gggror']];
  let h='<div class="gw"><div class="cap">Kalan hak: 3</div>';
  G.forEach(([w,s])=>{h+='<div class="row">'+[...w].map((c,i)=>'<div class="tile '+s[i]+'">'+c+'</div>').join('')+'</div>'});
  h+='<div class="row">'+['S','H','',' ','',''].map((c,i)=>'<div class="tile'+(c.trim()?' f':i===2?' cu':'')+'">'+c.trim()+'</div>').join('')+'</div>';
  for(let r=0;r<2;r++)h+='<div class="row">'+'<div class="tile"></div>'.repeat(6)+'</div>';
  const ks={S:'g',H:'g',A:'r',K:'r',E:'o',R:'g',O:'g',V:'r',L:'r'};
  h+='</div><div class="kbw">'+['QWERTYUIOP','ASDFGHJKL','ZXCVBNM'].map((r,ri)=>'<div class="kr">'+(ri===2?'<span class="k w">Sil</span>':'')+[...r].map(c=>'<span class="k '+(ks[c]||'')+'">'+c+'</span>').join('')+(ri===2?'<span class="k w">Gönder</span>':'')+'</div>').join('')+'</div>';
  return h};
function kapat(){const o=$('tpvg');if(o)o.remove();delete document.documentElement.dataset.ovo;if(window.oyunSahnesiZorla)oyunSahnesiZorla(false);const b=$('tpvo');if(b)b.textContent='Maç içi'}
function ac(){if(!window.oyunSahnesiZorla)return;const o=document.createElement('div');o.id='tpvg';o.setAttribute('aria-hidden','true');o.innerHTML=ornek();document.body.appendChild(o);document.documentElement.dataset.ovo='1';oyunSahnesiZorla(true);const b=$('tpvo');if(b)b.textContent='Menü'}
const _p=thPrev;thPrev=function(k,price,owned){
  kapat();_p(k,price,owned);
  const bar=$('tpv'),x=$('tpvx');if(!bar||!x||$('tpvo')||!(typeof SCN!=='undefined'&&SCN[k]))return;
  const b=document.createElement('button');b.id='tpvo';b.textContent='Maç içi';x.after(b);
  b.onclick=()=>{$('tpvg')?kapat():ac()};
};
const _e=thPrevEnd;thPrevEnd=function(keep){kapat();return _e(keep)};
// Kaldırılmış bir tema kayıtlıysa varsayılana dön
try{const t=localStorage.getItem('ka_theme');if(t&&!TM[t]){localStorage.removeItem('ka_theme');delete document.documentElement.dataset.theme;document.documentElement.dataset.anim='';if(typeof sahneKur==='function')sahneKur(null)}}catch(e){}
})();
