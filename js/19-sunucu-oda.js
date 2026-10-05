
// v10: online modlar (1v1 ve grup) sunucuda doğrulanır, online XP. SQL yoksa eski istemci akışına geri düşer.
let MSV=true,RP=null;
Object.assign(EN,{'XP hesaplanıyor...':'Calculating XP...'});
RX.push([/^Bitirmeyen oyuncu: (\d+)$/,'Players still playing: $1']);
const mFail=r=>{if(r&&r.error&&/Could not find|does not exist|schema cache/i.test(r.error.message)){MSV=false;return true}return false};
const _oj=oJoin;oJoin=function(code,h){
  if(MSV&&h&&cfg&&cfg.m!=='k')sb.rpc('m_host',{_room:code,_c:cfg}).then(r=>{if(mFail(r))return;if(r.error||r.data!=='ok')toast('Oda sunucuda kurulamadı')});
  _oj(code,h);
};
async function mJoin(){
  if(!MSV)return true;
  const r=await sb.rpc('m_join',{_room:room});
  if(mFail(r))return true;
  if(r.error||!r.data||!r.data.ok){oExit('Maça katılınamadı, tekrar dene.');return false}
  const w=await sb.rpc('m_next');
  if(w.error||!w.data||w.data.fin){oExit('Maç başlatılamadı.');return false}
  SR=w.data;si=w.data.idx;return true;
}
const _og=oGo;oGo=async function(){if(!(await mJoin()))return;_og()};
const _on=oNext;oNext=async function(){
  if(!MSV)return _on();
  if(ost.fin){oResults();return}
  const w=await sb.rpc('m_next');
  if(w.error||!w.data||w.data.fin){ost.fin=true;ch.track(mine());oResults();return}
  SR=w.data;si=w.data.idx;next();
};
const _or=oResults;
oResults=function(){
  if(!MSV)return _or();
  clearInterval(tmr);$('game').hidden=true;$('online').hidden=false;
  if(RP)return;
  const go=async()=>{
    if($('online').hidden||!ch){clearInterval(RP);RP=null;return}
    const r=await sb.rpc('m_results',{_room:room});
    if(!$('game').hidden||$('online').hidden)return;
    if(r.error||!r.data){on('<p>Sonuçlar yüklenemedi.</p>'+btn('ob','Ana menü'));$('ob').onclick=()=>oExit();clearInterval(RP);RP=null;return}
    const d=r.data,me=d.players.find(x=>x.me);
    on((d.done&&me?'<div class="kres ok"><h2>+'+(me.xp||0)+' XP</h2></div>':'')+'<p>'+(d.done?'Sonuçlar':d.left?'Bitirmeyen oyuncu: '+d.left:'XP hesaplanıyor...')+'</p>'+d.players.map((x,i)=>'<div class="pl'+(x.me?' me':'')+'"><span style="display:flex;align-items:center;gap:8px">'+(i+1)+'. '+frameWrap(av(x.im,28),x.fr)+esc(x.u)+(x.me?' (sen)':'')+(x.a?'':' (elendi)')+'</span><b>'+(d.mode==='s'?x.w+' kelime, ':'')+x.sc+' puan'+(d.done?' · +'+(x.xp||0)+' XP':'')+'</b></div>').join('')+btn('ob','Ana menü'));
    $('ob').onclick=()=>oExit();
    if(d.done){clearInterval(RP);RP=null;loadProf()}
  };
  RP=setInterval(go,3000);
  Promise.resolve(sb.rpc('m_next')).then(go,go);
};
const _ms=modStart;modStart=async function(){
  if(MSV){const r=await sb.rpc('m_host_words',{_room:room});if(!mFail(r)&&r.data)seq=r.data.map(x=>({w:x.w+'|'+x.d,l:x.l}))}
  _ms();
};
const _oe3=oExit;oExit=function(m){clearInterval(RP);RP=null;_oe3(m)};
