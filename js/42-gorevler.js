// v28: Günlük görevler ve başarılar. İlerleme ve ödül tamamen sunucuda (quest_*/ach_* işlevleri); burası sadece gösterir.
(function(){
const QN={s3:'3 kelime çöz',s5:'5 kelime çöz',s10:'10 kelime çöz',s20:'20 kelime çöz',f1:'1 kelimeyi ilk denemede bil',f3:'3 kelimeyi ilk denemede bil',d1:'Günün kelimesini çöz',n8:'İpucu kullanmadan 8 kelime çöz'};
const AN={
w10:['Isınma','10 kelime çöz'],w50:['Kelime avcısı','50 kelime çöz'],w100:['Yüzlük','100 kelime çöz'],w250:['Kelime ustası','250 kelime çöz'],w500:['Kelime efendisi','500 kelime çöz'],w1000:['Bin kelimelik efsane','1000 kelime çöz'],
f1:['İlk vuruş','Bir kelimeyi ilk denemede bil'],f10:['Keskin göz','10 kelimeyi ilk denemede bil'],f50:['Nişancı','50 kelimeyi ilk denemede bil'],f150:['Kusursuz','150 kelimeyi ilk denemede bil'],
s5:['Seri başlangıcı','Seri modunda 5 kelimelik seri yap'],s10:['Seri avcısı','Seri modunda 10 kelimelik seri yap'],s20:['Durdurulamaz','Seri modunda 20 kelimelik seri yap'],
d3:['Alışkanlık','Günün kelimesini 3 gün üst üste çöz'],d7:['Haftalık düzen','Günün kelimesini 7 gün üst üste çöz'],d30:['Aylık efsane','Günün kelimesini 30 gün üst üste çöz'],
dw1:['Günün galibi','Günün kelimesini bir kez çöz'],dw10:['Günlük 10','Günün kelimesini 10 kez çöz'],dw30:['Günlük 30','Günün kelimesini 30 kez çöz'],
b7:['Bir haftalık bonus','7 gün üst üste günlük bonusu al'],
fr1:['İlk arkadaş','Bir arkadaş ekle'],fr5:['Kalabalık','5 arkadaşın olsun'],
th1:['Stil sahibi','Pazar\'dan ilk temayı al'],th5:['Koleksiyoncu','5 tema sahibi ol'],
x1000:['Yükselen','1000 XP kazan'],x5000:['Usta oyuncu','5000 XP kazan']};
const EN0={};
Object.entries(QN).forEach(([k,v])=>EN0[v]=({s3:'Solve 3 words',s5:'Solve 5 words',s10:'Solve 10 words',s20:'Solve 20 words',f1:'Get 1 word on the first try',f3:'Get 3 words on the first try',d1:"Solve today's word",n8:'Solve 8 words without hints'})[k]);
const ENA={w10:['Warm-up','Solve 10 words'],w50:['Word hunter','Solve 50 words'],w100:['Centurion','Solve 100 words'],w250:['Word master','Solve 250 words'],w500:['Word lord','Solve 500 words'],w1000:['Thousand-word legend','Solve 1000 words'],
f1:['First strike','Get a word on the first try'],f10:['Sharp eye','Get 10 words on the first try'],f50:['Sharpshooter','Get 50 words on the first try'],f150:['Flawless','Get 150 words on the first try'],
s5:['Streak starter','Make a 5-word streak in Streak mode'],s10:['Streak hunter','Make a 10-word streak in Streak mode'],s20:['Unstoppable','Make a 20-word streak in Streak mode'],
d3:['Habit','Solve the daily word 3 days in a row'],d7:['Weekly routine','Solve the daily word 7 days in a row'],d30:['Monthly legend','Solve the daily word 30 days in a row'],
dw1:['Winner of the day','Solve the daily word once'],dw10:['Daily 10','Solve the daily word 10 times'],dw30:['Daily 30','Solve the daily word 30 times'],
b7:['One-week bonus','Claim the daily bonus 7 days in a row'],fr1:['First friend','Add a friend'],fr5:['Crowd','Have 5 friends'],
th1:['Stylish','Buy your first theme in the Market'],th5:['Collector','Own 5 themes'],x1000:['Rising','Earn 1000 XP'],x5000:['Master player','Earn 5000 XP']};
Object.assign(EN,EN0);Object.entries(AN).forEach(([k,v])=>{EN[v[0]]=ENA[k][0];EN[v[1]]=ENA[k][1]});
Object.assign(EN,{'Görevler':'Quests','Günlük görevler':'Daily quests','Başarılar':'Achievements','Ödülü al':'Claim','Alındı':'Claimed','Üç görevi de bitirince ekstra ödül:':'Extra reward for finishing all three:','Ekstra ödülü al':'Claim bonus','Görevler her gün gece yarısı yenilenir.':'Quests refresh at midnight every day.','Ödül alındı':'Reward claimed','Henüz tamamlanmadı':'Not completed yet','Yüklenemedi, tekrar dene.':'Could not load, try again.','Görevler için giriş yap':'Log in for quests'});
const cl=e=>(e.cur>=e.goal);
const bar=(c,g)=>'<div style="height:6px;border-radius:99px;background:var(--line);overflow:hidden;margin-top:6px"><div style="height:100%;width:'+Math.min(100,Math.round(c/g*100))+'%;background:var(--g);border-radius:99px"></div></div>';
const row=(ad,desc,e,att)=>{
  const ok=cl(e);
  return '<div class="pl" style="align-items:center;gap:10px"><span style="min-width:0;flex:1"><b>'+esc(ad)+'</b>'+(desc?'<br><small style="color:var(--dim)">'+esc(desc)+'</small>':'')+'<small style="display:block;color:var(--dim);margin-top:2px">'+e.cur+'/'+e.goal+' · 🪙 '+e.rew.toLocaleString()+'</small>'+bar(e.cur,e.goal)+'</span>'
   +(e.claimed?'<span class="sbtn" style="opacity:.6">✓ Alındı</span>':ok?'<button class="sbtn" '+att+' style="background:var(--g);color:#fff;border-color:transparent">Ödülü al</button>':'<span class="sbtn" style="opacity:.5">🔒</span>')+'</div>'};
async function aQuests(tab){
  if(!sb||!prof){aAuth('Görevler için giriş yap');return}
  tab=tab||'g';panel('<p>Yükleniyor...</p>');
  const t=(id,x,on)=>'<button class="lvl" id="'+id+'" style="margin:0;justify-content:center'+(on?';border-color:var(--g)':'')+'">'+x+'</button>';
  const hd='<div style="display:flex;gap:8px;margin-bottom:10px">'+t('qt1','Günlük görevler',tab==='g')+t('qt2','Başarılar',tab==='b')+'</div>';
  const geri=()=>{$('ob').onclick=()=>aProfile()};
  let h;
  if(tab==='g'){
    const r=await sb.rpc('quest_list');
    if(r.error||!r.data){panel(hd+'<p>Yüklenemedi, tekrar dene.</p>'+btn('ob','Geri'));$('qt1').onclick=()=>aQuests('g');$('qt2').onclick=()=>aQuests('b');geri();return}
    const d=r.data;
    h=hd+d.q.map(e=>row(QN[e.k]||e.k,'',e,'data-q="'+esc(e.k)+'"')).join('')
      +'<div class="pl" style="align-items:center;gap:10px"><span style="flex:1"><b>🎁 Üç görevi de bitirince ekstra ödül:</b><br><small style="color:var(--dim)">🪙 '+d.bonus.toLocaleString()+'</small></span>'
      +(d.bonus_claimed?'<span class="sbtn" style="opacity:.6">✓ Alındı</span>':d.all_done?'<button class="sbtn" data-q="all" style="background:var(--g);color:#fff;border-color:transparent">Ekstra ödülü al</button>':'<span class="sbtn" style="opacity:.5">🔒</span>')+'</div>'
      +'<p class="cap">Görevler her gün gece yarısı yenilenir.</p>'+btn('ob','Geri');
  }else{
    const r=await sb.rpc('ach_list');
    if(r.error||!r.data){panel(hd+'<p>Yüklenemedi, tekrar dene.</p>'+btn('ob','Geri'));$('qt1').onclick=()=>aQuests('g');$('qt2').onclick=()=>aQuests('b');geri();return}
    const a=r.data.slice().sort((x,y)=>(x.claimed-y.claimed)||((cl(y)-cl(x)))||0);
    h=hd+a.map(e=>row((AN[e.k]||[e.k])[0],(AN[e.k]||[])[1]||'',e,'data-a="'+esc(e.k)+'"')).join('')+btn('ob','Geri');
  }
  panel(h);geri();
  $('qt1').onclick=()=>aQuests('g');$('qt2').onclick=()=>aQuests('b');
  document.querySelectorAll('[data-q]').forEach(b=>b.onclick=async()=>{b.disabled=true;const r=await sb.rpc('quest_claim',{_k:b.dataset.q});
    if(r.data&&r.data.ok){toast('+'+r.data.rew.toLocaleString()+' 🪙 Ödül alındı');try{await loadProf()}catch(e){}}else toast('Henüz tamamlanmadı');aQuests('g')});
  document.querySelectorAll('[data-a]').forEach(b=>b.onclick=async()=>{b.disabled=true;const r=await sb.rpc('ach_claim',{_k:b.dataset.a});
    if(r.data&&r.data.ok){toast('+'+r.data.rew.toLocaleString()+' 🪙 Ödül alındı');try{await loadProf()}catch(e){}}else toast('Henüz tamamlanmadı');aQuests('b')});
}
window.aQuests=aQuests;
// Ana ekran kartı: bugünkü görev ilerlemesi
document.head.insertAdjacentHTML('beforeend','<style>button.cd#mQuest{display:flex;flex-direction:row;align-items:center;justify-content:flex-start;gap:12px;text-align:left;width:100%;padding:12px 14px;min-height:0}#mQuest .qi{font-size:24px;margin:0}#mQuest>span:nth-child(2){text-align:left}#mQuest b{display:block;margin:0}#mQuest small{color:var(--dim);display:block;margin:0}#mQuest .qd{margin-left:auto;min-width:22px;height:22px;border-radius:99px;background:var(--g);color:#fff;font-size:12px;font-weight:800;display:grid;place-items:center;padding:0 6px}</style>');
function kart(){
  const h=$('home');if(!h||$('mQuest'))return;
  const f=h.querySelector('.feat');if(!f)return;
  f.insertAdjacentHTML('afterend','<button class="cd" id="mQuest"><span class="qi">🎯</span><span><b>Günlük görevler</b><small id="qS">Bugünkü 3 görevi tamamla, ödülleri topla</small></span><span class="qd" id="qD" hidden></span></button>');
  $('mQuest').onclick=()=>aQuests('g');
}
async function guncelle(){
  kart();const c=$('mQuest');if(!c)return;c.hidden=!(sb&&prof);if(c.hidden)return;
  try{const r=await sb.rpc('quest_list');if(r.error||!r.data)return;
    const d=r.data,bit=d.q.filter(e=>e.cur>=e.goal).length,al=d.q.filter(e=>e.claimed).length,bekle=d.q.filter(e=>e.cur>=e.goal&&!e.claimed).length+(d.all_done&&!d.bonus_claimed?1:0);
    $('qS').textContent=bit+'/3 tamamlandı';const dd=$('qD');dd.hidden=!bekle;dd.textContent=bekle||'';
  }catch(e){}
}
const _r=rHome;rHome=function(){_r.apply(this,arguments);guncelle()};
// Profil ekranına girişler
const _p=aProfile;
aProfile=function(){
  _p.apply(this,arguments);
  const b=$('pwc');if(!b||$('qgb'))return;
  b.insertAdjacentHTML('beforebegin','<button class="rw" id="qgb"><span>🎯</span>Görevler</button><button class="rw" id="qab"><span>🏆</span>Başarılar</button>');
  $('qgb').onclick=()=>aQuests('g');$('qab').onclick=()=>aQuests('b');
};
setTimeout(guncelle,1500);
})();
