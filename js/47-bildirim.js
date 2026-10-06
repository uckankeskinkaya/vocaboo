// v29: Bildirimler (Web Push). Ayarlar'dan açılır; sunucu günde en fazla 1 hatırlatma gönderir (18-20 arası).
// Abonelik bilgisi sadece sunucuda (push_subs, RLS kilitli) tutulur. Kapatınca abonelik silinir.
const BLD={};
function bdDestek(){return 'serviceWorker' in navigator&&'PushManager' in window&&'Notification' in window}
function bdKey(b){const p='='.repeat((4-b.length%4)%4),s=atob((b+p).replace(/-/g,'+').replace(/_/g,'/'));return Uint8Array.from(s,c=>c.charCodeAt(0))}
async function bdSub(){try{const r=await navigator.serviceWorker.ready;return await r.pushManager.getSubscription()}catch(e){return null}}
async function bdAc(){
  if(!prof||!sb){toast('Bildirim için giriş yapmalısın');return false}
  if(!bdDestek()){toast('Bu tarayıcı bildirimi desteklemiyor (iPhone: önce "Ana ekrana ekle")');return false}
  const iz=await Notification.requestPermission();
  if(iz!=='granted'){toast('Bildirim izni verilmedi');return false}
  try{
    const pub=await sb.rpc('push_pub');if(pub.error||!pub.data)throw 0;
    const r=await navigator.serviceWorker.ready;
    let s=await r.pushManager.getSubscription();
    if(!s)s=await r.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:bdKey(pub.data)});
    const j=s.toJSON(),k=j.keys||{};
    const q=await sb.rpc('push_save',{_e:j.endpoint,_p:k.p256dh,_a:k.auth});
    if(q.error)throw 0;
    bdYerel();
    return true;
  }catch(e){toast('Bildirim açılamadı');return false}
}
// Cihazda yerel bir bildirim göstererek izin + servis çalışanının çalıştığını doğrular (sunucudan bağımsız)
async function bdYerel(){try{const r=await navigator.serviceWorker.ready;await r.showNotification('Bildirimler açık ✅',{body:'Hatırlatmalar bu cihaza gelecek 🐥',icon:'icon-192.png',badge:'icon-192.png',tag:'vocaboo-yerel'})}catch(e){}}
// Tarayıcıda abonelik var ama sunucuda kayıt yoksa (kayıt sırasında hata, eski kayıt) sessizce yeniden kaydet
async function bdOnar(){
  try{
    if(!prof||!sb||!bdDestek()||Notification.permission!=='granted')return;
    const s=await bdSub();if(!s)return;
    const st=await sb.rpc('push_status',{_e:s.endpoint});
    if(!st.error&&st.data===false){const j=s.toJSON(),k=j.keys||{};await sb.rpc('push_save',{_e:j.endpoint,_p:k.p256dh,_a:k.auth})}
  }catch(e){}
}
async function bdKapat(){
  const s=await bdSub();
  if(s){try{if(sb&&prof)await sb.rpc('push_remove',{_e:s.endpoint})}catch(e){}try{await s.unsubscribe()}catch(e){}}
}
async function bdTest(){
  const s=await bdSub();if(!s){toast('Önce bildirimleri aç');return}
  try{
    const t=await sb.rpc('push_test');
    if(t.data==='bekle'){toast('Biraz bekle, sonra tekrar dene');return}
    if(t.data!=='ok'){toast('Bildirim aboneliği bulunamadı');return}
    const x=await sb.functions.invoke('push-gonder',{body:{test:true}});
    const d=x&&x.data;
    if(!d||x.error)toast('Sunucuya ulaşılamadı');
    else if(d.sent>0)toast('Test bildirimi gönderildi, birkaç saniye içinde gelir');
    else if(d.dead>0)toast('Cihaz kaydı geçersiz. Bildirimi kapatıp yeniden aç');
    else toast('Sunucu bildirim gönderemedi. Bildirimi kapatıp yeniden aç');
  }catch(e){toast('Gönderilemedi')}
}
{const _as=aSettings;aSettings=function(){
  _as.apply(this,arguments);
  const a=$('s7')||$('s5')||$('s2');if(!a||$('s8'))return;
  const ac=bdDestek()&&typeof Notification!=='undefined'&&Notification.permission==='granted'&&BLD.acik;
  a.insertAdjacentHTML('afterend',btn('s8','Bildirimler: '+(ac?'Açık':'Kapalı'))+(ac?btn('s9','Test bildirimi gönder'):''));
  if(BLD.acik===undefined&&bdDestek()&&prof)bdSub().then(s=>{BLD.acik=!!s&&Notification.permission==='granted';if(BLD.acik)bdOnar();if($('s8'))aSettings()});
  $('s8').onclick=async()=>{
    if(ac){await bdKapat();BLD.acik=false;toast('Bildirimler kapatıldı')}
    else BLD.acik=await bdAc();
    aSettings();
  };
  if($('s9'))$('s9').onclick=bdTest;
}}
Object.assign(EN,{'Bildirimler: Açık':'Notifications: On','Bildirimler: Kapalı':'Notifications: Off','Test bildirimi gönder':'Send test notification','Bildirim için giriş yapmalısın':'Log in to enable notifications','Bu tarayıcı bildirimi desteklemiyor (iPhone: önce "Ana ekrana ekle")':'This browser does not support notifications (iPhone: "Add to Home Screen" first)','Bildirim izni verilmedi':'Notification permission denied','Bildirim açılamadı':'Could not enable notifications','Bildirimler kapatıldı':'Notifications turned off','Önce bildirimleri aç':'Turn notifications on first','Biraz bekle, sonra tekrar dene':'Wait a bit, then try again','Bildirim aboneliği bulunamadı':'No subscription found','Test bildirimi gönderildi':'Test notification sent','Gönderilemedi':'Could not send','Test bildirimi gönderildi, birkaç saniye içinde gelir':'Test notification sent, it should arrive in a few seconds','Sunucuya ulaşılamadı':'Could not reach the server','Cihaz kaydı geçersiz. Bildirimi kapatıp yeniden aç':'This device registration is invalid. Turn notifications off and on again','Sunucu bildirim gönderemedi. Bildirimi kapatıp yeniden aç':'The server could not send the notification. Turn notifications off and on again'});
