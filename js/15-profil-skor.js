
// v6: hareketli temalar (hızlı, gösterişli), yeni profil, sıralama ve oyun iç arayüzü
Object.assign(EN,{'(sen)':'(you)','En üst unvan':'Top rank','Senin ve arkadaşlarının Seri rekoru.':"Your and your friends' Streak records.",'Geçen haftanın sınıf sıralaması.':"Last week's class ranking."});
RX.push([/^(\d+) kelime sonra (.+)$/,(m,a,b)=>a+' words to '+(EN[b]||b)]);
document.head.insertAdjacentHTML('beforeend',`<style>
:root[data-anim="1"] body::before{inset:-25%;animation:drift 9s ease-in-out infinite alternate;will-change:transform}
:root[data-anim="1"] body::after{inset:-25%;animation:xf 4.5s ease-in-out infinite,drift2 11s ease-in-out infinite alternate;will-change:opacity,transform}
@keyframes drift{from{transform:translate3d(-6%,-4%,0) rotate(0) scale(1)}to{transform:translate3d(6%,5%,0) rotate(14deg) scale(1.18)}}
@keyframes drift2{from{transform:translate3d(5%,4%,0) rotate(0) scale(1.1)}to{transform:translate3d(-6%,-5%,0) rotate(-16deg) scale(1)}}
:root[data-anim="1"] .feat{background-size:240% 240%;animation:sh 6s ease-in-out infinite}
@keyframes sh{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
:root[data-perf=low] body::before,:root[data-perf=low] .feat{animation:none!important}
@media (prefers-reduced-motion:reduce){:root body::before,body::after,:root .feat{animation:none!important}}
.pf-h{display:flex;flex-direction:column;align-items:center;gap:4px;padding:18px 14px;border-radius:22px;margin-bottom:12px;background:linear-gradient(160deg,color-mix(in srgb,var(--ac) 22%,transparent),transparent),var(--panel);border:1px solid var(--line)}
.pf-h img,.pf-h>div:first-child{box-shadow:0 0 0 3px var(--ac)}
.pf-h h2{margin:8px 0 0;font-size:20px}.pf-h small{color:var(--dim);font-size:12px}
.chip{font-size:12px;font-weight:700;padding:3px 12px;border-radius:999px;background:var(--ac);color:var(--acf)}
.pbar{width:70%;height:6px;border-radius:3px;background:var(--key);margin-top:8px;overflow:hidden}.pbar i{display:block;height:100%;background:var(--ac);border-radius:3px}
.sg3{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:12px}
.st{border:1px solid var(--line);border-radius:14px;background:var(--panel);padding:10px 6px;text-align:center}.st b{display:block;font-size:18px;font-weight:800}.st span{font-size:11px;color:var(--dim)}
.bdr{display:flex;align-items:center;gap:6px;padding:10px 12px;border:1px solid var(--line);border-radius:14px;background:var(--panel);margin-bottom:12px;font-size:20px}.bdr i{font-style:normal}.bdr i.off{filter:grayscale(1);opacity:.35}.bdr small{margin-left:auto;font-size:12px;color:var(--dim)}
.lst{border:1px solid var(--line);border-radius:18px;background:var(--panel);overflow:hidden;margin-bottom:12px}
.rw{display:flex;align-items:center;gap:12px;width:100%;padding:13px 14px;border:0;border-bottom:1px solid var(--line);background:transparent;font-size:14.5px;font-weight:600;text-align:left}.rw:last-child{border-bottom:0}.rw:hover{background:var(--key)}.rw::after{content:'›';margin-left:auto;color:var(--dim);font-size:20px}.rw span{width:22px;text-align:center}
.pl.me{border-color:var(--ac)}.rk{font-style:normal;width:22px;color:var(--dim);font-weight:700;text-align:center}
.seg.sm{margin-bottom:8px}.seg.sm button{height:36px;font-size:13px;padding:0 4px}
.pc img,.pc>div{margin-bottom:4px}
#top{align-items:center}#back{padding:6px 12px;font-size:12px;background:transparent}
#badge{background:var(--panel);border:1px solid var(--line);padding:5px 12px;border-radius:999px;color:var(--fg);font-size:12px}
#def{font-size:15px;padding:12px 14px;border-radius:16px;background:var(--panel);border:1px solid var(--line)}
#def small{display:inline-block;margin:8px 0 0;padding:2px 9px;border-radius:999px;background:var(--key);font-weight:700}
#hintbtn,#passbtn{border-radius:14px}#hintbtn{width:44px}
.tile{border:1.5px solid var(--line);background:var(--panel);box-shadow:none}
.tile.f{border-color:var(--fg);animation:pop .18s}.tile.cu{border-color:var(--ac);box-shadow:0 0 0 3px color-mix(in srgb,var(--ac) 22%,transparent)}
.tile.g,.tile.o,.tile.r{border-color:transparent}
.cap{display:inline-block;padding:2px 10px;border-radius:999px;background:var(--key)}
#res:empty{display:none}#res{background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:12px}
</style>`);
const rw=(id,i,t)=>'<button class="rw" id="'+id+'"><span>'+i+'</span>'+t+'</button>';
const _st2=setTheme;setTheme=function(t){_st2(t);document.documentElement.dataset.anim=TM[t]&&TM[t][11]?'1':''};
try{const t=localStorage.getItem('ka_theme');document.documentElement.dataset.anim=TM[t]&&TM[t][11]?'1':''}catch(e){}
function aProfile(){
  if(!sb){noSb();return}if(!prof){aAuth();return}
  const P=prof,n=P.words_solved||0,t=n+(P.words_failed||0),nb=BD.filter(b=>b[2](P)).length,ds=P.last_daily&&P.last_daily>=dStr(dayNum()-1)?P.daily_streak:0;
  const xp=P.xp||0,L=lvlOf(xp),a=lvXp(L),b=lvXp(L+1),pct=L>=100?100:Math.round((xp-a)/(b-a)*100),nx=TT.find(x=>x[0]>L);
  const S=(a,b)=>'<div class="st"><b>'+a+'</b><span>'+b+'</span></div>';
  panel('<div class="pf-h">'+frameWrap(av(P.avatar,84),P.frame)+'<h2>'+esc(P.username)+'</h2><span class="chip">'+titleOf(P)+'</span><div class="pbar"><i style="width:'+pct+'%"></i></div><small>Seviye '+L+' · '+(L>=100?'MAX':(xp-a)+'/'+(b-a)+' XP')+'</small><small>'+(nx?'Seviye '+nx[0]+' ile '+nx[1]:'En üst unvan')+'</small></div>'
   +'<div class="sg3">'+S(t?Math.round(n/t*100)+'%':'-','Doğruluk')+S(n,'Çözülen kelime')+S(P.total_points||0,'Toplam puan')+S(P.best_score,'Seri rekoru')+S(P.best_streak,'En uzun seri')+S(ds,'Günlük seri')+'</div>'
   +'<div class="bdr">'+BD.slice().sort((a,b)=>b[2](P)-a[2](P)).slice(0,8).map(b=>'<i class="'+(b[2](P)?'':'off')+'">'+b[1]+'</i>').join('')+'<small>'+nb+'/'+BD.length+'</small></div>'
   +'<input id="pf" type="file" accept="image/*" hidden><div class="lst">'+rw('nb','📖','Kelime defterim')+rw('bb','🏅','Rozetler')+rw('tb2','📈','Unvan ilerlemesi')+rw('pp','📷','Fotoğraf yükle')+rw('pv','🎭','Hazır avatar seç')+rw('fr','🖼️','Avatar çerçevesi')+rw('un','✏️','Kullanıcı adını değiştir')+rw('pwc','🔑','Şifreni değiştir')+rw('lo','↩','Çıkış yap')+'</div>');
  $('bb').onclick=aBadges;$('nb').onclick=aBook;$('tb2').onclick=aTitles;$('fr').onclick=aFrames;
  $('pp').onclick=()=>$('pf').click();$('pv').onclick=aAvatar;$('pf').onchange=aPhoto;$('un').onclick=aUsername;$('pwc').onclick=()=>aNewPw(true);
  $('lo').onclick=async()=>{await flushStats();await sb.auth.signOut();prof=null;rHome();aAuth()};
};
async function aBoard(tab,col){
  tab=tab||'all';col=col||'best_score';
  if(!sb){noSb();return}
  panel('<p>Yükleniyor...</p>');
  const wk=dStr(dayNum()-((dayNum()+3)%7)-(tab==='last'?7:0));let d=[],err=false;
  if(tab==='fr'){const r=await sb.rpc('friend_list');err=!!r.error;if(!err)d=[{u:prof.username,a:prof.avatar,f:prof.frame,xp:prof.xp,v:prof.best_score}].concat(r.data.friends.map(x=>({u:x.u,a:x.im,f:x.fr,xp:x.xp,v:x.bs})))}
  else if(tab==='week'||tab==='last'){
    const [p,w]=await Promise.all([sb.from('profiles').select('id,username,avatar,frame,xp').eq('banned',false).limit(500),sb.from('weekly_scores').select('user_id,best_score').eq('week',wk).limit(500)]);
    err=!!(p.error||w.error);const m={};(w.data||[]).forEach(x=>{m[x.user_id]=x.best_score});
    d=(p.data||[]).map(x=>({u:x.username,a:x.avatar,f:x.frame,xp:x.xp,v:m[x.id]}));
  }else{
    const r=await sb.from('profiles').select('username,avatar,frame,xp,best_score,best_daily_streak').eq('banned',false).limit(500);err=!!r.error;
    d=(r.data||[]).map(x=>({u:x.username,a:x.avatar,f:x.frame,xp:x.xp,v:x[col]}));
  }
  if(err){panel('<p>Skor tablosu yüklenemedi.</p>'+btn('ob','Ana menü'));$('ob').onclick=()=>oExit();return}
  d.forEach(x=>{x.v=+x.v||0});
  d.sort((a,b)=>b.v-a.v||String(a.u).localeCompare(String(b.u)));
  d.forEach((x,i)=>{x.r=i&&x.v===d[i-1].v?d[i-1].r:i+1});
  const me=prof&&d.find(x=>x.u===prof.username),medal=['🥇','🥈','🥉'];
  const sg=(id,t,on)=>'<button id="'+id+'"'+(on?' class="on"':'')+'>'+t+'</button>';
  const row=x=>'<div class="lbr'+(x.r<=3?' t'+x.r:'')+(x===me?' me':'')+'" data-pu="'+esc(x.u||'')+'" style="cursor:pointer"><span class="lbn">'+(x.r<=3?medal[x.r-1]:x.r)+'</span><span class="lba">'+frameWrap(av(x.a,x.r<=3?48:44),x.f)+'</span><span class="lbu"><b>'+esc(x.u||'?')+(x===me?' (sen)':'')+'</b><small>Seviye '+lvlOf(x.xp||0)+'</small></span><span class="lbv">'+x.v+'</span></div>';
  panel('<div class="seg sm">'+sg('t1','Tüm zamanlar',tab==='all')+sg('t2','Haftalık',tab==='week')+sg('t3','Geçen hafta',tab==='last')+sg('t4','Arkadaşlar',tab==='fr')+'</div>'
    +(tab==='all'?'<div class="seg sm">'+sg('c1','Seri rekoru',col==='best_score')+sg('c2','Günlük seri',col!=='best_score')+'</div>':'<p class="cap">'+(tab==='fr'?'Senin ve arkadaşlarının Seri rekoru.':tab==='last'?'Geçen haftanın sıralaması.':'Bu haftanın Seri Modu puanı. Pazartesi sıfırlanır.')+'</p>')
    +(me?'<div class="lbme"><span>Sıran</span><b>'+me.r+'</b><span>/ '+d.length+'</span></div>':'')
    +(d.length?'<div class="lb">'+d.map(row).join('')+'</div>':'<p>Henüz kayıt yok.</p>'));
  $('t1').onclick=()=>aBoard('all',col);$('t2').onclick=()=>aBoard('week');$('t3').onclick=()=>aBoard('last');$('t4').onclick=()=>aBoard('fr');
  if(tab==='all'){$('c1').onclick=()=>aBoard('all','best_score');$('c2').onclick=()=>aBoard('all','best_daily_streak')}
};
