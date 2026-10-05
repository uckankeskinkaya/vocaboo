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
// Ada: çimen tepesi, toprak bandı, katmanlı kaya alt yüzü, sarkan sarmaşıklar; isteğe göre ağaç, ev, değirmen, şelale
let ADN=0;
const ada=o=>{
  const n=++ADN,id='ad'+n;
  let s='<defs><linearGradient id="'+id+'r" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9a7656"/><stop offset=".55" stop-color="#6e5038"/><stop offset="1" stop-color="#3e2c22"/></linearGradient>'+
    '<linearGradient id="'+id+'g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fe070"/><stop offset="1" stop-color="#4fae44"/></linearGradient>'+
    '<linearGradient id="'+id+'w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8f2ff"/><stop offset=".7" stop-color="#a8dcff" stop-opacity=".8"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></linearGradient></defs>';
  if(o.fall)s+='<g><rect x="196" y="60" width="12" height="'+o.fall+'" fill="url(#'+id+'w)"/><path d="M198 60 V'+(60+o.fall)+' M205 60 V'+(60+o.fall)+'" stroke="#fff" stroke-width="2.4" stroke-dasharray="10 14" class="xwf" opacity=".9"/></g>';
  s+='<path d="M12 62 Q30 74 44 72 L56 122 L70 98 L86 172 L100 132 L118 252 L134 142 L150 192 L162 112 L178 152 L190 94 L204 110 L228 62Z" fill="url(#'+id+'r)"/>';
  s+='<path d="M30 82 Q120 100 214 80 M48 108 Q120 124 196 104 M70 140 Q120 152 170 136" stroke="#c09a72" stroke-width="2.2" fill="none" opacity=".45"/>';
  s+='<path d="M10 60 Q120 76 230 60 L228 70 Q120 86 12 70Z" fill="#7a5230"/>';
  s+='<path d="M6 58 Q120 30 234 58 Q230 66 220 64 Q214 74 206 66 Q190 70 176 66 Q164 76 154 67 Q130 72 108 67 Q96 76 86 67 Q66 72 50 66 Q40 74 32 66 Q18 70 6 58Z" fill="url(#'+id+'g)"/>';
  s+='<path d="M40 50 Q120 30 200 50" stroke="#b8f59a" stroke-width="3" fill="none" opacity=".6"/>';
  s+=[[40,70,40],[86,70,56],[154,70,46],[206,66,34]].map(v=>'<path d="M'+v[0]+' '+v[1]+' q-6 '+v[2]/2+' 2 '+v[2]+'" stroke="#3f9a3a" stroke-width="2.4" fill="none"/><circle cx="'+(v[0]+2)+'" cy="'+(v[1]+v[2])+'" r="3" fill="#5cbc4a"/>').join('');
  if(o.tree)o.tree.forEach(t=>{s+='<rect x="'+(t[0]-3)+'" y="'+(t[1]-24)+'" width="6" height="26" fill="#7a5230"/><circle cx="'+t[0]+'" cy="'+(t[1]-30)+'" r="16" fill="#3f9e48"/><circle cx="'+(t[0]-9)+'" cy="'+(t[1]-22)+'" r="11" fill="#52b85a"/><circle cx="'+(t[0]+10)+'" cy="'+(t[1]-23)+'" r="11" fill="#4aa850"/><circle cx="'+(t[0]-4)+'" cy="'+(t[1]-36)+'" r="7" fill="#7ad06a"/>'});
  if(o.house)s+='<g transform="translate('+o.house+' 20)"><rect x="0" y="16" width="34" height="24" fill="#f6e2c0"/><path d="M-5 18 L17 0 L39 18Z" fill="#e0573a"/><rect x="13" y="26" width="9" height="14" fill="#7a5230"/><rect x="25" y="22" width="7" height="7" fill="#8fd0ff"/><rect x="26" y="2" width="5" height="10" fill="#9a5a3a"/></g>';
  if(o.mill)s+='<g transform="translate('+o.mill+' 0)"><path d="M-9 50 L-5 6 L5 6 L9 50Z" fill="#f2e6d2"/><path d="M-6 6 L0 -4 L6 6Z" fill="#c8503a"/><rect x="-3" y="34" width="6" height="12" fill="#7a5230"/><g class="xml"><path d="M0 4 L-4 -30 L4 -30Z M0 4 L34 0 L34 8Z M0 4 L4 38 L-4 38Z M0 4 L-34 8 L-34 0Z" fill="#fff8ec" stroke="#c8b8a0" stroke-width="1"/><circle cy="4" r="3" fill="#8a6a50"/></g></g>';
  if(o.flowers)for(let i=0;i<10;i++)s+='<circle cx="'+fx(rr(24,216))+'" cy="'+fx(rr(46,60))+'" r="2.2" fill="'+['#fff','#ffd34a','#ff8fb3'][i%3]+'"/>';
  return sv('xad'+(o.cls?' '+o.cls:''),'0 -40 240 '+(300+(o.fall||0)),s,o.st)};
