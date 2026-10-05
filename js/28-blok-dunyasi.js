// v17: Blockcraft teması: dönen 3B blok dünyası (WebGL). Dokular kodla üretilir, dışarıdan görsel yok.
// Yazı tipi: piksel yazı tipleri (ikisi de SIL OFL, fonts/ klasöründe lisanslarıyla). Tema değişince döngü durur.
(function(){
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
  if(kind==='logtop')for(let j=0;j<16;j++)for(let i=0;i<16;i++){const d=Math.max(Math.abs(i-7.5),Math.abs(j-7.5));px(i,j,d>6.5?PAL.log[3]:['#b8945a','#a3824c','#c29f64'][Math.floor(d)%3])}
  if(kind==='water'){x.clearRect(0,0,16,16);for(let j=0;j<16;j++)for(let i=0;i<16;i++)px(i,j,pick(['#3a6ee0','#3466d6','#4277e8','#2f5fcc']))}
  return c;
}
const T={};['top','side','dirt','stone','coal','leaf','log','plank','sand','logtop','water'].forEach((k,i)=>T[k]=tex(k,101+i*17));
// Arayüz için dokular (düğme taşı, toprak, çimen kenarı)
const big=(t,n)=>{const c=cv(16*n,16*n),x=c.getContext('2d');x.imageSmoothingEnabled=false;x.drawImage(t,0,0,16*n,16*n);return 'url('+c.toDataURL()+')'};
const RS=document.documentElement.style;
// Piksel çerçeve halkası: üstü çimen, altı toprak, arada elmas cevheri
(function(){const r=rng(31),c=cv(24,24),x=c.getContext('2d'),pk=a=>a[Math.floor(r()*a.length)];
  for(let j=0;j<24;j++)for(let i=0;i<24;i++){const d=Math.hypot(i+.5-12,j+.5-12);if(d>=12||d<8.9)continue;
    x.fillStyle=d>=11.2||d<9.6?'#1f1f1f':j<10?pk(PAL.grass):r()<.07?pk(['#5fe3e0','#9ff5f2']):pk(PAL.dirt);x.fillRect(i,j,1,1)}
  RS.setProperty('--pxr','url('+c.toDataURL()+')')})();
RS.setProperty('--mc-stone',big(T.stone,2));RS.setProperty('--mc-dirt',big(T.dirt,2));RS.setProperty('--mc-side',big(T.side,2));RS.setProperty('--mc-plank',big(T.plank,2));
// --- 3B dünya: arazi üretimi, mesh, WebGL çizimi ---
const N=72,YM=40,WL=9;
const ATL=['top','side','dirt','stone','sand','log','logtop','leaf','water'];
const FT={1:[0,1,2],2:[2,2,2],3:[3,3,3],4:[4,4,4],5:[6,5,6],6:[7,7,7],7:[8,8,8]};// blok: [üst, yan, alt] doku
const hsh=(i,j,s)=>{let n=Math.imul(i,374761393)+Math.imul(j,668265263)+Math.imul(s,1013904223);n=Math.imul(n^n>>>13,1274126177);return((n^n>>>16)>>>0)/4294967296};
const nz=(x,z,sc,s)=>{const i=Math.floor(x/sc),j=Math.floor(z/sc),fx=x/sc-i,fz=z/sc-j,u=fx*fx*(3-2*fx),v=fz*fz*(3-2*fz),a=hsh(i,j,s),b=hsh(i+1,j,s),c=hsh(i,j+1,s),d=hsh(i+1,j+1,s);return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v};
function gen(){
  const W=new Uint8Array(N*N*YM),id=(x,y,z)=>(y*N+z)*N+x,r=rng(1709),H=[];
  for(let z=0;z<N;z++)for(let x=0;x<N;x++){
    let h=5+nz(x,z,18,1)*9+nz(x,z,7,2)*3+Math.max(0,nz(x,z,26,3)-.5)*34;h=Math.min(YM-10,Math.floor(h));H[z*N+x]=h;
    const beach=h<=WL+1;
    for(let y=0;y<=h;y++)W[id(x,y,z)]=y===h?(beach?4:(h>WL+15?3:1)):y>h-4?(beach?4:2):3;
    for(let y=h+1;y<=WL;y++)W[id(x,y,z)]=7;
  }
  const c=N/2,tr=[];
  for(let z=3;z<N-3;z++)for(let x=3;x<N-3;x++){const h=H[z*N+x];
    if(W[id(x,h,z)]!==1||r()>.03||Math.hypot(x-c,z-c)<5||tr.some(t=>Math.abs(t[0]-x)<4&&Math.abs(t[1]-z)<4))continue;
    tr.push([x,z]);const th=4+Math.floor(r()*2);
    for(let dy=th-2;dy<=th+1;dy++){const rr=dy>=th?1:2;for(let dx=-rr;dx<=rr;dx++)for(let dz=-rr;dz<=rr;dz++){
      if(Math.abs(dx)===rr&&Math.abs(dz)===rr&&(dy===th+1||r()<.5))continue;const k=id(x+dx,h+dy,z+dz);if(h+dy<YM&&!W[k])W[k]=6}}
    for(let k=1;k<=th;k++)W[id(x,h+k,z)]=5;
  }
  return {W,H,id};
}
const FC=[[0,1,0,1,[[0,1,0],[1,1,0],[1,1,1],[0,1,1]],0],[0,-1,0,.5,[[0,0,1],[1,0,1],[1,0,0],[0,0,0]],2],
  [1,0,0,.8,[[1,0,0],[1,1,0],[1,1,1],[1,0,1]],1],[-1,0,0,.8,[[0,0,1],[0,1,1],[0,1,0],[0,0,0]],1],
  [0,0,1,.65,[[1,0,1],[1,1,1],[0,1,1],[0,0,1]],1],[0,0,-1,.65,[[0,0,0],[0,1,0],[1,1,0],[1,0,0]],1]];
const UVT=[[0,0],[1,0],[1,1],[0,1]],UVS=[[0,1],[0,0],[1,0],[1,1]];
function mesh(G){
  const {W,id}=G,op=[],wa=[],get=(x,y,z)=>x<0||z<0||x>=N||z>=N||y>=YM?0:y<0?3:W[id(x,y,z)];
  const push=(arr,x,y,z,f,tile,sh)=>{const q=f[4].map((p,i)=>{const uv=(f[5]===1?UVS:UVT)[i];return [x+p[0],y+p[1]-(arr===wa?.12:0),z+p[2],(tile+.02+uv[0]*.96)/16,.02+uv[1]*.96,sh]});[0,1,2,0,2,3].forEach(i=>arr.push(...q[i]))};
  for(let y=0;y<YM;y++)for(let z=0;z<N;z++)for(let x=0;x<N;x++){const b=W[id(x,y,z)];if(!b)continue;
    for(const f of FC){const n=get(x+f[0],y+f[1],z+f[2]);
      if(b===7){if(f[1]===1&&n===0)push(wa,x,y,z,f,FT[7][0],1);continue}
      if(n===0||n===7||(n===6&&b!==6)||(b===6&&n===6&&f[1]!==0))push(op,x,y,z,f,FT[b][f[5]],f[3])}}
  // Bulutlar: geniş alanda düz levhalar
  const cl=[],SP=384,cs=8;
  for(let i=0;i<SP/cs;i++)for(let j=0;j<SP/cs;j++)if(hsh(i,j,77)>.8||nz(i,j,5,78)>.7){const x0=i*cs,z0=j*cs-SP/2+N/2,y=YM+26;
    [[x0,z0],[x0+cs,z0],[x0+cs,z0+cs],[x0,z0],[x0+cs,z0+cs],[x0,z0+cs]].forEach(p=>cl.push(p[0],y,p[1],0,0,1))}
  return {op:new Float32Array(op),wa:new Float32Array(wa),cl:new Float32Array(cl),SP};
}
const sub=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]],dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2],crs=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],nrm=a=>{const l=Math.hypot(...a)||1;return a.map(v=>v/l)};
const persp=(f,a,n,fa)=>{const t=1/Math.tan(f/2),k=1/(n-fa);return [t/a,0,0,0,0,t,0,0,0,0,(fa+n)*k,-1,0,0,2*fa*n*k,0]};
const look=(e,c,u)=>{const z=nrm(sub(e,c)),x=nrm(crs(u,z)),y=crs(z,x);return [x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-dot(x,e),-dot(y,e),-dot(z,e),1]};
const mul=(a,b)=>{const o=new Array(16);for(let i=0;i<4;i++)for(let j=0;j<4;j++){let s=0;for(let k=0;k<4;k++)s+=a[k*4+j]*b[i*4+k];o[i*4+j]=s}return o};
const VS=`attribute vec3 p;attribute vec2 t;attribute float s;uniform mat4 M;uniform vec3 E;uniform float O,SP,MV,C;varying vec2 vt;varying float vs,vd;
void main(){vec3 q=p;if(MV>1.5&&MV<2.5)q.x=mod(p.x+O,SP)-SP*.5+C;vt=t;vs=s;vd=distance(q.xz,E.xz);gl_Position=M*vec4(q,1.);}`;
const FS=`precision mediump float;uniform sampler2D X;uniform vec3 FCOL,SC;uniform vec2 FR;uniform float A,MD;varying vec2 vt;varying float vs,vd;
void main(){if(MD>2.5){gl_FragColor=vec4(SC,1.);return;}vec4 c=MD>1.5?vec4(1.):texture2D(X,vt);if(c.a<.5)discard;
float f=clamp((vd-FR.x)/(FR.y-FR.x),0.,1.);gl_FragColor=MD>1.5?vec4(1.,1.,1.,A*(1.-f)):vec4(mix(c.rgb*vs,FCOL,f),A);}`;
let GW=null;
function start(host){
  const can=host.querySelector('canvas.mc');if(!can)return null;
  const gl=can.getContext('webgl',{alpha:true,antialias:false,premultipliedAlpha:false});if(!gl)return null;
  const sh=(t,src)=>{const o=gl.createShader(t);gl.shaderSource(o,src);gl.compileShader(o);return o};
  const pr=gl.createProgram();gl.attachShader(pr,sh(gl.VERTEX_SHADER,VS));gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,FS));gl.linkProgram(pr);
  if(!gl.getProgramParameter(pr,gl.LINK_STATUS))return null;
  gl.useProgram(pr);
  const U={};['M','E','O','SP','MD','MV','C','X','FCOL','SC','FR','A'].forEach(k=>U[k]=gl.getUniformLocation(pr,k));
  const L={p:gl.getAttribLocation(pr,'p'),t:gl.getAttribLocation(pr,'t'),s:gl.getAttribLocation(pr,'s')};
  if(!GW){const g=gen();GW={g,m:mesh(g)}}
  const {g,m}=GW;
  const buf=d=>{const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,d,gl.STATIC_DRAW);return {b,n:d.length/6}};
  const B={op:buf(m.op),wa:buf(m.wa),cl:buf(m.cl),sun:buf(new Float32Array(36))};
  const tx=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,tx);
  const at=cv(256,16),ax=at.getContext('2d');ATL.forEach((k,i)=>ax.drawImage(T[k],i*16,0));
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,at);
  [gl.TEXTURE_MIN_FILTER,gl.TEXTURE_MAG_FILTER].forEach(k=>gl.texParameteri(gl.TEXTURE_2D,k,gl.NEAREST));
  [gl.TEXTURE_WRAP_S,gl.TEXTURE_WRAP_T].forEach(k=>gl.texParameteri(gl.TEXTURE_2D,k,gl.CLAMP_TO_EDGE));
  gl.uniform1i(U.X,0);gl.uniform3f(U.FCOL,.79,.88,1);gl.uniform1f(U.SP,m.SP);gl.uniform1f(U.C,N/2);gl.uniform3f(U.SC,1,.97,.78);
  const mode=v=>{gl.uniform1f(U.MD,v);gl.uniform1f(U.MV,v)};
  const bind=o=>{gl.bindBuffer(gl.ARRAY_BUFFER,o.b);gl.enableVertexAttribArray(L.p);gl.vertexAttribPointer(L.p,3,gl.FLOAT,false,24,0);
    gl.enableVertexAttribArray(L.t);gl.vertexAttribPointer(L.t,2,gl.FLOAT,false,24,12);gl.enableVertexAttribArray(L.s);gl.vertexAttribPointer(L.s,1,gl.FLOAT,false,24,20)};
  const c=N/2+.5,E=[c,Math.max(g.H[(N/2)*N+N/2],WL)+7.5,c];
  // Güneş: kameraya bakan kare
  const S=[c+120,E[1]+80,c+30],d=nrm(sub(E,S)),rt=nrm(crs(d,[0,1,0])),up=crs(rt,d),k=10,sq=[[-1,-1],[1,-1],[1,1],[-1,-1],[1,1],[-1,1]].map(q=>[S[0]+rt[0]*q[0]*k+up[0]*q[1]*k,S[1]+rt[1]*q[0]*k+up[1]*q[1]*k,S[2]+rt[2]*q[0]*k+up[2]*q[1]*k,0,0,1]).flat();
  gl.bindBuffer(gl.ARRAY_BUFFER,B.sun.b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(sq),gl.STATIC_DRAW);
  const dpr=Math.min(1.5,window.devicePixelRatio||1);let W=0,H=0,raf=0,last=0,stop=false;const t0=performance.now();
  function size(){W=innerWidth;H=innerHeight;can.width=Math.round(W*dpr);can.height=Math.round(H*dpr);gl.viewport(0,0,can.width,can.height)}
  function draw(now){
    const t=(now-t0)/1000,yaw=.6+t*2*Math.PI/160,pi=-.1+.04*Math.sin(t*.15);
    const dir=[Math.cos(yaw)*Math.cos(pi),Math.sin(pi),Math.sin(yaw)*Math.cos(pi)];
    const M=mul(persp(1.25,W/H,.1,500),look(E,[E[0]+dir[0],E[1]+dir[1],E[2]+dir[2]],[0,1,0]));
    gl.uniformMatrix4fv(U.M,false,new Float32Array(M));gl.uniform3f(U.E,E[0],E[1],E[2]);
    gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    gl.disable(gl.BLEND);gl.disable(gl.DEPTH_TEST);mode(3);bind(B.sun);gl.drawArrays(gl.TRIANGLES,0,B.sun.n);
    gl.enable(gl.DEPTH_TEST);gl.depthMask(true);mode(0);gl.uniform1f(U.A,1);gl.uniform2f(U.FR,N*.26,N*.46);bind(B.op);gl.drawArrays(gl.TRIANGLES,0,B.op.n);
    gl.enable(gl.BLEND);gl.blendFuncSeparate(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA,gl.ONE,gl.ONE_MINUS_SRC_ALPHA);gl.depthMask(false);
    mode(2);gl.uniform1f(U.A,.85);gl.uniform1f(U.O,t*1.2);gl.uniform2f(U.FR,90,190);bind(B.cl);gl.drawArrays(gl.TRIANGLES,0,B.cl.n);
    mode(1);gl.uniform1f(U.A,.78);gl.uniform2f(U.FR,N*.26,N*.46);bind(B.wa);gl.drawArrays(gl.TRIANGLES,0,B.wa.n);
    gl.depthMask(true);
  }
  const still=()=>document.documentElement.dataset.perf==='low'||(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);
  function loop(now){if(stop)return;if(now-last>33){last=now;draw(now)}raf=requestAnimationFrame(loop)}
  let rtm=0;const onR=()=>{clearTimeout(rtm);rtm=setTimeout(()=>{size();draw(performance.now())},150)};
  size();draw(t0);
  if(!still())raf=requestAnimationFrame(loop);
  addEventListener('resize',onR);
  return ()=>{stop=true;cancelAnimationFrame(raf);removeEventListener('resize',onR);const e=gl.getExtension('WEBGL_lose_context');if(e)e.loseContext()};
}
if(SCN.minecraft){SCN.minecraft.after=start;
  if(document.documentElement.dataset.theme==='minecraft'&&SHN&&!SHN._stop)SHN._stop=start(SHN);}
const T2=':root[data-theme="minecraft"]';
document.head.insertAdjacentHTML('beforeend','<style>'+[
"@font-face{font-family:'Vocacraft';src:url(fonts/blok.woff2) format('woff2');font-weight:100 900;font-display:swap;unicode-range:U+0000-00FF}",
"@font-face{font-family:'Vocacraft';src:url(fonts/monocraft-tr.woff2) format('woff2');font-weight:100 900;font-display:swap;unicode-range:U+011E-011F,U+0130-0131,U+015E-015F,U+2010-2027,U+2190-2192}",
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
