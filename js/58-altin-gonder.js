// v38: Yönetici paneli "Altın gönder": herkese ya da bir gruba (sınıf, dışarıdan gelenler, öğretmenler, kullanıcı listesi) 🪙 gönderir.
// Önce kaç kişiye gideceği ve toplam tutar gösterilir, onaydan sonra gönderilir; sunucu kayıt altına alır (Yönetici günlüğü).
(function(){
Object.assign(EN,{'Altın gönder':'Send gold','🪙 Altın gönder':'🪙 Send gold','Kime?':'Who?','Herkes':'Everyone','Sınıf':'Class','Dışarıdan':'Outside','Öğretmenler':'Teachers','Liste':'List',
  'Kullanıcı adları (virgül ya da alt alta)':'Usernames (comma or one per line)','Kişi başı miktar':'Amount per person','Miktar (1 - 1.000.000)':'Amount (1 - 1,000,000)',
  'Seçilen gruba, kişi başı bu kadar 🪙 eklenir. Pazar bakiyesine gider, geri alınamaz. Engelli hesaplar hariç.':'This much 🪙 is added per person to the selected group. It goes to the Market balance and cannot be undone. Banned accounts excluded.',
  'Önizle ve gönder':'Preview and send','1 ile 1.000.000 arasında bir sayı yaz.':'Enter a number between 1 and 1,000,000.','Listeye en az bir kullanıcı adı yaz (en fazla 200).':'Enter at least one username (max 200).',
  'Bu gruba giden kimse yok.':'Nobody is in this group.','Bulunamadı:':'Not found:','Gönderilemedi.':'Could not send.','Biraz bekle, aynı gönderim az önce yapıldı.':'Wait a bit, the same send was just made.','Çok fazla kişi (en fazla 5.000).':'Too many people (max 5,000).'});
RX.push([/^(\d+) kişiye kişi başı ([\d.,]+) 🪙 gönderilsin mi\? Toplam ([\d.,]+) 🪙/,'Send $2 🪙 each to $1 people? Total $3 🪙'],[/^(\d+) kişiye ([\d.,]+) 🪙 gönderildi$/,'$2 🪙 sent to $1 people']);
const HD=[['hepsi','Herkes'],['sinif','Sınıf'],['dis','Dışarıdan'],['ogretmen','Öğretmenler'],['liste','Liste']];
let hedef='sinif',tut='',lst='';
const nf=n=>(+n).toLocaleString('tr-TR');
function aAdGold(){
  panel('<p><b>🪙 Altın gönder</b></p><p>Kime?</p><div class="seg sm" style="flex-wrap:wrap">'+HD.map(h=>'<button data-gh="'+h[0]+'"'+(hedef===h[0]?' class="on"':'')+'>'+h[1]+'</button>').join('')+'</div>'
    +(hedef==='liste'?'<p>Kullanıcı adları (virgül ya da alt alta)</p><textarea id="gl" rows="4" style="'+SEL+';width:100%;font-family:inherit" autocapitalize="none"></textarea>':'')
    +'<p>Kişi başı miktar</p><input id="gn" type="number" inputmode="numeric" min="1" max="1000000" placeholder="Miktar (1 - 1.000.000)" style="'+SEL+'">'
    +'<div style="display:flex;gap:6px;margin:8px 0">'+[100,500,1000,5000].map(v=>'<button class="lvl" data-gm="'+v+'" style="margin:0;justify-content:center">'+nf(v)+'</button>').join('')+'</div>'
    +'<p class="ntx">Seçilen gruba, kişi başı bu kadar 🪙 eklenir. Pazar bakiyesine gider, geri alınamaz. Engelli hesaplar hariç.</p><p id="ge" style="color:var(--r)"></p>'+btn('gs','Önizle ve gönder')+btn('ob','Geri'));
  $('ob').onclick=aAdmin;
  const n=$('gn');n.value=tut;n.oninput=()=>{tut=n.value};
  const l=$('gl');if(l){l.value=lst;l.oninput=()=>{lst=l.value}}
  $('online').querySelectorAll('[data-gh]').forEach(b=>b.onclick=()=>{hedef=b.dataset.gh;aAdGold()});
  $('online').querySelectorAll('[data-gm]').forEach(b=>b.onclick=()=>{n.value=b.dataset.gm;tut=n.value});
  $('gs').onclick=async()=>{
    const e=t=>{$('ge').textContent=t},m=Math.floor(+n.value);
    if(!(m>=1&&m<=1000000))return e('1 ile 1.000.000 arasında bir sayı yaz.');
    let ad=null;
    if(hedef==='liste'){ad=[...new Set((l.value||'').split(/[\s,;]+/).map(x=>x.trim().toLowerCase()).filter(Boolean))];if(!ad.length||ad.length>200)return e('Listeye en az bir kullanıcı adı yaz (en fazla 200).')}
    $('gs').disabled=true;e('');
    const c=await sb.rpc('admin_gold_count',{_h:hedef,_l:ad});$('gs').disabled=false;
    if(c.error||!c.data||c.data.err)return e(c.data&&c.data.err==='liste'?'Listeye en az bir kullanıcı adı yaz (en fazla 200).':'Gönderilemedi.');
    const k=+c.data.n;
    if(!k)return e('Bu gruba giden kimse yok.'+((c.data.yok||[]).length?' Bulunamadı: '+c.data.yok.join(', '):''));
    if(k>5000)return e('Çok fazla kişi (en fazla 5.000).');
    const yok=(c.data.yok||[]).length?'\n'+'Bulunamadı: '+c.data.yok.join(', '):'';
    cfAsk(k+' kişiye kişi başı '+nf(m)+' 🪙 gönderilsin mi? Toplam '+nf(m*k)+' 🪙'+yok,'Gönder','Vazgeç',async()=>{
      $('gs').disabled=true;
      const r=await sb.rpc('admin_gold_send',{_h:hedef,_l:ad,_n:m});$('gs').disabled=false;
      const d=r.data;
      if(r.error||!d||!d.ok)return e(d&&d.err==='bekle'?'Biraz bekle, aynı gönderim az önce yapıldı.':d&&d.err==='kimse'?'Bu gruba giden kimse yok.':d&&d.err==='cok'?'Çok fazla kişi (en fazla 5.000).':'Gönderilemedi.');
      toast(d.n+' kişiye '+nf(m)+' 🪙 gönderildi');tut='';lst='';try{loadProf()}catch(x){}aAdGold();
    });
  };
}
{const _a=aAdmin;aAdmin=function(){
  _a.apply(this,arguments);
  const a=$('ad1');if(!a||$('ad12'))return;
  a.insertAdjacentHTML('beforebegin',btn('ad12','Altın gönder'));$('ad12').onclick=aAdGold;
}}
})();
