// v31: Profil menüsü: uzun düğme listesi yerine bölümlü kutucuk ızgarası (Oyun / Görünüm / Hesap).
// Mevcut düğmeler (id'leri ve tıklama işlevleri) aynen korunur, sadece yeniden dizilir.
document.head.insertAdjacentHTML('beforeend',`<style>
.sg3 .st{padding:6px 4px}.sg3 .st b{font-size:16px}.sg3 .st span{font-size:11px}.sg3{gap:6px;margin-bottom:8px}.pf-h{padding:12px 14px;margin-bottom:8px}
.pmb{display:flex;align-items:center;gap:12px;width:100%;padding:14px;border:1px solid var(--line);border-radius:16px;background:var(--panel);text-align:left;font-size:15px;font-weight:700;margin-top:4px}
.pmb span{font-size:22px}.pmb small{display:block;font-weight:500;color:var(--dim);font-size:12px;margin-top:2px}
.pmb::after{content:'›';margin-left:auto;color:var(--dim);font-size:22px}
.pmn h4{margin:14px 2px 6px;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--dim)}
.pmn .lst{margin-bottom:4px}
.pmn .rw small{display:block;font-weight:500;color:var(--dim);font-size:11.5px;margin-top:1px}
.pmn .rw.dng{color:var(--bad,#d9534f)}
</style>`);
// Menü grupları: [başlık, [[düğme id, kısa açıklama], ...]]
const PM=[
  ['İlerleme',[['qgb','Günlük görevler ve ödüller'],['qab','Kazandığın başarılar'],['stb','Detaylı oyun istatistikleri'],['tb2','Sonraki unvana ne kadar kaldı'],['bb','Tüm rozetler']]],
  ['Kelimeler',[['nb','Kaydettiğin kelimeler ve tekrar']]],
  ['Görünüm',[['pp','Galeriden kendi fotoğrafın'],['pv','Hazır karakterlerden birini seç'],['fr','Profil resmine çerçeve tak']]],
  ['Hesap',[['un','Sıralamada görünen adın'],['pwc','Yeni şifre belirle'],['lo','Bu cihazdan oturumu kapat']]]
];
let PMD=null;
{const _p=aProfile;aProfile=function(){
  _p.apply(this,arguments);
  const l=document.querySelector('.lst');if(!l)return;
  // düğmeleri (tıklama işlevleriyle birlikte) menü için sakla, profilde tek "Menü" düğmesi bırak
  PMD={};l.querySelectorAll('.rw').forEach(b=>{PMD[b.id]=b});
  const pf=$('pf');if(pf)PMD.pf=pf;
  const m=document.createElement('button');m.className='pmb';m.id='pmb';
  m.innerHTML='<span>☰</span><div>Menü<small>Görevler, avatar, hesap ayarları…</small></div>';
  l.replaceWith(m);m.onclick=aPMenu;
}}
function aPMenu(){
  if(!PMD){aProfile();return}
  panel('<p><b>Menü</b></p><div class="pmn" id="pmn"></div>'+btn('ob','Profile dön'));
  const k=$('pmn'),kul=new Set();
  const add=(g,id,t)=>{const b=PMD[id];if(!b)return;kul.add(id);const ic=b.querySelector('span'),ad=b.textContent.replace(ic.textContent,'').trim();b.innerHTML='';b.append(ic);const d=document.createElement('div');d.append(document.createTextNode(ad));const sm=document.createElement('small');sm.textContent=t;d.append(sm);b.append(d);if(id==='lo')b.classList.add('dng');g.append(b)};
  PM.forEach(([ad,ids])=>{
    const g=document.createElement('div');g.className='lst';
    ids.forEach(([id,t])=>add(g,id,t));
    if(!g.children.length)return;
    const h=document.createElement('h4');h.textContent=ad;k.append(h,g);
  });
  // başka dosyaların eklediği tanımsız düğmeler "Diğer" grubuna
  const dig=document.createElement('div');dig.className='lst';
  Object.keys(PMD).forEach(id=>{if(id!=='pf'&&!kul.has(id))dig.append(PMD[id])});
  if(dig.children.length){const h=document.createElement('h4');h.textContent='Diğer';k.append(h,dig)}
  if(PMD.pf)k.append(PMD.pf);
  $('ob').onclick=()=>aProfile();
}
window.aPMenu=aPMenu;
Object.assign(EN,{'Menü':'Menu','Görevler, avatar, hesap ayarları…':'Quests, avatar, account settings…','Profile dön':'Back to profile','İlerleme':'Progress','Kelimeler':'Words','Görünüm':'Look','Hesap':'Account','Diğer':'Other','Günlük görevler ve ödüller':'Daily quests and rewards','Kazandığın başarılar':'Achievements you earned','Detaylı oyun istatistikleri':'Detailed game stats','Sonraki unvana ne kadar kaldı':'Progress to the next title','Tüm rozetler':'All badges','Kaydettiğin kelimeler ve tekrar':'Saved words and review','Galeriden kendi fotoğrafın':'Your own photo','Hazır karakterlerden birini seç':'Pick a ready character','Profil resmine çerçeve tak':'Put a frame on your picture','Sıralamada görünen adın':'Name shown on leaderboards','Yeni şifre belirle':'Set a new password','Bu cihazdan oturumu kapat':'Sign out on this device'});
