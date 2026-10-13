
// v7: XP ve seviye sistemi, seviyeyle açılan unvanlar, kozmetik kataloğu (hazırlık)
const lvXp=L=>10*L*(L-1),lvlOf=x=>Math.min(100,Math.floor((1+Math.sqrt(1+x/2.5))/2));
TT.length=0;TT.push([1,'Çaylak'],[5,'Meraklı'],[10,'Kelime Avcısı'],[20,'Usta'],[35,'Efsane'],[50,'Kelime Efendisi']);
function titleOf(P){const L=lvlOf((P&&P.xp)||0);let t=TT[0][1];TT.forEach(x=>{if(L>=x[0])t=x[1]});return t};
Object.assign(EN,{'Kelime Efendisi':'Word Master','(şu an)':'(current)'});
RX.unshift([/^Seviye (\d+) ile (.+)$/,(m,a,b)=>'Level '+a+' unlocks '+(EN[b]||b)],[/^Unvanlar seviyeyle açılır\. Şu an: Seviye (\d+)\.$/,'Titles unlock with levels. Now: Level $1.'],[/^Seviye atladın: (\d+)$/,'Level up: $1'],[/^Yeni unvan: (.+)$/,(m,a)=>'New title: '+(EN[a]||a)]);
function aTitles(){
  const xp=prof.xp||0,L=lvlOf(xp);
  panel('<p>Unvanlar seviyeyle açılır. Şu an: Seviye '+L+'.</p>'+TT.map((x,i)=>{
    const nx=TT[i+1],done=L>=x[0],cur=done&&(!nx||L<nx[0]);
    return '<div class="pl" style="flex-direction:column;align-items:stretch;gap:6px'+(cur?';border-color:var(--ac)':'')+'"><div style="display:flex;justify-content:space-between"><span><b>'+x[1]+'</b>'+(cur?'<small> (şu an)</small>':'')+'</span><span>'+(done?'Açık':'Seviye '+x[0])+'</span></div>'+(cur&&nx?'<div class="pbar" style="width:100%;margin:0"><i style="width:'+Math.round((xp-lvXp(L))/(lvXp(L+1)-lvXp(L))*100)+'%"></i></div>':'')+'</div>';
  }).join('')+btn('ob','Profil'));
  $('ob').onclick=aProfile;
};
function lvCheck(){
  if(!prof)return;const L=lvlOf(prof.xp||0),T=titleOf(prof),key='ka_lv_'+prof.id;let o=null;
  try{o=JSON.parse(localStorage.getItem(key));localStorage.setItem(key,JSON.stringify({L,T}))}catch(e){}
  if(!o)return;
  if(L>o.L){toast('Seviye atladın: '+L);sfx('badge');if(T!==o.T)setTimeout(()=>toast('Yeni unvan: '+T),1800)}
}
const _rh2=rHome;rHome=function(){_rh2();lvCheck()};
// Kozmetik kataloğu (örnek kayıtlar, henüz hiçbir yerde zorunlu değil). req: {lv}=seviye, {title}=unvan, {pts}=puanla alınır (sunucu tarafı sonra)
const UNL=[
{id:'frame:bronz',t:'frame',n:'Bronz çerçeve',req:{lv:5}},
{id:'frame:altin',t:'frame',n:'Altın çerçeve',req:{title:'Usta'}},
{id:'frame:neon',t:'frame',n:'Neon çerçeve',req:{pts:2000}},
{id:'theme:aurora',t:'theme',n:'Kutup ışığı',req:{lv:10}},
{id:'theme:nebula',t:'theme',n:'Nebula',req:{title:'Efsane'}}];
function unlocked(it,P){const L=lvlOf((P&&P.xp)||0),r=it.req;if(r.lv)return L>=r.lv;if(r.title){const x=TT.find(y=>y[1]===r.title);return !!x&&L>=x[0]}return((P&&P.owned)||[]).includes(it.id)}
