
// v12: Pazar (puanla çerçeve), bakiye, yenilenmiş parçacıklı çerçeveler (dönen yuvarlaklar kaldırıldı)
let OWN=[];
Object.assign(EN,{'Pazar':'Market','Bakiye':'Balance','Sahipsin':'Owned','Satın al':'Buy','Satın alındı':'Purchased','Yetersiz puan':'Not enough points','Pazardan alınır':'Buy it in the Market','Fıstık':'Pistachio','Bakır':'Copper','Pamuk':'Cotton','Okyanus':'Ocean','Mor Duman':'Purple Smoke','Buzul':'Glacier','Gün Batımı':'Sunset','Kozmos':'Cosmos','Prizma':'Prism','Neon Gece':'Neon Night','Kalp':'Heart','Lav':'Lava','Hayalet':'Ghost','Altın Yağmuru':'Gold Rain','Pazar yüklenemedi.':'Could not load the Market.'});
Object.keys(FRM).forEach(k=>delete FRM[k]);
for(let i=UNL.length-1;i>=0;i--)if(UNL[i].t==='frame')UNL.splice(i,1);
// anahtar, ad, halka, koşul, parçacık, hareket, süs, renkler. {shop:1} = Pazar'dan alınır (fiyatı sunucu belirler)
const FD2=[
['fistik','Fıstık','dots',{lv:3},'•','rise','',['#a3e635','#65a30d','#ecfccb','#3f6212']],
['bakir','Bakır','solid',{lv:6},'✦','out','',['#c2410c','#fdba74','#7c2d12','#fb923c']],
['pamuk','Pamuk','twin',{lv:10},'✿','fall','',['#fbcfe8','#ffffff','#f9a8d4','#fda4af']],
['okyanus','Okyanus','twin',{lv:15},'○','rise','',['#0ea5e9','#14b8a6','#67e8f9','#0369a1']],
['altin','Altın','solid',{title:'Usta'},'✦','out','',['#facc15','#fef3c7','#ca8a04','#fde047']],
['morduman','Mor Duman','glow',{lv:25},'✧','rise','',['#7c3aed','#c026d3','#4c1d95','#e879f9']],
['zumrut','Zümrüt','twin',{lv:30},'◆','out','',['#059669','#34d399','#064e3b','#a7f3d0']],
['alev','Alev','glow',{title:'Efsane'},'✦','rise','',['#dc2626','#f97316','#fde047','#7f1d1d']],
['buzul','Buzul','dash',{lv:45},'❄','fall','',['#7dd3fc','#e0f2fe','#bae6fd','#ffffff']],
['elmas','Elmas','sun',{title:'Kelime Efendisi'},'◇','out','',['#22d3ee','#e0f2fe','#ffffff','#a5f3fc']],
['gunbati','Gün Batımı','solid',{lv:60},'★','out','',['#fb7185','#8b5cf6','#fdba74','#f472b6']],
['kozmos','Kozmos','twin',{lv:70},'✧','out','',['#4338ca','#a78bfa','#1e1b4b','#c4b5fd']],
['kutup','Kutup Işığı','glow',{lv:80},'✦','rise','',['#34d399','#22d3ee','#a78bfa','#f0abfc']],
['tac','Taç','sun',{lv:90},'✦','out','👑',['#fde047','#ffffff','#f59e0b','#fbbf24']],
['prizma','Prizma','prism',{lv:100},'✦','out','',['#ef4444','#f59e0b','#fde047','#22c55e','#06b6d4','#6366f1','#d946ef']],
['neongece','Neon Gece','neon',{shop:1},'✦','out','',['#22d3ee','#f0abfc','#0891b2','#e879f9']],
['kalp','Kalp','twin',{shop:1},'♥','rise','',['#fb7185','#fecdd3','#e11d48','#fda4af']],
['sakura','Sakura','dots',{shop:1},'✿','fall','',['#f9a8d4','#fbcfe8','#ec4899','#fff1f2']],
['matrix','Matrix','dash',{shop:1},'10','fall','',['#22c55e','#4ade80','#14532d','#86efac']],
['lav','Lav','neon',{shop:1},'•','rise','',['#ef4444','#f97316','#7f1d1d','#fbbf24']],
['hayalet','Hayalet','glow',{shop:1},'○','rise','',['#e2e8f0','#93c5fd','#f8fafc','#bfdbfe']],
['altinyagmur','Altın Yağmuru','sun',{shop:1},'●','fall','',['#fde047','#f59e0b','#fffbeb','#ca8a04']]];
FD2.forEach(x=>{FRM[x[0]]=[x[1],x[7],x[2],x[3],0,x[4],x[5],x[6]];UNL.push({id:'frame:'+x[0],t:'frame',n:x[1],req:x[3]})});
document.head.insertAdjacentHTML('beforeend',`<style>
.fz{position:relative;display:inline-grid;place-items:center;border-radius:50%;isolation:isolate;padding:calc(var(--s)*.11);margin:calc(var(--s)*.06);vertical-align:middle;box-shadow:0 0 calc(var(--s)*.3) calc(var(--s)*-.05) var(--c1)}
.fz::before{content:'';position:absolute;inset:0;border-radius:50%;z-index:-1}
.fz::after{content:'';position:absolute;inset:calc(var(--s)*-.2);border-radius:50%;background:radial-gradient(closest-side,var(--c1),transparent 70%);opacity:.18;z-index:-2;pointer-events:none;animation:breathe 3s ease-in-out infinite}
@keyframes breathe{0%,100%{opacity:.12;transform:scale(.97)}50%{opacity:.38;transform:scale(1.04)}}
.z-solid::before{background:linear-gradient(135deg,var(--c1),var(--c2) 48%,var(--c3))}
.z-twin::before{background:linear-gradient(160deg,var(--c1) 50%,var(--c2) 50%)}
.z-twin>:first-child{box-shadow:0 0 0 calc(var(--s)*.03) var(--c4)}
.z-dots{padding:calc(var(--s)*.14);box-shadow:0 0 0 calc(var(--s)*.02) var(--c2),0 0 calc(var(--s)*.3) calc(var(--s)*-.05) var(--c1)}
.z-dots::before{border:calc(var(--s)*.09) dotted var(--c1)}
.z-dash{padding:calc(var(--s)*.14)}
.z-dash::before{border:calc(var(--s)*.07) dashed var(--c1)}
.z-sun{padding:calc(var(--s)*.15)}
.z-sun::before{inset:calc(var(--s)*-.1);background:repeating-conic-gradient(var(--c1) 0 6deg,transparent 6deg 15deg)}
.z-sun>:first-child{box-shadow:0 0 0 calc(var(--s)*.05) var(--c2),0 0 0 calc(var(--s)*.09) var(--c3)}
.z-glow{padding:calc(var(--s)*.07)}
.z-glow::before{inset:calc(var(--s)*-.28);background:radial-gradient(closest-side,transparent 56%,var(--c1) 70%,var(--c2) 84%,transparent 100%);opacity:.9}
.z-neon::before{background:linear-gradient(135deg,var(--c1),var(--c2))}
.z-neon{box-shadow:0 0 calc(var(--s)*.28) var(--c1),0 0 calc(var(--s)*.6) calc(var(--s)*-.08) var(--c2)}
.z-neon>:first-child{box-shadow:0 0 0 calc(var(--s)*.03) rgba(255,255,255,.8)}
.z-prism::before{background:var(--cg);animation:spin 9s linear infinite}
.pt{position:absolute;left:50%;top:50%;font-size:calc(var(--s)*.17);line-height:1;font-style:normal;font-weight:700;color:var(--pc);text-shadow:0 0 6px var(--pc);pointer-events:none;opacity:0;z-index:3}
.fz[data-m=out] .pt{animation:pfo var(--t) ease-out var(--d) infinite}
.fz[data-m=rise] .pt{animation:pfr var(--t) ease-out var(--d) infinite}
.fz[data-m=fall] .pt{animation:pfd var(--t) ease-in var(--d) infinite}
@keyframes pfo{0%{opacity:0;transform:translate(-50%,-50%) rotate(var(--a)) translateX(calc(var(--s)*.5)) rotate(calc(var(--a)*-1)) scale(.3)}20%{opacity:1}100%{opacity:0;transform:translate(-50%,-50%) rotate(var(--a)) translateX(calc(var(--s)*.98)) rotate(calc(var(--a)*-1)) scale(1)}}
@keyframes pfr{0%{opacity:0;transform:translate(calc(-50% + var(--x)),calc(-50% + var(--s)*.35)) scale(.5)}20%{opacity:1}100%{opacity:0;transform:translate(calc(-50% + var(--x) + var(--w)),calc(-50% - var(--s)*.85)) scale(1)}}
@keyframes pfd{0%{opacity:0;transform:translate(calc(-50% + var(--x)),calc(-50% - var(--s)*.5)) scale(.6)}20%{opacity:1}100%{opacity:0;transform:translate(calc(-50% + var(--x) + var(--w)),calc(-50% + var(--s)*.85)) scale(1)}}
:root[data-perf=low] .pt{display:none}
:root[data-perf=low] .fz::after,:root[data-perf=low] .z-prism::before{animation:none}
@media (prefers-reduced-motion:reduce){.pt{display:none}.fz::after,.z-prism::before{animation:none!important}}
.bal{font-size:28px;font-weight:800;text-align:center;margin:6px 0 4px}.bal small{display:block;font-size:12px;color:var(--dim);font-weight:600}
</style>`);
// Bakiye (sağ üst): toplam puan - harcanan, sunucudan
const bal=()=>Math.max(0,((prof&&prof.total_points)||0)-((prof&&prof.points_spent)||0));
function setBal(){if(prof&&$('game').hidden)$('score').textContent='🪙 '+bal().toLocaleString()}
const _rh3=rHome;rHome=function(){_rh3();setBal()};
const _oe4=oExit;oExit=function(m){_oe4(m);setBal()};
async function shopOwned(){try{const r=await sb.rpc('shop_list');if(r.data){OWN=r.data.owned||[];prof.owned=OWN;return r.data}}catch(e){}return null}
async function aFrames(){
  await shopOwned();
  const cur=myFrame(),lvOf=k=>{const r=FRM[k][3];return r.lv||(r.title?(TT.find(y=>y[1]===r.title)||[999])[0]:999)};
  panel('<p>Avatar çerçevesi</p><div class="fg">'+[''].concat(Object.keys(FRM).sort((a,b)=>lvOf(a)-lvOf(b))).map(k=>{
    const f=FRM[k],ok=!k||prof.admin||unlocked(UNL.find(x=>x.id==='frame:'+k),prof),r=f&&f[3],rq=ok?'':(r.lv?'Seviye '+r.lv:r.title?'Unvan: '+r.title:'Pazardan alınır');
    return '<button class="ft'+(k===cur?' cur':'')+(ok?'':' lk')+'" data-f="'+k+'">'+frameHtml(av(prof.avatar,56),k)+'<b>'+(k?f[0]:'Çerçevesiz')+'</b>'+(rq?'<small>'+rq+'</small>':'')+'</button>';
  }).join('')+'</div>'+btn('ob','Profil'));
  document.querySelectorAll('.ft').forEach(b=>b.onclick=async()=>{
    if(b.classList.contains('lk')){if(FRM[b.dataset.f][3].shop)aShop();else toast('Henüz açılmadı');return}
    const r=await sb.rpc('set_frame',{_k:b.dataset.f});
    if(r.error||r.data!=='ok'){toast('Uygulanamadı');return}
    await loadProf();toast('Çerçeve uygulandı');aFrames();
  });
  $('ob').onclick=aProfile;
};
