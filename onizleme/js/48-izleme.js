// v30: Hata izleme. Beklenmeyen tarayıcı hataları sunucuya (log_error, hız sınırlı) kısa kayıt olarak gider; yönetici panelinde "Hata günlüğü".
const IZ={n:0,g:new Set()};
function izGonder(m,s){
  try{
    m=String(m||'').slice(0,300);if(!m||IZ.n>=5||IZ.g.has(m)||!sb||!navigator.onLine)return;
    if(/ResizeObserver|Script error\.?$|Non-Error promise/.test(m))return;
    IZ.g.add(m);IZ.n++;
    const v=((document.querySelector('script[src*="js/01-"]')||{}).src||'').split('v=')[1]||'';
    Promise.resolve(sb.rpc('log_error',{_m:m,_s:String(s||'').slice(0,200),_v:v})).catch(()=>{});
  }catch(e){}
}
addEventListener('error',e=>izGonder(e.message,(e.filename||'').split('/').pop()+':'+(e.lineno||'')));
addEventListener('unhandledrejection',e=>{const r=e.reason;izGonder((r&&r.message)||r,'promise')});
async function aAdErrors(){
  panel('<p>Yükleniyor...</p>');
  const r=await sb.rpc('admin_errors');
  if(r.error){panel('<p>'+adErr(r)+'</p>'+btn('ob','Geri'));$('ob').onclick=aAdmin;return}
  const l=r.data||[];
  panel('<p><b>Hata günlüğü</b> <small>(son 7 gün)</small></p>'+(l.length?l.map(x=>'<div class="lvl" style="display:block;text-align:left;font-size:13px"><b>'+esc(x.msg)+'</b><br><small>'+esc(x.src||'')+' · '+x.n+'× · '+esc(x.uname||'misafir')+' · '+new Date(x.ts).toLocaleString('tr-TR')+'</small></div>').join(''):'<p>Hata kaydı yok 🎉</p>')+btn('ob','Geri'));
  $('ob').onclick=aAdmin;
}
{const _a=aAdmin;aAdmin=function(){
  _a.apply(this,arguments);
  const a=$('ad4');if(!a||$('ad7'))return;
  a.insertAdjacentHTML('afterend',btn('ad7','Hata günlüğü'));$('ad7').onclick=aAdErrors;
}}
Object.assign(EN,{'Hata günlüğü':'Error log','Hata kaydı yok 🎉':'No errors 🎉'});
