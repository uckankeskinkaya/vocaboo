// v28: Çevrimdışı alıştırma. İnternet yokken (ya da sunucuya ulaşılamazken) Alıştırma, tarayıcıda saklanan kelime paketiyle çalışır.
// Puan/XP yoktur; sunucu isteyen modlar (Günlük, Seri, Online, Skor) nazikçe uyarır. Paket giriş yapınca bir kez indirilir (45-kelime-paketi.js).
(function(){
const kapali=()=>!navigator.onLine;
Object.assign(EN,{'Çevrimdışısın · alıştırma kayıtlı kelimelerle çalışır, puan ve XP yok':"You're offline · practice uses saved words, no points or XP",'Çevrimdışı alıştırma: puan ve XP yok':'Offline practice: no points or XP','Bu mod için internet gerekli. Alıştırma çevrimdışı açılır.':'This mode needs internet. Practice works offline.','Bağlantı geri geldi':'Back online','Çevrimdışı alıştırma için önce bir kez internetle giriş yapıp bekle (kelimeler indirilir).':'For offline practice, log in once with internet first (words are downloaded).'});
document.head.insertAdjacentHTML('beforeend','<style>#offb{position:fixed;left:0;right:0;top:0;z-index:90;text-align:center;font-size:12px;font-weight:700;padding:5px 10px;background:#f59e0b;color:#2a1800}html[data-off] #mDaily,html[data-off] #mStreak,html[data-off] #mOnline,html[data-off] #mLb{opacity:.45}</style>');
function durum(){
  const b=$('offb');
  if(kapali()){
    document.documentElement.dataset.off='1';
    if(!b)document.body.insertAdjacentHTML('beforeend','<div id="offb">Çevrimdışısın · alıştırma kayıtlı kelimelerle çalışır, puan ve XP yok</div>');
  }else{
    delete document.documentElement.dataset.off;if(b)b.remove();
  }
}
addEventListener('offline',()=>{durum()});
addEventListener('online',()=>{durum();toast('Bağlantı geri geldi');try{pkIndir()}catch(e){}});
durum();
// İnternet gerektiren modlar
document.addEventListener('click',e=>{
  if(!kapali())return;
  const t=e.target.closest&&e.target.closest('#mDaily,#mStreak,#mOnline,#mLb');
  if(!t)return;
  e.stopImmediatePropagation();e.preventDefault();toast('Bu mod için internet gerekli. Alıştırma çevrimdışı açılır.');
},true);
// Alıştırma: internet yoksa doğrudan yerel moda geç
const _ps=pStart;
pStart=async function(l){
  if(kapali()){PSV=false;PSVGERI=true;toast('Çevrimdışı alıştırma: puan ve XP yok');next();return}
  return _ps.apply(this,arguments);
};
// Yerel alıştırma kelimesini paketten seç (paket yoksa eski yerleşik liste kullanılır)
const goruldu=[new Set(),new Set(),new Set(),new Set(),new Set()];
{const _n=next;next=function(){
  if(mode==='practice'&&!(typeof SR!=='undefined'&&SR)&&typeof PK!=='undefined'&&PK&&PK.d){
    const L=PK.d.map((r,i)=>[r,i]).filter(([r])=>r[0]===lv&&/^[a-z]+$/.test(r[1]));
    if(L.length){
      let aday=L.filter(([r,i])=>!goruldu[lv].has(i));
      if(!aday.length){goruldu[lv].clear();aday=L}
      const [r,i]=aday[Math.floor(Math.random()*aday.length)];
      goruldu[lv].add(i);
      if(r[4])EX[r[1]]=r[4];
      W[lv].push(r[1]+'|'+r[2]);bag[lv]=[W[lv].length-1];
      try{return _n.apply(this,arguments)}finally{W[lv].pop()}
    }
  }
  return _n.apply(this,arguments);
}}
})();
