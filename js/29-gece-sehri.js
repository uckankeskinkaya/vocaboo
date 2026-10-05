// v16: Cyberpunk teması: şehrin içinden, sokak seviyesinden perspektifli gece sahnesi (canvas).
// Statik katman (binalar, pencereler, köprü, ıslak yol) bir kez çizilir; neon tabelalar, hologram,
// trafik, uçan araçlar ve buhar her karede üstüne eklenir. Glitch, yağmur ve tarama çizgileri CSS'te.
(function(){
const rng=s=>()=>{s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const cv=(w,h)=>{const c=document.createElement('canvas');c.width=Math.max(1,Math.round(w));c.height=Math.max(1,Math.round(h));return c};
const NEON=['#00f0ff','#ff2a6d','#fcee0a','#ff003c','#b45cff','#3dffb0'];
const SIGNS=['ラーメン','電脳','夜市','ホテル','薬','酒','BAR','24H','ネオン','義体','クラブ','寿司'];
function scene(W,H,dpr){
  const r=rng(2077),R=(a,b)=>a+r()*(b-a),pick=a=>a[Math.floor(r()*a.length)];
  const VX=W*.5,VY=H*.4,SX=Math.max(W,H*.55)*.62,SY=H*.5;
  const P=(X,Y,z)=>[VX+X*SX/z,VY+Y*SY/z];
  const base=cv(W*dpr,H*dpr),x=base.getContext('2d');x.scale(dpr,dpr);
  const quad=(a,b,c,d)=>{x.beginPath();x.moveTo(a[0],a[1]);x.lineTo(b[0],b[1]);x.lineTo(c[0],c[1]);x.lineTo(d[0],d[1]);x.closePath()};
  // Gökyüzü: kirli, neonla aydınlanmış sis
  let g=x.createLinearGradient(0,0,0,VY*1.15);g.addColorStop(0,'#06030d');g.addColorStop(.6,'#2a0a3c');g.addColorStop(1,'#7a1450');
  x.fillStyle=g;x.fillRect(0,0,W,H);
  // Uzak siluet ve dev kule
  for(let i=-14;i<=14;i++){const z=R(16,24),X=i*.55+R(-.2,.2),h=R(2,11),w=R(.3,.6),a=P(X,-h,z),b=P(X+w,1,z);
    x.fillStyle='#160b26';x.fillRect(a[0],a[1],b[0]-a[0],b[1]-a[1]);
    x.fillStyle='rgba(255,90,170,.35)';for(let k=0;k<12;k++)if(r()<.5)x.fillRect(a[0]+R(0,b[0]-a[0]),a[1]+R(0,b[1]-a[1]),1,1)}
  const tz=28,tw=.9,tt=P(.3,-24,tz),tb=P(.3+tw,1,tz);
  x.fillStyle='#120820';x.beginPath();x.moveTo(tt[0]+2,tt[1]);x.lineTo(tb[0]-2,tt[1]);x.lineTo(tb[0],tb[1]);x.lineTo(tt[0],tb[1]);x.closePath();x.fill();
  x.fillStyle='rgba(0,240,255,.5)';for(let y=tt[1]+6;y<tb[1];y+=5)x.fillRect(tt[0]+3,y,tb[0]-tt[0]-6,1);
  x.fillStyle='#120820';x.fillRect((tt[0]+tb[0])/2-1,tt[1]-26,2,26);
  // Neon pus (ufukta)
  g=x.createRadialGradient(VX,VY,4,VX,VY,W*.7);g.addColorStop(0,'rgba(255,60,140,.55)');g.addColorStop(.45,'rgba(140,30,160,.18)');g.addColorStop(1,'rgba(0,0,0,0)');
  x.fillStyle=g;x.fillRect(0,0,W,H);
  // Islak asfalt
  g=x.createLinearGradient(0,VY,0,H);g.addColorStop(0,'#1a0c22');g.addColorStop(1,'#08060c');
  x.fillStyle=g;quad(P(-1,1,.35),P(1,1,.35),P(1,1,60),P(-1,1,60));x.fill();
  x.fillStyle='rgba(252,238,10,.55)';for(let z=1;z<40;z+=1.4)quad(P(-.02,1,z),P(.02,1,z),P(.02,1,z+.6),P(-.02,1,z+.6)),x.fill();
  x.strokeStyle='rgba(255,42,109,.35)';x.lineWidth=1;[-.97,.97].forEach(X=>{const a=P(X,1,.4),b=P(X,1,60);x.beginPath();x.moveTo(a[0],a[1]);x.lineTo(b[0],b[1]);x.stroke()});
  // Binalar (uzaktan yakına), arada köprü
  const bl=[];[-1,1].forEach(s=>{let z=.7;while(z<18){const len=R(1.1,2.6),X=s*(1+R(0,.18));bl.push({s,z0:z,z1:z+len,X,h:R(2.6,8.5),c:pick(['#0d0818','#120a22','#0a0a18','#150b1f']),n:r()<.55?pick(NEON):null});z+=len}});
  bl.sort((a,b)=>b.z0-a.z0);
  const signs=[],refl=[];let bridge=false;
  const drawBridge=()=>{const z=5.2;x.fillStyle='#0b0714';quad(P(-1.2,-3.6,z),P(1.2,-3.6,z),P(1.2,-2.9,z),P(-1.2,-2.9,z));x.fill();
    x.fillStyle='rgba(0,240,255,.8)';for(let X=-1.1;X<1.1;X+=.12){const p=P(X,-2.92,z);x.fillRect(p[0],p[1],2,1)}
    x.fillStyle='rgba(255,42,109,.9)';const a=P(-1.2,-3.6,z),b=P(1.2,-3.6,z);x.fillRect(a[0],a[1],b[0]-a[0],1.5)};
  bl.forEach(b=>{
    if(!bridge&&b.z0<5.2){drawBridge();bridge=true}
    const {X,h,z0,z1}=b;
    x.fillStyle=b.c;quad(P(X,-h,z0),P(X,-h,z1),P(X,1,z1),P(X,1,z0));x.fill();
    // Pencereler
    for(let u=z0+.1;u<z1-.12;u+=.24)for(let v=-h+.3;v<.75;v+=.3){
      const lit=r()<(u<1.6?.2:.34);x.fillStyle=lit?(r()<.78?'rgba(255,200,120,'+R(.3,.7).toFixed(2)+')':pick(['rgba(0,240,255,.45)','rgba(255,42,109,.45)','rgba(180,92,255,.45)'])):'rgba(28,16,46,.85)';
      quad(P(X,v,u),P(X,v,u+.12),P(X,v+.15,u+.12),P(X,v+.15,u));x.fill()}
    // Neon kenarlar
    if(b.n){x.save();x.strokeStyle=b.n;x.shadowColor=b.n;x.shadowBlur=10;x.lineWidth=Math.max(1,3/z0);
      const a=P(X,-h,z0),c=P(X,1,z0),d=P(X,-h,z1);x.beginPath();x.moveTo(c[0],c[1]);x.lineTo(a[0],a[1]);x.lineTo(d[0],d[1]);x.stroke();x.restore()}
    // Tabelalar (duvardan sokağa doğru çıkan dikey neonlar)
    if(z0>.8&&z0<9&&r()<.75){const zs=z0+R(.1,Math.min(.6,z1-z0-.1)),y0=R(-h+.4,-.4),len=R(1,2.2),col=pick(NEON),t=pick(SIGNS);
      const a=P(b.s*1,y0,zs),c=P(b.s*.6,y0+len,zs);signs.push({x:Math.min(a[0],c[0]),y:a[1],w:Math.abs(c[0]-a[0]),h:c[1]-a[1],col,t,ph:r()*10,sp:R(.6,1.4)});
      refl.push([(a[0]+c[0])/2,P(0,1,zs)[1],Math.abs(c[0]-a[0]),col])}
  });
  if(!bridge)drawBridge();
  // Islak yolda yansımalar
  x.globalCompositeOperation='lighter';
  refl.forEach(f=>{const w=Math.max(2,f[2]*.7),len=H-f[1];for(let y=0;y<len;y+=3){const a=.32*(1-y/len)*(.5+r()*.5),ww=w*(.5+r()*.8);x.fillStyle=f[3]+Math.round(a*255).toString(16).padStart(2,'0');x.fillRect(f[0]-ww/2+R(-1.5,1.5),f[1]+y,ww,1.5)}});
  x.globalCompositeOperation='source-over';
  // Tabela görüntüleri (parlama ile, bir kez)
  signs.forEach(s=>{const pad=12,c=cv((s.w+pad*2)*dpr,(s.h+pad*2)*dpr),y=c.getContext('2d');y.scale(dpr,dpr);
    y.fillStyle='rgba(6,4,12,.85)';y.fillRect(pad,pad,s.w,s.h);y.shadowColor=s.col;y.shadowBlur=10;y.strokeStyle=s.col;y.lineWidth=Math.max(1,s.w/14);y.strokeRect(pad,pad,s.w,s.h);
    y.fillStyle=s.col;const ch=Array.from(s.t),fs=Math.min(s.w*.62,s.h/ch.length*.82);y.font='700 '+fs.toFixed(1)+'px sans-serif';y.textAlign='center';y.textBaseline='middle';
    ch.forEach((k,i)=>y.fillText(k,pad+s.w/2,pad+s.h*(i+.5)/ch.length));s.img=c;s.pad=pad});
  // Hologram reklam
  const ha=P(.2,-1.3,3.4),hb=P(.84,-.15,3.4);
  const holo={x:ha[0],y:ha[1],w:hb[0]-ha[0],h:hb[1]-ha[1]};
  const beacon=[(tt[0]+tb[0])/2,tt[1]-26];
  const vents=[[P(-.55,1,2.4),1],[P(.62,1,3.6),.7]];
  return {base,signs,holo,beacon,vents,P,VY};
}
function start(host){
  const can=host.querySelector('canvas.nc');if(!can)return null;
  const ctx=can.getContext('2d'),dpr=Math.min(2,window.devicePixelRatio||1);
  let W=0,H=0,S=null,raf=0,last=0,stop=false;
  const avs=[0,1,2].map(i=>({y:.08+i*.07,sp:40+i*25,o:i*300,d:i%2?-1:1}));
  function size(){W=innerWidth;H=innerHeight;can.width=Math.round(W*dpr);can.height=Math.round(H*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);S=scene(W,H,dpr)}
  function draw(now){
    const t=now/1000;ctx.drawImage(S.base,0,0,W,H);
    // Neon tabelalar: ara sıra titreyip söner
    S.signs.forEach(s=>{const k=(t*s.sp+s.ph)%7;ctx.globalAlpha=k<.12||(k>.25&&k<.32)?.25:k>3.1&&k<3.16?.5:1;ctx.drawImage(s.img,s.x-s.pad,s.y-s.pad,s.w+s.pad*2,s.h+s.pad*2)});
    ctx.globalAlpha=1;
    // Kule ışığı
    if(Math.floor(t*1.4)%2===0){ctx.fillStyle='#ff003c';ctx.shadowColor='#ff003c';ctx.shadowBlur=12;ctx.fillRect(S.beacon[0]-2,S.beacon[1]-2,4,4);ctx.shadowBlur=0}
    // Hologram
    const h=S.holo,fl=(Math.sin(t*9)+Math.sin(t*23))>1.6?.35:1;ctx.save();ctx.globalAlpha=.85*fl;ctx.globalCompositeOperation='lighter';
    const hg=ctx.createLinearGradient(h.x,h.y,h.x,h.y+h.h);hg.addColorStop(0,'rgba(0,240,255,.35)');hg.addColorStop(1,'rgba(255,42,109,.25)');ctx.fillStyle=hg;ctx.fillRect(h.x,h.y,h.w,h.h);
    ctx.fillStyle='rgba(0,240,255,.9)';ctx.font='700 '+(h.w*.5).toFixed(1)+'px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
    const off=Math.sin(t*3)*1.5;ctx.fillText('夢',h.x+h.w/2+off,h.y+h.h*.4);ctx.fillStyle='rgba(255,42,109,.9)';ctx.fillText('夢',h.x+h.w/2-off,h.y+h.h*.4);
    ctx.font='700 '+(h.w*.15).toFixed(1)+'px sans-serif';ctx.fillStyle='rgba(252,238,10,.95)';ctx.fillText('VOCABOO',h.x+h.w/2,h.y+h.h*.82);
    ctx.fillStyle='rgba(0,0,0,.35)';for(let y=h.y+((t*30)%4);y<h.y+h.h;y+=4)ctx.fillRect(h.x,y,h.w,1.5);
    ctx.restore();
    // Yol trafiği: uzaklaşan stop lambaları, yaklaşan farlar
    ctx.globalCompositeOperation='lighter';
    for(let i=0;i<4;i++){const ph=(t/7+i/4)%1,away=i%2===0,z=away?1.3+ph*22:23.3-ph*22,X=away?.4:-.42,p=S.P(X,.86,z),q=S.P(X+.16,.86,z),s=Math.max(1.2,7/z);
      ctx.fillStyle=away?'rgba(255,30,60,.95)':'rgba(255,250,220,.95)';ctx.shadowColor=ctx.fillStyle;ctx.shadowBlur=8;ctx.fillRect(p[0]-s/2,p[1]-s/2,s,s);ctx.fillRect(q[0]-s/2,q[1]-s/2,s,s)}
    ctx.shadowBlur=0;
    // Uçan araçlar
    avs.forEach(a=>{const xx=((t*a.sp+a.o)%(W+120))-60,X=a.d>0?xx:W-xx,Y=H*a.y+Math.sin(t+a.o)*4;
      ctx.fillStyle='rgba(255,255,255,.9)';ctx.fillRect(X,Y,3,2);ctx.fillStyle='rgba(255,42,109,.9)';ctx.fillRect(X-a.d*8,Y,2,2);
      const tr=ctx.createLinearGradient(X,0,X-a.d*40,0);tr.addColorStop(0,'rgba(0,240,255,.35)');tr.addColorStop(1,'rgba(0,240,255,0)');ctx.fillStyle=tr;ctx.fillRect(Math.min(X,X-a.d*40),Y,40,1)});
    ctx.globalCompositeOperation='source-over';
    // Buhar
    S.vents.forEach((v,j)=>{for(let k=0;k<4;k++){const ph=(t/4+k/4+j*.37)%1,rr=(10+ph*40)*v[1],yy=v[0][1]-ph*90*v[1];
      const g=ctx.createRadialGradient(v[0][0],yy,0,v[0][0],yy,rr);g.addColorStop(0,'rgba(200,190,230,'+(.16*(1-ph)).toFixed(3)+')');g.addColorStop(1,'rgba(200,190,230,0)');ctx.fillStyle=g;ctx.fillRect(v[0][0]-rr,yy-rr,rr*2,rr*2)}});
  }
  const still=()=>document.documentElement.dataset.perf==='low'||(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);
  function loop(now){if(stop)return;if(now-last>50){last=now;draw(now)}raf=requestAnimationFrame(loop)}
  let rt=0;const onR=()=>{clearTimeout(rt);rt=setTimeout(()=>{size();draw(performance.now())},150)};
  size();draw(performance.now());
  if(!still())raf=requestAnimationFrame(loop);
  addEventListener('resize',onR);
  return ()=>{stop=true;cancelAnimationFrame(raf);removeEventListener('resize',onR)};
}
if(SCN.cyber){SCN.cyber.after=start;
  if(document.documentElement.dataset.theme==='cyber'&&SHN&&!SHN._stop)SHN._stop=start(SHN);}
})();
