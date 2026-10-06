// v42: Dört yeni sahneli tema ve onlarla eşleşen dört çerçeve.
// Temalar: Balon Festivali, Sonbahar Ormanı, Tropik Gün Batımı, Kamp Gecesi. Her biri: menü sahnesi (#sahne), oyun sahnesi
// (#oyunsahne, OSEKLE), tema renkleri + arayüz stili, harf blokları ve dokunuş efekti (TEMAEK, js/34).
// Kural: sahnenin asıl öğeleri ekranın görünen bölgelerinde (üst bant, kenarlar, kartlar arası boşluklar) durur.
// Performans: bütün animasyonlar yalnızca transform / opacity (GPU), sahne başına az sayıda öğe; hafif modda durur.
(function(){
if(typeof SCN==='undefined'||typeof TM==='undefined')return;
const rn=(a,b)=>a+Math.random()*(b-a),f=n=>n.toFixed(1);
const many=(n,fn)=>{let h='';for(let i=0;i<n;i++)h+=fn(i);return h};
const svg=(c,vb,inner,par,st)=>'<svg class="'+c+'" viewBox="'+vb+'" preserveAspectRatio="'+(par||'xMidYMax meet')+'"'+(st?' style="'+st+'"':'')+' aria-hidden="true">'+inner+'</svg>';
const YENI=['balon','sonbahar','tropik','kamp'];

// ---------- Tema kaydı (js/27 ile aynı biçim) ----------
// [anahtar, ad, koyu?, zemin, panel RGB, panel opaklığı, yazı, soluk, vurgu, vurgu yazısı, [3 önizleme rengi], yazı tipi adresi, menü sahnesi, CSS(§S sahne, §T tema)]
let ALL='';
function tema(d){
  const k=d[0],dk=d[2],T=':root[data-theme="'+k+'"]',S='#sahne[data-s="'+k+'"]';
  SCN[k]={html:d[12],font:d[11]};
  TM[k]=[d[1],dk,d[3],d[4],d[6],d[7],d[8],d[9],d[10][0],d[10][1],d[10][2],0,1];
  if(typeof PREMT!=='undefined'&&!PREMT.includes(k))PREMT.push(k);
  ALL+=T+'{--bg:'+d[3]+';--panel:rgba('+d[4]+','+d[5]+');--fg:'+d[6]+';--dim:'+d[7]+';--line:'+(dk?'rgba(255,255,255,.12)':'rgba(20,30,60,.12)')+';--key:'+(dk?'rgba(255,255,255,.08)':'rgba(20,30,60,.08)')+';--ac:'+d[8]+';--acf:'+d[9]+';--m1:'+d[10][0]+';--m2:'+d[10][1]+';--m3:'+d[10][2]+';--sh:'+(dk?'0 10px 30px rgba(0,0,0,.4)':'0 10px 30px rgba(16,24,40,.12)')+';color-scheme:'+(dk?'dark':'light')+'}\n'
    +T+' body::before{display:none}\n'+d[13].replace(/§S/g,S).replace(/§T/g,T)+'\n';
}

// ================= 1) Balon Festivali =================
// Şafak göğü, yükselen çizgili sıcak hava balonları (farklı boy = derinlik), yumuşak bulutlar, katmanlı tepeler
const BR=[['#ff5d73','#ffd166'],['#4cc9f0','#ffffff'],['#7b61ff','#ffb3c7'],['#06d6a0','#ffd166'],['#ff9f1c','#2ec4b6'],['#ef476f','#ffffff'],['#118ab2','#ffd166']];
function balon(c1,c2){
  return '<path d="M30 2C13 2 2 15 2 31C2 47 16 59 24 67L36 67C44 59 58 47 58 31C58 15 47 2 30 2Z" fill="'+c1+'"/>'
    +'<path d="M30 2C23 2 18 15 18 31C18 47 24 59 27 67L33 67C36 59 42 47 42 31C42 15 37 2 30 2Z" fill="'+c2+'"/>'
    +'<path d="M30 2C27 2 25.5 15 25.5 31C25.5 47 28 59 29 67L31 67C32 59 34.5 47 34.5 31C34.5 15 33 2 30 2Z" fill="'+c1+'" opacity=".9"/>'
    +'<path d="M4 30Q30 38 56 30" fill="none" stroke="rgba(0,0,0,.12)" stroke-width="1.4"/>'
    +'<ellipse cx="19" cy="20" rx="5" ry="9" fill="#fff" opacity=".28" transform="rotate(-20 19 20)"/>'
    +'<path d="M24 67L26 78M36 67L34 78" stroke="#6b4a2a" stroke-width="1.1"/><rect x="25" y="77" width="10" height="8" rx="1.5" fill="#8a5a2b"/><rect x="25" y="77" width="10" height="2" fill="#b07a40"/>';
}
const bulut=(o)=>'<g fill="#fff" opacity="'+o+'"><ellipse cx="40" cy="30" rx="30" ry="14"/><ellipse cx="62" cy="22" rx="22" ry="16"/><ellipse cx="86" cy="30" rx="26" ry="12"/><rect x="14" y="28" width="96" height="16" rx="8"/></g>';
function blnHtml(){
  let h='<u class="gn"></u>';
  h+=many(3,i=>svg('bu','0 0 120 46',bulut(i===1?.75:.9),'xMidYMid meet','top:'+(6+i*15)+'%;--t:'+(90+i*40)+'s;--d:-'+(i*47)+'s;width:'+(140-i*24)+'px'));
  h+=svg('tpe t1','0 0 400 100','<path d="M0 60 Q70 20 140 50 Q210 78 280 38 Q340 8 400 44 L400 100 L0 100Z" fill="#b8a7e0"/>','none');
  h+=svg('tpe t2','0 0 400 100','<path d="M0 64 Q90 34 180 62 Q260 86 330 52 Q370 36 400 50 L400 100 L0 100Z" fill="#8f86cf"/>','none');
  // balonlar: 7 tane, her biri farklı boy/hız; negatif gecikmeyle ekrana dağılmış başlar
  BR.forEach((c,i)=>{const w=[86,52,64,40,74,46,58][i],l=[8,70,38,86,56,22,4][i],t=[46,70,58,88,64,80,96][i];
    h+=svg('bl','0 0 60 86',balon(c[0],c[1]),'xMidYMid meet','left:'+l+'%;width:'+w+'px;--t:'+t+'s;--d:-'+f(t*[.1,.45,.7,.25,.9,.55,.35][i])+'s;--w:'+f(rn(-30,30))+'px;opacity:'+(w>60?1:.85))});
  return h;
}
const blnCss=(X)=>`${X}{background:linear-gradient(#78c6ef 0%,#a9dcf2 30%,#ffe2c4 62%,#ffc29a 78%,#ffb08a 100%)}
${X} .gn{left:50%;bottom:22%;width:60vmin;height:60vmin;margin-left:-30vmin;border-radius:50%;background:radial-gradient(circle,rgba(255,250,225,.95) 0 14%,rgba(255,214,150,.55) 30%,rgba(255,190,140,0) 62%)}
${X} svg.bu{position:absolute;left:0;height:auto;aspect-ratio:120/46;will-change:transform;animation:bln-bu var(--t) linear var(--d) infinite}
${X} svg.tpe{position:absolute;left:-4%;width:108%}
${X} svg.t1{bottom:6%;height:20%}${X} svg.t2{bottom:0;height:16%}
${X} svg.bl{position:absolute;bottom:-14%;height:auto;aspect-ratio:60/86;will-change:transform;filter:drop-shadow(0 6px 8px rgba(80,60,120,.18));animation:bln-up var(--t) linear var(--d) infinite}`;
const blnKf=`@keyframes bln-up{0%{transform:translate(0,0)}25%{transform:translate(var(--w),-34vh)}50%{transform:translate(0,-68vh)}75%{transform:translate(calc(var(--w)*-1),-102vh)}100%{transform:translate(0,-136vh)}}
@keyframes bln-bu{from{transform:translateX(-35vw)}to{transform:translateX(110vw)}}`;
tema(['balon','Balon Festivali',0,'#bfe4f5','255,255,255',.9,'#1f2a44','#5a6584','#ff5d73','#ffffff',['rgba(120,198,239,.55)','rgba(255,93,115,.45)','rgba(255,209,102,.5)'],
 'https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800&display=swap',blnHtml,
 blnCss('§S')+'\n'+blnKf+`
§T :is(h1,h2,.greet h2,.feat b){font-family:'Baloo 2',sans-serif;font-weight:800;letter-spacing:-.01em}
§T :is(.cd,.pl,.sc,.bi,.lvl,#def,.cfb,.mstat,.tt){border:1px solid rgba(255,255,255,.9);box-shadow:0 8px 24px rgba(90,80,150,.12)}
§T .feat{background:linear-gradient(120deg,#ff5d73,#ff9f6b);color:#fff}`]);

// ================= 2) Sonbahar Ormanı =================
// Üstten sarkan yaprak kümesi (başlık bandında görünür), katmanlı turuncu orman, sis, sallanarak düşen akçaağaç yaprakları
const YP='M20 2L23 11L31 7L28 16L37 17L30 23L33 30L24 28L22 38L20 34L18 38L16 28L7 30L10 23L3 17L12 16L9 7L17 11Z';
const YR=['#e8552a','#f39a2b','#f7c33c','#c23b22','#d9662f'];
const yaprak=c=>'<path d="'+YP+'" fill="'+c+'"/><path d="M20 34L20 40" stroke="#7a3a14" stroke-width="1.6"/><path d="M20 30L20 12M20 22L13 16M20 22L27 16" stroke="rgba(0,0,0,.18)" stroke-width="1"/>';
function kanopi(){let h='';for(let i=0;i<46;i++){const x=rn(-10,410),y=rn(-6,34-Math.abs(200-x)/12),r=rn(-60,60),k=rn(.7,1.3);h+='<g transform="translate('+f(x)+' '+f(y)+') rotate('+f(r)+') scale('+f(k)+')"><path d="'+YP+'" transform="translate(-20 -20)" fill="'+YR[i%5]+'" opacity="'+f(rn(.75,1))+'"/></g>'}return h}
const agac=(x,w,h,c)=>'<rect x="'+(x-w*.06)+'" y="'+(100-h*.45)+'" width="'+(w*.12)+'" height="'+(h*.45)+'" fill="'+c+'" opacity=".9"/><ellipse cx="'+x+'" cy="'+(100-h*.62)+'" rx="'+(w/2)+'" ry="'+(h*.36)+'" fill="'+c+'"/><ellipse cx="'+(x-w*.22)+'" cy="'+(100-h*.5)+'" rx="'+(w*.3)+'" ry="'+(h*.24)+'" fill="'+c+'"/><ellipse cx="'+(x+w*.24)+'" cy="'+(100-h*.52)+'" rx="'+(w*.3)+'" ry="'+(h*.24)+'" fill="'+c+'"/>';
function orman(c,n,hb){let h='';for(let i=0;i<n;i++){const x=i*(400/(n-1))+rn(-12,12);h+=agac(x,rn(50,80),rn(hb*.7,hb),c)}return h}
function sbnHtml(){
  let h='<u class="gn"></u>'+svg('f1','0 0 400 100',orman('#f2b277',9,70),'none')+'<u class="sis"></u>'+svg('f2','0 0 400 100',orman('#d9662f',7,80),'none');
  h+=svg('yer','0 0 400 30',many(60,i=>'<ellipse cx="'+f(rn(0,400))+'" cy="'+f(rn(8,30))+'" rx="'+f(rn(4,9))+'" ry="'+f(rn(2,4))+'" fill="'+YR[i%5]+'" transform="rotate('+f(rn(-40,40))+')" opacity=".9"/>'),'none');
  h+=svg('kn','0 0 400 40',kanopi(),'xMidYMin slice');
  h+=many(11,i=>svg('dy','0 0 40 40',yaprak(YR[i%5]),'xMidYMid meet','left:'+f(rn(0,94))+'%;width:'+f(rn(18,30))+'px;--t:'+f(rn(11,19))+'s;--d:-'+f(rn(0,19))+'s;--w:'+f(rn(20,50))+'px'));
  return h;
}
const sbnCss=(X,o=0)=>`${X}{background:linear-gradient(#fde7c4 0%,#f8c98f 45%,#efa565 75%,#e2874c 100%)}
${X} .gn{left:-12vmin;top:6%;width:60vmin;height:60vmin;border-radius:50%;background:radial-gradient(circle,rgba(255,250,220,.9) 0 12%,rgba(255,220,150,.45) 32%,rgba(255,200,130,0) 62%)}
${X} svg.f1,${X} svg.f2{position:absolute;left:-3%;width:106%}
${X} svg.f1{bottom:${20+o}%;height:28%;opacity:.7}${X} svg.f2{bottom:${6+o}%;height:28%}
${X} .sis{left:0;right:0;bottom:${18+o}%;height:16%;background:linear-gradient(transparent,rgba(255,240,220,.55),transparent)}
${X} svg.yer{position:absolute;left:0;bottom:0;width:100%;height:${9+o}%;background:linear-gradient(transparent,#b9592a 70%)}
${X} svg.kn{position:absolute;left:0;top:0;width:100%;height:auto;aspect-ratio:400/40;max-height:13vh;filter:drop-shadow(0 4px 6px rgba(120,50,10,.25))}
${X} svg.dy{position:absolute;top:-6%;height:auto;aspect-ratio:1;will-change:transform;animation:sbn-dus var(--t) linear var(--d) infinite}`;
const sbnKf=`@keyframes sbn-dus{0%{transform:translate(0,0) rotate(0)}25%{transform:translate(var(--w),28vh) rotate(100deg)}50%{transform:translate(0,56vh) rotate(190deg)}75%{transform:translate(calc(var(--w)*-1),84vh) rotate(280deg)}100%{transform:translate(0,114vh) rotate(380deg)}}`;
tema(['sonbahar','Sonbahar Ormanı',0,'#fde7c4','255,250,242',.92,'#3b1f10','#7d5236','#d9582b','#ffffff',['rgba(232,85,42,.5)','rgba(243,154,43,.5)','rgba(247,195,60,.5)'],
 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700&display=swap',sbnHtml,
 sbnCss('§S')+'\n'+sbnKf+`
§T :is(h1,h2,.greet h2,.feat b){font-family:'Fraunces',serif;letter-spacing:-.01em}
§T :is(.cd,.pl,.sc,.bi,.lvl,#def,.cfb,.mstat,.tt){border:1px solid rgba(217,88,43,.22);box-shadow:0 8px 22px rgba(150,70,20,.12)}
§T .feat{background:linear-gradient(120deg,#d9582b,#f39a2b);color:#fff}`]);

// ================= 3) Tropik Gün Batımı =================
// Denize batan güneş, ışık yansıması, iki köşeyi çerçeveleyen palmiyeler (başlık bandında görünür), süzülen kuşlar, köpük
function palmiye(ters){
  const t='<path d="M40 300 C44 220 58 150 96 70" fill="none" stroke="#1a0f2e" stroke-width="13" stroke-linecap="round"/>'
    +many(9,i=>'<path d="M40 '+(290-i*26)+' q8 -4 16 -2" fill="none" stroke="#2a1745" stroke-width="2"/>')
    +'<g fill="#1a0f2e"><path d="M96 70 C70 40 30 38 2 60 C34 44 66 54 96 74Z"/><path d="M96 70 C110 30 150 14 196 22 C152 26 120 44 98 76Z"/><path d="M96 70 C126 58 170 70 198 104 C164 80 130 72 98 76Z"/><path d="M96 70 C80 30 92 2 120 -6 C98 14 96 40 100 72Z"/><path d="M96 70 C64 66 36 90 22 124 C46 96 70 84 98 76Z"/><path d="M96 70 C104 100 92 130 70 150 C88 122 94 100 94 76Z"/></g>'
    +'<circle cx="92" cy="78" r="6" fill="#2a1745"/><circle cx="102" cy="80" r="6" fill="#2a1745"/>';
  return '<g'+(ters?' transform="translate(200 0) scale(-1 1)"':'')+'>'+t+'</g>';
}
const kus='<path d="M0 6 Q5 0 10 6 Q15 0 20 6" fill="none" stroke="#2a1745" stroke-width="1.8" stroke-linecap="round"/>';
function trpHtml(){
  return '<u class="gn"></u><u class="den"></u><u class="yan"></u><u class="kp"></u>'
    +svg('pm l','0 0 200 300',palmiye(0),'xMinYMax meet')+svg('pm r','0 0 200 300',palmiye(1),'xMaxYMax meet')
    +many(3,i=>svg('ku','0 0 20 8',kus,'xMidYMid meet','top:'+(14+i*7)+'%;--t:'+(26+i*9)+'s;--d:-'+(i*8)+'s;width:'+(22-i*4)+'px'));
}
const trpCss=(X,H,G)=>`${X}{background:linear-gradient(#22195a 0%,#5a2a86 ${H*.42}%,#d8467a ${H*.78}%,#ff9a5a ${H}%,#ffcf7a ${H}%)}
${X} .gn{left:${G}%;top:calc(${H}% - 24vmin);width:48vmin;height:48vmin;margin-left:-24vmin;border-radius:50%;background:radial-gradient(circle,#fff6c8 0 30%,#ffc46b 52%,#ff7a59 66%,rgba(255,110,90,0) 71%)}
${X} .den{left:0;right:0;top:${H}%;bottom:0;background:linear-gradient(#ff8a5c 0,#7a2f78 6%,#2a1d5c 40%,#120c33 100%)}
${X} .yan{left:${G}%;top:${H}%;width:40vmin;margin-left:-20vmin;height:30%;background:repeating-linear-gradient(transparent 0 6px,rgba(255,214,140,.4) 6px 9px);-webkit-mask:linear-gradient(#000,transparent);mask:linear-gradient(#000,transparent);will-change:transform;animation:trp-yan 3.5s ease-in-out infinite alternate}
${X} .kp{left:-20%;width:140%;bottom:3%;height:14px;background:radial-gradient(14px 5px at 14px 7px,rgba(255,255,255,.35) 60%,transparent 64%) 0 0/34px 14px;will-change:transform;animation:trp-kp 6s linear infinite}
${X} svg.pm{position:absolute;bottom:0;height:min(64vh,440px);width:auto;aspect-ratio:200/300}
${X} svg.pm.l{left:-30vw}${X} svg.pm.r{right:-30vw}
${X} svg.ku{position:absolute;left:0;height:auto;aspect-ratio:20/8;will-change:transform;animation:trp-ku var(--t) linear var(--d) infinite}`;
const trpKf=`@keyframes trp-yan{from{transform:translateX(-6px) scaleX(.94)}to{transform:translateX(6px) scaleX(1.06)}}
@keyframes trp-kp{to{transform:translateX(34px)}}
@keyframes trp-ku{from{transform:translate(-10vw,0)}50%{transform:translate(50vw,-3vh)}to{transform:translate(110vw,0)}}`;
tema(['tropik','Tropik Gün Batımı',1,'#22195a','30,16,62',.76,'#fff3f6','#d9b9dc','#ff7a59','#ffffff',['rgba(216,70,122,.5)','rgba(255,154,90,.5)','rgba(47,224,176,.4)'],
 'https://fonts.googleapis.com/css2?family=Pacifico&display=swap',trpHtml,
 trpCss('§S',21,76)+'\n'+trpKf+`
§T :is(h1,.greet h2){font-family:'Pacifico',cursive;font-weight:400;letter-spacing:.01em}
§T :is(.cd,.pl,.sc,.bi,.lvl,#def,.cfb,.mstat,.tt){border:1px solid rgba(255,122,89,.3)}
§T .feat{background:linear-gradient(120deg,#ff5e7a,#ff9a5a);color:#fff}
§S .yan{display:none}`]);

// ================= 4) Kamp Gecesi =================
// Samanyolu ve yıldızlar (üst bant), kayan yıldız, dağlar, çam ormanı, çadır, titreyen kamp ateşi + kıvılcımlar, ateş böcekleri
function camlar(c,n,y0,hb){let h='';for(let i=0;i<n;i++){const x=i*(400/(n-1))+rn(-6,6),hh=rn(hb*.6,hb),w=hh*.42;h+='<polygon points="'+f(x)+','+f(y0-hh)+' '+f(x-w)+','+y0+' '+f(x+w)+','+y0+'" fill="'+c+'"/>'}return h}
const cadir='<polygon points="40,4 76,56 4,56" fill="#2b3f6e"/><polygon points="40,4 76,56 58,56" fill="#1f2f56"/><polygon points="40,20 52,56 28,56" fill="#ffb24f"/><line x1="40" y1="0" x2="40" y2="8" stroke="#2b3f6e" stroke-width="2"/>';
const ates='<ellipse cx="30" cy="54" rx="26" ry="5" fill="rgba(0,0,0,.35)"/><rect x="8" y="46" width="44" height="7" rx="3.5" fill="#5a3418" transform="rotate(14 30 50)"/><rect x="8" y="46" width="44" height="7" rx="3.5" fill="#6e4220" transform="rotate(-14 30 50)"/>'
  +'<g class="al a1"><path d="M30 4 C40 18 46 28 42 40 C40 48 20 48 18 40 C14 28 22 18 30 4Z" fill="#ff7a1a"/></g>'
  +'<g class="al a2"><path d="M30 14 C37 24 40 32 37 40 C35 46 25 46 23 40 C20 32 24 24 30 14Z" fill="#ffb347"/></g>'
  +'<g class="al a3"><path d="M30 24 C34 30 35 35 33 40 C32 43 28 43 27 40 C25 35 26 30 30 24Z" fill="#fff2b0"/></g>';
function kmpHtml(){
  let h='<u class="sy"></u>'+many(26,()=>'<i style="left:'+f(rn(0,100))+'%;top:'+f(rn(1,52))+'%;--z:'+f(rn(1,2.6))+'px;--t:'+f(rn(2,5.5))+'s;--d:-'+f(rn(0,5))+'s"></i>');
  h+='<u class="ky"></u>';
  h+=svg('dg d1','0 0 400 100','<path d="M0 100 L0 60 L50 30 L90 52 L150 14 L210 50 L250 34 L310 60 L360 28 L400 46 L400 100Z" fill="#1c2a5c"/><path d="M150 14 L166 24 L158 26 L150 20 L142 27 L136 25Z" fill="#c9d6ff" opacity=".55"/><path d="M360 28 L374 37 L360 34 L350 38Z" fill="#c9d6ff" opacity=".5"/>','none');
  h+=svg('dg d2','0 0 400 100','<path d="M0 100 L0 70 L70 46 L130 66 L200 40 L270 64 L330 50 L400 66 L400 100Z" fill="#121c42"/>','none');
  h+=svg('cm','0 0 400 60',camlar('#0a1028',26,60,52),'none');
  h+='<u class="kt"><u class="pr"></u>'+svg('cdr','0 0 80 58',cadir,'xMidYMax meet')
    +svg('at','0 0 60 58',ates,'xMidYMax meet')+many(6,i=>'<b class="kv" style="--t:'+f(rn(1.6,2.8))+'s;--d:-'+f(rn(0,2.8))+'s;--w:'+f(rn(-14,14))+'px"></b>')+'</u>';
  h+=many(6,()=>'<i class="bk" style="left:'+f(rn(6,94))+'%;top:'+f(rn(58,86))+'%;--t:'+f(rn(3,6))+'s;--d:-'+f(rn(0,6))+'s"></i>');
  return h;
}
const kmpCss=(X,Y)=>`${X}{background:linear-gradient(#040714 0%,#0a1232 40%,#18295c 68%,#0a1028 100%)}
${X} .sy{left:-30%;top:-10%;width:160%;height:70%;background:radial-gradient(40% 16% at 50% 50%,rgba(190,200,255,.22),transparent 70%),radial-gradient(22% 8% at 46% 52%,rgba(255,230,255,.14),transparent 70%);transform:rotate(-24deg)}
${X} i:not(.bk){width:var(--z);height:var(--z);border-radius:50%;background:#fff;animation:sc-tw var(--t) ease-in-out var(--d) infinite}
${X} .ky{left:62%;top:8%;width:120px;height:2px;border-radius:2px;background:linear-gradient(90deg,rgba(255,255,255,0),#fff);transform-origin:100% 50%;opacity:0;will-change:transform,opacity;animation:kmp-ky 9s ease-in 2s infinite}
${X} svg.dg{position:absolute;left:-3%;width:106%}
${X} svg.d1{bottom:${Y+8}%;height:24%}${X} svg.d2{bottom:${Y+2}%;height:20%}
${X} svg.cm{position:absolute;left:-2%;width:104%;bottom:${Y}%;height:12%}
${X} .kt{left:0;right:0;bottom:${Y-1}%;height:0}
${X} .kt .pr{left:50%;bottom:-40px;width:260px;height:150px;margin-left:-170px;border-radius:50%;background:radial-gradient(closest-side,rgba(255,150,60,.42),rgba(255,120,40,.12) 55%,transparent 75%);will-change:opacity;animation:kmp-pr 1.6s ease-in-out infinite alternate}
${X} svg.cdr{position:absolute;left:50%;bottom:0;width:86px;height:auto;aspect-ratio:80/58;margin-left:6px}
${X} svg.at{position:absolute;left:50%;bottom:0;width:52px;height:auto;aspect-ratio:60/58;margin-left:-70px}
${X} svg.at .al{transform-box:fill-box;transform-origin:50% 100%;will-change:transform;animation:kmp-al .5s ease-in-out infinite alternate}
${X} svg.at .a2{animation-duration:.42s;animation-delay:-.2s}${X} svg.at .a3{animation-duration:.36s;animation-delay:-.1s}
${X} .kv{left:50%;bottom:30px;width:3px;height:3px;margin-left:-45px;border-radius:50%;background:#ffcf6e;box-shadow:0 0 6px 2px rgba(255,170,60,.8);opacity:0;will-change:transform,opacity;animation:kmp-kv var(--t) ease-out var(--d) infinite}
${X} .bk{width:4px;height:4px;border-radius:50%;background:#e8ff8a;box-shadow:0 0 8px 3px rgba(220,255,120,.6);opacity:0;will-change:transform,opacity;animation:kmp-bk var(--t) ease-in-out var(--d) infinite}`;
const kmpKf=`@keyframes kmp-ky{0%{transform:translate(0,0) rotate(-28deg) scaleX(.2);opacity:0}4%{opacity:1}10%{transform:translate(-40vw,22vh) rotate(-28deg) scaleX(1);opacity:0}100%{opacity:0;transform:translate(-40vw,22vh) rotate(-28deg)}}
@keyframes kmp-pr{from{opacity:.75}to{opacity:1}}
@keyframes kmp-al{from{transform:scale(1,1) skewX(-3deg)}to{transform:scale(.92,1.12) skewX(3deg)}}
@keyframes kmp-kv{0%{transform:translate(0,0);opacity:0}15%{opacity:1}100%{transform:translate(var(--w),-90px);opacity:0}}
@keyframes kmp-bk{0%,100%{transform:translate(0,0);opacity:0}30%,60%{opacity:1}50%{transform:translate(12px,-10px)}}`;
tema(['kamp','Kamp Gecesi',1,'#0a1232','14,20,48',.78,'#f2f4ff','#a7b0d4','#ffb347','#1f1300',['rgba(255,179,71,.5)','rgba(90,120,220,.45)','rgba(220,255,120,.35)'],
 'https://fonts.googleapis.com/css2?family=Bitter:wght@700&display=swap',kmpHtml,
 kmpCss('§S',4)+'\n'+kmpKf+`
§T :is(h1,h2,.greet h2,.feat b){font-family:'Bitter',serif;letter-spacing:.005em}
§T :is(.cd,.pl,.sc,.bi,.lvl,#def,.cfb,.mstat,.tt){border:1px solid rgba(255,179,71,.22)}
§T .feat{background:linear-gradient(120deg,#ffb347,#ff7a1a);color:#1f1300}`]);

// Klavye: sahne temalarındaki yarı saydam tuşlar (js/27) yerine dolu tuşlar; arkadaki sahne tuşların içinden görünmesin
const TUS=[['balon','#ffffff','#1f2a44','0 3px 0 rgba(143,134,207,.45)','#bdb7d6','#ffffff'],
  ['sonbahar','#fffaf2','#3b1f10','0 3px 0 rgba(150,70,20,.28)','#c9a58a','#fff7ee'],
  ['tropik','#3b2563','#fff3f6','0 3px 0 rgba(0,0,0,.45)','#21163a','rgba(255,243,246,.35)'],
  ['kamp','#252e58','#f2f4ff','0 3px 0 rgba(0,0,0,.5)','#121731','rgba(242,244,255,.32)']];
TUS.forEach(t=>{const T=':root[data-theme="'+t[0]+'"]';
  ALL+=T+' .k:not(.g):not(.o):not(.r):not(.w){background:'+t[1]+';color:'+t[2]+';border-color:transparent;box-shadow:'+t[3]+';-webkit-backdrop-filter:none;backdrop-filter:none}\n'
    +T+' .k.r{background:'+t[4]+';color:'+t[5]+';opacity:1}\n'+T+' .k.g,'+T+' .k.o,'+T+' .k.w{box-shadow:'+t[3]+'}\n'});
document.head.insertAdjacentHTML('beforeend','<style id="sahne-4">'+ALL+'</style>');
// Kayıtlı tema bu dosyadaki temalardan biriyse sahnesini kur (js/27 açılışta bu temaları henüz tanımıyordu)
try{const t=localStorage.getItem('ka_theme');if(t&&YENI.includes(t)&&typeof sahneKur==='function'){document.documentElement.dataset.theme=t;sahneKur(t)}}catch(e){}
Object.assign(EN,{'Balon Festivali':'Balloon Festival','Sonbahar Ormanı':'Autumn Forest','Tropik Gün Batımı':'Tropical Sunset','Kamp Gecesi':'Camp Night'});

// ---------- Oyun sahneleri ----------
if(window.OSEKLE){
  OSEKLE('balon',{html:blnHtml,css:blnCss('§O')+'\n'+blnKf});
  OSEKLE('sonbahar',{html:sbnHtml,css:sbnCss('§O',13)+'\n'+sbnKf});
  OSEKLE('tropik',{html:trpHtml,css:trpCss('§O',30,50)+'\n'+trpKf});
  OSEKLE('kamp',{html:kmpHtml,css:kmpCss('§O',27)+'\n'+kmpKf});
}

// ---------- Çerçeveler (js/30 ile aynı katmanlı SVG düzeni: avatar r=50, halka r≈52-68; .x süsleri küçük boyda gizlenir) ----------
// anahtar: [ad, arka katman, ön katman, renkler]
const P2=(a,r)=>[100+r*Math.cos(a*Math.PI/180),100+r*Math.sin(a*Math.PI/180)];
const minib=(x,y,k,c1,c2)=>'<g transform="translate('+f(x)+' '+f(y)+') scale('+k+') translate(-30 -40)">'+balon(c1,c2)+'</g>';
const FR={
  balon:id=>['<defs><linearGradient id="'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#78c6ef"/><stop offset=".55" stop-color="#ffe2c4"/><stop offset="1" stop-color="#ffb08a"/></linearGradient></defs>'
      +'<circle cx="100" cy="100" r="60" fill="none" stroke="url(#'+id+')" stroke-width="14"/><circle cx="100" cy="100" r="67" fill="none" stroke="#fff" stroke-width="2"/><circle cx="100" cy="100" r="53" fill="none" stroke="#fff" stroke-width="2"/>'
      +[[200,'#fff'],[235,'#fff'],[320,'#fff']].map((a,i)=>{const p=P2(a[0],60);return '<g opacity=".95"><ellipse cx="'+f(p[0])+'" cy="'+f(p[1])+'" rx="9" ry="4.5" fill="#fff"/><ellipse cx="'+f(p[0]+5)+'" cy="'+f(p[1]-2)+'" rx="6" ry="4" fill="#fff"/></g>'}).join(''),
    '<g class="fr-or">'+[[0,'#ff5d73','#ffd166',.42],[120,'#4cc9f0','#ffffff',.36],[240,'#7b61ff','#ffb3c7',.38]].map(b=>{const p=P2(b[0]-90,82);return '<g class="x">'+minib(p[0],p[1],b[3],b[1],b[2])+'</g>'}).join('')+'</g>'
      +[[-60,'#ff5d73'],[60,'#4cc9f0'],[180,'#7b61ff']].map(b=>{const p=P2(b[0]-90,60);return '<circle cx="'+f(p[0])+'" cy="'+f(p[1])+'" r="5" fill="'+b[1]+'" stroke="#fff" stroke-width="2"/>'}).join('')],
  yaprak:()=>{let a='<circle cx="100" cy="100" r="60" fill="none" stroke="#7a3a14" stroke-width="5"/>',b='';
    for(let i=0;i<16;i++){const g=i*22.5+(i%2?6:0),p=P2(g,60+(i%2?4:-3)),k=i%2?.62:.72;
      a+='<g transform="translate('+f(p[0])+' '+f(p[1])+') rotate('+f(g+90+(i%2?30:-25))+') scale('+k+') translate(-20 -20)">'+yaprak(YR[i%5])+'</g>'}
    b+='<g class="x"><g class="fr-sl" style="transform-origin:150px 150px"><g transform="translate(150 150) rotate(30) scale(.55) translate(-20 -2)">'+yaprak('#f7c33c')+'</g></g>'
      +'<g class="fr-sl" style="transform-origin:46px 160px;animation-delay:-1.4s"><g transform="translate(46 160) rotate(-40) scale(.48) translate(-20 -2)">'+yaprak('#c23b22')+'</g></g></g>';
    return [a,b]},
  hibiskus:id=>{const cic=(x,y,k,c,c2)=>'<g transform="translate('+x+' '+y+') scale('+k+')">'+many(5,i=>'<ellipse cx="0" cy="-13" rx="10" ry="14" fill="'+c+'" transform="rotate('+(i*72)+')"/>')+many(5,i=>'<path d="M0 0 L0 -18" stroke="'+c2+'" stroke-width="1.3" opacity=".55" transform="rotate('+(i*72)+')"/>')+'<circle r="5" fill="'+c2+'"/><path d="M0 0 Q6 -10 3 -22" stroke="#ffe16b" stroke-width="2.2" fill="none"/><circle cx="3" cy="-23" r="2.6" fill="#ffd23a"/></g>';
    const yap=(x,y,r,k)=>'<g transform="translate('+x+' '+y+') rotate('+r+') scale('+k+')"><path d="M0 0 C12 -18 34 -22 52 -8 C36 -6 18 2 0 0Z" fill="#1fae7a"/><path d="M0 0 C16 -10 32 -12 50 -8" stroke="#0e7a55" stroke-width="1.6" fill="none"/></g>';
    return ['<defs><linearGradient id="'+id+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff5e7a"/><stop offset=".5" stop-color="#ff9a5a"/><stop offset="1" stop-color="#ffcf7a"/></linearGradient></defs>'
      +'<g class="x">'+yap(150,152,-30,.95)+yap(150,152,40,.8)+yap(52,44,200,.7)+'</g>'
      +'<circle cx="100" cy="100" r="60" fill="none" stroke="url(#'+id+')" stroke-width="12"/><circle cx="100" cy="100" r="66.5" fill="none" stroke="#2fe0b0" stroke-width="2"/><circle cx="100" cy="100" r="53.5" fill="none" stroke="#2fe0b0" stroke-width="2"/>',
      '<g class="fr-ns" style="transform-origin:146px 146px">'+cic(146,146,1.05,'#ff2f63','#b8164a')+'</g><g class="x"><g class="fr-ns" style="transform-origin:56px 50px;animation-delay:-2s">'+cic(56,50,.6,'#ff7aa0','#d43a6a')+'</g></g>']},
  kamp:id=>{let a='<defs><linearGradient id="'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a1232"/><stop offset=".7" stop-color="#22336e"/><stop offset="1" stop-color="#3a2a5a"/></linearGradient></defs>'
      +'<circle cx="100" cy="100" r="60" fill="none" stroke="url(#'+id+')" stroke-width="14"/><circle cx="100" cy="100" r="67" fill="none" stroke="#ffb347" stroke-width="1.6" opacity=".7"/><circle cx="100" cy="100" r="53" fill="none" stroke="#ffb347" stroke-width="1.6" opacity=".7"/>';
    [[200,1.6],[222,1.1],[245,1.8],[268,1.2],[292,1.7],[316,1.1],[338,1.5]].forEach((g,i)=>{const p=P2(g[0],60);a+='<circle class="fr-tw" style="animation-delay:-'+(i*.45)+'s" cx="'+f(p[0])+'" cy="'+f(p[1])+'" r="'+g[1]+'" fill="#fff"/>'});
    const b='<g transform="translate(76 140) scale(.8)">'+'<ellipse cx="30" cy="54" rx="22" ry="4" fill="rgba(0,0,0,.35)"/><rect x="10" y="46" width="40" height="7" rx="3.5" fill="#5a3418" transform="rotate(14 30 50)"/><rect x="10" y="46" width="40" height="7" rx="3.5" fill="#6e4220" transform="rotate(-14 30 50)"/>'
      +'<g class="fr-al"><path d="M30 6 C40 20 46 30 42 40 C40 48 20 48 18 40 C14 30 22 20 30 6Z" fill="#ff7a1a"/></g><g class="fr-al" style="animation-duration:.42s"><path d="M30 16 C37 26 40 33 37 40 C35 46 25 46 23 40 C20 33 24 26 30 16Z" fill="#ffb347"/></g><g class="fr-al" style="animation-duration:.36s"><path d="M30 26 C34 31 35 36 33 40 C32 43 28 43 27 40 C25 36 26 31 30 26Z" fill="#fff2b0"/></g></g>'
      +'<g class="x">'+many(4,i=>'<circle class="fr-kv" style="animation-delay:-'+(i*.6)+'s;--w:'+[-8,6,-3,10][i]+'px" cx="'+(98+i*2)+'" cy="160" r="1.8" fill="#ffcf6e"/>')+'<path class="fr-tw" d="M150 40 l2.5 6 6 2.5 -6 2.5 -2.5 6 -2.5 -6 -6 -2.5 6 -2.5Z" fill="#fff2c2"/></g>';
    return [a,b]}
};
const FAD={balon:['Balon','#ff5d73','#4cc9f0','#ffd166','#ffffff'],yaprak:['Sonbahar Yaprağı','#e8552a','#f39a2b','#f7c33c','#7a3a14'],hibiskus:['Hibiskus','#ff2f63','#ff9a5a','#2fe0b0','#fff3f6'],kamp:['Kamp Ateşi','#ffb347','#ff7a1a','#22336e','#ffffff']};
let FRN=0;
if(typeof FRM!=='undefined'&&typeof frameHtml==='function'){
  Object.keys(FAD).forEach(k=>{const d=FAD[k];FRM[k]=[d[0],4,'svg',{shop:1},0,'•','out','',d.slice(1)];if(typeof UNL!=='undefined')UNL.push({id:'frame:'+k,t:'frame',n:d[0],req:{shop:1}})});
  const _fh=frameHtml;frameHtml=function(h,k){
    if(!Object.prototype.hasOwnProperty.call(FR,k))return _fh(h,k);
    const m=/(?:width="|width:)(\d+)/.exec(h),z=m?+m[1]:40,sv=FR[k]('fr4'+(++FRN));
    return '<span class="rk rk-'+k+(z<40?' sm':'')+'" style="--s:'+z+'px">'+h+'<svg class="rk-b" viewBox="0 0 200 200" aria-hidden="true">'+sv[0]+'</svg><svg class="rk-f" viewBox="0 0 200 200" aria-hidden="true">'+sv[1]+'</svg></span>';
  };
  document.head.insertAdjacentHTML('beforeend',`<style id="cerceve-4">
.rk .fr-or{transform-box:view-box;transform-origin:100px 100px;animation:fr-or 24s linear infinite}
.rk .fr-sl{animation:fr-sl 3.2s ease-in-out infinite alternate}
.rk .fr-ns{animation:fr-ns 4s ease-in-out infinite alternate}
.rk .fr-tw{animation:sc-tw 2.4s ease-in-out infinite}
.rk .fr-al{transform-box:fill-box;transform-origin:50% 100%;animation:kmp-al .5s ease-in-out infinite alternate}
.rk .fr-kv{opacity:0;animation:fr-kv 2.4s ease-out infinite}
.rk-balon .rk-b{filter:drop-shadow(0 calc(var(--s)*.03) calc(var(--s)*.06) rgba(90,80,150,.3))}
.rk-kamp .rk-b{filter:drop-shadow(0 0 calc(var(--s)*.07) rgba(255,160,60,.35))}
.rk-hibiskus .rk-b{filter:drop-shadow(0 0 calc(var(--s)*.06) rgba(255,94,122,.35))}
@keyframes fr-or{to{transform:rotate(360deg)}}
@keyframes fr-sl{from{transform:rotate(-12deg)}to{transform:rotate(12deg)}}
@keyframes fr-ns{from{transform:rotate(-6deg) scale(1)}to{transform:rotate(6deg) scale(1.05)}}
@keyframes fr-kv{0%{transform:translate(0,0);opacity:0}15%{opacity:1}100%{transform:translate(var(--w),-34px);opacity:0}}
</style>`);
  Object.assign(EN,{'Balon':'Balloon','Sonbahar Yaprağı':'Autumn Leaf','Hibiskus':'Hibiscus','Kamp Ateşi':'Campfire'});
}

// ---------- Harf blokları ve dokunuş efektleri ----------
if(window.TEMAEK){
  TEMAEK('balon',{t:'txt',m:'up',n:5,c:['#ff5d73','#4cc9f0','#ffd166'],s:[16,24],g:['🎈']},{f:"'Baloo 2',sans-serif",
    e:'background:rgba(255,255,255,.96);border:2px solid #fff;border-radius:16px;box-shadow:0 4px 0 rgba(143,134,207,.35),0 6px 14px rgba(90,80,150,.15)',
    fl:'border-color:#ff5d73;box-shadow:0 4px 0 rgba(255,93,115,.35),0 0 0 3px rgba(255,93,115,.18)',
    g:'background:linear-gradient(#3fd6a0,#14a979);color:#fff;border:2px solid #d5fff0;border-radius:16px;box-shadow:0 4px 0 #0e7a58',
    o:'background:linear-gradient(#ffd166,#f5a524);color:#3a2600;border:2px solid #fff1c4;border-radius:16px;box-shadow:0 4px 0 #c27c10',
    r:'background:linear-gradient(#ff7b8c,#e8445a);color:#fff;border:2px solid #ffd6dc;border-radius:16px;box-shadow:0 4px 0 #b42a3d'});
  TEMAEK('sonbahar',{t:'txt',m:'fall',n:6,c:['#e8552a','#f39a2b'],s:[14,22],g:['🍁','🍂']},{f:"'Fraunces',serif",
    e:'background:#fffaf2;border:2px solid #ecc49a;border-radius:12px;box-shadow:inset 0 -3px 0 rgba(217,102,47,.15)',
    fl:'border-color:#d9582b;box-shadow:inset 0 -3px 0 rgba(217,102,47,.15),0 0 0 3px rgba(217,88,43,.18)',
    g:'background:linear-gradient(#7fb547,#4f8a2a);color:#fff;border:2px solid #e3f2cf;border-radius:12px;box-shadow:inset 0 -3px 0 rgba(0,0,0,.18)',
    o:'background:linear-gradient(#ffc845,#eb9a1a);color:#3b1f10;border:2px solid #fff0c4;border-radius:12px;box-shadow:inset 0 -3px 0 rgba(0,0,0,.14)',
    r:'background:linear-gradient(#d4552f,#a8361c);color:#fff;border:2px solid #ffd6c4;border-radius:12px;box-shadow:inset 0 -3px 0 rgba(0,0,0,.2)'});
  TEMAEK('tropik',{t:'txt',m:'out',n:6,c:['#ff7a59','#ffcf7a','#2fe0b0'],s:[14,22],g:['🌺','✦']},{
    e:'background:linear-gradient(160deg,rgba(60,30,110,.78),rgba(24,12,56,.88));border:1.5px solid rgba(255,122,89,.45);border-radius:14px;box-shadow:inset 0 1px 0 rgba(255,255,255,.12)',
    fl:'border-color:#ffcf7a;box-shadow:0 0 12px rgba(255,207,122,.5);color:#ffe4b0',
    g:'background:linear-gradient(160deg,#36e0b4,#0e9f7e);color:#fff;border:1.5px solid #c8fff0;border-radius:14px;box-shadow:0 0 12px rgba(47,224,176,.45)',
    o:'background:linear-gradient(160deg,#ffc46b,#ff7a3d);color:#3a1600;border:1.5px solid #ffe8c4;border-radius:14px;box-shadow:0 0 12px rgba(255,150,80,.5)',
    r:'background:linear-gradient(160deg,#ff5e7a,#b8164a);color:#fff;border:1.5px solid #ffc8d4;border-radius:14px;box-shadow:0 0 12px rgba(255,80,120,.45)'});
  TEMAEK('kamp',{t:'dot',m:'up',n:9,c:['#ffcf6e','#ff9a3c','#fff2c2'],s:[3,5],glow:1},{f:"'Bitter',serif",
    e:'background:linear-gradient(#18203f,#0e142c);border:1.5px solid rgba(255,179,71,.35);border-radius:10px;box-shadow:inset 0 1px 0 rgba(255,255,255,.06)',
    fl:'border-color:#ffb347;box-shadow:0 0 12px rgba(255,179,71,.5);color:#ffe2b0',
    g:'background:linear-gradient(#4cbf68,#1f7a3c);color:#fff;border:1.5px solid #c9f5d4;border-radius:10px;box-shadow:0 0 10px rgba(76,191,104,.4)',
    o:'background:linear-gradient(#ffc56b,#ef7f1f);color:#2a1400;border:1.5px solid #ffe6bf;border-radius:10px;box-shadow:0 0 12px rgba(255,160,60,.5)',
    r:'background:linear-gradient(#d65050,#7a1f22);color:#ffe3e3;border:1.5px solid rgba(255,190,190,.6);border-radius:10px'});
}
})();
