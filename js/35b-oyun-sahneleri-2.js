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
@keyframes os2-breath{0%,100%{transform:translateX(-50%) scale(1)}50%{transform:translateX(-50%) scale(1.03)}}
@keyframes os2-blink2{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.1)}}
@keyframes os2-torch{0%,100%{opacity:.85}12%{opacity:1}27%{opacity:.7}41%{opacity:.95}58%{opacity:.78}76%{opacity:1}88%{opacity:.82}}
@keyframes os2-glint{0%,55%{transform:translateX(100px);opacity:0}60%{opacity:1}85%{transform:translateX(600px);opacity:1}90%,100%{transform:translateX(620px);opacity:0}}
@keyframes os2-spark{from{transform:translate(0,0);opacity:1}to{transform:translate(var(--w,0px),-12vh);opacity:0}}
@keyframes os2-blink3{0%,44%,50%,100%{transform:scaleY(1)}47%{transform:scaleY(.06)}}
@keyframes os2-look{0%,30%{transform:translateX(0)}40%,60%{transform:translateX(-22px)}70%,100%{transform:translateX(16px)}}
@keyframes os2-eye{0%,90%,100%{transform:scaleX(1)}94%{transform:scaleX(4)}}
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
  const O='stroke="#ff7a22" stroke-opacity=".35" stroke-width="1.4"';
  const eye=`<g class="ey"><defs></defs>
    <path d="M44 70 Q118 34 184 100 Q108 120 44 70Z" fill="url(#ejg)" stroke="#3a0a02" stroke-width="3"/>
    <g clip-path="url(#ejc)"><g class="pp"><ellipse cx="116" cy="82" rx="7" ry="30" fill="#120200"/><ellipse cx="116" cy="82" rx="16" ry="34" fill="#ff5a00" opacity=".25"/></g></g>
    <ellipse cx="96" cy="70" rx="7" ry="4" fill="#fff8d0" opacity=".85"/>
   </g>`;
  let h='<u class="hg"></u>'+sv('ej','0 0 400 170',`<defs>
    <radialGradient id="ejg" cx=".55" cy=".55" r=".6"><stop offset="0" stop-color="#fff4a8"/><stop offset=".35" stop-color="#ffc21a"/><stop offset=".75" stop-color="#f06a0a"/><stop offset="1" stop-color="#7a1a02"/></radialGradient>
    <clipPath id="ejc"><path d="M44 70 Q118 34 184 100 Q108 120 44 70Z"/></clipPath></defs>
   <g class="ew">${eye}</g><g class="ew" transform="translate(400 0) scale(-1 1)">${eye}</g>`);
  for(let i=0;i<34;i++){const x=rr(-2,100),y=rr(0,1);h+='<u class="cn" style="left:'+fx(x)+'%;bottom:'+fx(Math.max(0,(9-Math.abs(x-50)/9)*y))+'%;transform:rotate('+fx(rr(-30,30))+'deg)"></u>'}
  h+=many(3,()=>'<u class="gm" style="left:'+fx(rr(8,92))+'%;bottom:'+fx(rr(1,5))+'%;--c:'+['#ff3b5c','#3bd1ff','#4dff88','#c77dff'][Math.floor(rr(0,4))]+'"></u>');
  h+=many(5,()=>'<u class="gl" style="left:'+fx(rr(5,95))+'%;bottom:'+fx(rr(1,8))+'%;'+tm(1.5,3.5)+'"></u>');
  h+=many(10,()=>'<i class="em" style="--x:'+fx(rr(0,100))+'%;--z:'+fx(rr(2,4))+'px;--w:'+fx(rr(-40,40))+'px;'+tm(6,11)+'"></i>');
  h+='<u class="vg"></u>';
  return h};
