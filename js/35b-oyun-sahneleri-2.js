// v24: Oyun içi sahnelerin yenilenmiş hali: ejderha, derin deniz, sakura ağacı, kış, yağmurlu şehir, galaksi, taverna masası, blok dünyası.
// Hepsi kodla çizilir (SVG + CSS), dışarıdan görsel yok. Motor: js/35 (OSEKLE).
(function(){
if(!window.OSEKLE)return;
const sv=(c,vb,inner,st)=>'<svg class="'+c+'" viewBox="'+vb+'" preserveAspectRatio="xMidYMid meet"'+(st?' style="'+st+'"':'')+'>'+inner+'</svg>';
const rr=(a,b)=>R(a,b),fx=n=>f1(n);
const many=(n,f)=>{let h='';for(let i=0;i<n;i++)h+=f(i);return h};
const anim='--t:%ts;--d:-%ds';
const tm=(a,b)=>'--t:'+fx(rr(a,b))+'s;--d:-'+fx(rr(0,b))+'s';
document.head.insertAdjacentHTML('beforeend','<style id="oyun-sahne-2">'+`
@keyframes os2-blink{50%{opacity:0}}
@keyframes sc-blink{50%{opacity:0}}
@keyframes os2-rise{from{transform:translate3d(0,0,0);opacity:0}10%{opacity:1}85%{opacity:.9}to{transform:translate3d(var(--w,0px),-110vh,0);opacity:0}}
@keyframes os2-fall{from{transform:translate3d(0,-8vh,0)}to{transform:translate3d(var(--w,0px),112vh,0)}}
@keyframes os2-flap{0%,100%{transform:rotate(-14deg)}50%{transform:rotate(16deg)}}
@keyframes os2-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3%)}}
@keyframes os2-fire{0%,100%{transform:scale(1,1) skewX(0)}33%{transform:scale(1.12,.9) skewX(-4deg)}66%{transform:scale(.9,1.1) skewX(3deg)}}
@keyframes os2-flick{0%,100%{opacity:.85}20%{opacity:1}45%{opacity:.7}70%{opacity:.95}}
@keyframes os2-swr{from{transform:translateX(-30vw)}to{transform:translateX(130vw)}}
@keyframes os2-swl{from{transform:translateX(130vw)}to{transform:translateX(-30vw)}}
@keyframes os2-sway{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(5deg)}}
@keyframes os2-fin{0%,100%{transform:scaleX(1)}50%{transform:scaleX(.82)}}
@keyframes os2-ray{0%,100%{opacity:.25}50%{opacity:.7}}
@keyframes os2-tw{0%,100%{opacity:.15}50%{opacity:1}}
@keyframes os2-spin{to{transform:rotate(360deg)}}
@keyframes os2-drift{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(4vw,-3vh) scale(1.12)}}
@keyframes os2-comet{0%,60%{transform:translate(0,0) rotate(28deg);opacity:0}64%{opacity:1}82%{transform:translate(-120vw,60vh) rotate(28deg);opacity:0}100%{opacity:0}}
@keyframes os2-flash{0%,88%,100%{opacity:0}89%{opacity:.8}90%{opacity:.1}91.5%{opacity:.95}95%{opacity:0}}
@keyframes os2-bolt{0%,88%,100%{opacity:0}89%{opacity:1}90%{opacity:.2}91.5%{opacity:1}94%{opacity:0}}
@keyframes os2-win{0%,100%{opacity:1}50%{opacity:.35}}
@keyframes os2-rip{from{transform:scale(.2);opacity:.8}to{transform:scale(1.4);opacity:0}}
@keyframes os2-wave{0%,100%{transform:rotate(-30deg)}50%{transform:rotate(14deg)}}
@keyframes os2-puff{from{transform:translate(0,0) scale(.5);opacity:.8}to{transform:translate(var(--w,10px),-9vh) scale(1.8);opacity:0}}
@keyframes os2-cloud{from{transform:translateX(-45vw)}to{transform:translateX(120vw)}}
@keyframes os2-sp{0%,100%{opacity:0;transform:scale(.3)}50%{opacity:1;transform:scale(1)}}
@keyframes os2-lava{from{background-position:0 0}to{background-position:200px 0}}
@keyframes os2-wob{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-5px) rotate(2deg)}}
@keyframes os2-mote{0%,100%{transform:translate(0,0);opacity:.1}30%{transform:translate(18px,-26px);opacity:.8}60%{transform:translate(-14px,-48px);opacity:.3}}
@keyframes os2-smoke{from{transform:translate(0,0) scale(.6);opacity:.55}to{transform:translate(var(--w,8px),-60px) scale(2);opacity:0}}
@keyframes os2-pan{from{transform:translateX(-25vw)}to{transform:translateX(125vw)}}
`+'</style>');
// ortak iskelet kuralları: svg konumlanır
const BASE='§O svg{position:absolute;display:block;overflow:visible}§O .vg{inset:0}§O .tb{transform-box:fill-box}';

/* ───── EJDERHA ATEŞİ ───── */
const ejHtml=()=>{
  const O='stroke="#ff7a22" stroke-width="1.5" stroke-linejoin="round"';
  const dragon=sv('dr','-80 0 480 260',`
  <defs>
   <linearGradient id="dg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a1014"/><stop offset="1" stop-color="#1a0608"/></linearGradient>
   <linearGradient id="dgw" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9a2412"/><stop offset="1" stop-color="#3a0a0c"/></linearGradient>
   <radialGradient id="dge" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fffbc0"/><stop offset=".5" stop-color="#ffc030"/><stop offset="1" stop-color="#ff4a00" stop-opacity="0"/></radialGradient>
   <linearGradient id="fg" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffbe0"/><stop offset=".25" stop-color="#ffd23a"/><stop offset=".6" stop-color="#ff5a14"/><stop offset="1" stop-color="#c8180a" stop-opacity="0"/></linearGradient>
  </defs>
  <g class="fi tb"><path class="f1" d="M36 100 C0 100 -40 130 -78 214 C-40 190 -20 206 -12 232 C0 196 22 170 46 128Z" fill="url(#fg)"/><path class="f2" d="M38 102 C10 108 -20 130 -46 176 C-20 166 -8 172 -2 190 C10 160 26 140 44 120Z" fill="#fff4b0" opacity=".9"/></g>
  <g class="tl tb"><path d="M280 170 C320 190 350 180 372 150 C386 132 396 120 390 100 C384 128 360 150 330 156 C306 160 292 150 276 146Z" fill="url(#dg1)" ${O}/><path d="M384 108 L402 86 L398 124Z" fill="#ff8a2a" ${O}/></g>
  <g class="wb tb"><path d="M230 112 C240 70 270 30 330 10 C322 34 328 46 316 58 C326 74 318 90 306 100 C308 114 298 122 282 128Z" fill="#5a1410" ${O}/></g>
  <g class="wg tb"><path d="M214 118 C196 66 214 12 262 -22 C256 6 262 20 250 34 C262 52 252 70 242 82 C246 100 232 112 222 120Z" fill="url(#dgw)" ${O}/>
   <path d="M216 116 L262 -20 M222 112 L252 34 M228 108 L246 82" stroke="#ffa040" stroke-width="2" fill="none" opacity=".75"/></g>
  <path d="M170 150 C176 112 220 98 262 112 C300 124 306 160 282 182 C258 200 196 196 174 176 C168 170 168 160 170 150Z" fill="url(#dg1)" ${O}/>
  <path d="M184 176 C214 192 258 192 280 174" stroke="#c4501a" stroke-width="3" fill="none" stroke-dasharray="3 4"/>
  <path d="M206 186 L194 224 L214 216 L220 232 L228 192Z M256 188 L250 226 L268 214 L276 228 L276 188Z" fill="url(#dg1)" ${O}/>
  <path d="M184 142 C158 130 134 104 114 84" stroke="#ff7a22" stroke-width="40" fill="none" stroke-linecap="round"/>
  <path d="M184 142 C158 130 134 104 114 84" stroke="url(#dg1)" stroke-width="37" fill="none" stroke-linecap="round"/>
  <path d="M168 140 C150 126 134 108 116 90" stroke="#c4501a" stroke-width="3" fill="none" stroke-dasharray="3 5"/>
  <path d="M120 60 L82 62 L44 82 L36 98 L50 98 L40 104 L80 100 L118 98 C134 96 140 70 120 60Z" fill="url(#dg1)" ${O}/>
  <path d="M42 100 L22 124 L60 112 L82 104Z" fill="#2a0a0c" ${O}/>
  <path d="M40 98 L46 108 L52 98 M60 98 L66 106 L72 98 M30 108 L38 112 L38 104z" fill="#ffeed0"/>
  <path d="M116 60 L96 26 L128 52 M126 70 L130 30 L142 66 M100 60 L72 40 L106 58" fill="#2a0a0c" ${O}/>
  <circle class="eye" cx="94" cy="72" r="11" fill="url(#dge)"/><ellipse cx="93" cy="72" rx="2" ry="5.4" fill="#220000"/>
  <path d="M132 90 l10 -16 l10 14 M150 106 l12 -14 l8 16 M168 120 l12 -12 l6 16 M188 130 l12 -10 l4 14" fill="#ff8a2a" ${O}/>`);
  let h='<u class="hz"></u><u class="mt"></u>'+sv('mn','0 0 400 120','<path d="M0 120 L0 70 L40 40 L70 62 L120 14 L170 58 L210 30 L260 64 L310 22 L360 56 L400 36 L400 120Z" fill="#1b0707"/><path d="M120 14 L108 30 L126 24 L134 34z M310 22 L300 38 L318 30z" fill="#3a1208"/>');
  h+=dragon;
  h+=many(14,()=>'<i class="em" style="--x:'+fx(rr(0,100))+'%;--z:'+fx(rr(2,5))+'px;--w:'+fx(rr(-30,40))+'px;'+tm(5,10)+'"></i>');
  h+='<u class="lv"></u><u class="lg"></u><u class="vg"></u>';
  return h};
const ejCss=BASE+`
§O{background:radial-gradient(130% 62% at 62% 18%,rgba(255,110,30,.35),transparent 60%),linear-gradient(#0c0204,#2a0707 55%,#7c1d05 100%)}
§O .hz{inset:0;background:radial-gradient(60% 40% at 50% 100%,rgba(255,120,20,.45),transparent)}
§O .mn{left:-5%;right:-5%;bottom:10%;width:110%;height:34%;preserveAspectRatio:none}
§O .dr{left:-8%;top:2%;width:min(116vw,104vh);height:auto;filter:drop-shadow(0 0 14px rgba(255,90,20,.6));animation:os2-bob 5s ease-in-out infinite}
§O .wb{transform-origin:236px 112px;animation:os2-flap 3.2s ease-in-out -.4s infinite reverse}
§O .wg{transform-origin:218px 118px;animation:os2-flap 3.2s ease-in-out infinite}
§O .tl{transform-origin:280px 165px;animation:os2-sway 4s ease-in-out infinite}
§O .eye{animation:os2-flick 1.8s infinite}
§O .fi{transform-origin:36px 100px;animation:os2-fire .5s ease-in-out infinite;filter:drop-shadow(0 0 10px #ff7a1a)}
§O .f1,§O .f2{transform-origin:36px 100px}
§O .f2{animation:os2-fire .35s ease-in-out infinite reverse}
§O .em{top:100%;width:var(--z);height:var(--z);border-radius:50%;background:#ffb030;box-shadow:0 0 8px 2px #ff6a14;animation:os2-rise var(--t) linear var(--d) infinite}
§O .lv{left:0;right:0;bottom:0;height:12%;background:repeating-linear-gradient(100deg,#ff7a14 0 30px,#ffb030 60px,#e83a08 100px),#ff5a10;background-size:200px 100%;animation:os2-lava 6s linear infinite;box-shadow:0 -10px 40px 8px rgba(255,90,10,.55)}
§O .lg{left:0;right:0;bottom:0;height:30%;background:linear-gradient(transparent,rgba(255,110,20,.35));animation:os2-flick 2.4s infinite}
§O .vg{background:radial-gradient(ellipse at 50% 50%,transparent 50%,rgba(0,0,0,.55))}`;

/* ───── DERİN DENİZ ───── */
const fish=(c1,c2,w,flip,t,d,top)=>'<u class="sw" style="top:'+top+'%;--t:'+t+'s;--d:-'+d+'s;animation-name:'+(flip?'os2-swl':'os2-swr')+'">'+
 sv('fh'+(flip?' fl':''),'0 0 60 32',`<g class="ta tb"><path d="M14 16 L0 3 Q6 16 0 29Z" fill="${c2}"/></g><path d="M12 16 Q26 -1 46 8 Q58 14 58 16 Q58 18 46 24 Q26 33 12 16Z" fill="${c1}"/><path d="M24 6 Q30 -2 36 6" fill="${c2}"/><path d="M26 14 Q36 20 28 25" fill="none" stroke="#ffffff55" stroke-width="1.4"/><circle cx="48" cy="13" r="3" fill="#fff"/><circle cx="49" cy="13" r="1.5" fill="#001"/>`,'width:'+w+'px;height:auto')+'</u>';
const okHtml=()=>{
  let h='<u class="ray" style="left:8%;--r:-10deg"></u><u class="ray" style="left:40%;--r:6deg;animation-delay:-2s"></u><u class="ray" style="left:70%;--r:-4deg;animation-delay:-4s"></u><u class="cau"></u>';
  h+=sv('wh','0 0 300 110','<g fill="#06324c"><path d="M20 60 C60 20 190 20 250 56 C270 66 288 62 296 40 C292 78 270 96 246 90 C190 110 60 112 20 60Z"/><path d="M130 90 L110 108 L156 94z"/></g><circle cx="58" cy="52" r="3" fill="#0b6a94"/>');
  const cols=[['#ffb347','#ff7a1a'],['#7be0ff','#2aa6d8'],['#ff7fb0','#d83a7a'],['#c9ff7a','#6ab82a'],['#ffe45e','#e0a010']];
  for(let i=0;i<9;i++){const c=cols[i%5],flip=i%2,sz=rr(44,80);h+=fish(c[0],c[1],sz,flip,fx(rr(18,34)),fx(rr(0,30)),fx(rr(10,86)))}
  for(let k=0;k<3;k++){const top=rr(30,70);for(let j=0;j<5;j++)h+=fish('#8fe8ff','#3ab0d8',30,0,24,fx(8+k*3+j*.8),fx(top+rr(-5,5)))}
  h+=many(18,()=>'<i class="bb" style="--x:'+fx(rr(0,100))+'%;--z:'+fx(rr(3,10))+'px;--w:'+fx(rr(-18,18))+'px;'+tm(6,12)+'"></i>');
  h+='<u class="jl" style="left:10%;top:22%">'+'</u><u class="jl j2" style="right:8%;top:48%"></u>';
  h+=sv('sw1','0 0 120 160','<g class="tb" style="transform-origin:60px 160px;animation:os2-sway 5s ease-in-out infinite"><path d="M60 160 C40 120 80 90 56 50 C50 36 60 20 54 4" stroke="#1fb36a" stroke-width="7" fill="none" stroke-linecap="round"/></g><g class="tb" style="transform-origin:90px 160px;animation:os2-sway 4s ease-in-out -1s infinite"><path d="M90 160 C70 130 104 100 86 70" stroke="#2fd37e" stroke-width="6" fill="none" stroke-linecap="round"/></g>');
  h+=sv('sw2','0 0 120 160','<g class="tb" style="transform-origin:60px 160px;animation:os2-sway 4.5s ease-in-out infinite"><path d="M50 160 C70 120 30 90 54 50 C60 36 50 20 56 4" stroke="#27c477" stroke-width="7" fill="none" stroke-linecap="round"/></g>');
  h+=sv('co','0 0 160 120','<g fill="#ff5f8a"><path d="M20 120 L30 60 L40 100 L52 40 L64 100 L78 54 L90 120Z"/></g><g fill="#ff9a5c"><path d="M92 120 L100 70 L112 104 L124 62 L136 120Z"/></g><circle cx="52" cy="40" r="4" fill="#ffd0e0"/><circle cx="124" cy="62" r="4" fill="#ffe0c0"/>');
  h+='<u class="sd"></u><u class="vg"></u>';
  return h};
const okCss=BASE+`
§O{background:linear-gradient(#0a8fb8 0%,#06608a 28%,#033b62 62%,#021a33 100%)}
§O .ray{top:-10%;width:22%;height:90%;background:linear-gradient(rgba(190,250,255,.5),transparent 85%);transform:rotate(var(--r));transform-origin:50% 0;clip-path:polygon(30% 0,70% 0,100% 100%,0 100%);animation:os2-ray 6s ease-in-out infinite}
§O .cau{inset:0 0 40% 0;background:repeating-radial-gradient(ellipse at 30% 0,rgba(180,250,255,.1) 0 14px,transparent 14px 34px);animation:os2-drift 12s ease-in-out infinite;mix-blend-mode:screen}
§O .wh{left:0;top:42%;width:min(80vw,70vh);height:auto;opacity:.9;animation:os2-pan 70s linear infinite}
§O .sw{left:0;animation-timing-function:linear;animation-iteration-count:infinite;animation-duration:var(--t);animation-delay:var(--d)}
§O .fh{position:relative;display:block;height:auto}
§O .fl{transform:scaleX(-1)}
§O .ta{transform-origin:100% 50%;animation:os2-fin .5s ease-in-out infinite}
§O .bb{top:100%;width:var(--z);height:var(--z);border-radius:50%;border:1.5px solid rgba(220,250,255,.8);background:radial-gradient(circle at 30% 30%,rgba(255,255,255,.55),transparent 60%);animation:os2-rise var(--t) ease-in infinite var(--d)}
§O .jl{width:46px;height:56px;border-radius:50% 50% 30% 30%;background:radial-gradient(circle at 50% 30%,#ffd0ff,#d46bff 60%,rgba(212,107,255,.2));box-shadow:0 0 22px 6px rgba(212,107,255,.5);opacity:.85;animation:os2-wob 4s ease-in-out infinite}
§O .jl::after{content:"";position:absolute;left:8px;right:8px;top:80%;height:34px;background:repeating-linear-gradient(90deg,#e6a0ff 0 2px,transparent 2px 9px);opacity:.7}
§O .j2{transform:scale(.7);animation-delay:-2s}
§O .sw1{left:-3%;bottom:4%;width:min(34vw,200px);height:auto}
§O .sw2{right:2%;bottom:3%;width:min(30vw,170px);height:auto}
§O .co{right:16%;bottom:0;width:min(34vw,200px);height:auto;opacity:.95}
§O .sd{left:0;right:0;bottom:0;height:7%;background:linear-gradient(#3b5b6e,#1b2f3c)}
§O .vg{background:radial-gradient(ellipse at 50% 40%,transparent 55%,rgba(0,10,25,.55))}`;

/* ───── SAKURA ───── */
const blos=(cx,cy,r,n,cls)=>many(n,()=>{const a=rr(0,6.28),d=Math.sqrt(Math.random())*r,x=cx+Math.cos(a)*d,y=cy+Math.sin(a)*d*.75,s=rr(7,16);
  return '<circle cx="'+fx(x)+'" cy="'+fx(y)+'" r="'+fx(s)+'" fill="'+['#ffc2d9','#ff9fc2','#ffd9e8','#f78fb6'][Math.floor(rr(0,4))]+'" opacity="'+fx(rr(.75,.95))+'"/>'}).replace(/^/,'<g class="'+cls+' tb">')+'</g>';
const peHtml=()=>{
  const tree=sv('tr','0 0 400 460',`
   <path d="M60 460 C70 400 56 340 84 290 C100 262 96 230 110 200 C60 180 40 140 20 110 M110 200 C150 180 200 190 250 150 C280 126 330 120 380 80 M104 250 C150 250 190 228 230 232 M92 300 C60 290 40 270 14 262" stroke="#4a2a2c" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
   <path d="M60 460 C70 400 56 340 84 290 C100 262 96 230 110 200" stroke="#5e3638" stroke-width="30" fill="none" stroke-linecap="round" opacity=".9"/>
   ${blos(70,120,70,34,'bl1')}${blos(200,160,80,40,'bl2')}${blos(340,100,70,34,'bl3')}${blos(150,260,70,26,'bl2')}${blos(40,250,50,16,'bl1')}`);
  const tree2=sv('tr2','0 0 300 360',`<path d="M230 360 C220 300 244 250 214 200 C190 170 200 140 188 110 M214 200 C170 190 140 160 120 130" stroke="#4a2a2c" stroke-width="14" fill="none" stroke-linecap="round"/>${blos(190,100,60,28,'bl3')}${blos(110,140,50,20,'bl1')}`);
  let h='<u class="sun"></u>'+sv('fu','0 0 400 100','<path d="M0 100 L0 90 L140 90 L190 30 L215 12 L240 30 L290 90 L400 90 L400 100Z" fill="#f4c6d8"/><path d="M190 30 L215 12 L240 30 L226 36 L215 28 L204 36z" fill="#fff"/>');
  h+='<u class="hl a"></u><u class="hl b"></u>'+tree2+tree;
  h+=sv('to','0 0 60 120','<path d="M30 0 L30 20" stroke="#8a2b3a" stroke-width="2"/><rect x="14" y="20" width="32" height="60" rx="12" fill="#ff5f80"/><rect x="14" y="30" width="32" height="5" fill="#ffd3a0"/><rect x="14" y="62" width="32" height="5" fill="#ffd3a0"/><path d="M30 80 L30 110" stroke="#ffd3a0" stroke-width="3"/>','left:62%;top:8%;width:30px');
  h+=sv('to to2','0 0 60 120','<path d="M30 0 L30 20" stroke="#8a2b3a" stroke-width="2"/><rect x="14" y="20" width="32" height="60" rx="12" fill="#ff5f80"/><rect x="14" y="30" width="32" height="5" fill="#ffd3a0"/><rect x="14" y="62" width="32" height="5" fill="#ffd3a0"/><path d="M30 80 L30 110" stroke="#ffd3a0" stroke-width="3"/>','left:80%;top:12%;width:26px');
  h+=many(26,i=>'<i class="pt" style="--x:'+fx(rr(0,100))+'%;--z:'+fx(rr(8,16))+'px;--w:'+fx(rr(-90,60))+'px;'+tm(8,18)+'"></i>');
  h+='<u class="pd"></u><u class="vg"></u>';
  return h};
const peCss=BASE+`
§O{background:linear-gradient(#ffd7e6 0%,#ffe9ef 40%,#fff3e6 100%)}
§O .sun{right:12%;top:6%;width:min(40vw,34vh);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,#fff6e8 0,#ffd9b8 55%,rgba(255,200,180,.0) 72%)}
§O .fu{left:0;right:0;bottom:20%;width:100%;height:auto;opacity:.8}
§O .hl{left:-10%;right:-10%;border-radius:50% 50% 0 0}
§O .hl.a{bottom:-8%;height:34%;background:#f7b3c9}
§O .hl.b{bottom:-16%;height:28%;background:#f08aa9}
§O .tr{left:-8%;top:-2%;width:min(104vw,86vh);height:auto;transform-origin:15% 100%;animation:os2-sway 9s ease-in-out infinite}
§O .tr2{right:-12%;bottom:6%;width:min(70vw,60vh);height:auto;opacity:.85;transform-origin:80% 100%;animation:os2-sway 11s ease-in-out -3s infinite}
§O .bl1,§O .bl2,§O .bl3{animation:os2-bob 7s ease-in-out infinite}
§O .bl2{animation-delay:-2s}§O .bl3{animation-delay:-4s}
§O .to{animation:os2-sway 4s ease-in-out infinite;transform-origin:50% 0;filter:drop-shadow(0 0 8px rgba(255,100,130,.6))}
§O .to2{animation-delay:-1.5s}
§O .pt{top:-4vh;width:var(--z);height:calc(var(--z) * .72);border-radius:100% 0 100% 0;background:linear-gradient(135deg,#ffb7d0,#ff7fa8);opacity:.9;animation:os2-fall var(--t) linear var(--d) infinite}
§O .pd{left:0;right:0;bottom:0;height:9%;background:linear-gradient(rgba(255,160,190,0),rgba(240,120,160,.45))}
§O .vg{background:radial-gradient(ellipse at 50% 50%,transparent 60%,rgba(255,170,200,.45))}`;

/* ───── KIŞ MASALI ───── */
const snowman=(cl)=>sv('sm '+cl,'0 0 120 180',`
  <ellipse cx="60" cy="172" rx="40" ry="6" fill="#9cb8d2" opacity=".5"/>
  <circle cx="60" cy="130" r="40" fill="#fff" stroke="#c9dcee" stroke-width="2"/><circle cx="60" cy="78" r="29" fill="#fff" stroke="#c9dcee" stroke-width="2"/><circle cx="60" cy="38" r="21" fill="#fff" stroke="#c9dcee" stroke-width="2"/>
  <rect x="38" y="12" width="44" height="8" rx="2" fill="#2a3b6b"/><rect x="45" y="-6" width="30" height="20" rx="3" fill="#2a3b6b"/><rect x="45" y="6" width="30" height="5" fill="#e0453a"/>
  <circle cx="52" cy="34" r="2.6" fill="#223"/><circle cx="68" cy="34" r="2.6" fill="#223"/><path d="M60 40 L82 46 L60 48Z" fill="#ff8a1e"/>
  <path d="M44 52 Q60 62 78 52 L80 64 Q60 74 42 64Z" fill="#e0453a"/><path d="M70 60 L78 86 L68 84Z" fill="#c03227"/>
  <circle cx="60" cy="86" r="3" fill="#223"/><circle cx="60" cy="102" r="3" fill="#223"/><circle cx="60" cy="130" r="3.4" fill="#223"/><circle cx="60" cy="148" r="3.4" fill="#223"/>
  <path d="M34 76 L8 60 M8 60 L2 52 M8 60 L0 62" stroke="#6b4426" stroke-width="3.5" stroke-linecap="round" fill="none"/>
  <g class="ar tb"><path d="M86 76 L112 60 M112 60 L118 52 M112 60 L120 62" stroke="#6b4426" stroke-width="3.5" stroke-linecap="round" fill="none"/></g>`);
const pine=(x,s,c)=>'<g transform="translate('+x+' 0) scale('+s+')"><path d="M0 0 L-26 50 L-12 50 L-34 92 L-16 92 L-40 140 L40 140 L16 92 L34 92 L12 50 L26 50Z" fill="'+c+'"/><path d="M0 0 L-12 24 L12 24Z M-16 56 L-6 70 L-26 70z M-10 100 L6 112 L-22 112z" fill="#fff" opacity=".9"/><rect x="-5" y="140" width="10" height="14" fill="#6b4426"/></g>';
const kiHtml=()=>{
  let h='<u class="mn"></u><u class="au"></u>';
  h+=sv('mt','0 0 400 120','<path d="M0 120 L0 70 L60 20 L100 60 L170 6 L240 70 L300 30 L360 66 L400 40 L400 120Z" fill="#a9c5e2"/><path d="M60 20 L44 40 L58 34 L70 44z M170 6 L150 30 L168 22 L180 34 L190 26z M300 30 L286 46 L300 40z" fill="#fff"/>');
  h+='<u class="hl a"></u>'+sv('pn','0 0 400 160',pine(40,1,'#2f6f5c')+pine(360,1.1,'#2f6f5c')+pine(120,.7,'#3a8070')+pine(300,.75,'#3a8070'));
  h+=sv('cb','0 0 140 110','<path d="M10 110 V56 L70 14 L130 56 V110Z" fill="#a9703a"/><path d="M0 60 L70 8 L140 60 L130 64 L70 20 L10 64Z" fill="#fff"/><rect x="92" y="14" width="14" height="26" fill="#7a4a24"/><rect x="90" y="8" width="18" height="8" fill="#fff"/><rect x="28" y="66" width="30" height="26" fill="#ffd36a" class="wn"/><path d="M43 66 V92 M28 79 H58" stroke="#7a4a24" stroke-width="3"/><rect x="82" y="72" width="30" height="38" fill="#6b3f1e"/>');
  h+=many(5,i=>'<i class="sk" style="left:'+(81+i*.2)+'%;--w:'+fx(rr(6,22))+'px;'+tm(4,5)+'"></i>');
  h+='<u class="hl b"></u>'+snowman('s1')+snowman('s2');
  h+=many(34,()=>'<i class="sn" style="--x:'+fx(rr(0,100))+'%;--z:'+fx(rr(3,9))+'px;--w:'+fx(rr(-60,60))+'px;'+tm(7,16)+'"></i>');
  h+=many(14,()=>'<i class="gl" style="left:'+fx(rr(2,98))+'%;top:'+fx(rr(30,95))+'%;'+tm(2,4)+'"></i>');
  h+='<u class="vg"></u>';
  return h};
const kiCss=BASE+`
§O{background:linear-gradient(#b9dcf7 0%,#d8ecfb 45%,#f2f9ff 100%)}
§O .mn{right:14%;top:6%;width:min(26vw,100px);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,#fff,#f0f8ff 60%,rgba(255,255,255,0) 72%)}
§O .au{inset:0 0 50% 0;background:radial-gradient(60% 50% at 30% 30%,rgba(140,230,255,.35),transparent),radial-gradient(60% 50% at 75% 20%,rgba(200,170,255,.3),transparent);animation:os2-drift 14s ease-in-out infinite}
§O .mt{left:0;right:0;bottom:30%;width:100%;height:auto;opacity:.85}
§O .hl{left:-10%;right:-10%;border-radius:50% 50% 0 0}
§O .hl.a{bottom:-6%;height:36%;background:linear-gradient(#e9f4ff,#cfe3f6)}
§O .hl.b{bottom:-12%;height:26%;background:linear-gradient(#fff,#dcecfa)}
§O .pn{left:0;right:0;bottom:8%;width:100%;height:auto}
§O .cb{left:70%;bottom:19%;width:min(34vw,150px);height:auto;filter:drop-shadow(0 4px 6px rgba(60,90,130,.3))}
§O .wn{animation:os2-flick 2.5s infinite}
§O .sk{bottom:42%;width:12px;height:12px;border-radius:50%;background:rgba(120,140,160,.45);animation:os2-puff var(--t) ease-out var(--d) infinite;transform-origin:50% 100%}
§O .sm{height:auto;filter:drop-shadow(0 3px 4px rgba(60,90,130,.35))}
§O .s1{left:-1%;bottom:2%;width:min(34vw,180px);animation:os2-bob 4s ease-in-out infinite}
§O .s2{right:20%;bottom:0;width:min(24vw,128px);animation:os2-bob 5s ease-in-out -2s infinite}
§O .ar{transform-origin:86px 76px;animation:os2-wave 1.6s ease-in-out infinite}
§O .sn{top:-3vh;width:var(--z);height:var(--z);border-radius:50%;background:#fff;box-shadow:0 0 5px 1px rgba(150,190,230,.9);animation:os2-fall var(--t) linear var(--d) infinite}
§O .gl{width:8px;height:8px;background:radial-gradient(#fff,rgba(160,210,255,.0) 70%);box-shadow:0 0 6px 2px #fff;animation:os2-sp var(--t) ease-in-out var(--d) infinite}
§O .vg{background:radial-gradient(ellipse at 50% 50%,transparent 60%,rgba(120,170,220,.4))}`;

/* ───── YAĞMURLU GECE ───── */
const bldg=()=>{let h='',x=0;const cols=['#0b1022','#101733','#0d1428','#141b3c'];
  while(x<400){const w=rr(26,56),ht=rr(90,235),y=250-ht;h+='<rect x="'+fx(x)+'" y="'+fx(y)+'" width="'+fx(w)+'" height="'+fx(ht)+'" fill="'+cols[Math.floor(rr(0,4))]+'"/>';
    for(let wy=y+8;wy<246;wy+=11)for(let wx=x+5;wx<x+w-6;wx+=9)if(Math.random()<.4)h+='<rect class="wi" x="'+fx(wx)+'" y="'+fx(wy)+'" width="4.5" height="5.5" fill="'+(Math.random()<.2?'#7fd1ff':'#ffd27a')+'" style="'+tm(2,6)+'"/>';
    x+=w+rr(0,4)}
  return h};
const yaHtml=()=>{
  let h='<u class="fl"></u><u class="cl" style="top:4%;--t:70s;--d:-10s"></u><u class="cl" style="top:12%;--t:95s;--d:-50s"></u>';
  h+=sv('bo','0 0 120 260','<path d="M70 0 L40 90 L62 90 L30 190 L90 70 L66 70 L96 0Z" fill="#fff" opacity=".95"/><path d="M70 0 L40 90 L62 90 L30 190 L90 70 L66 70 L96 0Z" fill="#aaccff" opacity=".6" transform="translate(2 0)"/>');
  h+=sv('ci','0 0 400 250',bldg()+'<g transform="translate(300 20)"><path d="M0 0 l6 -7 l6 7z" fill="#0d1428"/></g>');
  h+=sv('ct','0 0 60 40','<path d="M4 40 L4 24 Q2 18 8 16 L8 6 L14 12 L26 12 L32 6 L32 16 Q38 18 34 26 L34 40Z" fill="#05070f"/><circle cx="13" cy="19" r="2" fill="#ffe14a"/><circle cx="25" cy="19" r="2" fill="#ffe14a"/><path d="M34 34 Q52 34 50 18" stroke="#05070f" stroke-width="4" fill="none"/>');
  h+='<u class="lp"></u>'+sv('lm','0 0 30 160','<rect x="13" y="30" width="4" height="130" fill="#0a0d1a"/><rect x="6" y="22" width="18" height="10" rx="3" fill="#ffe8a0"/>');
  h+='<u class="lc"></u>';
  h+=many(46,()=>'<i class="rn" style="--x:'+fx(rr(0,100))+'%;--h:'+fx(rr(14,30))+'px;--w:-30px;--t:'+fx(rr(.55,1.1))+'s;--d:-'+fx(rr(0,2))+'s"></i>');
  h+='<u class="pu"></u>'+many(5,i=>'<u class="rp" style="left:'+fx(rr(8,88))+'%;bottom:'+fx(rr(1,8))+'%;--d:-'+fx(i*.5)+'s"></u>')+'<u class="ms"></u><u class="vg"></u><u class="fa"></u>';
  return h};
const yaCss=BASE+`
§O{background:linear-gradient(#070a1a 0%,#16183a 45%,#2a2152 78%,#3a2a58 100%)}
§O .fl{inset:0;background:#cfe0ff;animation:os2-flash 9s linear infinite;mix-blend-mode:screen}
§O .cl{left:0;width:60vw;height:20vh;border-radius:50%;background:radial-gradient(ellipse,rgba(10,12,28,.9),rgba(10,12,28,0) 70%);animation:os2-cloud var(--t) linear var(--d) infinite}
§O .bo{left:30%;top:0;width:min(22vw,90px);height:auto;filter:drop-shadow(0 0 10px #9cf);animation:os2-bolt 9s linear infinite}
§O .ci{left:0;right:0;bottom:12%;width:100%;height:auto}
§O .wi{animation:os2-win var(--t) ease-in-out var(--d) infinite}
§O .ct{left:6%;bottom:36%;width:42px;height:auto}
§O .lp{left:76%;bottom:6%;width:130px;height:55%;background:conic-gradient(from 180deg at 50% 0,transparent 160deg,rgba(255,232,160,.0) 165deg,rgba(255,232,160,.3) 180deg,rgba(255,232,160,0) 195deg,transparent 200deg);transform:translateX(-35%);display:none}
§O .lm{right:12%;bottom:10%;height:min(44vh,300px);width:auto;filter:drop-shadow(0 0 14px rgba(255,220,140,.9))}
§O .lc{right:calc(12% - 70px);bottom:6%;width:170px;height:45vh;background:linear-gradient(rgba(255,226,150,.28),transparent 90%);clip-path:polygon(40% 0,60% 0,100% 100%,0 100%)}
§O .rn{top:-6vh;width:1.5px;height:var(--h);background:linear-gradient(rgba(190,215,255,0),rgba(190,215,255,.75));transform:rotate(12deg);animation:os2-fall var(--t) linear var(--d) infinite}
§O .pu{left:0;right:0;bottom:0;height:12%;background:linear-gradient(#2a2656,#4a3a78 60%,#2a2142)}
§O .rp{width:60px;height:14px;border:1.5px solid rgba(210,225,255,.7);border-radius:50%;animation:os2-rip 2.2s ease-out var(--d) infinite}
§O .ms{left:0;right:0;bottom:8%;height:22%;background:linear-gradient(transparent,rgba(160,150,220,.3),transparent);animation:os2-drift 10s ease-in-out infinite}
§O .vg{background:radial-gradient(ellipse at 50% 50%,transparent 50%,rgba(0,0,12,.65))}
§O .fa{inset:0;background:linear-gradient(rgba(10,10,30,0) 55%,rgba(10,10,30,.25))}`;

/* ───── GALAKSİ ───── */
const gaHtml=()=>{
  let h='<u class="nb n1"></u><u class="nb n2"></u><u class="nb n3"></u><u class="nb n4"></u>';
  h+=many(80,()=>{const s=rr(1,3.2);return '<i class="st" style="left:'+fx(rr(0,100))+'%;top:'+fx(rr(0,100))+'%;width:'+fx(s)+'px;height:'+fx(s)+'px;'+tm(2,6)+'"></i>'});
  h+='<u class="gx"><u class="gc"></u></u>';
  h+=sv('pl','0 0 200 200','<defs><radialGradient id="pg" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ffd9a0"/><stop offset=".55" stop-color="#d9743a"/><stop offset="1" stop-color="#4a1a2a"/></radialGradient></defs><ellipse cx="100" cy="104" rx="98" ry="22" fill="none" stroke="#e9c58a" stroke-width="9" opacity=".6" transform="rotate(-18 100 100)"/><circle cx="100" cy="100" r="52" fill="url(#pg)"/><path d="M52 90 Q100 80 150 96 M50 108 Q100 120 150 112" stroke="#b25a2a" stroke-width="5" fill="none" opacity=".6"/><path d="M6 118 Q100 150 194 84" fill="none" stroke="#f2d49a" stroke-width="7" fill="none" opacity=".75" transform="rotate(-18 100 100)" stroke-dasharray="190 60"/>');
  h+='<u class="mo"></u>'+sv('as','0 0 80 110','<g><circle cx="40" cy="28" r="16" fill="#eef"/><rect x="26" y="20" width="28" height="16" rx="8" fill="#223a7a"/><rect x="22" y="42" width="36" height="36" rx="10" fill="#e8ecff"/><rect x="2" y="48" width="22" height="9" rx="4" fill="#e8ecff"/><rect x="56" y="48" width="22" height="9" rx="4" fill="#e8ecff"/><rect x="26" y="76" width="11" height="26" rx="5" fill="#e8ecff"/><rect x="43" y="76" width="11" height="26" rx="5" fill="#e8ecff"/><rect x="30" y="52" width="20" height="10" rx="3" fill="#7a8cff"/></g>');
  h+='<u class="cm"></u><u class="cm c2"></u><u class="vg"></u>';
  return h};
const gaCss=BASE+`
§O{background:radial-gradient(120% 80% at 50% 30%,#150a33,#05010f 70%)}
§O .nb{border-radius:50%;filter:blur(18px);animation:os2-drift 18s ease-in-out infinite}
§O .n1{left:-20%;top:2%;width:90%;height:50%;background:radial-gradient(ellipse,rgba(236,72,153,.7),rgba(168,85,247,.3) 55%,transparent 72%)}
§O .n2{right:-25%;top:30%;width:100%;height:50%;background:radial-gradient(ellipse,rgba(34,211,238,.55),rgba(59,130,246,.25) 55%,transparent 72%);animation-delay:-6s}
§O .n3{left:-10%;bottom:-6%;width:90%;height:48%;background:radial-gradient(ellipse,rgba(251,146,60,.5),rgba(190,60,140,.25) 55%,transparent 72%);animation-delay:-11s}
§O .n4{left:25%;top:35%;width:70%;height:30%;background:radial-gradient(ellipse,rgba(120,70,255,.5),transparent 70%);animation-delay:-3s}
§O .st{border-radius:50%;background:#fff;box-shadow:0 0 5px 1px rgba(200,220,255,.8);animation:os2-tw var(--t) ease-in-out var(--d) infinite}
§O .gx{right:-22%;top:8%;width:min(86vw,70vh);aspect-ratio:1.5;border-radius:50%;background:conic-gradient(from 0deg,transparent,rgba(190,170,255,.55),transparent 22%,rgba(120,200,255,.5) 40%,transparent 62%,rgba(255,150,220,.5) 80%,transparent);filter:blur(5px);transform:rotate(-24deg) scaleY(.55);-webkit-mask:radial-gradient(closest-side,#000 25%,transparent);mask:radial-gradient(closest-side,#000 25%,transparent);animation:os2-spin 160s linear infinite}
§O .gc{left:38%;top:34%;width:24%;height:32%;border-radius:50%;background:radial-gradient(#fff6d8,rgba(255,220,150,.6) 40%,transparent 70%)}
§O .pl{left:-8%;bottom:14%;width:min(52vw,230px);height:auto;animation:os2-bob 9s ease-in-out infinite}
§O .mo{right:8%;bottom:34%;width:26px;height:26px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff,#9aa3c0 60%,#4a5070)}
§O .as{left:62%;top:44%;width:min(18vw,70px);height:auto;animation:os2-wob 7s ease-in-out infinite;opacity:.95;filter:drop-shadow(0 0 8px rgba(160,180,255,.6))}
§O .cm{right:0;top:10%;width:130px;height:3px;background:linear-gradient(90deg,#fff,rgba(160,200,255,0));border-radius:3px;box-shadow:0 0 12px 3px rgba(200,220,255,.8);animation:os2-comet 11s linear infinite}
§O .c2{top:42%;animation-delay:-5s;width:90px}
§O .vg{background:radial-gradient(ellipse at 50% 50%,transparent 55%,rgba(0,0,10,.6))}`;

/* ───── CANAVAR AVCISI ───── */
const wiHtml=()=>{
  let h='<u class="wd"></u><u class="gr"></u>';
  h+=sv('mp','0 0 240 200',`<path d="M10 14 Q120 4 232 12 L226 188 Q120 198 14 190Z" fill="#d8bf8a" stroke="#8a6a38" stroke-width="3"/><path d="M10 14 Q4 100 14 190" stroke="#b79a5e" stroke-width="8" fill="none"/>
   <path d="M40 150 Q70 90 100 110 T150 70 T200 50" stroke="#7a4a1a" stroke-width="2" fill="none" stroke-dasharray="5 5"/><path d="M40 60 L56 40 L72 62 L86 44 L100 70Z M150 130 L170 100 L190 134Z" fill="none" stroke="#6b4a24" stroke-width="2"/><circle cx="200" cy="50" r="6" fill="none" stroke="#a02020" stroke-width="2.5"/><path d="M194 44 L206 56 M206 44 L194 56" stroke="#a02020" stroke-width="2.5"/>
   <path d="M120 150 q10 -16 20 0 q-10 10 -20 0" fill="#8a2b2b" opacity=".6"/><g stroke="#6b4a24" stroke-width="1.5" opacity=".7"><path d="M30 28 H100 M30 36 H80 M140 160 H210 M140 168 H190"/></g>`);
  h+=sv('sd','0 0 300 40','<rect x="30" y="14" width="190" height="12" rx="3" fill="url(#bl)"/><defs><linearGradient id="bl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4f8ff"/><stop offset=".5" stop-color="#9eb0c4"/><stop offset="1" stop-color="#5a6a7c"/></linearGradient></defs><path d="M220 14 L296 20 L220 26Z" fill="#cfd9e6"/><path d="M40 18 H214" stroke="#fff" stroke-width="1.5" opacity=".8"/><rect x="8" y="12" width="26" height="16" rx="4" fill="#3a2a16"/><rect x="24" y="4" width="8" height="32" rx="3" fill="#b8902e"/><circle cx="6" cy="20" r="6" fill="#b8902e"/>');
  const pot=(c,x,y,sz,d)=>sv('po','0 0 40 70','<defs><linearGradient id="pg'+c.slice(1)+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+c+'"/><stop offset="1" stop-color="#000" stop-opacity=".5"/></linearGradient></defs><rect x="15" y="2" width="10" height="14" rx="2" fill="#7a5a30"/><path d="M14 16 H26 L38 46 Q40 66 20 68 Q0 66 2 46Z" fill="url(#pg'+c.slice(1)+')" stroke="#d8d8d8" stroke-opacity=".5" stroke-width="1.5"/><circle class="bu" cx="14" cy="50" r="2.4" fill="#fff" opacity=".7" style="--d:-'+d+'s"/><circle class="bu" cx="26" cy="54" r="1.8" fill="#fff" opacity=".7" style="--d:-'+(d+.8)+'s"/>','left:'+x+'%;top:'+y+'%;width:'+sz+'px;--c:'+c);
  h+=pot('#3ee06a',6,17,34,.2)+pot('#e0453a',87,28,30,1)+pot('#4a9eff',90,52,28,.5)+pot('#b04aff',4,50,30,1.4);
  h+=sv('md','0 0 80 80','<circle cx="40" cy="40" r="34" fill="#8a8a92" stroke="#d6d6de" stroke-width="3"/><circle cx="40" cy="40" r="24" fill="none" stroke="#33333a" stroke-width="2"/><path d="M40 16 L40 64 M16 40 H64 M24 24 L56 56 M56 24 L24 56" stroke="#33333a" stroke-width="2.5"/><circle cx="40" cy="40" r="7" fill="#d9b25a"/>','right:6%;bottom:30%;width:52px;transform:rotate(14deg);filter:drop-shadow(0 4px 4px #000a)');
  h+=sv('bk','0 0 90 110','<path d="M6 12 L84 6 L88 98 L10 104Z" fill="#4a1c1c" stroke="#2a0e0e" stroke-width="3"/><path d="M14 18 L78 14 L80 90 L18 94Z" fill="none" stroke="#d9b25a" stroke-width="2"/><circle cx="46" cy="52" r="14" fill="none" stroke="#d9b25a" stroke-width="2.4"/><path d="M38 46 L46 58 L54 46 M40 62 H52" stroke="#d9b25a" stroke-width="2" fill="none"/>','left:4%;bottom:26%;width:62px;transform:rotate(-10deg);filter:drop-shadow(0 4px 4px #000a)');
  h+=many(7,i=>'<i class="co" style="left:'+fx(rr(60,86))+'%;top:'+fx(rr(70,90))+'%;transform:rotate('+Math.floor(rr(0,90))+'deg)"></i>');
  const candle=(l,t,s)=>'<u class="cd" style="left:'+l+'%;top:'+t+'%;--s:'+s+'"><u class="cg"></u><u class="cw"></u><u class="fm"></u><u class="sm"></u></u>';
  h+=candle(10,4,1)+candle(86,6,.9)+candle(46,72,.8);
  h+=many(18,()=>'<i class="mt" style="left:'+fx(rr(0,100))+'%;top:'+fx(rr(0,100))+'%;'+tm(5,9)+'"></i>');
  h+='<u class="vg"></u>';
  return h};
const wiCss=BASE+`
§O{background:#1a0f08}
§O .wd{inset:-5%;background:
 repeating-linear-gradient(90deg,transparent 0 118px,rgba(0,0,0,.65) 118px 121px,transparent 121px 128px),
 repeating-linear-gradient(0deg,rgba(255,220,160,.04) 0 2px,rgba(0,0,0,.06) 2px 5px),
 linear-gradient(#4a2c16,#2a170a 60%,#3a2210)}
§O .wd::after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(90deg,rgba(0,0,0,.18) 0 40px,rgba(255,200,130,.07) 40px 90px,rgba(0,0,0,.12) 90px 128px)}
§O .gr{inset:0;background:radial-gradient(40% 24% at 14% 10%,rgba(255,180,80,.45),transparent),radial-gradient(36% 22% at 88% 12%,rgba(255,170,70,.4),transparent),radial-gradient(40% 20% at 46% 78%,rgba(255,170,70,.28),transparent);animation:os2-flick 3s infinite;mix-blend-mode:screen}
§O .mp{left:20%;top:12%;width:min(72vw,300px);height:auto;transform:rotate(-6deg);opacity:.5;filter:drop-shadow(0 6px 8px #000a)}
§O .sd{left:-2%;bottom:14%;width:min(86vw,380px);height:auto;transform:rotate(-8deg);filter:drop-shadow(0 6px 6px #000b);opacity:.95}
§O .po{height:auto;filter:drop-shadow(0 0 12px var(--c)) drop-shadow(0 4px 4px #000b);animation:os2-wob 5s ease-in-out infinite}
§O .bu{animation:os2-rise 2.4s linear var(--d) infinite;transform-box:fill-box}
§O .co{width:12px;height:12px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#ffe9a0,#c9922a 70%);box-shadow:0 2px 3px #000a}
§O .cd{width:calc(26px * var(--s));height:calc(60px * var(--s))}
§O .cw{left:30%;right:30%;bottom:0;height:60%;background:linear-gradient(90deg,#d8c9a0,#f4ead0,#b8a878);border-radius:3px}
§O .fm{left:35%;bottom:58%;width:30%;height:34%;background:radial-gradient(ellipse at 50% 80%,#fff6c0,#ffb020 55%,#ff5a10 85%,transparent);border-radius:50% 50% 50% 50%/70% 70% 30% 30%;animation:os2-fire .4s ease-in-out infinite;filter:blur(.3px)}
§O .cg{left:-90%;right:-90%;top:-60%;bottom:-60%;background:radial-gradient(circle,rgba(255,190,90,.45),transparent 62%);animation:os2-flick 1.6s infinite}
§O .sm{left:46%;bottom:90%;width:8px;height:8px;border-radius:50%;background:rgba(220,220,220,.35);animation:os2-smoke 3s ease-out infinite;--w:10px}
§O .mt{width:3px;height:3px;border-radius:50%;background:#ffd890;box-shadow:0 0 5px 1px #ffb040;animation:os2-mote var(--t) ease-in-out var(--d) infinite}
§O .vg{background:radial-gradient(ellipse at 50% 50%,transparent 40%,rgba(0,0,0,.78))}`;

/* ───── BLOCKCRAFT ───── */
const steps=(w,hmin,hmax,col,seed,sp)=>{let d='M0 100 ',y=rr(hmin,hmax);for(let x=0;x<=w;x+=sp){if(Math.random()<.45)y=Math.max(hmin,Math.min(hmax,y+(Math.random()<.5?-sp:sp)));d+='V'+y+'h'+sp+' '}return '<path d="'+d+'V100Z" fill="'+col+'"/>'};
const tree=(x,y,s)=>'<g transform="translate('+x+' '+y+') scale('+s+')" shape-rendering="crispEdges"><rect x="-2" y="-20" width="4" height="20" fill="#6b4a26"/><rect x="-10" y="-34" width="20" height="14" fill="#3f9a3a"/><rect x="-6" y="-42" width="12" height="8" fill="#52b248"/><rect x="-10" y="-30" width="4" height="4" fill="#2f7a2c"/><rect x="4" y="-26" width="4" height="4" fill="#2f7a2c"/></g>';
const mcHtml=()=>{
  let h='<u class="sk"></u><u class="sn"></u>';
  h+=many(10,i=>'<u class="cl" style="top:'+fx(4+i*7+rr(0,4))+'%;--t:'+fx(rr(60,120))+'s;--d:-'+fx(rr(0,110))+'s;--s:'+fx(rr(.7,1.4))+'"></u>');
  h+=sv('h1','0 0 400 100','<g shape-rendering="crispEdges">'+steps(400,40,70,'#4d7fa8',1,10)+'</g>');
  h+=sv('h2','0 0 400 100','<g shape-rendering="crispEdges">'+steps(400,50,76,'#3d8a45',2,10)+'</g>'+tree(60,64,1.1)+tree(180,70,.9)+tree(320,60,1.2));
  h+=sv('h3','0 0 400 100','<g shape-rendering="crispEdges">'+steps(400,64,84,'#2f7a38',3,10)+'</g>'+tree(130,78,1.3)+tree(260,76,1.1));
  h+='<u class="gd"></u>';
  const torch=(x)=>'<u class="tc" style="left:'+x+'%"><u class="tf"></u></u>';
  h+=torch(8)+torch(92);
  h+=many(12,()=>'<i class="ff" style="left:'+fx(rr(0,100))+'%;top:'+fx(rr(40,92))+'%;'+tm(4,8)+'"></i>');
  h+=many(10,()=>'<i class="lf" style="--x:'+fx(rr(0,100))+'%;--w:'+fx(rr(-80,80))+'px;'+tm(10,18)+'"></i>');
  h+='<u class="vg"></u>';
  return h};
const mcCss=BASE+`
§O{background:linear-gradient(#5aa9ef 0%,#7cc4f6 50%,#bfe6ff 100%)}
§O .sk{right:10%;top:5%;width:min(18vw,70px);aspect-ratio:1;background:#fff5b0;box-shadow:0 0 0 6px #ffe86a,0 0 0 12px rgba(255,232,106,.4),0 0 60px 20px rgba(255,240,150,.5)}
§O .sn{display:none}
§O .cl{left:0;width:calc(120px * var(--s));height:calc(26px * var(--s));background:#fff;box-shadow:calc(24px * var(--s)) calc(-14px * var(--s)) 0 #fff,calc(50px * var(--s)) calc(-14px * var(--s)) 0 #fff,calc(72px * var(--s)) 0 0 #fff;opacity:.92;animation:os2-cloud var(--t) linear var(--d) infinite}
§O .h1,§O .h2,§O .h3{left:0;right:0;width:100%;height:auto}
§O .h1{bottom:34%}§O .h2{bottom:20%}§O .h3{bottom:8%}
§O .gd{left:0;right:0;bottom:0;height:12%;background:linear-gradient(#5fbf4a 0 22%,#7a5230 22% 100%);background-image:linear-gradient(#5fbf4a 0 22%,transparent 22%),repeating-linear-gradient(90deg,rgba(0,0,0,.18) 0 4px,transparent 4px 20px),repeating-linear-gradient(0deg,rgba(0,0,0,.14) 0 4px,transparent 4px 20px);background-color:#7a5230;image-rendering:pixelated}
§O .tc{bottom:12%;width:8px;height:30px;background:#6b4a26}
§O .tf{left:-4px;top:-14px;width:16px;height:14px;background:#ffb020;box-shadow:inset 4px 4px 0 #fff2a0,0 0 24px 10px rgba(255,170,40,.65);animation:os2-flick .6s steps(2) infinite}
§O .ff{width:4px;height:4px;background:#e8ff6a;box-shadow:0 0 8px 2px #c8ff40;animation:os2-mote var(--t) steps(6) var(--d) infinite}
§O .lf{top:-4vh;width:8px;height:8px;background:#4cad40;box-shadow:inset -2px -2px 0 #2f7a2c;animation:os2-fall var(--t) linear var(--d) infinite}
§O .vg{background:radial-gradient(ellipse at 50% 50%,transparent 62%,rgba(0,40,90,.35))}`;

OSEKLE('ejder',{html:ejHtml,css:ejCss});
OSEKLE('okyanus',{html:okHtml,css:okCss});
OSEKLE('petal',{html:peHtml,css:peCss});
OSEKLE('kis',{html:kiHtml,css:kiCss});
OSEKLE('yagmur',{html:yaHtml,css:yaCss});
OSEKLE('galaksi',{html:gaHtml,css:gaCss});
OSEKLE('witcher',{html:wiHtml,css:wiCss});
OSEKLE('minecraft',{html:mcHtml,css:mcCss});
})();
