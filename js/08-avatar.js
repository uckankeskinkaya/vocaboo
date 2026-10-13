
// Hazır avatarlar: sunucuda sadece "p:anahtar" saklanır, görsel istemcide çizilir. Fotoğraf yok.
const PA={fox:['🦊','#f97316'],panda:['🐼','#94a3b8'],cat:['🐱','#f59e0b'],dog:['🐶','#a16207'],lion:['🦁','#eab308'],frog:['🐸','#22c55e'],owl:['🦉','#78716c'],penguin:['🐧','#0ea5e9'],koala:['🐨','#64748b'],tiger:['🐯','#ea580c'],bear:['🐻','#92400e'],rabbit:['🐰','#f472b6'],octopus:['🐙','#a855f7'],whale:['🐳','#3b82f6'],unicorn:['🦄','#ec4899'],dino:['🦖','#16a34a'],robot:['🤖','#6366f1'],rocket:['🚀','#ef4444'],ghost:['👻','#8b5cf6'],alien:['👽','#10b981'],star:['⭐','#d97706'],fire:['🔥','#dc2626'],book:['📚','#0d9488'],brain:['🧠','#f43f5e']};
const PA_RE=/^p:[a-z]{2,12}$/;
function av(a,s){
  const k=PA_RE.test(a||'')&&Object.prototype.hasOwnProperty.call(PA,a.slice(2))?PA[a.slice(2)]:null;
  if(!k&&/^data:image\/jpeg;base64,[A-Za-z0-9+\/=]+$/.test(a||''))return '<img src="'+a+'" width="'+s+'" height="'+s+'" alt="" style="border-radius:50%;object-fit:cover">';
  return '<div style="width:'+s+'px;height:'+s+'px;border-radius:50%;background:'+(k?k[1]:'var(--key)')+';display:inline-grid;place-items:center;font-size:'+Math.round(s*.55)+'px;font-weight:800;flex:none">'+(k?k[0]:'?')+'</div>';
}
function mkThumb(){
  myThumb='';
  if(!prof)return;
  if(PA_RE.test(prof.avatar||'')){myThumb=prof.avatar;return}
  if(!/^data:image\/jpeg;base64,/.test(prof.avatar||''))return;
  const im=new Image();
  im.onload=()=>{const c=document.createElement('canvas');c.width=c.height=64;c.getContext('2d').drawImage(im,0,0,64,64);myThumb=c.toDataURL('image/jpeg',.6);if(ch)ch.track(mine())};
  im.src=prof.avatar;
}
function aAvatar(){
  panel('<p>Avatarını seç</p><div class="bg" style="grid-template-columns:repeat(4,1fr)">'+Object.keys(PA).map(k=>'<button class="bd" data-av="p:'+k+'" style="padding:6px">'+av('p:'+k,48)+'</button>').join('')+'</div><div style="height:12px"></div>'+btn('ob','Geri'));
  document.querySelectorAll('[data-av]').forEach(b=>b.onclick=async()=>{
    const v=b.dataset.av,r=await sb.from('profiles').update({avatar:v}).eq('id',prof.id);
    if(r.error){toast('Kaydedilemedi, tekrar dene.');return}
    prof.avatar=v;toast('Avatar kaydedildi');aProfile();
  });
  $('ob').onclick=aProfile;
}
