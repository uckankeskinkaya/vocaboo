// v18: Cyber çerçevesi: avatarı saran katmanlı SVG arma.
// Büyük avatarlarda kanat/arma/şerit gibi süsler de çizilir; küçük avatarlarda (listeler) yalnız halka.
(function(){
let RKN=0;
// Cyber: sarı-pembe dönen halka (diğer çerçevelerle aynı ölçüde), üstünde renkli glitch
const CYO='M100 33 A67 67 0 1 1 99.9 33 Z';
function cyber(id){
  const back='<defs><linearGradient id="c'+id+'" x1="0" y1="0" x2="1" y2="1"><stop offset=".2" stop-color="#fcee0a"/><stop offset=".45" stop-color="#ffd23a"/><stop offset=".55" stop-color="#ff5aa0"/><stop offset=".8" stop-color="#ff2a6d"/></linearGradient></defs>'
    +'<circle cx="100" cy="100" r="67" fill="#0b0a12"/>'
    +'<g class="sp"><circle cx="100" cy="100" r="59.5" fill="none" stroke="url(#c'+id+')" stroke-width="13"/></g>'
    +'<circle cx="100" cy="100" r="66.5" fill="none" stroke="#0b0a12" stroke-width="1.5"/><circle cx="100" cy="100" r="52.5" fill="none" stroke="#0b0a12" stroke-width="1.5"/>'
    +'<circle class="sp r" cx="100" cy="100" r="59.5" fill="none" stroke="#0b0a12" stroke-width="1.6" stroke-dasharray="1.5 9" opacity=".55"/>';
  // Renkli glitch: kayan renkli kopyalar ve yanıp sönen renk blokları
  const C=['#ff003c','#00f0ff','#fcee0a','#ff2bd6','#3dff8a'];let sd=11;const rn=()=>(sd=(sd*16807)%2147483647)/2147483647;
  let gl='';C.forEach((c,i)=>{const dx=((i%2?1:-1)*(3+i*1.5)).toFixed(1),dy=((i%3)-1).toFixed(1);
    gl+='<g class="gl" style="--dx:'+dx+'px;--dy:'+dy+'px;--dl:-'+(i*.37).toFixed(2)+'s"><path d="'+CYO+'" fill="none" stroke="'+c+'" stroke-width="3"/><circle cx="100" cy="100" r="53" fill="none" stroke="'+c+'" stroke-width="2.5"/></g>'});
  for(let i=0;i<12;i++){const x=20+rn()*150,yy=24+rn()*150,w=8+rn()*34,h=2+rn()*6;
    gl+='<rect class="gbk" style="--dl:-'+(rn()*2.4).toFixed(2)+'s;--dx:'+((rn()-.5)*16).toFixed(1)+'px" x="'+x.toFixed(1)+'" y="'+yy.toFixed(1)+'" width="'+w.toFixed(1)+'" height="'+h.toFixed(1)+'" fill="'+C[i%C.length]+'"/>'}
  return [back,gl];
}
const B={cyberc:cyber};
const _fh3=frameHtml;frameHtml=function(h,k){
  if(!Object.prototype.hasOwnProperty.call(B,k))return _fh3(h,k);
  const m=/(?:width="|width:)(\d+)/.exec(h),s=m?+m[1]:40,id='rk'+(++RKN),sv=B[k](id);
  return '<span class="rk rk-'+k+(s<40?' sm':'')+'" style="--s:'+s+'px">'+h
    +'<svg class="rk-b" viewBox="0 0 200 200" aria-hidden="true"'+'>'+sv[0]+'</svg>'
    +'<svg class="rk-f" viewBox="0 0 200 200" aria-hidden="true"'+'>'+sv[1]+'</svg></span>';
};
document.head.insertAdjacentHTML('beforeend',`<style>
.rk{position:relative;display:inline-grid;place-items:center;vertical-align:middle;width:calc(var(--s)*1.24);height:calc(var(--s)*1.24);margin:calc(var(--s)*.12);isolation:isolate}
.rk>:first-child{position:relative;z-index:1}
.rk>svg{position:absolute;left:50%;top:50%;width:calc(var(--s)*2);height:calc(var(--s)*2);transform:translate(-50%,-50%);overflow:visible;pointer-events:none}
.rk-b{z-index:0}.rk-f{z-index:2}
.rk.sm .x{display:none}
.rk.sm>svg{width:calc(var(--s)*1.5);height:calc(var(--s)*1.5)}
.rk .sp{transform-box:fill-box;transform-origin:center;animation:rk-spin 4s linear infinite}
.rk .sp.r{animation-duration:6s;animation-direction:reverse}
.rk .led{animation:rk-blink 1.2s steps(1) infinite}
.rk .eq{transform-box:fill-box;transform-origin:bottom;animation:rk-eq .8s ease-in-out infinite alternate}
.rk .gl{opacity:0;mix-blend-mode:screen;animation:rk-gl 2.6s steps(1) infinite;animation-delay:var(--dl)}
.rk .gbk{opacity:0;animation:rk-gbk 2.6s steps(1) infinite;animation-delay:var(--dl)}
.rk-cyberc>:first-child{box-shadow:0 0 0 calc(var(--s)*.02) #0b0a12;animation:rk-av 2.6s steps(1) infinite}
.rk-cyberc .rk-b{filter:drop-shadow(0 0 calc(var(--s)*.07) rgba(255,42,109,.5));animation:rk-hue 2.6s steps(1) infinite}
@keyframes rk-spin{to{transform:rotate(360deg)}}
@keyframes rk-blink{50%{opacity:.15}}
@keyframes rk-eq{from{transform:scaleY(.25)}to{transform:scaleY(1)}}
@keyframes rk-gl{0%,72%,100%{opacity:0;transform:none}73%{opacity:.9;transform:translate(var(--dx),var(--dy))}76%{opacity:.7;transform:translate(calc(var(--dx)*-1),0)}79%{opacity:.9;transform:translate(calc(var(--dx)*.5),calc(var(--dy)*-1))}82%{opacity:0}}
@keyframes rk-gbk{0%,70%,100%{opacity:0;transform:none}71%{opacity:.95;transform:translateX(var(--dx))}74%{opacity:0}78%{opacity:.8;transform:translateX(calc(var(--dx)*-1))}80%{opacity:0}}
@keyframes rk-hue{0%,72%,100%{filter:drop-shadow(0 0 calc(var(--s)*.07) rgba(255,42,109,.5))}73%{filter:hue-rotate(120deg) drop-shadow(3px 0 #ff003c)}76%{filter:hue-rotate(240deg) drop-shadow(-3px 0 #00f0ff)}79%{filter:hue-rotate(60deg) drop-shadow(2px 0 #fcee0a)}82%{filter:drop-shadow(0 0 calc(var(--s)*.07) rgba(255,42,109,.5))}}
@keyframes rk-av{0%,72%,100%{transform:none;filter:none;clip-path:none}73%{transform:translateX(2px);filter:drop-shadow(-2px 0 #ff003c) drop-shadow(2px 0 #00f0ff)}76%{transform:translateX(-3px) skewX(10deg);clip-path:inset(0 0 45% 0 round 50%);filter:drop-shadow(3px 0 #ff2bd6) drop-shadow(-3px 0 #3dff8a)}79%{transform:translateX(1px);filter:hue-rotate(180deg) drop-shadow(2px 0 #fcee0a)}82%{transform:none;filter:none;clip-path:none}}
:root[data-perf=low] .rk *{animation:none!important}
@media (prefers-reduced-motion:reduce){.rk,.rk *{animation:none!important}}
</style>`);
})();
