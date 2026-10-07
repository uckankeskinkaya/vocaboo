// v27: Giriş denemesi sınırı (kaba kuvvet / şifre tahmini). 5 yanlış denemeden sonra bekleme: 30 sn, sonra katlanarak en çok 15 dk.
// Cihaz tarafında çalışır; asıl sunucu sınırı Supabase Auth hız sınırıdır (Panel → Authentication → Rate Limits).
(function(){
const K='ka_gdeneme',LIM=5,YANLIS='Kullanıcı adı ya da şifre yanlış.';
const oku=()=>{try{return JSON.parse(localStorage.getItem(K))||{n:0,t:0}}catch(e){return{n:0,t:0}}};
const yaz=v=>{try{localStorage.setItem(K,JSON.stringify(v))}catch(e){}};
const bekle=()=>{const s=oku();return Math.max(0,Math.ceil((s.t-Date.now())/1000))};
Object.assign(EN,{'Çok fazla yanlış deneme. Biraz bekle.':'Too many wrong attempts. Please wait.'});
RX.push([/^Çok fazla yanlış deneme\. (\d+) sn sonra tekrar dene\.$/,'Too many wrong attempts. Try again in $1 s.']);
const _g=aGo;
aGo=async function(reg){
  if(!reg){
    const b=bekle();
    if(b>0){const e=$('ae');if(e)e.textContent='Çok fazla yanlış deneme. '+b+' sn sonra tekrar dene.';return}
  }
  await _g(reg);
  if(reg)return;
  const e=$('ae');
  if(e&&e.textContent===YANLIS){
    const s=oku();s.n++;
    if(s.n>=LIM){const katman=s.n-LIM;s.t=Date.now()+Math.min(900,30*Math.pow(2,katman))*1000}
    yaz(s);
    if(s.n>=LIM)e.textContent='Çok fazla yanlış deneme. '+bekle()+' sn sonra tekrar dene.';
  }else if(typeof prof!=='undefined'&&prof){yaz({n:0,t:0})}
};
})();
