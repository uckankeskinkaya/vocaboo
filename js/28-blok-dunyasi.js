// v15: Minecraft teması için blok dünyası. Dokular kodla üretilir (dışarıdan görsel yok), dünya canvas'ta çizilir.
// Gece-gündüz döngüsü, kayan bulutlar, meşale ışıkları; tema değişince döngü durur.
(function(){
const B=32,CYC=180;
const rng=s=>()=>{s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const cv=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c};
const PAL={dirt:['#866043','#79553a','#96704f','#6c4c33','#8b6446','#7d5a3e'],stone:['#7f7f7f','#747474','#8a8a8a','#6b6b6b','#7a7a7a','#838383'],
  grass:['#5f9f35','#56922f','#6aab3d','#4f8a2a','#629f3a','#5a9933'],leaf:['#3e7a26','#356b20','#478a2e','#2f611c','#3b7424'],log:['#6b5233','#5b4529','#76603d','#4d3a22'],
  plank:['#a7834f','#9c7a48','#b08b55','#8f6f40'],sand:['#dbcf9b','#d4c690','#e2d6a5','#cdbf88']};
function tex(kind,seed){
  const r=rng(seed),c=cv(16,16),x=c.getContext('2d'),pick=a=>a[Math.floor(r()*a.length)];
  const px=(i,j,col)=>{x.fillStyle=col;x.fillRect(i,j,1,1)};
  for(let j=0;j<16;j++)for(let i=0;i<16;i++){
    if(kind==='leaf'&&r()<.18)continue;
    const base=kind==='top'?PAL.grass:kind==='leaf'?PAL.leaf:kind==='plank'?PAL.plank:kind==='sand'?PAL.sand:kind==='stone'||kind==='coal'?PAL.stone:PAL.dirt;
    let col=pick(base);
    if(kind==='log')col=PAL.log[i%4===0?3:i%4===2?1:(r()<.5?0:2)];
    if(kind==='plank')col=(j%4===3)?'#7a5d33':(j%8<4&&i===5)||(j%8>=4&&i===12)?'#7a5d33':pick(PAL.plank);
    px(i,j,col);
  }
  if(kind==='stone'||kind==='coal')for(let k=0;k<6;k++){x.fillStyle='rgba(0,0,0,.14)';x.fillRect(Math.floor(r()*14),Math.floor(r()*15),2+Math.floor(r()*3),1)}
  if(kind==='coal')for(let k=0;k<4;k++){const a=1+Math.floor(r()*12),b=1+Math.floor(r()*12);x.fillStyle='#232323';x.fillRect(a,b,2,2);x.fillStyle='#3c3c3c';x.fillRect(a+1,b+1,2,1)}
  if(kind==='side')for(let i=0;i<16;i++){const d=3+Math.floor(r()*2)+(r()<.3?2:0);for(let j=0;j<d;j++)px(i,j,pick(PAL.grass))}
  return c;
}
const T={};['top','side','dirt','stone','coal','leaf','log','plank','sand'].forEach((k,i)=>T[k]=tex(k,101+i*17));
// Arayüz için dokular (düğme taşı, toprak, çimen kenarı)
const big=(t,n)=>{const c=cv(16*n,16*n),x=c.getContext('2d');x.imageSmoothingEnabled=false;x.drawImage(t,0,0,16*n,16*n);return 'url('+c.toDataURL()+')'};
const RS=document.documentElement.style;
RS.setProperty('--mc-stone',big(T.stone,2));RS.setProperty('--mc-dirt',big(T.dirt,2));RS.setProperty('--mc-side',big(T.side,2));RS.setProperty('--mc-plank',big(T.plank,2));
function world(w,h){
  const r=rng(4242),c=cv(w,h),x=c.getContext('2d');x.imageSmoothingEnabled=false;
  const blk=(t,i,j,s)=>x.drawImage(T[t],i*s,j*s,s,s);
  // Uzak tepeler (yarım boy bloklar + pus)
  const fb=B/2,fc=Math.ceil(w/fb)+1;let fy=Math.floor(h*.6/fb);
  for(let i=0;i<fc;i++){if(r()<.45)fy+=r()<.5?-1:1;fy=Math.max(Math.floor(h*.5/fb),Math.min(Math.floor(h*.7/fb),fy));
    blk('side',i,fy,fb);for(let j=fy+1;j*fb<h;j++)blk(j<fy+3?'dirt':'stone',i,j,fb);
    if(r()<.12){for(let k=1;k<=3;k++)blk('log',i,fy-k,fb);for(let a=-1;a<=1;a++)for(let b=4;b<=5;b++)blk('leaf',i+a,fy-b,fb)}}
  x.fillStyle='rgba(160,195,245,.5)';x.fillRect(0,0,w,h);
  // Yakın arazi
  const cols=Math.ceil(w/B)+1,g=Math.floor(h*.8/B),hs=[],lights=[];let y=g;
  for(let i=0;i<cols;i++){if(r()<.35)y+=r()<.5?-1:1;y=Math.max(g-2,Math.min(g+1,y));hs.push(y)}
  for(let i=0;i<cols;i++){const t=hs[i];blk('side',i,t,B);for(let j=t+1;j*B<h;j++)blk(j<=t+3?'dirt':(r()<.07?'coal':'stone'),i,j,B)}
  // Ağaçlar
  const trees=[];for(let i=1;i<cols-1;i++)if(r()<.16&&!trees.some(k=>Math.abs(k-i)<4))trees.push(i);
  trees.forEach(i=>{const t=hs[i],th=4+Math.floor(r()*2);
    for(let a=-2;a<=2;a++)for(let b=th-2;b<=th-1;b++)if(!((a===-2||a===2)&&b===th-1&&r()<.6))blk('leaf',i+a,t-b,B);
    for(let a=-1;a<=1;a++)for(let b=th;b<=th+1;b++)if(!(a!==0&&b===th+1&&r()<.5))blk('leaf',i+a,t-b,B);
    for(let k=1;k<=th-1;k++)blk('log',i,t-k,B)});
  // Çiçek, ot ve meşaleler
  for(let i=0;i<cols;i++){if(trees.includes(i))continue;const t=hs[i],X=i*B,Y=t*B;const q=r();
    if(q<.12){x.fillStyle='#2f7d1f';x.fillRect(X+14,Y-12,4,12);x.fillStyle=r()<.5?'#d62d2d':'#f2d43a';x.fillRect(X+10,Y-20,12,8);x.fillStyle='#3b2a12';x.fillRect(X+14,Y-18,4,4)}
    else if(q<.3){x.fillStyle='#4f9a2c';for(let k=0;k<5;k++){const hh=6+Math.floor(r()*12);x.fillRect(X+4+k*5,Y-hh,3,hh)}}
    else if(q<.38&&lights.length<3){x.fillStyle='#6b5233';x.fillRect(X+14,Y-20,4,20);x.fillStyle='#ffd34d';x.fillRect(X+13,Y-26,6,6);x.fillStyle='#fff3b0';x.fillRect(X+15,Y-24,2,2);lights.push([X+16,Y-22])}}
  return {c,lights};
}
const hx=s=>typeof s==='string'?[1,3,5].map(i=>parseInt(s.slice(i,i+2),16)):s;
const mx=(a,b,t)=>{a=hx(a);b=hx(b);return a.map((v,i)=>Math.round(v+(b[i]-v)*t))};
const mix=(a,b,t)=>'rgb('+mx(a,b,t).join(',')+')';
function start(host){
  const can=host.querySelector('canvas.mc');if(!can)return null;
  const ctx=can.getContext('2d'),dpr=Math.min(2,window.devicePixelRatio||1);
  let W=0,H=0,wd=null,stars=[],clouds=[],raf=0,last=0,stop=false;
  const t0=performance.now()-CYC*1000*.12;
  function size(){
    W=innerWidth;H=innerHeight;can.width=Math.round(W*dpr);can.height=Math.round(H*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);ctx.imageSmoothingEnabled=false;
    wd=world(W,H);const r=rng(99);stars=Array.from({length:70},()=>[r()*W,r()*H*.6,r()<.2?3:2]);
    clouds=Array.from({length:5},(_,k)=>{const cw=6+Math.floor(r()*8),ch=2+Math.floor(r()*2),m=[];for(let a=0;a<cw;a++)for(let b=0;b<ch;b++)if(!((a===0||a===cw-1)&&r()<.5))m.push([a,b]);return {x:r()*W*1.6,y:H*(.04+k*.05)+r()*20,m,s:5+r()*6}});
  }
  function draw(now){
    const ph=((now-t0)/1000/CYC)%1,e=Math.sin(ph*2*Math.PI),day=Math.max(0,Math.min(1,e*2.6+.35)),tw=Math.max(0,1-Math.abs(e)*4);
    const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,mix('#070b22','#5f95ea',day));g.addColorStop(.75,mix(mx('#151c45','#a9cdff',day),'#f39a5b',tw*.55));
    ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    if(day<1){ctx.fillStyle='rgba(255,255,255,'+(1-day).toFixed(2)+')';stars.forEach(s=>ctx.fillRect(s[0]|0,s[1]|0,s[2],s[2]))}
    const hz=H*.62,arc=(p)=>[W*(.06+.88*p),hz-Math.sin(p*Math.PI)*(hz-H*.07)];
    if(ph<.5){const [sx,sy]=arc(ph/.5);ctx.fillStyle='rgba(255,236,140,.25)';ctx.fillRect(sx-40,sy-40,80,80);ctx.fillStyle='#ffe866';ctx.fillRect(sx-28,sy-28,56,56);ctx.fillStyle='#fffbd8';ctx.fillRect(sx-18,sy-18,36,36)}
    else{const [mx,my]=arc((ph-.5)/.5);ctx.fillStyle='rgba(220,230,255,.15)';ctx.fillRect(mx-36,my-36,72,72);ctx.fillStyle='#e9ecf5';ctx.fillRect(mx-24,my-24,48,48);ctx.fillStyle='#b8bdcc';ctx.fillRect(mx-16,my-14,10,10);ctx.fillRect(mx+4,my+2,8,8);ctx.fillRect(mx-8,my+10,6,6)}
    ctx.fillStyle='rgba(255,255,255,'+(.55+.35*day).toFixed(2)+')';
    clouds.forEach(c=>{const cs=14,cx=((c.x+now/1000*c.s)%(W+cs*16))-cs*16;c.m.forEach(p=>ctx.fillRect(Math.round(cx+p[0]*cs),Math.round(c.y+p[1]*cs*.6),cs,Math.ceil(cs*.6)))});
    ctx.drawImage(wd.c,0,0,W,H);
    if(tw>0){ctx.fillStyle='rgba(255,130,60,'+(.12*tw).toFixed(3)+')';ctx.fillRect(0,0,W,H)}
    if(day<1){ctx.fillStyle='rgba(6,10,38,'+(.6*(1-day)).toFixed(3)+')';ctx.fillRect(0,0,W,H);
      ctx.globalCompositeOperation='lighter';wd.lights.forEach(l=>{const f=1-day,rg=ctx.createRadialGradient(l[0],l[1],2,l[0],l[1],90);rg.addColorStop(0,'rgba(255,190,90,'+(.55*f).toFixed(2)+')');rg.addColorStop(1,'rgba(255,190,90,0)');ctx.fillStyle=rg;ctx.fillRect(l[0]-90,l[1]-90,180,180)});ctx.globalCompositeOperation='source-over'}
  }
  const still=()=>document.documentElement.dataset.perf==='low'||(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);
  function loop(now){if(stop)return;if(now-last>66){last=now;draw(now)}raf=requestAnimationFrame(loop)}
  let rt=0;const onR=()=>{clearTimeout(rt);rt=setTimeout(()=>{size();draw(performance.now())},150)};
  size();draw(t0+CYC*1000*.12);
  if(!still())raf=requestAnimationFrame(loop);
  addEventListener('resize',onR);
  return ()=>{stop=true;cancelAnimationFrame(raf);removeEventListener('resize',onR)};
}
if(SCN.minecraft){SCN.minecraft.after=start;
  // Tema zaten seçiliyse dünyayı şimdi başlat
  if(document.documentElement.dataset.theme==='minecraft'&&SHN&&!SHN._stop)SHN._stop=start(SHN);}
const T2=':root[data-theme="minecraft"]';
document.head.insertAdjacentHTML('beforeend','<style>'+[
T2+' :is(.cd,.lvl,.seg button,.cfb button,#res button){background:linear-gradient(rgba(255,255,255,.06),rgba(0,0,0,.12)),var(--mc-stone) 0 0/32px 32px;image-rendering:pixelated}',
T2+' :is(.cd,.lvl,.seg button,.cfb button,#res button):hover{background:linear-gradient(rgba(120,135,255,.35),rgba(120,135,255,.35)),var(--mc-stone) 0 0/32px 32px;box-shadow:inset 2px 2px 0 #d6dbff,inset -2px -3px 0 #4f5585}',
T2+' :is(.seg button.on,#res button.m,.cfb button.m){background:linear-gradient(rgba(70,160,40,.55),rgba(70,160,40,.55)),var(--mc-stone) 0 0/32px 32px}',
T2+' :is(.pl,.sc,.bi,#def,.mstat){background:linear-gradient(rgba(0,0,0,.62),rgba(0,0,0,.62)),var(--mc-dirt) 0 0/32px 32px;image-rendering:pixelated}',
T2+' .feat{background:linear-gradient(rgba(0,0,0,0) 0 32px,rgba(0,0,0,.28) 32px),var(--mc-side) 0 0/32px 32px repeat-x,var(--mc-dirt) 0 0/32px 32px!important;image-rendering:pixelated}',
T2+' .feat .go{background:var(--mc-stone) 0 0/32px 32px}',
T2+' #nav{background:linear-gradient(rgba(0,0,0,.6),rgba(0,0,0,.6)),var(--mc-dirt) 0 0/32px 32px;image-rendering:pixelated}',
T2+' .cd .ic{border-radius:0;background:linear-gradient(rgba(0,0,0,.25),rgba(0,0,0,.25)),var(--mc-plank) 0 0/32px 32px;box-shadow:inset 0 0 0 2px rgba(0,0,0,.35)}'
].join('\n')+'</style>');
})();
