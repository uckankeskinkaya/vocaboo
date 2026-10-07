
// v9: temalarla uyumlu hareketli çerçeveler (herkese görünür), sunucudan çerçeve seçimi, yönetici seviye ayarı
Object.assign(EN,{'Uygulanamadı':'Could not apply'});
const fc=(c,s)=>['conic-gradient('+c.concat(c[0]).join(',')+')',1,null,s];
const NF={
nane:['Nane',['#34d399','#a7f3d0','#6ee7b7','#10b981'],4,4],sakura:['Sakura',['#f472b6','#fbcfe8','#fda4af','#e0457b'],6,4],
lavanta:['Lavanta',['#a78bfa','#ddd6fe','#c4b5fd','#7c5cf0'],8,4],orman:['Orman',['#4ade80','#bef264','#16a34a','#86efac'],10,4],
deniz:['Deniz',['#22d3ee','#3b82f6','#06b6d4','#67e8f9'],12,3.5],kahve:['Kahve',['#d9a066','#78350f','#fcd9b0','#a16207'],14,4],
gunbatimi:['Gün batımı',['#fb7185','#fb923c','#c084fc','#fda4af'],18,3.5],buz:['Buz',['#7dd3fc','#e0f2fe','#38bdf8','#ffffff'],22,3.5],
mercan:['Mercan',['#fb7185','#fdba74','#f2674a','#fecdd3'],26,3.5],limon:['Limon',['#fde047','#bef264','#facc15','#fef9c3'],28,3],
gece:['Gece',['#6366f1','#1e3a8a','#7aa2ff','#312e81'],32,3.5],seker:['Şeker',['#fbcfe8','#bfdbfe','#bbf7d0','#fde68a'],40,2.8],
safak:['Şafak',['#fdba74','#f9a8d4','#c4b5fd','#fecaca'],45,2.8],siber:['Siber',['#22d3ee','#ec4899','#8b5cf6','#facc15'],55,2.2],
volkan:['Volkan',['#ef4444','#fb923c','#fde047','#991b1b'],60,2.2],nebula:['Nebula',['#c4a1ff','#f472b6','#38bdf8','#fb923c'],70,2],
aurora:['Kutup ışığı',['#5eead4','#22c55e','#8b5cf6','#38bdf8'],80,2]};
Object.keys(NF).forEach(k=>{const [n,c,l,s]=NF[k];FRM[k]=[n,'conic-gradient('+c.concat(c[0]).join(',')+')',1,{lv:l},s,c[0]];UNL.push({id:'frame:'+k,t:'frame',n,req:{lv:l}})});
['bronz:#f59e0b','gumus:#cbd5e1','altin:#fbbf24','zumrut:#34d399','alev:#f97316','elmas:#67e8f9','neon:#f0abfc','gokkusagi:#ffffff'].forEach(x=>{const[k,c]=x.split(':');if(FRM[k]){FRM[k][4]=FRM[k][4]||(FRM[k][2]?2.5:3);FRM[k][5]=c}});
document.head.insertAdjacentHTML('beforeend','<style>.fr{box-shadow:0 0 10px -2px var(--gl,transparent)}.fr.sp::before{animation:spin var(--sp,3s) linear infinite}:root[data-perf=low] .fr::before{animation:none}.fr .tile{}</style>');
// Kullanıcı adı: giriş kimliği de aynı ad olduğu için değişiklik sunucuda (set_username) giriş kaydını da günceller.
function aUsername(){
  if(!sb||!prof)return;
  panel('<p>Kullanıcı adını değiştir</p><p class="cap">Şu an: <b>'+esc(prof.username)+'</b></p><input id="nu" maxlength="16" autocapitalize="none" autocomplete="off" spellcheck="false" value="'+esc(prof.username)+'" style="'+SEL+'"><p class="cap">3-16 karakter: a-z, 0-9 ve _. Giriş yaparken de yeni adını kullanacaksın. Günde bir kez değiştirebilirsin.</p><p id="ne" style="color:var(--r)"></p>'+btn('nk','Kaydet')+btn('ob','Geri'));
  $('ob').onclick=aProfile;
  const err=t=>{$('ne').textContent=t};
  $('nk').onclick=async()=>{
    const n=$('nu').value.trim().toLowerCase();
    if(!/^[a-z0-9_]{3,16}$/.test(n))return err('Kullanıcı adı 3-16 karakter olmalı: a-z, 0-9 ve _.');
    if(n===prof.username)return err('Bu zaten senin kullanıcı adın.');
    err('Bekle...');$('nk').disabled=true;
    const r=await sb.rpc('set_username',{_u:n});
    $('nk').disabled=false;
    const m={gecersiz:'Bu kullanıcı adı kullanılamaz.',var:'Bu kullanıcı adı alınmış.',bekle:'Kullanıcı adını günde bir kez değiştirebilirsin.',ayni:'Bu zaten senin kullanıcı adın.',yok:'Profil bulunamadı.'};
    if(r.error)return err(/function|PGRST202|schema cache/i.test(r.error.message||'')?'Bu özellik sunucuda henüz kurulmadı. Yöneticiye haber ver.':'Değiştirilemedi. Biraz sonra tekrar dene.');
    if(r.data!=='ok')return err(m[r.data]||'Değiştirilemedi.');
    prof.username=n;toast('Kullanıcı adın değişti. Girişte yeni adını kullan.');aProfile();
  };
}
Object.assign(EN,{'Kullanıcı adını değiştir':'Change username','Kaydet':'Save','Kullanıcıyı sil':'Delete user','Kullanıcı adın değişti. Girişte yeni adını kullan.':'Username changed. Use your new name to log in.','Bu kullanıcı adı alınmış.':'That username is taken.','Kullanıcı silindi':'User deleted'});
function aAdLevel(id,nm,q){
  panel('<p><b>Seviye ayarla</b>: '+esc(nm)+'</p><div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px">'+[1,5,10,20,35,50,65,80,100].map(v=>'<button class="sbtn" data-p="'+v+'">'+v+'</button>').join('')+'</div><input id="al" type="number" min="1" max="100" placeholder="1-100" style="'+SEL+'"><p id="ale" style="color:var(--r)"></p>'+btn('als','Uygula')+btn('ob','Geri'));
  const back=()=>id===prof.id?aAdmin():aAdUsers(q||'');
  document.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{$('al').value=b.dataset.p});
  $('als').onclick=async()=>{
    const v=+$('al').value;if(!(v>=1&&v<=100)){$('ale').textContent='1 ile 100 arası gir.';return}
    const r=await sb.rpc('admin_set_level',{_id:id,_lvl:v});
    if(r.error||r.data!=='ok'){$('ale').textContent='Yapılamadı.';return}
    if(id===prof.id)await loadProf();toast('Seviye '+v+' yapıldı');back();
  };
  $('ob').onclick=back;
}
