// v18: Rütbe tarzı çerçeveler (Cyber, Piksel): avatarı saran katmanlı SVG arma.
// Büyük avatarlarda kanat/arma/şerit gibi süsler de çizilir; küçük avatarlarda (listeler) yalnız halka.
(function(){
let RKN=0;
// Cyber: üç şekil seçeneği (CYV), hepsinde aynı renkli glitch
const CYV={
  halka:{o:'M100 36 A64 64 0 1 1 99.9 36 Z',
    b:(g,y)=>'<circle cx="100" cy="100" r="64" fill="'+g+'" stroke="'+y+'" stroke-width="3"/><circle cx="100" cy="100" r="71" fill="none" stroke="'+y+'" stroke-width="4" stroke-dasharray="96 14" stroke-dashoffset="-7"/>'
      +'<circle cx="100" cy="100" r="76" fill="none" stroke="#00f0ff" stroke-width="1" stroke-dasharray="2 6" opacity=".7"/>',
    x:y=>'<polygon points="90,30 110,30 106,20 94,20" fill="'+y+'"/><circle class="led" cx="100" cy="25" r="2.4" fill="#ff003c"/><polygon points="90,170 110,170 106,180 94,180" fill="'+y+'"/>'
      +'<polygon points="30,90 30,110 20,106 20,94" fill="#00f0ff"/><polygon points="170,90 170,110 180,106 180,94" fill="#00f0ff"/>'},
  kalkan:{o:'M62 30 L138 30 L166 58 L166 124 L132 166 L100 182 L68 166 L34 124 L34 58 Z',
    b:(g,y)=>'<path d="M62 30 L138 30 L166 58 L166 124 L132 166 L100 182 L68 166 L34 124 L34 58 Z" fill="'+g+'" stroke="'+y+'" stroke-width="3.5" stroke-linejoin="bevel"/>'
      +'<path d="M66 38 L134 38 L158 62 L158 121 L128 158 L100 172 L72 158 L42 121 L42 62 Z" fill="none" stroke="#00f0ff" stroke-width="1" opacity=".55"/>',
    x:y=>'<polygon points="84,30 116,30 109,18 91,18" fill="'+y+'"/><circle class="led" cx="100" cy="24" r="2.4" fill="#ff003c"/>'
      +'<polygon points="166,70 180,80 166,92" fill="#ff003c"/><polygon points="34,70 20,80 34,92" fill="#ff003c"/>'},
  kare:{o:'M54 30 L146 30 L170 54 L170 146 L146 170 L54 170 L30 146 L30 54 Z',
    b:(g,y)=>'<path d="M54 30 L146 30 L170 54 L170 146 L146 170 L54 170 L30 146 L30 54 Z" fill="'+g+'" stroke="'+y+'" stroke-width="3.5" stroke-linejoin="bevel"/>'
      +'<path d="M30 70 L30 54 L54 30 L80 30" fill="none" stroke="#ff003c" stroke-width="5"/><rect x="164" y="84" width="6" height="32" fill="#00f0ff" opacity=".8"/>',
    x:y=>'<path d="M14 40 L14 14 L40 14 M160 14 L186 14 L186 40 M186 160 L186 186 L160 186 M40 186 L14 186 L14 160" fill="none" stroke="'+y+'" stroke-width="3"/>'
      +'<rect x="66" y="174" width="68" height="12" fill="'+y+'"/>'+[0,1,2,3,4,5,6].map(i=>'<rect x="'+(70+i*9)+'" y="177" width="5" height="6" fill="#101217"/>').join('')}
};
let CYS='kare';
function cyber(id,v){
  const S=CYV[v||CYS],g='url(#g'+id+')',y='url(#y'+id+')';
  const back='<defs><linearGradient id="y'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff59a"/><stop offset=".5" stop-color="#fcee0a"/><stop offset="1" stop-color="#a89a00"/></linearGradient>'
    +'<linearGradient id="g'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3f4b"/><stop offset="1" stop-color="#101217"/></linearGradient></defs>'
    +S.b(g,y)
    +'<circle class="sp" cx="100" cy="100" r="59.5" fill="none" stroke="'+y+'" stroke-width="1.4" stroke-dasharray="2 5"/>'
    +'<circle class="sp r" cx="100" cy="100" r="54.5" fill="none" stroke="#00f0ff" stroke-width="3" stroke-dasharray="20 6 5 6"/>';
  // Renkli glitch: kayan renkli kopyalar ve yanıp sönen renk blokları
  const C=['#ff003c','#00f0ff','#fcee0a','#ff2bd6','#3dff8a'];let sd=11;const rn=()=>(sd=(sd*16807)%2147483647)/2147483647;
  let gl='';C.forEach((c,i)=>{const dx=((i%2?1:-1)*(3+i*1.5)).toFixed(1),dy=((i%3)-1).toFixed(1);
    gl+='<g class="gl" style="--dx:'+dx+'px;--dy:'+dy+'px;--dl:-'+(i*.37).toFixed(2)+'s"><path d="'+S.o+'" fill="none" stroke="'+c+'" stroke-width="3"/><circle cx="100" cy="100" r="54.5" fill="none" stroke="'+c+'" stroke-width="2.5"/></g>'});
  for(let i=0;i<12;i++){const x=20+rn()*150,yy=24+rn()*150,w=8+rn()*34,h=2+rn()*6;
    gl+='<rect class="gbk" style="--dl:-'+(rn()*2.4).toFixed(2)+'s;--dx:'+((rn()-.5)*16).toFixed(1)+'px" x="'+x.toFixed(1)+'" y="'+yy.toFixed(1)+'" width="'+w.toFixed(1)+'" height="'+h.toFixed(1)+'" fill="'+C[i%C.length]+'"/>'}
  return [back,'<g class="x">'+S.x(y)+'</g>'+gl];
}
// Piksel: sade halka (üstü çimen, altı toprak) ve üstünde küçük çiçekler
let PXR=null;
function pxRing(){
  if(PXR)return PXR;let sd=7;const rnd=()=>(sd=(sd*16807)%2147483647)/2147483647,pk=a=>a[Math.floor(rnd()*a.length)];
  const c=document.createElement('canvas');c.width=c.height=50;const x=c.getContext('2d');
  for(let j=0;j<50;j++)for(let i=0;i<50;i++){const d=Math.hypot(i+.5-25,j+.5-25);if(d<12.6||d>=16)continue;
    const gr=j<21||(j<24&&rnd()<.5);
    x.fillStyle=d>=15.2||d<13.4?'#1f1f1f':gr?pk(['#5f9f35','#56922f','#6aab3d','#4f8a2a']):rnd()<.06?pk(['#5fe3e0','#a6f7f3']):pk(['#866043','#79553a','#96704f','#6c4c33']);x.fillRect(i,j,1,1)}
  return PXR=c.toDataURL();
}
function piksel(){
  const P=(x,y,c)=>'<rect x="'+x*4+'" y="'+y*4+'" width="4" height="4" fill="'+c+'"/>';
  const pat=(rows,ox,oy,col)=>rows.map((r,j)=>Array.from(r).map((ch,i)=>col[ch]?P(ox+i,oy+j,col[ch]):'').join('')).join('');
  const poppy=['.RR.','RYRR','.RR.','.G..','GG.G','.GG.'],dand=['.YY.','YOYY','.YY.','..G.','.GGG','..G.'],tuft=['G.G.G','GGGGG'];
  const col={R:'#d8262e',Y:'#f6d33c',O:'#c98d12',G:'#3f8a24'};
  const back='<image href="'+pxRing()+'" x="0" y="0" width="200" height="200" style="image-rendering:pixelated"/>';
  const front='<g class="x"><g class="fl">'+pat(poppy,15,4,col)+'</g><g class="fl" style="animation-delay:-.8s">'+pat(dand,31,4,col)+'</g>'+pat(tuft,22,7,col)+'</g>';
  return [back,front];
}
const B={cyberc:cyber,piksel:piksel};
window.rkCyberDene=(h,v)=>{const m=/(?:width="|width:)(\d+)/.exec(h),s=m?+m[1]:40,id='rk'+(++RKN),sv=cyber(id,v);return '<span class="rk rk-cyberc" style="--s:'+s+'px">'+h+'<svg class="rk-b" viewBox="0 0 200 200">'+sv[0]+'</svg><svg class="rk-f" viewBox="0 0 200 200">'+sv[1]+'</svg></span>'};
const _fh3=frameHtml;frameHtml=function(h,k){
  if(!Object.prototype.hasOwnProperty.call(B,k))return _fh3(h,k);
  const m=/(?:width="|width:)(\d+)/.exec(h),s=m?+m[1]:40,id='rk'+(++RKN),sv=B[k](id);
  return '<span class="rk rk-'+k+(s<40?' sm':'')+'" style="--s:'+s+'px">'+h
    +'<svg class="rk-b" viewBox="0 0 200 200" aria-hidden="true"'+(k==='piksel'?' shape-rendering="crispEdges"':'')+'>'+sv[0]+'</svg>'
    +'<svg class="rk-f" viewBox="0 0 200 200" aria-hidden="true"'+(k==='piksel'?' shape-rendering="crispEdges"':'')+'>'+sv[1]+'</svg></span>';
};
document.head.insertAdjacentHTML('beforeend',`<style>
.rk{position:relative;display:inline-grid;place-items:center;vertical-align:middle;width:calc(var(--s)*1.24);height:calc(var(--s)*1.24);margin:calc(var(--s)*.12);isolation:isolate}
.rk>:first-child{position:relative;z-index:1}
.rk>svg{position:absolute;left:50%;top:50%;width:calc(var(--s)*2);height:calc(var(--s)*2);transform:translate(-50%,-50%);overflow:visible;pointer-events:none}
.rk-b{z-index:0}.rk-f{z-index:2}
.rk.sm .x{display:none}
.rk.sm>svg{width:calc(var(--s)*1.5);height:calc(var(--s)*1.5)}
.rk .sp{transform-box:fill-box;transform-origin:center;animation:rk-spin 9s linear infinite}
.rk .sp.r{animation-duration:6s;animation-direction:reverse}
.rk .led{animation:rk-blink 1.2s steps(1) infinite}
.rk .eq{transform-box:fill-box;transform-origin:bottom;animation:rk-eq .8s ease-in-out infinite alternate}
.rk .gl{opacity:0;mix-blend-mode:screen;animation:rk-gl 2.6s steps(1) infinite;animation-delay:var(--dl)}
.rk .gbk{opacity:0;animation:rk-gbk 2.6s steps(1) infinite;animation-delay:var(--dl)}
.rk-cyberc>:first-child{box-shadow:0 0 0 calc(var(--s)*.025) #05040a,0 0 0 calc(var(--s)*.045) #00f0ff;animation:rk-av 2.6s steps(1) infinite}
.rk-cyberc .rk-b{filter:drop-shadow(0 0 calc(var(--s)*.06) rgba(0,240,255,.55));animation:rk-hue 2.6s steps(1) infinite}
.rk-piksel>:first-child{box-shadow:0 0 0 calc(var(--s)*.03) #1f1f1f}
.rk-piksel .rk-b{filter:drop-shadow(0 0 calc(var(--s)*.06) rgba(127,224,74,.45))}
.rk .fl{transform-box:fill-box;transform-origin:50% 100%;animation:rk-sway 2.4s ease-in-out infinite alternate}
@keyframes rk-spin{to{transform:rotate(360deg)}}
@keyframes rk-blink{50%{opacity:.15}}
@keyframes rk-eq{from{transform:scaleY(.25)}to{transform:scaleY(1)}}
@keyframes rk-gl{0%,72%,100%{opacity:0;transform:none}73%{opacity:.9;transform:translate(var(--dx),var(--dy))}76%{opacity:.7;transform:translate(calc(var(--dx)*-1),0)}79%{opacity:.9;transform:translate(calc(var(--dx)*.5),calc(var(--dy)*-1))}82%{opacity:0}}
@keyframes rk-gbk{0%,70%,100%{opacity:0;transform:none}71%{opacity:.95;transform:translateX(var(--dx))}74%{opacity:0}78%{opacity:.8;transform:translateX(calc(var(--dx)*-1))}80%{opacity:0}}
@keyframes rk-hue{0%,72%,100%{filter:drop-shadow(0 0 calc(var(--s)*.06) rgba(0,240,255,.55))}73%{filter:hue-rotate(120deg) drop-shadow(3px 0 #ff003c)}76%{filter:hue-rotate(240deg) drop-shadow(-3px 0 #00f0ff)}79%{filter:hue-rotate(60deg) drop-shadow(2px 0 #fcee0a)}82%{filter:drop-shadow(0 0 calc(var(--s)*.06) rgba(0,240,255,.55))}}
@keyframes rk-av{0%,72%,100%{transform:none;filter:none;clip-path:none}73%{transform:translateX(2px);filter:drop-shadow(-2px 0 #ff003c) drop-shadow(2px 0 #00f0ff)}76%{transform:translateX(-3px) skewX(10deg);clip-path:inset(0 0 45% 0 round 50%);filter:drop-shadow(3px 0 #ff2bd6) drop-shadow(-3px 0 #3dff8a)}79%{transform:translateX(1px);filter:hue-rotate(180deg) drop-shadow(2px 0 #fcee0a)}82%{transform:none;filter:none;clip-path:none}}
@keyframes rk-sway{from{transform:rotate(-6deg)}to{transform:rotate(6deg)}}
:root[data-perf=low] .rk *{animation:none!important}
@media (prefers-reduced-motion:reduce){.rk,.rk *{animation:none!important}}
</style>`);
})();
