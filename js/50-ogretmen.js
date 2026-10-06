// v32: Öğretmen paneli. Öğretmen (yönetici "Öğretmen yetkisi ver" ile atar) kendi kelimelerini ekler (Sınıf kelimeleri = seviye 4)
// ve sadece sınıf öğrencilerinin ilerlemesini görür. Kullanıcı yönetimi, engelleme, şifre gibi yetkileri YOKTUR.
const isT=()=>!!(prof&&(prof.teacher||prof.admin)),clsOK=()=>!!(prof&&(prof.cls||isT()));
if(!W[4])W[4]=[];
const HE={karakter:'Metinde < ve > karakterleri kullanılamaz.',kelime:'Kelime 3-14 harf, sadece a-z olmalı.',tanim:'Tanım 3-200 karakter olmalı.',tr:'Türkçesi en fazla 200 karakter.',cumle:'Örnek cümle kelimeyi içermeli.',var:'Bu kelime zaten sınıf listende.',dolu:'Sınıf listesi dolu (500).',yok:'Kelime bulunamadı.'};
// Sınıf kelimeleri seviyesi: sadece sınıf üyesi/öğretmen için alıştırma ve oda seviyelerinde görünür
function lvSync(){
  const var_=LV.length>4,ok=clsOK();
  if(ok===var_)return;
  if(ok){LV.push(['Sınıf',10,'Öğretmenin kelimeleri']);LBL.push('Sınıf')}else{LV.pop();LBL.pop()}
  $('lvls').innerHTML=LV.map((l,i)=>'<button class="lvl" data-i="'+i+'"><span><b>'+l[0]+'</b><small>'+l[2]+'</small></span><span>x'+l[1]+'</span></button>').join('');
  document.querySelectorAll('#lvls .lvl').forEach(b=>b.onclick=()=>{sess=[];mode='practice';lv=+b.dataset.i;(PSV&&sb&&prof)?pStart(lv):next()});
}
{const _r=rHome;rHome=function(){_r.apply(this,arguments);lvSync()}}
// Profil: Öğretmen paneli girişi
{const _p=aProfile;aProfile=function(){
  _p.apply(this,arguments);
  const m=$('pmb');if(!m||!isT()||$('hcb'))return;
  m.insertAdjacentHTML('beforebegin','<button class="pmb" id="hcb"><span>🎓</span><div>Öğretmen paneli<small>Sınıf özeti, zor kelimeler, kendi kelimelerin</small></div></button>');
  $('hcb').onclick=aTeacher;
}}
function tErr(r){return /function|PGRST202|schema cache/i.test((r.error&&r.error.message)||'')?'Bu özellik sunucuda henüz kurulmadı.':'Yüklenemedi. Biraz sonra tekrar dene.'}
function aTeacher(){
  if(!isT()){toast('Yetkin yok.');return}
  panel('<p><b>🎓 Öğretmen paneli</b></p><div class="lst"><button class="rw" id="t1"><span>👥</span>Sınıf özeti</button><button class="rw" id="t2"><span>🧩</span>Zorlanılan kelimeler</button><button class="rw" id="t3"><span>📚</span>Sınıf kelimelerim</button><button class="rw" id="t4"><span>📋</span>Toplu kelime ekle</button></div>'+btn('ob','Geri'));
  $('t1').onclick=aTClass;$('t2').onclick=aTHard;$('t3').onclick=()=>aTWords();$('t4').onclick=aTBulk;$('ob').onclick=()=>aProfile();
}
async function aTClass(){
  panel('<p>Yükleniyor...</p>');
  const r=await sb.rpc('teacher_class');
  if(r.error){panel('<p>'+tErr(r)+'</p>'+btn('ob','Geri'));$('ob').onclick=aTeacher;return}
  const d=r.data||[],S=(a,b)=>'<div class="st"><b>'+a+'</b><span>'+b+'</span></div>';
  const bugun=d.filter(x=>x.ls!==null&&x.ls<86400).length,hf=d.reduce((a,x)=>a+(+x.w7||0),0),akt=d.filter(x=>x.d7>0).length;
  panel('<p><b>Sınıf özeti</b></p><div class="sg3">'+S(d.length,'Öğrenci')+S(bugun,'Son 24 saatte aktif')+S(hf,'Bu hafta çözülen')+'</div><p class="cap">Son 7 günde oynayan: '+akt+'/'+d.length+'</p>'
    +(d.length?d.map(x=>{const t=(+x.ws||0)+(+x.wf||0);return '<button class="lvl" data-s="'+esc(x.id)+'" style="display:block;text-align:left"><b>'+esc(x.u)+'</b><br><small>Bu hafta '+x.w7+' kelime · '+x.d7+'/7 gün · doğruluk '+(t?Math.round(x.ws/t*100)+'%':'-')+' · '+(x.ls===null?'hiç girmedi':lastSeen(x.ls))+'</small></button>'}).join(''):'<p>Sınıfta henüz öğrenci yok.</p>')
    +btn('ob','Geri'));
  $('ob').onclick=aTeacher;
  document.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>aTStudent(b.dataset.s,d.find(x=>x.id===b.dataset.s)));
}
async function aTStudent(id,x){
  panel('<p>Yükleniyor...</p>');
  const r=await sb.rpc('teacher_student',{_id:id});
  if(r.error||!r.data){panel('<p>'+tErr(r)+'</p>'+btn('ob','Geri'));$('ob').onclick=aTClass;return}
  const g=r.data.days||[],mx=Math.max(1,...g.map(y=>+y.s||0)),t=(+x.ws||0)+(+x.wf||0);
  panel('<p><b>'+esc(x.u)+'</b></p><p class="cap">Seviye '+lvlOf(x.xp||0)+' · '+x.ws+' kelime çözdü · doğruluk '+(t?Math.round(x.ws/t*100)+'%':'-')+' · günlük seri '+(x.ds||0)+'</p><p>Son 14 gün (çözülen kelime)</p>'
    +'<div style="display:flex;align-items:flex-end;gap:3px;height:90px;margin:6px 0 4px">'+g.map(y=>'<div title="'+esc(y.d)+': '+y.s+'" style="flex:1;background:'+(y.s>0?'var(--g)':'var(--line)')+';border-radius:3px;height:'+Math.max(4,Math.round((+y.s||0)/mx*90))+'px"></div>').join('')+'</div>'
    +'<div style="display:flex;justify-content:space-between"><small>'+esc((g[0]||{}).d||'')+'</small><small>bugün</small></div>'+btn('ob','Geri'));
  $('ob').onclick=aTClass;
}
async function aTHard(){
  panel('<p>Yükleniyor...</p>');
  const r=await sb.rpc('teacher_hard');
  if(r.error){panel('<p>'+tErr(r)+'</p>'+btn('ob','Geri'));$('ob').onclick=aTeacher;return}
  const d=r.data||[];
  panel('<p><b>Zorlanılan kelimeler</b></p><p class="cap">Son 30 gün, sınıf öğrencileri. En az 2 kişinin denediği, çözülemeyenler öne çıkar.</p>'
    +(d.length?d.map(x=>'<div class="wvr"><div style="display:flex;justify-content:space-between;align-items:center"><b class="w">'+esc(x.w)+'</b><span><button class="sbtn" data-sp="'+esc(x.w)+'">🔊</button> <small>'+(x.n-x.ok)+'/'+x.n+' çözemedi</small></span></div><small>'+esc(x.d)+'.'+(x.tr?' — '+esc(x.tr):'')+'</small></div>').join(''):'<p>Henüz yeterli veri yok.</p>')+btn('ob','Geri'));
  $('ob').onclick=aTeacher;
  document.querySelectorAll('[data-sp]').forEach(b=>b.onclick=()=>speak(b.dataset.sp));
}
let TW={};
async function aTWords(msg){
  panel('<p>Yükleniyor...</p>');
  const r=await sb.rpc('teacher_words');
  if(r.error){panel('<p>'+tErr(r)+'</p>'+btn('ob','Geri'));$('ob').onclick=aTeacher;return}
  const d=r.data||[];TW={};d.forEach(x=>TW[x.id]=x);
  panel('<p><b>Sınıf kelimelerim</b> <small>('+d.length+')</small></p><p class="cap">Bu kelimeler sadece sınıftakilere ve sana "Sınıf" seviyesinde (alıştırma ve oda kurarken) görünür.</p>'+(msg?'<p><b>'+esc(msg)+'</b></p>':'')+btn('tn','+ Yeni kelime')
    +(d.length?d.map(x=>'<div class="wvr"><div style="display:flex;justify-content:space-between;align-items:center"><b class="w">'+esc(x.w)+'</b><span><button class="sbtn" data-sp="'+esc(x.w)+'">🔊</button> <button class="sbtn" data-e="'+x.id+'">Düzenle</button></span></div><small>'+esc(x.d)+'.'+(x.tr?' — '+esc(x.tr):'')+'</small></div>').join(''):'<p>Henüz kelime eklemedin.</p>')+btn('ob','Geri'));
  $('tn').onclick=()=>aTWord(null);$('ob').onclick=aTeacher;
  document.querySelectorAll('[data-e]').forEach(b=>b.onclick=()=>aTWord(+b.dataset.e));
  document.querySelectorAll('[data-sp]').forEach(b=>b.onclick=()=>speak(b.dataset.sp));
}
function aTWord(id){
  const x=id?TW[id]:{w:'',d:'',tr:'',x:''},f=(i,l,v,m)=>'<p>'+l+'</p><input id="'+i+'" maxlength="'+m+'" autocapitalize="none" value="'+esc(v||'')+'" style="'+SEL+'">';
  panel('<p><b>'+(id?'Kelimeyi düzenle':'Yeni kelime')+'</b></p>'+f('tw','Kelime (a-z, 3-14 harf)',x.w,14)+f('td','İngilizce tanım',x.d,200)+f('tt','Tanımın Türkçesi (isteğe bağlı, alıştırmada TR düğmesiyle görünür)',x.tr,200)+f('tx','Örnek cümle (isteğe bağlı, kelimeyi içermeli)',x.x,200)+'<p id="te" style="color:var(--r)"></p>'+btn('ts','Kaydet')+(id?btn('tdl','Sil'):'')+btn('ob','Geri'));
  $('ob').onclick=()=>aTWords();
  $('ts').onclick=async()=>{
    $('ts').disabled=true;
    const r=await sb.rpc('teacher_word_save',{_id:id||null,_w:$('tw').value,_d:$('td').value,_tr:$('tt').value,_x:$('tx').value});
    $('ts').disabled=false;
    if(r.error){$('te').textContent=tErr(r);return}
    if(r.data!=='ok'){$('te').textContent=HE[r.data]||'Kaydedilemedi.';return}
    pkTemizle();aTWords('Kaydedildi');
  };
  if(id)$('tdl').onclick=()=>cfAsk(x.w+' silinsin mi?','Sil','Vazgeç',async()=>{const r=await sb.rpc('teacher_word_del',{_id:id});pkTemizle();aTWords(r.error||r.data!=='ok'?'Silinemedi':'Silindi')});
}
// Çevrimdışı kelime paketi eskidi: bir sonraki girişte yeniden indirilsin
function pkTemizle(){try{localStorage.removeItem('ka_pack')}catch(e){}if(typeof PK!=='undefined')PK=null}
function aTBulk(){
  panel('<p><b>Toplu kelime ekle</b></p><p class="cap">Her satıra bir kelime: <b>kelime | İngilizce tanım | tanımın Türkçesi | örnek cümle</b>. Türkçe ve örnek cümle boş bırakılabilir. Excel\'den yapıştırırsan sekmeyle ayrılmış da olur. En fazla 100 satır.</p><textarea id="tb" rows="9" placeholder="budget | a plan for money | bütçe | We need a budget.\nharvest | to gather crops | hasat" style="'+SEL+';width:100%;font-family:inherit"></textarea><p id="te"></p>'+btn('ts','Ekle')+btn('ob','Geri'));
  $('ob').onclick=aTeacher;
  $('ts').onclick=async()=>{
    const L=$('tb').value.split('\n').map(s=>s.trim()).filter(Boolean).slice(0,100);
    if(!L.length){$('te').textContent='Önce kelimeleri yaz.';return}
    $('ts').disabled=true;let ok=0;const hata=[];
    for(let i=0;i<L.length;i++){
      const p=L[i].split(/\s*[|\t]\s*/);$('te').textContent='Ekleniyor... '+(i+1)+'/'+L.length;
      const r=await sb.rpc('teacher_word_save',{_id:null,_w:p[0],_d:p[1]||'',_tr:p[2]||'',_x:p[3]||''});
      if(!r.error&&r.data==='ok')ok++;else hata.push((i+1)+'. satır ('+(p[0]||'?')+'): '+(r.error?'sunucu hatası':(HE[r.data]||'hata')));
    }
    $('ts').disabled=false;pkTemizle();
    $('te').innerHTML=esc(ok+' kelime eklendi.')+(hata.length?'<br><span style="color:var(--r)">'+hata.slice(0,10).map(esc).join('<br>')+(hata.length>10?'<br>...':'')+'</span>':'');
  };
}
// Yönetici: kullanıcıya hoca yetkisi ver/al
{const _a=aAdUser;aAdUser=function(id,q){
  _a.apply(this,arguments);
  const x=AU[id],a=$('u3');if(!x||!a||$('u8'))return;
  a.insertAdjacentHTML('afterend',btn('u8',x.t?'Öğretmen yetkisini al':'Öğretmen yap'));
  $('u8').onclick=()=>cfAsk(x.u+(x.t?' için öğretmen yetkisi alınsın mı?':' öğretmen yapılsın mı? Sınıf öğrencilerinin ilerlemesini görür ve kendi kelimelerini ekler.'),'Evet','Vazgeç',async()=>{const r=await sb.rpc('admin_teacher',{_id:id,_on:!x.t});toast(r.error||r.data!=='ok'?'Yapılamadı':'Tamam');aAdUsers(q||'')});
}}
Object.assign(EN,{'Öğretmen paneli':'Teacher panel','Sınıf özeti':'Class overview','Zorlanılan kelimeler':'Hard words','Sınıf kelimelerim':'My class words','Toplu kelime ekle':'Bulk add words','Sınıf':'Class','Öğretmenin kelimeleri':"Teacher's words",'Öğretmen yap':'Make teacher','Öğretmen yetkisini al':'Remove teacher role','+ Yeni kelime':'+ New word','Kelimeyi düzenle':'Edit word','Yeni kelime':'New word','İngilizce tanım':'English definition','Tanımın Türkçesi (isteğe bağlı, alıştırmada TR düğmesiyle görünür)':'Turkish translation of the definition (optional, shown with the TR button in practice)','Kaydet':'Save','Öğrenci':'Students','Son 24 saatte aktif':'Active in last 24h','Bu hafta çözülen':'Solved this week','Sınıf özeti, zor kelimeler, kendi kelimelerin':'Class overview, hard words, your own words'});
