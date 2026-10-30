
// v8: seviye 100, hızlı renkli temalar, yeni rozetler, avatar çerçeveleri
TT.push([65,'Bilge'],[80,'Şampiyon'],[100,'Vocaboo Efsanesi']);
Object.assign(EN,{'Bilge':'Sage','Şampiyon':'Champion','Vocaboo Efsanesi':'Vocaboo Legend','Bronz':'Bronze','Gümüş':'Silver','Altın':'Gold','Alev':'Flame','Elmas':'Diamond','Neon':'Neon','Gökkuşağı':'Rainbow','Avatar çerçevesi':'Avatar frame','Çerçevesiz':'No frame','Çerçeve uygulandı':'Frame applied','Henüz açılmadı':'Not unlocked yet','Yakında':'Soon'});
RX.unshift([/^Unvan: (.+)$/,(m,a)=>'Title: '+(EN[a]||a)]);
// Hareketli temalar: daha doygun renkler ve üçüncü bir renk katmanı
const NS={aurora:['rgba(34,197,94,.42)','rgba(236,72,153,.3)','rgba(250,204,21,.2)'],nebula:['rgba(56,189,248,.36)','rgba(251,191,36,.24)','rgba(232,121,249,.34)'],siber:['rgba(250,204,21,.26)','rgba(34,211,238,.34)','rgba(244,63,94,.3)'],volkan:['rgba(168,85,247,.3)','rgba(239,68,68,.36)','rgba(251,191,36,.3)'],seker:['#ffe27a','#a7f3d0','#fbb6ff'],safak:['#ffc9a8','#bde0ff','#ffb3d1']};
const bo=c=>c.replace(/rgba\(([^)]+),([\d.]+)\)/,(m,a,b)=>'rgba('+a+','+Math.min(.62,b*1.5).toFixed(2)+')');
document.head.insertAdjacentHTML('beforeend','<style>'+Object.keys(NS).map(k=>':root[data-theme="'+k+'"]{--m1:'+bo(TM[k][8])+';--m2:'+bo(TM[k][9])+';--m3:'+bo(TM[k][10])+';--n1:'+NS[k][0]+';--n2:'+NS[k][1]+';--n3:'+NS[k][2]+'}').join('')+`
:root[data-anim="1"]::before{content:'';position:fixed;inset:-25%;pointer-events:none;opacity:0;background:radial-gradient(60% 45% at 80% 85%,var(--n1),transparent 70%),radial-gradient(50% 40% at 15% 70%,var(--n2),transparent 70%),radial-gradient(55% 45% at 55% 10%,var(--n3),transparent 70%);animation:xf 4.5s ease-in-out infinite -1.5s,drift 12s ease-in-out infinite alternate-reverse;will-change:opacity,transform}
:root[data-perf=low][data-anim="1"]::before{display:none}
@media (prefers-reduced-motion:reduce){:root::before{animation:none!important}.fr::before{animation:none!important}}
.fr{position:relative;display:inline-grid;place-items:center;padding:3px;border-radius:50%;isolation:isolate}
.fr::before{content:'';position:absolute;inset:0;border-radius:50%;background:var(--fg2);z-index:-1}
.fr.sp::before{animation:spin 3s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}
:root[data-perf=low] .fr::before{animation:none}
.pf-h .fr img,.pf-h .fr>div{box-shadow:none}
.fg{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:12px}
.ft{display:flex;flex-direction:column;align-items:center;gap:6px;padding:12px 4px;border:2px solid var(--line);border-radius:16px;background:var(--panel);font-size:12px}
.ft.cur{border-color:var(--ac)}.ft.lk{opacity:.5}.ft small{color:var(--dim);font-size:11px}
</style>`);
// Yeni rozetler
BD.push(
['100 kelime','📕',p=>p.words_solved>=100],['500 kelime','🎓',p=>p.words_solved>=500],['1000 kelime','🏛️',p=>p.words_solved>=1000],
['İlk denemede 100','🚀',p=>p.first_try>=100],['Seri 50','🌋',p=>p.best_streak>=50],
['3000 puan rekoru','💫',p=>p.best_score>=3000],['5000 puan rekoru','🌠',p=>p.best_score>=5000],
['Seviye 10','🔰',p=>lvlOf(p.xp||0)>=10],['Seviye 25','🛡️',p=>lvlOf(p.xp||0)>=25],['Seviye 50','⚔️',p=>lvlOf(p.xp||0)>=50],['Seviye 100','🐉',p=>lvlOf(p.xp||0)>=100],
['Günlük 50 gün','🌟',p=>p.best_daily_streak>=50],['25 günlük zafer','🌻',p=>p.daily_wins>=25],
['Seri oyuncusu','🎮',p=>p.streak_runs>=25],['Bağımsız','🦅',p=>p.words_solved>=100&&p.hints_used<=5]);
const lvf=()=>p=>lvlOf(p.xp||0);
Object.assign(BI,{
'100 kelime':['Toplam 100 kelimeyi doğru çöz.',p=>p.words_solved,100],'500 kelime':['Toplam 500 kelimeyi doğru çöz.',p=>p.words_solved,500],'1000 kelime':['Toplam 1000 kelimeyi doğru çöz.',p=>p.words_solved,1000],
'İlk denemede 100':['100 kelimeyi ilk tahminde bil.',p=>p.first_try,100],'Seri 50':['Seri Modunda üst üste 50 kelime bil.',p=>p.best_streak,50],
'3000 puan rekoru':['Seri Modunda tek oyunda 3000 puana ulaş.',p=>p.best_score,3000],'5000 puan rekoru':['Seri Modunda tek oyunda 5000 puana ulaş.',p=>p.best_score,5000],
'Seviye 10':['10. seviyeye ulaş.',lvf(),10],'Seviye 25':['25. seviyeye ulaş.',lvf(),25],'Seviye 50':['50. seviyeye ulaş.',lvf(),50],'Seviye 100':['Son seviye olan 100. seviyeye ulaş.',lvf(),100],
'Günlük 50 gün':['Günün kelimesini 50 gün üst üste bil.',p=>p.best_daily_streak,50],'25 günlük zafer':['Günün kelimesini toplam 25 kere bil.',p=>p.daily_wins,25],
'Seri oyuncusu':['Seri Modunu 25 kez başlat.',p=>p.streak_runs,25],'Bağımsız':['En az 100 kelime çöz ve en fazla 5 ipucu kullan.',null,0]});
// Avatar çerçeveleri (şablonlar). Seçim şimdilik sadece bu cihazda ve kendi profilinde görünür.
const FRM={
bronz:['Bronz','conic-gradient(#92400e,#f59e0b,#b45309,#fbbf24,#92400e)',0,{lv:5}],
gumus:['Gümüş','conic-gradient(#94a3b8,#f1f5f9,#64748b,#e2e8f0,#94a3b8)',0,{lv:15}],
altin:['Altın','conic-gradient(#f59e0b,#fde68a,#d97706,#fef3c7,#f59e0b)',0,{title:'Usta'}],
zumrut:['Zümrüt','conic-gradient(#059669,#6ee7b7,#047857,#34d399,#059669)',0,{lv:30}],
alev:['Alev','conic-gradient(#ef4444,#f97316,#fde047,#f97316,#ef4444)',1,{title:'Efsane'}],
elmas:['Elmas','conic-gradient(#22d3ee,#fff,#a5f3fc,#38bdf8,#fff,#22d3ee)',1,{title:'Kelime Efendisi'}],
neon:['Neon','conic-gradient(#f0abfc,#22d3ee,#a3e635,#f472b6,#f0abfc)',1,{pts:2000}],
gokkusagi:['Gökkuşağı','conic-gradient(red,orange,yellow,lime,cyan,blue,magenta,red)',1,{lv:100}]};
UNL.length=0;
Object.keys(FRM).forEach(k=>UNL.push({id:'frame:'+k,t:'frame',n:FRM[k][0],req:FRM[k][3]}));
UNL.push({id:'theme:aurora',t:'theme',n:'Kutup ışığı',req:{lv:10}},{id:'theme:nebula',t:'theme',n:'Nebula',req:{title:'Efsane'}});
const frameWrap=(h,k)=>typeof frameHtml==='function'?frameHtml(h,k):h;
const myFrame=()=>(prof&&prof.frame&&FRM[prof.frame])?prof.frame:'';