const bulut=(c)=>{let s='';for(let x=-40;x<840;x+=rr(50,90))s+='<circle cx="'+fx(x)+'" cy="'+fx(rr(40,70))+'" r="'+fx(rr(40,70))+'" fill="'+c+'"/>';return s};
const balloon=(c1,c2,st)=>sv('xb','0 0 60 90','<path d="M30 2 C52 2 58 22 54 36 C50 50 38 58 34 64 L26 64 C22 58 10 50 6 36 C2 22 8 2 30 2Z" fill="'+c1+'"/><path d="M30 2 C40 10 42 40 34 64 L26 64 C18 40 20 10 30 2Z" fill="'+c2+'"/><path d="M26 64 L24 76 M34 64 L36 76" stroke="#6a4a32" stroke-width="1.2"/><rect x="22" y="76" width="16" height="11" rx="2" fill="#a07a52"/>',st);
const adHtml=()=>{
  ADN=0;
  let h='<u class="su"></u><u class="sr"></u>';
  h+=many(4,i=>'<u class="cl" style="top:'+fx(4+i*14+rr(0,5))+'%;--t:'+fx(rr(70,120))+'s;--d:-'+fx(rr(0,110))+'s;--s:'+fx(rr(.5,1))+'"></u>');
  h+=ada({cls:'uz',st:'right:14%;top:2%;width:min(18vw,90px);--d:-1s',tree:[[120,50]]});
  h+=ada({cls:'uz',st:'left:44%;top:24%;width:min(14vw,70px);--d:-3s'});
  h+='<u class="zp">'+sv('xzp','0 0 120 50','<ellipse cx="56" cy="20" rx="50" ry="17" fill="#f2b84a"/><path d="M10 20 Q56 4 102 20" stroke="#d9952a" stroke-width="2" fill="none"/><path d="M10 20 Q56 36 102 20" stroke="#d9952a" stroke-width="2" fill="none"/><path d="M100 20 L118 8 L118 32Z" fill="#e0573a"/><rect x="40" y="36" width="30" height="9" rx="3" fill="#7a5230"/><rect x="44" y="38" width="5" height="4" fill="#ffe9a0"/><rect x="53" y="38" width="5" height="4" fill="#ffe9a0"/><rect x="62" y="38" width="5" height="4" fill="#ffe9a0"/>','width:min(30vw,120px);height:auto')+'</u>';
  h+=ada({st:'left:-8%;top:5%;width:min(64vw,330px);--d:0s',mill:150,tree:[[60,52],[92,48]],fall:520,flowers:1});
  h+=ada({st:'right:-10%;top:30%;width:min(48vw,250px);--d:-2.5s',house:70,tree:[[160,50]],flowers:1});
  h+=ada({st:'left:18%;bottom:16%;width:min(54vw,270px);--d:-4s',tree:[[50,52],[190,50],[150,50]],fall:300,flowers:1});
  h+='<u class="bw" style="left:70%;--t:60s;--d:-20s">'+balloon('#ff7a5c','#ffd36b','width:42px;height:auto')+'</u>';
  h+='<u class="bw" style="left:8%;--t:75s;--d:-55s">'+balloon('#7a8cff','#9fe7ff','width:32px;height:auto')+'</u>';
  for(let k=0;k<2;k++){const top=rr(14,44),d=rr(0,40);for(let j=0;j<4;j++)h+='<u class="bd" style="top:calc('+fx(top)+'% + '+(j%2)*10+'px);--d:-'+fx(d+j*.6)+'s">'+sv('xbd','0 0 20 10','<g class="xf"><path d="M0 2 Q5 -2 10 5 Q15 -2 20 2" fill="none" stroke="#3a5a7a" stroke-width="1.8"/></g>','width:18px;height:auto')+'</u>'}
  h+='<u class="cs c1">'+sv('xcs" preserveAspectRatio="none','0 0 800 120',bulut('#ffffff'),'width:200%;height:100%')+'</u>';
  h+='<u class="cs c2">'+sv('xcs" preserveAspectRatio="none','0 0 800 120',bulut('#eaf4ff'),'width:200%;height:100%')+'</u>';
  h+='<u class="vg"></u>';
  return h};
