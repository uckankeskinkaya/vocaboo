
let sess=[],SRVEX='';
const CB=()=>{try{return localStorage.getItem('ka_cb')==='1'}catch(e){return false}};
function applyCB(){document.documentElement.dataset.cb=CB()?'1':''}
applyCB();
function speak(w){try{const u=new SpeechSynthesisUtterance(String(w).toLowerCase());u.lang='en-US';u.rate=.9;speechSynthesis.cancel();speechSynthesis.speak(u)}catch(e){toast('Bu tarayıcı sesli okumayı desteklemiyor.')}}
function hiEx(ex,w){return esc(ex).replace(new RegExp('\\b('+w.toLowerCase()+'\\w*)','ig'),'<b>$1</b>')}
function bookGet(){try{return JSON.parse(localStorage.getItem('ka_book'))||[]}catch(e){return[]}}
function bookSet(b){try{localStorage.setItem('ka_book',JSON.stringify(b.slice(0,200)))}catch(e){}}
function bookAdd(w,d,ex){const b=bookGet(),i=b.findIndex(x=>x.w===w);if(i>=0){b[i].n=(b[i].n||1)+1;if(ex)b[i].ex=ex}else b.unshift({w,d,ex,n:1});bookSet(b)}
// Her kelime bitince: oyun listesine ekle, bilinmediyse deftere de yaz
function noteWord(){
  if(!guesses.length||word.indexOf('?')>=0){SRVEX='';return}
  const w=word,win=guesses[guesses.length-1].w===w,ex=SRVEX||EX[w.toLowerCase()]||'';SRVEX='';
  if(!sess.some(x=>x.w===w))sess.push({w,def,ex,win});
  if(!win)bookAdd(w,def,ex);
}
document.body.insertAdjacentHTML('beforeend','<div id="wv" hidden><div class="wvi"><p id="wvt" style="font-weight:700;font-size:18px"></p><div id="wvl"></div><button class="lvl" id="wvc" style="justify-content:center">Kapat</button></div></div>');
$('wvc').onclick=()=>{$('wv').hidden=true};
function wrow(x,rm){return '<div class="wvr"><div style="display:flex;justify-content:space-between;align-items:center"><b class="w">'+esc(x.w)+(x.win===undefined?'':(x.win?' ✓':' ✗'))+'</b><span><button class="sbtn" data-sp="'+esc(x.w)+'">🔊</button>'+(rm?' <button class="sbtn" data-rm="'+esc(x.w)+'">Sil</button>':'')+'</span></div><small>'+esc(x.def||x.d||'')+'.</small>'+(x.ex?'<small>“'+hiEx(x.ex,x.w)+'”</small>':'')+'</div>'}
function wopen(t,h){$('wvt').textContent=t;$('wvl').innerHTML=h;$('wv').hidden=false;$('wv').scrollTop=0;document.querySelectorAll('[data-sp]').forEach(b=>b.onclick=()=>speak(b.dataset.sp))}
function showWords(){wopen('Bu oyundaki kelimeler ('+sess.length+')',sess.length?sess.map(x=>wrow(x)).join(''):'<p>Henüz kelime yok.</p>')}
function aBook(){
  const b=bookGet();
  wopen('Kelime defterim ('+b.length+')',b.length?b.map(x=>wrow({w:x.w,d:x.d,ex:x.ex},1)).join(''):'<p>Bilemediğin kelimeler burada birikir.</p>');
  document.querySelectorAll('[data-rm]').forEach(bt=>bt.onclick=()=>{bookSet(bookGet().filter(x=>x.w!==bt.dataset.rm));aBook()});
}
function shareRes(){
  const win=guesses.length&&guesses[guesses.length-1].w===word,cb=CB(),m={g:cb?'🟦':'🟩',o:'🟧',r:cb?'⬛':'🟥'};
  const t='Vocaboo '+(mode==='daily'?'Günlük '+dStr(dayNum())+' ':'')+(win?guesses.length:'X')+'/'+tries+'\n'+guesses.map(g=>g.s.map(c=>m[c]).join('')).join('\n');
  if(navigator.share){navigator.share({text:t}).catch(()=>{})}else{try{navigator.clipboard.writeText(t);toast('Sonuç kopyalandı')}catch(e){toast('Kopyalanamadı')}}
}
// Haftalık şampiyon ekranı: her yeni haftanın ilk açılışında geçen haftanın ilk 3'ü
// Haftalık şampiyonlar: ödül sunucuda verilir (weekly_award, pazartesi 00:10). Podyum haftada bir gösterilir;
// ödülü kazanan, "+puan ve rozet" mesajını bir kez görür (başka cihazda tekrar çıkmaz).
async function champCheck(){
  const wk=dStr(dayNum()-((dayNum()+3)%7)),gecen=dStr(dayNum()-((dayNum()+3)%7)-7);let seen=null;
  try{seen=localStorage.getItem('ka_champ');localStorage.setItem('ka_champ',wk)}catch(e){}
  const r=await sb.rpc('champ_week');
  const d=r&&!r.error&&r.data;if(!d||!Array.isArray(d.podium)||!d.podium.length)return;
  const ben=d.me&&!d.me.seen,yeni=seen!==null&&seen!==wk&&d.week===gecen;
  if(!ben&&!yeni)return;
  const rk=['🥇','🥈','🥉'];
  const satirlar=d.podium.slice(0,3).map(x=>(rk[(+x.r||1)-1]||'')+' '+String(x.u||'?')+', '+(+x.s||0)+' puan').join('\n');
  const odul=ben?'\n\nSen '+(+d.me.r||0)+'. oldun! +'+(+d.me.pts||0).toLocaleString('tr-TR')+' puan ve rozet kazandın.':'';
  cfAsk('Geçen haftanın şampiyonları\n'+satirlar+odul,'Tamam','Tüm tablo',null,()=>aBoard('last'));
  if(ben){sb.rpc('champ_seen').then(()=>{loadProf()},()=>{})}
}
