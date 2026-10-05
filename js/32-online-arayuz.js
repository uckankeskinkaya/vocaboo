// v20: Online menü ve oda kurma ekranı: alt alta liste yerine kartlar ve seçim düğmeleri.
// Oyun modları (Puan yarışı, Hayatta kalma, Arena) büyük kartlar; mod ayarları, kişi sayısı ve seviye düğme grupları.
(function(){
const MODES=[
  ['c','🏁','Puan yarışı','Aynı kelimeler, en çok puan toplayan kazanır'],
  ['s','⏱️','Hayatta kalma','Süre dolana kadar en çok kelimeyi bil'],
  ['k','🔔','Arena','Soru soru ilerler, canlı sıralama (sınıf yarışması)']
];
Object.assign(EN,{
  'Rastgele maç':'Random match','Hemen bir rakip bul (1v1)':'Find an opponent now (1v1)','Arkadaşlarınla ya da sınıfla oyna':'Play with friends or your class',
  'Oda kodun var mı?':'Have a room code?','Katıl':'Join','Oyun modu':'Game mode','Kaç kişi?':'How many players?','Seçenekler':'Options',
  'Aynı kelimeler, en çok puan toplayan kazanır':'Same words, the highest score wins','Süre dolana kadar en çok kelimeyi bil':'Know the most words before time runs out',
  'Soru soru ilerler, canlı sıralama (sınıf yarışması)':'One question at a time with a live ranking (class contest)',
  'Hayatta kalma':'Survival','Kelime sayısı':'Number of words','Süre':'Time','Soru sayısı':'Number of questions','Soru süresi':'Time per question',
  '15 kelime':'15 words','20 kelime':'20 words','3 dakika':'3 minutes','5 dakika':'5 minutes','10 soru':'10 questions','15 soru':'15 questions','20 soru':'20 questions',
  '10 sn':'10 sec','15 sn':'15 sec','20 sn':'20 sec','30 sn':'30 sec','45 sn':'45 sec','60 sn':'60 sec',
  '1v1':'1v1','2 kişi':'2 players','Grup':'Group','Aynı anda 50 kişiye kadar':'Up to 50 players at once','Karışık':'Mixed',
  'Ben de oynarım':'I will play too','Moderatör olurum, takip ederim':"I'll be the moderator and watch",
  'Arena\'da sen moderatörsün, soruları sunucu sorar':'In Arena you are the moderator and the server asks the questions',
  'Moderatör (sadece grup)':'Moderator (group only)','Odayı kur':'Create room','Moderatör':'Moderator','🔒 Pazardan alınır':'🔒 Buy in the Market','Son odaya geri dön':'Return to last room'
});
RX.push([/^Oyuncu: (.+)$/,'Player: $1'],[/^Oda: (.+)$/,'Room: $1']);
document.head.insertAdjacentHTML('beforeend',`<style>
.oh .op{display:flex;align-items:center;gap:12px;margin:2px 0 14px}.oh .op b{display:block;font-size:17px}.oh .op small{color:var(--dim);font-size:12.5px}
.otg{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px}
.ot{display:flex;flex-direction:column;align-items:flex-start;gap:4px;text-align:left;padding:14px;border-radius:18px;border:2px solid var(--line);background:var(--panel);box-shadow:var(--sh);transition:transform .12s,border-color .15s}
.ot b,.ot small{display:block}.ot:active{transform:scale(.97)}.ot i{font-style:normal;font-size:28px;line-height:1;margin-bottom:4px}.ot b{font-size:15px}.ot small{color:var(--dim);font-size:12px;line-height:1.3}
.ot.big{min-height:128px}.ot.on{border-color:var(--ac);background:color-mix(in srgb,var(--ac) 12%,var(--panel))}
.ot.on b{color:var(--ac)}.ot.wide{grid-column:1/-1;flex-direction:row;align-items:center;gap:12px;min-height:0}.ot.wide i{margin:0}
.ojc{padding:14px;border-radius:18px;border:1px solid var(--line);background:var(--panel);margin-bottom:12px}.ojc p{margin:0 0 8px;font-size:13px;color:var(--dim)}
.ojr{display:flex;gap:8px}.ojr input{flex:1;min-width:0;text-align:center;letter-spacing:.4em;font-size:22px;font-weight:800;text-transform:uppercase;padding:10px;border-radius:12px;border:1px solid var(--line);background:var(--panel);color:var(--fg)}
.ojr button{padding:0 20px;border-radius:12px;border:0;background:var(--ac);color:var(--acf);font-weight:800}
.os h3{margin:16px 0 8px;font-size:13px;color:var(--dim);font-weight:700;text-transform:uppercase;letter-spacing:.06em}.os h3:first-child{margin-top:4px}
.otm{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.otm .ot{align-items:center;text-align:center;padding:12px 6px;min-height:104px}
.otm .ot small{font-size:11px}
.och{display:grid;grid-template-columns:repeat(var(--c,2),1fr);gap:10px}
.och button{display:flex;align-items:center;justify-content:center;text-align:center;min-height:56px;padding:10px 8px;border-radius:16px;border:2px solid var(--line);background:var(--panel);font-weight:700;font-size:16px;line-height:1.2;transition:transform .12s,border-color .15s}
.och button:active{transform:scale(.97)}
.och button.on{border-color:var(--ac);background:var(--ac);color:var(--acf)}
.och.lv button:first-child{grid-column:1/-1}
.och.lv button{min-height:50px}
.opp{display:grid;grid-template-columns:1fr 1fr;gap:8px}.opp .ot{flex-direction:row;align-items:center;gap:10px;padding:12px}.opp .ot i{font-size:22px;margin:0}
.onote{padding:10px 12px;border-radius:12px;background:color-mix(in srgb,var(--ac) 10%,transparent);font-size:13px;color:var(--dim)}
.osum{margin:16px 0 10px;padding:10px 12px;border-radius:12px;border:1px dashed var(--line);font-size:13px;text-align:center;color:var(--dim)}
#orj{grid-column:1/-1}
#ok2{background:var(--ac)!important;color:var(--acf)!important;border-color:var(--ac)!important;font-weight:800;font-size:16px}
</style>`);
const q=s=>document.querySelector(s);
function oHomeYeni(){
  $('home').hidden=true;$('online').hidden=false;
  sb=sb||supabase.createClient(SB_URL,SB_KEY);
  if(!prof){aAuth('Online için giriş yap');return}
  myName=prof.username;
  let r=null;try{r=JSON.parse(localStorage.getItem('ka_room'))}catch(e){}
  const geri=r&&Date.now()-r.t<=18e5;
  on('<div class="oh"><div class="op">'+frameWrap(av(prof.avatar,48),prof.frame)+'<div><b>'+esc(myName)+'</b><small>'+esc(titleOf(prof))+'</small></div></div>'
    +'<div class="otg">'
    +'<button class="ot big" id="orm"><i>⚔️</i><b>Rastgele maç</b><small>Hemen bir rakip bul (1v1)</small></button>'
    +'<button class="ot big" id="oc"><i>🏠</i><b>Oda kur</b><small>Arkadaşlarınla ya da sınıfla oyna</small></button>'
    +'</div>'
    +'<div class="ojc"><p>Oda kodun var mı?</p><div class="ojr"><input id="cd" maxlength="4" autocapitalize="characters" autocomplete="off" aria-label="Oda kodu"><button id="oj">Katıl</button></div></div>'
    +btn('ob','Ana menü')+'</div>');
  $('ob').onclick=()=>oExit();
  $('oc').onclick=oSetup;$('orm').onclick=oRandom;
  $('oj').onclick=()=>{const c=$('cd').value.trim().toUpperCase();if(c.length<4)return;oJoin(c,false)};
  if(geri){
    q('.otg').insertAdjacentHTML('beforeend','<button class="ot wide" id="orj"><i>↩️</i><div><b>Son odaya geri dön</b><small>Oda: '+esc(r.c)+'</small></div></button>');
    $('orj').onclick=()=>{myName=prof.username;oJoin(r.c,false)};
  }
}
const _ohEski=oHome;
oHome=function(){
  if(!window.supabase||SB_URL.indexOf('PASTE')===0){_ohEski();return}
  oHomeYeni();
};
$('mOnline').onclick=oHome;

// Oda kurma: durum bu nesnede tutulur, her seçimde ekran yeniden çizilir
const S={k:'c',cnt:15,dur:180,q:15,t:20,ppl:2,lv:-1,mod:0};
const chips=(id,list,val,c,extra)=>'<div class="och'+(extra?' '+extra:'')+'" data-g="'+id+'" style="--c:'+(c||list.length)+'">'+list.map(x=>'<button data-v="'+x[0]+'"'+(x[0]===val?' class="on"':'')+'>'+x[1]+'</button>').join('')+'</div>';
function oSetupYeni(){
  const ar=S.k==='k';
  let h='<div class="os"><h3>Oyun modu</h3><div class="otm">'+MODES.map(m=>'<button class="ot'+(m[0]===S.k?' on':'')+'" data-mode="'+m[0]+'"><i>'+m[1]+'</i><b>'+m[2]+'</b><small>'+m[3]+'</small></button>').join('')+'</div>';
  h+='<h3>Seçenekler</h3>';
  if(S.k==='c')h+=chips('cnt',[[15,'15 kelime'],[20,'20 kelime']],S.cnt);
  else if(S.k==='s')h+=chips('dur',[[180,'3 dakika'],[300,'5 dakika']],S.dur);
  else h+='<h3 style="margin-top:0">Soru sayısı</h3>'+chips('q',[[10,'10 soru'],[15,'15 soru'],[20,'20 soru']],S.q)+'<h3>Soru süresi</h3>'+chips('t',[10,15,20,30,45,60].map(v=>[v,v+' sn']),S.t,3);
  if(!ar){
    h+='<h3>Kaç kişi?</h3><div class="opp"><button class="ot'+(S.ppl===2?' on':'')+'" data-ppl="2"><i>👥</i><div><b>1v1</b><small>2 kişi</small></div></button><button class="ot'+(S.ppl===50?' on':'')+'" data-ppl="50"><i>🎉</i><div><b>Grup</b><small>Aynı anda 50 kişiye kadar</small></div></button></div>';
  }
  h+='<h3>Seviye</h3>'+chips('lv',[[-1,'Karışık']].concat(LBL.map((l,i)=>[i,l])),S.lv,4,'lv');
  if(ar)h+='<h3>Moderatör</h3><div class="onote">Arena\'da sen moderatörsün, soruları sunucu sorar</div>';
  else if(S.ppl>2)h+='<h3>Moderatör (sadece grup)</h3>'+chips('mod',[[0,'Ben de oynarım'],[1,'Moderatör olurum, takip ederim']],S.mod);
  const mn=MODES.find(m=>m[0]===S.k)[2],ex=S.k==='c'?S.cnt+' kelime':S.k==='s'?(S.dur/60)+' dakika':S.q+' soru, '+S.t+' sn',kisi=ar?'Grup':S.ppl===2?'1v1':'Grup';
  h+='<div class="osum">'+mn+' · '+ex+' · '+kisi+' · '+(S.lv<0?'Karışık':LBL[S.lv])+'</div></div>'+btn('ok2','Odayı kur')+btn('ob','Geri');
  on(h);
  document.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{S.k=b.dataset.mode;oSetupYeni()});
  document.querySelectorAll('[data-ppl]').forEach(b=>b.onclick=()=>{S.ppl=+b.dataset.ppl;if(S.ppl===2)S.mod=0;oSetupYeni()});
  document.querySelectorAll('.och').forEach(g=>g.querySelectorAll('button').forEach(b=>b.onclick=()=>{S[g.dataset.g]=+b.dataset.v;oSetupYeni()}));
  $('ob').onclick=oHome;
  $('ok2').onclick=()=>{
    const cfg0=S.k==='k'?{max:50,m:'k',n:S.q,dur:0,l:S.lv,mod:1,T:S.t}:{max:S.ppl,m:S.k,n:S.k==='c'?S.cnt:0,dur:S.k==='s'?S.dur:0,l:S.lv,mod:(S.ppl>2&&S.mod===1)?1:0};
    cfg=cfg0;oJoin(Math.random().toString(36).slice(2,6).toUpperCase(),true);
  };
}
oSetup=oSetupYeni;
})();