const adCss=BASE+`
§O{background:linear-gradient(#4fa6ee 0%,#8fcaf6 35%,#cfe8fb 62%,#ffe6cc 82%,#ffd6b0 100%)}
§O .su{right:4%;top:8%;width:min(34vw,160px);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,#fffdf0 0 34%,rgba(255,236,170,.65) 50%,transparent 72%)}
§O .sr{right:calc(4% - 70px);top:calc(8% - 70px);width:min(70vw,300px);aspect-ratio:1;border-radius:50%;background:repeating-conic-gradient(rgba(255,245,200,.32) 0 6deg,transparent 6deg 20deg);-webkit-mask:radial-gradient(circle,#000 20%,transparent 70%);mask:radial-gradient(circle,#000 20%,transparent 70%);animation:os3-spin 90s linear infinite}
§O .cl{left:0;width:calc(150px * var(--s));height:calc(40px * var(--s));border-radius:40px;background:#fff;opacity:.85;box-shadow:calc(34px * var(--s)) calc(-16px * var(--s)) 0 calc(4px * var(--s)) #fff,calc(76px * var(--s)) calc(-4px * var(--s)) 0 0 #fff;animation:os3-pan var(--t) linear var(--d) infinite}
§O .xad{height:auto;filter:drop-shadow(0 14px 14px rgba(40,90,140,.22));animation:os3-bob 7s ease-in-out var(--d) infinite}
§O .uz{opacity:.55;filter:saturate(.6) brightness(1.15)}
§O .xwf{animation:os3-fall .7s linear infinite}
§O .xml{transform-origin:0 4px;animation:os3-spin 9s linear infinite}
§O .zp{top:27%;left:0;animation:os3-pan 80s linear -30s infinite}
§O .xzp{position:relative;animation:os3-bob 5s ease-in-out infinite}
§O .bw{bottom:-14%;animation:os3-up var(--t) ease-in-out var(--d) infinite}
§O .xb{position:relative;display:block;filter:drop-shadow(0 4px 4px rgba(40,90,140,.25))}
§O .bd{left:0;animation:os3-pan 30s linear var(--d) infinite}
§O .xbd{position:relative}
§O .xf{transform-origin:10px 4px;animation:os3-flap .5s ease-in-out infinite}
§O .cs{left:0;width:100%;overflow:hidden}
§O .xcs{position:relative;animation:os3-wave 60s linear infinite}
§O .c1{bottom:-2%;height:16%;opacity:.95}
§O .c2{bottom:-6%;height:12%}
§O .c2 .xcs{animation-duration:40s;animation-direction:reverse}
§O .vg{background:radial-gradient(ellipse at 50% 50%,transparent 65%,rgba(120,180,240,.25))}`;
// Menü sahnesi de aynı adalarla
if(typeof SCN!=='undefined'&&SCN.adalar){
  SCN.adalar.html=()=>{ADN=0;return cloud(4).replace(/<u /g,'<u class="c" ')+ada({st:'left:-10%;top:16%;width:min(56vw,280px);--d:0s',mill:150,tree:[[60,52]],fall:420,flowers:1})+ada({st:'right:-8%;top:46%;width:min(44vw,230px);--d:-2s',house:70,tree:[[160,50]],flowers:1})+ada({cls:'uz',st:'right:20%;top:6%;width:min(16vw,80px);--d:-3s'})};
  document.head.insertAdjacentHTML('beforeend','<style>#sahne[data-s="adalar"] svg{position:absolute;display:block;overflow:visible}#sahne[data-s="adalar"] .xad{height:auto;filter:drop-shadow(0 14px 14px rgba(40,90,140,.22));animation:os3-bob 7s ease-in-out var(--d) infinite}#sahne[data-s="adalar"] .uz{opacity:.55}#sahne[data-s="adalar"] .xwf{animation:os3-fall .7s linear infinite}#sahne[data-s="adalar"] .xml{transform-origin:0 4px;animation:os3-spin 9s linear infinite}</style>');
  if(document.documentElement.dataset.theme==='adalar'&&typeof sahneKur==='function')sahneKur('adalar');
}

