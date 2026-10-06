// v34: Sınıf geri bildirimi düzeltmeleri.
// 1) 1v1 canlı skor: rakibin puanı ve çerçevesi oda kanalının presence verisine bağlıydı; kalabalık sınıfta presence olayları
//    düşünce puan 0 kalıyor, çerçeve görünmüyordu. Maç sırasında puanlar ve çerçeveler sunucudan (m_results) da okunur.
// 2) Aynı oda kanalı kapanmadan yeniden açılırsa supabase eski kanalı geri veriyor ve "presence callbacks after subscribe" hatası
//    oluşuyordu: yeni kanal açılmadan önce aynı adlı eski kanal listeden çıkarılır.
// 3) Rekabetçi modlarda (online, Arena, günlük, seri) metin seçme / kopyalama / sayfa çevirisi kapalı. Alıştırma serbest.
(function(){
Object.assign(EN,{'Öğretmen henüz sınıf kelimesi eklemedi.':"The teacher hasn't added class words yet.",'Bu seviyede kelime yok.':'No words at this level.'});

// --- 0) B2+ kaldırıldı (kelimeleri arşivde). Seviye numaraları sunucuyla aynı kalsın diye LV[3] durur, sadece gizlenir.
document.head.insertAdjacentHTML('beforeend','<style>#lvls .lvl[data-i="3"]{display:none}</style>');

Object.assign(EN,{'Sık kullanılan B2 kelimeleri':'Common B2 words'});

// --- 1) Sunucudan canlı skor (yalnızca 1v1, Arena hariç)
let LVS=null,LVT=null,LVB=false;
const canli=()=>!!(started&&ch&&cfg&&cfg.m!=='k'&&cfg.max===2&&typeof MSV!=='undefined'&&MSV&&sb&&room);
async function lvCek(){
  if(!canli()){lvDur();return}
  if(LVB)return;LVB=true;
  try{
    const r=await sb.rpc('m_results',{_room:room});
    const d=r&&r.data;
    if(d&&Array.isArray(d.players)&&canli()){
      LVS={};
      d.players.forEach(x=>{
        LVS[x.u]=x;
        // çerçeve sunucudaki gerçek profilden: presence'a gerek yok
        if(x.u&&!(prof&&x.u===prof.username))OV[x.u]={fr:x.fr||null,xp:(OV[x.u]&&OV[x.u].xp)||0};
      });
      if(!$('game').hidden)oLive();
    }
  }catch(e){}finally{LVB=false}
}
function lvDur(){clearInterval(LVT);LVT=null;LVS=null}
function lvBasla(){if(LVT)return;LVT=setInterval(lvCek,3000);setTimeout(lvCek,4200)}
const _pl=plist;plist=function(){
  const L=_pl();
  if(!LVS||!started)return L;
  const gor=new Set();
  L.forEach(x=>{const s=LVS[x.n];if(!s)return;gor.add(x.n);x.p=Math.max(+s.sc||0,x.p);x.w=Math.max(+s.w||0,x.w);if(!s.a)x.a=0;if(s.f)x.d=1});
  // presence'ta görünmeyen rakip (bağlantısı kopan) yine de sunucu verisiyle gösterilir
  Object.keys(LVS).forEach(u=>{const s=LVS[u];if(gor.has(u)||s.me)return;L.push({k:'s:'+u,n:String(u).slice(0,16),t:9e15,h:0,c:null,mo:0,q:+s.ng||0,p:+s.sc||0,w:+s.w||0,a:s.a?1:0,d:s.f?1:0,im:String(s.im||'').slice(0,6000),ti:'',fr:s.fr||''})});
  return L;
};
const _ob=oBegin;oBegin=function(pl){const r=_ob.apply(this,arguments);if(canli())lvBasla();return r};
const _oe=oExit;oExit=function(){lvDur();return _oe.apply(this,arguments)};
const _oj=oJoin;oJoin=function(){lvDur();return _oj.apply(this,arguments)};

// --- 2) Aynı adlı eski oda kanalını temizle
const _ok=oKanal;oKanal=function(code,ozel){
  try{
    const t='realtime:ka-'+code,rt=sb&&sb.realtime;
    const L=(sb&&sb.getChannels)?sb.getChannels():[];
    L.forEach(c=>{if(c&&c.topic===t&&c!==ch){try{c.unsubscribe()}catch(e){}try{if(rt&&Array.isArray(rt.channels))rt.channels=rt.channels.filter(x=>x!==c)}catch(e){}}});
  }catch(e){}
  return _ok(code,ozel);
};

// --- 3) Rekabetçi modlarda kopyalama engeli
document.head.insertAdjacentHTML('beforeend','<style>body.nocp #game,body.nocp #online,body.nocp #live{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}body.nocp input,body.nocp textarea{-webkit-user-select:text;user-select:text}</style>');
const rek=()=>{
  const g=$('game'),o=$('online');
  if(g&&!g.hidden&&typeof mode!=='undefined'&&mode!=='practice')return true;
  if(document.body.classList.contains('kmode')&&o&&!o.hidden)return true;
  return !!(o&&!o.hidden&&typeof started!=='undefined'&&started&&ch);
};
let son=false;
function nocp(){
  const a=rek();if(a===son)return;son=a;
  document.body.classList.toggle('nocp',a);
  // tarayıcının "sayfayı çevir" özelliği tanımları Türkçeye çevirmesin
  ['game','online','live'].forEach(id=>{const e=$(id);if(!e)return;if(a){e.setAttribute('translate','no');e.classList.add('notranslate')}else{e.removeAttribute('translate');e.classList.remove('notranslate')}});
  if(a)try{const s=getSelection();if(s)s.removeAllRanges()}catch(e){}
}
setInterval(nocp,400);
const engel=e=>{
  nocp();if(!son)return;
  const t=e.target;if(t&&t.closest&&t.closest('input,textarea'))return;
  e.preventDefault();
};
['copy','cut','contextmenu','selectstart','dragstart'].forEach(ev=>document.addEventListener(ev,engel,true));
})();
