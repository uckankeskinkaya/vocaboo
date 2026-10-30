
let SR=null,busy=false;
function kmark(gs,s){[...gs].forEach((ch,i)=>{if(s[i]==='g')ks[ch]='g';else if(s[i]==='o'&&ks[ch]!=='g')ks[ch]='o';else if(s[i]==='r'&&![...gs].some((c,j)=>c===ch&&s[j]!=='r'))ks[ch]='r'})}
async function srvHint(){const r=await sb.rpc(mode==='online'?'m_hint':mode==='practice'?'p_hint':'run_hint');return r.error?'İpucu alınamadı.':r.data.t}
// Seri ve Günlük: cevabı, renkleri, canı ve puanı sunucu hesaplar.
async function srvGuess(gs){
  if(busy)return;busy=true;
  const r=await sb.rpc(mode==='daily'?'daily_guess':mode==='online'?'m_guess':mode==='practice'?'p_guess':'run_guess',{g:gs.toLowerCase()});
  busy=false;
  if(r.error){$('res').textContent=/hizli/.test(r.error.message)?'Çok hızlı, biraz bekle.':'Bağlantı hatası, tekrar dene.';return}
  const d=r.data;if(d.timeup){ost.fin=true;over=true;oResults();return}const s=d.s.split('');
  guesses.push({w:gs,s});kmark(gs,s);
  cur=Array(word.length).fill('');sel=-1;$('res').textContent='';
  if(!d.done){sfx('tick');draw();return}
  word=d.ans.toUpperCase();def=d.def;SRVEX=d.ex||'';
  let m;
  if(mode==='daily')m=d.win?'Doğru!':'Haklar bitti. Cevap: <b>'+word+'</b>';
  else if(mode==='practice'){m=d.win?'Doğru! <b>+'+(d.xp||0)+' XP</b>':'Haklar bitti. Cevap: <b>'+word+'</b>'}
  else if(mode==='online'){
    ost.p=d.score;ost.w=d.solved;ost.q=(ost.q||0)+1;ost.a=d.alive?1:0;ost.fin=!!d.fin;ch.track(mine());
    m=d.win?'Doğru! <b>+'+d.pts+' puan</b>'+(d.fin?'<br>Son kelime!':''):'Haklar bitti. Cevap: <b>'+word+'</b>'+(d.alive?(d.fin?'<br>Son kelime!':''):'<br><b>Elendin!</b>');
  }
  else{
    const pp=run.passes;
    Object.assign(run,{lives:d.lives,streak:d.streak,passes:d.passes,score:d.score,first:d.ft,dead:d.dead,max:Math.max(run.max||0,d.streak)});
    if(d.win){
      m='Doğru! <b>+'+d.pts+' puan</b><br>Seri: '+run.streak;
      if(d.passes>pp)m+='. <b>Pas hakkı kazandın!</b>';
      else if(guesses.length===1)m+=' (üst üste ilk deneme: '+run.first+'/3)';
    }else m='Haklar bitti. Cevap: <b>'+word+'</b>'+(run.dead?'<br><b>Seri bitti.</b> Puan: '+run.score:'<br>1 can kaybettin, kalan: '+run.lives);
    if(run.dead)saveBest();
  }
  sfx(d.win?'win':'lose');loadProf();
  finish(m);draw();
}
