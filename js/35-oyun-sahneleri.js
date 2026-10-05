// v23: Sahneli temalarda oyun ekranına özel arka planlar. Oyun açılınca menü sahnesi gizlenir (canvas döngüleri durur),
// yerine temanın oyun sahnesi gelir; oyundan çıkınca menü sahnesi geri döner. Tamamen kodla çizilir, dışarıdan görsel yok.
(function(){
const HEX='0123456789ABCDEF',hx=n=>Array.from({length:n},()=>HEX[Math.floor(Math.random()*16)]).join('');
const KOD=['for (let i = 0; i < n; i++) {','  if (guess[i] === word[i]) hit++;','}','const room = await join(code);','while (alive) tick();','return score * combo;','function decrypt(k) {','  return k ^ 0x5F;','sys.link("node-7")','await sync(players);','if (lives <= 0) end();','let streak = 0;','word = pick(level);','emit("guess", w);','// access granted','> run vocab.exe','> scanning...','> 3 matches found'];
// Her oyun sahnesi: html üreteci ve CSS (§O = sahne kökü)
const OS={
cyber:{html:()=>{
  let h='<u class="hx"></u>';
  [18,34,52,70,86].forEach((y,i)=>h+='<u class="lh" style="top:'+y+'%"></u><u class="pk" style="top:calc('+y+'% - 1px);--t:'+f1(R(2.5,5))+'s;--d:-'+f1(R(0,5))+'s'+(i%2?';animation-direction:reverse':'')+'"></u>');
  [12,88].forEach(x=>h+='<u class="lv" style="left:'+x+'%"></u><u class="pv" style="left:calc('+x+'% - 1px);--t:'+f1(R(3,6))+'s;--d:-'+f1(R(0,6))+'s"></u>');
  const col=()=>Array.from({length:60},()=>hx(4)+' '+hx(4)).join('\n');
  h+='<i class="dc" style="left:1.5%">'+col()+'\n'+col()+'</i><i class="dc" style="right:1.5%;left:auto">'+col()+'\n'+col()+'</i>';
  h+='<u class="hud"></u><u class="tag">NETRUN v4.2 // LINK OK</u>';
  h+=ps(4,()=>'top:'+f1(R(5,92))+'%;height:'+f1(R(1,5))+'%;--t:'+f1(R(4,9))+'s;--d:-'+f1(R(0,9))+'s','u').replace(/<u /g,'<u class="gb" ');
  return h},
 css:`§O{background:radial-gradient(120% 80% at 50% 40%,#0c1626,#04050a 70%)}
§O .hx{inset:0;background-image:radial-gradient(circle,rgba(0,240,255,.2) 1.2px,transparent 1.7px);background-size:22px 22px;-webkit-mask:radial-gradient(75% 65% at 50% 45%,transparent 25%,#000);mask:radial-gradient(75% 65% at 50% 45%,transparent 25%,#000)}
§O .lh{left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(0,240,255,.35) 20%,rgba(0,240,255,.35) 80%,transparent)}
§O .lv{top:0;bottom:0;width:1px;background:linear-gradient(transparent,rgba(255,42,109,.35) 20%,rgba(255,42,109,.35) 80%,transparent)}
§O .pk{left:0;width:46px;height:3px;background:linear-gradient(90deg,transparent,#fcee0a);box-shadow:0 0 10px #fcee0a;animation:os-px var(--t) linear var(--d) infinite}
§O .pv{top:0;width:3px;height:46px;background:linear-gradient(transparent,#ff2a6d);box-shadow:0 0 10px #ff2a6d;animation:os-py var(--t) linear var(--d) infinite}
§O .dc{top:0;white-space:pre;font:10px/1.35 monospace;color:rgba(0,240,255,.3);animation:os-scroll 40s linear infinite}
§O .hud{inset:12px;background:linear-gradient(#fcee0a,#fcee0a) 0 0/22px 2px no-repeat,linear-gradient(#fcee0a,#fcee0a) 0 0/2px 22px no-repeat,linear-gradient(#fcee0a,#fcee0a) 100% 0/22px 2px no-repeat,linear-gradient(#fcee0a,#fcee0a) 100% 0/2px 22px no-repeat,linear-gradient(#fcee0a,#fcee0a) 0 100%/22px 2px no-repeat,linear-gradient(#fcee0a,#fcee0a) 0 100%/2px 22px no-repeat,linear-gradient(#fcee0a,#fcee0a) 100% 100%/22px 2px no-repeat,linear-gradient(#fcee0a,#fcee0a) 100% 100%/2px 22px no-repeat;opacity:.6}
§O .tag{left:22px;top:136px;font:700 10px monospace;letter-spacing:.15em;color:rgba(252,238,10,.55);animation:sc-fl 2.4s steps(2) infinite}
§O .gb{left:-5%;right:-5%;opacity:0;mix-blend-mode:screen;background:linear-gradient(90deg,transparent,rgba(0,240,255,.4) 20%,rgba(255,0,60,.35) 60%,transparent);animation:sc-gband var(--t) linear var(--d) infinite}
@keyframes os-px{from{transform:translateX(-10vw)}to{transform:translateX(110vw)}}
@keyframes os-py{from{transform:translateY(-10vh)}to{transform:translateY(110vh)}}
@keyframes os-scroll{from{transform:translateY(0)}to{transform:translateY(-50%)}}`},

witcher:{html:()=>{
  const mum=(st,s)=>'<u class="cd" style="'+st+';--k:'+s+'"><u class="fl"></u><u class="gw"></u></u>';
  return '<u class="map"></u>'+mum('left:7%;bottom:9%',1)+mum('right:8%;bottom:14%',.8)+mum('left:12%;top:22%',.6)
   +ps(10,()=>'left:'+f1(R(4,96))+'%;--z:'+f1(R(2,3.5))+'px;--t:'+f1(R(7,14))+'s;--d:-'+f1(R(0,14))+'s;--w:'+f1(R(-30,30))+'px')+'<u class="vg"></u>'},
 css:`§O{background:repeating-linear-gradient(0deg,rgba(255,255,255,.018) 0 2px,transparent 2px 9px),repeating-linear-gradient(90deg,#2b1b11 0 118px,#160d07 118px 121px,#301e13 121px 236px,#140b06 236px 239px),#22150d}
§O .map{left:14%;top:9%;width:72%;height:46%;transform:rotate(-5deg);border-radius:6px;background:radial-gradient(120% 120% at 50% 50%,#d6c29a,#a88c5e 70%,#6e5631);opacity:.2;box-shadow:0 0 40px rgba(0,0,0,.6) inset}
§O .map::before{content:'';position:absolute;left:12%;top:30%;width:70%;height:40%;border:2px dashed rgba(122,20,20,.9);border-radius:50% 40% 60% 30%}
§O .map::after{content:'✕';position:absolute;right:16%;top:24%;font:700 26px serif;color:rgba(122,20,20,.95)}
§O .cd{width:calc(16px*var(--k));height:calc(64px*var(--k));border-radius:4px 4px 2px 2px;background:linear-gradient(90deg,#c9b98f,#f2e6c8 45%,#b9a57a)}
§O .cd .fl{left:50%;top:calc(-26px*var(--k));width:calc(12px*var(--k));height:calc(24px*var(--k));margin-left:calc(-6px*var(--k));border-radius:50% 50% 50% 50%/65% 65% 35% 35%;background:radial-gradient(circle at 50% 70%,#fff8d0,#ffcf5a 40%,#ff8a1a 75%,transparent 80%);transform-origin:50% 100%;animation:os-flick .18s ease-in-out infinite alternate}
§O .cd .gw{left:50%;top:calc(-20px*var(--k));width:calc(300px*var(--k));height:calc(300px*var(--k));margin:calc(-150px*var(--k)) 0 0 calc(-150px*var(--k));border-radius:50%;background:radial-gradient(closest-side,rgba(255,180,80,.28),transparent);animation:sc-fl 2.6s ease-in-out infinite}
§O i{top:100%;width:var(--z);height:var(--z);border-radius:50%;background:#ffcf5a;box-shadow:0 0 8px 2px rgba(255,170,60,.8);animation:sc-rise var(--t) ease-out var(--d) infinite}
§O .vg{inset:0;background:radial-gradient(ellipse at 50% 45%,transparent 35%,rgba(0,0,0,.78))}
@keyframes os-flick{from{transform:scale(1,1) skewX(-3deg)}to{transform:scale(.92,1.08) skewX(3deg)}}`},

minecraft:{html:()=>{
  const O=[['#5fe3e0','#2fb7b2'],['#fcd34d','#d29b12'],['#ef4444','#a11'],['#1f1f1f','#3c3c3c'],['#22c55e','#15803d']];
  let h='';for(let i=0;i<16;i++){const o=O[Math.floor(R(0,5))];h+='<u class="ore" style="left:'+(Math.floor(R(0,9))*48)+'px;top:'+(Math.floor(R(1,17))*48)+'px;--a:'+o[0]+';--b:'+o[1]+'"></u>'}
  [['8%','38%'],['86%','30%'],['44%','12%']].forEach(p=>h+='<u class="tc" style="left:'+p[0]+';top:'+p[1]+'"><u class="fl"></u><u class="gw"></u></u>');
  return h+'<u class="lava"></u><u class="vg"></u>'},
 css:`§O{background:linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)),var(--mc-stone) 0 0/48px 48px;image-rendering:pixelated}
§O .ore{width:48px;height:48px;background:radial-gradient(var(--a) 0 3px,transparent 3.5px) 6px 8px/16px 14px,radial-gradient(var(--b) 0 3px,transparent 3.5px) 13px 2px/18px 16px,var(--mc-stone) 0 0/48px 48px;opacity:.6}
§O .tc{width:6px;height:28px;background:linear-gradient(90deg,#5b4529,#7a5c36)}
§O .tc .fl{left:-2px;top:-8px;width:10px;height:10px;background:#ffd34d;box-shadow:0 0 0 2px #ff9a1a,0 0 14px 4px rgba(255,190,70,.8);animation:sc-fl .5s steps(2) infinite}
§O .tc .gw{left:3px;top:0;width:260px;height:260px;margin:-130px 0 0 -130px;border-radius:50%;background:radial-gradient(closest-side,rgba(255,190,90,.3),transparent);animation:sc-fl 1.8s ease-in-out infinite}
§O .lava{left:0;right:0;bottom:0;height:9%;background:repeating-conic-gradient(#ff7a1a 0 25%,#e0400a 0 50%) 0 0/16px 16px;box-shadow:0 -20px 60px 10px rgba(255,100,20,.45);animation:os-lava 3s linear infinite}
§O .vg{inset:0;background:radial-gradient(ellipse at 50% 45%,transparent 40%,rgba(0,0,0,.7))}
@keyframes os-lava{to{background-position:32px 0}}`},

galaksi:{html:()=>'<u class="core"></u>'+ps(54,()=>'--a:'+f1(R(0,360))+'deg;--z:'+f1(R(14,48))+'px;--t:'+f1(R(1.2,2.6))+'s;--d:-'+f1(R(0,2.6))+'s;--c:'+['#ffffff','#c4b5fd','#67e8f9'][Math.floor(R(0,3))])+'<u class="vg"></u>',
 css:`§O{background:radial-gradient(circle at 50% 42%,#1a0f45,#07041a 55%,#020109)}
§O .core{left:50%;top:42%;width:220px;height:220px;margin:-110px 0 0 -110px;border-radius:50%;background:radial-gradient(closest-side,rgba(167,139,250,.45),rgba(56,189,248,.15) 50%,transparent);animation:sc-fl 2.4s ease-in-out infinite}
§O i{left:50%;top:42%;width:var(--z);height:2px;border-radius:2px;background:linear-gradient(90deg,transparent,var(--c));transform-origin:0 50%;animation:os-warp var(--t) cubic-bezier(.5,0,1,.5) var(--d) infinite}
§O .vg{inset:0;background:radial-gradient(ellipse at 50% 45%,transparent 45%,rgba(0,0,0,.6))}
@keyframes os-warp{from{transform:rotate(var(--a)) translateX(2vmax) scaleX(.2);opacity:0}25%{opacity:1}to{transform:rotate(var(--a)) translateX(80vmax) scaleX(2);opacity:0}}`},

yagmur:{html:()=>{
  const C=['#ffb347','#ff6b6b','#60a5fa','#facc15','#c084fc','#34d399'];
  let h=ps(14,()=>'left:'+f1(R(-5,95))+'%;top:'+f1(R(40,95))+'%;--z:'+f1(R(40,110))+'px;--c:'+C[Math.floor(R(0,6))]+';--t:'+f1(R(3,7))+'s;--d:-'+f1(R(0,7))+'s','u').replace(/<u /g,'<u class="bk" ');
  h+=ps(26,()=>'left:'+f1(R(0,100))+'%;top:'+f1(R(0,95))+'%;--z:'+f1(R(4,11))+'px');
  h+=ps(7,()=>'left:'+f1(R(0,100))+'%;--z:'+f1(R(7,13))+'px;--t:'+f1(R(3,7))+'s;--d:-'+f1(R(0,7))+'s','u').replace(/<u /g,'<u class="sl" ');
  return h+'<u class="fog"></u>'},
 css:`§O{background:linear-gradient(#0a1224,#121d36 60%,#1a2238)}
§O .bk{width:var(--z);height:var(--z);border-radius:50%;background:radial-gradient(closest-side,var(--c),transparent);opacity:.35;filter:blur(4px);animation:sc-fl var(--t) ease-in-out var(--d) infinite}
§O i{width:var(--z);height:calc(var(--z)*1.15);border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:radial-gradient(circle at 35% 30%,rgba(255,255,255,.75),rgba(180,210,255,.18) 45%,rgba(120,160,220,.08));box-shadow:0 1px 2px rgba(0,0,0,.35)}
§O .sl{top:-5%;width:var(--z);height:calc(var(--z)*1.2);border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:radial-gradient(circle at 35% 30%,rgba(255,255,255,.85),rgba(180,210,255,.25) 50%);animation:os-slide var(--t) cubic-bezier(.6,0,.9,.6) var(--d) infinite}
§O .sl::after{content:'';position:absolute;left:30%;bottom:100%;width:40%;height:90px;background:linear-gradient(transparent,rgba(200,225,255,.22))}
§O .fog{inset:0;background:linear-gradient(rgba(255,255,255,.04),rgba(255,255,255,.07))}
@keyframes os-slide{0%,20%{transform:translateY(0)}100%{transform:translateY(112vh)}}`},

kis:{html:()=>{
  let h='';for(let i=0;i<11;i++)h+='<u class="ck" style="left:'+f1(R(0,90))+'%;top:'+f1(R(10,90))+'%;width:'+f1(R(60,180))+'px;transform:rotate('+f1(R(-70,70))+'deg)"></u>';
  return h+ps(18,()=>'left:'+f1(R(0,100))+'%;--z:'+f1(R(3,7))+'px;--t:'+f1(R(9,18))+'s;--d:-'+f1(R(0,18))+'s;--w:'+f1(R(-50,50))+'px')+'<u class="fr"></u><u class="sh"></u>'},
 css:`§O{background:radial-gradient(120% 90% at 50% 40%,#f4fbff,#d6ebfa 55%,#b9daf3)}
§O .ck{height:2px;background:linear-gradient(90deg,transparent,rgba(255,255,255,1),rgba(90,150,210,.8),transparent);box-shadow:0 1px 0 rgba(90,150,210,.5)}
§O .ck::after{content:'';position:absolute;left:55%;top:0;width:40%;height:2px;background:inherit;transform:rotate(35deg);transform-origin:0 0}
§O i{top:-6%;width:var(--z);height:var(--z);border-radius:50%;background:#fff;box-shadow:0 0 4px rgba(150,190,230,.9);animation:sc-fall var(--t) linear var(--d) infinite}
§O .fr{inset:0;background:radial-gradient(40% 30% at 0 0,rgba(255,255,255,.95),transparent 70%),radial-gradient(40% 30% at 100% 0,rgba(255,255,255,.95),transparent 70%),radial-gradient(45% 30% at 0 100%,rgba(255,255,255,.9),transparent 70%),radial-gradient(45% 30% at 100% 100%,rgba(255,255,255,.9),transparent 70%)}
§O .sh{inset:-20%;background:linear-gradient(115deg,transparent 40%,rgba(255,255,255,.55) 50%,transparent 60%);animation:os-shine 7s ease-in-out infinite}
@keyframes sc-blink{50%{opacity:0}}
@keyframes os-shine{0%,60%{transform:translateX(-60%)}100%{transform:translateX(60%)}}`},

okyanus:{html:()=>{
  let h='<u class="cs"></u>';
  for(let i=0;i<12;i++)h+='<u class="sw" style="left:'+f1(i*8.5+R(-2,2))+'%;height:'+f1(R(14,30))+'%;--t:'+f1(R(3,6))+'s;--d:-'+f1(R(0,6))+'s;--c:'+['#15803d','#166534','#0f766e'][i%3]+'"></u>';
  h+=ps(3,()=>'left:'+f1(R(10,80))+'%;--z:'+f1(R(34,58))+'px;--t:'+f1(R(22,34))+'s;--d:-'+f1(R(0,34))+'s','u').replace(/<u /g,'<u class="jf" ');
  return h+ps(10,()=>'left:'+f1(R(0,100))+'%;--z:'+f1(R(4,9))+'px;--t:'+f1(R(8,15))+'s;--d:-'+f1(R(0,15))+'s;--w:'+f1(R(-20,20))+'px')+'<u class="sand"></u>'},
 css:`§O{background:linear-gradient(#065a82,#03314c 55%,#021b2b)}
§O .cs{inset:0;opacity:.22;background:radial-gradient(circle at 30% 30%,transparent 12px,rgba(200,250,255,.6) 13px,transparent 16px) 0 0/70px 60px,radial-gradient(circle at 60% 70%,transparent 18px,rgba(200,250,255,.5) 19px,transparent 22px) 0 0/90px 80px;-webkit-mask:linear-gradient(#000,transparent 70%);mask:linear-gradient(#000,transparent 70%);animation:os-caus 9s linear infinite}
§O .sw{bottom:4%;width:14px;border-radius:50% 50% 0 0;background:linear-gradient(var(--c),#052e16);transform-origin:50% 100%;animation:os-sway var(--t) ease-in-out var(--d) infinite alternate}
§O .jf{bottom:-10%;width:var(--z);height:calc(var(--z)*.75);border-radius:50% 50% 35% 35%/70% 70% 30% 30%;background:radial-gradient(circle at 50% 30%,rgba(255,200,240,.7),rgba(240,120,200,.35));box-shadow:0 0 22px rgba(255,150,220,.55);animation:os-jelly var(--t) linear var(--d) infinite}
§O .jf::after{content:'';position:absolute;left:15%;top:85%;width:70%;height:120%;background:repeating-linear-gradient(90deg,rgba(255,180,230,.45) 0 2px,transparent 2px 7px);-webkit-mask:linear-gradient(#000,transparent);mask:linear-gradient(#000,transparent)}
§O i{top:100%;width:var(--z);height:var(--z);border-radius:50%;border:1px solid rgba(255,255,255,.55);animation:sc-rise var(--t) ease-in var(--d) infinite}
§O .sand{left:0;right:0;bottom:0;height:7%;background:linear-gradient(#a8865a,#6b5233)}
@keyframes os-caus{to{background-position:140px 60px,-90px 80px}}
@keyframes os-sway{from{transform:rotate(-7deg)}to{transform:rotate(7deg)}}
@keyframes os-jelly{0%{transform:translate(0,0)}50%{transform:translate(30px,-60vh)}100%{transform:translate(-10px,-125vh)}}`},

synthwave:{html:()=>{
  let h=ps(28,()=>'left:'+f1(R(0,100))+'%;top:'+f1(R(0,38))+'%;--z:'+f1(R(1,2.4))+'px;--t:'+f1(R(2,5))+'s;--d:-'+f1(R(0,5))+'s');
  for(let i=0;i<14;i++)h+='<u class="bd" style="left:'+f1(i*7.4-2)+'%;width:'+f1(R(5,8))+'%;height:'+f1(R(4,13))+'%"></u>';
  return h+'<u class="road"></u><u class="dash"></u>'},
 css:`§O{background:linear-gradient(#0c0120 0%,#2a0750 38%,#5a1060 44%,#0d0220 44%)}
§O i{width:var(--z);height:var(--z);border-radius:50%;background:#fff;animation:sc-tw var(--t) ease-in-out var(--d) infinite}
§O .bd{bottom:56%;background:#12031f;box-shadow:inset 0 2px 0 #22d3ee,0 0 10px rgba(34,211,238,.4)}
§O::before{content:'';position:absolute;left:-60%;right:-60%;bottom:0;height:56%;background-image:linear-gradient(90deg,rgba(34,211,238,.6) 1px,transparent 1px),linear-gradient(rgba(34,211,238,.6) 1px,transparent 1px);background-size:60px 60px;transform:perspective(220px) rotateX(62deg);transform-origin:50% 100%;animation:sc-grid 1.2s linear infinite;-webkit-mask:linear-gradient(transparent,#000);mask:linear-gradient(transparent,#000)}
§O .road{left:50%;bottom:0;width:120%;height:56%;margin-left:-60%;background:linear-gradient(#1a0530,#08010f);clip-path:polygon(47% 0,53% 0,78% 100%,22% 100%);box-shadow:none}
§O .road::before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent 21.6%,#ff4fd8 21.8%,transparent 22.6%,transparent 77.4%,#ff4fd8 78.2%,transparent 78.4%)}
§O .dash{left:50%;bottom:0;width:6px;height:56%;margin-left:-3px;background:repeating-linear-gradient(#fcee0a 0 26px,transparent 26px 60px);transform:perspective(220px) rotateX(62deg);transform-origin:50% 100%;animation:os-dash .5s linear infinite}
@keyframes os-dash{to{background-position:0 60px}}`},

buyulu:{html:()=>{
  const RU='ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ';let g='';
  for(let i=0;i<24;i++)g+='<u class="rn" style="transform:rotate('+(i*15)+'deg) translateY(-40vmin)">'+RU[i]+'</u>';
  return '<u class="rc"><u class="r1"></u><u class="r2">'+g+'</u><u class="r3"></u></u>'
   +ps(16,()=>'left:'+f1(R(0,100))+'%;--z:'+f1(R(3,6))+'px;--t:'+f1(R(7,13))+'s;--d:-'+f1(R(0,13))+'s;--w:'+f1(R(-40,40))+'px')+'<u class="vg"></u>'},
 css:`§O{background:radial-gradient(90% 70% at 50% 60%,#0d3a29,#04110b 75%)}
§O .rc{left:50%;top:56%;width:0;height:0}
§O .r1,.r3{left:-44vmin;top:-44vmin;width:88vmin;height:88vmin;border-radius:50%;border:2px solid rgba(134,239,172,.45);box-shadow:0 0 24px rgba(134,239,172,.25),inset 0 0 24px rgba(134,239,172,.15)}
§O .r3{left:-34vmin;top:-34vmin;width:68vmin;height:68vmin;border:2px dashed rgba(94,234,212,.45);animation:sc-spin 60s linear infinite reverse}
§O .r2{left:0;top:0;width:0;height:0;animation:sc-spin 90s linear infinite}
§O .rn{left:-.5em;top:-.6em;font:700 3.4vmin serif;color:rgba(190,255,200,.55);text-shadow:0 0 8px rgba(134,239,172,.9);transform-origin:50% 50%}
§O i{top:100%;width:var(--z);height:var(--z);border-radius:50%;background:#d9ff7a;box-shadow:0 0 10px 3px rgba(190,255,90,.75);animation:sc-rise var(--t) ease-in-out var(--d) infinite}
§O .vg{inset:0;background:radial-gradient(ellipse at 50% 50%,transparent 45%,rgba(0,0,0,.6))}`},

petal:{html:()=>{
  let h='<u class="pond"></u>'+ps(3,i=>'left:'+f1(R(25,70))+'%;bottom:'+f1(R(6,22))+'%;--d:-'+(i*1.3).toFixed(1)+'s','u').replace(/<u /g,'<u class="rp" ');
  h+=ps(6,()=>'left:'+f1(R(4,92))+'%;--t:'+f1(R(16,26))+'s;--d:-'+f1(R(0,26))+'s;--w:'+f1(R(-30,30))+'px','u').replace(/<u /g,'<u class="ln" ');
  return h+ps(14,()=>'left:'+f1(R(0,100))+'%;--z:'+f1(R(10,16))+'px;--t:'+f1(R(10,18))+'s;--d:-'+f1(R(0,18))+'s;--w:'+f1(R(-90,90))+'px')},
 css:`§O{background:linear-gradient(#ffe0ec,#fff1f6 45%,#f3ecff)}
§O .pond{left:-10%;right:-10%;bottom:-8%;height:38%;border-radius:50% 50% 0 0;background:radial-gradient(80% 90% at 50% 100%,#c9dcff,#e4ecff 60%,transparent 75%)}
§O .rp{width:90px;height:22px;margin-left:-45px;border:2px solid rgba(160,180,240,.7);border-radius:50%;opacity:0;animation:os-rip 3.9s ease-out var(--d) infinite}
§O .ln{top:100%;width:22px;height:30px;border-radius:9px;background:radial-gradient(circle at 50% 45%,#fff3c4,#ffb46b 55%,#ff7f8f);box-shadow:0 0 18px 6px rgba(255,170,120,.45);animation:os-lantern var(--t) linear var(--d) infinite}
§O .ln::before{content:'';position:absolute;left:3px;right:3px;top:-3px;height:4px;border-radius:2px;background:#8a3b3b}
§O i{top:-6%;width:var(--z);height:calc(var(--z)*.7);background:linear-gradient(135deg,#ff9dbd,#ff5c93);border-radius:100% 0 100% 0;animation:sc-petal var(--t) linear var(--d) infinite}
@keyframes os-rip{0%{transform:scale(.3);opacity:.9}100%{transform:scale(2.4);opacity:0}}
@keyframes os-lantern{0%{transform:translate(0,0);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translate(var(--w),-115vh);opacity:0}}`},

kod:{html:()=>{
  let L=[];for(let i=0;i<60;i++)L.push(KOD[Math.floor(R(0,KOD.length))]);const t=L.join('\n');
  return '<i class="term">'+t+'\n'+t+'</i><u class="cur"></u><u class="scan"></u><u class="vg"></u>'},
 css:`§O{background:#020a04}
§O .term{left:6%;top:0;white-space:pre;font:12px/1.6 'Share Tech Mono',monospace;color:rgba(34,255,102,.3);animation:os-scroll 60s linear infinite}
§O .cur{left:6%;bottom:12%;width:9px;height:16px;background:#22ff66;box-shadow:0 0 10px #22ff66;animation:sc-blink 1s steps(1) infinite}
§O .scan{inset:0;background:repeating-linear-gradient(0deg,rgba(34,255,102,.05) 0 1px,transparent 1px 3px)}
§O .vg{inset:0;background:radial-gradient(ellipse at 50% 50%,transparent 40%,rgba(0,0,0,.85))}`},

ejder:{html:()=>{
  let h='<u class="eye"><u class="pu"></u></u>';
  for(let i=0;i<70;i++){const x=R(-2,100),y=R(0,1);h+='<u class="cn" style="left:'+f1(x)+'%;bottom:'+f1(Math.max(0,(18-Math.abs(x-50)/5)*y))+'%;transform:rotate('+f1(R(-30,30))+'deg)"></u>'}
  return h+ps(10,()=>'left:'+f1(R(5,95))+'%;bottom:'+f1(R(1,16))+'%;--t:'+f1(R(1.5,3.5))+'s;--d:-'+f1(R(0,3.5))+'s','u').replace(/<u /g,'<u class="gl" ').replace(/><\/u>/g,'>✦</u>')
   +ps(8,()=>'left:'+f1(R(0,100))+'%;--z:'+f1(R(2,4))+'px;--t:'+f1(R(6,11))+'s;--d:-'+f1(R(0,11))+'s;--w:'+f1(R(-40,40))+'px')+'<u class="vg"></u>'},
 css:`§O{background:radial-gradient(120% 70% at 50% 100%,#3a1206,#140503 55%,#050101)}
§O .eye{left:50%;top:13%;width:150px;height:62px;margin-left:-75px;border-radius:50%;background:radial-gradient(circle,#ffe27a,#f59e0b 45%,#9a3412 80%);box-shadow:0 0 40px 10px rgba(245,120,20,.4);opacity:.6;animation:os-blink 7s ease-in-out infinite}
§O .pu{left:50%;top:6%;width:12px;height:88%;margin-left:-6px;border-radius:50%;background:#140400;animation:os-look 7s ease-in-out infinite}
§O .cn{width:16px;height:7px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#fff4b0,#fbbf24 50%,#a16207);box-shadow:0 1px 1px rgba(0,0,0,.5)}
§O .gl{font:700 12px sans-serif;color:#fff7c2;text-shadow:0 0 6px #fde047;opacity:0;animation:sc-tw var(--t) ease-in-out var(--d) infinite}
§O i{top:100%;width:var(--z);height:var(--z);border-radius:50%;background:#ffb347;box-shadow:0 0 8px 2px rgba(255,140,40,.85);animation:sc-rise var(--t) ease-out var(--d) infinite}
§O .vg{inset:0;background:radial-gradient(ellipse at 50% 55%,transparent 45%,rgba(0,0,0,.65))}
@keyframes os-blink{0%,44%,50%,100%{transform:scaleY(1)}47%{transform:scaleY(.06)}}
@keyframes os-look{0%,30%{transform:translateX(0)}40%,60%{transform:translateX(-26px)}70%,100%{transform:translateX(18px)}}`}
};
let css=`#oyunsahne{position:fixed;inset:0;z-index:-1;pointer-events:none;overflow:hidden;display:none}
#oyunsahne *,#oyunsahne *::before,#oyunsahne *::after{all:unset}
#oyunsahne i,#oyunsahne u{position:absolute;display:block;pointer-events:none}
#oyunsahne i{left:var(--x)}
:root[data-oyun] #oyunsahne{display:block}
:root[data-oyun] #sahne{display:none}
:root[data-perf=low] #oyunsahne *,:root[data-perf=low] #oyunsahne::before{animation:none!important}
@media (prefers-reduced-motion:reduce){#oyunsahne,#oyunsahne *,#oyunsahne::before,#oyunsahne::after{animation:none!important}}
`;
for(const k in OS)css+=OS[k].css.replace(/§O/g,'#oyunsahne[data-s="'+k+'"]')+'\n';
document.head.insertAdjacentHTML('beforeend','<style id="oyun-sahne-css">'+css+'</style>');
const OSN=document.createElement('div');OSN.id='oyunsahne';OSN.setAttribute('aria-hidden','true');document.body.appendChild(OSN);
let durdu=false;
function guncelle(){
  const r=document.documentElement,t=r.dataset.theme,g=$('game'),acik=g&&!g.hidden&&!!OS[t]&&!!r.dataset.scene;
  if(acik){
    if(OSN.dataset.s!==t){OSN.dataset.s=t;OSN.innerHTML=fixX(OS[t].html())}
    r.dataset.oyun='1';
    if(SHN&&SHN._stop){SHN._stop();SHN._stop=null;durdu=true}
  }else{
    if(r.dataset.oyun){delete r.dataset.oyun}
    if(durdu){durdu=false;if(SCN[t]&&SHN&&!SHN._stop)sahneKur(t)}
  }
}
const g=$('game');if(g)new MutationObserver(guncelle).observe(g,{attributes:true,attributeFilter:['hidden']});
const _st=setTheme;setTheme=function(t){_st(t);OSN.dataset.s='';durdu=false;guncelle()};
window.oyunSahnesi=guncelle;
guncelle();
})();