/* ───── LO-FI ODA ───── */
const loHtml=()=>{
  let city='';let x=0;while(x<300){const w=rr(16,34),ht=rr(30,110);city+='<rect x="'+fx(x)+'" y="'+fx(200-ht)+'" width="'+fx(w)+'" height="'+fx(ht)+'" fill="#2a1d4a"/>';for(let wy=200-ht+6;wy<196;wy+=9)for(let wx=x+4;wx<x+w-4;wx+=7)if(Math.random()<.3)city+='<rect class="xwn" x="'+fx(wx)+'" y="'+fx(wy)+'" width="3" height="4" fill="'+(Math.random()<.3?'#ff9ec7':'#ffcf7a')+'" style="'+tm(3,8)+'"/>';x+=w+rr(1,4)}
  let h='<u class="wl"></u>';
  h+='<u class="wd"><u class="sky"></u>'+sv('xcy','0 0 300 200',city,'left:0;bottom:0;width:100%;height:auto')+many(26,()=>'<i class="rn" style="left:'+fx(rr(0,100))+'%;'+tm(.7,1.4)+'"></i>')+'<u class="fr"></u></u>';
  h+=many(9,i=>'<u class="lt" style="left:'+fx(10+i*10)+'%;top:calc(4% + '+fx(Math.sin(i/8*Math.PI)*14)+'px);--c:'+['#ff9ec7','#ffcf7a','#9fd0ff','#b9ff9f'][i%4]+';--d:-'+fx(i*.4)+'s"></u>');
  // lo-fi masa: üstünde lamba, kitaplar, açık defter, dizüstü, kupa ve saksı
  h+='<u class="dk"></u><u class="lc"></u>'+sv('xds" preserveAspectRatio="xMidYMax meet','0 0 400 124',`
   <rect x="0" y="110" width="400" height="14" fill="#5a3a62"/><rect x="0" y="110" width="400" height="3" fill="#7a5288"/>
   <ellipse cx="44" cy="110" rx="18" ry="4" fill="#3a2a4a"/><path d="M44 108 L40 64 L62 40" stroke="#3a2a4a" stroke-width="4" fill="none" stroke-linecap="round"/>
   <path d="M50 26 L80 40 L66 56 Z" fill="#ff9ec7"/><ellipse class="xlb" cx="72" cy="50" rx="6" ry="4" fill="#fff2c0"/>
   <rect x="84" y="96" width="74" height="14" rx="2" fill="#ff9ec7"/><rect x="90" y="82" width="62" height="14" rx="2" fill="#9fd0ff"/><rect x="86" y="68" width="68" height="14" rx="2" fill="#ffcf7a"/><rect x="94" y="56" width="54" height="12" rx="2" fill="#b9ff9f"/>
   <path d="M92 96 V110 M150 96 V110 M98 82 V96 M144 82 V96 M94 68 V82 M146 68 V82" stroke="rgba(0,0,0,.18)" stroke-width="2"/>
   <g class="xtl"><path d="M144 52 Q160 50 158 34" stroke="#1a1028" stroke-width="6" fill="none" stroke-linecap="round"/></g>
   <path d="M98 56 Q98 34 122 32 Q146 34 146 56Z" fill="#1a1028"/><circle cx="106" cy="42" r="11" fill="#1a1028"/><path d="M97 36 L98 24 L106 32Z M108 31 L114 22 L116 34Z" fill="#1a1028"/>
   <path d="M100 42 Q103 44 106 42 M108 42 Q111 44 114 42" stroke="#ffcf7a" stroke-width="1.3" fill="none"/>
   <text class="xz" x="118" y="24" font-size="9" fill="#e9d6ff" font-family="sans-serif">z</text><text class="xz z2" x="126" y="16" font-size="7" fill="#e9d6ff" font-family="sans-serif">z</text>
   <path d="M166 108 Q186 98 204 104 L204 110 Q186 104 166 112Z" fill="#f6efe2"/><path d="M242 108 Q222 98 204 104 L204 110 Q222 104 242 112Z" fill="#ece2d0"/>
   <path d="M174 104 H196 M176 100 H194 M212 104 H234 M214 100 H232" stroke="#b8a8c8" stroke-width="1"/><path d="M226 92 L238 104" stroke="#ff9ec7" stroke-width="2.5" stroke-linecap="round"/>
   <path d="M254 108 L264 60 L330 60 L320 108Z" fill="#2a1d3a"/><path d="M258 104 L267 64 L326 64 L317 104Z" fill="url(#lsg)" class="xls"/>
   <rect x="246" y="106" width="88" height="6" rx="2" fill="#3a2a4a"/>
   <defs><linearGradient id="lsg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffb3d6"/><stop offset="1" stop-color="#8a7aff"/></linearGradient></defs>
   <path d="M276 76 H306 M276 84 H298 M276 92 H310" stroke="#fff" stroke-width="2" opacity=".55"/>
   <path d="M342 84 H364 V104 Q364 110 358 110 H348 Q342 110 342 104Z" fill="#f2d6e8"/><path d="M364 88 Q372 90 371 96 Q370 102 364 101" stroke="#f2d6e8" stroke-width="3" fill="none"/>
   <g class="xlf2"><path d="M386 92 Q372 70 376 50 Q388 70 386 92Z M388 92 Q400 72 398 56 Q392 76 388 92Z M386 92 Q380 78 368 72 Q378 86 386 92Z" fill="#4fbf7a"/></g>
   <path d="M376 92 H398 L395 110 H379Z" fill="#d07a5a"/>`);
  h+=many(4,()=>'<i class="sm" style="left:'+fx(rr(87,89))+'%;--w:'+fx(rr(-14,14))+'px;'+tm(3,5)+'"></i>');
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
§O .xz{animation:os3-glow 2s ease-in-out infinite}§O .z2{animation-delay:-1s}
§O .xtl{transform-origin:144px 52px;animation:os3-tail 2.4s ease-in-out infinite}
§O .dk{left:0;right:0;bottom:0;height:40%;background:repeating-linear-gradient(90deg,transparent 0 calc(50% - 1px),rgba(0,0,0,.25) calc(50% - 1px) calc(50% + 1px),transparent calc(50% + 1px)),linear-gradient(#4a2f52,#2e1d36)}
§O .xds{left:0;bottom:calc(40% - 1px);width:100%;height:auto}
§O .lc{left:-10%;bottom:30%;width:min(70vw,360px);aspect-ratio:1;background:radial-gradient(closest-side,rgba(255,220,150,.38),transparent);animation:os3-glow 4s ease-in-out infinite}
§O .xlb{animation:os3-glow 4s ease-in-out infinite}
§O .xls{animation:os3-glow 3s ease-in-out infinite}
§O .xlf2{transform-origin:387px 92px;animation:os3-leaf 6s ease-in-out infinite}
§O .sm{bottom:calc(40% + 7vw);width:12px;height:12px;border-radius:50%;background:rgba(255,240,250,.35);animation:os3-rise var(--t) ease-out var(--d) infinite}
§O .nt{top:70%;font:700 20px sans-serif;color:#ffc6e0;text-shadow:0 0 8px #ff9ec7;animation:os3-note var(--t) ease-out var(--d) infinite;opacity:0}
§O .vg{background:radial-gradient(ellipse at 50% 45%,transparent 55%,rgba(10,0,20,.6))}`;

/* ───── PATİ BAHÇESİ ───── */
// Köpek (önden, oturan), kedi (çitin üstünde) ve kulübe tek bir bahçe çiziminin içinde: ekran boyutu değişse de yerleri kaymaz
const DOG=`<g class="xdt"><path d="M88 112 Q112 104 110 78 Q104 74 100 82 Q100 98 84 104Z" fill="#c8813f"/></g>
  <ellipse cx="34" cy="122" rx="15" ry="11" fill="#d48d4a"/><ellipse cx="86" cy="122" rx="15" ry="11" fill="#d48d4a"/>
  <ellipse cx="60" cy="104" rx="30" ry="31" fill="#e3a15f"/><ellipse cx="60" cy="112" rx="17" ry="22" fill="#fff4e4"/>
  <rect x="45" y="104" width="12" height="30" rx="6" fill="#e3a15f"/><rect x="63" y="104" width="12" height="30" rx="6" fill="#e3a15f"/>
  <ellipse cx="51" cy="135" rx="9" ry="4.5" fill="#fff4e4"/><ellipse cx="69" cy="135" rx="9" ry="4.5" fill="#fff4e4"/>
  <path d="M36 76 Q60 88 84 76 L84 84 Q60 96 36 84Z" fill="#3d7bd9"/><circle cx="60" cy="90" r="5" fill="#ffd34a" stroke="#c99a1a" stroke-width="1.4"/>
  <ellipse cx="60" cy="50" rx="31" ry="28" fill="#e3a15f"/>
  <path d="M55 22 Q60 20 65 22 L66 50 Q60 54 54 50Z" fill="#fff4e4"/><ellipse cx="60" cy="62" rx="17" ry="13" fill="#fff4e4"/>
  <g class="xel"><path d="M33 30 Q12 32 16 70 Q27 75 36 54Z" fill="#8a4f2a"/></g>
  <g class="xer2"><path d="M87 30 Q108 32 104 70 Q93 75 84 54Z" fill="#8a4f2a"/></g>
  <g class="xek"><ellipse cx="47" cy="46" rx="4.6" ry="5.6" fill="#2a1a12"/><ellipse cx="73" cy="46" rx="4.6" ry="5.6" fill="#2a1a12"/><circle cx="48.6" cy="44" r="1.7" fill="#fff"/><circle cx="74.6" cy="44" r="1.7" fill="#fff"/></g>
  <ellipse cx="60" cy="57" rx="6.5" ry="4.6" fill="#2a1a12"/><ellipse cx="58.5" cy="55.5" rx="2" ry="1.2" fill="#fff" opacity=".7"/>
  <path d="M51 63 Q55.5 68 60 63 Q64.5 68 69 63" stroke="#2a1a12" stroke-width="2" fill="none" stroke-linecap="round"/>
  <g class="xtg"><path d="M55.5 66 Q55 79 60 79 Q65 79 64.5 66Z" fill="#ff7a8a"/><path d="M60 67 V75" stroke="#e05a6a" stroke-width="1.2"/></g>
  <ellipse cx="40" cy="58" rx="6" ry="3.6" fill="#ff9a9a" opacity=".45"/><ellipse cx="80" cy="58" rx="6" ry="3.6" fill="#ff9a9a" opacity=".45"/>`;
const CAT=`<g class="xkq"><path d="M70 82 Q78 96 72 116 Q70 124 76 128" stroke="#e8964a" stroke-width="7" fill="none" stroke-linecap="round"/></g>
  <ellipse cx="60" cy="68" rx="22" ry="18" fill="#f2a65a"/>
  <path d="M50 56 L53 80 M60 52 L61 82 M69 55 L69 80" stroke="#d9823a" stroke-width="3"/>
  <circle cx="40" cy="44" r="17" fill="#f2a65a"/>
  <path d="M27 34 L25 16 L38 29Z M45 29 L54 14 L55 35Z" fill="#f2a65a"/><path d="M29 31 L28 22 L34 29Z M47 29 L52 21 L52 32Z" fill="#ffb3b3"/>
  <g class="xek"><path d="M32 44 Q35 41 38 44" stroke="#2a1a12" stroke-width="2.2" fill="none"/><path d="M43 44 Q46 41 49 44" stroke="#2a1a12" stroke-width="2.2" fill="none"/></g>
  <path d="M39.5 50 L41.5 50 L40.5 52Z" fill="#ff7a8a"/>
  <path d="M36 52 L20 50 M36 54 L20 57 M45 52 L60 50 M45 54 L60 57" stroke="#fff" stroke-width="1" opacity=".85"/>
  <ellipse cx="48" cy="86" rx="8" ry="4" fill="#f2a65a"/><ellipse cx="66" cy="86" rx="8" ry="4" fill="#f2a65a"/>`;
const HOUSE=`<path d="M14 50 L60 8 L106 50Z" fill="#e0573a"/><path d="M8 54 L60 4 L112 54 L106 58 L60 16 L14 58Z" fill="#b8402a"/><rect x="20" y="52" width="80" height="58" fill="#c98a4a"/><path d="M20 66 H100 M20 80 H100 M20 94 H100" stroke="#a87038" stroke-width="2"/><path d="M42 110 V82 Q60 62 78 82 V110Z" fill="#3a2414"/><g transform="translate(48 58)"><rect x="4" y="2" width="16" height="6" rx="3" fill="#fff"/><circle cx="4" cy="2" r="3" fill="#fff"/><circle cx="4" cy="8" r="3" fill="#fff"/><circle cx="20" cy="2" r="3" fill="#fff"/><circle cx="20" cy="8" r="3" fill="#fff"/></g><ellipse cx="60" cy="112" rx="56" ry="5" fill="#3a7a2a" opacity=".25"/>`;
const yard=()=>{
  let fl='';for(let i=0;i<22;i++){const x=rr(4,396),y=rr(372,436),c=['#ff8fb3','#ffd34a','#ffffff','#b48cff'][Math.floor(rr(0,4))];fl+='<circle cx="'+fx(x)+'" cy="'+fx(y)+'" r="4.5" fill="'+c+'"/><circle cx="'+fx(x)+'" cy="'+fx(y)+'" r="1.8" fill="#ffd34a"/>'}
  const crown=[[300,70,50],[350,50,52],[390,90,46],[320,120,42],[270,110,36],[370,140,40]].map(c=>'<circle cx="'+c[0]+'" cy="'+c[1]+'" r="'+c[2]+'" fill="#5cb84a"/><circle cx="'+(c[0]-9)+'" cy="'+(c[1]-9)+'" r="'+fx(c[2]*.6)+'" fill="#6fca58"/>').join('');
  return sv('xyd" preserveAspectRatio="xMidYMax meet','0 0 400 440',`
   <path d="M0 270 Q100 220 200 262 Q300 230 400 258 V440 H0Z" fill="#a6d98a"/>
   <path d="M352 380 C350 300 362 220 344 150" stroke="#7a5230" stroke-width="20" fill="none" stroke-linecap="round"/>
   <path d="M350 240 C320 220 300 200 286 170" stroke="#7a5230" stroke-width="10" fill="none" stroke-linecap="round"/>
   ${crown}<circle cx="316" cy="84" r="5" fill="#ff6a6a"/><circle cx="368" cy="62" r="5" fill="#ff6a6a"/><circle cx="384" cy="118" r="5" fill="#ff6a6a"/>
   <defs><pattern id="fp" width="24" height="56" patternUnits="userSpaceOnUse" x="0" y="300"><path d="M4 56 V12 L10 3 L16 12 V56Z" fill="#fffaf0" stroke="#d8cbb0" stroke-width="1.2"/></pattern></defs>
   <rect x="0" y="318" width="400" height="7" fill="#f2e8d4"/><rect x="0" y="340" width="400" height="7" fill="#f2e8d4"/><rect x="0" y="300" width="400" height="56" fill="url(#fp)"/>
   <g transform="translate(96 216)">${CAT}</g>
   <path d="M0 352 Q200 340 400 352 V440 H0Z" fill="#8fd16a"/><path d="M0 362 Q200 352 400 362 V440 H0Z" fill="#7cc457"/>
   ${fl}
   <g transform="translate(262 280) scale(1.05)">${HOUSE}</g>
   <g transform="translate(34 280) scale(1.12)">${DOG}</g>
   <g transform="translate(200 414)"><g class="xyr"><g class="xys"><circle r="13" fill="#ff8fb3"/><path d="M-10 -5 Q0 3 10 -5 M-12 3 Q0 12 12 3 M-5 -12 Q3 0 -3 12 M6 -12 Q-2 0 4 12" stroke="#e05a8a" stroke-width="1.6" fill="none"/></g></g></g>`)};
const bfly=(c,st)=>'<u class="bf" style="'+st+'">'+sv('xbf','0 0 30 24','<g class="xbw"><path d="M15 12 Q2 -2 2 8 Q2 16 15 12 Q4 22 8 24 Q14 24 15 12Z M15 12 Q28 -2 28 8 Q28 16 15 12 Q26 22 22 24 Q16 24 15 12Z" fill="'+c+'"/></g><rect x="14" y="6" width="2" height="14" rx="1" fill="#3a2a1a"/>','width:38px;height:auto')+'</u>';
const paHtml=()=>{
  let h='<u class="su"></u>'+many(4,i=>'<u class="cl" style="top:'+fx(3+i*9)+'%;--t:'+fx(rr(60,110))+'s;--d:-'+fx(rr(0,100))+'s;--s:'+fx(rr(.6,1.1))+'"></u>');
  h+='<u class="hz"></u>'+yard();
  h+=bfly('#ffb84a','left:20%;top:34%;--t:14s;--d:0s')+bfly('#8fd0ff','left:60%;top:20%;--t:18s;--d:-6s')+bfly('#ff8fd0','left:40%;top:48%;--t:16s;--d:-11s');
  h+='<u class="vg"></u>';
  return h};
const paCss=BASE+`
§O{background:linear-gradient(#8fd0ff 0%,#c8e9ff 40%,#e9f7e0 70%,#b9e39a 100%)}
§O .su{left:6%;top:3%;width:min(24vw,100px);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,#fff6c8 0 40%,rgba(255,226,120,.55) 55%,transparent 72%)}
§O .cl{left:0;width:calc(150px * var(--s));height:calc(40px * var(--s));border-radius:40px;background:#fff;opacity:.92;box-shadow:calc(34px * var(--s)) calc(-16px * var(--s)) 0 calc(4px * var(--s)) #fff,calc(76px * var(--s)) calc(-4px * var(--s)) 0 0 #fff;animation:os3-pan var(--t) linear var(--d) infinite}
§O .hz{left:0;right:0;bottom:0;height:30%;background:#8fd16a}
§O .xyd{left:0;bottom:0;width:100%;height:auto;max-height:100%}
§O .xkq{transform-origin:70px 82px;animation:os3-tail 2.6s ease-in-out infinite}
§O .xek{transform-box:fill-box;transform-origin:center;animation:os4-blink 5s infinite}
§O .xdt{transform-origin:88px 108px;animation:os4-wag .35s ease-in-out infinite}
§O .xel{transform-origin:33px 32px;animation:os3-leaf 3s ease-in-out infinite}
§O .xer2{transform-origin:87px 32px;animation:os3-leaf 3s ease-in-out -1.5s infinite}
§O .xtg{transform-origin:60px 66px;animation:os4-pant .5s ease-in-out infinite}
§O .xyr{animation:os4-roll2 7s ease-in-out infinite}
§O .xys{animation:os4-spin2 7s ease-in-out infinite}
§O .bf{animation:os4-fly var(--t) ease-in-out var(--d) infinite}
§O .xbf{position:relative}
§O .xbw{transform-origin:15px 12px;animation:os4-wing .45s ease-in-out infinite}
§O .vg{background:radial-gradient(ellipse at 50% 50%,transparent 65%,rgba(120,180,90,.25))}
:root[data-theme="pati"][data-oyun] .k:not(.g):not(.o):not(.r):not(.w){background:rgba(255,255,255,.5)}`;
document.head.insertAdjacentHTML('beforeend','<style>@keyframes os4-blink{0%,93%,100%{transform:scaleY(1)}96%{transform:scaleY(.1)}}@keyframes os4-wag{0%,100%{transform:rotate(-14deg)}50%{transform:rotate(16deg)}}@keyframes os4-pant{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.18)}}@keyframes os4-roll2{0%,100%{transform:translateX(-40px)}50%{transform:translateX(30px)}}@keyframes os4-roll{0%,100%{transform:translateX(-12vw)}50%{transform:translateX(18vw)}}@keyframes os4-spin2{0%,100%{transform:rotate(-200deg)}50%{transform:rotate(300deg)}}@keyframes os4-fly{0%,100%{transform:translate(0,0)}25%{transform:translate(30vw,-6vh)}50%{transform:translate(10vw,8vh)}75%{transform:translate(-14vw,-4vh)}}@keyframes os4-wing{0%,100%{transform:scaleX(1)}50%{transform:scaleX(.6)}}</style>');

OSEKLE('pati',{html:paHtml,css:paCss});
OSEKLE('saat',{html:saHtml,css:saCss});
OSEKLE('adalar',{html:adHtml,css:adCss});
OSEKLE('lofi',{html:loHtml,css:loCss});
})();
