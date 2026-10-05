// v25: Dört yeni sahneli temanın oyun içi arka planları: Saat İşleri, Gök Adaları, Lo-fi Oda, Pati Bahçesi.
// Hepsi kodla çizilir (SVG + CSS). Motor: js/35 (OSEKLE). Menü sahneleri js/27'de.
(function(){
if(!window.OSEKLE)return;
const sv=(c,vb,inner,st)=>'<svg class="'+c+'" viewBox="'+vb+'"'+(st?' style="'+st+'"':'')+'>'+inner+'</svg>';
const rr=(a,b)=>R(a,b),fx=n=>f1(n);
const many=(n,f)=>{let h='';for(let i=0;i<n;i++)h+=f(i);return h};
const tm=(a,b)=>'--t:'+fx(rr(a,b))+'s;--d:-'+fx(rr(0,b))+'s';
document.head.insertAdjacentHTML('beforeend','<style id="oyun-sahne-3">'+`
@keyframes os3-spin{to{transform:rotate(360deg)}}
@keyframes os3-rise{from{transform:translate(0,0) scale(.5);opacity:0}15%{opacity:.8}to{transform:translate(var(--w,0px),-30vh) scale(2.2);opacity:0}}
@keyframes os3-needle{0%,100%{transform:rotate(-40deg)}30%{transform:rotate(25deg)}45%{transform:rotate(10deg)}70%{transform:rotate(48deg)}85%{transform:rotate(-5deg)}}
@keyframes os3-glow{0%,100%{opacity:.65}50%{opacity:1}}
@keyframes os3-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes os3-pan{from{transform:translateX(-40vw)}to{transform:translateX(130vw)}}
@keyframes os3-up{from{transform:translate(0,0)}50%{transform:translate(20px,-40vh)}to{transform:translate(-10px,-85vh)}}
@keyframes os3-flap{0%,100%{transform:scaleY(1)}50%{transform:scaleY(-.6)}}
@keyframes os3-fall{from{stroke-dashoffset:0}to{stroke-dashoffset:-40}}
@keyframes os3-wave{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes os3-rock{0%,100%{transform:rotate(-3deg) translateY(0)}50%{transform:rotate(3deg) translateY(4px)}}
@keyframes os3-beam{0%{transform:scaleX(1);opacity:.85}25%{transform:scaleX(.05);opacity:.2}50%{transform:scaleX(-1);opacity:.85}75%{transform:scaleX(-.05);opacity:.2}100%{transform:scaleX(1);opacity:.85}}
@keyframes os3-tw{0%,100%{opacity:.2}50%{opacity:1}}
@keyframes os3-shim{0%,100%{opacity:.45;transform:scaleX(1)}50%{opacity:.85;transform:scaleX(1.15)}}
@keyframes os3-tail{0%,100%{transform:rotate(0)}50%{transform:rotate(-22deg)}}
@keyframes os3-leaf{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(4deg)}}
@keyframes os3-note{from{transform:translate(0,0) rotate(-10deg);opacity:0}15%{opacity:1}to{transform:translate(var(--w,20px),-26vh) rotate(15deg);opacity:0}}
@keyframes os3-rain{from{transform:translateY(-20%)}to{transform:translateY(120%)}}
@keyframes os3-blink{0%,100%{opacity:1}50%{opacity:.25}}
`+'</style>');
const BASE='§O svg{position:absolute;display:block;overflow:visible}§O .vg{inset:0}';

/* ───── SAAT İŞLERİ ───── */
const gear=(r,n,c,hole)=>{
  const R1=r,R0=r*.84,pts=[];
  for(let i=0;i<n;i++){const a=i/n*Math.PI*2,s=Math.PI*2/n;
    [[a,R0],[a+s*.12,R1],[a+s*.45,R1],[a+s*.57,R0]].forEach(p=>pts.push(fx(Math.cos(p[0])*p[1])+','+fx(Math.sin(p[0])*p[1])))}
  let spokes='';for(let i=0;i<5;i++){const a=i/5*Math.PI*2;spokes+='<path d="M0 0 L'+fx(Math.cos(a)*r*.7)+' '+fx(Math.sin(a)*r*.7)+'" stroke="'+c+'" stroke-width="'+fx(r*.12)+'"/>'}
  return '<g><polygon points="'+pts.join(' ')+'" fill="'+c+'" stroke="#2a1806" stroke-width="2"/><circle r="'+fx(r*.7)+'" fill="#1a1006"/>'+spokes+'<circle r="'+fx(r*.7)+'" fill="none" stroke="'+c+'" stroke-width="'+fx(r*.1)+'"/><circle r="'+fx(r*(hole||.18))+'" fill="'+c+'" stroke="#2a1806" stroke-width="2"/><circle r="'+fx(r*.07)+'" fill="#1a1006"/></g>'};
const gsv=(cl,r,n,c,st)=>sv('xg '+cl,(-r-2)+' '+(-r-2)+' '+(2*r+4)+' '+(2*r+4),'<defs></defs>'+gear(r,n,c),st);
const saHtml=()=>{
  let h='<u class="bg2"></u>';
  h+=gsv('a',100,20,'#b8862e','left:-18%;top:-6%;width:52vw;max-width:260px;--t:40s');
  h+=gsv('b',60,12,'#8a6224','left:22%;top:-3%;width:30vw;max-width:150px;--t:24s;animation-direction:reverse');
  h+=gsv('c',90,18,'#a77a2a','right:-16%;top:8%;width:46vw;max-width:230px;--t:36s;animation-direction:reverse');
  h+=gsv('d',120,24,'#8a6224','left:-22%;bottom:-8%;width:62vw;max-width:310px;--t:48s');
  h+=gsv('e',70,14,'#b8862e','right:-8%;bottom:6%;width:40vw;max-width:200px;--t:28s;animation-direction:reverse');
  h+=gsv('f',40,10,'#d4a040','right:24%;bottom:-2%;width:22vw;max-width:110px;--t:16s');
  // saat kadranı
  let tk='';for(let i=0;i<12;i++){const a=i/12*Math.PI*2;tk+='<path d="M'+fx(Math.sin(a)*40)+' '+fx(-Math.cos(a)*40)+' L'+fx(Math.sin(a)*(i%3?35:31))+' '+fx(-Math.cos(a)*(i%3?35:31))+'" stroke="#3a2410" stroke-width="'+(i%3?1.5:3)+'"/>'}
  h+=sv('xc','-52 -52 104 104','<circle r="50" fill="#6e4c1c" stroke="#d4a040" stroke-width="4"/><circle r="44" fill="#f2e2bb"/><circle r="44" fill="url(#cg)"/><defs><radialGradient id="cg"><stop offset=".6" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#a07a40" stop-opacity=".5"/></radialGradient></defs>'+tk+'<g class="xh"><path d="M0 4 L0 -22" stroke="#2a1806" stroke-width="3.5" stroke-linecap="round"/></g><g class="xm"><path d="M0 6 L0 -34" stroke="#2a1806" stroke-width="2.2" stroke-linecap="round"/></g><circle r="3.5" fill="#d4a040"/>');
  // borular + vana + manometre
  h+='<u class="pp l"></u><u class="pp r"></u><u class="vl l"></u><u class="vl r"></u>';
  h+=many(5,()=>'<i class="st" style="left:4%;top:44%;--w:'+fx(rr(10,50))+'px;'+tm(2.5,4)+'"></i>')+many(5,()=>'<i class="st" style="left:92%;top:62%;--w:'+fx(rr(-50,-10))+'px;'+tm(2.5,4)+'"></i>');
  h+=sv('xn','-30 -30 60 60','<circle r="28" fill="#2a1806" stroke="#d4a040" stroke-width="3"/><circle r="23" fill="#efe0bc"/><path d="M-16 10 A20 20 0 1 1 16 10" fill="none" stroke="#a02020" stroke-width="2"/><g class="xnd"><path d="M0 0 L0 -18" stroke="#1a1006" stroke-width="2"/></g><circle r="3" fill="#d4a040"/>');
  h+=many(14,()=>'<i class="sp" style="left:'+fx(rr(0,100))+'%;top:'+fx(rr(0,100))+'%;'+tm(3,7)+'"></i>');
  h+='<u class="vg"></u>';
  return h};
const saCss=BASE+`
§O{background:radial-gradient(100% 70% at 50% 35%,#3a2612,#1a1006 60%,#0c0703)}
§O .bg2{inset:0;background:repeating-linear-gradient(90deg,rgba(0,0,0,.18) 0 2px,transparent 2px 60px),radial-gradient(60% 40% at 50% 15%,rgba(255,200,110,.22),transparent 70%)}
§O .xg{height:auto;opacity:.85;filter:drop-shadow(0 4px 6px rgba(0,0,0,.6));animation:os3-spin var(--t) linear infinite}
§O .xc{left:50%;top:1%;width:min(30vw,130px);height:auto;transform:translateX(-50%);filter:drop-shadow(0 0 14px rgba(255,200,110,.45))}
§O .xm{animation:os3-spin 60s linear infinite}
§O .xh{animation:os3-spin 720s linear infinite}
§O .pp{top:0;bottom:0;width:16px;background:linear-gradient(90deg,#5a3410,#d08a3a 40%,#f0b060 50%,#8a5420);box-shadow:0 0 8px rgba(0,0,0,.6)}
§O .pp.l{left:3%}§O .pp.r{right:5%}
§O .vl{width:30px;height:14px;border-radius:4px;background:linear-gradient(#f0c070,#8a5420);box-shadow:0 2px 4px #000}
§O .vl.l{left:calc(3% - 7px);top:45%}§O .vl.r{right:calc(5% - 7px);top:63%}
§O .st{width:22px;height:22px;border-radius:50%;background:radial-gradient(circle,rgba(240,230,215,.55),transparent 70%);animation:os3-rise var(--t) ease-out var(--d) infinite}
§O .xn{left:6%;top:68%;width:min(18vw,74px);height:auto;filter:drop-shadow(0 3px 5px #000)}
§O .xnd{animation:os3-needle 4s ease-in-out infinite}
§O .sp{width:3px;height:3px;border-radius:50%;background:#ffd890;box-shadow:0 0 6px 2px #ffb040;animation:os3-tw var(--t) ease-in-out var(--d) infinite}
§O .vg{background:radial-gradient(ellipse at 50% 45%,transparent 45%,rgba(0,0,0,.7))}`;

/* ───── GÖK ADALARI ───── */
const island=(w,tree,fall,house)=>{
  let s='<path d="M10 40 Q100 20 190 40 L170 60 L150 110 L120 90 L100 160 L84 100 L60 120 L40 64Z" fill="url(#ir)"/>'+
    '<path d="M4 40 Q100 14 196 40 Q100 56 4 40Z" fill="#6cc65a"/><path d="M4 40 Q100 56 196 40 L192 48 Q100 64 8 48Z" fill="#4e9e44"/>';
  if(fall)s+='<path d="M150 46 L150 200" stroke="#bfe8ff" stroke-width="8" opacity=".85" stroke-dasharray="12 8" class="xw"/><path d="M150 46 L150 200" stroke="#fff" stroke-width="3" opacity=".7" stroke-dasharray="6 14" class="xw"/>';
  if(tree)s+='<rect x="56" y="14" width="6" height="22" fill="#7a5230"/><circle cx="59" cy="10" r="14" fill="#3f9e48"/><circle cx="50" cy="16" r="9" fill="#52b85a"/><circle cx="69" cy="15" r="9" fill="#52b85a"/>';
  if(house)s+='<rect x="104" y="18" width="30" height="20" fill="#f6e2c0"/><path d="M100 20 L119 4 L138 20Z" fill="#e0573a"/><rect x="114" y="26" width="8" height="12" fill="#7a5230"/><rect x="125" y="23" width="6" height="6" fill="#8fd0ff"/>';
  return sv('xi','0 0 200 200','<defs><linearGradient id="ir" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b08458"/><stop offset="1" stop-color="#6a4a32"/></linearGradient></defs>'+s,w)};
const balloon=(c1,c2,st)=>sv('xb','0 0 60 90','<path d="M30 2 C52 2 58 22 54 36 C50 50 38 58 34 64 L26 64 C22 58 10 50 6 36 C2 22 8 2 30 2Z" fill="'+c1+'"/><path d="M30 2 C40 10 42 40 34 64 L26 64 C18 40 20 10 30 2Z" fill="'+c2+'"/><path d="M26 64 L24 76 M34 64 L36 76" stroke="#6a4a32" stroke-width="1.2"/><rect x="22" y="76" width="16" height="11" rx="2" fill="#a07a52"/>',st);
const adHtml=()=>{
  let h='<u class="su"></u><u class="sr"></u>';
  h+=many(6,i=>'<u class="cl" style="top:'+fx(4+i*15+rr(0,6))+'%;--t:'+fx(rr(55,110))+'s;--d:-'+fx(rr(0,100))+'s;--s:'+fx(rr(.6,1.3))+'"></u>');
  h+=island('left:-10%;top:12%;width:min(48vw,240px);--d:0s',1,1,0);
  h+=island('right:-8%;top:34%;width:min(40vw,200px);--d:-2s',0,0,1);
  h+=island('left:30%;bottom:10%;width:min(36vw,180px);--d:-4s',1,1,1);
  h+=island('right:16%;top:2%;width:min(22vw,110px);--d:-1s;opacity:.7',1,0,0);
  h+='<u class="bw" style="left:12%;--t:46s;--d:-8s">'+balloon('#ff7a5c','#ffd36b','width:44px;height:auto')+'</u>';
  h+='<u class="bw" style="left:74%;--t:58s;--d:-30s">'+balloon('#7a8cff','#9fe7ff','width:34px;height:auto')+'</u>';
  h+='<u class="bw" style="left:48%;--t:70s;--d:-52s">'+balloon('#ff8fc7','#fff','width:28px;height:auto')+'</u>';
  for(let k=0;k<2;k++){const top=rr(10,40),d=rr(0,40);for(let j=0;j<4;j++)h+='<u class="bd" style="top:calc('+fx(top)+'% + '+(j%2)*10+'px);--d:-'+fx(d+j*.6)+'s">'+sv('xbd','0 0 20 10','<g class="xf"><path d="M0 2 Q5 -2 10 5 Q15 -2 20 2" fill="none" stroke="#2a4a6a" stroke-width="1.8"/></g>','width:18px;height:auto')+'</u>'}
  h+='<u class="vg"></u>';
  return h};
const adCss=BASE+`
§O{background:linear-gradient(#6fc0ff 0%,#a9dcff 40%,#e5f4ff 75%,#fff2e0 100%)}
§O .su{right:6%;top:3%;width:min(30vw,140px);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,#fffbe6 0 40%,rgba(255,236,170,.6) 55%,transparent 72%)}
§O .sr{right:calc(6% - 60px);top:calc(3% - 60px);width:min(60vw,260px);aspect-ratio:1;border-radius:50%;background:repeating-conic-gradient(rgba(255,245,200,.35) 0 6deg,transparent 6deg 20deg);-webkit-mask:radial-gradient(circle,#000 20%,transparent 70%);mask:radial-gradient(circle,#000 20%,transparent 70%);animation:os3-spin 90s linear infinite}
§O .cl{left:0;width:calc(150px * var(--s));height:calc(40px * var(--s));border-radius:40px;background:#fff;opacity:.9;box-shadow:calc(34px * var(--s)) calc(-16px * var(--s)) 0 calc(4px * var(--s)) #fff,calc(76px * var(--s)) calc(-4px * var(--s)) 0 0 #fff;animation:os3-pan var(--t) linear var(--d) infinite}
§O .xi{height:auto;filter:drop-shadow(0 10px 12px rgba(40,90,140,.25));animation:os3-bob 6s ease-in-out var(--d) infinite}
§O .xw{animation:os3-fall .8s linear infinite}
§O .bw{bottom:-14%;animation:os3-up var(--t) ease-in-out var(--d) infinite}
§O .xb{position:relative;display:block;filter:drop-shadow(0 4px 4px rgba(40,90,140,.25))}
§O .bd{left:0;animation:os3-pan 30s linear var(--d) infinite}
§O .xbd{position:relative}
§O .xf{transform-origin:10px 4px;animation:os3-flap .5s ease-in-out infinite}
§O .vg{background:radial-gradient(ellipse at 50% 50%,transparent 65%,rgba(120,180,240,.3))}`;

/* ───── LO-FI ODA ───── */
const loHtml=()=>{
  let city='';let x=0;while(x<300){const w=rr(16,34),ht=rr(30,110);city+='<rect x="'+fx(x)+'" y="'+fx(200-ht)+'" width="'+fx(w)+'" height="'+fx(ht)+'" fill="#2a1d4a"/>';for(let wy=200-ht+6;wy<196;wy+=9)for(let wx=x+4;wx<x+w-4;wx+=7)if(Math.random()<.3)city+='<rect class="xwn" x="'+fx(wx)+'" y="'+fx(wy)+'" width="3" height="4" fill="'+(Math.random()<.3?'#ff9ec7':'#ffcf7a')+'" style="'+tm(3,8)+'"/>';x+=w+rr(1,4)}
  let h='<u class="wl"></u>';
  h+='<u class="wd"><u class="sky"></u>'+sv('xcy','0 0 300 200',city,'left:0;bottom:0;width:100%;height:auto')+many(26,()=>'<i class="rn" style="left:'+fx(rr(0,100))+'%;'+tm(.7,1.4)+'"></i>')+'<u class="fr"></u></u>';
  h+=many(9,i=>'<u class="lt" style="left:'+fx(10+i*10)+'%;top:calc(4% + '+fx(Math.sin(i/8*Math.PI)*14)+'px);--c:'+['#ff9ec7','#ffcf7a','#9fd0ff','#b9ff9f'][i%4]+';--d:-'+fx(i*.4)+'s"></u>');
  h+=sv('xct','0 0 120 70','<path d="M20 70 Q16 40 34 30 L36 14 L46 26 L58 26 L68 14 L70 30 Q84 40 84 70Z" fill="#120b22"/><g class="xtl"><path d="M80 66 Q110 66 112 40" stroke="#120b22" stroke-width="7" fill="none" stroke-linecap="round"/></g><path d="M44 40 Q48 43 52 40 M60 40 Q64 43 68 40" stroke="#ffcf7a" stroke-width="1.6" fill="none"/>');
  h+=sv('xpl','0 0 120 180','<g class="xlf"><path d="M60 110 Q20 80 10 40 Q40 60 60 110Z" fill="#3fa36a"/><path d="M60 110 Q100 70 112 30 Q80 60 60 110Z" fill="#4fbf7a"/><path d="M60 110 Q50 50 66 6 Q74 60 60 110Z" fill="#5fd38a"/><path d="M60 110 Q30 100 4 90 Q36 84 60 110Z" fill="#3a9460"/></g><path d="M34 110 H86 L80 176 H40Z" fill="#d07a5a"/><path d="M30 106 H90 V118 H30Z" fill="#e08a68"/>');
  h+='<u class="lc"></u>'+sv('xlm','0 0 80 160','<path d="M10 40 L40 4 L70 40Z" fill="#ff9ec7"/><path d="M38 40 L38 150 M20 154 H60" stroke="#3a2a4a" stroke-width="5" stroke-linecap="round"/><ellipse cx="40" cy="40" rx="30" ry="5" fill="#ffe9b0"/>');
  h+=sv('xmg','0 0 60 60','<path d="M10 20 H44 V50 Q44 58 36 58 H18 Q10 58 10 50Z" fill="#f2d6e8"/><path d="M44 28 Q56 30 54 40 Q52 48 44 46" stroke="#f2d6e8" stroke-width="4" fill="none"/><ellipse cx="27" cy="21" rx="16" ry="3" fill="#6a3a2a"/>');
  h+=many(4,()=>'<i class="sm" style="left:'+fx(rr(80,84))+'%;--w:'+fx(rr(-14,14))+'px;'+tm(3,5)+'"></i>');
  h+=many(7,()=>'<i class="nt" style="left:'+fx(rr(10,90))+'%;--w:'+fx(rr(-40,40))+'px;'+tm(5,9)+'">'+['♪','♫','♩'][Math.floor(rr(0,3))]+'</i>');
  h+='<u class="vg"></u>';
  return h};
const loCss=BASE+`
§O{background:#1d1430}
§O .wl{inset:0;background:radial-gradient(80% 60% at 20% 100%,rgba(255,170,90,.22),transparent 70%),linear-gradient(#2a1a48,#24173e 55%,#3a1d3a)}
§O .wd{left:7%;right:7%;top:5%;height:48%;overflow:hidden;border-radius:6px;box-shadow:inset 0 0 30px rgba(0,0,0,.5)}
§O .sky{inset:0;background:linear-gradient(#3b2a78,#8a4a9a 55%,#ff9a8a)}
§O .xcy{position:absolute}
§O .xwn{animation:os3-blink var(--t) ease-in-out var(--d) infinite}
§O .rn{top:0;width:1px;height:30px;background:linear-gradient(transparent,rgba(230,220,255,.6));animation:os3-rain var(--t) linear var(--d) infinite;transform:translateY(-20%)}
§O .fr{inset:0;border:8px solid #4a2f5e;border-radius:6px;background:linear-gradient(90deg,transparent calc(50% - 4px),#4a2f5e calc(50% - 4px) calc(50% + 4px),transparent calc(50% + 4px)),linear-gradient(transparent calc(50% - 4px),#4a2f5e calc(50% - 4px) calc(50% + 4px),transparent calc(50% + 4px))}
§O .lt{width:8px;height:8px;border-radius:50%;background:var(--c);box-shadow:0 0 10px 3px var(--c);animation:os3-glow 2s ease-in-out var(--d) infinite}
§O .xct{left:9%;top:calc(5% + 48% - 52px);width:90px;height:auto}
§O .xtl{transform-origin:80px 66px;animation:os3-tail 2.4s ease-in-out infinite}
§O .xpl{right:-2%;bottom:6%;width:min(32vw,140px);height:auto}
§O .xlf{transform-origin:60px 110px;animation:os3-leaf 6s ease-in-out infinite}
§O .xlm{left:2%;bottom:14%;width:min(18vw,76px);height:auto}
§O .lc{left:-6%;bottom:0;width:min(60vw,260px);height:44%;background:radial-gradient(50% 60% at 50% 20%,rgba(255,220,150,.35),transparent 75%);animation:os3-glow 4s ease-in-out infinite}
§O .xmg{left:76%;bottom:4%;width:46px;height:auto}
§O .sm{bottom:calc(4% + 40px);width:12px;height:12px;border-radius:50%;background:rgba(255,240,250,.35);animation:os3-rise var(--t) ease-out var(--d) infinite}
§O .nt{top:70%;font:700 20px sans-serif;color:#ffc6e0;text-shadow:0 0 8px #ff9ec7;animation:os3-note var(--t) ease-out var(--d) infinite;opacity:0}
§O .vg{background:radial-gradient(ellipse at 50% 45%,transparent 55%,rgba(10,0,20,.6))}`;

/* ───── PATİ BAHÇESİ ───── */
const dog=()=>sv('xdg','0 0 160 170',`
  <g class="xdt"><path d="M44 128 Q12 122 16 90 Q22 84 26 92 Q30 112 50 118Z" fill="#d9945a"/></g>
  <ellipse cx="68" cy="126" rx="42" ry="36" fill="#e8a868"/>
  <ellipse cx="52" cy="152" rx="24" ry="14" fill="#d9945a"/><ellipse cx="40" cy="162" rx="12" ry="6" fill="#fff3e0"/>
  <ellipse cx="96" cy="120" rx="18" ry="28" fill="#fff3e0"/>
  <rect x="82" y="128" width="13" height="36" rx="6" fill="#e8a868"/><rect x="99" y="128" width="13" height="36" rx="6" fill="#e8a868"/>
  <ellipse cx="88" cy="164" rx="9" ry="5" fill="#fff3e0"/><ellipse cx="106" cy="164" rx="9" ry="5" fill="#fff3e0"/>
  <path d="M80 92 Q104 102 128 90 L128 98 Q104 110 80 100Z" fill="#e5484d"/><circle cx="106" cy="104" r="5" fill="#ffd34a" stroke="#c99a1a" stroke-width="1.5"/>
  <circle cx="104" cy="62" r="34" fill="#e8a868"/>
  <ellipse cx="128" cy="76" rx="22" ry="16" fill="#fff3e0"/>
  <ellipse cx="143" cy="70" rx="7" ry="5" fill="#2a1a12"/><ellipse cx="141" cy="68" rx="2.2" ry="1.4" fill="#fff" opacity=".7"/>
  <path d="M128 82 Q134 90 142 82" stroke="#2a1a12" stroke-width="2.2" fill="none" stroke-linecap="round"/>
  <g class="xtg"><path d="M131 86 Q131 102 138 102 Q145 102 142 86Z" fill="#ff7a8a"/></g>
  <g class="xek"><ellipse cx="114" cy="56" rx="4.5" ry="5.5" fill="#2a1a12"/><circle cx="115.5" cy="54" r="1.6" fill="#fff"/></g>
  <ellipse cx="98" cy="70" rx="8" ry="5" fill="#ff9a9a" opacity=".45"/>
  <g class="xer"><path d="M86 36 Q60 30 62 74 Q74 82 88 60Z" fill="#a8603a"/></g>`);
const cat=()=>sv('xkt','0 0 120 110',`
  <g class="xkq"><path d="M72 70 Q96 76 92 104 Q86 108 84 100 Q86 82 66 78Z" fill="#e8964a"/></g>
  <ellipse cx="60" cy="68" rx="24" ry="18" fill="#f2a65a"/>
  <path d="M48 56 L52 80 M58 52 L60 82 M68 54 L68 80" stroke="#d9823a" stroke-width="3"/>
  <circle cx="34" cy="48" r="18" fill="#f2a65a"/>
  <path d="M20 38 L18 18 L32 32Z M40 32 L50 16 L50 38Z" fill="#f2a65a"/><path d="M22 34 L21 24 L28 32Z M43 32 L48 23 L48 35Z" fill="#ffb3b3"/>
  <g class="xek"><path d="M26 48 Q29 45 32 48" stroke="#2a1a12" stroke-width="2.2" fill="none"/><path d="M38 48 Q41 45 44 48" stroke="#2a1a12" stroke-width="2.2" fill="none"/></g>
  <path d="M33 54 L35 54 L34 56Z" fill="#ff7a8a"/>
  <path d="M30 56 L14 54 M30 58 L14 60 M38 56 L54 54 M38 58 L54 60" stroke="#fff" stroke-width="1" opacity=".8"/>
  <ellipse cx="46" cy="84" rx="8" ry="4" fill="#f2a65a"/><ellipse cx="66" cy="84" rx="8" ry="4" fill="#f2a65a"/>`);
const bfly=(c,st)=>'<u class="bf" style="'+st+'">'+sv('xbf','0 0 30 24','<g class="xbw"><path d="M15 12 Q2 -2 2 8 Q2 16 15 12 Q4 22 8 24 Q14 24 15 12Z M15 12 Q28 -2 28 8 Q28 16 15 12 Q26 22 22 24 Q16 24 15 12Z" fill="'+c+'"/></g><rect x="14" y="6" width="2" height="14" rx="1" fill="#3a2a1a"/>','width:38px;height:auto')+'</u>';
const paHtml=()=>{
  let h='<u class="su"></u>'+many(4,i=>'<u class="cl" style="top:'+fx(3+i*9)+'%;--t:'+fx(rr(60,110))+'s;--d:-'+fx(rr(0,100))+'s;--s:'+fx(rr(.6,1.1))+'"></u>');
  h+='<u class="hl a"></u><u class="hl b"></u>';
  h+=sv('xtr','0 0 200 400','<path d="M150 400 C150 300 160 220 140 160 C130 130 110 110 70 96" stroke="#7a5230" stroke-width="22" fill="none" stroke-linecap="round"/><path d="M146 230 C170 200 190 196 200 190" stroke="#7a5230" stroke-width="12" fill="none" stroke-linecap="round"/>'+[[80,60,46],[130,40,52],[180,70,44],[110,100,40],[60,110,34],[175,140,36]].map(c=>'<circle cx="'+c[0]+'" cy="'+c[1]+'" r="'+c[2]+'" fill="#5cb84a"/><circle cx="'+(c[0]-8)+'" cy="'+(c[1]-8)+'" r="'+(c[2]*.6)+'" fill="#6fca58"/>').join('')+'<circle cx="96" cy="72" r="5" fill="#ff6a6a"/><circle cx="150" cy="50" r="5" fill="#ff6a6a"/><circle cx="170" cy="96" r="5" fill="#ff6a6a"/>');
  h+=cat();
  h+=sv('xfn','0 0 400 60','<defs><pattern id="fp" width="24" height="60" patternUnits="userSpaceOnUse"><path d="M4 60 V12 L10 4 L16 12 V60Z" fill="#fffaf0" stroke="#d8cbb0" stroke-width="1.2"/></pattern></defs><rect y="20" width="400" height="7" fill="#f2e8d4"/><rect y="42" width="400" height="7" fill="#f2e8d4"/><rect width="400" height="60" fill="url(#fp)"/>','');
  h+=sv('xdh','0 0 120 110','<path d="M14 50 L60 8 L106 50Z" fill="#e0573a"/><path d="M8 54 L60 4 L112 54 L106 58 L60 16 L14 58Z" fill="#b8402a"/><rect x="20" y="52" width="80" height="58" fill="#c98a4a"/><path d="M20 66 H100 M20 80 H100 M20 94 H100" stroke="#a87038" stroke-width="2"/><path d="M42 110 V82 Q60 62 78 82 V110Z" fill="#3a2414"/><g transform="translate(48 58)"><rect x="4" y="2" width="16" height="6" rx="3" fill="#fff"/><circle cx="4" cy="2" r="3" fill="#fff"/><circle cx="4" cy="8" r="3" fill="#fff"/><circle cx="20" cy="2" r="3" fill="#fff"/><circle cx="20" cy="8" r="3" fill="#fff"/></g>');
  h+='<u class="gs"></u>'+many(12,()=>'<u class="fw" style="left:'+fx(rr(0,98))+'%;bottom:'+fx(rr(1,12))+'%;--c:'+['#ff8fb3','#ffd34a','#ffffff','#b48cff'][Math.floor(rr(0,4))]+'"></u>');
  h+=dog();
  h+='<u class="yb">'+sv('xyb','0 0 40 40','<circle cx="20" cy="20" r="18" fill="#ff8fb3"/><path d="M6 12 Q20 22 34 12 M4 22 Q20 34 36 22 M12 4 Q22 20 14 36 M28 4 Q18 20 26 36" stroke="#e05a8a" stroke-width="2" fill="none"/>','width:34px;height:auto')+'</u>';
  h+=bfly('#ffb84a','left:20%;top:34%;--t:14s;--d:0s')+bfly('#8fd0ff','left:60%;top:20%;--t:18s;--d:-6s')+bfly('#ff8fd0','left:40%;top:48%;--t:16s;--d:-11s');
  h+='<u class="vg"></u>';
  return h};
const paCss=BASE+`
§O{background:linear-gradient(#8fd0ff 0%,#c8e9ff 40%,#e9f7e0 70%,#b9e39a 100%)}
§O .su{left:6%;top:3%;width:min(24vw,100px);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,#fff6c8 0 40%,rgba(255,226,120,.55) 55%,transparent 72%)}
§O .cl{left:0;width:calc(150px * var(--s));height:calc(40px * var(--s));border-radius:40px;background:#fff;opacity:.92;box-shadow:calc(34px * var(--s)) calc(-16px * var(--s)) 0 calc(4px * var(--s)) #fff,calc(76px * var(--s)) calc(-4px * var(--s)) 0 0 #fff;animation:os3-pan var(--t) linear var(--d) infinite}
§O .hl{left:-10%;right:-10%;border-radius:50% 50% 0 0}
§O .hl.a{bottom:14%;height:30%;background:#a6d98a}
§O .hl.b{bottom:-6%;height:30%;background:#8fd16a}
§O .xtr{right:-14%;top:-4%;width:min(56vw,250px);height:auto}
§O .xkt{right:4%;top:calc(-4% + min(56vw,250px) * .44);width:min(22vw,96px);height:auto}
§O .xkq{transform-origin:70px 74px;animation:os3-tail 2.6s ease-in-out infinite}
§O .xek{transform-box:fill-box;transform-origin:center;animation:os4-blink 5s infinite}
§O .xfn{left:0;bottom:12%;width:100%;height:9%;}
§O .xdh{right:2%;bottom:8%;width:min(30vw,130px);height:auto;filter:drop-shadow(0 4px 4px rgba(60,90,40,.3))}
§O .gs{left:0;right:0;bottom:0;height:13%;background:linear-gradient(#7cc457,#5aa83c);box-shadow:0 -6px 0 #8fd16a}
§O .fw{width:10px;height:10px;border-radius:50%;background:radial-gradient(circle,#ffd34a 0 30%,var(--c) 32%);box-shadow:0 0 0 2px var(--c)}
§O .xdg{left:1%;bottom:2%;width:min(42vw,190px);height:auto;filter:drop-shadow(0 4px 4px rgba(60,90,40,.3))}
§O .xdt{transform-origin:46px 124px;animation:os4-wag .35s ease-in-out infinite}
§O .xer{transform-origin:86px 40px;animation:os3-leaf 3s ease-in-out infinite}
§O .xtg{transform-origin:136px 86px;animation:os4-pant .5s ease-in-out infinite}
§O .yb{left:46%;bottom:5%;animation:os4-roll 7s ease-in-out infinite}
§O .xyb{position:relative;animation:os4-spin2 7s ease-in-out infinite}
§O .bf{animation:os4-fly var(--t) ease-in-out var(--d) infinite}
§O .xbf{position:relative}
§O .xbw{transform-origin:15px 12px;animation:os4-wing .3s ease-in-out infinite}
§O .vg{background:radial-gradient(ellipse at 50% 50%,transparent 65%,rgba(120,180,90,.25))}
:root[data-theme="pati"][data-oyun] .k:not(.g):not(.o):not(.r):not(.w){background:rgba(255,255,255,.5)}`;
document.head.insertAdjacentHTML('beforeend','<style>@keyframes os4-blink{0%,93%,100%{transform:scaleY(1)}96%{transform:scaleY(.1)}}@keyframes os4-wag{0%,100%{transform:rotate(-14deg)}50%{transform:rotate(16deg)}}@keyframes os4-pant{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.18)}}@keyframes os4-roll{0%,100%{transform:translateX(-12vw)}50%{transform:translateX(18vw)}}@keyframes os4-spin2{0%,100%{transform:rotate(-200deg)}50%{transform:rotate(300deg)}}@keyframes os4-fly{0%,100%{transform:translate(0,0)}25%{transform:translate(30vw,-6vh)}50%{transform:translate(10vw,8vh)}75%{transform:translate(-14vw,-4vh)}}@keyframes os4-wing{0%,100%{transform:scaleX(1)}50%{transform:scaleX(.4)}}</style>');

OSEKLE('pati',{html:paHtml,css:paCss});
OSEKLE('saat',{html:saHtml,css:saCss});
OSEKLE('adalar',{html:adHtml,css:adCss});
OSEKLE('lofi',{html:loHtml,css:loCss});
})();
