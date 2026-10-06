// v28: Kelime paketi (tüm kelimeler + Türkçe karşılıkları) ve Türkçe öğrenme özellikleri.
// - Kelime defteri / "Kelimeler" listesinde her kelimenin Türkçesi görünür.
// - Alıştırma modunda açıklama dili seçilebilir (Ayarlar): İngilizce / Türkçe / İkisi.
// Paket giriş yapınca sunucudan (words_pack) bir kez indirilir, tarayıcıda saklanır; çevrimdışı alıştırma da bunu kullanır.
const PK_KEY='ka_pack',PK_GUN=7;
let PK=null,TRD={};
function pkIndeks(){TRD={};if(PK)PK.d.forEach(r=>{TRD[String(r[1]).toLowerCase()]=r[3]||''})}
function pkYukle(){try{const o=JSON.parse(localStorage.getItem(PK_KEY));if(o&&Array.isArray(o.d)&&o.d.length>1000){PK=o;pkIndeks()}}catch(e){}}
async function pkIndir(zorla){
  if(!sb||!prof||!navigator.onLine)return false;
  if(!zorla&&PK&&Date.now()-PK.t<PK_GUN*864e5)return true;
  try{
    const r=await sb.rpc('words_pack');
    if(r.error||!Array.isArray(r.data)||r.data.length<1000)return false;
    PK={t:Date.now(),d:r.data};pkIndeks();
    try{localStorage.setItem(PK_KEY,JSON.stringify(PK))}catch(e){}
    return true;
  }catch(e){return false}
}
const trOf=w=>{const t=TRD[String(w||'').toLowerCase()];return t||''};
pkYukle();
{const _lp=loadProf;loadProf=async function(){const r=await _lp.apply(this,arguments);setTimeout(()=>pkIndir(),800);return r}}

// --- Kelime defteri ve oyun sonu kelime listesi: Türkçe satırı
{const _w=wrow;wrow=function(x,rm){
  const h=_w(x,rm),t=x.tr||trOf(x.w);
  return t?h.replace('</div><small>','</div><small style="color:var(--g);font-weight:700">'+esc(t)+'</small><small>'):h;
}}

// --- Alıştırma: açıklama dili (en | tr | both)
const TD=()=>{try{return localStorage.getItem('ka_trdef')||'en'}catch(e){return'en'}};
const TDAD={en:'İngilizce',tr:'Türkçe',both:'İkisi birden'};
Object.assign(EN,{'Alıştırma açıklaması':'Practice clue','İngilizce':'English','Türkçe':'Turkish','İkisi birden':'Both','Türkçesi:':'Turkish:'});
RX.push([/^Alıştırma açıklaması: (İngilizce|Türkçe|İkisi birden)$/,(m,v)=>'Practice clue: '+({'İngilizce':'English','Türkçe':'Turkish','İkisi birden':'Both'})[v]]);
{const _n=next;next=function(){
  const tr=(typeof SR!=='undefined'&&SR&&SR.tr)||null;
  _n.apply(this,arguments);
  if(mode!=='practice')return;
  const t=tr||trOf(word);
  if(!t)return;
  const d=TD(),cap=s=>s.charAt(0).toUpperCase()+s.slice(1),harf='<small>'+word.length+' harf</small>';
  if(d==='tr')$('def').innerHTML=cap(t)+'.'+harf;
  else if(d==='both')$('def').innerHTML=cap(def)+'.<br><span style="color:var(--g);font-weight:700">'+esc(cap(t))+'</span>'+harf;
}}
{const _f=finish;finish=function(){
  _f.apply(this,arguments);
  if(mode!=='practice')return;
  const t=trOf(word);if(!t||$('trres'))return;
  $('res').insertAdjacentHTML('afterbegin','<div id="trres" style="color:var(--g);font-weight:700;margin-bottom:2px">Türkçesi: '+esc(t)+'</div>');
}}
{const _as=aSettings;aSettings=function(){
  _as.apply(this,arguments);
  const a=$('s5')||$('s2');if(!a||$('s7'))return;
  a.insertAdjacentHTML('afterend',btn('s7','Alıştırma açıklaması: '+TDAD[TD()]));
  $('s7').onclick=()=>{const s=['en','tr','both'];try{localStorage.setItem('ka_trdef',s[(s.indexOf(TD())+1)%3])}catch(e){}aSettings()};
}}
