
// Yönetici paneli: yetkiyi sunucu kontrol eder, burası sadece arayüz.
const LB4=['B1','B1+','B2','B2+'];let AU={},AW={};
const adErr=r=>r.error?'Yetkin yok veya bağlantı hatası.':null;
async function annCheck(){
  const r=await sb.rpc('announce_get');if(r.error||!r.data||!r.data.text)return;
  let seen=null;try{seen=localStorage.getItem('ka_ann');localStorage.setItem('ka_ann',r.data.id)}catch(e){}
  if(seen===r.data.id)return;
  cfAsk('Duyuru\n'+r.data.text,'Tamam','Kapat');
}
function aAdmin(){
  if(!prof||!prof.admin){toast('Yetkin yok.');return}
  panel('<p><b>Yönetici paneli</b></p>'+btn('ad1','Kullanıcılar')+btn('ad6','Şifre talepleri')+btn('ad2','Kelimeler')+btn('ad3','Sınıf kodu ve duyuru')+btn('ad4','Şüpheli raporu')+btn('adl','Seviye ayarla (kendin)')+btn('ad5','Tüm skorları sıfırla')+btn('ob','Geri'));
  $('ad1').onclick=()=>aAdUsers('');$('ad6').onclick=()=>aAdPw();if(typeof pwBadge==='function')pwBadge();$('ad2').onclick=()=>aAdWords(null,'');$('ad3').onclick=aAdSettings;$('ad4').onclick=aAdSus;$('adl').onclick=()=>aAdLevel(prof.id,prof.username);
  $('ad5').onclick=()=>cfAsk('Tüm kullanıcıların skorları (haftalık ve tüm zamanlar) sıfırlanacak. Emin misin?','Sıfırla','Vazgeç',async()=>{const r=await sb.rpc('admin_reset_all');toast(r.error?'Yapılamadı':'Skorlar sıfırlandı')});
  $('ob').onclick=aSettings;
}
async function aAdUsers(q){
  panel('<p>Yükleniyor...</p>');
  const r=await sb.rpc('admin_users',{_q:q||''});
  if(r.error){panel('<p>'+adErr(r)+'</p>'+btn('ob','Geri'));$('ob').onclick=aAdmin;return}
  AU={};r.data.forEach(x=>AU[x.id]=x);
  panel('<input id="aq" placeholder="Kullanıcı ara" value="'+esc(q||'')+'" style="'+SEL+'">'+btn('as','Ara')+'<p>'+r.data.length+' kullanıcı</p>'+r.data.map(x=>'<button class="lvl" data-u="'+esc(x.id)+'"><span><b>'+esc(x.u)+'</b><small>'+(x.on?'çevrimiçi · ':'')+(x.c?'sınıf':'dışarıdan')+(x.b?' · ENGELLİ':'')+(x.a?' · admin':'')+' · rekor '+x.bs+'</small></span></button>').join('')+btn('ob','Geri'));
  $('as').onclick=()=>aAdUsers($('aq').value.trim());$('ob').onclick=aAdmin;
  document.querySelectorAll('[data-u]').forEach(b=>b.onclick=()=>aAdUser(b.dataset.u,q));
}
function aAdUser(id,q){
  const x=AU[id];if(!x)return;
  panel('<p><b>'+esc(x.u)+'</b>: '+(x.c?'sınıf':'dışarıdan')+(x.b?', engelli':'')+', rekor '+x.bs+', Sv.'+lvlOf(x.xp||0)+', '+(x.xp||0)+' XP</p>'+btn('u1','Skorunu sıfırla')+btn('u2','Avatarını sil')+btn('u3',x.c?'Sınıftan çıkar':'Sınıfa al')+btn('u4',x.b?'Engeli kaldır':'Engelle')+btn('u5','Seviye ayarla')+(x.a?'':btn('u7','Şifre sıfırla'))+(x.a?'':'<button class="lvl" id="u6" style="justify-content:center;color:var(--r);border-color:var(--r)">Kullanıcıyı sil</button>')+btn('ob','Geri'));
  const act=(b,a,t)=>$(b).onclick=()=>cfAsk(t+' ('+x.u+')?','Evet','Vazgeç',async()=>{const r=await sb.rpc('admin_user_act',{_id:id,_act:a});toast(r.error||r.data!=='ok'?'Yapılamadı':'Tamam');aAdUsers(q||'')});
  act('u1','reset','Skor sıfırlansın');act('u2','avatar','Avatar silinsin');act('u3',x.c?'cls_off':'cls_on',x.c?'Sınıftan çıkarılsın':'Sınıfa alınsın');act('u4',x.b?'unban':'ban',x.b?'Engel kalksın':'Engellensin');
  $('ob').onclick=()=>aAdUsers(q||'');$('u5').onclick=()=>aAdLevel(id,x.u,q);
  if($('u7'))$('u7').onclick=()=>aAdPwGo(id,x.u,()=>aAdUser(id,q));
  if($('u6'))$('u6').onclick=()=>cfAsk(x.u+' kalıcı olarak silinsin mi? Hesabı, skorları, arkadaşlıkları ve satın alımları geri alınamaz şekilde silinir.','Devam','Vazgeç',()=>cfAsk('Son uyarı: '+x.u+' hesabı tamamen silinecek. Emin misin?','Evet, sil','Vazgeç',async()=>{
    const r=await sb.rpc('admin_user_delete',{_id:id});
    const m={ok:'Kullanıcı silindi',kendin:'Kendi hesabını silemezsin',yonetici:'Yönetici hesabı silinemez',yok:'Kullanıcı bulunamadı'};
    toast(r.error?(/function|PGRST202|schema cache/i.test(r.error.message||'')?'Silme özelliği sunucuda henüz kurulmadı':'Yapılamadı'):(m[r.data]||'Yapılamadı'));
    aAdUsers(q||'');
  }));
}
async function aAdWords(l,q,p){
  p=p||0;
  panel('<p>Yükleniyor...</p>');
  const r=await sb.rpc('admin_words',{_lvl:l,_q:q||'',_off:p*100});
  if(r.error){panel('<p>'+adErr(r)+'</p>'+btn('ob','Geri'));$('ob').onclick=aAdmin;return}
  AW={};r.data.forEach(x=>AW[x.id]=x);
  const more=r.data.length>=100;
  const tb=(i,t,on)=>'<button class="lvl" data-l="'+i+'" style="margin:0;padding:10px 4px;justify-content:center'+(on?';border-color:var(--g)':'')+'">'+t+'</button>';
  panel('<div style="display:flex;gap:6px;margin-bottom:10px">'+tb('','Hepsi',l===null)+LB4.map((t,i)=>tb(i,t,l===i)).join('')+'</div><input id="aq" placeholder="Kelime ara" value="'+esc(q||'')+'" style="'+SEL+'">'+btn('as','Ara')+btn('an','Yeni kelime')+'<p>Sayfa '+(p+1)+', '+r.data.length+' kelime</p>'+r.data.map(x=>'<button class="lvl" data-w="'+x.id+'"><span><b>'+esc(x.w)+'</b><small>'+LB4[x.l]+' · '+esc(x.d)+(x.x?'':' · cümle yok')+'</small></span></button>').join('')+(p>0?btn('apv','Önceki sayfa'):'')+(more?btn('anx','Sonraki sayfa'):'')+btn('ob','Geri'));
  document.querySelectorAll('[data-l]').forEach(b=>b.onclick=()=>aAdWords(b.dataset.l===''?null:+b.dataset.l,$('aq').value.trim()));
  $('as').onclick=()=>aAdWords(l,$('aq').value.trim());$('an').onclick=()=>aAdWord(null,l,q);$('ob').onclick=aAdmin;
  if($('apv'))$('apv').onclick=()=>aAdWords(l,q,p-1);
  if($('anx'))$('anx').onclick=()=>aAdWords(l,q,p+1);
  document.querySelectorAll('[data-w]').forEach(b=>b.onclick=()=>aAdWord(+b.dataset.w,l,q));
}
function aAdWord(id,l,q){
  const x=id?AW[id]:{l:l===null?0:l,w:'',d:'',x:''};
  panel('<p><b>'+(id?'Kelimeyi düzenle':'Yeni kelime')+'</b></p><p>Kelime (a-z, 3-14 harf)</p><input id="fw" maxlength="14" autocapitalize="none" value="'+esc(x.w)+'" style="'+SEL+'"><p>Seviye</p><select id="fl" style="'+SEL+'">'+LB4.map((t,i)=>'<option value="'+i+'"'+(i===x.l?' selected':'')+'>'+t+'</option>').join('')+'</select><p>Tanım (İngilizce)</p><input id="fd" maxlength="200" value="'+esc(x.d)+'" style="'+SEL+'"><p>Örnek cümle (kelimeyi içermeli)</p><input id="fx" maxlength="200" value="'+esc(x.x||'')+'" style="'+SEL+'"><p id="fe" style="color:var(--r)"></p>'+btn('fs','Kaydet')+(id?btn('fdl','Sil'):'')+btn('ob','Geri'));
  const E={seviye:'Seviye geçersiz.',kelime:'Kelime 3-14 harf, sadece a-z olmalı.',tanim:'Tanım 3-200 karakter olmalı.',cumle:'Cümle kelimeyi içermeli.',var:'Bu kelime zaten var.'};
  $('fs').onclick=async()=>{
    const r=await sb.rpc('admin_word_save',{_id:id,_lvl:+$('fl').value,_w:$('fw').value,_d:$('fd').value,_x:$('fx').value});
    if(r.error){$('fe').textContent='Yapılamadı.';return}
    if(r.data.err){$('fe').textContent=E[r.data.err]||'Hata.';return}
    toast('Kaydedildi');aAdWords(l,q||'');
  };
  if(id)$('fdl').onclick=()=>cfAsk(x.w+' silinsin mi?','Sil','Vazgeç',async()=>{const r=await sb.rpc('admin_word_del',{_id:id});toast(r.data==='ok'?'Silindi':r.data==='kullanimda'?'Günlük kelime olarak kullanılmış, silinemez':'Yapılamadı');aAdWords(l,q||'')});
  $('ob').onclick=()=>aAdWords(l,q||'');
}
async function aAdSettings(){
  const r=await sb.rpc('admin_settings');
  if(r.error){toast('Yapılamadı');return}
  const d=r.data;
  panel('<p><b>Sınıf kodu</b></p><p>Şu an: <b>'+(d.class_code?esc(d.class_code):'tanımlı değil, kimse sınıf olarak kayıt olamaz')+'</b></p><input id="ck" maxlength="40" placeholder="Yeni kod (en az 6 karakter)" autocapitalize="none" style="'+SEL+'">'+btn('cks','Kodu kaydet')+'<p><b>Duyuru</b></p><p>Şu an: '+(d.announce?esc(d.announce):'yok')+'</p><input id="an" maxlength="300" placeholder="Duyuru metni" style="'+SEL+'">'+btn('ans','Duyuruyu yayınla')+btn('and','Duyuruyu kaldır')+btn('ob','Geri'));
  const set=async(k,v)=>{const q=await sb.rpc('admin_set',{_k:k,_v:v});toast(q.error?'Yapılamadı':q.data==='ok'?'Kaydedildi':q.data==='kisa'?'Kod en az 6 karakter olmalı':q.data==='uzun'?'Çok uzun':'Yapılamadı');if(!q.error&&q.data==='ok')aAdSettings()};
  $('cks').onclick=()=>{const v=$('ck').value.trim();if(v)set('class_code',v)};
  $('ans').onclick=()=>{const v=$('an').value.trim();if(v)set('announce',v)};
  $('and').onclick=()=>set('announce','');
  $('ob').onclick=aAdmin;
}
async function aAdSus(){
  panel('<p>Yükleniyor...</p>');
  const r=await sb.rpc('admin_suspects');
  if(r.error){panel('<p>'+adErr(r)+'</p>'+btn('ob','Geri'));$('ob').onclick=aAdmin;return}
  panel('<p>Son 24 saat. Ortalama tahmin aralığı 2 sn altı bot belirtisi, ilk deneme yüzde 70 üstü şüpheli.</p>'+(r.data.length?r.data.map(x=>'<div class="pl" style="flex-direction:column;align-items:stretch"><b>'+esc(x.u)+'</b><small style="color:var(--dim)">'+x.n+' tahmin, ortalama '+x.sec+' sn, ilk deneme %'+(x.ft==null?'-':x.ft)+', rekor '+x.bs+'</small></div>').join(''):'<p>Henüz veri yok.</p>')+btn('ob','Geri'));
  $('ob').onclick=aAdmin;
}
