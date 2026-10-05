// v14: sahneli (canlı) temalar. Sadece renk değil: hareketli arka plan sahnesi, yazı tipi ve arayüz stili.
// Sahne #sahne katmanında çizilir (sayfanın arkasında, tıklanmaz); düşük performans / hareketi azalt modunda durur.
const SCN={};
const SFONT={};
const sfont=u=>{if(!u||SFONT[u])return;SFONT[u]=1;const l=document.createElement('link');l.rel='stylesheet';l.href=u;document.head.appendChild(l)};
const R=(a,b)=>a+Math.random()*(b-a);
const f1=n=>n.toFixed(1);
const ps=(n,f,tag)=>{tag=tag||'i';let h='';for(let i=0;i<n;i++)h+='<'+tag+' style="'+f(i)+'"></'+tag+'>';return h};
const rain=(n,c)=>ps(n,()=>'--x:'+f1(R(0,100))+'%;--t:'+f1(R(.7,1.5))+'s;--d:-'+f1(R(0,2))+'s;--w:-40px'+(c?';--c:'+c:''));
const cloud=n=>ps(n,i=>'top:'+(6+i*13)+'%;--t:'+(70+i*30)+'s;--d:-'+(i*37)+'s','u');
// Her tema: anahtar, ad, koyu?, zemin, panel RGB, panel opaklığı, yazı, soluk, vurgu, vurgu yazısı, 3 önizleme rengi, yazı tipi, fiyat, sahne HTML, CSS (§S=sahne, §T=tema)
const SD=[
['cyber','Cyberpunk 2077',1,'#07070f','14,14,26',.7,'#f4f4ff','#9a9cc0','#fcee0a','#141000',['rgba(252,238,10,.5)','rgba(34,211,238,.45)','rgba(255,42,109,.5)'],
 ['https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&display=swap',"'Rajdhani'"],150000,
 ()=>ps(9,i=>'left:'+(i*11-2)+'%;width:'+f1(R(7,12))+'%;height:'+f1(R(14,34))+'%;--c:'+['#22d3ee','#ff2a6d','#fcee0a'][i%3],'u')+rain(26),
`§S{background:linear-gradient(#07070f 0%,#1b0b33 50%,#45104f 78%,#ff2a6d 120%)}
§S::before{content:'';position:absolute;left:-50%;right:-50%;bottom:0;height:34%;background-image:linear-gradient(90deg,rgba(0,240,255,.5) 1px,transparent 1px),linear-gradient(rgba(0,240,255,.5) 1px,transparent 1px);background-size:52px 52px;transform:perspective(260px) rotateX(62deg);transform-origin:50% 100%;animation:sc-grid 1.6s linear infinite;-webkit-mask:linear-gradient(transparent,#000);mask:linear-gradient(transparent,#000)}
§S::after{content:'';position:absolute;inset:0;background:repeating-linear-gradient(0deg,rgba(255,255,255,.045) 0 1px,transparent 1px 3px);animation:sc-scan 6s linear infinite}
§S u{bottom:30%;background:radial-gradient(circle,rgba(252,238,10,.75) 1px,transparent 1.6px) 0 0/10px 14px,linear-gradient(#0c0818,#150a26);box-shadow:inset 0 2px 0 var(--c),0 0 16px -2px var(--c)}
§S i{top:-10%;left:var(--x);width:1px;height:70px;background:linear-gradient(transparent,#22d3ee);opacity:.55;animation:sc-fall var(--t) linear var(--d) infinite}
§T :is(.cd,.pl,.sc,.bi,.lvl,#def,.cfb,.mstat,.feat,.tt){border:1px solid rgba(252,238,10,.35);border-radius:4px;box-shadow:0 0 18px -6px rgba(34,211,238,.7),inset 0 0 0 1px rgba(255,42,109,.16)}
§T :is(h1,h2,.greet h2,.feat b){text-transform:uppercase;letter-spacing:.06em;animation:sc-glitch 5s infinite}
@keyframes sc-glitch{0%,92%,100%{text-shadow:none}93%{text-shadow:2px 0 #ff2a6d,-2px 0 #22d3ee}95%{text-shadow:-2px 0 #ff2a6d,2px 0 #22d3ee}97%{text-shadow:none}}
@keyframes sc-scan{to{background-position:0 60px}}`],

['witcher','Witcher',1,'#070c12','18,26,22',.7,'#ece6d2','#a3ad96','#d4a53c','#1c1405',['rgba(212,165,60,.35)','rgba(120,160,140,.3)','rgba(240,236,200,.25)'],
 ['https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&display=swap',"'Cinzel'"],150000,
 ()=>'<u class="m"></u>'+ps(14,i=>'left:'+(i*8-3)+'%;height:'+f1(R(24,46))+'%;width:'+f1(R(7,12))+'%;--o:'+(i%2?1:.55),'u').replace(/<u /g,'<u class="t" ')+'<u class="f"></u><u class="f g"></u>'+ps(24,()=>'left:'+f1(R(0,100))+'%;--z:'+f1(R(2,4))+'px;--t:'+f1(R(8,16))+'s;--d:-'+f1(R(0,14))+'s;--w:'+f1(R(-60,60))+'px'),
`§S{background:linear-gradient(#070c12,#12211f 65%,#1d2f27)}
§S .m{top:7%;right:12%;width:92px;height:92px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#fffdf0,#d9d6bd 60%,#a9a68f);box-shadow:0 0 70px 24px rgba(240,236,200,.22);animation:sc-fl 7s ease-in-out infinite}
§S .t{bottom:-2%;background:#04080a;opacity:var(--o);clip-path:polygon(50% 0,62% 25%,56% 25%,72% 52%,62% 52%,85% 100%,15% 100%,38% 52%,28% 52%,44% 25%,38% 25%)}
§S .f{bottom:4%;left:-30%;width:160%;height:36%;background:radial-gradient(50% 50% at 50% 50%,rgba(190,215,205,.2),transparent 70%);animation:sc-drift 28s ease-in-out infinite alternate}
§S .f.g{bottom:18%;animation-duration:40s;animation-direction:alternate-reverse;opacity:.7}
§S i{top:100%;width:var(--z);height:var(--z);border-radius:50%;background:#ffcf5a;box-shadow:0 0 9px 2px rgba(255,190,70,.8);animation:sc-rise var(--t) ease-in-out var(--d) infinite}
§T :is(.cd,.pl,.sc,.bi,.lvl,#def,.cfb,.mstat,.feat,.tt){border:1px solid rgba(212,165,60,.3);border-radius:8px;box-shadow:inset 0 0 0 3px rgba(0,0,0,.18),inset 0 0 0 4px rgba(212,165,60,.12),var(--sh)}
§T :is(h1,h2,.greet h2,.feat b,.pf-n){font-family:'Cinzel',serif;letter-spacing:.03em}`],

['minecraft','Minecraft',0,'#9fd3f7','198,198,198',.94,'#1c1c1c','#4d4d4d','#3f8a24','#ffffff',['#6fb6f2','#5fb336','#86582f'],
 ['https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@500;700&display=swap',"'Pixelify Sans'"],150000,
 ()=>'<u class="s"></u>'+cloud(4).replace(/<u /g,'<u class="c" ')+'<u class="g"></u>'+ps(16,()=>'left:'+f1(R(0,100))+'%;--t:'+f1(R(6,12))+'s;--d:-'+f1(R(0,12))+'s;--w:'+f1(R(-40,40))+'px'),
`§S{background:linear-gradient(#6fb6f2,#bfe3ff 72%);image-rendering:pixelated}
§S .s{top:6%;left:14%;width:64px;height:64px;background:#ffe45c;box-shadow:0 0 0 8px rgba(255,228,92,.35),0 0 60px 20px rgba(255,228,92,.4);animation:sc-bob 9s ease-in-out infinite alternate}
§S .c{left:0;width:84px;height:28px;background:#fff;box-shadow:24px -20px 0 #fff,56px -12px 0 #fff;opacity:.92;animation:sc-pan var(--t) linear var(--d) infinite}
§S .g{left:0;right:0;bottom:0;height:15%;background:linear-gradient(#5fb336 0 16px,#3f8a24 16px 20px,transparent 20px),linear-gradient(90deg,rgba(0,0,0,.1) 50%,transparent 50%) 0 0/32px 32px,linear-gradient(rgba(0,0,0,.1) 50%,transparent 50%) 0 0/32px 32px,#86582f}
§S i{top:100%;width:8px;height:8px;background:#b7f23a;box-shadow:0 0 0 2px #6dbf1a,0 0 10px 2px rgba(183,242,58,.7);animation:sc-rise var(--t) linear var(--d) infinite}
§T{--line:#8b8b8b;--key:#a9a9a9}
§T :is(.cd,.pl,.sc,.bi,.lvl,#def,.cfb,.mstat,.feat,.tt,button,.k,.tile,input){border:0;border-radius:0!important;box-shadow:inset 3px 3px 0 #fff,inset -3px -3px 0 #555,0 0 0 3px #1a1a1a}
§T .feat{background:#3f8a24;color:#fff}
@keyframes sc-bob{to{transform:translateY(24px)}}`],

['galaksi','Galaksi',1,'#04020f','18,12,40',.66,'#f2eeff','#a79fd0','#a78bfa','#150a33',['rgba(168,85,247,.45)','rgba(34,211,238,.35)','rgba(236,72,153,.35)'],
 null,120000,
 ()=>ps(70,()=>'left:'+f1(R(0,100))+'%;top:'+f1(R(0,100))+'%;--z:'+f1(R(1,3))+'px;--t:'+f1(R(2,6))+'s;--d:-'+f1(R(0,6))+'s')+ps(3,i=>'left:'+f1(R(0,60))+'%;top:'+f1(R(0,40))+'%;--d:'+(i*4)+'s','u').replace(/<u /g,'<u class="sh" ')+'<u class="p"></u>',
`§S{background:radial-gradient(120% 80% at 80% 100%,#2b1257,#07041a 60%,#02010a)}
§S::before{content:'';position:absolute;inset:-30%;background:radial-gradient(40% 30% at 30% 30%,rgba(168,85,247,.35),transparent 70%),radial-gradient(35% 30% at 75% 60%,rgba(34,211,238,.25),transparent 70%);animation:sc-spin 180s linear infinite}
§S i{left:var(--x);width:var(--z);height:var(--z);border-radius:50%;background:#fff;animation:sc-tw var(--t) ease-in-out var(--d) infinite}
§S .sh{width:130px;height:2px;background:linear-gradient(90deg,transparent,#fff);opacity:0;animation:sc-shoot 8s linear var(--d) infinite}
§S .p{right:-70px;bottom:12%;width:230px;height:230px;border-radius:50%;background:radial-gradient(circle at 30% 30%,#c4b5fd,#6d28d9 55%,#1e1b4b);box-shadow:0 0 70px rgba(139,92,246,.45)}
§S .p::after{content:'';position:absolute;left:-32%;right:-32%;top:42%;height:16%;border:3px solid rgba(221,214,254,.5);border-radius:50%;transform:rotate(-18deg)}
@keyframes sc-shoot{0%{transform:rotate(30deg) translateX(0);opacity:0}4%{opacity:1}14%{transform:rotate(30deg) translateX(460px);opacity:0}100%{transform:rotate(30deg) translateX(460px);opacity:0}}`],

['yagmur','Yağmurlu Gece',1,'#060a14','14,22,40',.68,'#e6efff','#8fa4c6','#60a5fa','#08142b',['rgba(96,165,250,.4)','rgba(148,163,184,.3)','rgba(59,130,246,.3)'],
 null,90000,
 ()=>'<u class="fl"></u>'+cloud(3).replace(/<u /g,'<u class="c" ')+rain(44)+ps(6,i=>'left:'+f1(R(5,90))+'%;bottom:'+f1(R(2,12))+'%;--d:-'+f1(R(0,2))+'s','u').replace(/<u /g,'<u class="r" '),
`§S{background:linear-gradient(#060a14,#101c33 70%,#16263f)}
§S .fl{inset:0;background:#cfe0ff;opacity:0;animation:sc-flash 9s linear infinite}
§S .c{left:-10%;width:70%;height:24%;margin-top:-8%;background:radial-gradient(50% 50% at 50% 50%,rgba(12,20,38,.95),transparent 70%);filter:blur(10px);animation:sc-drift 30s ease-in-out var(--d) infinite alternate}
§S i{top:-10%;left:var(--x);width:1px;height:55px;background:linear-gradient(transparent,rgba(170,205,255,.75));animation:sc-fall var(--t) linear var(--d) infinite}
§S .r{width:44px;height:10px;border:1px solid rgba(170,205,255,.5);border-radius:50%;opacity:0;animation:sc-rip 2.2s ease-out var(--d) infinite}
@keyframes sc-flash{0%,91%,100%{opacity:0}92%{opacity:.35}93%{opacity:.04}94%{opacity:.5}97%{opacity:0}}
@keyframes sc-rip{0%{transform:scale(.3);opacity:.9}100%{transform:scale(1.8);opacity:0}}`],

['kis','Kış Masalı',0,'#cfe6fa','255,255,255',.72,'#0f2a3d','#52758f','#0369a1','#ffffff',['rgba(125,180,230,.55)','rgba(255,255,255,.7)','rgba(186,230,253,.6)'],
 null,90000,
 ()=>ps(38,()=>'left:'+f1(R(0,100))+'%;--z:'+f1(R(3,9))+'px;--t:'+f1(R(7,16))+'s;--d:-'+f1(R(0,16))+'s;--w:'+f1(R(-70,70))+'px')+'<u class="h"></u><u class="h b"></u>',
`§S{background:linear-gradient(#7fb2e5,#cfe6fa 65%,#eaf4ff)}
§S i{top:-6%;left:var(--x);width:var(--z);height:var(--z);border-radius:50%;background:#fff;box-shadow:0 0 6px rgba(255,255,255,.9);animation:sc-fall var(--t) linear var(--d) infinite}
§S .h{left:-25%;bottom:-18%;width:95%;height:34%;border-radius:50%;background:#fff;box-shadow:0 -6px 24px rgba(180,210,240,.6)}
§S .h.b{left:auto;right:-30%;bottom:-24%;width:90%;background:#f2f8ff}`],

['okyanus','Derin Deniz',1,'#021b2e','6,40,62',.66,'#e4f8ff','#85b6c9','#22d3ee','#032632',['rgba(34,211,238,.4)','rgba(14,116,144,.5)','rgba(125,211,252,.3)'],
 null,100000,
 ()=>ps(22,()=>'left:'+f1(R(0,100))+'%;--z:'+f1(R(5,16))+'px;--t:'+f1(R(8,18))+'s;--d:-'+f1(R(0,18))+'s;--w:'+f1(R(-30,30))+'px')+ps(3,i=>'top:'+(25+i*22)+'%;--t:'+(34+i*14)+'s;--d:-'+(i*13)+'s','u').replace(/<u /g,'<u class="fi" ').replace(/><\/u>/g,'>🐠</u>'),
`§S{background:linear-gradient(#0b5f84 0%,#053a5a 38%,#021b2e 100%)}
§S::before{content:'';position:absolute;left:-10%;right:-10%;top:-10%;height:80%;background:repeating-linear-gradient(105deg,rgba(180,240,255,.13) 0 40px,transparent 40px 130px);-webkit-mask:linear-gradient(#000,transparent);mask:linear-gradient(#000,transparent);animation:sc-ray 9s ease-in-out infinite alternate}
§S i{top:100%;left:var(--x);width:var(--z);height:var(--z);border-radius:50%;border:1px solid rgba(255,255,255,.55);background:radial-gradient(circle at 30% 30%,rgba(255,255,255,.5),transparent 60%);animation:sc-rise var(--t) ease-in infinite var(--d)}
§S .fi{left:0;font-size:24px;opacity:.4;animation:sc-pan var(--t) linear var(--d) infinite}
§S::after{content:'';position:absolute;left:0;right:0;bottom:0;height:14%;background:linear-gradient(transparent,#01121d)}
@keyframes sc-ray{from{opacity:.35;transform:skewX(-6deg)}to{opacity:1;transform:skewX(6deg)}}`],

['synthwave','Synthwave',1,'#12012e','28,8,56',.66,'#fff0fb','#c9a0e0','#ff4fd8','#2a0524',['rgba(255,61,154,.5)','rgba(120,60,255,.45)','rgba(255,184,107,.4)'],
 ['https://fonts.googleapis.com/css2?family=Audiowide&display=swap',"'Audiowide'"],110000,
 ()=>ps(30,()=>'left:'+f1(R(0,100))+'%;top:'+f1(R(0,40))+'%;--z:'+f1(R(1,2.5))+'px;--t:'+f1(R(2,5))+'s;--d:-'+f1(R(0,5))+'s')+'<u class="s"></u><u class="m"></u><u class="m b"></u>',
`§S{background:linear-gradient(#12012e 0%,#3a0a63 40%,#ff3d9a 62%,#ffb86b 66%,#1a0033 66%)}
§S::before{content:'';position:absolute;left:-50%;right:-50%;bottom:0;height:34%;background-image:linear-gradient(90deg,rgba(255,79,216,.7) 1px,transparent 1px),linear-gradient(rgba(255,79,216,.7) 1px,transparent 1px);background-size:56px 56px;transform:perspective(240px) rotateX(60deg);transform-origin:50% 100%;animation:sc-grid 1.8s linear infinite;-webkit-mask:linear-gradient(transparent,#000);mask:linear-gradient(transparent,#000)}
§S i{left:var(--x);width:var(--z);height:var(--z);border-radius:50%;background:#fff;animation:sc-tw var(--t) ease-in-out var(--d) infinite}
§S .s{left:50%;top:32%;width:190px;height:190px;margin-left:-95px;border-radius:50%;background:linear-gradient(#ffe45c,#ff3d9a);-webkit-mask:linear-gradient(#000 58%,transparent 58% 64%,#000 64% 71%,transparent 71% 78%,#000 78% 86%,transparent 86% 94%,#000 94%);mask:linear-gradient(#000 58%,transparent 58% 64%,#000 64% 71%,transparent 71% 78%,#000 78% 86%,transparent 86% 94%,#000 94%);animation:sc-fl 4s ease-in-out infinite}
§S .m{left:-6%;bottom:34%;width:40%;height:14%;background:#2a0a4d;clip-path:polygon(0 100%,35% 0,55% 60%,75% 20%,100% 100%)}
§S .m.b{left:auto;right:-6%;width:46%;height:18%}
§T :is(h1,h2,.greet h2,.feat b){font-family:'Audiowide',sans-serif;letter-spacing:.04em;text-shadow:0 0 14px rgba(255,79,216,.55)}
§T :is(.cd,.pl,.sc,.bi,.lvl,#def,.cfb,.mstat,.feat,.tt){border:1px solid rgba(255,79,216,.35);box-shadow:0 0 22px -8px rgba(255,79,216,.7)}`],

['buyulu','Büyülü Orman',1,'#06140f','10,36,28',.66,'#e8fff0','#8fc4a6','#86efac','#052113',['rgba(94,234,212,.35)','rgba(190,255,90,.3)','rgba(52,211,153,.35)'],
 null,100000,
 ()=>ps(22,()=>'left:'+f1(R(0,100))+'%;top:'+f1(R(5,95))+'%;--t:'+f1(R(6,12))+'s;--d:-'+f1(R(0,12))+'s')+ps(6,i=>'left:'+(6+i*17)+'%;--h:'+f1(R(14,26))+'px','u').replace(/<u /g,'<u class="mu" '),
`§S{background:radial-gradient(90% 60% at 50% 100%,#0f3d2b,#06140f 70%)}
§S::before{content:'';position:absolute;left:-10%;right:-10%;top:-10%;height:90%;background:repeating-linear-gradient(100deg,rgba(190,255,200,.07) 0 30px,transparent 30px 120px);-webkit-mask:linear-gradient(#000,transparent);mask:linear-gradient(#000,transparent);animation:sc-ray 11s ease-in-out infinite alternate}
§S i{left:var(--x);width:5px;height:5px;border-radius:50%;background:#d9ff7a;box-shadow:0 0 12px 3px rgba(190,255,90,.8);animation:sc-wander var(--t) ease-in-out var(--d) infinite}
§S .mu{bottom:0;width:30px;height:var(--h);border-radius:50% 50% 0 0;background:#5eead4;box-shadow:0 0 22px 4px rgba(94,234,212,.55);animation:sc-fl 4s ease-in-out infinite}
@keyframes sc-wander{0%,100%{transform:translate(0,0);opacity:.2}25%{transform:translate(34px,-46px);opacity:1}50%{transform:translate(-22px,-90px);opacity:.4}75%{transform:translate(28px,-40px);opacity:1}}`],

['petal','Sakura Yağmuru',0,'#ffe9f1','255,255,255',.7,'#4a2b36','#a07585','#e0457b','#ffffff',['rgba(255,183,207,.6)','rgba(255,214,230,.6)','rgba(255,160,190,.45)'],
 null,90000,
 ()=>ps(30,()=>'left:'+f1(R(0,100))+'%;--z:'+f1(R(9,18))+'px;--t:'+f1(R(8,16))+'s;--d:-'+f1(R(0,16))+'s;--w:'+f1(R(-120,120))+'px'),
`§S{background:linear-gradient(#ffd9e6,#fff3f7 60%,#ffe9f1)}
§S::before{content:'';position:absolute;inset:0;background:radial-gradient(40% 28% at 0% 0%,rgba(255,150,185,.55),transparent 70%),radial-gradient(34% 24% at 100% 0%,rgba(255,170,200,.45),transparent 70%)}
§S i{top:-6%;left:var(--x);width:var(--z);height:calc(var(--z)*.7);background:linear-gradient(135deg,#ff9dbd,#ff5c93);box-shadow:0 1px 4px rgba(255,92,147,.5);border-radius:100% 0 100% 0;animation:sc-petal var(--t) linear var(--d) infinite}
@keyframes sc-petal{from{transform:translate3d(0,0,0) rotate(0)}to{transform:translate3d(var(--w,0px),115vh,0) rotate(600deg)}}`],

['kod','Kod Yağmuru',1,'#000000','2,14,6',.7,'#d8ffe3','#5fb87a','#22ff66','#001a07',['rgba(34,255,102,.35)','rgba(0,120,50,.4)','rgba(34,255,102,.2)'],
 ['https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap',"'Share Tech Mono'"],100000,
 ()=>ps(26,i=>'left:'+f1(i*3.9+R(0,2))+'%;--t:'+f1(R(5,12))+'s;--d:-'+f1(R(0,12))+'s').replace(/><\/i>/g,()=>'>'+Array.from({length:26},()=>'01アイウエカキクケコサシスセソタチ'.charAt(Math.floor(Math.random()*18))).join('\n')+'</i>'),
`§S{background:#000}
§S i{top:0;left:var(--x);white-space:pre;font:14px/1.15 'Share Tech Mono',monospace;background:linear-gradient(transparent,#22ff66 70%,#d8ffe3);-webkit-background-clip:text;background-clip:text;color:transparent;opacity:.45;animation:sc-code var(--t) linear var(--d) infinite}
§T :is(.cd,.pl,.sc,.bi,.lvl,#def,.cfb,.mstat,.feat,.tt){border:1px solid rgba(34,255,102,.3);box-shadow:0 0 16px -8px rgba(34,255,102,.8)}
@keyframes sc-code{from{transform:translateY(-100%)}to{transform:translateY(calc(100vh + 100%))}}`],

['ejder','Ejderha Ateşi',1,'#0a0302','40,12,8',.68,'#fff0e6','#c9988a','#fb923c','#2a0e04',['rgba(239,68,68,.5)','rgba(251,146,60,.45)','rgba(234,179,8,.3)'],
 null,110000,
 ()=>ps(7,i=>'left:'+(i*15-4)+'%;--z:'+f1(R(70,150))+'px;--d:-'+f1(R(0,3))+'s','u').replace(/<u /g,'<u class="fl" ')+ps(30,()=>'left:'+f1(R(0,100))+'%;--z:'+f1(R(2,5))+'px;--t:'+f1(R(4,10))+'s;--d:-'+f1(R(0,10))+'s;--w:'+f1(R(-50,50))+'px'),
`§S{background:linear-gradient(#0a0302,#1d0705 60%,#3a0e06)}
§S::before{content:'';position:absolute;inset:0;background:radial-gradient(70% 40% at 50% 110%,rgba(255,120,30,.55),transparent 70%);animation:sc-fl 3s ease-in-out infinite}
§S .fl{bottom:-6%;width:var(--z);height:30%;background:radial-gradient(50% 60% at 50% 70%,rgba(255,170,40,.85),rgba(255,70,10,.5) 50%,transparent 75%);filter:blur(8px);transform-origin:50% 100%;animation:sc-flame 1.6s ease-in-out var(--d) infinite alternate}
§S i{top:100%;width:var(--z);height:var(--z);border-radius:50%;background:#ffb347;box-shadow:0 0 8px 2px rgba(255,140,40,.85);animation:sc-rise var(--t) ease-out var(--d) infinite}
@keyframes sc-flame{from{transform:scaleY(.8) translateX(-8px)}to{transform:scaleY(1.35) translateX(8px)}}`]
];
// Parçacıklar --x ile konumlanır; sahne üretiminde "left" değerini --x'e eşle
const fixX=h=>h.replace(/style="([^"]*?)left:([\d.]+%)/g,'style="$1--x:$2;left:$2');
let SBASE='',SALL='';
SD.forEach(d=>{
  const k=d[0],fnt=d[11],ui=d[11]&&d[11][1]?"font-family:"+d[11][1]+",'Manrope',sans-serif":'';
  const panelAlpha=d[5],dk=d[2];
  SCN[k]={html:d[13],font:fnt&&fnt[0]};
  TM[k]=[d[1],dk,d[3],d[4],d[6],d[7],d[8],d[9],d[10][0],d[10][1],d[10][2],0,1];
  if(typeof PREMT!=='undefined')PREMT.push(k);
  const T=':root[data-theme="'+k+'"]',S='#sahne[data-s="'+k+'"]';
  SALL+=T+'{--bg:'+d[3]+';--panel:rgba('+d[4]+','+panelAlpha+');--fg:'+d[6]+';--dim:'+d[7]+';--line:'+(dk?'rgba(255,255,255,.1)':'rgba(20,30,60,.12)')+';--key:'+(dk?'rgba(255,255,255,.08)':'rgba(20,30,60,.08)')+';--ac:'+d[8]+';--acf:'+d[9]+';--m1:'+d[10][0]+';--m2:'+d[10][1]+';--m3:'+d[10][2]+';--sh:'+(dk?'0 10px 30px rgba(0,0,0,.4)':'0 10px 30px rgba(16,24,40,.12)')+';color-scheme:'+(dk?'dark':'light')+'}\n'
    +T+' body::before{display:none}\n'
    +(ui?T+' :is(body,button,input){'+ui+'}\n':'')
    +d[14].replace(/§S/g,S).replace(/§T/g,T)+'\n';
});
Object.assign(EN,{'Yağmurlu Gece':'Rainy Night','Kış Masalı':'Winter Tale','Derin Deniz':'Deep Sea','Büyülü Orman':'Enchanted Forest','Sakura Yağmuru':'Sakura Rain','Kod Yağmuru':'Code Rain','Ejderha Ateşi':"Dragon's Fire",'Galaksi':'Galaxy','🎬 Canlı sahneli temalar':'🎬 Live-scene themes'});
document.head.insertAdjacentHTML('beforeend',`<style id="sahne-css">
#sahne{position:fixed;inset:0;z-index:-1;pointer-events:none;overflow:hidden;display:none}
:root[data-scene] #sahne{display:block}
#sahne i,#sahne u{position:absolute;display:block;pointer-events:none;font-style:normal;text-decoration:none}
#sahne i{left:var(--x)}
@keyframes sc-fall{from{transform:translate3d(0,0,0)}to{transform:translate3d(var(--w,0px),115vh,0)}}
@keyframes sc-rise{from{transform:translate3d(0,0,0);opacity:0}12%{opacity:1}85%{opacity:1}to{transform:translate3d(var(--w,0px),-115vh,0);opacity:0}}
@keyframes sc-tw{0%,100%{opacity:.12}50%{opacity:1}}
@keyframes sc-pan{from{transform:translateX(-40vw)}to{transform:translateX(140vw)}}
@keyframes sc-grid{to{background-position:0 56px}}
@keyframes sc-spin{to{transform:rotate(360deg)}}
@keyframes sc-fl{0%,100%{opacity:.55}50%{opacity:1}}
@keyframes sc-drift{from{transform:translateX(-8%)}to{transform:translateX(8%)}}
:root[data-perf=low] #sahne i,:root[data-perf=low] #sahne u,:root[data-perf=low] #sahne::before,:root[data-perf=low] #sahne::after{animation:none!important}
:root[data-perf=low] #sahne i{display:none}
@media (prefers-reduced-motion:reduce){#sahne,#sahne *,#sahne::before,#sahne::after{animation:none!important}}
${SALL}</style>`);
let SHN=null;
function sahneKur(t){
  const d=SCN[t],r=document.documentElement;
  if(!SHN){SHN=document.createElement('div');SHN.id='sahne';SHN.setAttribute('aria-hidden','true');document.body.appendChild(SHN)}
  if(!d){delete r.dataset.scene;SHN.dataset.s='';SHN.innerHTML='';return}
  sfont(d.font);
  r.dataset.scene='1';SHN.dataset.s=t;
  SHN.innerHTML=fixX(d.html());
}
const _st3=setTheme;setTheme=function(t){_st3(t);sahneKur(t)};
try{sahneKur(localStorage.getItem('ka_theme'))}catch(e){}
// Yeni çerçeveler (Pazar): anahtar, ad, halka, koşul, parçacık, hareket, süs, kademe, renkler
[['ates','Alev','solid','•','rise','🔥',4,['#ef4444','#f97316','#fbbf24','#fff7ed']],
 ['simsek','Şimşek','twin','✦','out','⚡',4,['#facc15','#fde047','#3b82f6','#ffffff']],
 ['galaksi','Galaksi','solid','✧','out','🪐',4,['#6366f1','#a855f7','#ec4899','#22d3ee']],
 ['cyberc','Cyber','twin','▮','fall','',3,['#fcee0a','#22d3ee','#ec4899','#ffffff']],
 ['piksel','Piksel','band','■','fall','',3,['#4ade80','#78350f','#166534','#bef264']],
 ['kurt','Kurt','solid','✧','rise','🐺',4,['#cbd5e1','#d4a53c','#334155','#f8fafc']]]
.forEach(x=>{FRM[x[0]]=[x[1],x[7],x[2],{shop:1},0,x[3],x[4],x[5],x[6]];UNL.push({id:'frame:'+x[0],t:'frame',n:x[1],req:{shop:1}})});
Object.assign(EN,{'Alev':'Flame','Şimşek':'Lightning','Piksel':'Pixel','Kurt':'Wolf'});
