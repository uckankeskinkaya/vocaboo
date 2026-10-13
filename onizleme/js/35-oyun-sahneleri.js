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

synthwave:{html:()=>{
  let h=ps(16,()=>'left:'+f1(R(0,100))+'%;top:'+f1(R(0,38))+'%;--z:'+f1(R(1,2.4))+'px;--t:'+f1(R(2,5))+'s;--d:-'+f1(R(0,5))+'s');
  h+='<u class="sg"></u><u class="sun"></u>';
  for(let i=0;i<14;i++)h+='<u class="bd" style="left:'+f1(i*7.4-2)+'%;width:'+f1(R(5,8))+'%;height:'+f1(R(4,13))+'%"></u>';
  return h+'<u class="road"></u><u class="dash"></u>'},
 css:`§O{background:linear-gradient(#0c0120 0%,#2a0750 38%,#5a1060 44%,#0d0220 44%)}
§O i{width:var(--z);height:var(--z);border-radius:50%;background:#fff;animation:sc-tw var(--t) ease-in-out var(--d) infinite}
§O .sg{left:50%;bottom:50%;width:min(90vw,70vh);aspect-ratio:1.4;transform:translateX(-50%);background:radial-gradient(closest-side,rgba(255,80,170,.45),transparent)}
§O .sun{left:50%;bottom:56%;width:min(56vw,42vh);aspect-ratio:2;transform:translateX(-50%);border-radius:999px 999px 0 0;background:linear-gradient(#ffe45c,#ff8f3d 50%,#ff3d9a);-webkit-mask:linear-gradient(#000 45%,transparent 0) top/100% 100% no-repeat,repeating-linear-gradient(#000 0 9px,transparent 9px 14px);mask:linear-gradient(#000 45%,transparent 0) top/100% 100% no-repeat,repeating-linear-gradient(#000 0 9px,transparent 9px 14px)}
§O .bd{bottom:56%;background:#12031f;box-shadow:inset 0 2px 0 #22d3ee,0 0 10px rgba(34,211,238,.4)}
§O::before{content:'';position:absolute;left:-60%;right:-60%;bottom:0;height:calc(56% + 60px);will-change:transform;background-image:linear-gradient(90deg,rgba(255,79,216,.85) 2px,transparent 2px),linear-gradient(rgba(34,211,238,.85) 2px,transparent 2px);background-size:60px 60px;transform:perspective(320px) rotateX(55deg);transform-origin:50% 100%;animation:sc-gridg 1.2s linear infinite;-webkit-mask:linear-gradient(transparent,#000);mask:linear-gradient(transparent,#000)}
§O .road{left:50%;bottom:0;width:120%;height:56%;margin-left:-60%;background:linear-gradient(#1a0530,#08010f);clip-path:polygon(47% 0,53% 0,78% 100%,22% 100%);box-shadow:none}
§O .road::before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent 21.6%,#ff4fd8 21.8%,transparent 22.6%,transparent 77.4%,#ff4fd8 78.2%,transparent 78.4%)}
§O .dash{left:50%;bottom:0;width:6px;height:calc(56% + 60px);margin-left:-3px;will-change:transform;background:repeating-linear-gradient(#fcee0a 0 26px,transparent 26px 60px);transform:perspective(220px) rotateX(62deg);transform-origin:50% 100%;animation:os-dasht .5s linear infinite}
@keyframes sc-gridg{from{transform:perspective(320px) rotateX(55deg) translateY(-60px)}to{transform:perspective(320px) rotateX(55deg) translateY(0)}}
@keyframes os-dasht{from{transform:perspective(220px) rotateX(62deg) translateY(-60px)}to{transform:perspective(220px) rotateX(62deg) translateY(0)}}`},

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

kod:{html:()=>{
  let L=[];for(let i=0;i<60;i++)L.push(KOD[Math.floor(R(0,KOD.length))]);const t=L.join('\n');
  return '<i class="term">'+t+'\n'+t+'</i><u class="cur"></u><u class="scan"></u><u class="vg"></u>'},
 css:`§O{background:#020a04}
§O .term{left:6%;top:0;white-space:pre;font:12px/1.6 'Share Tech Mono',monospace;color:rgba(34,255,102,.3);animation:os-scroll 60s linear infinite}
§O .cur{left:6%;bottom:12%;width:9px;height:16px;background:#22ff66;box-shadow:0 0 10px #22ff66;animation:sc-blink 1s steps(1) infinite}
§O .scan{inset:0;background:repeating-linear-gradient(0deg,rgba(34,255,102,.05) 0 1px,transparent 1px 3px)}
§O .vg{inset:0;background:radial-gradient(ellipse at 50% 50%,transparent 40%,rgba(0,0,0,.85))}`},

};
let css=`#oyunsahne{position:fixed;inset:0;z-index:-1;pointer-events:none;overflow:hidden;display:none}
#oyunsahne *:not(svg):not(svg *),#oyunsahne *:not(svg):not(svg *)::before,#oyunsahne *:not(svg):not(svg *)::after{all:unset}
#oyunsahne i:not(svg):not(svg *),#oyunsahne u:not(svg):not(svg *){position:absolute;display:block;pointer-events:none}
#oyunsahne i:not(svg):not(svg *){left:var(--x)}
:root[data-oyun] #oyunsahne{display:block}
:root[data-oyun] #sahne{display:none}
:root[data-perf=low] #oyunsahne *,:root[data-perf=low] #oyunsahne::before{animation:none!important}
@media (prefers-reduced-motion:reduce){#oyunsahne,#oyunsahne *,#oyunsahne::before,#oyunsahne::after{animation:none!important}}
`;
for(const k in OS)css+=OS[k].css.replace(/§O/g,'#oyunsahne[data-s="'+k+'"]')+'\n';
document.head.insertAdjacentHTML('beforeend','<style id="oyun-sahne-css">'+css+'</style>');
const OSN=document.createElement('div');OSN.id='oyunsahne';OSN.setAttribute('aria-hidden','true');document.body.appendChild(OSN);
window.OSEKLE=(k,d)=>{OS[k]=d;document.head.insertAdjacentHTML('beforeend','<style class="oyun-sahne-ek">'+d.css.replace(/§O/g,'#oyunsahne[data-s="'+k+'"]')+'</style>');if(OSN.dataset.s===k)OSN.dataset.s=''};
let durdu=false,zor=false;
// Pazar önizlemesi: oyun açık olmadan oyun sahnesini göster
window.oyunSahnesiZorla=v=>{zor=!!v;OSN.dataset.s='';guncelle()};
function guncelle(){
  const r=document.documentElement,t=r.dataset.theme,g=$('game'),acik=(zor||(g&&!g.hidden))&&!!OS[t]&&!!r.dataset.scene;
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
