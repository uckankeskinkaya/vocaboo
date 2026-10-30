// v28: İstatistik ekranı. Veri sunucudaki stats_me() işlevinden; burası sadece çizer.
(function(){
Object.assign(EN,{'İstatistikler':'Statistics','Başarı oranı':'Win rate','Ort. tahmin':'Avg. guesses','İlk denemede':'First try','Kaç denemede çözdün':'Guesses to solve','Son 14 gün (çözülen kelime)':'Last 14 days (solved words)','En çok bildiğin harfler':'Your best letters','Zorlandığın harfler':'Letters you struggle with','Modlara göre çözülen':'Solved by mode','Henüz yeterli veri yok. Biraz oyna, burası dolacak.':'Not enough data yet. Play a bit and this will fill up.','Çözülen':'Solved','Kaçan':'Missed','İpucu':'Hints','En iyi seri':'Best streak','Günlük seri':'Daily streak','Günlük galibiyet':'Daily wins','Seri Modu':'Streak mode','Günlük':'Daily','Alıştırma':'Practice','Online':'Online','Yüklenemedi, tekrar dene.':'Could not load, try again.','Giriş yap':'Log in'});
const kart=(a,b)=>'<div style="flex:1;min-width:0;text-align:center;padding:10px 4px;border-radius:14px;background:var(--panel);border:1px solid var(--line)"><b style="font-size:20px;display:block">'+a+'</b><small style="color:var(--dim)">'+b+'</small></div>';
const bars=(v,etk,renk)=>{const m=Math.max(1,...v);return '<div style="display:flex;align-items:flex-end;gap:5px;height:84px;margin:8px 0 2px">'+v.map((x,i)=>'<div style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;height:100%;min-width:0"><small style="color:var(--dim);font-size:10px">'+(x||'')+'</small><div style="width:100%;border-radius:6px 6px 2px 2px;height:'+Math.max(x?6:2,Math.round(x/m*60))+'px;background:'+(x?(renk||'var(--g)'):'var(--line)')+'"></div></div>').join('')+'</div>'+(etk?'<div style="display:flex;gap:5px">'+etk.map(t=>'<small style="flex:1;text-align:center;color:var(--dim);font-size:10px;min-width:0">'+t+'</small>').join('')+'</div>':'')};
const lrow=(l,pct,n)=>'<div style="display:flex;align-items:center;gap:8px;margin:4px 0"><b style="width:18px;text-align:center">'+esc(l)+'</b><div style="flex:1;height:8px;border-radius:99px;background:var(--line);overflow:hidden"><div style="height:100%;width:'+pct+'%;background:var(--g);border-radius:99px"></div></div><small style="width:70px;text-align:right;color:var(--dim)">%'+pct+' · '+n+'</small></div>';
const H=t=>'<p style="margin:16px 0 4px"><b>'+t+'</b></p>';
async function aStats(){
  if(!sb||!prof){aAuth('İstatistikler için giriş yap');return}
  panel('<p>Yükleniyor...</p>');
  const r=await sb.rpc('stats_me');
  if(r.error||!r.data){panel('<p>Yüklenemedi, tekrar dene.</p>'+btn('ob','Geri'));$('ob').onclick=()=>aProfile();return}
  const d=r.data,t=d.t||{},sol=t.solved||0,top=sol+(t.failed||0);
  const oran=top?Math.round(sol/top*100):0,ort=sol?(t.guesses/sol).toFixed(1):'–',ilk=sol?Math.round((t.first||0)/sol*100):0;
  let h='<p><b>İstatistikler</b></p><div style="display:flex;gap:8px">'+kart('%'+oran,'Başarı oranı')+kart(ort,'Ort. tahmin')+kart('%'+ilk,'İlk denemede')+'</div>'
   +'<div style="display:flex;gap:8px;margin-top:8px">'+kart(sol,'Çözülen')+kart(t.failed||0,'Kaçan')+kart(t.hints||0,'İpucu')+'</div>'
   +'<div style="display:flex;gap:8px;margin-top:8px">'+kart(t.streak||0,'En iyi seri')+kart(t.dstreak||0,'Günlük seri')+kart(t.dwins||0,'Günlük galibiyet')+'</div>';
  const dist=d.dist||[];
  if(dist.some(x=>x>0)){
    h+=H('Kaç denemede çözdün')+bars(dist,['1','2','3','4','5'],'var(--g)');
    const days=d.days||[];
    h+=H('Son 14 gün (çözülen kelime)')+bars(days.map(x=>x.w),days.map(x=>String(new Date(x.d+'T12:00:00').getDate())),'var(--ac)');
    const L=(d.letters||[]).map(x=>({l:x.l,n:x.n,p:Math.round(x.g/x.n*100)}));
    const iyi=L.slice().sort((a,b)=>b.p-a.p||b.n-a.n).slice(0,5),kot=L.slice().sort((a,b)=>a.p-b.p||b.n-a.n).slice(0,5);
    if(L.length>=6){h+=H('En çok bildiğin harfler')+iyi.map(x=>lrow(x.l,x.p,x.n)).join('')+H('Zorlandığın harfler')+kot.map(x=>lrow(x.l,x.p,x.n)).join('')}
    const m=d.modes||{},ad={s:'Seri Modu',d:'Günlük',p:'Alıştırma',m:'Online',a:'Online'};
    const mm=Object.entries(m).map(([k,v])=>[ad[k]||k,v]);
    if(mm.length)h+=H('Modlara göre çözülen')+mm.sort((a,b)=>b[1]-a[1]).map(([k,v])=>'<div class="pl"><span>'+esc(k)+'</span><b>'+v+'</b></div>').join('');
  }else h+='<p class="cap">Henüz yeterli veri yok. Biraz oyna, burası dolacak.</p>';
  panel(h+btn('ob','Geri'));$('ob').onclick=()=>aProfile();
}
window.aStats=aStats;
const _p=aProfile;
aProfile=function(){
  _p.apply(this,arguments);
  const b=$('qgb')||$('pwc');if(!b||$('stb'))return;
  b.insertAdjacentHTML('beforebegin','<button class="rw" id="stb"><span>📊</span>İstatistikler</button>');
  $('stb').onclick=aStats;
};
})();
