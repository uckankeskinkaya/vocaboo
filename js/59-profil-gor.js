// v39: Başkasının profilini görme. Arkadaşlar / Sınıf listesinde ve Skor tablosunda bir satıra dokununca o kullanıcının
// profil kartı açılır: avatar, çerçeve, seviye, unvan, istatistikler ve rozetler. Veri sunucudan (profile_view) gelir;
// bakiye, son görülme gibi özel bilgiler gösterilmez. Geri düğmesi geldiğin listeye döner.
// Ayrıca yönetici "Şüpheli raporu" puanlı ve nedenli yeni hâliyle burada.
(function(){
Object.assign(EN,{'Profil':'Profile','Doğruluk':'Accuracy','Çözülen kelime':'Solved words','Seri rekoru':'Streak record','En uzun seri':'Longest streak','Günlük seri':'Daily streak','İlk denemede':'First try','Katılım':'Joined','Öğretmen':'Teacher','Sınıf':'Class','Profil bulunamadı.':'Profile not found.','Profil yüklenemedi.':'Could not load profile.',
  'Yüksek':'High','Orta':'Medium','Şüpheli raporu':'Suspicious report','Şüpheli kimse yok 🎉':'No suspects 🎉'});
RX.push([/^Seviye (\d+)$/,'Level $1']);
document.head.insertAdjacentHTML('beforeend','<style>.ntx{margin:2px 0 10px;font-size:12.5px;line-height:1.45;color:var(--dim);font-weight:500}</style>');
let SON=null;
{const _f=aFriends;aFriends=function(t){SON=()=>_f.call(this,t);return _f.apply(this,arguments)}}
{const _b=aBoard;aBoard=function(t,c){SON=()=>_b.call(this,t,c);return _b.apply(this,arguments)}}
async function aPView(u,geri){
  if(!sb||!prof){aAuth('Profil görmek için giriş yap');return}
  panel('<p>Yükleniyor...</p>');
  let r;try{r=await sb.rpc('profile_view',{_u:u})}catch(e){r={error:e}}
  const P=r&&r.data;
  if(r.error||!P){panel('<p>'+(r.error?'Profil yüklenemedi.':'Profil bulunamadı.')+'</p>'+btn('ob','Geri'));$('ob').onclick=geri||(()=>aFriends('f'));return}
  const n=P.words_solved||0,t=n+(P.words_failed||0),xp=P.xp||0,L=lvlOf(xp),a=lvXp(L),b=lvXp(L+1),pct=L>=100?100:Math.round((xp-a)/(b-a)*100);
  const S=(x,y)=>'<div class="st"><b>'+x+'</b><span>'+y+'</span></div>';
  const tarih=(()=>{try{return new Date(P.joined).toLocaleDateString('tr-TR',{day:'numeric',month:'long',year:'numeric'})}catch(e){return ''}})();
  panel('<div class="pf-h">'+frameWrap(av(P.avatar,84),P.frame)+'<h2>'+esc(P.username)+(P.me?' (sen)':'')+'</h2><span class="chip">'+esc(titleOf(P))+'</span>'
    +(P.teacher?' <span class="chip">🎓 Öğretmen</span>':P.cls?' <span class="chip">Sınıf</span>':'')
    +'<div class="pbar"><i style="width:'+pct+'%"></i></div><small>Seviye '+L+'</small>'+(tarih?'<small>Katılım: '+esc(tarih)+'</small>':'')+'</div>'
    +'<div class="sg3">'+S(t?Math.round(n/t*100)+'%':'-','Doğruluk')+S(n,'Çözülen kelime')+S(n?Math.round((P.first_try||0)/n*100)+'%':'-','İlk denemede')+S(P.best_score||0,'Seri rekoru')+S(P.best_streak||0,'En uzun seri')+S(P.daily_streak||0,'Günlük seri')+'</div>'
    +bdHTML(P)+btn('ob','Geri'));
  $('ob').onclick=geri||(()=>aFriends('f'));
}
window.aPView=aPView;
// Satıra dokunma (içindeki düğmeler ayrı çalışır: 1v1 gibi)
$('online').addEventListener('click',e=>{
  const s=e.target.closest&&e.target.closest('[data-pu]');
  if(!s||e.target.closest('button,a,input'))return;
  const u=s.dataset.pu;if(!u)return;
  aPView(u,SON);
});
// --- Yönetici: puanlı şüpheli raporu
async function aAdSusYeni(){
  panel('<p>Yükleniyor...</p>');
  const r=await sb.rpc('admin_suspects');
  if(r.error){panel('<p>'+(typeof adErr==='function'?adErr(r):'Yapılamadı')+'</p>'+btn('ob','Geri'));$('ob').onclick=aAdmin;return}
  const l=r.data||[];
  panel('<p><b>Şüpheli raporu</b></p><p class="ntx">Sadece belirgin durumlar listelenir. İlk denemede çözme oranı yüksek (%70+, en az 15 kelime), kelime başına ortalama tahmin çok düşük, hiç yanılmama ve tahminler arası süre çok kısa (bot) birlikte puanlanır. Kartlara dokunarak kullanıcıyı açabilirsin.</p>'
    +(l.length?l.map(x=>'<button class="lvl" data-su="'+esc(x.u)+'" style="display:block;text-align:left;border-left:4px solid '+(x.lvl==='yuksek'?'var(--r)':'var(--o)')+'"><span style="display:flex;justify-content:space-between;gap:8px"><b>'+esc(x.u)+'</b><span class="bgt '+(x.lvl==='yuksek'?'yeni':'bakiliyor')+'">'+(x.lvl==='yuksek'?'Yüksek':'Orta')+' · '+x.sc+'</span></span><small style="display:block;margin-top:4px">'+(x.reasons||[]).map(esc).join('<br>')+'</small></button>').join(''):'<p>Şüpheli kimse yok 🎉</p>')
    +btn('ob','Geri'));
  $('ob').onclick=aAdmin;
  $('online').querySelectorAll('[data-su]').forEach(b=>b.onclick=()=>aAdUsers(b.dataset.su));
}
aAdSus=aAdSusYeni;
})();
