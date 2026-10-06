// v28: Kelime paketi (tüm kelimeler + Türkçe karşılıkları) ve Türkçe öğrenme özellikleri.
// - Kelime defteri / "Kelimeler" listesinde her kelimenin Türkçesi görünür.
// - Alıştırma modunda açıklama dili seçilebilir (Ayarlar): İngilizce / Türkçe / İkisi.
// Paket giriş yapınca sunucudan (words_pack) bir kez indirilir, tarayıcıda saklanır; çevrimdışı alıştırma da bunu kullanır.
const PK_KEY='ka_pack',PK_GUN=7;
let PK=null,TRD={},DTRD={};
function pkIndeks(){TRD={};DTRD={};if(PK)PK.d.forEach(r=>{const k=String(r[1]).toLowerCase();TRD[k]=r[3]||'';DTRD[k]=r[5]||''})}
function pkYukle(){try{const o=JSON.parse(localStorage.getItem(PK_KEY));if(o&&o.v===2&&Array.isArray(o.d)&&o.d.length>1000){PK=o;pkIndeks()}}catch(e){}}
async function pkIndir(zorla){
  if(!sb||!prof||!navigator.onLine)return false;
  if(!zorla&&PK&&Date.now()-PK.t<PK_GUN*864e5)return true;
  try{
    const r=await sb.rpc('words_pack');
    if(r.error||!Array.isArray(r.data)||r.data.length<1000)return false;
    PK={t:Date.now(),d:r.data,v:2};pkIndeks();
    try{localStorage.setItem(PK_KEY,JSON.stringify(PK))}catch(e){}
    return true;
  }catch(e){return false}
}
const dtrOf=w=>DTRD[String(w||'').toLowerCase()]||'';
const trOf=w=>{const t=TRD[String(w||'').toLowerCase()];return t||''};
pkYukle();
{const _lp=loadProf;loadProf=async function(){const r=await _lp.apply(this,arguments);setTimeout(()=>pkIndir(),800);return r}}

// --- Kelime defteri ve oyun sonu kelime listesi: Türkçe satırı
{const _w=wrow;wrow=function(x,rm){
  const h=_w(x,rm),t=x.tr||trOf(x.w);
  return t?h.replace('</div><small>','</div><small style="color:var(--g);font-weight:700">'+esc(t)+'</small><small>'):h;
}}

// --- Alıştırma: cümle İngilizce açılır; takılınca "TR" düğmesi o cümleyi Türkçeye çevirir (tekrar basınca İngilizceye döner)
Object.assign(EN,{'Türkçesi:':'Turkish:','Bu cümleyi Türkçe göster':'Show this sentence in Turkish','Türkçe karşılık bulunamadı':'No Turkish translation found'});
const TRC={t:'',en:'',tr:false};
function trBtn(){
  let b=$('trbtn');
  if(!b){b=document.createElement('button');b.id='trbtn';b.hidden=true;b.textContent='TR';b.setAttribute('aria-label','Bu cümleyi Türkçe göster');
    b.style.cssText='width:48px;border-radius:16px;border:1px solid var(--g);background:transparent;color:var(--g);font-size:15px;font-weight:800';
    $('hintbtn').insertAdjacentElement('beforebegin',b);
    b.onclick=()=>{
      if(!TRC.t){toast('Türkçe karşılık bulunamadı');return}
      const cap=x=>x.charAt(0).toUpperCase()+x.slice(1),harf='<small>'+word.length+' harf</small>';
      TRC.tr=!TRC.tr;
      $('def').innerHTML=TRC.tr?cap(TRC.t)+'.'+harf:TRC.en;
      b.style.background=TRC.tr?'var(--g)':'transparent';b.style.color=TRC.tr?'#fff':'var(--g)';
    };
  }
  return b;
}
{const _n=next;next=function(){
  const tr=(typeof SR!=='undefined'&&SR&&(SR.dtr||SR.tr))||null;
  _n.apply(this,arguments);
  const b=trBtn();
  if(mode!=='practice'){b.hidden=true;return}
  TRC.t=tr||dtrOf(word)||trOf(word)||'';TRC.en=$('def').innerHTML;TRC.tr=false;
  b.hidden=!TRC.t;b.style.background='transparent';b.style.color='var(--g)';
}}
{const _f=finish;finish=function(){
  _f.apply(this,arguments);
  if(mode!=='practice')return;
  const t=trOf(word);if(!t||$('trres'))return;
  $('res').insertAdjacentHTML('afterbegin','<div id="trres" style="color:var(--g);font-weight:700;margin-bottom:2px">Türkçesi: '+esc(t)+'</div>');
}}
