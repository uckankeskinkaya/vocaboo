// İngilizce modda hiçbir ekranda çevrilmemiş Türkçe metin kalmamalı (rozetler, şifre, kullanıcı adı, skor tablosu, admin, Arena...).
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async()=>{ const s=await sayfaAc({bekle:400});
const out=await s.sayfa.evaluate(async()=>{
  const wait=ms=>new Promise(r=>setTimeout(r,ms));const sonuc={};
  localStorage.setItem('ka_lang','en');
  sb={rpc:async(n,a)=>({data:n==='admin_pw_requests'?[{id:1,uid:'u1',u:'veli',t:'2026-10-05T10:00:00Z'}]:n==='admin_pw_reset'?{ok:true,u:'veli',code:'ABCD2345'}:n==='champ_week'?null:n==='friend_list'?{code:'AB12',friends:[{u:'veli',im:null,fr:null,bs:80,xp:200}],incoming:[]}:n==='admin_users'?[]:null,error:null}),
    from:t=>{const q={select:()=>q,eq:()=>q,limit:()=>q,gt:()=>q,order:()=>q,single:()=>q,in:()=>q,then:r=>r({data:t==='profiles'?[{id:'a',username:'ali',avatar:null,frame:null,xp:300,best_score:90,best_daily_streak:2},{id:'b',username:'veli',avatar:null,frame:'altin',xp:100,best_score:40,best_daily_streak:1}]:[],error:null})};return q},auth:{updateUser:async()=>({error:null}),signOut:async()=>{}}};
  loadProf=async()=>{};
  prof={id:'a',username:'ali',avatar:null,frame:null,xp:300,best_score:90,best_streak:5,words_solved:60,words_failed:10,first_try:12,total_points:2000,daily_streak:2,best_daily_streak:3,daily_wins:4,admin:true,weekly_wins:1,weekly_podiums:2,streak_runs:3,hints_used:1};
  const topla=(ad)=>{sweep();const w=document.createTreeWalker(document.getElementById('online'),NodeFilter.SHOW_TEXT);const l=[];let n;while(n=w.nextNode()){const t=n.nodeValue.trim();if(t)l.push(t)}
    document.querySelectorAll('#online [placeholder],#online [aria-label]').forEach(e=>{['placeholder','aria-label'].forEach(a=>{if(e.getAttribute(a))l.push('['+a+'] '+e.getAttribute(a))})});sonuc[ad]=l};
  const ekran=async(ad,f)=>{try{await f();await wait(120);topla(ad)}catch(e){sonuc[ad]=['HATA '+e.message]}};
  await ekran('giris',()=>aAuth());
  await ekran('unuttum',()=>aForgot());
  await ekran('yeni_sifre',()=>aNewPw(false));
  await ekran('sifre_degistir',()=>aNewPw(true));
  await ekran('profil',()=>aProfile());
  await ekran('kullanici_adi',()=>aUsername());
  await ekran('rozetler',()=>aBadges());
  await ekran('skor_tum',()=>aBoard('all'));
  await ekran('skor_hafta',()=>aBoard('week'));
  await ekran('skor_arkadas',()=>aBoard('fr'));
  await ekran('admin',()=>aAdmin());
  await ekran('admin_talepler',()=>aAdPw());
  AU={u1:{id:'u1',u:'veli',c:true,b:false,a:false,bs:3,xp:100}};
  await ekran('admin_kullanici',()=>aAdUser('u1'));
  await ekran('admin_kod',async()=>{aAdPwGo('u1','veli',()=>{});document.getElementById('cfy').click();await wait(80)});
  // sunucu cevapları ve hata metinleri
  await ekran('ad_hatalari',async()=>{aUsername();document.getElementById('nu').value='ab';document.getElementById('nk').click()});
  await ekran('sifre_hatalari',async()=>{aNewPw(false);document.getElementById('p1').value='abc';document.getElementById('p2').value='abc';document.getElementById('pk').click()});
  // şampiyon penceresi
  sb.rpc=async n=>n==='champ_week'?{data:{week:dStr(dayNum()-((dayNum()+3)%7)-7),podium:[{r:1,u:'ali',s:485},{r:2,u:'veli',s:440}],me:{r:1,pts:20000,seen:false}},error:null}:{data:null,error:null};
  localStorage.removeItem('ka_champ');await champCheck();await wait(100);sweep();sonuc['sampiyon_penceresi']=[document.getElementById('cft').textContent,document.getElementById('cfy').textContent,document.getElementById('cfn').textContent];document.getElementById('cfn').click();
  // Arena
  myName='ali';room='ABCD';isHost=false;started=true;mode='online';cfg={max:50,m:'k',n:3,dur:0,l:-1,mod:1,T:20};K={i:-1,my:-1,rv:false,sh:null,cq:null,rs:1};
  await ekran('arena_soru',()=>kShowQ({i:0,n:3,t:'q',q:'a fruit',o:['pear','apple','plum','lime'],x2:1,len:0,rd:0,el:0},0,false,0));
  await ekran('arena_yazarak',()=>kShowQ({i:1,n:3,t:'ty',q:'a fruit',o:[],x2:0,len:5,sc:'PLEAP'},1,false,0));
  K.i=0;await ekran('arena_sonuc',()=>kShowR({a:1,d:[0,1,0,0],pts:{ali:900},st:{ali:2},top:[{n:'ali',p:900},{n:'veli',p:500}],t:'q'},false));
  await ekran('arena_sonuc_yanlis',()=>kShowR({a:1,d:[0,1,0,0],pts:{ali:0},st:{ali:0},top:[{n:'veli',p:900},{n:'ali',p:0}],t:'q'},false));
  K.sh='x';await ekran('arena_podyum',()=>kShowF([{n:'ali',p:5000},{n:'veli',p:3000},{n:'can',p:1000},{n:'dev',p:10}]));
  // Maç odası ekranları (lobi, sonuç): unvanlar da çevrilmeli
  const pres={k1:[{n:'ali',im:'p:fox',h:1,t:1,p:900,w:9,a:1,d:0}],k2:[{n:'veli',im:'p:panda',t:2,p:700,w:7,a:1,d:0}]};
  ch={presenceState:()=>pres,track(){},send(){}};room='ABCD';isHost=false;started=false;mode='online';cfg={max:6,m:'c',n:10,dur:0,l:1,mod:0};
  document.getElementById('online').hidden=false;
  await ekran('oda_lobi',async()=>{oLobby();await wait(150)});
  cfg={max:6,m:'s',n:0,dur:180,l:-1,mod:1};started=false;await ekran('oda_lobi_hayatta',async()=>{oLobby();await wait(100)});cfg={max:2,m:'c',n:15,dur:0,l:0,mod:0};await ekran('oda_lobi_1v1',async()=>{oLobby();await wait(100)});
  started=true;ost={fin:true};document.getElementById('game').hidden=true;
  await ekran('oda_sonuc',async()=>{RES_LAST={done:true,left:0,mode:'s',players:[{u:'ali',im:'p:fox',sc:900,w:9,xp:70,a:true},{u:'ben',im:'p:fox',sc:700,w:7,xp:50,a:true,me:true},{u:'cem',im:'p:cat',sc:100,w:1,xp:20,a:false}]};oResView(RES_LAST);await wait(150)});
  // Online menü ve oda kurma (kartlar, düğmeler)
  window.supabase={createClient:()=>sb};try{localStorage.setItem('ka_room',JSON.stringify({c:'AB12',t:Date.now()}))}catch(e){}
  await ekran('online_menu',async()=>{oHome()});
  await ekran('oda_kur_puan',async()=>{oSetup()});
  await ekran('oda_kur_hayatta',async()=>{document.querySelector('[data-mode=s]').click();document.querySelector('[data-ppl="50"]').click()});
  await ekran('oda_kur_arena',async()=>{document.querySelector('[data-mode=k]').click()});
  // oyun ekranı
  mode='streak';run={passes:2};word='SHOWER';guesses=[];cur=Array(6).fill('');over=false;hintUsed=false;tries=5;document.getElementById('game').hidden=false;draw();sweep();
  sonuc['oyun_pas']=[document.getElementById('passbtn').innerText,document.getElementById('passbtn').getAttribute('aria-label')];
  return sonuc});
const TR=/[çğıöşüÇĞİÖŞÜ]|\b(şifre|kullanıcı|rozet|puan|kelime|sıra|haftal|sınıf|giriş|talep|değiş|kaydet|geri|tamam|yönetici|hesab|oyuncu|soru|cevap|doğru|yanlış|süre|seviye|kazan|puanı|günlük|oda)\w*/i;
  const kalan=[];
  for(const [ad,l] of Object.entries(out)){ if(l.some(t=>t.startsWith('HATA '))) kalan.push(ad+': '+l.find(t=>t.startsWith('HATA '))); for(const t of l.filter(t=>TR.test(t))) kalan.push(ad+': '+t.slice(0,90)); }
  assert.deepStrictEqual(kalan,[],'Çevrilmemiş Türkçe metin:\n  '+kalan.join('\n  '));
  assert.deepStrictEqual(s.hatalar,[]);
  console.log('ok dil: '+Object.keys(out).length+' ekran İngilizce modda tamamen çevrilmiş');
  await s.kapat()})().catch(e=>{console.error('HATA dil:',e.message);process.exit(1)});
