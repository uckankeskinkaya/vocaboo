// Şifre sıfırlama: talep (kullanıcı) -> geçici kod (yönetici) -> yeni şifre (kullanıcı).
// Sunucu fonksiyonları: pw_request, admin_pw_requests, admin_pw_reset, pw_must_change, pw_changed
// (supabase/migrations/20261005_sifre_sifirlama.sql)
const pwKurulu=r=>/function|PGRST202|schema cache/i.test((r&&r.error&&r.error.message)||'');
async function pwMust(){try{const r=await sb.rpc('pw_must_change');return !r.error&&r.data===true}catch(e){return false}}

// Giriş ekranından: kullanıcı adını yazıp yöneticiye talep gönderir (kullanıcı var mı yok mu belli olmaz).
function aForgot(){
  panel(heroHTML()+'<p><b>Şifremi unuttum</b></p><p class="cap">Kullanıcı adını yaz. Talebin yöneticiye gider. Yönetici sana 8 karakterli geçici bir kod verince, giriş ekranında kodu şifre yerine yaz. Sonra yeni şifreni belirlersin.</p><input id="fu" maxlength="16" autocapitalize="none" autocomplete="username" style="'+SEL+'"><p id="fe" style="color:var(--r)"></p>'+btn('fs','Talep gönder')+btn('ob','Geri'));
  $('ob').onclick=()=>aAuth();
  $('fs').onclick=async()=>{
    const u=$('fu').value.trim().toLowerCase(),e=t=>{$('fe').textContent=t};
    if(!/^[a-z0-9_]{3,16}$/.test(u))return e('Kullanıcı adı 3-16 karakter olmalı: a-z, 0-9 ve _.');
    e('Bekle...');$('fs').disabled=true;
    const r=await sb.rpc('pw_request',{_u:u});$('fs').disabled=false;
    if(r.error)return e(pwKurulu(r)?'Bu özellik sunucuda henüz kurulmadı.':'Talep gönderilemedi. Biraz sonra tekrar dene.');
    aAuth('Talebin yöneticiye iletildi. Geçici kodu alınca şifre yerine yazıp giriş yap.');
  };
}

// Yeni şifre belirleme. manual=false: geçici kodla girildi, zorunlu. manual=true: profilden isteğe bağlı.
function aNewPw(manual){
  panel('<p><b>'+(manual?'Şifreni değiştir':'Yeni şifre belirle')+'</b></p><p class="cap">'+(manual?'':'Geçici kodla giriş yaptın. Devam etmek için kendi şifreni belirle. ')+'En az 8 karakter, en az 1 harf ve en az 1 rakam.</p><input id="p1" type="password" autocomplete="new-password" placeholder="Yeni şifre" style="'+SEL+'"><div class="pwl" id="p1k"></div><input id="p2" type="password" autocomplete="new-password" placeholder="Yeni şifre (tekrar)" style="'+SEL+'"><p id="pe" style="color:var(--r)"></p>'+btn('pk','Kaydet')+btn('ob',manual?'Geri':'Çıkış yap'));
  $('ob').onclick=manual?aProfile:async()=>{await sb.auth.signOut();prof=null;rHome();aAuth()};
  pwListe('p1','p1k');
  $('pk').onclick=async()=>{
    const a=$('p1').value,b=$('p2').value,e=t=>{$('pe').textContent=t};
    {const h=pwHata(a);if(h)return e(h)}
    if(a!==b)return e('İki şifre aynı değil.');
    e('Bekle...');$('pk').disabled=true;
    const r=await sb.auth.updateUser({password:a});$('pk').disabled=false;
    if(r.error)return e(/same|different/i.test(r.error.message||'')?'Yeni şifre eskisinden farklı olmalı.':/weak|short|least|password|contain/i.test(r.error.message||'')?'Şifre kurala uymuyor: en az 8 karakter, en az 1 harf ve 1 rakam.':'Şifre değiştirilemedi. Biraz sonra tekrar dene.');
    if(!manual){const c=await sb.rpc('pw_changed');if(c.error||c.data!==true)return e('Şifre değişti ama doğrulanamadı. Çıkış yapıp yeni şifrenle giriş yap.')}
    toast('Şifren değişti.');
    if(manual)aProfile();else oExit();
  };
}

// Yönetici paneli: bekleyen talepler
async function pwBadge(){
  const r=await sb.rpc('admin_pw_requests');
  if(!r.error&&Array.isArray(r.data)&&r.data.length&&$('ad6'))$('ad6').textContent='Şifre talepleri ('+r.data.length+')';
}
async function aAdPw(){
  panel('<p>Yükleniyor...</p>');
  const r=await sb.rpc('admin_pw_requests');
  if(r.error){panel('<p>'+(pwKurulu(r)?'Şifre sıfırlama sunucuda henüz kurulmadı.':adErr(r))+'</p>'+btn('ob','Geri'));$('ob').onclick=aAdmin;return}
  const d=r.data||[],zm=t=>{try{return new Date(t).toLocaleString('tr-TR')}catch(e){return ''}};
  panel('<p><b>Şifre talepleri</b></p>'+(d.length?d.map(x=>'<button class="lvl" data-p="'+esc(x.uid)+'" data-n="'+esc(x.u)+'"><span><b>'+esc(x.u)+'</b><small>'+esc(zm(x.t))+'</small></span></button>').join(''):'<p>Bekleyen talep yok.</p>')+btn('ob','Geri'));
  $('ob').onclick=aAdmin;
  document.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>aAdPwGo(b.dataset.p,b.dataset.n,aAdPw));
}
// Geçici şifre üret ve yöneticiye bir kez göster. geri: "Tamam"a basınca dönülecek ekran.
function aAdPwGo(id,u,geri){
  cfAsk(u+' için geçici şifre üretilsin mi? Kullanıcının açık oturumları kapanır ve eski şifresi geçersiz olur.','Üret','Vazgeç',async()=>{
    const r=await sb.rpc('admin_pw_reset',{_id:id});
    if(r.error)return toast(pwKurulu(r)?'Şifre sıfırlama sunucuda henüz kurulmadı':'Yapılamadı');
    const d=r.data||{};
    if(!d.ok)return toast({kendin:'Kendi şifreni burada sıfırlayamazsın',yonetici:'Yönetici hesabı sıfırlanamaz',yok:'Kullanıcı bulunamadı'}[d.err]||'Yapılamadı');
    panel('<p>Geçici şifre: <b>'+esc(d.u)+'</b></p><div class="pwcode" id="pwcode">'+esc(d.code)+'</div><p class="cap">Bu kodu şimdi kullanıcıya ilet, bir daha gösterilmez. Kullanıcı giriş ekranında kodu şifre yerine yazacak, sonra kendi şifresini belirleyecek.</p>'+btn('pwk','Kopyala')+btn('ob','Tamam'));
    $('pwk').onclick=async()=>{try{await navigator.clipboard.writeText(d.code);toast('Kopyalandı')}catch(e){toast('Kopyalanamadı, kodu elle yaz')}};
    $('ob').onclick=geri;
  });
}
Object.assign(EN,{'Şifremi unuttum':'Forgot password','Şifre talepleri':'Password requests','Şifre sıfırla':'Reset password','Şifreni değiştir':'Change password','Yeni şifre belirle':'Set a new password','Talep gönder':'Send request'});
