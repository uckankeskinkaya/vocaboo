// v39: Başkasının profilini görme. Arkadaşlar / Sınıf listesinde ve Skor tablosunda bir satıra dokununca o kullanıcının
// profil kartı açılır: avatar, çerçeve, seviye, unvan, istatistikler ve rozetler. Veri sunucudan (profile_view) gelir;
// bakiye, son görülme gibi özel bilgiler gösterilmez. Geri düğmesi geldiğin listeye döner.
// Ayrıca yönetici "Şüpheli raporu" puanlı ve nedenli yeni hâliyle burada.
(function(){
Object.assign(EN,{'👋 Arkadaşlık isteği gönder':'👋 Send friend request','✓ Arkadaşsınız':'✓ You are friends','⏳ Arkadaşlık isteği gönderildi':'⏳ Friend request sent','👋 Sana arkadaşlık isteği gönderdi':'👋 Sent you a friend request','Arkadaşlıktan çıkar':'Remove friend','Kabul et':'Accept','Reddet':'Decline','Arkadaşlık isteği gönderildi':'Friend request sent','Arkadaş oldunuz 🎉':'You are friends now 🎉','İstek reddedildi':'Request declined','Arkadaşlıktan çıkarıldı':'Removed from friends','Çıkar':'Remove','Vazgeç':'Cancel','Kullanıcı bulunamadı.':'User not found.','Bu sensin.':"That's you.",'Zaten istek var veya arkadaşsınız.':'Already requested or friends.','Bekleyen çok isteğin var, birkaçı yanıtlanınca tekrar dene.':'You have too many pending requests, try again after some are answered.','Gönderilemedi.':'Could not send.','Profil':'Profile','Doğruluk':'Accuracy','Çözülen kelime':'Solved words','Seri rekoru':'Streak record','En uzun seri':'Longest streak','Günlük seri':'Daily streak','İlk denemede':'First try','Katılım':'Joined','Öğretmen':'Teacher','Sınıf':'Class','Profil bulunamadı.':'Profile not found.','Profil yüklenemedi.':'Could not load profile.',
  'Çevrimiçi':'Online','Yüksek':'High','Orta':'Medium','Şüpheli raporu':'Suspicious report','Şüpheli kimse yok 🎉':'No suspects 🎉'});
RX.push([/^(.+) ile arkadaş oldunuz 🎉$/,'You are friends with $1 🎉'],[/^(.+) arkadaşlıktan çıkarılsın mı\?$/,'Remove $1 from friends?']);
RX.push([/^Seviye (\d+)$/,'Level $1']);
document.head.insertAdjacentHTML('beforeend','<style>.act{display:inline-block;vertical-align:middle;width:11px;height:11px;margin:0 8px 0 2px;border-radius:50%;background:var(--g);box-shadow:0 0 0 0 color-mix(in srgb,var(--g) 55%,transparent);animation:actp 2s ease-out infinite}@keyframes actp{0%{box-shadow:0 0 0 0 color-mix(in srgb,var(--g) 55%,transparent)}70%,100%{box-shadow:0 0 0 7px transparent}}@media(prefers-reduced-motion:reduce){.act{animation:none}}.chip.onl{background:color-mix(in srgb,var(--g) 18%,var(--panel));color:var(--g);border:1px solid var(--g)}.chip.onl .act{width:8px;height:8px;margin:0 4px 0 0}.pvk{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;padding:12px 14px;border:1px solid var(--line);border-radius:16px;background:var(--panel);margin-bottom:10px}.pvf{font-weight:700;font-size:14px}.ntx{margin:2px 0 10px;font-size:12.5px;line-height:1.45;color:var(--dim);font-weight:500}</style>');
let SON=null;
{const _f=aFriends;aFriends=function(t){SON=()=>_f.call(this,t);return _f.apply(this,arguments)}}
// Skor tablosu sadece sınıfa açık: sınıf üyesi, öğretmen ve yönetici görür
Object.assign(EN,{'Skor tablosu sadece sınıf içindir.':'The leaderboard is for the class only.','Sınıf kodunla kayıt olduysan tablo açılır. Kodun yoksa öğretmenine sor.':'The leaderboard opens if you signed up with the class code. Ask your teacher if you do not have one.'});
{const _b=aBoard;aBoard=function(t,c){
  if(prof&&!(prof.cls||prof.teacher||prof.admin)){
    panel('<p><b>🏆 Skor tablosu</b></p><p>Skor tablosu sadece sınıf içindir.</p><p class="ntx">Sınıf kodunla kayıt olduysan tablo açılır. Kodun yoksa öğretmenine sor.</p>'+btn('ob','Ana menü'));
    $('ob').onclick=()=>oExit();return;
  }
  SON=()=>_b.call(this,t,c);return _b.apply(this,arguments)}}
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
    +(P.teacher?' <span class="chip">🎓 Öğretmen</span>':P.cls?' <span class="chip">Sınıf</span>':'')+(P.on?' <span class="chip onl"><i class="act"></i> Çevrimiçi</span>':'')
    +'<div class="pbar"><i style="width:'+pct+'%"></i></div><small>Seviye '+L+'</small>'+(tarih?'<small>Katılım: '+esc(tarih)+'</small>':'')+'</div>'
    +'<div class="sg3">'+S(t?Math.round(n/t*100)+'%':'-','Doğruluk')+S(n,'Çözülen kelime')+S(n?Math.round((P.first_try||0)/n*100)+'%':'-','İlk denemede')+S(P.best_score||0,'Seri rekoru')+S(P.best_streak||0,'En uzun seri')+S(P.daily_streak||0,'Günlük seri')+'</div>'
    +(P.me?'':arkBtn(P))+bdHTML(P)+btn('ob','Geri'));
  $('ob').onclick=geri||(()=>aFriends('f'));
  arkBagla(P,geri);
}
// Arkadaşlık: istek gönder / kabul-reddet / arkadaşlıktan çıkar
const AE={yok:'Kullanıcı bulunamadı.',kendin:'Bu sensin.',zaten:'Zaten istek var veya arkadaşsınız.','cok istek':'Bekleyen çok isteğin var, birkaçı yanıtlanınca tekrar dene.'};
function arkBtn(P){
  const r=P.rel;
  if(r==='friend')return '<div class="pvk"><span class="pvf">✓ Arkadaşsınız</span><button class="sbtn" id="pvx">Arkadaşlıktan çıkar</button></div>';
  if(r==='sent')return '<div class="pvk"><span class="pvf">⏳ Arkadaşlık isteği gönderildi</span></div>';
  if(r==='incoming')return '<div class="pvk"><span class="pvf">👋 Sana arkadaşlık isteği gönderdi</span><span><button class="sbtn" id="pva">Kabul et</button> <button class="sbtn" id="pvr">Reddet</button></span></div>';
  return btn('pvq','👋 Arkadaşlık isteği gönder');
}
function arkBagla(P,geri){
  const yenile=()=>aPView(P.username,geri);
  const q=$('pvq');
  if(q)q.onclick=async()=>{
    q.disabled=true;let r;try{r=await sb.rpc('friend_request',{_u:P.username})}catch(e){r={error:e}}
    const d=r.data;
    if(r.error||!d){q.disabled=false;toast('Bağlantı hatası');return}
    if(d.err){q.disabled=false;toast(AE[d.err]||'Gönderilemedi.');if(d.err==='zaten')yenile();return}
    toast(d.ok==='kabul'?P.username+' ile arkadaş oldunuz 🎉':'Arkadaşlık isteği gönderildi');
    yenile();
  };
  const resp=(acc)=>async()=>{const r=await sb.rpc('friend_respond',{_id:P.id,_acc:acc});if(r.error){toast('Bağlantı hatası');return}toast(acc?'Arkadaş oldunuz 🎉':'İstek reddedildi');yenile()};
  if($('pva'))$('pva').onclick=resp(true);
  if($('pvr'))$('pvr').onclick=resp(false);
  if($('pvx'))$('pvx').onclick=()=>cfAsk(P.username+' arkadaşlıktan çıkarılsın mı?','Çıkar','Vazgeç',async()=>{const r=await sb.rpc('friend_remove',{_id:P.id});if(r.error){toast('Bağlantı hatası');return}toast('Arkadaşlıktan çıkarıldı');yenile()});
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
