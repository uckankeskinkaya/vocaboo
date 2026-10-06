// v42: Dört yeni sahneli tema ve onlarla eşleşen dört çerçeve.
// Temalar: İstanbul Gecesi, Final Gecesi (stadyum), Piksel Dünyası, Çöl Masalı. Her biri: menü sahnesi (#sahne), oyun sahnesi
// (#oyunsahne, OSEKLE), tema renkleri + arayüz stili, harf blokları ve dokunuş efekti (TEMAEK, js/34).
// Çerçeveler: Boğaz, Şampiyon, Retro, Çöl Güneşi — SVG ile çizilir (js/30'daki katmanlı çerçeve yapısı).
// Performans: bütün animasyonlar yalnızca transform / opacity (GPU), sahne başına az sayıda öğe; hafif modda durur.
(function(){
if(typeof SCN==='undefined'||typeof TM==='undefined')return;
const rn=(a,b)=>a+Math.random()*(b-a),f=n=>n.toFixed(1);
const many=(n,fn)=>{let h='';for(let i=0;i<n;i++)h+=fn(i);return h};
const svg=(c,vb,inner,par)=>'<svg class="'+c+'" viewBox="'+vb+'" preserveAspectRatio="'+(par||'xMidYMax meet')+'" aria-hidden="true">'+inner+'</svg>';

// ---------- Tema kaydı (js/27 ile aynı biçim) ----------
// [anahtar, ad, koyu?, zemin, panel RGB, panel opaklığı, yazı, soluk, vurgu, vurgu yazısı, [3 önizleme rengi], yazı tipi adresi, menü sahnesi, CSS(§S sahne, §T tema)]
let ALL='';
function tema(d){
  const k=d[0],dk=d[2],T=':root[data-theme="'+k+'"]',S='#sahne[data-s="'+k+'"]';
  SCN[k]={html:d[12],font:d[11]};
  TM[k]=[d[1],dk,d[3],d[4],d[6],d[7],d[8],d[9],d[10][0],d[10][1],d[10][2],0,1];
  if(typeof PREMT!=='undefined'&&!PREMT.includes(k))PREMT.push(k);
  ALL+=T+'{--bg:'+d[3]+';--panel:rgba('+d[4]+','+d[5]+');--fg:'+d[6]+';--dim:'+d[7]+';--line:'+(dk?'rgba(255,255,255,.1)':'rgba(20,30,60,.12)')+';--key:'+(dk?'rgba(255,255,255,.08)':'rgba(20,30,60,.08)')+';--ac:'+d[8]+';--acf:'+d[9]+';--m1:'+d[10][0]+';--m2:'+d[10][1]+';--m3:'+d[10][2]+';--sh:'+(dk?'0 10px 30px rgba(0,0,0,.4)':'0 10px 30px rgba(16,24,40,.12)')+';color-scheme:'+(dk?'dark':'light')+'}\n'
    +T+' body::before{display:none}\n'+d[13].replace(/§S/g,S).replace(/§T/g,T)+'\n';
}

// ================= 1) İstanbul Gecesi =================
// Ufuk çizgisi (Galata Kulesi, cami, Boğaz Köprüsü), ışıklı pencereler, köprü ışıkları
function siluet(){
  const C='#070b22',F='#0f1640';let h='';
  // arka sıradaki evler (açık ton, derinlik)
  [[0,86,22],[20,80,18],[36,90,16],[92,84,20],[110,88,18],[128,82,22],[250,86,20],[268,82,18]].forEach(([x,y,w])=>h+='<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+(120-y)+'" fill="'+F+'"/>');
  // Galata Kulesi
  h+='<rect x="46" y="58" width="16" height="62" fill="'+C+'"/><rect x="43" y="55" width="22" height="4" fill="'+C+'"/><polygon points="44,56 64,56 54,30" fill="'+C+'"/><rect x="53.3" y="24" width="1.4" height="7" fill="'+C+'"/>';
  // ön sıra evler
  [[0,96,18],[16,92,14],[28,98,20],[64,94,16],[78,90,14],[90,96,22],[110,92,16],[124,98,24]].forEach(([x,y,w])=>h+='<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+(120-y)+'" fill="'+C+'"/>');
  // cami: ana kubbe, yarım kubbeler, 4 minare
  h+='<rect x="160" y="84" width="72" height="36" fill="'+C+'"/><path d="M170 86 A26 26 0 0 1 222 86 Z" fill="'+C+'"/><rect x="195.3" y="54" width="1.4" height="8" fill="'+C+'"/>'
    +'<path d="M160 92 A13 13 0 0 1 186 92 Z" fill="'+C+'"/><path d="M206 92 A13 13 0 0 1 232 92 Z" fill="'+C+'"/>';
  [150,170,222,242].forEach((x,i)=>{const t=i===0||i===3?44:36;h+='<rect x="'+x+'" y="'+t+'" width="4" height="'+(120-t)+'" fill="'+C+'"/><polygon points="'+(x-0.5)+','+t+' '+(x+4.5)+','+t+' '+(x+2)+','+(t-13)+'" fill="'+C+'"/><rect x="'+(x-1)+'" y="'+(t+14)+'" width="6" height="2" fill="'+C+'"/>'});
  // zemin
  h+='<rect x="0" y="112" width="400" height="8" fill="'+C+'"/>';
  // köprü: kuleler, tabliye, ana kablo, askılar
  h+='<rect x="300" y="38" width="4" height="82" fill="'+C+'"/><rect x="378" y="38" width="4" height="82" fill="'+C+'"/><rect x="258" y="98" width="142" height="3" fill="'+C+'"/>'
    +'<path d="M258 96 L302 38 Q341 92 380 38 L400 64" fill="none" stroke="#1a2558" stroke-width="1.6"/>';
  for(let x=312;x<376;x+=8){const t=(x-341)/39,y=92-54*t*t;h+='<line x1="'+x+'" y1="'+f(y)+'" x2="'+x+'" y2="98" stroke="#1a2558" stroke-width=".6"/>'}
  // pencere ışıkları (sabit)
  for(let i=0;i<34;i++){const x=rn(2,142),y=rn(94,116);h+='<rect x="'+f(x)+'" y="'+f(y)+'" width="1.6" height="2" fill="#ffcf6e" opacity="'+f(rn(.45,.9))+'"/>'}
  h+='<rect x="51" y="64" width="2" height="3" fill="#ffcf6e"/><rect x="55" y="64" width="2" height="3" fill="#ffcf6e"/><rect x="51" y="74" width="2" height="3" fill="#ffcf6e" opacity=".7"/>';
  // köprü ışıkları (bir kısmı yanıp söner: .bl)
  for(let x=262;x<400;x+=7)h+='<circle class="'+(Math.random()<.35?'bl':'')+'" cx="'+x+'" cy="99.5" r="1.1" fill="#ffd27a" style="animation-delay:-'+f(rn(0,3))+'s"/>';
  h+='<circle class="bl" cx="302" cy="37" r="1.4" fill="#ff5a5a"/><circle class="bl" cx="380" cy="37" r="1.4" fill="#ff5a5a" style="animation-delay:-1s"/>';
  return h;
}
const vapur='<path d="M2 14 L54 14 L48 21 L8 21 Z" fill="#e9edf7"/><rect x="10" y="9" width="34" height="5" fill="#f7f9ff"/><rect x="16" y="5" width="20" height="4" fill="#f7f9ff"/><rect x="24" y="0" width="5" height="6" fill="#20242e"/><rect x="24" y="1.6" width="5" height="1.4" fill="#f2c94c"/>'
  +many(6,i=>'<rect x="'+(12+i*5)+'" y="10.5" width="2.4" height="2" fill="#ffcf6e"/>')+'<path d="M0 22 Q28 25 58 22" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1"/>';
const marti='<path d="M0 6 Q6 0 12 6 Q18 0 24 6" fill="none" stroke="#c9d3f2" stroke-width="1.6" stroke-linecap="round"/>';
function istHtml(){
  return many(16,()=>'<i style="left:'+f(rn(0,100))+'%;top:'+f(rn(2,46))+'%;--z:'+f(rn(1,2.4))+'px;--t:'+f(rn(2.5,5.5))+'s;--d:-'+f(rn(0,5))+'s"></i>')
    +'<u class="ay"></u><u class="pa"></u>'+svg('sl','0 0 400 120',siluet())+'<u class="su"></u><u class="rf"></u>'
    +svg('vp','0 0 58 26',vapur,'xMidYMid meet')+svg('mt m1','0 0 24 8',marti,'xMidYMid meet')+svg('mt m2','0 0 24 8',marti,'xMidYMid meet');
}
const istCss=(X,H)=>`${X}{background:linear-gradient(#050a22 0%,#0c1546 ${H-24}%,#2c2468 ${H-6}%,#7a3f74 ${H}%,#0a1236 ${H}%,#040716 100%)}
${X} i{width:var(--z);height:var(--z);border-radius:50%;background:#fff;animation:sc-tw var(--t) ease-in-out var(--d) infinite}
${X} .ay{right:14%;top:8%;width:46px;height:46px;border-radius:50%;box-shadow:12px -6px 0 0 #fff2c6;filter:drop-shadow(0 0 10px rgba(255,236,170,.55))}
${X} .pa{left:0;right:0;top:${H-14}%;height:14%;background:radial-gradient(60% 100% at 50% 100%,rgba(255,170,110,.35),transparent 70%)}
${X} svg.sl{position:absolute;left:0;width:100%;bottom:${100-H}%;height:auto;aspect-ratio:400/120;max-height:34vh}
${X} svg.sl .bl{animation:ist-bl 2.4s steps(1) infinite}
${X} .su{left:0;right:0;top:${H}%;bottom:0;background:linear-gradient(rgba(10,18,54,.0),rgba(4,7,22,.6))}
${X} .rf{left:8%;width:84%;top:${H+0.5}%;height:22%;background:repeating-linear-gradient(transparent 0 7px,rgba(255,200,110,.22) 7px 9px);-webkit-mask:radial-gradient(60% 90% at 50% 0,#000,transparent 75%);mask:radial-gradient(60% 90% at 50% 0,#000,transparent 75%);will-change:transform;animation:ist-rf 5s ease-in-out infinite alternate}
${X} svg.vp{position:absolute;left:0;top:${H+5}%;width:min(22vw,110px);height:auto;aspect-ratio:58/26;will-change:transform;animation:ist-vp 46s linear infinite}
${X} svg.mt{position:absolute;width:26px;height:9px;will-change:transform;animation:ist-mt 22s linear infinite}
${X} svg.mt.m1{top:${H-30}%;animation-delay:-4s}${X} svg.mt.m2{top:${H-22}%;width:18px;animation-duration:28s;animation-delay:-15s}`;
const istKf=`@keyframes ist-bl{0%,100%{opacity:1}50%{opacity:.25}}
@keyframes ist-rf{from{transform:translateX(-10px)}to{transform:translateX(10px)}}
@keyframes ist-vp{from{transform:translateX(-30vw)}to{transform:translateX(115vw)}}
@keyframes ist-mt{from{transform:translateX(110vw)}to{transform:translateX(-20vw)}}`;
tema(['istanbul','İstanbul Gecesi',1,'#0a1236','14,22,56',.72,'#f4f1ff','#aab4d8','#f4b860','#1c1300',['rgba(244,184,96,.5)','rgba(80,110,220,.45)','rgba(200,100,140,.4)'],
 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap',istHtml,
 istCss('§S',66)+'\n'+istKf+`
§T :is(h1,h2,.greet h2,.feat b){font-family:'Playfair Display',serif;letter-spacing:.01em}
§T :is(.cd,.pl,.sc,.bi,.lvl,#def,.cfb,.mstat,.tt){border:1px solid rgba(244,184,96,.28)}
§T .feat{background:linear-gradient(135deg,#f4b860,#e08a4a);color:#1c1300}`]);

// ================= 2) Final Gecesi (stadyum) =================
function stdHtml(){
  return '<u class="ik l"><b></b></u><u class="ik r"><b></b></u><u class="kn l"></u><u class="kn r"></u><u class="tr"></u>'
    +many(10,()=>'<i style="left:'+f(rn(4,96))+'%;top:var(--fy);margin-top:'+f(rn(0,15))+'vh;--t:'+f(rn(2.5,6.5))+'s;--d:-'+f(rn(0,6))+'s"></i>')
    +'<u class="sh"></u>';
}
const stdCss=(X,A,B)=>`${X}{background:linear-gradient(#010507 0%,#04120b ${A}%,#08160f ${A}%,#08160f ${B}%,#0b3a1c ${B}%,#0b3a1c 100%);--fy:${A+1}%}
${X} .ik{top:3%;width:6px;height:${A-1}%;background:linear-gradient(#2b3a33,#141c18);box-shadow:none}
${X} .ik.l{left:7%}${X} .ik.r{right:7%}
${X} .ik b{position:absolute;top:-6px;left:50%;width:58px;height:24px;margin-left:-29px;border-radius:4px;background:radial-gradient(circle,#fffbe6 0 2.6px,transparent 3px) 0 0/9px 8px,#2b3a33;box-shadow:0 0 22px 6px rgba(255,251,220,.45)}
${X} .kn{top:4%;width:46vw;height:${B+6}%;background:linear-gradient(rgba(255,250,215,.22),rgba(255,250,215,.0) 80%);will-change:opacity;animation:std-kn 4s ease-in-out infinite alternate}
${X} .kn.l{left:-6vw;clip-path:polygon(18% 0,30% 0,100% 100%,0 100%)}
${X} .kn.r{right:-6vw;clip-path:polygon(70% 0,82% 0,100% 100%,0 100%);animation-delay:-2s}
${X} .tr{left:0;right:0;top:${A}%;height:${B-A}%;background:radial-gradient(circle,rgba(255,255,255,.16) 0 1.1px,transparent 1.5px) 0 0/7px 6px,radial-gradient(circle,rgba(198,255,61,.22) 0 1.2px,transparent 1.6px) 3px 2px/11px 9px,linear-gradient(#0d1a14,#0a140f);box-shadow:inset 0 3px 0 rgba(255,255,255,.08)}
${X} i{width:5px;height:5px;border-radius:50%;background:#fff;box-shadow:0 0 8px 3px rgba(255,255,255,.8);opacity:0;animation:std-fl var(--t) linear var(--d) infinite}
${X} .sh{left:-60%;right:-60%;bottom:0;height:${100-B}%;transform:perspective(420px) rotateX(52deg);transform-origin:50% 100%;
 background:linear-gradient(transparent calc(50% - 1.5px),rgba(255,255,255,.75) calc(50% - 1.5px) calc(50% + 1.5px),transparent calc(50% + 1.5px)),
 radial-gradient(circle at 50% 50%,transparent 0 58px,rgba(255,255,255,.75) 58px 61px,transparent 61px),
 linear-gradient(90deg,transparent 4%,rgba(255,255,255,.7) 4% calc(4% + 3px),transparent calc(4% + 3px) calc(96% - 3px),rgba(255,255,255,.7) calc(96% - 3px) 96%,transparent 96%),
 repeating-linear-gradient(90deg,#1e7a38 0 46px,#25903f 46px 92px);
 -webkit-mask:linear-gradient(transparent,#000 22%);mask:linear-gradient(transparent,#000 22%)}`;
const stdKf=`@keyframes std-kn{from{opacity:.65}to{opacity:1}}
@keyframes std-fl{0%,90%,100%{opacity:0}92%{opacity:1}95%{opacity:0}97%{opacity:.8}}`;
tema(['stadyum','Final Gecesi',1,'#06140c','8,28,18',.74,'#effff4','#9fc9ad','#c6ff3d','#0b1400',['rgba(60,200,100,.45)','rgba(255,255,255,.35)','rgba(198,255,61,.4)'],
 'https://fonts.googleapis.com/css2?family=Oswald:wght@600;700&display=swap',stdHtml,
 stdCss('§S',30,50)+'\n'+stdKf+`
§T :is(h1,h2,.greet h2,.feat b){font-family:'Oswald',sans-serif;text-transform:uppercase;letter-spacing:.03em}
§T :is(.cd,.pl,.sc,.bi,.lvl,#def,.cfb,.mstat,.tt){border:1px solid rgba(255,255,255,.14)}
§T .feat{background:linear-gradient(135deg,#c6ff3d,#3fd16b);color:#0b1400}`]);

// ================= 3) Piksel Dünyası =================
// Piksel bulut: 8px ızgarada box-shadow (bir kez boyanır, sadece kaydırılır)
const PX=8,pxs=(pts,c)=>pts.map(([x,y])=>(x*PX)+'px '+(y*PX)+'px 0 '+c).join(',');
const BULUT=pxs([[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[-1,2],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[-1,3],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3]],'#fff')+','+pxs([[0,4],[1,4],[2,4],[3,4],[4,4],[5,4]],'#d6efff');
const GUNES=pxs([[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[4,1],[0,2],[1,2],[2,2],[3,2],[4,2],[0,3],[1,3],[2,3],[3,3],[4,3],[1,4],[2,4],[3,4]],'#ffd84a')+','+pxs([[2,-2],[2,6],[-2,2],[6,2],[-1,-1],[5,-1],[-1,5],[5,5]],'#ffe98a');
function tepe(c,pts){return '<polygon points="'+pts+'" fill="'+c+'"/>'}
function pikHtml(){
  const t1=tepe('#7ed957','0,40 0,26 8,26 8,20 16,20 16,14 30,14 30,20 38,20 38,26 52,26 52,18 60,18 60,12 72,12 72,18 80,18 80,24 92,24 92,30 100,30 100,40'),
        t2=tepe('#48b04a','0,40 0,32 10,32 10,28 22,28 22,24 34,24 34,30 46,30 46,34 60,34 60,28 70,28 70,22 82,22 82,28 92,28 92,34 100,34 100,40');
  return '<u class="gn"></u>'+many(3,i=>'<u class="bu" style="top:'+(8+i*12)+'%;--t:'+(70+i*25)+'s;--d:-'+(i*31)+'s"></u>')
    +many(4,i=>'<u class="al" style="left:'+(14+i*22)+'%;top:'+(30+(i%2)*8)+'%;--d:-'+f(i*.3)+'s"></u>')
    +svg('tp','0 0 100 40',t1+t2,'none')+'<u class="zm"></u>';
}
const pikCss=(X,G)=>`${X}{background:linear-gradient(#4fb8ff 0%,#8fd6ff 55%,#c9ecff 100%);image-rendering:pixelated}
${X} .gn{right:12%;top:7%;width:${PX}px;height:${PX}px;box-shadow:${GUNES}}
${X} .bu{left:0;width:${PX}px;height:${PX}px;box-shadow:${BULUT};will-change:transform;animation:pik-bu var(--t) linear var(--d) infinite}
${X} .al{width:12px;height:16px;background:#ffcf2e;box-shadow:inset -3px -3px 0 #e09a00,inset 3px 3px 0 #fff3a0,0 0 0 2px #8a5a00;will-change:transform;animation:pik-al .8s steps(1) var(--d) infinite}
${X} svg.tp{position:absolute;left:0;width:100%;bottom:${G}%;height:16vh;shape-rendering:crispEdges}
${X} .zm{left:0;right:0;bottom:0;height:${G}%;background:linear-gradient(#5fc24a 0 8px,#3e8e2e 8px 12px,transparent 12px),repeating-linear-gradient(90deg,transparent 0 30px,#7a4a22 30px 32px),repeating-linear-gradient(#b5733a 0 14px,#7a4a22 14px 16px),#b5733a}`;
const pikKf=`@keyframes pik-bu{from{transform:translateX(-25vw)}to{transform:translateX(110vw)}}
@keyframes pik-al{0%{transform:scaleX(1)}25%{transform:scaleX(.55)}50%{transform:scaleX(.15)}75%{transform:scaleX(.55)}}`;
tema(['piksel','Piksel Dünyası',0,'#8fd6ff','255,255,255',.88,'#1b1b2f','#45506e','#e8452c','#ffffff',['rgba(94,200,255,.55)','rgba(76,175,80,.5)','rgba(255,200,40,.5)'],
 'https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&display=swap',pikHtml,
 pikCss('§S',14)+'\n'+pikKf+`
§T :is(h1,h2,.greet h2,.feat b){font-family:'Silkscreen',monospace;letter-spacing:.02em}
§T :is(.cd,.pl,.sc,.bi,.lvl,#def,.cfb,.mstat,.tt,.feat){border:3px solid #1b1b2f;border-radius:4px!important;box-shadow:4px 4px 0 #1b1b2f}
§T .feat{background:#e8452c;color:#fff}`]);

// ================= 4) Çöl Masalı =================
function deve(x){return '<g transform="translate('+x+' 0)"><path d="M2 20 L4 12 Q4 8 8 8 L10 4 Q12 2 14 4 L16 8 Q20 6 22 9 Q26 6 28 10 L30 12 L33 9 L35 9 L35 12 L32 14 L31 20 L29 20 L29 15 L22 15 L21 20 L19 20 L18 15 L10 15 L9 20 L7 20 L7 14 L5 14 L4 20 Z" fill="#5a3418"/></g>'}
const kervan=deve(0)+deve(40)+deve(80)+'<path d="M120 20 L121 10 Q121 7 123 7 Q125 7 125 10 L126 20 Z" fill="#5a3418"/><circle cx="123" cy="5" r="2.2" fill="#5a3418"/>';
const palmiye='<path d="M30 70 Q28 40 34 18" fill="none" stroke="#4a3018" stroke-width="4"/><g fill="#3e6b2e"><path d="M34 18 Q16 8 2 18 Q18 14 34 20Z"/><path d="M34 18 Q50 6 66 16 Q50 14 34 20Z"/><path d="M34 18 Q22 0 10 4 Q24 8 34 19Z"/><path d="M34 18 Q46 -2 60 4 Q46 8 34 19Z"/><path d="M34 18 Q30 30 22 38 Q32 28 35 20Z"/></g><ellipse cx="44" cy="72" rx="34" ry="6" fill="#3fb3b0" opacity=".85"/>';
const kum=(c,d)=>'<path d="'+d+'" fill="'+c+'"/>';
function colHtml(){
  return '<u class="gs"></u>'+many(2,i=>'<u class="ku" style="top:'+(16+i*7)+'%;--t:'+(40+i*14)+'s;--d:-'+(i*17)+'s"></u>')
    +svg('d1','0 0 400 100',kum('#f2b66f','M0 60 Q60 20 130 46 Q200 72 260 34 Q330 0 400 40 L400 100 L0 100Z'),'none')
    +svg('kv','0 0 128 22',kervan,'xMidYMax meet')
    +svg('d2','0 0 400 100',kum('#e19650','M0 50 Q80 80 160 52 Q240 22 300 56 Q350 80 400 58 L400 100 L0 100Z'),'none')
    +svg('pm','0 0 80 80',palmiye,'xMidYMax meet')
    +svg('d3','0 0 400 100',kum('#c9793c','M0 64 Q90 40 190 70 Q280 96 400 66 L400 100 L0 100Z'),'none')
    +many(7,()=>'<i style="left:'+f(rn(0,90))+'%;top:'+f(rn(70,94))+'%;--t:'+f(rn(5,9))+'s;--d:-'+f(rn(0,8))+'s"></i>');
}
const colCss=(X,U)=>`${X}{background:linear-gradient(#ff8f4e 0%,#ffb56b ${U*0.5}%,#ffd99c ${U}%,#f6c27a 100%)}
${X} .gs{left:50%;top:${U*0.32}%;width:46vmin;height:46vmin;margin-left:-23vmin;border-radius:50%;background:radial-gradient(circle,#fff6d6 0 38%,#ffd58a 52%,rgba(255,190,110,0) 70%);will-change:transform;animation:col-gs 9s ease-in-out infinite alternate}
${X} .ku{left:0;width:26px;height:9px;background:none;border-top:2px solid rgba(110,50,20,.5);border-radius:50% 50% 0 0;will-change:transform;animation:col-ku var(--t) linear var(--d) infinite}
${X} svg.d1,${X} svg.d2,${X} svg.d3{position:absolute;left:-4%;width:108%;will-change:transform}
${X} svg.d1{bottom:24%;height:24%;animation:col-sl 24s ease-in-out infinite alternate}
${X} svg.d2{bottom:9%;height:24%;animation:col-sl 18s ease-in-out infinite alternate-reverse}
${X} svg.d3{bottom:0;height:18%}
${X} svg.kv{position:absolute;left:0;bottom:39%;width:min(34vw,170px);height:auto;aspect-ratio:128/22;will-change:transform;animation:col-kv 80s linear infinite}
${X} svg.pm{position:absolute;left:2%;bottom:8%;width:min(30vw,150px);height:auto;aspect-ratio:1}
${X} i{width:3px;height:3px;border-radius:50%;background:rgba(255,244,220,.85);will-change:transform;animation:col-tz var(--t) linear var(--d) infinite}`;
const colKf=`@keyframes col-gs{from{transform:scale(1)}to{transform:scale(1.05)}}
@keyframes col-sl{from{transform:translateX(-1.5%)}to{transform:translateX(1.5%)}}
@keyframes col-kv{from{transform:translateX(-40vw)}to{transform:translateX(110vw)}}
@keyframes col-ku{from{transform:translateX(105vw)}to{transform:translateX(-10vw)}}
@keyframes col-tz{from{transform:translate(0,0);opacity:0}15%{opacity:1}to{transform:translate(55vw,-8vh);opacity:0}}`;
tema(['col','Çöl Masalı',0,'#ffd99c','255,247,234',.82,'#3a2212','#7d5a3c','#c4532a','#ffffff',['rgba(255,170,90,.5)','rgba(230,140,70,.45)','rgba(60,170,160,.35)'],
 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&display=swap',colHtml,
 colCss('§S',58)+'\n'+colKf+`
§T :is(h1,h2,.greet h2,.feat b){font-family:'Cormorant Garamond',serif;letter-spacing:.01em}
§T :is(.cd,.pl,.sc,.bi,.lvl,#def,.cfb,.mstat,.tt){border:1px solid rgba(196,83,42,.22)}
§T .feat{background:linear-gradient(135deg,#d9632e,#b8432a);color:#fff}`]);

document.head.insertAdjacentHTML('beforeend','<style id="sahne-4">'+ALL+'</style>');
// Kayıtlı tema bu dosyadaki temalardan biriyse sahnesini kur (js/27 açılışta bu temaları henüz tanımıyordu)
try{const t=localStorage.getItem('ka_theme');if(t&&['istanbul','stadyum','piksel','col'].includes(t)&&typeof sahneKur==='function'){document.documentElement.dataset.theme=t;sahneKur(t)}}catch(e){}
Object.assign(EN,{'İstanbul Gecesi':'Istanbul Night','Final Gecesi':'Final Night','Piksel Dünyası':'Pixel World','Çöl Masalı':'Desert Tale'});

// ---------- Oyun sahneleri (ufuk daha yukarıda; kareler ortada, klavye altta) ----------
if(window.OSEKLE){
  OSEKLE('istanbul',{html:istHtml,css:istCss('§O',44)+'\n'+istKf});
  OSEKLE('stadyum',{html:stdHtml,css:stdCss('§O',16,34)+'\n'+stdKf});
  OSEKLE('piksel',{html:pikHtml,css:pikCss('§O',10)+'\n'+pikKf});
  OSEKLE('col',{html:colHtml,css:colCss('§O',44)+'\n'+colKf});
}

// ---------- Harf blokları ve dokunuş efektleri ----------
if(window.TEMAEK){
  TEMAEK('istanbul',{t:'txt',m:'out',n:8,c:['#f4b860','#ffe2a8','#ffffff'],s:[13,20],g:['✦','✧','☾']},{f:"'Playfair Display',serif",
    e:'background:linear-gradient(160deg,rgba(26,36,86,.78),rgba(10,16,50,.85));border:1.5px solid rgba(244,184,96,.42);border-radius:10px;box-shadow:inset 0 1px 0 rgba(255,255,255,.1)',
    fl:'border-color:#f4b860;box-shadow:0 0 12px rgba(244,184,96,.5);color:#ffe2a8',
    g:'background:linear-gradient(160deg,#36b37e,#146b48);color:#fff;border:1.5px solid #f4b860;border-radius:10px;box-shadow:0 0 12px rgba(54,179,126,.45)',
    o:'background:linear-gradient(160deg,#ffcf6e,#e0902e);color:#2a1700;border:1.5px solid #fff0c8;border-radius:10px;box-shadow:0 0 12px rgba(244,184,96,.55)',
    r:'background:linear-gradient(160deg,#a4314a,#5a1426);color:#ffe0e6;border:1.5px solid rgba(244,184,96,.5);border-radius:10px'});
  TEMAEK('stadyum',{t:'rect',m:'out',n:10,c:['#ffffff','#c6ff3d','#3fd16b','#ffd400'],s:[8,16]},{f:"'Oswald',sans-serif",
    e:'background:linear-gradient(#10251a,#081109);border:1.5px solid rgba(255,255,255,.28);border-radius:6px;box-shadow:inset 0 0 0 1px rgba(0,0,0,.4)',
    fl:'border-color:#c6ff3d;box-shadow:0 0 12px rgba(198,255,61,.5);color:#eaffc4',
    g:'background:repeating-linear-gradient(90deg,#24a14a 0 25%,#1e8a3e 25% 50%);color:#fff;border:1.5px solid #e9ffe9;border-radius:6px;box-shadow:0 0 12px rgba(60,200,100,.5)',
    o:'background:linear-gradient(#ffe14a,#f2b705);color:#2a2200;border:1.5px solid #fff6b0;border-radius:4px;box-shadow:0 0 12px rgba(255,212,0,.55)',
    r:'background:linear-gradient(#ff3b3b,#c40d1d);color:#fff;border:1.5px solid #ffc0c0;border-radius:4px;box-shadow:0 0 12px rgba(255,40,40,.5)'});
  TEMAEK('piksel',{t:'sq',m:'out',n:8,c:['#ffcf2e','#e8452c','#4caf50','#4fb8ff'],s:[6,10]},{f:"'Silkscreen',monospace",
    e:'background:#ffffff;border:3px solid #1b1b2f;border-radius:0;box-shadow:inset -4px -4px 0 #d6dceb;font-size:calc(var(--t)*.4)',
    fl:'border-color:#e8452c;box-shadow:inset -4px -4px 0 #ffd2c8;color:#e8452c',
    g:'background:#4caf50;color:#fff;border:3px solid #1b1b2f;border-radius:0;box-shadow:inset -4px -4px 0 #2e7d32,inset 4px 4px 0 #81c784;font-size:calc(var(--t)*.4)',
    o:'background:#ffb300;color:#1b1b2f;border:3px solid #1b1b2f;border-radius:0;box-shadow:inset -4px -4px 0 #e08a00,inset 4px 4px 0 #ffd54f;font-size:calc(var(--t)*.4)',
    r:'background:#e53935;color:#fff;border:3px solid #1b1b2f;border-radius:0;box-shadow:inset -4px -4px 0 #b71c1c,inset 4px 4px 0 #ef7470;font-size:calc(var(--t)*.4)'});
  TEMAEK('col',{t:'dot',m:'up',n:9,c:['#f6c27a','#e9a25f','#fff1d6'],s:[3,5]},{f:"'Cormorant Garamond',serif",
    e:'background:linear-gradient(#fff6e6,#f6dfba);border:2px solid #d9a066;border-radius:9px;box-shadow:inset 0 -3px 0 rgba(170,100,40,.25)',
    fl:'border-color:#c4532a;box-shadow:inset 0 -3px 0 rgba(170,100,40,.25),0 0 0 3px rgba(196,83,42,.2)',
    g:'background:linear-gradient(#57b98a,#2e8a5e);color:#fff;border:2px solid #e9f7ee;border-radius:9px;box-shadow:inset 0 -3px 0 rgba(0,0,0,.18)',
    o:'background:linear-gradient(#ffc45a,#e8952a);color:#3a2212;border:2px solid #fff0d0;border-radius:9px;box-shadow:inset 0 -3px 0 rgba(0,0,0,.15)',
    r:'background:linear-gradient(#d4593a,#a33a22);color:#fff;border:2px solid #ffd8c8;border-radius:9px;box-shadow:inset 0 -3px 0 rgba(0,0,0,.2)'});
}

// ================= Çerçeveler (SVG, katmanlı) =================
let NFN=0;
const halka=(id,c1,c2,c3)=>'<defs><linearGradient id="g'+id+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="'+c1+'"/><stop offset=".55" stop-color="'+c2+'"/><stop offset="1" stop-color="'+c3+'"/></linearGradient></defs>';
const NF={
  // Boğaz: lacivert halka, altın kenarlar, sırayla yanan köprü ışıkları, hilal ve yıldız
  bogaz(id){
    let b=halka(id,'#1d2f7a','#0d1748','#2a3f9a')+'<circle cx="100" cy="100" r="67" fill="#081033"/><circle cx="100" cy="100" r="59.5" fill="none" stroke="url(#g'+id+')" stroke-width="13"/>'
      +'<circle cx="100" cy="100" r="66.5" fill="none" stroke="#f4b860" stroke-width="1.8"/><circle cx="100" cy="100" r="52.5" fill="none" stroke="#f4b860" stroke-width="1.4"/>';
    let fr='';for(let i=0;i<18;i++){const a=i/18*Math.PI*2,x=100+59.5*Math.cos(a),y=100+59.5*Math.sin(a);fr+='<circle class="nf-tw" cx="'+f(x)+'" cy="'+f(y)+'" r="2.1" fill="#ffd98a" style="animation-delay:'+f(-i*0.12)+'s"/>'}
    fr+='<g class="x"><path d="M150 36 A13 13 0 1 0 162 58 A10 10 0 1 1 150 36Z" fill="#fff2c6"/><path d="M163 40 l1.6 4.2 4.4.2-3.4 2.8 1.2 4.3-3.8-2.5-3.8 2.5 1.2-4.3-3.4-2.8 4.4-.2z" fill="#fff2c6"/></g>';
    return [b,fr];
  },
  // Şampiyon: altın halka, iki defne dalı, üstte parlayan yıldız, halkada dönen parıltı
  sampiyon(id){
    let b=halka(id,'#fff3b0','#f5b301','#a86b00')+'<circle cx="100" cy="100" r="67" fill="#3a2600"/><circle cx="100" cy="100" r="59.5" fill="none" stroke="url(#g'+id+')" stroke-width="13"/>'
      +'<circle cx="100" cy="100" r="52.5" fill="none" stroke="#fff7d1" stroke-width="1.2" opacity=".8"/><circle cx="100" cy="100" r="66.5" fill="none" stroke="#7a4d00" stroke-width="1.4"/>'
      +'<g class="sp"><path d="M100 40.5 A59.5 59.5 0 0 1 151.5 70" fill="none" stroke="rgba(255,255,255,.75)" stroke-width="4" stroke-linecap="round"/></g>';
    let lf='';
    [-1,1].forEach(sd=>{for(let i=0;i<8;i++){const a=(110+i*17)*Math.PI/180,r=74,x=100+sd*r*Math.cos(a)*-1,y=100+r*Math.sin(a)*-1+0;
      const ang=sd*(i*17-70);lf+='<ellipse cx="'+f(100-sd*r*Math.cos(a))+'" cy="'+f(100+r*Math.sin(a))+'" rx="9" ry="4.2" transform="rotate('+f(sd>0?-(i*17)+20:(i*17)-20)+' '+f(100-sd*r*Math.cos(a))+' '+f(100+r*Math.sin(a))+')" fill="'+(i%2?'#f5b301':'#ffd54a')+'" stroke="#8a5a00" stroke-width=".8"/>'}});
    let fr='<g class="x">'+lf+'</g><g class="x nf-st"><path d="M100 8 l6 13.5 14.6 1.4-11 9.8 3.2 14.3L100 39.5 87.2 47 90.4 32.7l-11-9.8 14.6-1.4z" fill="#fff3b0" stroke="#b07800" stroke-width="1.2"/></g>';
    return [b,fr];
  },
  // Retro: piksel halka (8x8 ızgara), sırayla parlayan pikseller, dönen piksel altın
  retro(id){
    const C=['#e8452c','#ffb300','#4caf50','#4fb8ff'];let b='<circle cx="100" cy="100" r="67" fill="#1b1b2f"/>',fr='';const seen=new Set();let n=0;
    for(let i=0;i<72;i++){const a=i/72*Math.PI*2,x=Math.round((100+59*Math.cos(a))/8)*8-4,y=Math.round((100+59*Math.sin(a))/8)*8-4,key=x+','+y;if(seen.has(key))continue;seen.add(key);
      const c=C[Math.floor((a/(Math.PI*2))*4)%4];b+='<rect x="'+x+'" y="'+y+'" width="8" height="8" fill="'+c+'" stroke="#1b1b2f" stroke-width="1"/>';
      if(n%3===0)fr+='<rect class="nf-px" x="'+x+'" y="'+y+'" width="8" height="8" fill="#ffffff" style="animation-delay:'+f(-n*0.07)+'s"/>';n++}
    fr+='<g class="x" transform="translate(148 30)"><g class="nf-co"><rect x="-6" y="-8" width="12" height="16" fill="#ffcf2e" stroke="#8a5a00" stroke-width="2"/><rect x="-1.5" y="-4" width="3" height="8" fill="#e09a00"/></g></g>';
    return [b,fr];
  },
  // Çöl Güneşi: yavaş dönen güneş ışınları, sıcak turuncu-altın halka
  gunes(id){
    let r='';for(let i=0;i<20;i++){const a=i/20*Math.PI*2,a1=a-.07,a2=a+.07,R1=66,R2=i%2?82:90;r+='<polygon points="'+f(100+R1*Math.cos(a1))+','+f(100+R1*Math.sin(a1))+' '+f(100+R2*Math.cos(a))+','+f(100+R2*Math.sin(a))+' '+f(100+R1*Math.cos(a2))+','+f(100+R1*Math.sin(a2))+'" fill="'+(i%2?'#ffb347':'#ffd166')+'"/>'}
    let b=halka(id,'#ffe08a','#f08a3a','#c4532a')+'<g class="sp x nf-sl">'+r+'</g><circle cx="100" cy="100" r="67" fill="#6a2a0c"/><circle cx="100" cy="100" r="59.5" fill="none" stroke="url(#g'+id+')" stroke-width="13"/>'
      +'<circle cx="100" cy="100" r="66.5" fill="none" stroke="#ffe7b0" stroke-width="1.4"/><circle cx="100" cy="100" r="52.5" fill="none" stroke="#ffe7b0" stroke-width="1.2" opacity=".8"/>';
    return [b,''];
  }
};
const NFAD={bogaz:['Boğaz',['#f4b860','#1d2f7a','#081033','#ffd98a']],sampiyon:['Şampiyon',['#f5b301','#fff3b0','#a86b00','#ffd54a']],retro:['Retro',['#e8452c','#ffb300','#4caf50','#4fb8ff']],gunes:['Çöl Güneşi',['#f08a3a','#ffd166','#c4532a','#ffe08a']]};
Object.keys(NFAD).forEach(k=>{if(typeof FRM!=='undefined'){FRM[k]=[NFAD[k][0],NFAD[k][1],'svg',{shop:1},0,'✦','out','',4];UNL.push({id:'frame:'+k,t:'frame',n:NFAD[k][0],req:{shop:1}})}});
Object.assign(EN,{'Boğaz':'Bosphorus','Şampiyon':'Champion','Retro':'Retro','Çöl Güneşi':'Desert Sun'});
const _fh=frameHtml;frameHtml=function(h,k){
  if(!Object.prototype.hasOwnProperty.call(NF,k))return _fh(h,k);
  const m=/(?:width="|width:)(\d+)/.exec(h),s=m?+m[1]:40,id='nf'+(++NFN),sv=NF[k](id);
  return '<span class="rk nf nf-'+k+(s<40?' sm':'')+'" style="--s:'+s+'px">'+h
    +'<svg class="rk-b" viewBox="0 0 200 200" aria-hidden="true">'+sv[0]+'</svg>'
    +'<svg class="rk-f" viewBox="0 0 200 200" aria-hidden="true">'+sv[1]+'</svg></span>';
};
document.head.insertAdjacentHTML('beforeend',`<style id="cerceve-4">
.nf .nf-tw{animation:nf-tw 2.16s ease-in-out infinite}
.nf .nf-px{opacity:0;animation:nf-px 1.8s steps(1) infinite}
.nf .nf-co{transform-box:fill-box;transform-origin:center;animation:nf-co .9s steps(1) infinite}
.nf .nf-st{transform-box:fill-box;transform-origin:center;animation:nf-st 2.4s ease-in-out infinite}
.nf .nf-sl{animation-duration:24s}
.nf-sampiyon .rk-b{filter:drop-shadow(0 0 calc(var(--s)*.06) rgba(245,179,1,.55))}
.nf-bogaz .rk-b{filter:drop-shadow(0 0 calc(var(--s)*.05) rgba(244,184,96,.4))}
.nf-gunes .rk-b{filter:drop-shadow(0 0 calc(var(--s)*.06) rgba(255,160,70,.5))}
.nf>:first-child{box-shadow:0 0 0 calc(var(--s)*.02) rgba(0,0,0,.35)}
@keyframes nf-tw{0%,100%{opacity:.35}50%{opacity:1}}
@keyframes nf-px{0%{opacity:.9}20%{opacity:0}}
@keyframes nf-co{0%{transform:scaleX(1)}25%{transform:scaleX(.5)}50%{transform:scaleX(.12)}75%{transform:scaleX(.5)}}
@keyframes nf-st{0%,100%{transform:scale(1);opacity:.9}50%{transform:scale(1.12);opacity:1}}
:root[data-perf=low] .nf *{animation:none!important}
@media (prefers-reduced-motion:reduce){.nf *{animation:none!important}}
</style>`);
})();
