// Maç odalarındaki oyuncu satırları: büyük avatar + çerçeve + isim + unvan + puan, tüm oda ekranlarında aynı.
// Çerçeve ve unvan oyuncunun bildirdiği değerden değil, gerçek profilinden (profiles: frame, xp) okunur;
// böylece sahip olunmayan çerçeve gösterilemez. Veri gelene kadar çerçeve/unvan boş görünür, gelince ekran yenilenir.
const OV={};let ovQ=new Set(),ovT=null,RES_LAST=null;
function ovGet(n){
  if(!n)return null;
  if(prof&&n===prof.username)return{fr:prof.frame||null,xp:prof.xp||0};
  if(OV[n])return OV[n];
  ovQ.add(n);if(!ovT)ovT=setTimeout(ovFetch,30);
  return null;
}
const ovTitle=n=>{const v=ovGet(n);return v?titleOf({xp:v.xp}):''};
async function ovFetch(){
  ovT=null;const names=[...ovQ].filter(n=>!OV[n]).slice(0,100);ovQ=new Set();
  if(!names.length||!sb)return;
  let r;try{r=await sb.from('profiles').select('username,frame,xp').in('username',names).limit(100)}catch(e){r=null}
  if(!r||r.error)return;
  (r.data||[]).forEach(p=>{OV[p.username]={fr:p.frame||null,xp:p.xp||0}});
  names.forEach(n=>{if(!OV[n])OV[n]={fr:null,xp:0}});   // profili olmayan adlar tekrar sorulmaz
  ovRefresh();
}
// Çerçeve/unvan geldikten sonra açık oda ekranını yeniden çiz.
function ovRefresh(){
  try{
    if(!ch||$('online').hidden&&$('game').hidden)return;
    if(!started){oLobby();return}
    if(modView){oModRender(rank(plist()));return}
    if($('game').hidden&&!$('online').hidden&&ost&&ost.fin){if(RES_LAST)oResView(RES_LAST);else if(!MSV)oResults();return}
    oLive();
  }catch(e){}
}
// Ortak oyuncu satırı. o: {n,im,rank,sc,sub,tag,me}. sc: sağdaki puan metni, sub: puanın altındaki küçük metin.
function oPlayerRow(o){
  const v=ovGet(o.n),ti=v?titleOf({xp:v.xp}):'';
  return '<div class="pr'+(o.rank?'':' nr')+(o.me?' me':'')+'">'+(o.rank?'<span class="pr-n">'+o.rank+'</span>':'')
    +'<span class="pr-a">'+frameWrap(av(o.im,44),v?v.fr:null)+'</span>'
    +'<span class="pr-u"><b>'+esc(o.n)+(o.me?' (sen)':'')+(o.tag?'<em class="pr-tag">'+esc(o.tag)+'</em>':'')+'</b>'+(ti?'<i class="pr-t">'+esc(ti)+'</i>':'')+'</span>'
    +(o.sc!=null?'<span class="pr-s">'+o.sc+(o.sub?'<small>'+o.sub+'</small>':'')+'</span>':'')+'</div>';
}
