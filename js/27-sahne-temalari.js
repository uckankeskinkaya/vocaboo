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
['cyber','Cyberpunk 2077',1,'#05040a','10,10,20',.78,'#e9f6ff','#86a9bd','#fcee0a','#0a0a00',['rgba(252,238,10,.55)','rgba(0,240,255,.45)','rgba(255,0,60,.5)'],
 ['https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&display=swap',"'Rajdhani'"],150000,
 ()=>{
  let far='',near='',sg='';
  for(let i=0;i<13;i++)far+='<u class="bf" style="left:'+f1(i*8-3)+'%;width:'+f1(R(6,10))+'%;height:'+f1(R(22,46))+'%"></u>';
  for(let i=0;i<9;i++)near+='<u class="bn'+(i%3===1?' an':'')+'" style="left:'+f1(i*11.5-3)+'%;width:'+f1(R(8,13))+'%;height:'+f1(R(16,36))+'%;--c:'+['#00f0ff','#ff003c','#fcee0a'][i%3]+'"></u>';
  [['ネオン','#00f0ff',1],['24/7','#ff003c',0],['夜市','#fcee0a',1],['VOCA','#ff2a6d',0],['電脳','#00f0ff',1]].forEach((s,i)=>sg+='<u class="ns'+(s[2]?' v':'')+'" style="left:'+f1(5+i*19+R(0,5))+'%;bottom:'+f1(R(34,50))+'%;--c:'+s[1]+';--d:-'+f1(R(0,6))+'s">'+s[0]+'</u>');
  return '<u class="city">'+far+near+sg+'</u>'
   +ps(6,i=>'top:'+f1(R(12,42))+'%;--t:'+f1(R(5,12))+'s;--d:-'+f1(R(0,12))+'s;--c:'+(i%2?'#ff003c':'#00f0ff')+(i%2?';animation-direction:reverse':''),'u').replace(/<u /g,'<u class="car" ')
   +rain(22)
   +ps(6,()=>'top:'+f1(R(4,92))+'%;height:'+f1(R(1,7))+'%;--t:'+f1(R(3.5,8))+'s;--d:-'+f1(R(0,8))+'s','u').replace(/<u /g,'<u class="gb" ')
   +'<u class="tr"></u>';
 },
`§S{background:linear-gradient(#05040a 0%,#12061f 40%,#2a0838 66%,#5b0d3a 85%,#ff2a6d 130%)}
§S::before{content:'';position:absolute;left:-50%;right:-50%;bottom:0;height:30%;background-image:linear-gradient(90deg,rgba(0,240,255,.55) 1px,transparent 1px),linear-gradient(rgba(255,0,60,.5) 1px,transparent 1px);background-size:52px 52px;transform:perspective(260px) rotateX(62deg);transform-origin:50% 100%;animation:sc-grid 1.4s linear infinite;-webkit-mask:linear-gradient(transparent,#000);mask:linear-gradient(transparent,#000)}
§S::after{content:'';position:absolute;inset:0;z-index:3;background:linear-gradient(transparent,rgba(0,240,255,.09) 50%,transparent) 0 -160px/100% 160px no-repeat,repeating-linear-gradient(0deg,rgba(255,255,255,.045) 0 1px,transparent 1px 3px);animation:sc-scanbar 5s linear infinite}
§S .city{inset:0;animation:sc-cityg 7s linear infinite}
§S .bf{bottom:30%;background:radial-gradient(circle,rgba(255,42,109,.4) 1px,transparent 1.6px) 0 0/9px 12px,#120a22;opacity:.85}
§S .bn{bottom:24%;background:radial-gradient(circle,rgba(252,238,10,.6) 1px,transparent 1.6px) 0 0/10px 14px,linear-gradient(#0b0716,#05030a);box-shadow:inset 0 2px 0 var(--c),0 0 18px -4px var(--c)}
§S .bn.an::before{content:'';position:absolute;left:30%;bottom:100%;width:2px;height:42px;background:#3a2f4f}
§S .bn.an::after{content:'';position:absolute;left:calc(30% - 2px);bottom:calc(100% + 42px);width:6px;height:6px;border-radius:50%;background:#ff003c;box-shadow:0 0 10px #ff003c;animation:sc-blink 1.4s steps(1) infinite}
§S .ns{font:700 15px/1 'Rajdhani',sans-serif;color:var(--c);padding:5px;border:2px solid var(--c);border-radius:3px;text-shadow:0 0 6px var(--c),0 0 14px var(--c);box-shadow:0 0 14px -2px var(--c),inset 0 0 8px -2px var(--c);background:rgba(5,4,10,.65);letter-spacing:.08em;animation:sc-neon 6s linear var(--d) infinite}
§S .ns.v{writing-mode:vertical-rl;letter-spacing:.18em}
§S .car{left:0;width:20px;height:2px;border-radius:2px;background:linear-gradient(90deg,transparent,var(--c));box-shadow:0 0 8px var(--c);animation:sc-car var(--t) linear var(--d) infinite}
§S i{top:-10%;width:1px;height:70px;background:linear-gradient(transparent,var(--c,#00f0ff));opacity:.5;animation:sc-fall var(--t) linear var(--d) infinite}
§S .gb{left:-5%;right:-5%;z-index:2;opacity:0;mix-blend-mode:screen;background:linear-gradient(90deg,transparent,rgba(0,240,255,.45) 20%,rgba(255,0,60,.4) 60%,transparent);animation:sc-gband var(--t) linear var(--d) infinite}
§S .tr{inset:0;z-index:2;opacity:0;background:repeating-linear-gradient(0deg,rgba(255,0,60,.16) 0 2px,transparent 2px 9px,rgba(0,240,255,.14) 9px 11px,transparent 11px 23px);animation:sc-tear 11s linear infinite}
§T{--line:rgba(0,240,255,.25)}
§T body{font-weight:500}
§T :is(.cd,.pl,.sc,.bi,.lvl,#def,.mstat,.seg button,.cfb button,#res button){border-radius:0!important;border:1px solid rgba(0,240,255,.45);background:linear-gradient(135deg,rgba(0,240,255,.1),transparent 45%),var(--panel);box-shadow:inset 3px 0 0 #fcee0a;clip-path:polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px))}
§T :is(.cd,.lvl,.seg button,.cfb button,#res button):hover{animation:sc-hov .35s linear}
§T :is(#online,#menu) input{border-radius:0!important;border-color:rgba(0,240,255,.45)!important}
§T .feat{color:#0a0a00!important;border:0!important;box-shadow:none!important;background:repeating-linear-gradient(-45deg,transparent 0 10px,rgba(0,0,0,.07) 10px 20px),#fcee0a!important;clip-path:polygon(0 0,calc(100% - 22px) 0,100% 22px,100% 100%,22px 100%,0 calc(100% - 22px))!important}
§T .feat .go{border-radius:0;background:#0a0a00;color:#fcee0a}
§T :is(.seg button.on,#res button.m,.cfb button.m){background:#fcee0a;color:#0a0a00;border-color:#fcee0a}
§T :is(h1,h2,.feat b){text-transform:uppercase;letter-spacing:.08em;animation:sc-glitch 4s infinite}
§T :is(.greet h2,.pf-h h2){color:#fcee0a}
§T #nav{background:rgba(5,4,10,.88);border-top:1px solid rgba(252,238,10,.45)}
§T #nav button,§T .grid{border-radius:0}
§T #nav button.on{color:#fcee0a;background:rgba(252,238,10,.08);text-shadow:0 0 8px rgba(252,238,10,.6)}
@keyframes sc-glitch{0%,90%,100%{text-shadow:none;transform:none}91%{text-shadow:3px 0 #ff003c,-3px 0 #00f0ff;transform:translateX(-2px)}93%{text-shadow:-3px 0 #ff003c,3px 0 #00f0ff;transform:translateX(2px) skewX(-6deg)}95%{text-shadow:2px 0 #ff003c,-2px 0 #00f0ff;transform:none}96%{text-shadow:none}}
@keyframes sc-hov{0%{transform:translateX(-3px);text-shadow:2px 0 #ff003c,-2px 0 #00f0ff}35%{transform:translateX(3px);text-shadow:-2px 0 #ff003c,2px 0 #00f0ff}70%{transform:translateX(-1px)}100%{transform:none;text-shadow:none}}
@keyframes sc-scanbar{to{background-position:0 110vh,0 0}}
@keyframes sc-cityg{0%,86%,100%{transform:none;filter:none}87%{transform:translateX(-7px) skewX(-3deg);filter:drop-shadow(5px 0 rgba(255,0,60,.85)) drop-shadow(-5px 0 rgba(0,240,255,.85))}88%{transform:translateX(9px);filter:drop-shadow(-6px 0 rgba(255,0,60,.85)) drop-shadow(6px 0 rgba(0,240,255,.85)) hue-rotate(70deg)}89%{transform:translate(-4px,3px) skewX(4deg);filter:invert(.15) drop-shadow(4px 0 rgba(255,0,60,.8))}90%{transform:none;filter:none}95%{transform:none;filter:none}95.6%{transform:translateX(4px);filter:drop-shadow(-3px 0 rgba(0,240,255,.8))}96.2%{transform:none;filter:none}}
@keyframes sc-gband{0%,88%{opacity:0;transform:none}89%{opacity:1;transform:translateX(-50px)}90.5%{opacity:.7;transform:translateX(36px) scaleY(.4)}92%{opacity:1;transform:translateX(-14px)}93%{opacity:0;transform:none}100%{opacity:0}}
@keyframes sc-tear{0%,62%,66%,100%{opacity:0;transform:none}62.6%{opacity:1;transform:translateY(-8px)}63.4%{opacity:.6;transform:translateY(12px)}64.2%{opacity:1;transform:none}65%{opacity:0}}
@keyframes sc-neon{0%,18%,22%,60%,63%,100%{opacity:1}19%,21%,61%{opacity:.2}20%,62%{opacity:.85}}
@keyframes sc-blink{50%{opacity:.1}}
@keyframes sc-car{from{transform:translateX(-12vw)}to{transform:translateX(112vw)}}`],

