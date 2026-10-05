// v27: Kurtarma kodu. Kayıtta bir kez gösterilir; Profil > Kurtarma kodu'ndan yenilenir.
// Şifresini unutan kişi "kullanıcı adı + kurtarma kodu" ile talep açar; talep yine yönetici onayından geçer
// ve doğrulanmışsa yönetici listesinde "kurtarma kodu doğrulandı" işaretiyle öne çıkar. Sunucu: supabase/migrations/20261007_kurtarma_kodu.sql
(function(){
Object.assign(EN,{
'Kurtarma kodu':'Recovery code','Kurtarma kodun':'Your recovery code',
'Bu kodu güvenli bir yere yaz. Şifreni unutursan "Şifremi unuttum" ekranında kullanıcı adınla birlikte gireceksin. Bir daha gösterilmez; kaybedersen Profil\'den yenisini üretebilirsin.':'Write this code down somewhere safe. If you forget your password, enter it with your username on the "Forgot password" screen. It is shown only once; if you lose it you can create a new one from Profile.',
'Kopyala':'Copy','Devam':'Continue','Kod kopyalandı':'Code copied',
'Kurtarma kodu (varsa)':'Recovery code (if you have one)',
'Kurtarma kodu oluşturulsun mu? Eski kodun geçersiz olur.':'Create a recovery code? Your old code will stop working.',
'Oluştur':'Create','Vazgeç':'Cancel',
'Kod yanlış ya da kullanıcı adı hatalı.':'Wrong code or username.',
'Çok fazla yanlış kod. Bir saat sonra tekrar dene.':'Too many wrong codes. Try again in an hour.',
'Kurtarma kodun doğrulandı. Talebin yöneticiye iletildi, geçici kodu alınca şifre yerine yazıp giriş yap.':'Recovery code verified. Your request was sent to the admin; when you get the temporary code, enter it instead of your password.',
'✓ kurtarma kodu doğrulandı':'✓ recovery code verified'});
const kodEkrani=(kod,geri)=>{
  panel('<p><b>Kurtarma kodun</b></p><div class="pwcode" id="rkod">'+esc(kod)+'</div><p class="cap">Bu kodu güvenli bir yere yaz. Şifreni unutursan "Şifremi unuttum" ekranında kullanıcı adınla birlikte gireceksin. Bir daha gösterilmez; kaybedersen Profil\'den yenisini üretebilirsin.</p>'+btn('rkc','Kopyala')+btn('rko','Devam'));
  $('rkc').onclick=async()=>{try{await navigator.clipboard.writeText(kod);toast('Kod kopyalandı')}catch(e){toast('Kopyalanamadı, kodu elle yaz')}};
  $('rko').onclick=geri||(()=>{});
};
async function yeniKod(geri){
  const r=await sb.rpc('recovery_new');
  if(r.error||!r.data){toast('Kod üretilemedi, sonra Profil\'den dene');return false}
  kodEkrani(r.data,geri);return true;
}
// 1) Kayıttan sonra
const _g=aGo;
aGo=async function(reg){
  await _g(reg);
  if(reg&&typeof prof!=='undefined'&&prof){
    let var_=false;try{const q=await sb.rpc('recovery_has');var_=q.data===true}catch(e){}
    if(!var_)await yeniKod(()=>rHome());
  }
};
// 2) Profilde buton
const _p=aProfile;
aProfile=function(){
  _p.apply(this,arguments);
  const b=$('pwc');if(!b||$('rkb'))return;
  b.insertAdjacentHTML('afterend','<button class="rw" id="rkb"><span>🛟</span>Kurtarma kodu</button>');
  $('rkb').onclick=()=>cfAsk('Kurtarma kodu oluşturulsun mu? Eski kodun geçersiz olur.','Oluştur','Vazgeç',()=>yeniKod(()=>aProfile()));
};
// 3) Şifremi unuttum: isteğe bağlı kurtarma kodu alanı
const _f=aForgot;
aForgot=function(){
  _f.apply(this,arguments);
  const u=$('fu'),s=$('fs');if(!u||!s)return;
  u.insertAdjacentHTML('afterend','<input id="fk" maxlength="14" autocapitalize="characters" autocomplete="off" placeholder="Kurtarma kodu (varsa)" style="'+SEL+';text-transform:uppercase">');
  const eski=s.onclick;
  s.onclick=async()=>{
    const k=($('fk').value||'').trim();
    if(!k)return eski();
    const nm=$('fu').value.trim().toLowerCase(),e=t=>{$('fe').textContent=t};
    if(!/^[a-z0-9_]{3,16}$/.test(nm))return e('Kullanıcı adı 3-16 karakter olmalı: a-z, 0-9 ve _.');
    e('Bekle...');s.disabled=true;
    const r=await sb.rpc('pw_request_code',{_u:nm,_c:k});s.disabled=false;
    if(r.error)return e(pwKurulu(r)?'Bu özellik sunucuda henüz kurulmadı.':'Talep gönderilemedi. Biraz sonra tekrar dene.');
    if(r.data==='ok')return aAuth('Kurtarma kodun doğrulandı. Talebin yöneticiye iletildi, geçici kodu alınca şifre yerine yazıp giriş yap.');
    e(r.data==='bekle'?'Çok fazla yanlış kod. Bir saat sonra tekrar dene.':'Kod yanlış ya da kullanıcı adı hatalı.');
  };
};
// 4) Yönetici listesi: doğrulanmış talepler işaretli ve üstte
aAdPw=async function(){
  panel('<p>Yükleniyor...</p>');
  const r=await sb.rpc('admin_pw_requests');
  if(r.error){panel('<p>'+(pwKurulu(r)?'Şifre sıfırlama sunucuda henüz kurulmadı.':adErr(r))+'</p>'+btn('ob','Geri'));$('ob').onclick=aAdmin;return}
  const d=r.data||[],zm=t=>{try{return new Date(t).toLocaleString('tr-TR')}catch(e){return ''}};
  panel('<p><b>Şifre talepleri</b></p>'+(d.length?d.map(x=>'<button class="lvl" data-p="'+esc(x.uid)+'" data-n="'+esc(x.u)+'"><span><b>'+esc(x.u)+'</b><small>'+(x.v?'<em>✓ kurtarma kodu doğrulandı</em> · ':'')+esc(zm(x.t))+'</small></span></button>').join(''):'<p>Bekleyen talep yok.</p>')+btn('ob','Geri'));
  $('ob').onclick=aAdmin;
  document.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>aAdPwGo(b.dataset.p,b.dataset.n,aAdPw));
};
})();
