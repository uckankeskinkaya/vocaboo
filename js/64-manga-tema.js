// v44: Manga teması (siyah-beyaz, fırça/mürekkep) ve eşleşen "Manga Fırçası" çerçevesi.
// Tema: kağıt zemin, kalın siyah panel çizgileri ve sert gölge, yarım ton (screentone) noktaları, hız çizgileri (kare kare titreyen),
// elle çizilmiş fırça darbeleri ve mürekkep damlaları. Harf durumları renksiz: doğru = siyah, yeri yanlış = noktalı ton, yok = çizgili gri.
// Performans: animasyonlar yalnızca transform (iki durumlu adım), sahne başına birkaç öğe; hafif modda durur.
(function(){
if(typeof SCN==='undefined'||typeof TM==='undefined')return;
const KEY='manga',INK='#111',KAGIT='#f6f3ec';
const lcg=s=>()=>(s=(s*16807)%2147483647)/2147483647;
const f=n=>n.toFixed(1);
const many=(n,fn)=>{let h='';for(let i=0;i<n;i++)h+=fn(i);return h};
const svg=(c,vb,inner,par,st)=>'<svg class="'+c+'" viewBox="'+vb+'" preserveAspectRatio="'+(par||'xMidYMid meet')+'"'+(st?' style="'+st+'"':'')+' aria-hidden="true">'+inner+'</svg>';

// ---------- Fırça ve mürekkep çizimi (rastgelelik sabit tohumlu: menü ve oyun sahnesi aynı görünür) ----------
function firca(ax,ay,bx,by,w,seed){
  const R=lcg(seed),n=18,dx=bx-ax,dy=by-ay,L=Math.hypot(dx,dy),nx=-dy/L,ny=dx/L,T=[],B=[];
  for(let i=0;i<=n;i++){
    const t=i/n,env=t<.1?t/.1:1-.82*(t-.1)/.9,cx=ax+dx*t+(R()-.5)*w*.12,cy=ay+dy*t+(R()-.5)*w*.12;
    const a=w*env*(.7+.6*R()),b=w*env*(.55+.7*R());
    T.push([cx+nx*a,cy+ny*a]);B.push([cx-nx*b,cy-ny*b]);
  }
  const P=T.concat(B.reverse()).map((p,i)=>(i?'L':'M')+f(p[0])+' '+f(p[1])).join('')+'Z';
  // kuru fırça izleri: kağıt renginde ince kesik çizgiler
  let k='';
  for(let j=0;j<5;j++){
    const o=(j-2)*w*.38+(R()-.5)*w*.2,t0=.08+R()*.5,t1=Math.min(.98,t0+.2+R()*.4);
    k+='<path d="M'+f(ax+dx*t0+nx*o)+' '+f(ay+dy*t0+ny*o)+'L'+f(ax+dx*t1+nx*o)+' '+f(ay+dy*t1+ny*o)+'" stroke="'+KAGIT+'" stroke-width="'+f(.7+R()*1.4)+'" stroke-dasharray="'+f(3+R()*9)+' '+f(2+R()*6)+'" opacity=".85" fill="none"/>';
  }
  return '<path d="'+P+'" fill="'+INK+'"/>'+k;
}
function damla(cx,cy,r,seed){
  const R=lcg(seed);let h='<circle cx="'+f(cx)+'" cy="'+f(cy)+'" r="'+f(r)+'" fill="'+INK+'"/>';
  for(let i=0;i<9;i++){const a=R()*6.283,d=r*(1.5+R()*2.6),k=r*(.12+R()*.3);h+='<circle cx="'+f(cx+Math.cos(a)*d)+'" cy="'+f(cy+Math.sin(a)*d)+'" r="'+f(k*r*.5+.8)+'" fill="'+INK+'"/>'}
  return h;
}
function yirtik(seed){
  const R=lcg(seed);let d='M0 0H400V6';
  for(let x=400;x>=0;x-=8+R()*10)d+='L'+f(x)+' '+f(4+R()*13);
  return '<path d="'+d+'L0 8Z" fill="'+INK+'"/>';
}
// Hız çizgileri: merkezde sivri, dışta kalın ince üçgenler
function hiz(n,seed){
  const R=lcg(seed);let h='';
  for(let i=0;i<n;i++){
    const a=i/n*6.283+R()*.05,w=.004+R()*.02,r0=36+R()*10,r1=92;
    h+='<polygon points="'+f(50+Math.cos(a)*r0)+','+f(50+Math.sin(a)*r0)+' '+f(50+Math.cos(a-w)*r1)+','+f(50+Math.sin(a-w)*r1)+' '+f(50+Math.cos(a+w)*r1)+','+f(50+Math.sin(a+w)*r1)+'" fill="'+INK+'"/>';
  }
  return h;
}

// ---------- Sahne ----------
function mgHtml(){
  return '<u class="ht ht1"></u><u class="ht ht2"></u>'
    +'<u class="slw">'+svg('sl','0 0 100 100',hiz(64,7),'none')+'</u>'
    +svg('yr','0 0 400 20',yirtik(3),'none')
    +svg('fa fa1','0 0 200 200',firca(204,8,70,128,17,11)+firca(196,44,120,112,9,5)+damla(52,148,6,2),'xMaxYMin meet')
    +svg('fa fa2','0 0 200 200',firca(-4,192,132,84,19,23)+firca(6,150,60,104,8,9)+damla(168,40,5,4),'xMinYMax meet')
    +svg('fa fa3','0 0 120 120',damla(60,60,9,31),'xMidYMid meet')
    +[[40,'6.5s','-1s'],[55,'8s','-4.5s'],[70,'7s','-2.5s']].map(d=>svg('dr','0 0 10 60','<rect x="4.2" y="0" width="1.6" height="42" fill="'+INK+'"/><circle cx="5" cy="46" r="3.6" fill="'+INK+'"/>','xMidYMin meet','left:'+d[0]+'%;--t:'+d[1]+';--d:'+d[2])).join('')
    +[['bm bm1','BOOM!','-12deg','0s'],['bm bm2','BOOM!','10deg','-4s'],['bm bm3','BOOM!','-6deg','-8s']].map(b=>svg(b[0],'0 0 100 100',patlama()+'<text x="50" y="58" text-anchor="middle" font-family="Impact,\'Arial Black\',sans-serif" font-weight="900" font-size="'+(b[1].length>4?17:21)+'" fill="'+INK+'" transform="rotate(-6 50 50)">'+b[1]+'</text>','xMidYMid meet','--r:'+b[2]+';--d:'+b[3])).join('');
}
// Patlama balonu: sivri kenarlı beyaz yıldız, siyah çerçeveli
function patlama(){let p='';for(let i=0;i<20;i++){const a=i/20*6.283,r=i%2?33:48;p+=f(50+Math.cos(a)*r)+','+f(50+Math.sin(a)*r)+' '}return '<polygon points="'+p+'" fill="#fff" stroke="'+INK+'" stroke-width="3.2" stroke-linejoin="round"/>'}
const mgCss=X=>`${X}{background:${KAGIT}}
${X} .ht{width:72vmin;height:72vmin}
${X} .ht1{right:0;top:0;background:radial-gradient(${INK} 1.2px,transparent 1.6px) 0 0/7px 7px;-webkit-mask:radial-gradient(circle at 100% 0,#000,transparent 68%);mask:radial-gradient(circle at 100% 0,#000,transparent 68%);opacity:.5}
${X} .ht2{left:0;bottom:0;background:radial-gradient(${INK} 1.9px,transparent 2.4px) 0 0/10px 10px;-webkit-mask:radial-gradient(circle at 0 100%,#000,transparent 66%);mask:radial-gradient(circle at 0 100%,#000,transparent 66%);opacity:.55}
${X} .slw{left:-30%;top:-30%;width:160%;height:160%;-webkit-mask:linear-gradient(transparent 22%,#000 48%);mask:linear-gradient(transparent 22%,#000 48%);opacity:.34}
${X} svg.sl{position:absolute;inset:0;width:100%;height:100%;will-change:transform;animation:mg-j .7s steps(1) infinite}
${X} svg.yr{position:absolute;left:0;top:0;width:100%;height:2.4vh}
${X} svg.fa{position:absolute;height:auto;aspect-ratio:1}
${X} svg.fa1,${X} svg.fa2{will-change:transform,opacity;animation:mg-fa 10s ease-out var(--d,0s) infinite}
${X} svg.fa1{--tx:14%;--ty:-10%}${X} svg.fa2{--tx:-14%;--ty:10%;--d:-3.5s}
${X} svg.dr{position:absolute;top:1.6%;width:3vmin;height:auto;aspect-ratio:10/60;transform-origin:50% 0;opacity:0;will-change:transform,opacity;animation:mg-dr var(--t) ease-in var(--d) infinite}
${X} svg.bm{position:absolute;width:24vmin;height:24vmin;opacity:0;will-change:transform,opacity;animation:mg-bm 12s ease-out var(--d) infinite}
${X} svg.bm1{left:3%;top:19%}${X} svg.bm2{right:3%;top:19%}${X} svg.bm3{left:37%;top:18%}
${X} svg.fa1{right:-6%;top:5%;width:62vmin}
${X} svg.fa2{left:-8%;bottom:4%;width:66vmin}
${X} svg.fa3{right:8%;bottom:30%;width:22vmin;animation:mg-d 5s ease-in-out infinite alternate}`;
const mgKf=`@keyframes mg-j{0%,49%{transform:rotate(0)}50%,100%{transform:rotate(1.6deg) scale(1.01)}}
@keyframes mg-d{from{transform:scale(.92)}to{transform:scale(1.08)}}
@keyframes mg-fa{0%{opacity:0;transform:translate(var(--tx),var(--ty))}6%{opacity:1;transform:none}80%{opacity:1}92%,100%{opacity:0;transform:none}}
@keyframes mg-dr{0%{transform:scaleY(.08);opacity:0}8%{opacity:1}55%{transform:scaleY(1);opacity:1}88%{transform:scaleY(1.06) translateY(7vh);opacity:0}100%{opacity:0}}
@keyframes mg-bm{0%{opacity:0;transform:scale(.3) rotate(calc(var(--r)*2))}3%{opacity:1;transform:scale(1.2) rotate(var(--r))}6%{transform:scale(1) rotate(var(--r))}24%{opacity:1;transform:scale(1.04) rotate(var(--r))}28%,100%{opacity:0;transform:scale(1.15) rotate(var(--r))}}`;

// ---------- Tema kaydı (js/62 ile aynı biçim) ----------
SCN[KEY]={html:mgHtml,font:'https://fonts.googleapis.com/css2?family=Bangers&display=swap'};
TM[KEY]=['Manga',0,KAGIT,'255,255,255',INK,'#555','#111','#ffffff','rgba(17,17,17,.55)','rgba(120,120,120,.45)','rgba(255,255,255,.7)',0,1];
if(typeof PREMT!=='undefined'&&!PREMT.includes(KEY))PREMT.push(KEY);
const T=':root[data-theme="'+KEY+'"]',S='#sahne[data-s="'+KEY+'"]';
let css=T+'{--bg:'+KAGIT+';--panel:rgba(255,255,255,.97);--fg:'+INK+';--dim:#555;--line:'+INK+';--key:#fff;--ac:#111;--acf:#fff;--m1:rgba(17,17,17,.55);--m2:rgba(120,120,120,.45);--m3:rgba(255,255,255,.7);--sh:5px 5px 0 '+INK+';--g:#111;--o:#777;--r:#aaa;color-scheme:light}\n'
 +T+' body::before{display:none}\n'
 +mgCss(S)+'\n'+mgKf+'\n'
 +T+` :is(h1,h2,.greet h2,.feat b){font-family:'Bangers',cursive;font-weight:400;letter-spacing:.03em}
${T} :is(.cd,.pl,.sc,.bi,.lvl,#def,.cfb,.mstat,.tt){border:2.5px solid ${INK};border-radius:7px;box-shadow:5px 5px 0 ${INK}}
${T} .feat{background:${INK} radial-gradient(rgba(255,255,255,.2) 1.3px,transparent 1.6px) 0 0/7px 7px;color:#fff}
${T} .feat *{color:#fff}
${T} .feat .go{background:#fff;color:${INK}}
${T} .k:not(.g):not(.o):not(.r):not(.w){background:#fff;color:${INK};border:2px solid ${INK};box-shadow:2px 2px 0 ${INK};border-radius:6px;-webkit-backdrop-filter:none;backdrop-filter:none;font-family:'Bangers',cursive;font-weight:400}
${T} .k.g{background:${INK};color:#fff;border:2px solid ${INK};box-shadow:2px 2px 0 ${INK}}
${T} .k.o{background:radial-gradient(${INK} 1.4px,transparent 1.7px) 0 0/6px 6px #fff;color:${INK};border:2px solid ${INK};box-shadow:2px 2px 0 ${INK};text-shadow:0 0 3px #fff,0 0 3px #fff,0 0 3px #fff}
${T} .k.r{background:repeating-linear-gradient(135deg,#eee 0 4px,#bbb 4px 5px);color:#777;border:2px solid #999;box-shadow:none;opacity:1}
${T} .k.w{background:${INK};color:#fff;border:2px solid ${INK};box-shadow:2px 2px 0 #777}
:root[data-perf=low] #sahne svg,:root[data-perf=low] #oyunsahne svg{animation:none!important}
@media (prefers-reduced-motion:reduce){#sahne svg,#oyunsahne svg{animation:none!important}}
`;
document.head.insertAdjacentHTML('beforeend','<style id="sahne-manga">'+css+'</style>');
try{const t=localStorage.getItem('ka_theme');if(t===KEY&&typeof sahneKur==='function'){document.documentElement.dataset.theme=t;sahneKur(t)}}catch(e){}
Object.assign(EN,{'Manga':'Manga','Manga Fırçası':'Manga Brush'});
if(window.OSEKLE)OSEKLE(KEY,{html:mgHtml,css:mgCss('§O')+'\n'+mgKf});
if(window.TEMAEK)TEMAEK(KEY,{t:'txt',m:'out',n:6,c:[INK,'#555'],s:[14,24],g:['✦','✸','!','?']},{f:"'Bangers',cursive",
  e:'background:#fff;border:2.5px solid '+INK+';border-radius:5px;box-shadow:3px 3px 0 '+INK,
  fl:'box-shadow:3px 3px 0 '+INK+',0 0 0 3px #fff,0 0 0 5px '+INK,
  g:'background:'+INK+';color:#fff;border:2.5px solid '+INK+';border-radius:5px;box-shadow:3px 3px 0 #777',
  o:'background:radial-gradient('+INK+' 1.5px,transparent 1.8px) 0 0/6px 6px #fff;color:'+INK+';border:2.5px solid '+INK+';border-radius:5px;box-shadow:3px 3px 0 '+INK+';text-shadow:0 0 3px #fff,0 0 3px #fff,0 0 3px #fff',
  r:'background:repeating-linear-gradient(135deg,#eee 0 4px,#bbb 4px 5px);color:#777;border:2.5px solid #999;border-radius:5px'});

// ---------- Çerçeve: Manga Fırçası (fırçayla çizilmiş kalın halka, yarım ton noktaları, titreyen hız çizgileri) ----------
function halka(){
  const R=lcg(41),n=90,O=[],I=[];
  for(let i=0;i<n;i++){const a=i/n*6.283,k=R();O.push([100+Math.cos(a)*(68+(R()-.5)*3.6+(i%9<2?2:0)),100+Math.sin(a)*(68+(R()-.5)*3.6)]);I.push([100+Math.cos(a)*(53+(R()-.5)*2.6),100+Math.sin(a)*(53+(R()-.5)*2.6)])}
  const d=P=>P.map((p,i)=>(i?'L':'M')+f(p[0])+' '+f(p[1])).join('')+'Z';
  let h='<path fill-rule="evenodd" d="'+d(O)+d(I)+'" fill="'+INK+'"/>';
  // kuru fırça: halka üstünde beyaz kesik yaylar
  h+='<g class="fr-ms">';
  [[20,70,61],[110,170,58.5],[200,250,62],[280,330,59.5]].forEach((y,i)=>{const a0=y[0]*Math.PI/180,a1=y[1]*Math.PI/180,r=y[2];
    h+='<path d="M'+f(100+Math.cos(a0)*r)+' '+f(100+Math.sin(a0)*r)+'A'+r+' '+r+' 0 0 1 '+f(100+Math.cos(a1)*r)+' '+f(100+Math.sin(a1)*r)+'" fill="none" stroke="#fff" stroke-width="'+(1+i%2*.6)+'" stroke-dasharray="'+(6+i*2)+' '+(4+i)+'" opacity=".8"/>'});
  h+='</g>';
  h+='<circle cx="100" cy="100" r="70.2" fill="none" stroke="#fff" stroke-width="1.3" opacity=".9"/><circle cx="100" cy="100" r="51.5" fill="none" stroke="#fff" stroke-width="1.6"/>';
  // yarım ton noktaları: sol altta halkanın dışında küçülen noktalar
  for(let i=0;i<26;i++){const a=(100+i*4.6)*Math.PI/180,r=73+(i%2)*3.4;h+='<circle cx="'+f(100+Math.cos(a)*r)+'" cy="'+f(100+Math.sin(a)*r)+'" r="'+f(2.4-i*.07)+'" fill="'+INK+'"/>'}
  return h;
}
function cizgiler(){
  let h='';const R=lcg(5);
  for(let i=0;i<22;i++){const a=(i*16.4-70)*Math.PI/180,r0=78+R()*3,r1=r0+7+R()*9;
    h+='<path d="M'+f(100+Math.cos(a)*r0)+' '+f(100+Math.sin(a)*r0)+'L'+f(100+Math.cos(a)*r1)+' '+f(100+Math.sin(a)*r1)+'" stroke="'+INK+'" stroke-width="'+f(1.6+R()*1.8)+'" stroke-linecap="round"/>'}
  return h;
}
const FRK={
  [KEY]:()=>[halka(),'<g class="x"><g class="fr-mj">'+cizgiler()+'</g>'+damla(34,160,5,6)+damla(168,36,3.6,8)+'<g class="fr-mw"><circle cx="100" cy="100" r="71" fill="none" stroke="'+INK+'" stroke-width="3"/><circle cx="100" cy="100" r="74" fill="none" stroke="#fff" stroke-width="1.6"/></g>'+[[-40,'9px','-9px','0s'],[20,'10px','4px','-.9s'],[100,'-3px','11px','-1.8s'],[200,'-10px','-2px','-2.6s'],[250,'-4px','-11px','-1.3s']].map(d=>{const a=d[0]*Math.PI/180;return '<circle class="fr-mf" style="--dx:'+d[1]+';--dy:'+d[2]+';animation-delay:'+d[3]+'" cx="'+f(100+Math.cos(a)*70)+'" cy="'+f(100+Math.sin(a)*70)+'" r="2.4" fill="'+INK+'"/>'}).join('')+'<g class="fr-mb"><polygon points="'+many(12,i=>{const a=i/12*6.283,r=i%2?7.5:14;return f(160+Math.cos(a)*r)+','+f(150+Math.sin(a)*r)+' '}).trim()+'" fill="#fff" stroke="'+INK+'" stroke-width="1.8" stroke-linejoin="round"/><text x="160" y="155" text-anchor="middle" font-family="Impact,\'Arial Black\',sans-serif" font-weight="900" font-size="13" fill="'+INK+'">!</text></g>'+'<g class="fr-md"><rect x="108" y="166" width="2.6" height="20" fill="'+INK+'"/><circle cx="109.3" cy="190" r="4.6" fill="'+INK+'"/></g><path class="fr-mp" d="M164 52l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill="#fff" stroke="'+INK+'" stroke-width="1.6" stroke-linejoin="round"/></g>']
};
if(typeof FRM!=='undefined'&&typeof frameHtml==='function'){
  FRM[KEY]=['Manga Fırçası',4,'svg',{shop:1},0,'•','out','',[INK,'#555','#aaa','#ffffff']];
  if(typeof UNL!=='undefined')UNL.push({id:'frame:'+KEY,t:'frame',n:'Manga Fırçası',req:{shop:1}});
  const _fh=frameHtml;frameHtml=function(h,k){
    if(!Object.prototype.hasOwnProperty.call(FRK,k))return _fh(h,k);
    const m=/(?:width="|width:)(\d+)/.exec(h),z=m?+m[1]:40,sv=FRK[k]();
    return '<span class="rk rk-'+k+(z<40?' sm':'')+'" style="--s:'+z+'px">'+h+'<svg class="rk-b" viewBox="0 0 200 200" aria-hidden="true">'+sv[0]+'</svg><svg class="rk-f" viewBox="0 0 200 200" aria-hidden="true">'+sv[1]+'</svg></span>';
  };
  document.head.insertAdjacentHTML('beforeend','<style id="cerceve-manga">.rk .fr-mj{transform-box:view-box;transform-origin:100px 100px;animation:fr-mj .6s steps(1) infinite}\n.rk-manga .rk-b{filter:drop-shadow(1.5px 1.5px 0 rgba(0,0,0,.25))}\n.rk .fr-mw{transform-box:view-box;transform-origin:100px 100px;opacity:0;animation:fr-mw 3.4s ease-out infinite}\n.rk .fr-mf{opacity:0;animation:fr-mf 2.2s ease-out infinite}\n.rk .fr-mb{transform-box:fill-box;transform-origin:center;opacity:0;animation:fr-mb 5.2s ease-out infinite}\n@keyframes fr-mw{0%{transform:scale(.97);opacity:.85}65%,100%{transform:scale(1.4);opacity:0}}\n@keyframes fr-mf{0%{transform:translate(0,0);opacity:0}15%{opacity:1}100%{transform:translate(var(--dx),var(--dy));opacity:0}}\n@keyframes fr-mb{0%{transform:scale(.2) rotate(-25deg);opacity:0}4%{transform:scale(1.3) rotate(8deg);opacity:1}8%{transform:scale(1) rotate(0)}30%{opacity:1}36%,100%{transform:scale(1.15);opacity:0}}\n.rk .fr-ms{transform-box:view-box;transform-origin:100px 100px;animation:fr-ms 9s linear infinite}\n.rk .fr-md{transform-box:fill-box;transform-origin:50% 0;opacity:0;animation:fr-md 4.6s ease-in infinite}\n.rk .fr-mp{transform-box:fill-box;transform-origin:center;animation:fr-mp 2.8s ease-in-out infinite}\n@keyframes fr-ms{to{transform:rotate(360deg)}}\n@keyframes fr-md{0%{transform:scaleY(.1);opacity:0}10%{opacity:1}60%{transform:scaleY(1);opacity:1}90%{transform:scaleY(1.05) translateY(14px);opacity:0}100%{opacity:0}}\n@keyframes fr-mp{0%,100%{transform:scale(.55) rotate(0);opacity:.3}50%{transform:scale(1) rotate(45deg);opacity:1}}\n@keyframes fr-mj{0%,49%{transform:rotate(0)}50%,100%{transform:rotate(3.5deg)}}</style>');
}
})();