['witcher','Witcher',1,'#04070c','16,20,20',.82,'#ede6d0','#a9ae9a','#d9b25a','#1c1405',['rgba(201,162,74,.45)','rgba(107,23,23,.5)','rgba(160,190,210,.3)'],
 ['https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&display=swap',"'Cinzel'"],150000,
 ()=>{
  const mt=(n,a,b)=>{let h=R(a,b);const p=['0 100%'];for(let i=0;i<=n;i++){h=Math.max(a,Math.min(b,h+R(-16,16)));p.push(f1(i*100/n)+'% '+f1(h)+'%')}p.push('100% 100%');return 'clip-path:polygon('+p.join(',')+')'};
  return ps(34,()=>'left:'+f1(R(0,100))+'%;top:'+f1(R(0,42))+'%;--z:'+f1(R(1,2.2))+'px;--t:'+f1(R(3,7))+'s;--d:-'+f1(R(0,7))+'s').replace(/<i /g,'<i class="st" ')
   +'<u class="m"></u>'
   +ps(3,i=>'top:'+(6+i*7)+'%;--t:'+(80+i*35)+'s;--d:-'+(i*45)+'s','u').replace(/<u /g,'<u class="cl" ')
   +'<u class="mt" style="'+mt(14,8,55)+'"></u><u class="cs"></u><u class="f"></u>'
   +'<u class="mt n" style="'+mt(10,30,75)+'"></u>'
   +ps(18,i=>'left:'+f1(i*6-3)+'%;height:'+f1(R(16,26))+'%;width:'+f1(R(5,8))+'%','u').replace(/<u /g,'<u class="t b" ')
   +'<u class="f g"></u>'
   +ps(11,i=>'left:'+f1(i*10-4)+'%;height:'+f1(R(28,46))+'%;width:'+f1(R(9,14))+'%','u').replace(/<u /g,'<u class="t" ')
   +ps(3,()=>'top:'+f1(R(10,30))+'%;--t:'+f1(R(16,28))+'s;--d:-'+f1(R(0,28))+'s','u').replace(/<u /g,'<u class="rv" ')
   +'<u class="fire"></u>'
   +ps(26,()=>'left:'+f1(R(4,30))+'%;--z:'+f1(R(2,4))+'px;--t:'+f1(R(5,11))+'s;--d:-'+f1(R(0,11))+'s;--w:'+f1(R(-40,120))+'px').replace(/<i /g,'<i class="em" ');
 },
`§S{background:linear-gradient(#04070c 0%,#0b1620 38%,#1a2a30 68%,#22302f)}
§S .st{width:var(--z);height:var(--z);border-radius:50%;background:#dfe8f0;animation:sc-tw var(--t) ease-in-out var(--d) infinite}
§S .m{top:8%;right:10%;width:112px;height:112px;border-radius:50%;background:radial-gradient(circle at 62% 38%,rgba(140,140,120,.35) 0 9px,transparent 10px),radial-gradient(circle at 34% 64%,rgba(140,140,120,.3) 0 13px,transparent 14px),radial-gradient(circle at 72% 70%,rgba(140,140,120,.25) 0 6px,transparent 7px),radial-gradient(circle at 38% 34%,#fffef4,#e4e0c8 55%,#b9b49a);box-shadow:0 0 50px 10px rgba(235,232,200,.28),0 0 160px 70px rgba(160,190,210,.12)}
§S .m::before{content:'';position:absolute;inset:-70%;border-radius:50%;background:radial-gradient(closest-side,rgba(220,230,220,.16),transparent);animation:sc-fl 6s ease-in-out infinite}
§S .cl{left:0;width:320px;height:48px;border-radius:50%;background:radial-gradient(closest-side,rgba(18,30,40,.92),rgba(18,30,40,0));filter:blur(3px);animation:sc-pan var(--t) linear var(--d) infinite}
§S .mt{left:0;right:0;bottom:24%;height:36%;background:linear-gradient(#1f3038,#142229)}
§S .mt.n{bottom:12%;height:30%;background:linear-gradient(#111d22,#0b1418)}
§S .cs{right:3%;bottom:29%;width:200px;height:176px;background:radial-gradient(circle at 40% 30%,#ffb347 0 2px,rgba(255,170,60,.35) 3px,transparent 6px),radial-gradient(circle at 57% 20%,#ffcf6a 0 2px,rgba(255,170,60,.35) 3px,transparent 6px),radial-gradient(circle at 75% 29%,#ffb347 0 1.6px,transparent 2.6px),radial-gradient(circle at 49% 45%,#ffb347 0 1.6px,transparent 2.6px),radial-gradient(circle at 30% 46%,#ffcf6a 0 1.6px,transparent 2.6px),#0a1317;clip-path:polygon(0 100%,10% 78%,15% 66%,15% 26%,19% 26%,19% 22%,22% 22%,22% 26%,26% 26%,26% 33%,36% 33%,36% 14%,38% 14%,40% 4%,42% 14%,44% 14%,44% 28%,53% 28%,53% 9%,55% 9%,57% 0,59% 9%,61% 9%,61% 28%,70% 28%,70% 19%,73% 19%,73% 16%,76% 16%,76% 19%,79% 19%,79% 37%,85% 37%,85% 66%,90% 74%,100% 100%);-webkit-mask:linear-gradient(#000 75%,transparent);mask:linear-gradient(#000 75%,transparent)}
§S .f{left:-30%;width:160%;bottom:22%;height:30%;background:radial-gradient(50% 50% at 50% 50%,rgba(170,195,200,.22),transparent 70%);animation:sc-drift 30s ease-in-out infinite alternate}
§S .f.g{bottom:3%;height:26%;opacity:.8;animation-duration:42s;animation-direction:alternate-reverse}
§S .t{bottom:-2%;background:#020405;clip-path:polygon(50% 0,62% 25%,56% 25%,72% 52%,62% 52%,85% 100%,15% 100%,38% 52%,28% 52%,44% 25%,38% 25%)}
§S .t.b{bottom:10%;background:#081014}
§S .rv{left:0;width:26px;height:11px;animation:sc-pan var(--t) linear var(--d) infinite}
§S .rv::before{content:'';position:absolute;inset:0;background:#030507;clip-path:polygon(0 0,50% 70%,100% 0,100% 30%,50% 100%,0 30%);animation:sc-flap .45s ease-in-out infinite alternate}
§S .fire{left:4%;bottom:-8%;width:32%;height:28%;border-radius:50%;background:radial-gradient(closest-side,rgba(255,140,40,.6),rgba(255,90,20,.2) 60%,transparent);animation:sc-fl 1.6s ease-in-out infinite}
§S .em{top:100%;width:var(--z);height:var(--z);border-radius:50%;background:#ffcf5a;box-shadow:0 0 9px 2px rgba(255,170,60,.85);animation:sc-rise var(--t) ease-out var(--d) infinite}
§T{--wg:#c9a24a;--wo:linear-gradient(var(--wg),var(--wg)) left 5px top 5px/12px 1px no-repeat,linear-gradient(var(--wg),var(--wg)) left 5px top 5px/1px 12px no-repeat,linear-gradient(var(--wg),var(--wg)) right 5px top 5px/12px 1px no-repeat,linear-gradient(var(--wg),var(--wg)) right 5px top 5px/1px 12px no-repeat,linear-gradient(var(--wg),var(--wg)) left 5px bottom 5px/12px 1px no-repeat,linear-gradient(var(--wg),var(--wg)) left 5px bottom 5px/1px 12px no-repeat,linear-gradient(var(--wg),var(--wg)) right 5px bottom 5px/12px 1px no-repeat,linear-gradient(var(--wg),var(--wg)) right 5px bottom 5px/1px 12px no-repeat;--line:rgba(201,162,74,.28)}
§T :is(.cd,.pl,.sc,.bi,.lvl,#def,.mstat,.seg button,.cfb button,#res button){border:1px solid rgba(201,162,74,.5);border-radius:3px;background:var(--wo),linear-gradient(rgba(30,36,35,.88),rgba(13,17,17,.92));box-shadow:inset 0 0 0 3px rgba(0,0,0,.35),0 10px 26px rgba(0,0,0,.55)}
§T :is(.cd,.lvl,.seg button,.cfb button,#res button):hover{border-color:#e8c674;box-shadow:inset 0 0 0 3px rgba(0,0,0,.35),0 0 20px -4px rgba(232,198,116,.6)}
§T :is(#online,#menu) input{border-radius:3px!important;border-color:rgba(201,162,74,.45)!important;background:rgba(8,10,10,.7)!important}
§T .feat{color:#f3e3b3!important;border:1px solid rgba(201,162,74,.65)!important;border-radius:4px!important;background:var(--wo),radial-gradient(120% 90% at 0% 0%,#6e1818,#2a0909 72%)!important;box-shadow:inset 0 0 0 3px rgba(0,0,0,.3),0 12px 30px rgba(0,0,0,.6)!important}
§T .feat .go{border-radius:3px;background:linear-gradient(#d9b25a,#a8822f);color:#1c1405}
§T :is(.seg button.on,#res button.m,.cfb button.m){background:var(--wo),linear-gradient(#d9b25a,#a8822f);color:#1c1405;border-color:#e8c674}
§T :is(h1,h2,.feat b,.pf-n,.lvl,.seg button,.cfb button,#res button){font-family:'Cinzel',serif;letter-spacing:.05em}
§T :is(.greet h2,.pf-h h2){background:linear-gradient(#f6e7bd,#c9a24a);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 2px 6px rgba(0,0,0,.6))}
§T #nav{background:rgba(8,11,12,.92);border-top:1px solid rgba(201,162,74,.45)}
§T #nav button.on{color:#e8c674;background:rgba(201,162,74,.1)}
@keyframes sc-flap{to{transform:scaleY(.25)}}`],

