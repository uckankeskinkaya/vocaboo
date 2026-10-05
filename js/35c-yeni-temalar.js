// v25: Dört yeni sahneli temanın oyun içi arka planları: Saat İşleri, Gök Adaları, Korsan Koyu, Lo-fi Oda.
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

/* ───── KORSAN KOYU ───── */
const wave=(c,h,a)=>{let d='M0 '+h;for(let x=0;x<=800;x+=50)d+=' Q'+(x+25)+' '+(h-a)+' '+(x+50)+' '+h;return '<path d="'+d+' V200 H0Z" fill="'+c+'"/>'};
const koHtml=()=>{
  let h=many(50,()=>{const s=rr(1,2.6);return '<i class="sx" style="left:'+fx(rr(0,100))+'%;top:'+fx(rr(0,55))+'%;width:'+fx(s)+'px;height:'+fx(s)+'px;'+tm(2,5)+'"></i>'});
  h+='<u class="mo"></u><u class="mr"></u>';
  h+=sv('xl','0 0 80 220','<path d="M0 220 Q10 190 30 186 L60 186 Q76 196 80 220Z" fill="#0b1a28"/><path d="M28 186 L33 60 L51 60 L56 186Z" fill="#f2efe6"/><path d="M29.6 150 L54.4 150 L53.6 128 L30.4 128Z M31.2 106 L52.8 106 L52 84 L32 84Z" fill="#c8323a"/><rect x="29" y="44" width="26" height="16" fill="#2a2a34"/><rect x="32" y="46" width="20" height="12" fill="#ffe9a0" class="xlp"/><path d="M26 44 L42 28 L58 44Z" fill="#c8323a"/><path d="M24 60 H60" stroke="#2a2a34" stroke-width="3"/>');
  h+='<u class="bm"></u>';
  h+='<u class="sh">'+sv('xs','0 0 220 180','<path d="M106 10 L106 130 M60 30 L60 130 M150 40 L150 130" stroke="#2a1a10" stroke-width="4"/><path d="M110 16 Q150 50 110 110Z M64 36 Q96 66 64 112Z M154 46 Q184 76 154 116Z" fill="#e8dcc0" opacity=".92"/><path d="M106 10 L130 16 L106 24Z" fill="#111"/><circle cx="114" cy="16" r="2.4" fill="#eee"/><path d="M10 120 L210 120 L186 156 Q110 168 34 156Z" fill="#3a2414"/><path d="M14 126 H206" stroke="#6a4424" stroke-width="3"/><circle cx="60" cy="140" r="3.4" fill="#ffd36b" class="xlp"/><circle cx="96" cy="140" r="3.4" fill="#ffd36b" class="xlp"/><circle cx="132" cy="140" r="3.4" fill="#ffd36b" class="xlp"/><circle cx="168" cy="140" r="3.4" fill="#ffd36b" class="xlp"/><path d="M186 120 L214 100" stroke="#2a1a10" stroke-width="3"/>','width:100%;height:auto')+'</u>';
  h+='<u class="wv w1">'+sv('xwv" preserveAspectRatio="none','0 0 800 200',wave('#0f3d5e',40,14),'width:200%;height:100%')+'</u>';
  h+='<u class="wv w2">'+sv('xwv" preserveAspectRatio="none','0 0 800 200',wave('#124a70',40,18),'width:200%;height:100%')+'</u>';
  h+='<u class="wv w3">'+sv('xwv" preserveAspectRatio="none','0 0 800 200',wave('#17587f',40,22),'width:200%;height:100%')+'</u>';
  for(let j=0;j<3;j++)h+='<u class="gu" style="top:'+fx(rr(12,40))+'%;--d:-'+fx(rr(0,40))+'s">'+sv('xbd','0 0 20 10','<g class="xf"><path d="M0 2 Q5 -2 10 5 Q15 -2 20 2" fill="none" stroke="#dfe8f0" stroke-width="1.6"/></g>','width:20px;height:auto')+'</u>';
  h+='<u class="mi"></u><u class="vg"></u>';
  return h};
const koCss=BASE+`
§O{background:linear-gradient(#020812 0%,#08203a 45%,#0e3350 70%,#0a2a42 100%)}
§O .sx{border-radius:50%;background:#fff;animation:os3-tw var(--t) ease-in-out var(--d) infinite}
§O .mo{left:14%;top:6%;width:min(22vw,96px);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 40% 40%,#fffbe6,#f3e3b0 60%,#d8c48a);box-shadow:0 0 60px 18px rgba(255,240,190,.28)}
§O .mr{left:calc(14% + 2vw);bottom:4%;width:min(18vw,80px);height:46%;background:repeating-linear-gradient(transparent 0 6px,rgba(255,240,190,.5) 6px 8px);-webkit-mask:linear-gradient(transparent,#000 30%,#000 80%,transparent);mask:linear-gradient(transparent,#000 30%,#000 80%,transparent);transform-origin:50% 0;animation:os3-shim 3s ease-in-out infinite}
§O .xl{right:2%;bottom:16%;width:76px;height:auto}
§O .xlp{animation:os3-glow 1.6s ease-in-out infinite}
§O .bm{right:calc(2% + 36px);bottom:calc(16% + 137px);width:min(120vw,560px);height:46px;transform-origin:100% 50%;background:linear-gradient(270deg,rgba(255,236,170,.75),rgba(255,236,170,0));clip-path:polygon(0 0,100% 42%,100% 58%,0 100%);animation:os3-beam 8s linear infinite}
§O .sh{left:4%;bottom:10%;width:min(60vw,280px);transform-origin:50% 90%;animation:os3-rock 5s ease-in-out infinite;filter:drop-shadow(0 0 10px rgba(0,0,0,.6))}
§O .xs{position:relative}
§O .wv{left:0;width:100%;overflow:hidden}
§O .xwv{position:relative;animation:os3-wave var(--t,14s) linear infinite}
§O .w1{bottom:6%;height:16%;--t:22s;opacity:.95}
§O .w2{bottom:2%;height:12%;--t:16s}
§O .w3{bottom:-2%;height:9%;--t:11s}
§O .gu{left:0;animation:os3-pan 36s linear var(--d) infinite}
§O .gu .xbd{position:relative}
§O .xf{transform-origin:10px 4px;animation:os3-flap .6s ease-in-out infinite}
§O .mi{left:0;right:0;bottom:8%;height:18%;background:linear-gradient(transparent,rgba(150,190,220,.18),transparent)}
§O .vg{background:radial-gradient(ellipse at 50% 45%,transparent 50%,rgba(0,5,15,.65))}`;

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

OSEKLE('saat',{html:saHtml,css:saCss});
OSEKLE('adalar',{html:adHtml,css:adCss});
OSEKLE('korsan',{html:koHtml,css:koCss});
OSEKLE('lofi',{html:loHtml,css:loCss});
})();
