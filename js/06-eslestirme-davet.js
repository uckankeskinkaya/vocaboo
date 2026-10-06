
let mmT=null,mmOn=false,auto=false,autoSent=false,invSeen=0;
document.body.insertAdjacentHTML('beforeend','<div id="cf" hidden><div class="cfb"><p id="cft"></p><div class="row2"><button id="cfn"></button><button id="cfy" class="m"></button></div></div></div>');
function cfAsk(t,y,n,fy,fn){
  $('cft').textContent=t;$('cfy').textContent=y;$('cfn').textContent=n;$('cf').hidden=false;
  $('cfy').onclick=()=>{$('cf').hidden=true;if(fy)fy()};
  $('cfn').onclick=()=>{$('cf').hidden=true;if(fn)fn()};
}
const _bk=$('back').onclick;
function exitMsg(){return mode==='online'?'Maçtan çıkarsan oyundan düşersin.':mode==='streak'?'Çıkarsan bu seri biter, puanın kaydedilir.':mode==='daily'?'Günlük oyun kaldığın yerden devam eder.':''}
$('back').onclick=()=>{if(!$('game').hidden&&!over&&mode!=='practice')cfAsk('Gerçekten çıkmak istiyor musun? '+exitMsg(),'Çık','Devam et',_bk);else _bk()};
function goBack(){if(!$('wv').hidden){$('wv').hidden=true;return}
  if(!$('cf').hidden){$('cfn').click();return}
  if(!$('game').hidden){$('back').click();return}
  if(!$('menu').hidden){$('toHome').click();return}
  if(!$('online').hidden)oExit();
}
history.replaceState({vb:0},'');history.pushState({vb:1},'');
addEventListener('popstate',()=>{
  const sub=!$('wv').hidden||!$('cf').hidden||!$('game').hidden||!$('menu').hidden||(!$('online').hidden&&prof);
  if(sub){history.pushState({vb:1},'');goBack();return}
  toast('Çıkmak için tekrar geri bas');
  setTimeout(()=>history.pushState({vb:1},''),2000);
});
addEventListener('keydown',e=>{if(e.key==='Escape'&&(!$('wv').hidden||!$('cf').hidden||!$('game').hidden||!$('menu').hidden||!$('online').hidden))goBack()});
addEventListener('beforeunload',e=>{if(!$('game').hidden&&!over&&mode!=='practice'){e.preventDefault();e.returnValue=''}});
async function tick(){
  if(!sb||!prof||document.hidden)return;
  const r=await sb.rpc('app_tick');if(r.error||!r.data)return;
  const d=r.data,b=$('fb');if(!window._ch){window._ch=1;champCheck()}if(!window._an){window._an=1;annCheck()}
  if(b){b.textContent=d.fr;b.hidden=!(d.fr>0)}
  if(d.inv&&d.inv.id!==invSeen&&$('game').hidden&&$('cf').hidden){
    invSeen=d.inv.id;sfx('badge');
    cfAsk(d.inv.u+' seni 1v1 maça davet ediyor.','Kabul et','Reddet',()=>invAccept(d.inv.id),()=>sb.rpc('invite_answer',{_id:d.inv.id,_acc:false}).then(()=>{}));
  }
}
function fbadge(){tick()}
setInterval(tick,8000);
async function invAccept(id){
  const r=await sb.rpc('invite_answer',{_id:id,_acc:true});
  if(r.error||!r.data){toast('Davetin süresi dolmuş.');return}
  myName=prof.username;auto=true;$('home').hidden=true;$('menu').hidden=true;$('online').hidden=false;oJoinG(r.data);
}
function oJoinG(code){
  oJoin(code,false);
  setTimeout(()=>{if(ch&&!started&&room===code&&!plist().some(x=>x.h))oExit('Rakip bağlantısı koptu, tekrar dene.')},10000);
}
async function oInvite(id,name){
  const A='ABCDEFGHJKMNPQRSTUVWXYZ23456789',rm=Array.from(crypto.getRandomValues(new Uint8Array(8)),b=>A[b%31]).join('');
  const r=await sb.rpc('invite_send',{_to:id,_room:rm});
  if(r.error){toast('Bağlantı hatası');return}
  if(r.data.err){toast({'aktif degil':'Bu kişi şu an aktif değil.','izin yok':'Sadece arkadaşını veya sınıftakini davet edebilirsin.','limit':'Çok fazla davet gönderdin, biraz bekle.'}[r.data.err]||'Davet gönderilemedi.');return}
  myName=prof.username;auto=true;cfg={max:2,m:'c',n:15,dur:0,l:-1};
  toast(name+' davet edildi, bekleniyor...');oJoin(rm,true);
}
function rndStop(){clearInterval(mmT);mmT=null;if(mmOn){mmOn=false;if(sb)sb.rpc('mm_cancel').then(()=>{})}auto=false}
async function oRandom(){
  if(!sb||!prof)return;
  myName=prof.username;mmOn=true;auto=true;
  on('<p>Rakip aranıyor...</p>'+btn('ob','İptal'));$('ob').onclick=()=>oExit();
  let mine=null,claimedAt=0;
  const step=async()=>{
    if(!mmOn)return;
    const r=await sb.rpc('mm_find',{_room:mine});
    if(!mmOn||r.error)return;
    const d=r.data;
    if(d.role==='guest'){
      clearInterval(mmT);mmT=null;mmOn=false;
      if(ch){sb.removeChannel(ch);ch=null}
      oJoinG(d.room);return;
    }
    if(d.role==='claimed'){
      if(!claimedAt)claimedAt=Date.now();
      if(Date.now()-claimedAt>12000)oExit('Rakip bağlanamadı, tekrar dene.');
      return;
    }
    if(!mine){mine=d.room;cfg={max:2,m:'c',n:15,dur:0,l:-1};oJoin(mine,true)}
  };
  await step();
  if(mmOn)mmT=setInterval(step,3000);
}