['minecraft','Minecraft',1,'#4f86d9','0,0,0',.55,'#ffffff','#d6d6d6','#5dd33a','#0b1f05',['#4f86d9','#6fb847','#8a5a31'],
 ['https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@500;700&display=swap',"'Pixelify Sans'"],150000,
 ()=>{
  const st=(n,a,b,sd)=>{let h=R(a,b);const p=['0 100%'];for(let i=0;i<n;i++){h=Math.max(a,Math.min(b,h+(Math.random()<.5?-1:1)*sd*Math.ceil(R(0,2))));p.push(f1(i*100/n)+'% '+f1(h)+'%',f1((i+1)*100/n)+'% '+f1(h)+'%')}p.push('100% 100%');return 'clip-path:polygon('+p.join(',')+')'};
  let tr='';[7,31,64,88].forEach(x=>tr+='<u class="tr" style="left:'+f1(x+R(-4,4))+'%;--s:'+R(.8,1.15).toFixed(2)+'"></u>');
  return '<u class="nt"></u><u class="or"><u class="su"></u></u>'
   +ps(4,i=>'top:'+f1(2+i*4+R(0,3))+'%;--cw:'+Math.round(R(110,220))+'px;--t:'+(110+i*35)+'s;--d:-'+(i*47)+'s','u').replace(/<u /g,'<u class="c" ')
   +'<u class="mt" style="'+st(16,5,60,12)+'"></u><u class="hl" style="'+st(12,20,70,10)+'"></u>'
   +tr+'<u class="gr"></u>'
   +ps(10,()=>'left:'+f1(R(0,100))+'%;--z:'+f1(R(5,8))+'px;--t:'+f1(R(10,18))+'s;--d:-'+f1(R(0,18))+'s;--w:'+f1(R(-80,80))+'px')
   +'<u class="dk"></u><u class="or"><u class="mo"></u></u>';
 },
`§S{background:linear-gradient(#4f86d9,#8fbaf0 70%);image-rendering:pixelated}
§S .nt{inset:0;opacity:0;background:radial-gradient(#fff 1px,transparent 1.5px) 0 0/43px 37px,radial-gradient(#fff 1px,transparent 1.5px) 19px 11px/71px 53px,linear-gradient(#070b24,#1a2350 75%);animation:sc-night 120s linear infinite}
§S .or{left:62%;top:84%;width:0;height:0;animation:sc-spin 120s linear infinite}
§S .su{left:-30px;top:-76vh;width:60px;height:60px;background:#fffbd0;box-shadow:inset 0 0 0 9px #ffe866,0 0 46px 16px rgba(255,236,120,.45);animation:sc-spin 120s linear infinite reverse}
§S .mo{left:-26px;top:calc(76vh - 52px);width:52px;height:52px;opacity:0;background:linear-gradient(#b8bdcc,#b8bdcc) 10px 12px/10px 10px no-repeat,linear-gradient(#b8bdcc,#b8bdcc) 30px 28px/8px 8px no-repeat,linear-gradient(#c9cede,#c9cede) 16px 34px/6px 6px no-repeat,#e9ecf5;box-shadow:0 0 30px 8px rgba(220,230,255,.3);animation:sc-spin 120s linear infinite reverse,sc-moon 120s linear infinite}
§S .c{left:0;width:var(--cw);height:22px;background:rgba(255,255,255,.88);animation:sc-pan var(--t) linear var(--d) infinite}
§S .c::before{content:'';position:absolute;left:22%;top:-14px;width:46%;height:14px;background:inherit}
§S .mt{left:0;right:0;bottom:16%;height:30%;background:linear-gradient(#9fb7cf,#7f9bb6)}
§S .hl{left:0;right:0;bottom:12%;height:17%;background:repeating-conic-gradient(rgba(0,0,0,.06) 0 25%,transparent 0 50%) 0 0/12px 12px,linear-gradient(#6fb847 0 10px,#4f8a2b 10px)}
§S .tr{bottom:13%;width:calc(46px*var(--s));height:calc(90px*var(--s));background:linear-gradient(#2f7d1f,#28691a) 50% 14%/100% 48% no-repeat,linear-gradient(90deg,#5a3d22,#6b4a2b 50%,#5a3d22) 50% 100%/22% 44% no-repeat}
§S .tr::before{content:'';position:absolute;left:20%;top:0;width:60%;height:16%;background:#2f7d1f}
§S .tr::after{content:'';position:absolute;left:12%;top:22%;width:28%;height:14%;background:#3d9a2a;box-shadow:calc(22px*var(--s)) calc(12px*var(--s)) 0 #24601a}
§S .gr{left:0;right:0;bottom:0;height:14%;background:linear-gradient(#6fb847 0 10px,transparent 10px),repeating-linear-gradient(90deg,#6fb847 0 8px,transparent 8px 16px,#6fb847 16px 20px,transparent 20px 32px) 0 10px/100% 6px no-repeat,repeating-conic-gradient(rgba(0,0,0,.12) 0 25%,transparent 0 50%) 8px 4px/48px 40px,repeating-conic-gradient(rgba(0,0,0,.1) 0 25%,transparent 0 50%) 0 0/8px 8px,repeating-conic-gradient(rgba(255,255,255,.06) 0 25%,transparent 0 50%) 4px 0/24px 16px,repeating-conic-gradient(rgba(0,0,0,.08) 0 25%,transparent 0 50%) 0 4px/40px 24px,#866043}
§S i{top:-6%;width:var(--z);height:var(--z);background:#3d9a2a;box-shadow:inset -2px -2px 0 #2a6f1b;animation:sc-petal var(--t) linear var(--d) infinite}
§S .dk{inset:0;opacity:0;background:rgba(6,10,40,.55);animation:sc-night 120s linear infinite}
§T{--line:rgba(255,255,255,.18)}
§T #app{text-shadow:2px 2px 0 rgba(30,30,30,.5)}
§T :is(.cd,.lvl,.seg button,.cfb button,#res button){border:2px solid #000!important;border-radius:0!important;color:#fff;background:repeating-conic-gradient(rgba(0,0,0,.05) 0 25%,transparent 0 50%) 0 0/6px 6px,repeating-conic-gradient(rgba(255,255,255,.04) 0 25%,transparent 0 50%) 3px 2px/14px 10px,repeating-conic-gradient(rgba(0,0,0,.05) 0 25%,transparent 0 50%) 5px 7px/22px 18px,#727272;box-shadow:inset 2px 2px 0 #a9a9a9,inset -2px -3px 0 #4b4b4b}
§T :is(.cd,.lvl,.seg button,.cfb button,#res button):hover{background:repeating-conic-gradient(rgba(0,0,0,.05) 0 25%,transparent 0 50%) 0 0/6px 6px,repeating-conic-gradient(rgba(255,255,255,.04) 0 25%,transparent 0 50%) 3px 2px/14px 10px,repeating-conic-gradient(rgba(0,0,0,.05) 0 25%,transparent 0 50%) 5px 7px/22px 18px,#7f86b8;box-shadow:inset 2px 2px 0 #c3c9ff,inset -2px -3px 0 #4f5585}
§T .cd small{color:#e6e6e6}
§T :is(.pl,.sc,.bi,#def,.mstat){border:2px solid #111;border-radius:0!important;background:rgba(0,0,0,.6);box-shadow:inset 0 0 0 2px rgba(255,255,255,.08)}
§T :is(#online,#menu) input{border-radius:0!important;background:#000!important;border:2px solid #a0a0a0!important;color:#fff}
§T :is(.seg button.on,#res button.m,.cfb button.m){background:repeating-conic-gradient(rgba(0,0,0,.05) 0 25%,transparent 0 50%) 0 0/6px 6px,repeating-conic-gradient(rgba(255,255,255,.04) 0 25%,transparent 0 50%) 3px 2px/14px 10px,repeating-conic-gradient(rgba(0,0,0,.05) 0 25%,transparent 0 50%) 5px 7px/22px 18px,#3f8a24;box-shadow:inset 2px 2px 0 #7fd35a,inset -2px -3px 0 #285a16}
§T .feat{border:2px solid #000!important;border-radius:0!important;color:#fff!important;background:linear-gradient(#6fb847 0 12px,#4f8a2b 12px 15px,transparent 15px),repeating-conic-gradient(rgba(0,0,0,.1) 0 25%,transparent 0 50%) 0 0/8px 8px,repeating-conic-gradient(rgba(255,255,255,.06) 0 25%,transparent 0 50%) 4px 0/24px 16px,repeating-conic-gradient(rgba(0,0,0,.08) 0 25%,transparent 0 50%) 0 4px/40px 24px,#866043!important;box-shadow:inset 0 -3px 0 rgba(0,0,0,.25)!important}
§T .feat .go{border-radius:0;border:2px solid #000;background:#727272;color:#fff;box-shadow:inset 2px 2px 0 #a9a9a9,inset -2px -3px 0 #4b4b4b}
§T :is(h1,h2){text-shadow:2px 2px 0 rgba(40,40,40,.7)}
§T #nav{background:rgba(0,0,0,.72);border-top:2px solid #000;box-shadow:inset 0 2px 0 rgba(255,255,255,.12)}
§T #nav button{border-radius:0}
§T #nav button.on{color:#ffff55;background:rgba(255,255,255,.08)}
§T :is(.k,.tile,.grid){border-radius:0!important}
@keyframes sc-night{0%,20%,80%,100%{opacity:0}30%,70%{opacity:1}}
@keyframes sc-moon{0%,31%,69%,100%{opacity:0}37%,63%{opacity:1}}`],

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
#sahne *,#sahne *::before,#sahne *::after{all:unset}
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