const ejCss=BASE+`
§O{background:radial-gradient(120% 70% at 50% 100%,#3a1206,#140503 55%,#050101)}
§O .hg{left:0;right:0;top:0;height:40%;background:radial-gradient(60% 60% at 50% 40%,rgba(255,110,20,.22),transparent 70%);animation:os2-flick 3s infinite}
§O .ej{left:50%;top:3%;width:min(104vw,520px);height:auto;transform:translateX(-50%);filter:drop-shadow(0 0 18px rgba(255,120,20,.55))}
§O .ew{animation:os2-flick 2.4s infinite}
§O .ey{transform-box:fill-box;transform-origin:center;animation:os2-blink3 7s ease-in-out infinite}
§O .pp{animation:os2-look 7s ease-in-out infinite}
§O .nz{animation:os2-flick 1.2s infinite}
§O .sm{top:20%;width:14px;height:14px;border-radius:50%;background:rgba(190,150,130,.3);animation:os2-puff var(--t) ease-out var(--d) infinite}
§O .cn{width:16px;height:7px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#fff4b0,#fbbf24 50%,#a16207);box-shadow:0 1px 1px rgba(0,0,0,.5)}
§O .gm{width:10px;height:10px;background:var(--c);transform:rotate(45deg);box-shadow:0 0 10px var(--c),inset -2px -2px 0 rgba(0,0,0,.3)}
§O .gl{width:10px;height:10px;background:radial-gradient(circle,#fff,rgba(255,240,170,0) 65%);box-shadow:0 0 8px 2px rgba(253,224,71,.7);opacity:0;animation:os2-sp var(--t) ease-in-out var(--d) infinite}
§O .em{top:100%;width:var(--z);height:var(--z);border-radius:50%;background:#ffb347;box-shadow:0 0 8px 2px rgba(255,140,40,.85);animation:os2-rise var(--t) ease-out var(--d) infinite}
§O .vg{background:radial-gradient(ellipse at 50% 55%,transparent 45%,rgba(0,0,0,.65))}`;

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
  <g class="ar"><path d="M86 76 L112 60 M112 60 L118 52 M112 60 L120 62" stroke="#6b4426" stroke-width="3.5" stroke-linecap="round" fill="none"/></g>`);
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
  h+=sv('gpl','0 0 200 200','<defs><radialGradient id="pg" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ffd9a0"/><stop offset=".55" stop-color="#d9743a"/><stop offset="1" stop-color="#4a1a2a"/></radialGradient></defs><g transform="rotate(-18 100 100)"><path d="M2 100 A98 24 0 0 1 198 100" fill="none" stroke="#e9c58a" stroke-width="10" opacity=".55"/><path d="M14 100 A86 19 0 0 1 186 100" fill="none" stroke="#b8925a" stroke-width="3" opacity=".5"/></g><circle cx="100" cy="100" r="52" fill="url(#pg)"/><path d="M54 88 Q100 78 148 94 M50 108 Q100 120 150 112" stroke="#b25a2a" stroke-width="5" fill="none" opacity=".55"/><g transform="rotate(-18 100 100)"><path d="M2 100 A98 24 0 0 0 198 100" fill="none" stroke="#f2d49a" stroke-width="10" opacity=".9"/><path d="M14 100 A86 19 0 0 0 186 100" fill="none" stroke="#c8a064" stroke-width="3" opacity=".7"/></g>');
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
§O .gpl{left:-8%;bottom:14%;width:min(52vw,230px);height:auto;animation:os2-bob 9s ease-in-out infinite}
§O .mo{right:8%;bottom:34%;width:26px;height:26px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff,#9aa3c0 60%,#4a5070)}
§O .as{left:62%;top:44%;width:min(18vw,70px);height:auto;animation:os2-wob 7s ease-in-out infinite;opacity:.95;filter:drop-shadow(0 0 8px rgba(160,180,255,.6))}
§O .cm{right:0;top:10%;width:130px;height:3px;background:linear-gradient(90deg,#fff,rgba(160,200,255,0));border-radius:3px;box-shadow:0 0 12px 3px rgba(200,220,255,.8);animation:os2-comet 11s linear infinite}
§O .c2{top:42%;animation-delay:-5s;width:90px}
§O .vg{background:radial-gradient(ellipse at 50% 50%,transparent 55%,rgba(0,0,10,.6))}`;

