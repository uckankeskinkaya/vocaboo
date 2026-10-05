
// v13: çerçeveler v3 (temalarla uyumlu, seviye arttıkça daha görkemli), Pazar'da temalar, Alıştırma sunucuda
let PSV=true,OWNINIT=false;
Object.assign(EN,{'Çerçeveler':'Frames','Temalar':'Themes','Çerçeveler menüsünden uygula':'Apply it in the Frames menu','Ayarlar → Tema seç':'Settings → Choose theme','Kutup ışığı':'Aurora','Gün Batımı':'Sunset'});
RX.push([/\(-3 XP\)/,'(-3 XP)']);
Object.keys(FRM).forEach(k=>delete FRM[k]);
for(let i=UNL.length-1;i>=0;i--)if(UNL[i].t==='frame')UNL.splice(i,1);
// anahtar, ad, halka, koşul, parçacık, hareket, süs, kademe(1-4), renkler (ana, ikinci, koyu, açık)
const FQ=[
['nane','Nane','solid',{lv:3},'•','rise','',1,['#10b981','#6ee7b7','#047857','#d1fae5']],
['sakura','Sakura','twin',{lv:5},'✿','fall','',1,['#ec4899','#f9a8d4','#be185d','#fce7f3']],
['lavanta','Lavanta','solid',{lv:7},'✧','rise','',1,['#7c5cf0','#c4b5fd','#4c1d95','#ede9fe']],
['orman','Orman','band',{lv:9},'•','rise','',1,['#16a34a','#86efac','#14532d','#dcfce7']],
['limon','Limon','solid',{lv:11},'✦','out','',1,['#eab308','#fde047','#a16207','#fef9c3']],
['buz','Buz','twin',{lv:13},'❄','fall','',1,['#38bdf8','#e0f2fe','#0369a1','#ffffff']],
['deniz','Deniz','twin',{lv:16},'○','rise','',2,['#0891b2','#22d3ee','#164e63','#a5f3fc']],
['kahve','Kahve','band',{lv:19},'•','rise','',2,['#b45309','#fdba74','#451a03','#fef3c7']],
['altin','Altın','solid',{lv:20},'✦','out','',2,['#f59e0b','#fde68a','#92400e','#fffbeb']],
['mercan','Mercan','solid',{lv:23},'✦','out','',2,['#f2674a','#fdba74','#9a3412','#fecdd3']],
['gunbatimi','Gün Batımı','solid',{lv:26},'★','out','',2,['#fb7185','#fb923c','#7c3aed','#fda4af']],
['gece','Gece','twin',{lv:30},'✧','out','',2,['#6366f1','#818cf8','#1e1b4b','#c7d2fe']],
['zumrut','Zümrüt','band',{lv:35},'◆','out','',2,['#10b981','#34d399','#064e3b','#a7f3d0']],
['seker','Şeker','solid',{lv:40},'●','fall','',3,['#f9a8d4','#bae6fd','#a7f3d0','#fde68a']],
['safak','Şafak','solid',{lv:45},'✦','rise','',3,['#fb923c','#f472b6','#a78bfa','#fde68a']],
['elmas','Elmas','solid',{lv:50},'◇','out','',3,['#22d3ee','#ffffff','#7dd3fc','#e0f2fe']],
['siber','Siber','solid',{lv:60},'✦','out','',3,['#22d3ee','#ec4899','#8b5cf6','#facc15']],
['volkan','Volkan','solid',{lv:70},'•','rise','',3,['#ef4444','#f97316','#fbbf24','#7f1d1d']],
['nebula','Nebula','solid',{lv:80},'✧','out','🌌',4,['#a78bfa','#f472b6','#38bdf8','#fb923c']],
['aurora','Kutup ışığı','solid',{lv:88},'✦','rise','✨',4,['#34d399','#22d3ee','#a78bfa','#f0abfc']],
['tac','Taç','solid',{lv:95},'✦','out','👑',4,['#fde047','#f59e0b','#ffffff','#fbbf24']],
['prizma','Prizma','prism',{lv:100},'✦','out','',4,['#ef4444','#f59e0b','#fde047','#22c55e','#06b6d4','#6366f1','#d946ef']],
['neongece','Neon Gece','solid',{shop:1},'✦','out','',3,['#22d3ee','#e879f9','#0891b2','#f0abfc']],
['kalp','Kalp','solid',{shop:1},'♥','rise','',3,['#fb7185','#fecdd3','#e11d48','#fda4af']],
['matrix','Matrix','solid',{shop:1},'10','fall','',3,['#22c55e','#4ade80','#14532d','#86efac']],
['lav','Lav','solid',{shop:1},'•','rise','',3,['#ef4444','#f97316','#7f1d1d','#fbbf24']],
['hayalet','Hayalet','solid',{shop:1},'○','rise','',3,['#e2e8f0','#93c5fd','#f8fafc','#bfdbfe']],
['altinyagmur','Altın Yağmuru','solid',{shop:1},'●','fall','',4,['#fde047','#f59e0b','#fffbeb','#ca8a04']]];
FQ.forEach(x=>{FRM[x[0]]=[x[1],x[8],x[2],x[3],0,x[4],x[5],x[6],x[7]];UNL.push({id:'frame:'+x[0],t:'frame',n:x[1],req:x[3]})});
function frameHtml(h,k){
  const f=Object.prototype.hasOwnProperty.call(FRM,k)?FRM[k]:null;if(!f)return h;
  const m=/(?:width="|width:)(\d+)/.exec(h),s=m?+m[1]:40,c=f[1],t=f[8],n=s>=44?[3,4,6,8][t-1]:Math.min(3,t+1),g=Array.from(f[5]);let p='';
  for(let i=0;i<n;i++){
    const a=Math.round(i*360/n+(i*47)%30),x=(((i*37)%100)/100*2-1)*s*.42,w=(((i*53)%100)/100-.5)*s*.3,d=2.2+(i%3)*.5;
    p+='<b class="pt" style="--a:'+a+'deg;--x:'+x.toFixed(1)+'px;--w:'+w.toFixed(1)+'px;--t:'+d.toFixed(1)+'s;--d:'+(-(i*d/n)).toFixed(2)+'s;--pc:'+c[(i+1)%c.length]+'">'+g[i%g.length]+'</b>';
  }
  return '<span class="fq q'+t+' y-'+f[2]+'" data-m="'+f[6]+'" style="--s:'+s+'px;--c1:'+c[0]+';--c2:'+c[1]+';--c3:'+c[2]+';--c4:'+(c[3]||c[0])+';--cs:'+c.concat(c[0]).join(',')+'">'+h+p+(f[7]?'<i class="fe'+(f[7]==='👑'?' fc':'')+'">'+f[7]+'</i>':'')+'</span>';
}
document.head.insertAdjacentHTML('beforeend',`<style>
.fq{position:relative;display:inline-grid;place-items:center;border-radius:50%;isolation:isolate;margin:calc(var(--s)*.06);vertical-align:middle;padding:calc(var(--s)*.1);box-shadow:0 0 calc(var(--s)*.28) calc(var(--s)*-.04) var(--c1)}
.fq::before{content:'';position:absolute;inset:0;border-radius:50%;z-index:-1;background:linear-gradient(135deg,var(--c1),var(--c2) 55%,var(--c3))}
.fq::after{content:'';position:absolute;border-radius:50%;z-index:-2;pointer-events:none;inset:calc(var(--s)*-.22);background:radial-gradient(closest-side,var(--c1),transparent 70%);opacity:.16;animation:breathe 3s ease-in-out infinite}
.y-twin::before{background:linear-gradient(160deg,var(--c1) 50%,var(--c2) 50%)}
.y-band::before{background:repeating-conic-gradient(var(--c1) 0 12deg,var(--c3) 12deg 24deg)}
.q2{padding:calc(var(--s)*.12)}.q2>:first-child{box-shadow:0 0 0 calc(var(--s)*.03) var(--c4)}
.q3,.q4{padding:calc(var(--s)*.16)}
.q3::before,.q4::before{background:linear-gradient(110deg,var(--c1),var(--c2),var(--c3),var(--c4),var(--c1));background-size:200% 100%;animation:flow 5s linear infinite}
.q3>:first-child,.q4>:first-child{box-shadow:0 0 0 calc(var(--s)*.035) rgba(255,255,255,.9),0 0 0 calc(var(--s)*.07) var(--c4)}
.q4{padding:calc(var(--s)*.19)}
.q4::before{background:linear-gradient(110deg,var(--c1),var(--c2),var(--c3),var(--c4),var(--c2),var(--c1));background-size:200% 100%;animation-duration:3.4s}
.q4::after{inset:calc(var(--s)*-.4);background:repeating-conic-gradient(var(--c2) 0 4deg,transparent 4deg 12deg);-webkit-mask:radial-gradient(closest-side,transparent 58%,#000 60%,#000 72%,transparent 100%);mask:radial-gradient(closest-side,transparent 58%,#000 60%,#000 72%,transparent 100%);opacity:.55;animation:breathe 2.6s ease-in-out infinite}
.y-prism::before{background:linear-gradient(110deg,var(--cs));background-size:200% 100%;animation:flow 4s linear infinite}
@keyframes flow{to{background-position:200% 0}}
.fq[data-m=out] .pt{animation:pfo var(--t) ease-out var(--d) infinite}
.fq[data-m=rise] .pt{animation:pfr var(--t) ease-out var(--d) infinite}
.fq[data-m=fall] .pt{animation:pfd var(--t) ease-in var(--d) infinite}
:root[data-perf=low] .fq .pt{display:none}
:root[data-perf=low] .fq::before,:root[data-perf=low] .fq::after{animation:none}
@media (prefers-reduced-motion:reduce){.fq .pt{display:none}.fq::before,.fq::after{animation:none!important}}
.tt small{display:block;padding:0 10px 8px;font-size:11px;opacity:.8}.tt.lk{opacity:.55}
</style>`);
// Pazar: çerçeve ve tema sekmeleri (fiyatlar ve sahiplik sunucuda)
const PREMT=['seker','safak','siber','volkan','nebula','aurora'];
const ownedHas=id=>!!prof&&(prof.admin||(prof.owned||[]).includes(id));
const thTile=(k,x,cl,at)=>{const t=TM[k];return '<button class="tt'+cl+'" '+at+' style="--b:'+t[2]+';--f:'+t[4]+';--a:'+t[6]+';--p1:'+t[8]+';--p2:'+t[9]+';--p3:'+t[10]+'"><i></i><span>'+t[0]+(t[12]?' 🎬':t[11]?' ✦':'')+'</span>'+(x?'<small>'+x+'</small>':'')+'</button>'};
async function aShop(tab){
  tab=tab||'f';
  if(!sb||!prof){aAuth('Pazar için giriş yap');return}
  panel('<p>Yükleniyor...</p>');
  const d=await shopOwned();
  if(!d){panel('<p>Pazar yüklenemedi.</p>');return}
  const sg=(id,t,on)=>'<button id="'+id+'"'+(on?' class="on"':'')+'>'+t+'</button>';
  const items=d.items.filter(it=>tab==='f'?(it.id.startsWith('frame:')&&FRM[it.id.slice(6)]):(it.id.startsWith('theme:')&&TM[it.id.slice(6)]));
  const pr=it=>it.owned?'Sahipsin':'🪙 '+it.price.toLocaleString();
  const body=tab==='f'?'<div class="fg">'+items.map(it=>{const k=it.id.slice(6);return '<button class="ft'+(it.owned?' cur':'')+'" data-i="'+it.id+'" data-p="'+it.price+'">'+frameHtml(av(prof.avatar,56),k)+'<b>'+FRM[k][0]+'</b><small>'+pr(it)+'</small></button>'}).join('')+'</div>'
    :'<div class="tg">'+items.map(it=>thTile(it.id.slice(6),pr(it),it.owned?' cur':'','data-i="'+it.id+'" data-p="'+it.price+'"')).join('')+'</div>';
  panel('<div class="bal">🪙 '+d.bal.toLocaleString()+'<small>Bakiye</small></div><div class="seg sm">'+sg('sf','Çerçeveler',tab==='f')+sg('st','Temalar',tab==='t')+'</div>'+body);
  $('sf').onclick=()=>aShop('f');$('st').onclick=()=>aShop('t');
  document.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{
    const id=b.dataset.i,nm=id.startsWith('frame:')?FRM[id.slice(6)][0]:TM[id.slice(6)][0];
    if(b.classList.contains('cur')){toast(tab==='f'?'Çerçeveler menüsünden uygula':'Ayarlar → Tema seç');return}
    cfAsk(nm+': 🪙 '+(+b.dataset.p).toLocaleString(),'Satın al','Vazgeç',async()=>{
      const r=await sb.rpc('shop_buy',{_id:id}),c=r.data;
      toast(c==='ok'?'Satın alındı':c==='yetersiz'?'Yetersiz puan':'Yapılamadı');
      await loadProf();aShop(tab);
    });
  });
};
async function aTheme(){
  await shopOwned();
  const cur=document.documentElement.dataset.theme||'';
  panel('<p>Tema seç</p><div class="tg">'+Object.keys(TM).map(k=>{const lk=PREMT.includes(k)&&!ownedHas('theme:'+k);return thTile(k,lk?'🔒':'',(k===cur?' cur':'')+(lk?' lk':''),'data-t="'+k+'"')}).join('')+'</div><p class="cap">✦ Renkleri yavaşça değişen temalar</p><p class="cap">🎬 Canlı sahneli temalar</p><p class="cap">🔒 Pazardan alınır</p>'+btn('ob','Geri'));
  document.querySelectorAll('.tt').forEach(b=>b.onclick=()=>{if(b.classList.contains('lk')){aShop('t');return}setTheme(b.dataset.t);aTheme()});
  $('ob').onclick=aSettings;
};
async function ownedInit(){
  if(OWNINIT||!prof)return;OWNINIT=true;
  const d=await shopOwned();if(!d)return;
  const t=document.documentElement.dataset.theme;
  if(PREMT.includes(t)&&!ownedHas('theme:'+t))setTheme('light');
}
const _rh4=rHome;rHome=function(){_rh4();ownedInit()};
// Alıştırma sunucuda: XP ve istatistik sunucudan, istemci artık hiçbir şey bildirmiyor
const pFail=r=>{if(r&&r.error&&/Could not find|does not exist|schema cache/i.test(r.error.message)){PSV=false;return true}return false};
async function pStart(l){
  const r=await sb.rpc('p_next',{_l:l});
  if(pFail(r)){next();return}
  if(r.error||!r.data){toast('Bağlantı hatası');return}
  SR=r.data;next();
}
async function pNext(){return pStart(lv)}
async function flushStats(){};
