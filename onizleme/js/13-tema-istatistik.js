
// v4: minimal arayüz kabuğu, gradyan ve hareketli temalar, günün kelimesi istatistiği
// Tema: [ad, koyu?, zemin, panel RGB, yazı, soluk, vurgu, vurgu yazısı, renk1, renk2, renk3, hareketli?]
const TM={
light:['Aydınlık',0,'#f3f5fb','255,255,255','#12151f','#667085','#3b4fd8','#fff','#c7d2fe','#fbcfe8','#bae6fd'],
dark:['Karanlık',1,'#0a0d16','24,29,44','#eef1f8','#8a94a8','#8ea2ff','#0b0f1a','rgba(88,101,242,.38)','rgba(168,85,247,.24)','rgba(14,165,233,.22)'],
amoled:['Amoled',1,'#000','16,16,20','#f2f2f2','#8a8a90','#fff','#000','rgba(255,255,255,.08)','rgba(130,130,255,.09)','rgba(255,255,255,.05)'],
sakura:['Sakura',0,'#fff5f8','255,255,255','#4a2b36','#a07585','#e0457b','#fff','#ffd1e0','#ffe4c7','#e9d5ff'],
lavanta:['Lavanta',0,'#f7f4ff','255,255,255','#2a2146','#7a6fa3','#7c5cf0','#fff','#ddd0ff','#c7e0ff','#ffd0ee'],
nane:['Nane',0,'#effbf6','255,255,255','#123b32','#5f9285','#0fa77c','#fff','#b9f0d9','#c8f3f0','#e0f7a8'],
orman:['Orman',0,'#f1f7ee','255,255,255','#1d3523','#6b8c72','#3b8f5a','#fff','#cdeac0','#f3ecb4','#a8dcc2'],
deniz:['Deniz',1,'#061a26','13,47,64','#e6f6fb','#7fb0c4','#3ec6c0','#06222b','rgba(34,211,238,.3)','rgba(59,130,246,.26)','rgba(16,185,129,.22)'],
gunbatimi:['Gün batımı',1,'#1a1026','42,27,61','#fff0e3','#c8a5bd','#ff9b6b','#2a1220','rgba(251,113,133,.32)','rgba(251,146,60,.26)','rgba(168,85,247,.3)'],
kahve:['Kahve',1,'#1b1410','42,31,25','#f4e8dc','#b49a86','#e0a96d','#24170d','rgba(217,160,102,.26)','rgba(180,83,9,.22)','rgba(120,53,15,.32)'],
aurora:['Kutup ışığı',1,'#050d1a','12,26,44','#e8fbff','#7fb3c4','#5eead4','#04211d','rgba(94,234,212,.35)','rgba(139,92,246,.3)','rgba(56,189,248,.25)',1],
nebula:['Nebula',1,'#0b0716','28,18,48','#f5eeff','#a995c9','#c4a1ff','#1a0d33','rgba(167,139,250,.38)','rgba(244,114,182,.3)','rgba(251,146,60,.2)',1],
seker:['Şeker',0,'#fff7fb','255,255,255','#2d2340','#8a7aa6','#8b5cf6','#fff','#ffd6e8','#d6e6ff','#d9f7d6',1],
buz:['Buz',0,'#f0f8ff','255,255,255','#0f2a3d','#5b8299','#0ea5e9','#fff','#bae6fd','#e0f2fe','#c7d2fe'],
limon:['Limon',0,'#fffbe8','255,255,255','#3a3210','#8f8750','#f2c200','#2a2100','#fff3a8','#d9f99d','#fed7aa'],
mercan:['Mercan',0,'#fff6f2','255,255,255','#4a2620','#a8786f','#f2674a','#fff','#ffd2c4','#ffe7b8','#fbcfe8'],
gece:['Gece',1,'#070b1c','18,24,52','#e9edff','#8b95c4','#7aa2ff','#07102b','rgba(59,130,246,.34)','rgba(99,102,241,.3)','rgba(14,165,233,.18)'],
zumrut:['Zümrüt',1,'#04140f','12,40,32','#e6fff4','#7fb8a1','#34d399','#03241a','rgba(16,185,129,.33)','rgba(20,184,166,.26)','rgba(132,204,22,.18)'],
siber:['Siber',1,'#07050f','22,14,40','#f3eaff','#a48fcf','#22d3ee','#042a33','rgba(34,211,238,.34)','rgba(236,72,153,.3)','rgba(139,92,246,.3)',1],
volkan:['Volkan',1,'#120805','40,20,14','#fff0e6','#c49a85','#fb923c','#2a1005','rgba(239,68,68,.34)','rgba(251,146,60,.28)','rgba(234,179,8,.2)',1],
safak:['Şafak',0,'#fff8f3','255,255,255','#3d2a3a','#9a7f93','#f0568a','#fff','#ffd9c7','#fbcfe8','#d9d2ff',1]};
(function(){
  let c='',an=[];
  const blk=(s,t)=>s+'{--bg:'+t[2]+';--panel:rgba('+t[3]+','+(t[1]?.68:.72)+');--fg:'+t[4]+';--dim:'+t[5]+';--line:'+(t[1]?'rgba(255,255,255,.09)':'rgba(20,30,60,.09)')+';--key:'+(t[1]?'rgba(255,255,255,.07)':'rgba(20,30,60,.06)')+';--ac:'+t[6]+';--acf:'+t[7]+';--m1:'+t[8]+';--m2:'+t[9]+';--m3:'+t[10]+';--sh:'+(t[1]?'0 10px 30px rgba(0,0,0,.35)':'0 1px 2px rgba(16,24,40,.04),0 10px 30px rgba(16,24,40,.06)')+';color-scheme:'+(t[1]?'dark':'light')+'}';
  for(const k in TM){
    const t=TM[k],s=':root[data-theme="'+k+'"]';c+=blk(s,t);
    if(t[11])an.push(s+' body::after');
  }
  c+=an.join(',')+'{display:block;animation:xf 20s ease-in-out infinite;will-change:opacity}'+blk(':root:not([data-theme])',TM.light)+'@media (prefers-color-scheme:dark){'+blk(':root:not([data-theme])',TM.dark)+'}';
  document.head.insertAdjacentHTML('beforeend','<style id="thm">'+c+'</style>');
})();
document.head.insertAdjacentHTML('beforeend',`<style>
body{background:var(--bg)}
body::before{background:radial-gradient(60% 45% at 10% 0%,var(--m1),transparent 70%),radial-gradient(50% 40% at 100% 8%,var(--m2),transparent 70%),radial-gradient(70% 50% at 50% 112%,var(--m3),transparent 70%)}
.cd,.pl,.sc,.bi,.lvl,#def,.cfb,.vs-s,.grid,.mstat{-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px)}
#app{padding-top:10px;gap:10px}
h1{font-size:16px}#logo,.mark{width:28px;height:28px;border-radius:8px}
#score{background:transparent;border:0;color:var(--dim);font-size:12px;padding:4px 6px}
.greet h2{font-size:24px;margin:2px 0 0}.greet p{font-size:13px}
.rules{order:9;gap:6px}.rules span{font-size:11px;padding:3px 9px;background:transparent}
.feat{border:0;border-radius:20px;padding:16px 18px;background:linear-gradient(135deg,var(--ac),color-mix(in srgb,var(--ac) 62%,#7c3aed));box-shadow:var(--sh)}
.feat b{font-size:19px;letter-spacing:-.3px}.feat small{font-size:13px}
.feat .go{margin-top:12px;padding:6px 16px;font-size:12.5px}
.dst{display:flex;gap:18px;margin-top:12px;padding-top:12px;border-top:1px solid color-mix(in srgb,var(--acf) 22%,transparent)}
.dst span{font-size:11px;opacity:.85}.feat .dst b{display:block;font-size:20px}
.mstat{display:flex;border:1px solid var(--line);border-radius:16px;background:var(--panel);padding:10px 4px}
.mstat div{flex:1;text-align:center}.mstat b{display:block;font-size:18px;font-weight:800}.mstat span{font-size:11px;color:var(--dim)}
.grid{display:flex!important;flex-direction:column;gap:0!important;border:1px solid var(--line);border-radius:18px;background:var(--panel);overflow:hidden}
.grid .cd{display:grid;grid-template-columns:34px 1fr auto;grid-template-areas:"i t c" "i s c";column-gap:12px;align-items:center;border:0;border-bottom:1px solid var(--line);border-radius:0;background:transparent;box-shadow:none;padding:11px 14px}
.grid .cd:last-child{border-bottom:0}.grid .cd:hover{background:var(--key);border-color:var(--line)}
.grid .cd .ic{grid-area:i;margin:0;width:34px;height:34px;border-radius:10px;font-size:17px}
.grid .cd b{grid-area:t;font-size:15px}.grid .cd small{grid-area:s}
.grid .cd::after{content:'›';grid-area:c;color:var(--dim);font-size:22px}
#online,#menu{max-width:520px;width:100%;margin:0 auto}
.lvl{padding:12px 14px;font-size:14px;margin-bottom:6px;border-radius:14px;box-shadow:none}.lvl b{font-size:16px}
.pl{border-radius:14px;padding:10px 12px}.sc b{font-size:20px}
#online input,#online select,#menu select{padding:10px 12px!important;border-radius:12px!important;font-size:15px!important;background:var(--panel)!important}
#def{border-radius:16px;box-shadow:none}.k{box-shadow:none;border-radius:10px}
.tg{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:12px}
.tt{border:2px solid transparent;border-radius:16px;padding:0;overflow:hidden;background:var(--b);color:var(--f);text-align:left}
.tt i{display:block;height:54px;background:radial-gradient(70% 90% at 15% 20%,var(--p1),transparent 70%),radial-gradient(60% 80% at 90% 30%,var(--p2),transparent 70%),radial-gradient(70% 90% at 50% 110%,var(--p3),transparent 70%)}
.tt span{display:block;padding:8px 10px;font-weight:700;font-size:13px}.tt.cur{border-color:var(--a)}
@media (min-width:900px){
#app{max-width:1040px}
#home{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);grid-template-areas:"greet greet" "daily list" "stats list" "rules list";grid-template-rows:auto auto auto 1fr;gap:14px 24px;align-content:start}
#home>.greet{grid-area:greet}#home>#mDaily{grid-area:daily}#home>.mstat{grid-area:stats}#home>.grid{grid-area:list;align-self:start}#home>.rules{grid-area:rules;order:0}}
</style>`);
Object.assign(EN,{'tamamladı':'completed','bildi':'solved','oynuyor':'playing now','Çözülen kelime':'Words solved','Bugün bildin ✓':'Solved today ✓','Bugün tamamladın':'Finished today','Kutup ışığı':'Aurora','Şeker':'Candy','✦ Renkleri yavaşça değişen temalar':'✦ Colors shift slowly'});
// Günün kelimesi kartı: bugün kaç kişi tamamladı (sunucudaki daily_stats fonksiyonundan)
$('mDaily').innerHTML='<span class="tag">Günün kelimesi</span><b>Herkes aynı kelimeyi çözüyor</b><small id="dsm">Sadece 3 hak. Her gün yeni bir kelime.</small><div class="dst" id="dst" hidden><span><b id="dn1">0</b>tamamladı</span><span><b id="dn2">0</b>bildi</span><span><b id="dn3">0</b>oynuyor</span></div><span class="go">Oyna</span>';
$('mDaily').insertAdjacentHTML('afterend','<div id="mst" class="mstat" hidden></div>');
async function dailyStats(){
  const el=$('dst');if(!el||!sb||!prof)return;
  const r=await sb.rpc('daily_stats');if(r.error||!r.data){el.hidden=true;return}
  const d=r.data,n=+d.done||0,w=+d.win||0;
  $('dn1').textContent=n;$('dn2').textContent=n?Math.round(w/n*100)+'%':'-';$('dn3').textContent=+d.playing||0;el.hidden=false;
  $('dsm').textContent=d.me==='win'?'Bugün bildin ✓':d.me==='lose'?'Bugün tamamladın':'Sadece 3 hak. Her gün yeni bir kelime.';
}
function mstat(){
  const e=$('mst');if(!e)return;
  if(!prof){e.hidden=true;return}
  const ds=prof.last_daily&&prof.last_daily>=dStr(dayNum()-1)?prof.daily_streak:0;
  e.innerHTML=[[ds,'Günlük seri'],[prof.best_score,'Seri rekoru'],[lvlOf(prof.xp||0),'Seviye']].map(x=>'<div><b>'+x[0]+'</b><span>'+x[1]+'</span></div>').join('');e.hidden=false;
}
const _rh=rHome;rHome=function(){_rh();mstat();dailyStats()};
const _st=setTheme;setTheme=function(t){_st(t);const m=document.querySelector('meta[name=theme-color]');if(m&&TM[t])m.content=TM[t][2]};
mstat();