/* ───── CANAVAR AVCISI ───── */
const wiHtml=()=>{
  // karanlık taş duvar
  let br='';for(let i=0;i<26;i++)br+='<rect x="'+Math.floor(rr(0,10))*40+'" y="'+Math.floor(rr(0,20))*40+'" width="40" height="20" fill="#000" opacity="'+fx(rr(.08,.3))+'"/>';
  let h=sv('wl','0 0 400 800','<defs><pattern id="brk" width="80" height="40" patternUnits="userSpaceOnUse"><rect width="80" height="40" fill="#2b2420"/><rect x="2" y="2" width="36" height="16" fill="#342b26"/><rect x="42" y="2" width="36" height="16" fill="#2f2722"/><rect x="22" y="22" width="36" height="16" fill="#352c26"/><rect x="-18" y="22" width="36" height="16" fill="#30282300"/><rect x="62" y="22" width="36" height="16" fill="#2e2621"/></pattern></defs><rect width="400" height="800" fill="url(#brk)"/>'+br,'');
  h+='<u class="lt"></u>';
  // kılıç: kabza solda, bıçak sağa
  h+=sv('kl','0 0 600 60',`<defs>
   <linearGradient id="kb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9eef5"/><stop offset=".45" stop-color="#9aa6b4"/><stop offset=".55" stop-color="#6b7684"/><stop offset="1" stop-color="#3a424c"/></linearGradient>
   <linearGradient id="kw" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#ffcf7a" stop-opacity=".95"/><stop offset=".55" stop-color="#ff9a3c" stop-opacity=".35"/><stop offset="1" stop-color="#ff9a3c" stop-opacity="0"/></linearGradient>
   <linearGradient id="kg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff8e0" stop-opacity=".95"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
   <clipPath id="kc"><path d="M130 18 L556 21 L598 30 L556 39 L130 42Z"/></clipPath></defs>
   <path d="M130 18 L556 21 L598 30 L556 39 L130 42Z" fill="url(#kb)" stroke="#20252b" stroke-width="1.2"/>
   <path d="M136 30 L520 30" stroke="#59636f" stroke-width="2.4"/>
   <g clip-path="url(#kc)"><rect class="kwr" x="120" y="0" width="490" height="60" fill="url(#kw)"/><rect class="kgl" x="0" y="0" width="70" height="60" fill="url(#kg)"/></g>
   <path d="M118 6 Q126 30 118 54 L132 54 Q138 30 132 6Z" fill="#9a7a3a" stroke="#3a2a10" stroke-width="1.5"/>
   <rect x="34" y="24" width="86" height="12" rx="4" fill="#3a2414"/>
   <path d="M40 24 L52 36 M54 24 L66 36 M68 24 L80 36 M82 24 L94 36 M96 24 L108 36" stroke="#5a3a20" stroke-width="3"/>
   <circle cx="26" cy="30" r="11" fill="#b8902e" stroke="#3a2a10" stroke-width="1.5"/><circle cx="23" cy="27" r="3" fill="#ffe9a0" class="kpm"/>`);
  // meşale
  h+='<u class="tg"></u>'+sv('ts','0 0 60 160','<path d="M14 70 L46 70 L40 86 L20 86Z" fill="#4a3a2a" stroke="#1a120c" stroke-width="2"/><path d="M20 86 L40 86 L34 160 L26 160Z" fill="#5a3a1e"/><path d="M8 98 H52" stroke="#2a2a2e" stroke-width="5"/><path d="M14 70 Q30 64 46 70 L44 76 Q30 70 16 76Z" fill="#2a1a10"/>');
  h+='<u class="fl"><u class="f3"></u><u class="f2"></u><u class="f1"></u></u>';
  h+=many(12,()=>'<i class="km" style="left:'+fx(rr(47,53))+'%;--w:'+fx(rr(-50,50))+'px;'+tm(2,4)+'"></i>');
  h+=many(16,()=>'<i class="mt" style="left:'+fx(rr(10,90))+'%;top:'+fx(rr(10,90))+'%;'+tm(5,9)+'"></i>');
  h+='<u class="vg"></u>';
  return h};
const wiCss=BASE+`
§O{background:#0d0a08}
§O .wl{inset:0;width:100%;height:100%;opacity:.9}
§O .lt{inset:0;background:radial-gradient(70% 45% at 50% 12%,rgba(255,150,60,.38),rgba(255,120,40,.12) 45%,transparent 75%);mix-blend-mode:screen;animation:os2-torch 2.6s infinite}
§O .kl{left:50%;top:56%;width:min(92vh,150vw);height:auto;transform:translate(-50%,-50%) rotate(-58deg);filter:drop-shadow(0 6px 8px rgba(0,0,0,.85))}
§O .kwr{animation:os2-torch 2.6s infinite}
§O .kgl{animation:os2-glint 5s ease-in-out infinite}
§O .kpm{animation:os2-torch 2.6s infinite}
§O .ts{left:50%;top:1.5%;width:54px;height:auto;transform:translateX(-50%)}
§O .tg{left:50%;top:-6%;width:min(110vw,520px);aspect-ratio:1;transform:translateX(-50%);border-radius:50%;background:radial-gradient(circle,rgba(255,190,90,.55),rgba(255,120,40,.18) 35%,transparent 62%);animation:os2-torch 2.6s infinite}
§O .fl{left:50%;top:calc(1.5% - 2px);width:40px;height:62px;transform:translateX(-50%)}
§O .fl u{left:50%;bottom:0;border-radius:50% 50% 45% 45%/70% 70% 30% 30%;transform-origin:50% 100%;translate:-50% 0}
§O .f3{width:40px;height:62px;background:radial-gradient(ellipse at 50% 85%,#ff8a20,#e0400a 60%,transparent 75%);animation:os2-fire .5s ease-in-out infinite}
§O .f2{width:26px;height:44px;background:radial-gradient(ellipse at 50% 85%,#ffd040,#ff8a20 70%,transparent 80%);animation:os2-fire .38s ease-in-out infinite reverse}
§O .f1{width:11px;height:20px;background:radial-gradient(ellipse at 50% 80%,#fffbe0,#ffe070 70%,transparent 85%);animation:os2-fire .3s ease-in-out infinite}
§O .km{top:5%;width:3px;height:3px;border-radius:50%;background:#ffc060;box-shadow:0 0 6px 2px #ff7a14;animation:os2-spark var(--t) ease-out var(--d) infinite}
§O .mt{width:3px;height:3px;border-radius:50%;background:#ffd890;box-shadow:0 0 5px 1px #ffb040;opacity:.5;animation:os2-mote var(--t) ease-in-out var(--d) infinite}
§O .vg{background:radial-gradient(85% 70% at 50% 25%,transparent 30%,rgba(0,0,0,.6) 70%,rgba(0,0,0,.9))}`;

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
