// v19: Günün ilk oyun bonusu. Puanı sunucu verir (stat_word); burada yalnız kart ve bildirim gösterilir.
(function(){
const gun=(d)=>new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Istanbul'}).format(d||new Date());
const dun=()=>gun(new Date(Date.now()-864e5));
const sonraki=p=>{const bs=p&&p.last_bonus===dun()?Math.min(+p.bonus_streak||0,6)+1:1;return {bs,pt:1000+(bs-1)*200}};
Object.assign(EN,{'Günün ilk oyun bonusu':'First game of the day bonus','Günlük ya da Seri modunda bir kelime bitir':'Finish one word in Daily or Streak mode','Bugünün bonusunu aldın':"You've claimed today's bonus",'Yarın gel, bonus büyüsün':'Come back tomorrow for more'});
RX.push([/^(\d+)\. gün$/,'Day $1'],[/^(\d+)\. gün · \+([\d.,]+) 🪙$/,'Day $1 · +$2 🪙'],[/^Bonus kazandın: \+([\d.,]+) 🪙$/,'Bonus earned: +$1 🪙'],[/^Art arda (\d+) gün$/,'$1 days in a row']);
document.head.insertAdjacentHTML('beforeend',`<style>
#gbonus{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:16px;border:1px solid var(--line);background:var(--panel);box-shadow:var(--sh)}
#gbonus .gi{font-size:26px;line-height:1}#gbonus div{flex:1;min-width:0}#gbonus b{display:block;font-size:14px}#gbonus small{display:block;color:var(--dim);font-size:12px;margin-top:2px}
#gbonus .gp{font-weight:800;font-size:14px;white-space:nowrap;color:var(--ac)}
#gbonus.ok{opacity:.85}#gbonus.ok .gp{color:var(--g)}
</style>`);
function kart(){
  const h=$('home');if(!h)return;let k=$('gbonus');
  if(!prof){if(k)k.remove();return}
  if(!k){k=document.createElement('div');k.id='gbonus';const r=h.querySelector('.rules');h.insertBefore(k,r||h.children[1]||null)}
  const al=prof.last_bonus===gun(),n=sonraki(prof);
  k.className=al?'ok':'';
  k.innerHTML=al?'<span class="gi">✅</span><div><b>Bugünün bonusunu aldın</b><small>Yarın gel, bonus büyüsün</small></div><span class="gp">'+(+prof.bonus_streak||1)+'. gün</span>'
    :'<span class="gi">🎁</span><div><b>Günün ilk oyun bonusu</b><small>Günlük ya da Seri modunda bir kelime bitir</small></div><span class="gp">'+n.bs+'. gün · +'+n.pt.toLocaleString()+' 🪙</span>';
  if(al)k.querySelector('.gp').textContent=(+prof.bonus_streak||1)+'. gün';
}
const _rh=rHome;rHome=function(){_rh();kart()};
const _lp=loadProf;loadProf=async function(){
  const once=prof?prof.last_bonus||null:undefined;
  await _lp();
  if(once!==undefined&&prof&&prof.last_bonus===gun()&&once!==prof.last_bonus){
    const bs=+prof.bonus_streak||1;toast('Bonus kazandın: +'+(1000+(bs-1)*200).toLocaleString()+' 🪙');
  }
};
})();
