// v18: Rütbe tarzı çerçeveler (Cyber, Kurt, Piksel): avatarı saran katmanlı SVG arma.
// Büyük avatarlarda kanat/arma/şerit gibi süsler de çizilir; küçük avatarlarda (listeler) yalnız halka.
(function(){
let RKN=0;
const wolf=(x0,y0,w,h)=>[[12,4],[34,34],[50,28],[66,34],[88,4],[86,48],[72,64],[60,94],[50,100],[40,94],[28,64],[14,48]].map(p=>(x0+p[0]*w/100).toFixed(1)+','+(y0+p[1]*h/100).toFixed(1)).join(' ');
function cyber(id){
  const g='url(#g'+id+')',y='url(#y'+id+')',oct='73,35 127,35 165,73 165,127 127,165 73,165 35,127 35,73';
  const wing='<polygon points="54,90 8,66 24,94 2,104 26,114 12,136 54,116" fill="'+g+'" stroke="'+y+'" stroke-width="2" stroke-linejoin="bevel"/><polyline points="50,98 18,82" stroke="#00f0ff" stroke-width="1.5" fill="none"/><polyline points="50,108 22,122" stroke="#00f0ff" stroke-width="1.5" fill="none"/><rect x="38" y="100" width="7" height="3" fill="#ff003c"/>';
  const back='<defs><linearGradient id="y'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff59a"/><stop offset=".5" stop-color="#fcee0a"/><stop offset="1" stop-color="#a89a00"/></linearGradient>'
    +'<linearGradient id="g'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3f4b"/><stop offset="1" stop-color="#101217"/></linearGradient></defs>'
    +'<g class="x"><g class="wg">'+wing+'</g><g class="wg" transform="matrix(-1 0 0 1 200 0)">'+wing+'</g></g>'
    +'<polygon points="'+oct+'" fill="'+g+'" stroke="'+y+'" stroke-width="3.5" stroke-linejoin="bevel"/>'
    +'<polygon points="'+oct+'" fill="none" stroke="#00f0ff" stroke-width="1" opacity=".55" transform="translate(100 100) scale(.92) translate(-100 -100)"/>'
    +'<rect x="31" y="96" width="5" height="8" fill="#ff003c"/><rect x="164" y="96" width="5" height="8" fill="#ff003c"/>'
    +'<circle class="sp" cx="100" cy="100" r="60" fill="none" stroke="'+y+'" stroke-width="1.4" stroke-dasharray="2 5"/>'
    +'<circle class="sp r" cx="100" cy="100" r="54.5" fill="none" stroke="#00f0ff" stroke-width="3" stroke-dasharray="20 6 5 6"/>';
  // Renkli glitch: kayan renkli kopyalar ve yanıp sönen renk blokları
  const C=['#ff003c','#00f0ff','#fcee0a','#ff2bd6','#3dff8a'];let sd=11;const rn=()=>(sd=(sd*16807)%2147483647)/2147483647;
  let gl='';C.forEach((c,i)=>{const dx=((i%2?1:-1)*(3+i*1.5)).toFixed(1),dy=((i%3)-1).toFixed(1);
    gl+='<g class="gl" style="--dx:'+dx+'px;--dy:'+dy+'px;--dl:-'+(i*.37).toFixed(2)+'s"><polygon points="'+oct+'" fill="none" stroke="'+c+'" stroke-width="3"/><circle cx="100" cy="100" r="54.5" fill="none" stroke="'+c+'" stroke-width="2.5"/></g>'});
  for(let i=0;i<12;i++){const x=20+rn()*150,yy=24+rn()*150,w=8+rn()*34,h=2+rn()*6;
    gl+='<rect class="gbk" style="--dl:-'+(rn()*2.4).toFixed(2)+'s;--dx:'+((rn()-.5)*16).toFixed(1)+'px" x="'+x.toFixed(1)+'" y="'+yy.toFixed(1)+'" width="'+w.toFixed(1)+'" height="'+h.toFixed(1)+'" fill="'+C[i%C.length]+'"/>'}
  const front='<g class="x"><polygon points="76,38 100,9 124,38 113,38 100,23 87,38" fill="'+y+'" stroke="#101217" stroke-width="1"/><circle class="led" cx="100" cy="33" r="3" fill="#ff003c"/>'
    +'<polygon points="70,158 130,158 121,179 79,179" fill="'+g+'" stroke="'+y+'" stroke-width="2"/>'
    +[0,1,2,3,4,5].map(i=>'<rect class="eq" style="animation-delay:-'+(i*.17).toFixed(2)+'s" x="'+(83+i*6)+'" y="163" width="4" height="11" fill="'+C[i%C.length]+'"/>').join('')+'</g>'+gl;
  return [back,front];
}
// Canavar avcısı: çelik gümüş, kara demir ve kan kırmızısı; hırlayan kurt başlı madalyon (özgün çizim)
function wolfHead(x0,y0,sz,id){
  const P=a=>a.map(p=>(x0+p[0]*sz/100).toFixed(1)+','+(y0+p[1]*sz/100).toFixed(1)).join(' ');
  return '<polygon points="'+P([[16,2],[36,30],[50,24],[64,30],[84,2],[86,40],[80,52],[92,60],[74,70],[64,92],[50,98],[36,92],[26,70],[8,60],[20,52],[14,40]])+'" fill="url(#s'+id+')" stroke="#0e0f12" stroke-width="1.6" stroke-linejoin="round"/>'
    +'<polygon points="'+P([[22,12],[34,32],[28,36]])+'" fill="#2a2d33"/><polygon points="'+P([[78,12],[66,32],[72,36]])+'" fill="#2a2d33"/>'
    +'<polyline points="'+P([[26,40],[46,46]])+'" stroke="#0e0f12" stroke-width="2" fill="none"/><polyline points="'+P([[74,40],[54,46]])+'" stroke="#0e0f12" stroke-width="2" fill="none"/>'
    +'<polygon class="eye" points="'+P([[30,46],[44,51],[42,55],[31,51]])+'" fill="#ff2a1a"/><polygon class="eye" points="'+P([[70,46],[56,51],[58,55],[69,51]])+'" fill="#ff2a1a"/>'
    +'<polygon points="'+P([[45,61],[55,61],[50,67]])+'" fill="#0e0f12"/>'
    +'<polygon points="'+P([[34,70],[50,75],[66,70],[60,88],[50,93],[40,88]])+'" fill="#3a0606" stroke="#0e0f12" stroke-width="1"/>'
    +'<polygon points="'+P([[38,71],[43,72],[40,82]])+'" fill="#f4f1e8"/><polygon points="'+P([[62,71],[57,72],[60,82]])+'" fill="#f4f1e8"/>'
    +'<polygon points="'+P([[44,89],[47,84],[48,90]])+'" fill="#f4f1e8"/><polygon points="'+P([[56,89],[53,84],[52,90]])+'" fill="#f4f1e8"/>'
    +'<polyline points="'+P([[20,58],[30,62]])+'" stroke="#5a6068" stroke-width="1.2"/><polyline points="'+P([[80,58],[70,62]])+'" stroke="#5a6068" stroke-width="1.2"/>';
}
function kurt(id){
  const s='url(#s'+id+')',r='#8e1414';
  const sword=a=>'<g transform="rotate('+a+' 100 100)"><polygon points="100,2 106,18 106,132 94,132 94,18" fill="'+s+'" stroke="#16181c" stroke-width="1"/><line x1="100" y1="20" x2="100" y2="128" stroke="#6a717b" stroke-width="1.5"/>'
    +'<rect x="80" y="132" width="40" height="7" rx="2" fill="#2a2d33" stroke="'+s+'" stroke-width="1.2"/><rect x="96.5" y="139" width="7" height="24" fill="#1a0c0c" stroke="'+r+'" stroke-width="1"/><circle cx="100" cy="168" r="6" fill="'+s+'" stroke="#16181c" stroke-width=".8"/></g>';
  let studs='';for(let k=0;k<8;k++){const a=(22.5+45*k)*Math.PI/180;studs+='<circle cx="'+(100+62*Math.cos(a)).toFixed(1)+'" cy="'+(100+62*Math.sin(a)).toFixed(1)+'" r="3" fill="'+s+'" stroke="#0e0f12" stroke-width=".8"/>'}
  const back='<defs><linearGradient id="s'+id+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f5f7f9"/><stop offset=".3" stop-color="#b9c0c8"/><stop offset=".55" stop-color="#5b626c"/><stop offset=".75" stop-color="#dfe4e9"/><stop offset="1" stop-color="#7c848e"/></linearGradient>'
    +'<linearGradient id="i'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3e45"/><stop offset="1" stop-color="#121417"/></linearGradient>'
    +'<linearGradient id="h'+id+'" x1="0" y1="0" x2="1" y2="1"><stop offset=".42" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".7"/><stop offset=".58" stop-color="#fff" stop-opacity="0"/>'
    +'<animateTransform attributeName="gradientTransform" type="translate" values="-1 -1;1 1" dur="4s" repeatCount="indefinite"/></linearGradient></defs>'
    +'<g class="x">'+sword(42)+sword(-42)+'</g>'
    +'<circle cx="100" cy="100" r="69" fill="#0e0f12"/><circle cx="100" cy="100" r="62" fill="none" stroke="url(#i'+id+')" stroke-width="13"/>'
    +'<circle cx="100" cy="100" r="68" fill="none" stroke="'+s+'" stroke-width="2.2"/><circle cx="100" cy="100" r="56" fill="none" stroke="'+s+'" stroke-width="2.2"/>'
    +'<circle cx="100" cy="100" r="62" fill="none" stroke="#9aa1aa" stroke-width="1.6" stroke-dasharray=".1 7" stroke-linecap="round" opacity=".8"/>'
    +'<circle cx="100" cy="100" r="53" fill="none" stroke="'+r+'" stroke-width="3"/>'+studs
    +'<circle cx="100" cy="100" r="68" fill="none" stroke="url(#h'+id+')" stroke-width="3"/><circle cx="100" cy="100" r="56" fill="none" stroke="url(#h'+id+')" stroke-width="3"/>';
  const front='<g class="x"><path d="M56 152 L144 152 L138 164 L144 176 L56 176 L62 164 Z" fill="'+r+'" stroke="'+s+'" stroke-width="1.6"/><path d="M66 157 L134 157 M66 171 L134 171" stroke="#c23a2e" stroke-width="1"/>'
    +'<circle cx="100" cy="27" r="23" fill="url(#i'+id+')" stroke="'+s+'" stroke-width="2.5"/><circle cx="100" cy="27" r="19" fill="none" stroke="'+r+'" stroke-width="1.2"/>'
    +wolfHead(80,6,40,id)+'</g>';
  return [back,front];
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
const B={cyberc:cyber,kurt:kurt,piksel:piksel};
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
.rk-kurt>:first-child{box-shadow:0 0 0 calc(var(--s)*.02) #0e0f12}
.rk-kurt .rk-b{filter:drop-shadow(0 calc(var(--s)*.03) calc(var(--s)*.06) rgba(0,0,0,.55))}
.rk .eye{animation:rk-eye 2.6s ease-in-out infinite}
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
@keyframes rk-eye{0%,100%{opacity:.55}50%{opacity:1}}
@keyframes rk-sway{from{transform:rotate(-6deg)}to{transform:rotate(6deg)}}
:root[data-perf=low] .rk *{animation:none!important}
@media (prefers-reduced-motion:reduce){.rk,.rk *{animation:none!important}}
</style>`);
})();
