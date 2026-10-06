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
  ['Hesap',[['pwc','Yeni şifre belirle'],['lo','Bu cihazdan oturumu kapat']]]
];
let PMD=null;
const PMX=new Set(['pp','pv','fr','un']); // avatara / isme taşındı
{const _p=aProfile;aProfile=function(){
  _p.apply(this,arguments);
  const l=document.querySelector('.lst');if(!l)return;
  // düğmeleri (tıklama işlevleriyle birlikte) menü için sakla, profilde tek "Menü" düğmesi bırak
  PMD={};l.querySelectorAll('.rw').forEach(b=>{PMD[b.id]=b});
  const pf=$('pf');if(pf)PMD.pf=pf;
  const m=document.createElement('button');m.className='pmb';m.id='pmb';
  m.innerHTML='<span>☰</span><div>Menü<small>Görevler, avatar, hesap ayarları…</small></div>';
  l.replaceWith(m);m.onclick=aPMenu;
  pfEkle();
}}
document.head.insertAdjacentHTML('beforeend',`<style>
.pfav{position:relative;cursor:pointer;border:0;background:none;padding:0;-webkit-tap-highlight-color:transparent}
.pfav i{position:absolute;right:-2px;bottom:-2px;width:28px;height:28px;border-radius:50%;background:var(--ac);color:#fff;display:grid;place-items:center;font-style:normal;font-size:14px;border:2px solid var(--panel)}
.pfnm{display:flex;align-items:center;gap:6px}
.pfed{border:1px solid var(--line);background:var(--panel);border-radius:50%;width:28px;height:28px;font-size:14px;padding:0;display:grid;place-items:center}
.pfpop{display:flex;flex-direction:column;gap:6px;width:min(280px,90%);margin:4px auto 2px}
.pfpop button{display:flex;align-items:center;gap:10px;padding:11px 14px;border:1px solid var(--line);border-radius:14px;background:var(--panel);font-size:14px;font-weight:600;text-align:left;opacity:0;transform:translateY(-8px) scale(.96);animation:pfin .26s cubic-bezier(.2,.9,.3,1.2) forwards}
.pfpop button:nth-child(2){animation-delay:.06s}.pfpop button:nth-child(3){animation-delay:.12s}
.pf-h .pfav>div:first-child,.pf-h .pfav>img{box-shadow:0 0 0 3px var(--ac)}
@keyframes pfin{to{opacity:1;transform:none}}
.unw{background:color-mix(in srgb,var(--o,#e8a33d) 18%,transparent);border:1px solid var(--o,#e8a33d);border-radius:12px;padding:10px 12px;font-size:13px;margin:6px 0}
@media(prefers-reduced-motion:reduce){.pfpop button{animation:none;opacity:1;transform:none}}
</style>`);
function pfEkle(){
  const h=document.querySelector('.pf-h');if(!h||$('pfav'))return;
  const av=h.firstElementChild,nm=h.querySelector('h2');if(!av||!nm)return;
  const b=document.createElement('button');b.className='pfav';b.id='pfav';b.setAttribute('aria-label','Profil görünümünü değiştir');
  av.replaceWith(b);b.append(av);b.insertAdjacentHTML('beforeend','<i>✎</i>');
  const w=document.createElement('div');w.className='pfnm';nm.replaceWith(w);w.append(nm);
  w.insertAdjacentHTML('beforeend','<button class="pfed" id="pfed" aria-label="Kullanıcı adını değiştir">✏️</button>');
  $('pfed').onclick=()=>aUsername();
  b.onclick=()=>{
    const o=$('pfpop');if(o){o.remove();return}
    const p=document.createElement('div');p.className='pfpop';p.id='pfpop';
    p.innerHTML='<button id="pf1"><span>🎭</span>Avatarını değiştir</button><button id="pf2"><span>📷</span>Profil fotoğrafı yükle</button><button id="pf3"><span>🖼️</span>Çerçeveni değiştir</button>';
    nm.closest('.pfnm').after(p);
    $('pf1').onclick=()=>aAvatar();$('pf2').onclick=()=>$('pf').click();$('pf3').onclick=()=>aFrames();
  };
}
{const _u=aUsername;aUsername=function(){
  _u.apply(this,arguments);
  const i=$('nu');if(i&&!$('unw'))i.insertAdjacentHTML('beforebegin','<div class="unw" id="unw">⚠️ Kullanıcı adını günde yalnızca 1 kez değiştirebilirsin. Dikkatli seç!</div>');
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
  Object.keys(PMD).forEach(id=>{if(id!=='pf'&&!PMX.has(id)&&!kul.has(id))dig.append(PMD[id])});
  if(dig.children.length){const h=document.createElement('h4');h.textContent='Diğer';k.append(h,dig)}
  if(PMD.pf)k.append(PMD.pf);
  $('ob').onclick=()=>aProfile();
}
window.aPMenu=aPMenu;
Object.assign(EN,{'Profil görünümünü değiştir':'Change profile look','Kullanıcı adını değiştir':'Change username','Avatarını değiştir':'Change avatar','Profil fotoğrafı yükle':'Upload profile photo','Çerçeveni değiştir':'Change frame','⚠️ Kullanıcı adını günde yalnızca 1 kez değiştirebilirsin. Dikkatli seç!':'⚠️ You can change your username only once a day. Choose carefully!','Menü':'Menu','Görevler, avatar, hesap ayarları…':'Quests, avatar, account settings…','Profile dön':'Back to profile','İlerleme':'Progress','Kelimeler':'Words','Görünüm':'Look','Hesap':'Account','Diğer':'Other','Günlük görevler ve ödüller':'Daily quests and rewards','Kazandığın başarılar':'Achievements you earned','Detaylı oyun istatistikleri':'Detailed game stats','Sonraki unvana ne kadar kaldı':'Progress to the next title','Tüm rozetler':'All badges','Kaydettiğin kelimeler ve tekrar':'Saved words and review','Galeriden kendi fotoğrafın':'Your own photo','Hazır karakterlerden birini seç':'Pick a ready character','Profil resmine çerçeve tak':'Put a frame on your picture','Sıralamada görünen adın':'Name shown on leaderboards','Yeni şifre belirle':'Set a new password','Bu cihazdan oturumu kapat':'Sign out on this device'});
