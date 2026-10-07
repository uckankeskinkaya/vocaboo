// v33: Ödev listesi. Öğretmen sınıf kelimelerinden ödev oluşturur (başlık, son gün, kelimeler); sınıftaki öğrenciler
// Menü > Ödevlerim'den çözer. İlerleme sunucuda, doğru çözülen kelimelerden (guess_log) hesaplanır; kelimeler öğrenciye gösterilmez.
let ODEV=0;
const OE={baslik:'Başlık 2-60 karakter olmalı (< ve > kullanılamaz).',tarih:'Son gün geçmiş olamaz.',kelime:'En az 1, en fazla 50 sınıf kelimesi seç.',dolu:'En fazla 30 aktif ödev olabilir.'};
const gunTxt=d=>{
  if(!d)return 'Son gün yok';
  const t=new Date();t.setHours(0,0,0,0);const k=Math.round((new Date(d+'T00:00:00')-t)/864e5);
  return k<0?'Süresi geçti':k===0?'Son gün bugün':k===1?'Son gün yarın':k+' gün kaldı';
};
const bar=(a,b,c)=>'<div class="pbar" style="margin:6px 0 2px"><i style="width:'+(b?Math.round(a/b*100):0)+'%'+(c?';background:var(--g)':'')+'"></i></div>';
// --- Öğrenci
async function aOdev(){
  $('game').hidden=true;
  panel('<p>Yükleniyor...</p>');
  const r=await sb.rpc('h_list');
  if(r.error){panel('<p>Ödevler yüklenemedi. Biraz sonra tekrar dene.</p>'+btn('ob','Geri'));$('ob').onclick=()=>aPMenu();return}
  const d=r.data||[];
  panel('<p><b>📚 Ödevlerim</b></p>'+(d.length?d.map(x=>{const ok=x.done>=x.n;return '<button class="lvl" data-o="'+x.id+'" style="display:block;text-align:left"><b>'+esc(x.title)+(ok?' ✓':'')+'</b><br><small>'+x.done+'/'+x.n+' kelime · <span'+(!ok&&/geçti/.test(gunTxt(x.due))?' style="color:var(--r)"':'')+'>'+(ok?'Tamamlandı':gunTxt(x.due))+'</span></small>'+bar(x.done,x.n,ok)+'</button>'}).join(''):'<p>Şu an ödevin yok.</p>')+btn('ob','Geri'));
  $('ob').onclick=()=>aPMenu();
  document.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{const x=d.find(y=>String(y.id)===b.dataset.o);if(x.done>=x.n){toast('Bu ödevi tamamladın ✓');return}odevBasla(x.id)});
}
function odevBasla(id){
  if(!navigator.onLine||!sb){toast('Ödev için internet gerekli');return}
  ODEV=id;sess=[];mode='practice';PSV=true;lv=4;pStart(4);
}
{const _ps=pStart;pStart=async function(){
  if(!ODEV)return _ps.apply(this,arguments);
  const r=await sb.rpc('h_next',{_aid:ODEV});
  if(r.error||!r.data||r.data.err){ODEV=0;toast('Ödev açılamadı');aOdev();return}
  if(r.data.done){ODEV=0;toast('Ödev tamamlandı 🎉');aOdev();return}
  SR=r.data;next();
}}
// Oyundan çıkınca ödev listesine dön
$('back').addEventListener('click',e=>{
  if(!ODEV||mode!=='practice')return;
  e.stopImmediatePropagation();e.preventDefault();ODEV=0;SR=null;aOdev();
},true);
(()=>{const g=$('game');if(g)new MutationObserver(()=>{if(g.hidden)ODEV=0}).observe(g,{attributes:true,attributeFilter:['hidden']})})();
// Menüye giriş
{const _m=aPMenu;aPMenu=function(){
  _m.apply(this,arguments);
  const k=$('pmn');if(!k||!clsOK()||$('odb'))return;
  k.insertAdjacentHTML('afterbegin','<h4>Ödevler</h4><div class="lst"><button class="rw" id="odb"><span>📚</span><div>Ödevlerim<small>Öğretmeninin verdiği kelime ödevleri</small></div></button></div>');
  $('odb').onclick=aOdev;
}}
window.aPMenu=aPMenu;
// --- Öğretmen
{const _t=aTeacher;aTeacher=function(){
  _t.apply(this,arguments);
  const a=$('t4');if(!a||$('t5'))return;
  a.insertAdjacentHTML('afterend','<button class="rw" id="t5"><span>📝</span>Ödevler</button>');
  $('t5').onclick=()=>aTAssign();
}}
async function aTAssign(msg){
  panel('<p>Yükleniyor...</p>');
  const r=await sb.rpc('teacher_assign_list');
  if(r.error){panel('<p>'+tErr(r)+'</p>'+btn('ob','Geri'));$('ob').onclick=aTeacher;return}
  const d=r.data||[];
  panel('<p><b>Ödevler</b></p>'+(msg?'<p><b>'+esc(msg)+'</b></p>':'')+btn('an','+ Yeni ödev')+(d.length?d.map(x=>'<button class="lvl" data-a="'+x.id+'" style="display:block;text-align:left"><b>'+esc(x.title)+'</b><br><small>'+x.n+' kelime · '+x.finished+'/'+x.students+' öğrenci bitirdi · '+gunTxt(x.due)+'</small>'+bar(x.finished,x.students,1)+'</button>').join(''):'<p>Henüz ödev yok.</p>')+btn('ob','Geri'));
  $('an').onclick=aTAssignNew;$('ob').onclick=aTeacher;
  document.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>aTAssignView(+b.dataset.a));
}
async function aTAssignView(id){
  panel('<p>Yükleniyor...</p>');
  const r=await sb.rpc('teacher_assign_progress',{_id:id});
  if(r.error||!r.data){panel('<p>'+tErr(r)+'</p>'+btn('ob','Geri'));$('ob').onclick=()=>aTAssign();return}
  const d=r.data,n=d.n;
  panel('<p><b>'+esc(d.title)+'</b></p><p class="cap">'+n+' kelime · '+gunTxt(d.due)+'</p>'
    +(d.students.length?d.students.map(s=>'<div class="wvr"><div style="display:flex;justify-content:space-between"><b class="w">'+esc(s.u)+(s.done>=n?' ✓':'')+'</b><small>'+s.done+'/'+n+'</small></div>'+bar(s.done,n,s.done>=n)+'</div>').join(''):'<p>Sınıfta öğrenci yok.</p>')
    +btn('csv','CSV indir')+btn('ad','Ödevi sil')+btn('ob','Geri'));
  $('ob').onclick=()=>aTAssign();
  $('csv').onclick=()=>csvIndir('odev-'+tarihDamga()+'.csv',[['Ödev','Öğrenci','Çözülen','Toplam','Durum','Son gün'],].concat(d.students.map(x=>[d.title,x.u,x.done,n,x.done>=n?'Tamamladı':x.done>0?'Devam ediyor':'Başlamadı',d.due||''])));
  $('ad').onclick=()=>cfAsk('"'+d.title+'" ödevi silinsin mi? Öğrencilerin listesinden kalkar.','Sil','Vazgeç',async()=>{const x=await sb.rpc('teacher_assign_del',{_id:id});aTAssign(x.error||x.data!=='ok'?'Silinemedi':'Ödev silindi')});
}
async function aTAssignNew(){
  panel('<p>Yükleniyor...</p>');
  const r=await sb.rpc('teacher_words');
  if(r.error){panel('<p>'+tErr(r)+'</p>'+btn('ob','Geri'));$('ob').onclick=()=>aTAssign();return}
  const d=r.data||[];
  if(!d.length){panel('<p>Önce "Sınıf kelimelerim"e kelime eklemelisin.</p>'+btn('ob','Geri'));$('ob').onclick=()=>aTAssign();return}
  const bugun=new Date().toISOString().slice(0,10);
  panel('<p><b>Yeni ödev</b></p><p>Başlık</p><input id="oh" maxlength="60" placeholder="Örn. Hafta 3 kelimeleri" style="'+SEL+'"><p>Son gün (isteğe bağlı)</p><input id="os" type="date" min="'+bugun+'" style="'+SEL+'"><p>Kelimeler <small id="oc"></small></p>'+btn('oa','Hepsini seç / kaldır')
    +'<div style="max-height:260px;overflow:auto;border:1px solid var(--line);border-radius:12px;padding:6px 10px;margin:6px 0">'+d.map(x=>'<label style="display:flex;gap:8px;align-items:center;padding:5px 0"><input type="checkbox" class="ok" value="'+x.id+'"><b>'+esc(x.w)+'</b> <small>'+esc(x.d)+'</small></label>').join('')+'</div><p id="te" style="color:var(--r)"></p>'+btn('ts','Ödevi ver')+btn('ob','Geri'));
  const kutu=()=>[...document.querySelectorAll('.ok')],say=()=>{$('oc').textContent='('+kutu().filter(c=>c.checked).length+' seçili)'};
  kutu().forEach(c=>c.onchange=say);say();
  $('oa').onclick=()=>{const hepsi=kutu().every(c=>c.checked);kutu().forEach(c=>c.checked=!hepsi);say()};
  $('ob').onclick=()=>aTAssign();
  $('ts').onclick=async()=>{
    const ids=kutu().filter(c=>c.checked).map(c=>+c.value);
    $('ts').disabled=true;
    const x=await sb.rpc('teacher_assign_save',{_title:$('oh').value,_due:$('os').value||null,_wids:ids});
    $('ts').disabled=false;
    if(x.error){$('te').textContent=tErr(x);return}
    if(!x.data||!x.data.ok){$('te').textContent=OE[x.data&&x.data.err]||'Kaydedilemedi.';return}
    aTAssign('Ödev verildi');
  };
}
Object.assign(EN,{'Ödevler':'Assignments','Ödevlerim':'My assignments','Öğretmeninin verdiği kelime ödevleri':"Word assignments from your teacher",'Şu an ödevin yok.':'You have no assignments right now.','Tamamlandı':'Completed','Son gün yok':'No deadline','Süresi geçti':'Overdue','Son gün bugün':'Due today','Son gün yarın':'Due tomorrow','Ödev için internet gerekli':'Internet is required for assignments','Ödev açılamadı':'Could not open the assignment','Ödev tamamlandı 🎉':'Assignment completed 🎉','Bu ödevi tamamladın ✓':'You completed this assignment ✓','+ Yeni ödev':'+ New assignment','Yeni ödev':'New assignment','Henüz ödev yok.':'No assignments yet.','Başlık':'Title','Son gün (isteğe bağlı)':'Due date (optional)','Hepsini seç / kaldır':'Select / clear all','Ödevi ver':'Give assignment','Ödevi sil':'Delete assignment','Ödev verildi':'Assignment given','Ödev silindi':'Assignment deleted','Silinemedi':'Could not delete','Önce "Sınıf kelimelerim"e kelime eklemelisin.':'Add words to "My class words" first.','Sınıfta öğrenci yok.':'No students in the class.'});
RX.push([/^(\d+) gün kaldı$/,(m,n)=>n+' days left'],[/^\((\d+) seçili\)$/,(m,n)=>'('+n+' selected)']);
