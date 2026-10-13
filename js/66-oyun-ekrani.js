// v46: Oyun ekranı güncellemesi. Seri modunda üstteki rozet ("♥♥♥ Seri 4 Pas 3" yazısı) sade simgelere dönüşür:
// 3 kalp (kalan can dolu, giden can boş çizgi), alev + seri sayısı. Pas ve ipucu düğmeleri cam görünümlü, temanın vurgu rengiyle.
// Klavye düzenine dokunulmaz (Sil solda, Gönder sağda).
(function(){
const KALP='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-9.2-9.4C1.6 7.6 3.9 4.5 7.2 4.5c2 0 3.5 1.1 4.8 2.8 1.3-1.7 2.8-2.8 4.8-2.8 3.3 0 5.6 3.1 4.4 6.6-1.7 4.8-9.2 9.4-9.2 9.4z"/></svg>';
const ALEV='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.5c-4 0-7-2.8-7-6.6 0-3.1 2-5.1 3.6-6.9.4 1.6 1.3 2.7 2.4 3.2-.2-3.3 1.1-6.3 3.9-8.7.3 3 1.7 4.6 3 6.2 1.4 1.7 2.1 3.4 2.1 5.9 0 3.9-3 6.9-8 6.9z"/></svg>';
const PAS='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6.2v11.6a.9.9 0 0 0 1.4.75l8.2-5.8a.9.9 0 0 0 0-1.5L7.4 5.45A.9.9 0 0 0 6 6.2z"/><rect x="17.2" y="5.5" width="2.4" height="13" rx="1.2"/></svg>';
document.head.insertAdjacentHTML('beforeend',`<style id="oyun-ekrani">
#badge.yb{display:inline-flex;align-items:center;gap:10px;padding:5px 12px!important}
#badge .yk{display:inline-flex;gap:3px}
#badge .yk svg{width:17px;height:17px;fill:var(--r);stroke:var(--r);stroke-width:1.6;stroke-linejoin:round}
#badge .yk svg.bos{fill:none;stroke:color-mix(in srgb,var(--dim) 55%,transparent)}
#badge .yk svg.git{animation:yk-git .5s ease-out}
#badge .ys{display:inline-flex;align-items:center;gap:3px;font-weight:800;font-variant-numeric:tabular-nums;color:var(--fg)}
#badge .ys svg{width:15px;height:15px;fill:var(--o)}
#badge .ys.sifir svg{fill:color-mix(in srgb,var(--dim) 55%,transparent)}
#badge i.ya{width:1px;height:14px;background:var(--line)}
@keyframes yk-git{0%{transform:scale(1.5)}100%{transform:scale(1)}}
/* Pas ve ipucu: cam görünüm, vurgu rengi */
#passbtn{gap:8px!important;padding:0 8px 0 10px!important;border:1px solid var(--line)!important;background:var(--panel)!important;color:var(--fg)!important;box-shadow:var(--sh);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);font-weight:800;font-size:13px}
#passbtn .yp{display:grid;place-items:center;width:30px;height:30px;border-radius:10px;background:color-mix(in srgb,var(--ac) 14%,transparent);color:var(--ac)}
#passbtn .yp svg{width:16px!important;height:16px!important;fill:currentColor}
#passbtn b{background:var(--ac)!important;color:var(--acf)!important;min-width:20px!important;height:20px!important;font-size:11.5px!important}
#passbtn:active{background:color-mix(in srgb,var(--ac) 10%,var(--panel))!important}
#hintbtn{border:1px solid var(--line)!important;background:var(--panel)!important;color:var(--ac)!important;box-shadow:var(--sh);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);font-size:20px!important}
:root[data-perf=low] #passbtn,:root[data-perf=low] #hintbtn{-webkit-backdrop-filter:none;backdrop-filter:none}
</style>`);
// Seri rozeti: yazıyı simgelere çevir (yazı başka yerden değişse de yeniden çizilir)
const B=$('badge');let son=-1;
const RE=/^(♥*) Seri (\d+) Pas (\d+)$/;
function rozet(){
  const m=RE.exec(B.textContent);
  if(!m){if(B.classList.contains('yb')&&!B.querySelector('.yk'))B.classList.remove('yb');return}
  const can=m[1].length,sr=+m[2],mx=Math.max(3,can);
  let k='';for(let i=0;i<mx;i++)k+=KALP.replace('<svg','<svg class="'+(i<can?'':'bos')+(i===can&&son>can?' git':'')+'"');
  son=can;
  B.classList.add('yb');
  B.innerHTML='<span class="yk" aria-label="'+can+' can">'+k+'</span><i class="ya"></i><span class="ys'+(sr?'':' sifir')+'" aria-label="Seri '+sr+'">'+ALEV+sr+'</span>';
}
new MutationObserver(rozet).observe(B,{childList:true,characterData:true,subtree:true});
// Pas düğmesi: yeni simge kutusu (yazı ve sayı aynı kalır; 1v1'deki ∞ da çalışır)
const P=$('passbtn');
function pasCiz(){
  const s=P.querySelector('svg');if(!s||P.querySelector('.yp'))return;
  const w=document.createElement('span');w.className='yp';w.innerHTML=PAS;s.replaceWith(w);
}
new MutationObserver(pasCiz).observe(P,{childList:true});
pasCiz();rozet();
})();
