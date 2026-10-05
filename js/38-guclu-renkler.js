// v24: Efektsiz ve renk değiştiren temaların paletleri güçlendirildi (zemin artık sönük beyaz/siyah değil, her tema belirgin bir renkte).
// Şafak/Şeker'deki parlama: katmanlar opak pastel renkle %0↔%100 açılıp kapanıyordu; artık yarı saydam ve yumuşak geçişli.
// Tablet: hareketli katmanlar ekrandan taşan (inset:-25%) + will-change ile sağda siyah şerit bırakıyordu; artık ekranla aynı boyutta.
(function(){
// [zemin, panel RGB, yazı, soluk, vurgu, vurgu yazısı, m1, m2, m3]
const P={
light:['#e1e7fb','255,255,255','#12151f','#566078','#3345d6','#fff','#a9b8ff','#ffb3d4','#9fdcff'],
dark:['#0b1030','22,28,62','#eef1f8','#97a3c4','#8ea2ff','#0b0f1a','rgba(88,101,242,.55)','rgba(168,85,247,.38)','rgba(14,165,233,.34)'],
sakura:['#ffcfe0','255,243,247','#4a2b36','#94566e','#d6246a','#fff','#ff9fc2','#ffc9a6','#d8b4fe'],
lavanta:['#d6c8ff','250,247,255','#2a2146','#6a5c9a','#6d3fe8','#fff','#b79cff','#8ec5ff','#ffa6e0'],
nane:['#b9eed5','243,255,250','#0d3a2f','#3f7f6e','#08956f','#fff','#6fdcb2','#7fe3e0','#d2f27a'],
orman:['#c1e2b4','245,252,241','#1d3523','#4f7a5a','#2f8a47','#fff','#8fd07a','#e8dc8a','#7cc9a8'],
deniz:['#06364f','10,66,92','#e6f6fb','#8fc4d8','#3ec6c0','#06222b','rgba(34,211,238,.5)','rgba(59,130,246,.45)','rgba(16,185,129,.4)'],
gunbatimi:['#3d1748','74,34,92','#fff0e3','#d6b3cc','#ff8a5c','#2a1220','rgba(251,113,133,.52)','rgba(251,146,60,.46)','rgba(168,85,247,.5)'],
kahve:['#3b2315','72,48,34','#f4e8dc','#c2a893','#e8b070','#24170d','rgba(217,160,102,.44)','rgba(194,98,20,.4)','rgba(150,70,20,.46)'],
buz:['#b5e0fa','243,250,255','#0f2a3d','#47748f','#0284c7','#fff','#7cc7f5','#c6e3ff','#b4b8ff'],
limon:['#fff09a','255,252,230','#3a3210','#7c7330','#c99200','#2a2100','#ffe14d','#c8f26a','#ffc58a'],
mercan:['#ffc8b6','255,246,242','#4a2620','#9a5d52','#e0482a','#fff','#ff9a80','#ffd08a','#ffa6c9'],
gece:['#0b1360','24,36,100','#e9edff','#9ba7de','#7aa2ff','#07102b','rgba(59,130,246,.52)','rgba(99,102,241,.46)','rgba(14,165,233,.36)'],
zumrut:['#04432e','8,72,52','#e6fff4','#8fcbb2','#34d399','#03241a','rgba(16,185,129,.5)','rgba(20,184,166,.42)','rgba(132,204,22,.32)'],
aurora:['#052a40','10,46,66','#e8fbff','#8fc4d6','#5eead4','#04211d','rgba(94,234,212,.4)','rgba(139,92,246,.34)','rgba(56,189,248,.3)'],
nebula:['#1a0a3a','46,24,86','#f5eeff','#b8a5da','#c4a1ff','#1a0d33','rgba(167,139,250,.42)','rgba(244,114,182,.34)','rgba(251,146,60,.26)'],
seker:['#ffd6ec','255,246,251','#2d2340','#78689a','#8b5cf6','#fff','rgba(255,170,215,.6)','rgba(150,190,255,.55)','rgba(170,235,170,.55)'],
siber:['#140828','40,16,70','#f3eaff','#b8a3df','#22d3ee','#042a33','rgba(34,211,238,.4)','rgba(236,72,153,.36)','rgba(139,92,246,.36)'],
volkan:['#2c0d05','70,26,14','#fff0e6','#d6a893','#fb923c','#2a1005','rgba(239,68,68,.42)','rgba(251,146,60,.36)','rgba(234,179,8,.26)'],
safak:['#ffc4a3','255,244,238','#3a1a2e','#8a5470','#e8346e','#fff','rgba(255,140,80,.55)','rgba(255,90,150,.45)','rgba(140,110,255,.42)']};
// hareketli temaların ek katmanı (n1..n3): hepsi yarı saydam
const N={aurora:['rgba(34,197,94,.42)','rgba(236,72,153,.3)','rgba(250,204,21,.22)'],nebula:['rgba(56,189,248,.36)','rgba(251,191,36,.26)','rgba(232,121,249,.34)'],siber:['rgba(250,204,21,.28)','rgba(34,211,238,.34)','rgba(244,63,94,.3)'],volkan:['rgba(168,85,247,.32)','rgba(239,68,68,.38)','rgba(251,191,36,.3)'],seker:['rgba(255,205,70,.5)','rgba(110,220,170,.45)','rgba(240,130,255,.45)'],safak:['rgba(255,170,90,.5)','rgba(110,170,255,.4)','rgba(255,110,170,.45)']};
let c='';
for(const k in P){const t=TM[k],p=P[k];if(!t)continue;
  TM[k]=[t[0],t[1],p[0],p[1],p[2],p[3],p[4],p[5],p[6],p[7],p[8]].concat(t.length>11?t.slice(11):[]);
  const d=t[1];
  c+=':root[data-theme="'+k+'"]{--bg:'+p[0]+';--panel:rgba('+p[1]+','+(d?.7:.74)+');--fg:'+p[2]+';--dim:'+p[3]+';--ac:'+p[4]+';--acf:'+p[5]+';--m1:'+p[6]+';--m2:'+p[7]+';--m3:'+p[8]+(N[k]?';--n1:'+N[k][0]+';--n2:'+N[k][1]+';--n3:'+N[k][2]:'')+'}\n';
}
// varsayılan (tema seçilmemiş) açık/koyu
const L=P.light,D=P.dark,v=(p,d)=>'--bg:'+p[0]+';--panel:rgba('+p[1]+','+(d?.7:.74)+');--fg:'+p[2]+';--dim:'+p[3]+';--ac:'+p[4]+';--acf:'+p[5]+';--m1:'+p[6]+';--m2:'+p[7]+';--m3:'+p[8];
c+=':root:not([data-theme]){'+v(L,0)+'}@media (prefers-color-scheme:dark){:root:not([data-theme]){'+v(D,1)+'}}\n';
c+=`html{background:var(--bg)}
:root[data-anim="1"] body::before,:root[data-anim="1"] body::after,:root[data-anim="1"]::before{inset:0;will-change:auto}
@keyframes xf2{0%,100%{opacity:.2}50%{opacity:1}}
@keyframes dg1{from{transform:translate3d(-3%,-2%,0) scale(1.22)}to{transform:translate3d(3%,2%,0) scale(1.34)}}
@keyframes dg2{from{transform:translate3d(3%,2%,0) scale(1.34)}to{transform:translate3d(-3%,-2%,0) scale(1.22)}}
:root[data-anim="1"] body::after{animation:xf2 7s ease-in-out infinite,dg2 16s ease-in-out infinite alternate}
:root[data-anim="1"]::before{animation:xf2 7s ease-in-out -3s infinite,dg1 18s ease-in-out infinite alternate;opacity:.2}
:root[data-anim="1"] body::before{animation:dg1 14s ease-in-out infinite alternate}
html{overflow-x:clip}
:root[data-perf=low][data-anim="1"] body::after{animation:none!important}`;
document.head.insertAdjacentHTML('beforeend','<style id="thm2">'+c+'</style>');
const m=document.querySelector('meta[name=theme-color]'),t=document.documentElement.dataset.theme;if(m&&TM[t])m.content=TM[t][2];
})();
