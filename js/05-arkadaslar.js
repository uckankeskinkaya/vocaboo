
const FE={'kod yok':'Bu kodla kimse bulunamadı.','kendi kodun':'Bu senin kendi kodun.','zaten':'Zaten istek var veya arkadaşsınız.','limit':'Çok fazla deneme, bir saat sonra tekrar dene.','cok istek':'Bekleyen çok isteğin var.'};
async function aFriends(tab){
  if(!sb||!prof){aAuth('Arkadaşlar için giriş yap');return}
  tab=tab||'f';panel('<p>Yükleniyor...</p>');
  const tb=(id,t,on)=>'<button class="lvl" id="'+id+'" style="margin:0;justify-content:center'+(on?';border-color:var(--g)':'')+'">'+t+'</button>';
  const hd='<div style="display:flex;gap:8px;margin-bottom:10px">'+tb('ft1','Arkadaşlar',tab==='f')+tb('ft2','Sınıf',tab==='c')+'</div>';
  const row=(x,ex)=>'<div class="pl"><span style="display:flex;align-items:center;gap:8px;min-width:0">'+frameWrap(av(x.im,32),x.fr)+'<span><b>'+esc(x.u)+(prof.username===x.u?' (sen)':'')+'</b><br><small style="color:var(--dim)">'+(x.on===undefined?'':'<i class="dot'+(x.on?' on':'')+'"></i>'+(x.on?'Çevrimiçi':'Çevrimdışı')+' · ')+esc(x.t||'')+'</small></span></span><span>'+(x.on&&x.id&&prof.username!==x.u?'<button class="sbtn" data-i="'+esc(x.id)+'" data-n="'+esc(x.u)+'">1v1</button> ':'')+(ex||'')+'</span></div>';
  const bar=()=>{$('ob').onclick=()=>oExit();$('ft1').onclick=()=>aFriends('f');$('ft2').onclick=()=>aFriends('c')};
  if(tab==='c'){
    const r=await sb.rpc('class_list');
    const d=r.data||[];
    panel(hd+'<p>Sınıftakiler ('+d.length+')</p>'+d.map(x=>row({id:x.id,on:x.on,u:x.u,im:x.im,fr:x.fr,t:titleOf({xp:x.xp})+', rekor '+x.bs})).join('')+btn('ob','Ana menü'));
    bar();document.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>oInvite(b.dataset.i,b.dataset.n));return;
  }
  const r=await sb.rpc('friend_list');
  if(r.error){panel(hd+'<p>Yüklenemedi, tekrar dene.</p>'+btn('ob','Ana menü'));bar();return}
  const d=r.data,cd=d.code.slice(0,4)+'-'+d.code.slice(4);
  panel(hd+'<div class="pl"><span>Kodun: <b style="letter-spacing:2px">'+esc(cd)+'</b></span><button class="sbtn" id="fcp">Kopyala</button></div><input id="fcode" maxlength="12" autocomplete="off" placeholder="Arkadaş kodu" style="'+SEL+';text-transform:uppercase">'+btn('fadd','Arkadaş ekle')
    +(d.incoming.length?'<p>İstekler</p>'+d.incoming.map(x=>row(x,'<span><button class="sbtn" data-a="'+esc(x.id)+'">Kabul</button> <button class="sbtn" data-r="'+esc(x.id)+'">Reddet</button></span>')).join(''):'')
    +'<p>Arkadaşların ('+d.friends.length+')</p>'+(d.friends.length?d.friends.map(x=>row({id:x.id,on:x.on,u:x.u,im:x.im,fr:x.fr,t:titleOf({xp:x.xp})+', rekor '+x.bs+(x.c?', sınıf':'')},'<button class="sbtn" data-x="'+esc(x.id)+'">Sil</button>')).join(''):'<p>Henüz arkadaşın yok. Kodunu paylaş veya arkadaşının kodunu gir.</p>')+btn('ob','Ana menü'));
  bar();
  $('fcp').onclick=()=>{try{navigator.clipboard.writeText(d.code)}catch(e){}toast('Kod kopyalandı')};
  $('fadd').onclick=async()=>{
    const c=$('fcode').value.trim();if(!c)return;
    const q=await sb.rpc('friend_add',{_c:c});
    if(q.error){toast('Bağlantı hatası');return}
    if(q.data.err){toast(FE[q.data.err]||'Eklenemedi');return}
    toast((q.data.ok==='kabul'?'Artık arkadaşsınız: ':'İstek gönderildi: ')+q.data.n);aFriends('f');
  };
  const act=(sel,key,fn)=>document.querySelectorAll(sel).forEach(b=>b.onclick=async()=>{await fn(b.dataset[key]);aFriends('f');fbadge()});
  act('[data-a]','a',id=>sb.rpc('friend_respond',{_id:id,_acc:true}));
  act('[data-r]','r',id=>sb.rpc('friend_respond',{_id:id,_acc:false}));
  act('[data-x]','x',id=>sb.rpc('friend_remove',{_id:id}));
  document.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>oInvite(b.dataset.i,b.dataset.n));
}
$('fbtn').onclick=()=>aFriends('f');
