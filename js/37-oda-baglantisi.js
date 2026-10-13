// v25: Oda bağlantısı. Lobiden "Odaya davet et" ile bağlantı paylaşılır; bağlantıya (?oda=ABCD) basan giriş yaptıktan sonra doğrudan odaya katılır.
(function(){
Object.assign(EN,{'✓ Alabilirsin':'✓ You can afford it','Odaya davet et':'Invite to room','Davet bağlantısı kopyalandı':'Invite link copied','Bağlantı kopyalanamadı':'Could not copy the link','Odaya katılmak için giriş yap':'Sign in to join the room','Odaya katılıyorsun':'Joining the room'});
RX.push([/^Odaya katılıyorsun: (.+)$/,'Joining room: $1']);
const KOD=/^[A-Za-z0-9]{4}$/;
let bekleyen=null;
try{const c=new URLSearchParams(location.search).get('oda');if(c&&KOD.test(c))bekleyen=c.toUpperCase()}catch(e){}
const temizle=()=>{try{const u=new URL(location.href);u.searchParams.delete('oda');history.replaceState(null,'',u.pathname+(u.search||'')+u.hash)}catch(e){}};
if(bekleyen)temizle();
const davetUrl=k=>location.origin+location.pathname+'?oda='+encodeURIComponent(k);
window.odaDavetUrl=davetUrl;
const _ol=oLobby;oLobby=function(L){
  _ol(L);
  const ob=$('ob');if(!ob||!room)return;
  ob.insertAdjacentHTML('beforebegin',btn('osh','Odaya davet et'));
  $('osh').onclick=async()=>{
    const url=davetUrl(room);
    if(navigator.share){try{await navigator.share({title:'Vocaboo',text:'Vocaboo odasına katıl: '+room,url});return}catch(e){if(e&&e.name==='AbortError')return}}
    try{await navigator.clipboard.writeText(url);toast('Davet bağlantısı kopyalandı')}catch(e){toast('Bağlantı kopyalanamadı')}
  };
};
let uyardi=false;
const _rh=rHome;rHome=function(){
  _rh();
  if(!bekleyen)return;
  if(!prof){if(!uyardi){uyardi=true;toast('Odaya katılmak için giriş yap')}return}
  if(!window.supabase||typeof SB_URL==='undefined'||SB_URL.indexOf('PASTE')===0)return;
  const k=bekleyen;bekleyen=null;
  $('home').hidden=true;$('online').hidden=false;
  sb=sb||supabase.createClient(SB_URL,SB_KEY);myName=prof.username;
  toast('Odaya katılıyorsun: '+k);
  oJoin(k,false);
};
})();
