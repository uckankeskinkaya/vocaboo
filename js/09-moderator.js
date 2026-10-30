
// Moderatör modu: kurucu oynamaz, sorulari dogru cevaplariyla ve canli sirayi izler
var modView=false,modDone=false,modEnd=0;
function oEnd(){
  if(!started)return;
  if(modView){modDone=true;oModRender(rank(plist()));return}
  if(ost.fin)return;
  ost.fin=true;over=true;clearInterval(tmr);ch.track(mine());oResults();
}
function modStart(){
  modView=true;modDone=false;mode='online';
  modEnd=cfg.m==='s'?Date.now()+cfg.dur*1000:0;
  const n=cfg.m==='c'?cfg.n:40;
  const qs=seq.slice(0,n).map((it,i)=>{const p=it.w.split('|');return '<div class="pl" style="flex-direction:column;align-items:stretch;gap:2px"><div style="display:flex;justify-content:space-between"><b>'+(i+1)+'. '+esc(p[0].toUpperCase())+'</b><span class="cap" data-qc="'+i+'" data-l="'+LBL[it.l]+'"></span></div><small style="color:var(--dim)">'+esc(p[1])+'.</small></div>'}).join('');
  panel('<p id="mh"></p><p><b>En yüksekler</b></p><div id="mtop"></div><p><b>Sorular ve doğru cevaplar</b></p>'+qs+btn('mend','Oyunu bitir')+btn('ob','Çık'));
  $('mend').onclick=()=>cfAsk('Oyun herkes için bitsin mi?','Bitir','Vazgeç',()=>ch.send({type:'broadcast',event:'end'}));
  $('ob').onclick=()=>oExit();
  clearInterval(tmr);tmr=setInterval(()=>{if(modView)oModRender(rank(plist()))},1000);
  oModRender(rank(plist()));
}
function oModRender(L){
  if(!$('mh'))return;
  const all=plist().filter(x=>!(x.h&&x.mo)),done=all.filter(x=>x.d).length;
  const rem=modEnd?Math.max(0,Math.ceil((modEnd-Date.now())/1000)):0;
  if(modEnd&&rem<=0)modDone=true;
  if(all.length&&done>=all.length)modDone=true;
  $('mh').innerHTML='<b>Moderatör</b> · Oda '+esc(room)+'<br>'+all.length+' oyuncu, '+done+' bitirdi'+(modDone?' · <b>Oyun bitti</b>':modEnd?' · '+Math.floor(rem/60)+':'+String(rem%60).padStart(2,'0'):'');
  $('mtop').innerHTML=L.slice(0,10).map((x,i)=>oPlayerRow({n:x.n,im:x.im,rank:i+1,tag:x.a?'':'(elendi)',sc:x.p+' puan',sub:cfg.m==='s'?x.w+' kelime':''})).join('')||'<p>Henüz oyuncu yok.</p>';
  document.querySelectorAll('[data-qc]').forEach(e=>{const i=+e.dataset.qc;e.textContent=e.dataset.l+' · '+all.filter(x=>x.q>i).length+'/'+all.length+' tamamladı'});
}
