// v22: Sahneli temalara özel dokunuş efektleri ve harf blokları.
// Efekt: tuşa/karta/kutuya basılan noktada temaya uygun küçük bir parçacık patlaması (Web Animations API, kendiliğinden temizlenir).
// Blok: her temanın kendi harf kutusu tasarımı (boş, yazılmış, doğru/yeri yanlış/yok). Renk anlamı korunur: yeşil doğru, turuncu/sarı yeri yanlış, kırmızı yok.
(function(){
// ---------- Dokunuş efektleri ----------
// t: parçacık türü (rect, dot, sq, txt, ring, petal), m: hareket (out, up, fall, ripple, glitch), n: adet, c: renkler, s: boyut aralığı, g: yazı karakterleri
const FX={
  cyber:{t:'rect',m:'glitch',n:7,c:['#00f0ff','#ff2a6d','#fcee0a','#3dff8a'],s:[10,30]},
  witcher:{t:'dot',m:'out',n:10,c:['#ffcf5a','#ffb347','#fff0c8'],s:[2,4],ring:'#d9b25a'},
  minecraft:{t:'sq',m:'fall',n:11,c:['#866043','#79553a','#5f9f35','#7f7f7f'],s:[7,12]},
  galaksi:{t:'txt',m:'out',n:9,c:['#ffffff','#c4b5fd','#67e8f9','#f0abfc'],s:[13,22],g:['✦','✧','★','·']},
  yagmur:{t:'ring',m:'ripple',n:3,c:['#a8cdff','#60a5fa'],s:[24,64]},
  kis:{t:'txt',m:'fall',n:9,c:['#ffffff','#e6f4ff','#9fd0f5'],s:[14,22],g:['❄','❅','❆']},
  okyanus:{t:'dot',m:'up',n:9,c:['#ffffff','#a5f3fc'],s:[7,16],hollow:1},
  synthwave:{t:'ring',m:'ripple',n:2,c:['#ff4fd8','#22d3ee'],s:[34,70],extra:{t:'rect',n:4,s:[10,22]}},
  buyulu:{t:'dot',m:'up',n:9,c:['#d9ff7a','#86efac','#5eead4'],s:[3,6],glow:1},
  petal:{t:'petal',m:'fall',n:8,c:['#ffb7cf','#ff8fb3','#ffd1e0'],s:[9,15]},
  kod:{t:'txt',m:'fall',n:10,c:['#22ff66','#7dffa0','#d8ffe3'],s:[14,20],g:['0','1','ア','カ','サ','ン','ネ','夢']},
  ejder:{t:'dot',m:'up',n:10,c:['#ffb347','#ff7a1a','#fbbf24','#fff3b0'],s:[3,6],glow:1}
};
const rnd=(a,b)=>a+Math.random()*(b-a),pick=a=>a[Math.floor(Math.random()*a.length)];
let canli=0;
const sakin=()=>document.documentElement.dataset.perf==='low'||(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);
function parca(x,y,d,t,i,kucuk){
  const e=document.createElement('i'),c=pick(d.c||['#fff']),sz=rnd(d.s[0],d.s[1])*(kucuk?.8:1);
  let st='position:fixed;left:'+x+'px;top:'+y+'px;pointer-events:none;z-index:9999;margin:0;will-change:transform,opacity;font-style:normal;line-height:1;';
  if(t==='rect'){st+='width:'+sz.toFixed(0)+'px;height:'+rnd(2,4).toFixed(0)+'px;background:'+c+';box-shadow:0 0 6px '+c+';'}
  else if(t==='dot'){const h=d.hollow;st+='width:'+sz+'px;height:'+sz+'px;border-radius:50%;'+(h?'border:1px solid '+c+';background:radial-gradient(circle at 30% 30%,rgba(255,255,255,.55),transparent 60%);':'background:'+c+';')+(d.glow?'box-shadow:0 0 8px 2px '+c+';':'')}
  else if(t==='sq'){st+='width:'+sz+'px;height:'+sz+'px;background:'+c+';box-shadow:inset -2px -2px 0 rgba(0,0,0,.3);'}
  else if(t==='txt'){st+='color:'+c+';font-size:'+sz+'px;text-shadow:0 0 6px '+c+';font-family:monospace;'}
  else if(t==='ring'){st+='width:'+sz+'px;height:'+sz+'px;margin:-'+sz/2+'px 0 0 -'+sz/2+'px;border-radius:50%;border:2px solid '+c+';box-shadow:0 0 10px '+c+';'}
  else if(t==='petal'){st+='width:'+sz+'px;height:'+(sz*.7).toFixed(1)+'px;background:linear-gradient(135deg,'+c+',#ff7fa8);border-radius:100% 0 100% 0;'}
  e.className='fxp';e.style.cssText=st;if(t==='txt')e.textContent=pick(d.g);
  return e;
}
function patlat(x,y,kucuk){
  const d=FX[SHN&&SHN.dataset.s];if(!d||sakin()||canli>70)return;
  const n=Math.round(d.n*(kucuk?.6:1));
  const spawn=(t,dd,count)=>{
    for(let i=0;i<count;i++){
      const e=parca(x,y,dd,t,i,kucuk);document.body.appendChild(e);canli++;
      const a=Math.random()*Math.PI*2,r=rnd(24,64)*(kucuk?.75:1),dx=Math.cos(a)*r,dy=Math.sin(a)*r,rot=rnd(-160,160),m=dd.m;let kf,du;
      if(m==='out'){kf=[{transform:'translate(0,0) scale(1) rotate(0)',opacity:1},{transform:'translate('+dx+'px,'+dy+'px) scale(.3) rotate('+rot+'deg)',opacity:0}];du=rnd(420,640)}
      else if(m==='up'){const sw=rnd(-18,18);kf=[{transform:'translate(0,0) scale(.6)',opacity:0},{transform:'translate('+sw/2+'px,-14px) scale(1)',opacity:1,offset:.25},{transform:'translate('+sw+'px,'+(-rnd(40,90))+'px) scale(.8)',opacity:0}];du=rnd(600,950)}
      else if(m==='fall'){const vx=rnd(-34,34);kf=[{transform:'translate(0,0) rotate(0)',opacity:1},{transform:'translate('+vx*.6+'px,'+(-rnd(10,26))+'px) rotate('+rot/2+'deg)',opacity:1,offset:.28},{transform:'translate('+vx+'px,'+rnd(46,90)+'px) rotate('+rot+'deg)',opacity:0}];du=rnd(550,850)}
      else if(m==='ripple'){kf=[{transform:'scale(.2)',opacity:.9},{transform:'scale(1)',opacity:0}];du=520+i*140}
      else if(m==='glitch'){const j=rnd(-26,26),yo=rnd(-18,18);e.style.left=(x+rnd(-16,16))+'px';e.style.top=(y+yo)+'px';kf=[{opacity:0,transform:'translateX(0)'},{opacity:1,transform:'translateX('+j+'px)',offset:.15},{opacity:0,offset:.3},{opacity:1,transform:'translateX('+(-j)+'px)',offset:.5},{opacity:0,offset:.65},{opacity:.9,transform:'translateX('+j/2+'px)',offset:.8},{opacity:0}];du=rnd(260,420)}
      const an=e.animate(kf,{duration:du,easing:m==='fall'?'cubic-bezier(.3,.6,.5,1)':'ease-out',fill:'forwards',delay:m==='ripple'?0:rnd(0,50)});
      an.onfinish=()=>{e.remove();canli--};an.oncancel=()=>{e.remove();canli--};
    }
  };
  spawn(d.t,d,n);
  if(d.ring)spawn('ring',{c:[d.ring],s:[30,48],m:'ripple'},1);
  if(d.extra)spawn(d.extra.t,{c:d.c,s:d.extra.s,m:'glitch'},d.extra.n);
}
document.addEventListener('pointerdown',e=>{
  if(!document.documentElement.dataset.scene)return;
  const h=e.target.closest&&e.target.closest('button:not(:disabled),.cd,.ot,.k,.tile,.tt,.ft');
  if(h)patlat(e.clientX,e.clientY,h.classList.contains('k')||h.classList.contains('tile'));
},{passive:true});
window.temaEfekt=patlat;

// ---------- Harf blokları ----------
const E=(k)=>':root[data-theme="'+k+'"][data-scene] .tile:not(.g):not(.o):not(.r)',S=(k,c)=>':root[data-theme="'+k+'"] .tile.'+c;
const BL={
  cyber:{f:"'Rajdhani',sans-serif",
    e:'background:linear-gradient(135deg,rgba(0,240,255,.12),rgba(5,4,10,.6));border:1.5px solid rgba(0,240,255,.6);border-radius:0 12px 0 12px;box-shadow:inset 0 0 10px rgba(0,240,255,.12)',
    fl:'border-color:#fcee0a;box-shadow:0 0 12px rgba(252,238,10,.55),inset 0 0 8px rgba(252,238,10,.2);color:#fcee0a;text-shadow:0 0 8px rgba(252,238,10,.8)',
    g:'background:linear-gradient(135deg,#00ff9c,#00a86b);color:#00180d;border:1.5px solid #9dffd4;border-radius:0 12px 0 12px;box-shadow:0 0 14px rgba(0,255,156,.65)',
    o:'background:linear-gradient(135deg,#fcee0a,#e09b00);color:#191300;border:1.5px solid #fff59a;border-radius:0 12px 0 12px;box-shadow:0 0 14px rgba(252,238,10,.6)',
    r:'background:linear-gradient(135deg,#ff2a6d,#8f0036);color:#fff;border:1.5px solid #ff8ab0;border-radius:0 12px 0 12px;box-shadow:0 0 14px rgba(255,42,109,.55)'},
  witcher:{f:"'Cinzel',serif",
    e:'background:linear-gradient(#1f2624,#0b0f0e);border:2px solid #6b5a2a;border-radius:4px;box-shadow:inset 0 0 0 2px rgba(0,0,0,.55),inset 0 0 0 3px rgba(201,162,74,.18)',
    fl:'border-color:#e8c674;color:#f6e7bd;box-shadow:inset 0 0 0 2px rgba(0,0,0,.55),0 0 10px rgba(232,198,116,.45)',
    g:'background:linear-gradient(#2f7a42,#123a1d);color:#f6e7bd;border:2px solid #d9b25a;border-radius:4px;box-shadow:inset 0 0 0 2px rgba(0,0,0,.4),inset 0 1px 0 rgba(255,255,255,.2)',
    o:'background:linear-gradient(#c28a2a,#6e4a10);color:#fff3d1;border:2px solid #e8c674;border-radius:4px;box-shadow:inset 0 0 0 2px rgba(0,0,0,.4),inset 0 1px 0 rgba(255,255,255,.25)',
    r:'background:linear-gradient(#7a1c1c,#240808);color:#e9b8b8;border:2px solid #a8322f;border-radius:4px;box-shadow:inset 0 0 0 2px rgba(0,0,0,.5)'},
  minecraft:{f:"'Vocacraft',monospace",
    e:'background:linear-gradient(rgba(0,0,0,.52),rgba(0,0,0,.52)),var(--mc-stone) 0 0/32px 32px;border:2px solid #000;border-radius:0;box-shadow:inset 2px 2px 0 rgba(255,255,255,.16),inset -2px -2px 0 rgba(0,0,0,.4);image-rendering:pixelated',
    fl:'border-color:#fff;color:#fff;text-shadow:2px 2px 0 #3f3f3f',
    g:'background:linear-gradient(rgba(70,175,50,.82),rgba(40,125,30,.82)),var(--mc-stone) 0 0/32px 32px;color:#fff;border:2px solid #000;border-radius:0;box-shadow:inset 2px 2px 0 rgba(255,255,255,.35),inset -2px -2px 0 rgba(0,0,0,.4);text-shadow:2px 2px 0 #1d4a14;image-rendering:pixelated',
    o:'background:linear-gradient(rgba(250,195,40,.85),rgba(210,140,20,.85)),var(--mc-stone) 0 0/32px 32px;color:#fff;border:2px solid #000;border-radius:0;box-shadow:inset 2px 2px 0 rgba(255,255,255,.4),inset -2px -2px 0 rgba(0,0,0,.4);text-shadow:2px 2px 0 #7a4b00;image-rendering:pixelated',
    r:'background:linear-gradient(rgba(190,45,45,.82),rgba(120,20,20,.82)),var(--mc-stone) 0 0/32px 32px;color:#ffd6d6;border:2px solid #000;border-radius:0;box-shadow:inset 2px 2px 0 rgba(255,255,255,.22),inset -2px -2px 0 rgba(0,0,0,.45);text-shadow:2px 2px 0 #4a0d0d;image-rendering:pixelated'},
  galaksi:{
    e:'background:radial-gradient(circle at 35% 30%,rgba(255,255,255,.16),rgba(25,12,60,.55));border:1.5px solid rgba(190,160,255,.5);border-radius:50%',
    fl:'border-color:#fff;box-shadow:0 0 14px rgba(196,181,253,.6)',
    g:'background:radial-gradient(circle at 35% 30%,#9bffb8,#16a34a 58%,#064e2b);color:#fff;border-radius:50%;box-shadow:0 0 14px rgba(34,197,94,.6),inset -3px -4px 8px rgba(0,0,0,.35)',
    o:'background:radial-gradient(circle at 35% 30%,#ffe29a,#f59e0b 58%,#92400e);color:#fff;border-radius:50%;box-shadow:0 0 14px rgba(245,158,11,.6),inset -3px -4px 8px rgba(0,0,0,.35)',
    r:'background:radial-gradient(circle at 35% 30%,#ff9aa8,#dc2626 58%,#7f1d1d);color:#fff;border-radius:50%;box-shadow:0 0 14px rgba(220,38,38,.55),inset -3px -4px 8px rgba(0,0,0,.4)'},
  yagmur:{
    e:'background:linear-gradient(160deg,rgba(255,255,255,.12),rgba(160,200,255,.04));border:1.5px solid rgba(170,205,255,.45);border-radius:16px;box-shadow:inset 0 1px 0 rgba(255,255,255,.4);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)',
    fl:'border-color:#bcd9ff;box-shadow:inset 0 1px 0 rgba(255,255,255,.5),0 0 10px rgba(120,170,255,.5)',
    g:'background:linear-gradient(160deg,rgba(80,220,140,.95),rgba(20,130,80,.95));color:#fff;border:1.5px solid rgba(200,255,225,.6);border-radius:16px;box-shadow:inset 0 2px 0 rgba(255,255,255,.45),0 4px 10px rgba(0,0,0,.35)',
    o:'background:linear-gradient(160deg,rgba(255,200,80,.95),rgba(230,130,20,.95));color:#fff;border:1.5px solid rgba(255,235,190,.6);border-radius:16px;box-shadow:inset 0 2px 0 rgba(255,255,255,.45),0 4px 10px rgba(0,0,0,.35)',
    r:'background:linear-gradient(160deg,rgba(255,110,120,.92),rgba(190,40,60,.92));color:#fff;border:1.5px solid rgba(255,200,205,.55);border-radius:16px;box-shadow:inset 0 2px 0 rgba(255,255,255,.4),0 4px 10px rgba(0,0,0,.35)'},
  kis:{
    e:'background:linear-gradient(145deg,rgba(255,255,255,.92),rgba(200,228,250,.7));border:2px solid #fff;border-radius:14px;box-shadow:0 3px 8px rgba(70,120,180,.28),inset 0 0 0 1px rgba(120,170,220,.35)',
    fl:'border-color:#0369a1;box-shadow:0 3px 8px rgba(70,120,180,.3),0 0 0 2px rgba(3,105,161,.35)',
    g:'background:linear-gradient(145deg,#a6f0c4,#34b36c);color:#073b1f;border:2px solid #fff;border-radius:14px;box-shadow:0 3px 8px rgba(30,120,70,.4),inset 0 2px 0 rgba(255,255,255,.7)',
    o:'background:linear-gradient(145deg,#ffe3a0,#f2a23a);color:#5a3200;border:2px solid #fff;border-radius:14px;box-shadow:0 3px 8px rgba(190,120,20,.4),inset 0 2px 0 rgba(255,255,255,.7)',
    r:'background:linear-gradient(145deg,#ffb4b4,#e25a64);color:#5a0d14;border:2px solid #fff;border-radius:14px;box-shadow:0 3px 8px rgba(190,50,60,.4),inset 0 2px 0 rgba(255,255,255,.7)'},
  okyanus:{
    e:'background:radial-gradient(circle at 30% 25%,rgba(255,255,255,.35),rgba(120,200,230,.08) 62%);border:1.5px solid rgba(255,255,255,.5);border-radius:50%',
    fl:'border-color:#fff;box-shadow:0 0 12px rgba(165,243,252,.6)',
    g:'background:radial-gradient(circle at 30% 25%,rgba(255,255,255,.7),#34d399 45%,#047857);color:#fff;border:1.5px solid rgba(255,255,255,.7);border-radius:50%;box-shadow:0 0 12px rgba(52,211,153,.5)',
    o:'background:radial-gradient(circle at 30% 25%,rgba(255,255,255,.7),#fbbf24 45%,#b45309);color:#fff;border:1.5px solid rgba(255,255,255,.7);border-radius:50%;box-shadow:0 0 12px rgba(251,191,36,.5)',
    r:'background:radial-gradient(circle at 30% 25%,rgba(255,255,255,.6),#fb7185 45%,#9f1239);color:#fff;border:1.5px solid rgba(255,255,255,.65);border-radius:50%;box-shadow:0 0 12px rgba(251,113,133,.5)'},
  synthwave:{f:"'Audiowide',sans-serif",
    e:'background:repeating-linear-gradient(0deg,rgba(255,79,216,0) 0 3px,rgba(255,79,216,.14) 3px 4px),rgba(28,6,56,.55);border:2px solid #ff4fd8;border-radius:6px;box-shadow:0 0 10px rgba(255,79,216,.5),inset 0 0 8px rgba(255,79,216,.2)',
    fl:'border-color:#22d3ee;box-shadow:0 0 12px rgba(34,211,238,.65),inset 0 0 8px rgba(34,211,238,.25);color:#22d3ee',
    g:'background:linear-gradient(#3dffb0,#00996a);color:#052019;border:2px solid #b9ffe4;border-radius:6px;box-shadow:0 0 14px rgba(61,255,176,.6)',
    o:'background:linear-gradient(#ffe45c,#ff8f3d);color:#2a1300;border:2px solid #fff0a8;border-radius:6px;box-shadow:0 0 14px rgba(255,200,80,.6)',
    r:'background:linear-gradient(#ff3d7f,#6e0f5c);color:#fff;border:2px solid #ff9dc0;border-radius:6px;box-shadow:0 0 14px rgba(255,61,127,.6)'},
  buyulu:{
    e:'background:rgba(10,52,36,.55);border:2px solid rgba(134,239,172,.4);border-radius:16px 4px 16px 4px;box-shadow:inset 0 0 10px rgba(134,239,172,.12)',
    fl:'border-color:#86efac;box-shadow:0 0 12px rgba(134,239,172,.55)',
    g:'background:linear-gradient(135deg,#a7f3b8,#16a34a);color:#052113;border:2px solid #d9ffe4;border-radius:16px 4px 16px 4px;box-shadow:0 0 14px rgba(134,239,172,.6)',
    o:'background:linear-gradient(135deg,#fde68a,#f59e0b);color:#3b2300;border:2px solid #fff3c4;border-radius:16px 4px 16px 4px;box-shadow:0 0 14px rgba(253,230,138,.6)',
    r:'background:linear-gradient(135deg,#fda4af,#be123c);color:#fff;border:2px solid #ffd1d8;border-radius:16px 4px 16px 4px;box-shadow:0 0 14px rgba(251,113,133,.5)'},
  petal:{
    e:'background:rgba(255,255,255,.75);border:2px solid #ffb7cf;border-radius:40%;box-shadow:0 2px 6px rgba(255,120,160,.2)',
    fl:'border-color:#e0457b;box-shadow:0 0 0 3px rgba(224,69,123,.2)',
    g:'background:linear-gradient(145deg,#b9f6d6,#34d399);color:#064e3b;border:2px solid #fff;border-radius:40%;box-shadow:0 3px 8px rgba(52,211,153,.4)',
    o:'background:linear-gradient(145deg,#ffeaa3,#fbbf24);color:#6b3a00;border:2px solid #fff;border-radius:40%;box-shadow:0 3px 8px rgba(251,191,36,.45)',
    r:'background:linear-gradient(145deg,#ffc0cb,#fb7185);color:#7a0d2c;border:2px solid #fff;border-radius:40%;box-shadow:0 3px 8px rgba(251,113,133,.4)'},
  kod:{f:"'Share Tech Mono',monospace",
    e:'background:rgba(0,22,8,.75);border:1.5px solid rgba(34,255,102,.42);border-radius:2px;color:#22ff66;text-shadow:0 0 8px rgba(34,255,102,.7)',
    fl:'border-color:#22ff66;box-shadow:0 0 12px rgba(34,255,102,.6),inset 0 0 8px rgba(34,255,102,.2)',
    g:'background:#22ff66;color:#001a07;border:1.5px solid #b7ffcc;border-radius:2px;box-shadow:0 0 16px rgba(34,255,102,.7);text-shadow:none',
    o:'background:#e8ff3a;color:#1a1a00;border:1.5px solid #f6ff9a;border-radius:2px;box-shadow:0 0 16px rgba(232,255,58,.6);text-shadow:none',
    r:'background:rgba(255,42,77,.22);color:#ff7a92;border:1.5px solid #ff2a4d;border-radius:2px;box-shadow:0 0 12px rgba(255,42,77,.45),inset 0 0 8px rgba(255,42,77,.25);text-shadow:0 0 8px rgba(255,42,77,.7)'},
  ejder:{
    e:'background:linear-gradient(#1c0d0a,#0a0403);border:2px solid rgba(251,146,60,.38);border-radius:8px;box-shadow:inset 0 0 14px rgba(251,80,0,.2)',
    fl:'border-color:#fb923c;box-shadow:0 0 14px rgba(251,146,60,.6),inset 0 0 12px rgba(251,80,0,.3)',
    g:'background:linear-gradient(#5ee08a,#14803d);color:#02200c;border:2px solid #b7f7ca;border-radius:8px;box-shadow:0 0 14px rgba(74,222,128,.55),inset 0 1px 0 rgba(255,255,255,.35)',
    o:'background:linear-gradient(#ffd24a,#ea580c);color:#2a0d00;border:2px solid #ffe7a0;border-radius:8px;box-shadow:0 0 16px rgba(251,146,60,.7),inset 0 1px 0 rgba(255,255,255,.4)',
    r:'background:linear-gradient(#7f1d1d,#260808);color:#fca5a5;border:2px solid #b91c1c;border-radius:8px;box-shadow:inset 0 0 10px rgba(0,0,0,.6)'}
};
let css='';
for(const k in BL){const b=BL[k];
  css+=E(k)+'{'+b.e+(b.f?';font-family:'+b.f:'')+'}\n';
  css+=':root[data-theme="'+k+'"] .tile.f:not(.g):not(.o):not(.r){'+b.fl+'}\n';
  css+=':root[data-theme="'+k+'"][data-scene] .tile.cu:not(.g):not(.o):not(.r){border-color:var(--ac);box-shadow:0 0 14px var(--ac)}\n';
  ['g','o','r'].forEach(c=>css+=S(k,c)+'{'+b[c]+(b.f?';font-family:'+b.f:'')+'}\n');
  // sonuç ekranındaki küçük kutular da aynı tasarım, kenarlık inceltilir
  css+=':root[data-theme="'+k+'"] .row.sm .tile{border-width:1px!important;box-shadow:none}\n';
}
document.head.insertAdjacentHTML('beforeend','<style id="ozel-bloklar">'+css+`
:root[data-scene] .tile.f:not(.g):not(.o):not(.r){animation:pop .18s}
</style>`);
})();
