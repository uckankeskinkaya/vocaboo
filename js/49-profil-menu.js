// v31: Profil menüsü: uzun düğme listesi yerine bölümlü kutucuk ızgarası (Oyun / Görünüm / Hesap).
// Mevcut düğmeler (id'leri ve tıklama işlevleri) aynen korunur, sadece yeniden dizilir.
document.head.insertAdjacentHTML('beforeend',`<style>
.pmn{margin-bottom:12px}
.pmn h4{margin:12px 2px 6px;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--dim)}
.pmg{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.pmg .rw{flex-direction:column;justify-content:center;gap:4px;padding:8px 4px;min-height:62px;border:1px solid var(--line);border-radius:14px;background:var(--panel);text-align:center;font-size:12.5px;line-height:1.15}
.pmg .rw::after{display:none}
.pmg .rw span{width:auto;font-size:22px;line-height:1}
.sg3 .st{padding:6px 4px}.sg3 .st b{font-size:16px}.sg3 .st span{font-size:11px}.sg3{gap:6px;margin-bottom:8px}.pf-h{padding:12px 14px;margin-bottom:8px}.pmg .rw.dng{color:var(--bad,#d9534f)}
</style>`);
const PM=[
  ['Oyun',[['qgb','Görevler'],['qab','Başarılar'],['stb','İstatistik'],['nb','Defterim'],['bb','Rozetler'],['tb2','Unvanlar']]],
  ['Görünüm',[['pp','Fotoğraf'],['pv','Hazır avatar'],['fr','Çerçeve']]],
  ['Hesap',[['un','Kullanıcı adı'],['pwc','Şifre'],['lo','Çıkış yap']]]
];
{const _p=aProfile;aProfile=function(){
  _p.apply(this,arguments);
  const l=document.querySelector('.lst');if(!l||l.dataset.pm)return;
  l.dataset.pm='1';
  const kullanilan=new Set(),bol=[];
  PM.forEach(([ad,ids])=>{
    const g=document.createElement('div');g.className='pmg';
    ids.forEach(([id,t])=>{const b=l.querySelector('#'+id);if(!b)return;kullanilan.add(b);const ic=b.querySelector('span');b.innerHTML='';b.append(ic,document.createTextNode(t));if(id==='lo')b.classList.add('dng');g.append(b)});
    if(g.children.length)bol.push([ad,g]);
  });
  // başka dosyaların eklediği tanımsız düğmeler ilk bölüme
  l.querySelectorAll('.rw').forEach(b=>{if(!kullanilan.has(b)&&bol.length)bol[0][1].append(b)});
  const k=document.createElement('div');k.className='pmn';
  bol.forEach(([ad,g])=>{const h=document.createElement('h4');h.textContent=ad;k.append(h,g)});
  l.replaceWith(k);
}}
Object.assign(EN,{'Oyun':'Game','Görünüm':'Look','Hesap':'Account','Görevler':'Quests','Başarılar':'Achievements','İstatistik':'Stats','Unvanlar':'Titles','Fotoğraf':'Photo','Hazır avatar':'Avatar','Defterim':'Word book','Çerçeve':'Frame','Kullanıcı adı':'Username','Şifre':'Password','Çıkış yap':'Log out'});
