
// v11: çerçeve sistemi v2 (Discord tarzı): geniş kenarlıklar, parıltı, yörünge parıltıları, süs ikonları
Object.assign(EN,{'Yıldız':'Star','Kristal':'Crystal','Taç':'Crown'});
Object.keys(FRM).forEach(k=>delete FRM[k]);
for(let i=UNL.length-1;i>=0;i--)if(UNL[i].t==='frame')UNL.splice(i,1);
// anahtar, ad, tür, hız(sn), süs, koşul, renkler
const FD=[
['nane','Nane','ring',4,'',{lv:4},['#34d399','#a7f3d0','#6ee7b7','#10b981']],
['bronz','Bronz','ring',5,'',{lv:5},['#b45309','#f59e0b','#78350f','#fbbf24']],
['sakura','Sakura','ring',4,'🌸',{lv:6},['#f472b6','#fbcfe8','#fda4af','#e0457b']],
['lavanta','Lavanta','dash',6,'',{lv:8},['#a78bfa','#ddd6fe','#c4b5fd','#7c5cf0']],
['orman','Orman','wide',5,'🍃',{lv:10},['#4ade80','#bef264','#16a34a','#86efac']],
['deniz','Deniz','neon',3.5,'🌊',{lv:12},['#22d3ee','#3b82f6','#06b6d4','#67e8f9']],
['kahve','Kahve','wide',5,'☕',{lv:14},['#d9a066','#78350f','#fcd9b0','#a16207']],
['gumus','Gümüş','dash',5,'',{lv:15},['#94a3b8','#f1f5f9','#64748b','#e2e8f0']],
['gunbatimi','Gün batımı','aura',3.5,'',{lv:18},['#fb7185','#fb923c','#c084fc','#fda4af']],
['altin','Altın','wide',4,'',{title:'Usta'},['#f59e0b','#fde68a','#d97706','#fef3c7']],
['buz','Buz','orbit',4,'❄️',{lv:22},['#7dd3fc','#e0f2fe','#38bdf8','#ffffff']],
['yildiz','Yıldız','orbit',3,'✨',{lv:25},['#fde047','#fff7ae','#f59e0b','#ffffff']],
['mercan','Mercan','neon',3.5,'',{lv:26},['#fb7185','#fdba74','#f2674a','#fecdd3']],
['limon','Limon','aura',3,'🍋',{lv:28},['#fde047','#bef264','#facc15','#fef9c3']],
['zumrut','Zümrüt','orbit',3.5,'',{lv:30},['#059669','#6ee7b7','#047857','#34d399']],
['gece','Gece','orbit',4,'🌙',{lv:32},['#6366f1','#1e3a8a','#7aa2ff','#312e81']],
['alev','Alev','aura',2.2,'🔥',{title:'Efsane'},['#ef4444','#f97316','#fde047','#f97316']],
['kristal','Kristal','orbit',2.6,'💠',{lv:38},['#a5f3fc','#e0e7ff','#c4b5fd','#ffffff']],
['seker','Şeker','orbit',2.8,'🍬',{lv:40},['#fbcfe8','#bfdbfe','#bbf7d0','#fde68a']],
['safak','Şafak','aura',2.8,'🌅',{lv:45},['#fdba74','#f9a8d4','#c4b5fd','#fecaca']],
['elmas','Elmas','orbit',2.2,'💎',{title:'Kelime Efendisi'},['#22d3ee','#ffffff','#a5f3fc','#38bdf8']],
['siber','Siber','neon',1.8,'⚡',{lv:55},['#22d3ee','#ec4899','#8b5cf6','#facc15']],
['volkan','Volkan','aura',2,'🌋',{lv:60},['#ef4444','#fb923c','#fde047','#991b1b']],
['nebula','Nebula','orbit',1.8,'🌌',{lv:70},['#c4a1ff','#f472b6','#38bdf8','#fb923c']],
['aurora','Kutup ışığı','aura',2,'✨',{lv:80},['#5eead4','#22c55e','#8b5cf6','#38bdf8']],
['tac','Taç','orbit',1.8,'👑',{lv:90},['#fde047','#f59e0b','#fff7ae','#fbbf24']],
['gokkusagi','Gökkuşağı','orbit',1.5,'🌈',{lv:100},['#ef4444','#f59e0b','#fde047','#22c55e','#06b6d4','#6366f1','#d946ef']],
['neon','Neon','neon',1.6,'',{pts:2000},['#f0abfc','#22d3ee','#a3e635','#f472b6']]];
FD.forEach(x=>{FRM[x[0]]=[x[1],x[6],x[2],x[5],x[3],x[4]];UNL.push({id:'frame:'+x[0],t:'frame',n:x[1],req:x[5]})});
document.head.insertAdjacentHTML('beforeend',`<style>
@keyframes pulse{0%,100%{opacity:.35;transform:scale(.96)}50%{opacity:.8;transform:scale(1.05)}}
@keyframes bob{0%,100%{transform:translateY(0) rotate(-6deg)}50%{transform:translateY(-10%) rotate(8deg)}}
@keyframes bobc{0%,100%{transform:translate(-50%,0)}50%{transform:translate(-50%,-10%)}}
.fx{position:relative;display:inline-grid;place-items:center;border-radius:50%;isolation:isolate;padding:calc(var(--s)*.1);margin:calc(var(--s)*.05);vertical-align:middle}
.fx::before{content:'';position:absolute;inset:0;border-radius:50%;background:var(--cg);z-index:-1;animation:spin var(--sp) linear infinite}
.fx::after{content:'';position:absolute;pointer-events:none;border-radius:50%;z-index:-2}
.f-ring{box-shadow:0 0 calc(var(--s)*.3) calc(var(--s)*-.06) var(--c1)}
.f-neon{padding:calc(var(--s)*.12)}
.f-neon>:first-child{box-shadow:0 0 0 calc(var(--s)*.03) rgba(255,255,255,.7)}
.f-neon::after{inset:calc(var(--s)*-.28);background:radial-gradient(closest-side,var(--c1),transparent 72%);opacity:.5;animation:pulse 2s ease-in-out infinite}
.f-wide{padding:calc(var(--s)*.17);box-shadow:0 0 calc(var(--s)*.35) calc(var(--s)*-.05) var(--c2)}
.f-wide>:first-child{box-shadow:0 0 0 calc(var(--s)*.04) rgba(255,255,255,.75),0 0 0 calc(var(--s)*.075) var(--c4)}
.f-aura{padding:calc(var(--s)*.08)}
.f-aura::after{inset:calc(var(--s)*-.38);background:radial-gradient(closest-side,transparent 52%,var(--c1) 68%,var(--c2) 80%,transparent 100%);opacity:.55;animation:pulse 2.4s ease-in-out infinite}
.f-orbit{box-shadow:0 0 calc(var(--s)*.3) calc(var(--s)*-.05) var(--c1)}
.f-orbit::after{inset:calc(var(--s)*-.22);z-index:2;background:radial-gradient(circle at 50% 3%,#fff 0 5%,transparent 7%),radial-gradient(circle at 97% 50%,var(--c2) 0 4.5%,transparent 6.5%),radial-gradient(circle at 18% 90%,var(--c3) 0 4.5%,transparent 6.5%),radial-gradient(circle at 5% 30%,var(--c4) 0 3.5%,transparent 5.5%);animation:spin calc(var(--sp)*2.2) linear infinite reverse}
.f-dash{padding:calc(var(--s)*.13)}
.f-dash::before{background:repeating-conic-gradient(var(--c1) 0 12deg,var(--c3) 12deg 24deg)}
.fe{position:absolute;top:calc(var(--s)*-.2);right:calc(var(--s)*-.14);font-size:calc(var(--s)*.4);line-height:1;font-style:normal;filter:drop-shadow(0 1px 2px rgba(0,0,0,.4));animation:bob 2.4s ease-in-out infinite;z-index:3;pointer-events:none}
.fe.fc{right:auto;left:50%;top:calc(var(--s)*-.36);animation:bobc 2.4s ease-in-out infinite}
:root[data-perf=low] .fx::before,:root[data-perf=low] .fx::after,:root[data-perf=low] .fe{animation:none!important}
@media (prefers-reduced-motion:reduce){.fx::before,.fx::after,.fe{animation:none!important}}
.fg{gap:16px 10px}.ft{padding-top:24px}
</style>`);
