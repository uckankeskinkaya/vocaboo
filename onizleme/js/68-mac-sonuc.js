// v48: Maç içi canlı skor ve sonuç ekranı, yeni arayüz diliyle.
// Canlı 1v1: tek kart, iki oyuncu + ortada önde olanı gösteren çekişme çubuğu. Canlı grup: tek satır kaydırılabilir sıralama, ben vurgulu.
// Sonuç 1v1: "Kazandın / Kaybettin / Berabere" başlığı, iki skor yan yana, kazanılan XP; kazanınca kısa konfeti.
// Sonuç grup: ilk 3 podyumda, gerisi kompakt liste. Beklerken "Diğer oyuncular bitiriyor" göstergesi.
// Yalnız görünüm: veriler (plist, m_results) ve akış aynı.
(function(){
if(typeof oResView!=='function'||typeof oLive!=='function')return;
const SV=p=>'<svg viewBox="0 0 24 24" aria-hidden="true">'+p+'</svg>';
const KUPA=SV('<path d="M8 4h8v5a4 4 0 01-8 0zM8 6H5a3 3 0 003 4M16 6h3a3 3 0 01-3 4M12 13v4M8.5 20h7M10 17h4v3h-4z"/>');
const ESIT=SV('<path d="M5 9h14M5 15h14"/>');
const TEKRAR=SV('<path d="M4 12a8 8 0 0113.7-5.6L20 9M20 4v5h-5M20 12a8 8 0 01-13.7 5.6L4 15M4 20v-5h5"/>');
const EV=SV('<path d="M4 10.5L12 4l8 6.5V20a1 1 0 01-1 1h-4.5v-6h-5v6H5a1 1 0 01-1-1z"/>');
document.head.insertAdjacentHTML('beforeend',`<style id="mac-sonuc">
/* Canlı 1v1 */
#live .ylv{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);align-items:center;gap:8px;width:100%;padding:8px 10px;border:1px solid var(--line);border-radius:18px;background:color-mix(in srgb,var(--panel) 80%,transparent);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);box-shadow:var(--sh)}
#live .ylv .yo{display:flex;align-items:center;gap:8px;min-width:0}
#live .ylv .yo.r{flex-direction:row-reverse;text-align:right}
#live .ylv .yo .rk,#live .ylv .yo .fq{margin:0!important}
#live .ylv .yo div{min-width:0}
#live .ylv .yo b{display:block;font-size:12.5px;font-weight:700;color:var(--dim);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#live .ylv .yo strong{display:block;font-size:19px;font-weight:800;color:var(--fg);font-variant-numeric:tabular-nums;line-height:1.1}
#live .ylv .yo.on strong{color:var(--ac)}
#live .ylv .yo em{font-style:normal;font-size:10.5px;color:var(--r);font-weight:700}
#live .ylv .ym{display:flex;flex-direction:column;align-items:center;gap:5px;width:64px}
#live .ylv .ym span{font-size:10.5px;font-weight:800;color:var(--dim);letter-spacing:.06em}
#live .ylv .ym u{display:block;width:64px;height:5px;border-radius:9px;background:color-mix(in srgb,var(--dim) 25%,transparent);overflow:hidden;text-decoration:none}
#live .ylv .ym u i{display:block;height:100%;border-radius:9px;background:var(--ac);transition:width .5s ease}
/* Canlı grup */
#live .ylg{display:flex;gap:6px;width:100%;overflow-x:auto;scrollbar-width:none;padding:2px}
#live .ylg::-webkit-scrollbar{display:none}
#live .ylg span{flex:none;display:inline-flex;align-items:center;gap:6px;padding:4px 10px 4px 4px;border-radius:999px;border:1px solid var(--line);background:color-mix(in srgb,var(--panel) 80%,transparent);font-size:12px;color:var(--fg)}
#live .ylg span.me{border-color:var(--ac);background:color-mix(in srgb,var(--ac) 12%,var(--panel))}
#live .ylg span em{font-style:normal;font-weight:800;color:var(--dim);min-width:14px;text-align:center}
#live .ylg span b{max-width:76px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#live .ylg span strong{font-variant-numeric:tabular-nums}
#live .ylg .rk,#live .ylg .fq{margin:0!important}
/* Sonuç başlığı */
.ysn{position:relative;overflow:hidden;text-align:center;padding:20px 16px 18px;border-radius:24px;border:1px solid var(--line);background:var(--panel);box-shadow:var(--sh);margin-bottom:12px}
.ysn.kaz{background:linear-gradient(150deg,var(--ac),color-mix(in srgb,var(--ac) 60%,#7c3aed));color:var(--acf);border-color:transparent}
.ysn .yik{display:grid;place-items:center;width:52px;height:52px;margin:0 auto 8px;border-radius:16px;background:color-mix(in srgb,currentColor 14%,transparent)}
.ysn .yik svg{width:28px;height:28px;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}
.ysn h2{margin:0;font-size:26px;font-weight:800;letter-spacing:-.5px}
.ysn p{margin:4px 0 0;font-size:13px;opacity:.85;color:inherit!important}
.ysn.bk h2{font-size:20px}
.ysn .yxp{display:inline-block;margin-top:12px;padding:6px 14px;border-radius:999px;background:color-mix(in srgb,currentColor 14%,transparent);font-weight:800;font-size:14px}
.ysn.kaz .yxp{background:var(--acf);color:var(--ac)}
.ysn .ybk{display:inline-block;width:18px;height:18px;margin-top:12px;border-radius:50%;border:2.5px solid color-mix(in srgb,var(--dim) 35%,transparent);border-top-color:var(--ac);animation:ysn-d .8s linear infinite}
@keyframes ysn-d{to{transform:rotate(360deg)}}
/* 1v1 skorlar */
.yss{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);align-items:center;gap:8px;padding:14px 10px;border:1px solid var(--line);border-radius:22px;background:var(--panel);box-shadow:var(--sh);margin-bottom:12px}
.yss .yso{display:flex;flex-direction:column;align-items:center;gap:4px;min-width:0;text-align:center}
.yss .yso b{font-size:14px;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.yss .yso strong{font-size:24px;font-weight:800;font-variant-numeric:tabular-nums;line-height:1}
.yss .yso small{font-size:11.5px;color:var(--dim)}
.yss .yso.on strong{color:var(--ac)}
.yss .yso.yz{opacity:.75}
.yss>span{font-weight:800;font-size:13px;color:var(--dim)}
/* Grup podyumu */
.ypd{display:grid;grid-template-columns:1fr 1.15fr 1fr;align-items:end;gap:8px;margin:0 0 12px}
.ypd>div{display:flex;flex-direction:column;align-items:center;gap:4px;min-width:0}
.ypd b{font-size:13px;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ypd small{font-size:11.5px;color:var(--dim);font-variant-numeric:tabular-nums}
.ypd u{display:grid;place-items:center;width:100%;border-radius:16px 16px 10px 10px;background:color-mix(in srgb,var(--ac) 14%,var(--panel));border:1px solid var(--line);font-size:20px;font-weight:800;text-decoration:none;color:var(--ac)}
.ypd .ya1 u{height:74px;background:var(--ac);color:var(--acf)}.ypd .ya2 u{height:54px}.ypd .ya3 u{height:40px}
.ypd>div{background:none!important;padding:0!important;border:0!important}
.ypd .me b{color:var(--ac)}
.ypd .rk,.ypd .fq{margin:0!important}
.yrl{display:flex;flex-direction:column;gap:6px;margin-bottom:12px}
.yrl .pr{margin:0!important}
/* Düğmeler */
.ybt{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.ybt>*{margin:0!important;display:flex!important;align-items:center;justify-content:center;gap:8px}
.ybt svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}
#online #oyn{background:var(--ac)!important;color:var(--acf)!important;border-color:var(--ac)!important;font-weight:800}
/* Konfeti */
.ykf{position:fixed;inset:0;pointer-events:none;z-index:60;overflow:hidden}
.ykf i{position:absolute;top:-12px;width:8px;height:12px;border-radius:2px;opacity:0;animation:ykf 1.9s cubic-bezier(.25,.6,.4,1) forwards}
@keyframes ykf{0%{opacity:1;transform:translate(0,0) rotate(0)}100%{opacity:0;transform:translate(var(--x),105vh) rotate(var(--r))}}
:root[data-perf=low] .ykf{display:none}
@media (prefers-reduced-motion:reduce){.ykf{display:none}}
</style>`);
const fr=(im,f,s)=>frameWrap(av(im,s),f||null);
const deger=x=>cfg&&cfg.m==='s'?(x.w||0):(x.p||0);
// --- Canlı 1v1
vsLive=function(L){
  const me=L.find(x=>x.k===myId),op=L.find(x=>x.k!==myId);
  const a=me?deger(me):0,b=op?deger(op):0,t=a+b,p=t?Math.round(a/t*100):50;
  const kim=(x,im,f,r,on)=>'<div class="yo'+(r?' r':'')+(on?' on':'')+'">'+fr(im,f,34)+'<div><b>'+esc(x?x.n:'Rakip')+'</b><strong>'+(x?deger(x):0)+'</strong>'+(x&&!x.a?'<em>elendi</em>':'')+'</div></div>';
  return '<div class="ylv">'+kim(me,prof&&prof.avatar,prof&&prof.frame,0,a>b)+'<div class="ym"><span>'+(cfg.m==='s'?'KELİME':'PUAN')+'</span><u><i style="width:'+p+'%"></i></u></div>'
    +kim(op,op&&op.im,op&&(ovGet(op.n)||{}).fr,1,b>a)+'</div>';
};
// --- Canlı grup
const _ol=oLive;
oLive=function(L){
  const r=_ol.apply(this,arguments);
  try{
    if(typeof modView!=='undefined'&&modView)return r;
    if(cfg&&cfg.max!==2){
      const R=rank(L||plist());
      $('live').innerHTML='<div class="ylg">'+R.map((x,i)=>'<span'+(x.k===myId?' class="me"':'')+'><em>'+(i+1)+'</em>'+fr(x.im,(ovGet(x.n)||{}).fr,24)+'<b>'+esc(x.n)+'</b><strong>'+deger(x)+(cfg.m==='s'?' k':'p')+'</strong></span>').join('')+'</div>';
      const m=$('live').querySelector('.me');if(m&&m.offsetLeft>200)m.scrollIntoView({inline:'center',block:'nearest'});
    }
  }catch(e){}
  return r;
};
// --- Sonuç
let kutlandi='';
function konfeti(){
  const c=['var(--ac)','var(--g)','var(--o)','#ffd166','#ff5d73'];
  const w=document.createElement('div');w.className='ykf';
  let h='';for(let i=0;i<36;i++)h+='<i style="left:'+(Math.random()*100).toFixed(1)+'%;background:'+c[i%c.length]+';--x:'+((Math.random()-.5)*160).toFixed(0)+'px;--r:'+(Math.random()*720-360).toFixed(0)+'deg;animation-delay:'+(Math.random()*.5).toFixed(2)+'s"></i>';
  w.innerHTML=h;document.body.appendChild(w);setTimeout(()=>w.remove(),2800);
}
oResView=function(d){
  const P=d.players||[],me=P.find(x=>x.me),s=d.mode==='s',v=x=>s?(+x.w||0):(+x.sc||0);
  const iki=P.length===2&&cfg&&cfg.max===2;
  let bas='';
  if(!d.done){
    bas='<div class="ysn bk"><h2>'+(d.left?'Diğer oyuncular bitiriyor':'XP hesaplanıyor...')+'</h2><p>'+(d.left?'Bitirmeyen oyuncu: '+d.left:'Birazdan hazır')+'</p><span class="ybk"></span></div>';
  }else if(iki&&me){
    const op=P.find(x=>!x.me),a=v(me),b=v(op);
    const sonuc=a>b?'kaz':a<b?'kay':'ber';
    bas='<div class="ysn'+(sonuc==='kaz'?' kaz':'')+'"><span class="yik">'+(sonuc==='ber'?ESIT:KUPA)+'</span><h2>'+(sonuc==='kaz'?'Kazandın!':sonuc==='kay'?'Kaybettin':'Berabere')+'</h2><p>'+(sonuc==='kaz'?'Harika maçtı':sonuc==='kay'?'Bir dahakine!':'Kıl payı')+'</p><span class="yxp">+'+(me.xp||0)+' XP</span></div>';
    if(sonuc==='kaz'&&kutlandi!==room){kutlandi=room;konfeti();try{sfx('win')}catch(e){}}
  }else if(me){
    const sira=P.indexOf(me)+1;
    bas='<div class="ysn'+(sira===1?' kaz':'')+'"><span class="yik">'+KUPA+'</span><h2>'+(sira===1?'Birinci oldun!':sira+'. oldun')+'</h2><p>'+P.length+' oyuncu arasında</p><span class="yxp">+'+(me.xp||0)+' XP</span></div>';
    if(sira===1&&kutlandi!==room){kutlandi=room;konfeti();try{sfx('win')}catch(e){}}
  }else bas='<div class="ysn"><h2>Sonuçlar</h2></div>';
  let govde='';
  if(iki){
    const kim=x=>{const ust=v(x)>=Math.max(...P.map(v));return '<div class="yso'+(ust?' on':' yz')+'">'+fr(x.im,x.fr||(ovGet(x.u)||{}).fr,52)+'<b>'+esc(x.u)+(x.me?' (sen)':'')+'</b><strong>'+v(x)+'</strong><small>'+(s?'kelime':'puan')+(d.done?' · +'+(x.xp||0)+' XP':'')+'</small></div>'};
    const m=P.find(x=>x.me)||P[0],o=P.find(x=>x!==m);
    govde='<div class="yss">'+kim(m)+'<span>VS</span>'+kim(o)+'</div>';
  }else{
    const ilk=P.slice(0,3),sra=[ilk[1],ilk[0],ilk[2]],cls=['ya2','ya1','ya3'];
    govde='<div class="ypd">'+sra.map((x,i)=>x?'<div class="'+cls[i]+(x.me?' me':'')+'">'+fr(x.im,x.fr||(ovGet(x.u)||{}).fr,i===1?50:42)+'<b>'+esc(x.u)+'</b><small>'+v(x)+(s?' kelime':' puan')+(x.a===false?' · elendi':'')+'</small><u>'+(i===1?1:i===0?2:3)+'</u></div>':'<div></div>').join('')+'</div>';
    const geri=P.slice(3);
    if(geri.length)govde+='<div class="yrl">'+geri.map((x,i)=>oPlayerRow({n:x.u,im:x.im,rank:i+4,me:x.me,tag:x.a?'':'(elendi)',sc:x.sc+' puan',sub:[s?x.w+' kelime':'',d.done?'+'+(x.xp||0)+' XP':''].filter(Boolean).join(' · ')})).join('')+'</div>';
  }
  on(bas+govde+'<div class="ybt">'+btn('oyn',TEKRAR+'<span>Yeni maç</span>')+btn('ob',EV+'<span>Ana menü</span>')+'</div>');
  $('ob').onclick=()=>oExit();
  $('oyn').onclick=()=>{oExit();setTimeout(()=>{try{oHome()}catch(e){}},0)};
};
Object.assign(EN,{'Kazandın!':'You won!','Kaybettin':'You lost','Berabere':'Draw','Harika maçtı':'Great match','Bir dahakine!':'Next time!','Kıl payı':'So close',
  'Birinci oldun!':'You came first!','Diğer oyuncular bitiriyor':'Other players are finishing','Birazdan hazır':'Ready in a moment','Yeni maç':'New match','elendi':'out','KELİME':'WORDS','PUAN':'POINTS'});
RX.push([/^(\d+)\. oldun$/,(m,a)=>'You came #'+a],[/^(\d+) oyuncu arasında$/,'out of $1 players']);
})();
