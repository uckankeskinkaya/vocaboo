// v53 (taslak, onay bekliyor): 29 Ekim Cumhuriyet Bayramı teması ve "Cumhuriyet" çerçevesi.
// Tema: koyu kırmızı gök, dalgalanan Türk bayrağı (dilimler halinde, yalnız transform), kırmızı-beyaz havai fişekler,
// Anıtkabir silueti, "29 EKİM 1923" ve Atatürk'ün "Ne mutlu Türküm diyene!" sözü. Çerçeve: kırmızı-beyaz dönen halka,
// ay-yıldız amblemi, dalgalanan küçük bayrak, parlayan yıldızlar. Performans: animasyonlar transform/opacity; hafif modda durur.
(function(){
if(typeof SCN==='undefined'||typeof TM==='undefined')return;
const KEY='cumhuriyet',KIR='#e30a17',KOYU='#5c0611',BEYAZ='#ffffff';
const f=n=>(+n).toFixed(2);
const many=(n,fn)=>{let h='';for(let i=0;i<n;i++)h+=fn(i);return h};
const svg=(c,vb,inner,par,st)=>'<svg class="'+c+'" viewBox="'+vb+'" preserveAspectRatio="'+(par||'xMidYMid meet')+'"'+(st?' style="'+st+'"':'')+' aria-hidden="true">'+inner+'</svg>';
// Ay-yıldız (bayrak ölçüleri, G=1 yükseklik): dış daire merkezi x=.5 r=.25, iç daire x=.5625 r=.2, yıldız merkezi x=.958 r=.125
function yildiz(cx,cy,r,rot){let p='';for(let i=0;i<10;i++){const a=(rot||0)+Math.PI/2*-1+i*Math.PI/5,rr=i%2?r*.382:r;p+=f(cx+Math.cos(a)*rr)+','+f(cy+Math.sin(a)*rr)+' '}return '<polygon points="'+p.trim()+'" fill="'+BEYAZ+'"/>'}
function ayYildiz(x0,y0,G){
  // maske ile hilal: dış beyaz daire, iç kırmızı daire
  return '<circle cx="'+f(x0+.5*G)+'" cy="'+f(y0+.5*G)+'" r="'+f(.25*G)+'" fill="'+BEYAZ+'"/><circle cx="'+f(x0+.5625*G)+'" cy="'+f(y0+.5*G)+'" r="'+f(.2*G)+'" fill="'+KIR+'"/>'
    +yildiz(x0+.9583*G,y0+.5*G,.125*G,-Math.PI/2);
}
// Dalgalanan bayrak: 14 dilim, her dilim bayrağın bir parçasını gösterir ve gecikmeli yukarı-aşağı oynar
function bayrak(W,H,cls){
  const n=14,w=W/n;let h='<defs><clipPath id="'+cls+'k"><rect width="'+W+'" height="'+H+'"/></clipPath></defs>';
  const icerik='<rect width="'+W+'" height="'+H+'" fill="'+KIR+'"/>'+ayYildiz(H*.08,0,H);
  for(let i=0;i<n;i++){
    h+='<g class="bd" style="--d:-'+f(i*.11)+'s;--k:'+f(.4+i/n*.9)+'"><svg x="'+f(i*w-.4)+'" y="0" width="'+f(w+.8)+'" height="'+H+'" viewBox="'+f(i*w-.4)+' 0 '+f(w+.8)+' '+H+'" overflow="hidden">'+icerik+'<rect x="'+f(i*w)+'" width="'+f(w)+'" height="'+H+'" fill="#000" opacity="'+f(.02+.05*Math.abs(Math.sin(i*.75)))+'"/></svg></g>';
  }
  return h;
}
function anitkabir(){
  let k='<path d="M0 100V78h400v22z" fill="#2a0207"/><path d="M60 78V70h280v8z" fill="#3a040b"/><path d="M90 70V62h220v8z" fill="#3a040b"/>';
  k+='<rect x="110" y="30" width="180" height="32" fill="#3a040b"/><rect x="104" y="24" width="192" height="8" fill="#4a0610"/>';
  for(let i=0;i<10;i++)k+='<rect x="'+(116+i*17.4)+'" y="33" width="7" height="29" fill="#24030a"/>';
  k+='<rect x="20" y="58" width="60" height="20" fill="#300409"/><rect x="320" y="58" width="60" height="20" fill="#300409"/>';
  for(let i=0;i<4;i++){k+='<rect x="'+(24+i*14)+'" y="60" width="5" height="18" fill="#1d0207"/><rect x="'+(324+i*14)+'" y="60" width="5" height="18" fill="#1d0207"/>'}
  return k;
}
const FIS=['#ffffff','#ff3b4a','#ffd7da','#e30a17'];
function fisek(i){
  const c=FIS[i%FIS.length];let h='';
  for(let j=0;j<14;j++){const a=j/14*6.283;h+='<line x1="50" y1="50" x2="'+f(50+Math.cos(a)*40)+'" y2="'+f(50+Math.sin(a)*40)+'" stroke="'+c+'" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="6 40"/>'}
  return h+'<circle cx="50" cy="50" r="3" fill="'+c+'"/>';
}
function cmHtml(v){
  return '<u class="ck"></u>'
    +many(26,i=>'<i style="left:'+f((i*37.3)%100)+'%;top:'+f((i*23.7)%55)+'%;--z:'+f(1+(i%3)*.7)+'px;--t:'+f(2+(i%5)*.6)+'s;--d:-'+f(i*.3)+'s"></i>')
    +[[12,14,'0s'],[70,8,'-1.6s'],[44,24,'-3.1s'],[86,30,'-4.4s'],[24,36,'-2.3s']].map((p,i)=>svg('fs','0 0 100 100',fisek(i),'xMidYMid meet','left:'+p[0]+'%;top:'+p[1]+'%;--d:'+p[2])).join('')
    +svg('bk','0 0 150 100',bayrak(150,100,'b'+v),'none')
    +(v==='o'?'<u class="soz"><b>“Ne mutlu Türküm diyene!”</b><span>Mustafa Kemal Atatürk</span></u>':'')
    +svg('ak','0 0 400 100',anitkabir(),'xMidYMax meet');
}
const cmCss=X=>`${X}{background:radial-gradient(120% 70% at 50% 0%,#b30f22 0%,#7a0716 45%,#3d030b 100%)}
${X} .ck{inset:0;background:radial-gradient(60vmin 40vmin at 80% 18%,rgba(255,80,90,.35),transparent 70%)}
${X} i{width:var(--z);height:var(--z);border-radius:50%;background:#fff;animation:sc-tw var(--t) ease-in-out var(--d) infinite}
${X} svg.bk{position:absolute;right:5%;top:calc(env(safe-area-inset-top,0px) + 66px);width:min(22vw,96px);height:auto;aspect-ratio:3/2;filter:drop-shadow(0 10px 18px rgba(0,0,0,.35));transform:rotate(-4deg)}
${X} svg.bk .bd{will-change:transform;animation:cm-dl 2.6s ease-in-out var(--d) infinite alternate}
${X} svg.fs{position:absolute;width:30vmin;height:30vmin;margin:-15vmin 0 0 -15vmin;opacity:0;will-change:transform,opacity;animation:cm-fs 5.5s ease-out var(--d) infinite}
${X} .yz{left:5%;top:11%;display:flex;flex-direction:column;gap:2px;color:#fff;text-shadow:0 2px 10px rgba(0,0,0,.35)}
${X} .yz b{font:900 clamp(26px,7vw,46px)/1 'Arial Black',system-ui,sans-serif;letter-spacing:.02em}
${X} .yz span{font:700 clamp(11px,2.8vw,15px)/1.2 system-ui,sans-serif;opacity:.9}
${X} .soz{left:0;right:0;bottom:15%;display:flex;flex-direction:column;align-items:center;gap:2px;color:#fff;text-align:center;text-shadow:0 2px 10px rgba(0,0,0,.45)}
${X} .soz b{font:italic 800 clamp(16px,4.4vw,24px)/1.2 Georgia,serif}
${X} .soz span{font:700 clamp(10px,2.6vw,13px)/1 system-ui,sans-serif;letter-spacing:.12em;text-transform:uppercase;opacity:.85}
${X} svg.ak{position:absolute;left:0;bottom:0;width:100%;height:14vh}`;
const cmKf=`@keyframes cm-dl{from{transform:translateY(calc(var(--k)*-3px)) scaleY(1)}to{transform:translateY(calc(var(--k)*4px)) scaleY(.985)}}
@keyframes cm-fs{0%{opacity:0;transform:scale(.15)}8%{opacity:1}35%{opacity:.9;transform:scale(1)}55%,100%{opacity:0;transform:scale(1.12)}}`;

// ---------- Tema kaydı ----------
SCN[KEY]={html:()=>cmHtml('m'),font:''};
TM[KEY]=['29 Ekim Cumhuriyet',1,KOYU,'70,6,16',BEYAZ,'#ffd1d5',BEYAZ,KIR,'rgba(227,10,23,.6)','rgba(255,255,255,.55)','rgba(120,6,18,.6)',0,1];
if(typeof PREMT!=='undefined'&&!PREMT.includes(KEY))PREMT.push(KEY);
const T=':root[data-theme="'+KEY+'"]',S='#sahne[data-s="'+KEY+'"]';
let css=T+'{--bg:'+KOYU+';--panel:rgba(70,6,16,.78);--fg:#fff;--dim:#ffc9cf;--line:rgba(255,255,255,.18);--key:rgba(255,255,255,.12);--ac:#fff;--acf:'+KIR+';--m1:rgba(227,10,23,.6);--m2:rgba(255,255,255,.5);--m3:rgba(120,6,18,.6);--sh:0 10px 30px rgba(0,0,0,.35);color-scheme:dark}\n'
 +T+' body::before{display:none}\n'+cmCss(S)+'\n'+cmKf+'\n'
 +T+` .feat{background:linear-gradient(135deg,${KIR},#a5000f)!important;color:#fff}
${T} .feat .go{background:#fff;color:${KIR}}
${T} #mDaily.feat{position:relative;overflow:hidden;isolation:isolate}
${T} #mDaily.feat::after{content:'';position:absolute;right:-5%;top:50%;width:min(36%,190px);aspect-ratio:1;transform:translateY(-50%) rotate(-8deg);z-index:-1;opacity:.28;background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='38' cy='50' r='25' fill='%23fff'/%3E%3Ccircle cx='44.25' cy='50' r='20' fill='%23d30915'/%3E%3Cpolygon points='83.6,50 64.7,56.1 76.4,40.1 76.4,59.9 64.7,43.9' fill='%23fff'/%3E%3C/svg%3E") center/contain no-repeat}
${T} #mDaily .tag::after{content:' · 29 Ekim 1923'}
${T} #home .greet{padding-right:min(24vw,108px)}
${T} #home .greet p{font-size:0!important}
${T} #home .greet p::after{content:'“Ne mutlu Türküm diyene!” — Atatürk';font-size:13px;font-style:italic;font-weight:600;color:#ffe3e6}
${T} :is(.cd,.pl,.sc,.bi,.lvl,#def,.cfb,.mstat,.tt){border-color:rgba(255,255,255,.22)}
${T} .k:not(.g):not(.o):not(.r):not(.w){background:rgba(255,255,255,.92);color:${KOYU};border-color:transparent;box-shadow:0 3px 0 rgba(0,0,0,.35);-webkit-backdrop-filter:none;backdrop-filter:none}
${T} .k.w{background:#fff;color:${KIR}}
${T} .k.r{background:rgba(255,255,255,.18);color:rgba(255,255,255,.45);opacity:1}
:root[data-perf=low] ${S} svg *,:root[data-perf=low] #oyunsahne svg *{animation:none!important}
`;
document.head.insertAdjacentHTML('beforeend','<style id="sahne-cumhuriyet">'+css+'</style>');
try{const t=localStorage.getItem('ka_theme');if(t===KEY&&typeof sahneKur==='function'){document.documentElement.dataset.theme=t;sahneKur(t)}}catch(e){}
Object.assign(EN,{'29 Ekim Cumhuriyet':'Republic Day (29 Oct)','Cumhuriyet':'Republic'});
// Oyun sahnesi: bayrak ve söz, tanım kartıyla harf kutuları arasındaki boşlukta görünür
if(window.OSEKLE)OSEKLE(KEY,{html:()=>cmHtml('o'),css:cmCss('§O')+'\n'+cmKf+`
§O svg.bk{right:auto;left:50%;top:auto;bottom:auto;width:min(30vw,170px);transform:translate(-50%,0) rotate(-3deg);top:18%}
§O .soz{bottom:auto;top:66.5%}
§O .soz b{font-size:15px}§O .soz span{font-size:10px}
@media (max-height:720px){§O .soz{display:none}}
§O svg.ak{height:10vh;opacity:.7}`});
if(window.TEMAEK)TEMAEK(KEY,{t:'txt',m:'out',n:6,c:['#ffffff',KIR],s:[14,22],g:['★','☾']},{
  e:'background:rgba(255,255,255,.14);border:2px solid rgba(255,255,255,.55);border-radius:12px',
  fl:'border-color:#fff;box-shadow:0 0 14px rgba(255,255,255,.55)',
  g:'background:linear-gradient(#2fbf71,#16944f);color:#fff;border:2px solid #d7ffe8;border-radius:12px',
  o:'background:linear-gradient(#ffcf4a,#f2a20c);color:#3b1d00;border:2px solid #fff1c4;border-radius:12px',
  r:'background:linear-gradient(#5c0611,#3a030a);color:rgba(255,255,255,.55);border:2px solid rgba(255,255,255,.25);border-radius:12px'});

// ---------- Çerçeve: Cumhuriyet (kırmızı-beyaz dönen halka, ay-yıldız, dalgalanan bayrak, parlayan yıldızlar) ----------
function cerceve(id){
  let b='<defs><linearGradient id="'+id+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff2b3a"/><stop offset=".5" stop-color="'+KIR+'"/><stop offset="1" stop-color="#9e0010"/></linearGradient></defs>'
    +'<circle cx="100" cy="100" r="60" fill="none" stroke="url(#'+id+')" stroke-width="13"/>'
    +'<g class="fr-cd"><circle cx="100" cy="100" r="60" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="10 13" stroke-linecap="round"/></g>'
    +'<circle cx="100" cy="100" r="67.5" fill="none" stroke="#fff" stroke-width="2"/><circle cx="100" cy="100" r="52.5" fill="none" stroke="#fff" stroke-width="2"/>';
  // ön: altta ay-yıldız amblemi, üstte dalgalanan bayrak, etrafta parlayan yıldızlar
  let o='<g class="x"><g class="fr-cb" transform="translate(132 26)">'+bayrak(54,36,id+'f')+'</g><path d="M131 26v52" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/></g>'
    +'<g transform="translate(100 166)"><circle r="17" fill="'+KIR+'" stroke="#fff" stroke-width="3"/><g transform="translate(-14 -10.5) scale(.21)">'+ayYildiz(0,0,100).replace(/fill="#e30a17"/g,'fill="'+KIR+'"')+'</g></g>'
    +'<g class="x">'+[[38,58,0],[30,118,-1.1],[168,128,-2.2],[52,160,-.6],[150,166,-1.7]].map(s=>'<g class="fr-cy" style="animation-delay:'+s[2]+'s;transform-origin:'+s[0]+'px '+s[1]+'px">'+yildiz(s[0],s[1],5.5,0)+'</g>').join('')+'</g>';
  return [b,o];
}
let CN=0;
if(typeof FRM!=='undefined'&&typeof frameHtml==='function'){
  FRM[KEY]=['Cumhuriyet',4,'svg',{shop:1},0,'•','out','',[KIR,'#ffffff',KIR,'#ffffff']];
  if(typeof UNL!=='undefined')UNL.push({id:'frame:'+KEY,t:'frame',n:'Cumhuriyet',req:{shop:1}});
  const _fh=frameHtml;frameHtml=function(h,k){
    if(k!==KEY)return _fh(h,k);
    const m=/(?:width="|width:)(\d+)/.exec(h),z=m?+m[1]:40,sv=cerceve('cm'+(++CN));
    return '<span class="rk rk-'+k+(z<40?' sm':'')+'" style="--s:'+z+'px">'+h+'<svg class="rk-b" viewBox="0 0 200 200" aria-hidden="true">'+sv[0]+'</svg><svg class="rk-f" viewBox="0 0 200 200" aria-hidden="true">'+sv[1]+'</svg></span>';
  };
  document.head.insertAdjacentHTML('beforeend',`<style id="cerceve-cumhuriyet">
.rk .fr-cd{transform-box:view-box;transform-origin:100px 100px;animation:fr-cd 8s linear infinite}
.rk .fr-cb .bd{animation:cm-dl 1.8s ease-in-out var(--d) infinite alternate}
.rk .fr-cy{animation:fr-cy 2.4s ease-in-out infinite}
.rk-cumhuriyet .rk-b{filter:drop-shadow(0 0 calc(var(--s)*.08) rgba(227,10,23,.45))}
@keyframes fr-cd{to{transform:rotate(360deg)}}
@keyframes fr-cy{0%,100%{transform:scale(.4);opacity:.25}50%{transform:scale(1.15);opacity:1}}
@keyframes cm-dl{from{transform:translateY(calc(var(--k)*-3px)) scaleY(1)}to{transform:translateY(calc(var(--k)*4px)) scaleY(.985)}}
</style>`);
}
})();
