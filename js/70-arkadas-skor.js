// v50: Arkadaşlar ve Skor tablosu yeni arayüz diliyle.
// Arkadaşlar: kod + kopyala + kod girişi + Ekle tek kartta; istekte Kabul/Reddet simge düğmeleri; satırda Sil yok (profilde
// "Arkadaşlıktan çıkar" var), çevrimiçiye ⚔ davet simgesi; satırlar kısa. Skor tablosu: sekmeler tek satır, ilk 3 podyumda.
// Yalnız görünüm: düğmelerin id'leri ve işlevleri aynı kalır.
(function(){
if(typeof aFriends!=='function'||typeof aBoard!=='function')return;
const SV=p=>'<svg viewBox="0 0 24 24" aria-hidden="true">'+p+'</svg>';
const KOP=SV('<rect x="8.5" y="8.5" width="11" height="11" rx="2.5"/><path d="M15.5 8.5V6a1.5 1.5 0 00-1.5-1.5H6A1.5 1.5 0 004.5 6v8A1.5 1.5 0 006 15.5h2.5"/>');
const EVET=SV('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),HAYIR=SV('<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>');
const KILIC=SV('<path d="M4 4l9.5 9.5M14.5 4H20v5.5L10.5 19M7 14l3 3M4 20l3-3M20 20l-4.5-4.5"/>');
document.head.insertAdjacentHTML('beforeend',`<style id="arkadas-skor">
/* Sekmeler */
#online .yfs{display:grid!important;grid-template-columns:1fr 1fr;gap:4px!important;padding:4px;border:1px solid var(--line);border-radius:16px;background:var(--panel);margin-bottom:10px!important}
#online .yfs .lvl{min-height:38px!important;padding:6px!important;border:0!important;border-radius:12px!important;background:transparent!important;box-shadow:none!important;font-size:14px;font-weight:700;color:var(--dim)}
#online .yfs .lvl.on{background:var(--ac)!important;color:var(--acf)!important}
/* Kod kartı */
.yfk{padding:12px;border:1px solid var(--line);border-radius:20px;background:var(--panel);box-shadow:var(--sh);margin-bottom:10px}
.yfk .yku{display:flex;align-items:center;gap:10px;margin-bottom:10px}
.yfk .yku div{flex:1;min-width:0}
.yfk .yku small{display:block;font-size:11px;font-weight:700;color:var(--dim);text-transform:uppercase;letter-spacing:.06em}
.yfk .yku b{font-size:20px;font-weight:800;letter-spacing:.12em}
.yfk .yki{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px}
.yfk input{margin:0!important;min-width:0}
.yfk #fadd{margin:0!important;width:auto!important;padding:0 18px!important;background:var(--ac)!important;color:var(--acf)!important;border-color:var(--ac)!important;font-weight:800}
.ysb{display:grid;place-items:center;width:38px;height:38px;flex:none;border-radius:12px;border:1px solid var(--line)!important;background:color-mix(in srgb,var(--ac) 12%,transparent)!important;color:var(--ac)!important;padding:0!important}
.ysb svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.ysb.ok{background:var(--g)!important;color:#fff!important;border-color:transparent!important}
.ysb.no{background:transparent!important;color:var(--dim)!important}
/* Başlıklar ve satırlar */
#online .yfh{display:flex;justify-content:space-between;margin:12px 2px 6px;font-size:11.5px;font-weight:700;color:var(--dim);text-transform:uppercase;letter-spacing:.06em}
#online .pl[data-pu]{padding:8px 10px!important;border-radius:16px!important;margin-bottom:6px!important;gap:8px}
#online .pl[data-pu] .rk,#online .pl[data-pu] .fq{transform:scale(.9)}
#online .pl[data-pu] b{font-size:14px}
#online .pl[data-pu] br{display:none}
#online .pl[data-pu] small{display:block;font-size:11.5px!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:62vw}
#online .pl[data-pu]>span:first-child>span{min-width:0}
#online .pl[data-pu] [data-x],#online .pl[data-pu] small .dot.on{display:none!important}
#online .pl[data-pu]>span:last-child,#online .pl[data-pu]>span:last-child>span{display:flex!important;flex-direction:row!important;align-items:center;gap:6px!important}
/* Skor tablosu: sekmeler tek satır */
#online .seg.sm.ytb{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr));gap:3px;padding:3px;border-radius:14px}
#online .seg.sm.ytb button{min-height:34px;padding:4px 2px!important;font-size:12px!important;line-height:1.1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;border-radius:11px}
#online .seg.sm.ytc{display:inline-flex!important;gap:4px;padding:3px;border-radius:999px;margin:0 0 10px}
#online .seg.sm.ytc button{min-height:30px;padding:4px 12px!important;font-size:12px!important;border-radius:999px;flex:none}
/* Podyum */
.ylpd{display:grid;grid-template-columns:1fr 1.15fr 1fr;align-items:end;gap:8px;margin:4px 0 12px}
.ylpd>div{display:flex;flex-direction:column;align-items:center;gap:3px;min-width:0;cursor:pointer}
.ylpd b{font-size:13px;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ylpd small{font-size:12px;color:var(--dim);font-weight:700;font-variant-numeric:tabular-nums}
.ylpd u{display:grid;place-items:center;width:100%;border-radius:16px 16px 10px 10px;background:color-mix(in srgb,var(--ac) 14%,var(--panel));border:1px solid var(--line);font-size:20px;font-weight:800;text-decoration:none;color:var(--ac)}
.ylpd .ya1 u{height:70px;background:var(--ac);color:var(--acf)}.ylpd .ya2 u{height:50px}.ylpd .ya3 u{height:38px}
.ylpd .me b{color:var(--ac)}
#online .lb>.lbr.ypdx{display:none}
.ylpd .ylav{display:grid;place-items:center;height:58px;width:58px;margin-bottom:6px}
.ylpd .ylav>*{margin:0!important;transform:scale(.72)}
.ylpd .ya1 .ylav{height:66px;width:66px}.ylpd .ya1 .ylav>*{transform:scale(.84)}
</style>`);
const ik=(b,svg,lbl)=>{if(!b||b.classList.contains('ysb'))return;b.classList.add('ysb');b.setAttribute('aria-label',lbl);b.title=lbl;b.innerHTML=svg};
function arkadas(){
  const o=$('online');if(!o||o.hidden)return;
  const t1=$('ft1'),t2=$('ft2');
  if(t1&&t2&&!t1.parentElement.classList.contains('yfs')){
    t1.parentElement.classList.add('yfs');
    const on=/var\(--g\)/.test(t1.getAttribute('style')||'')?t1:t2;on.classList.add('on');
  }
  // Kod kartı
  const cp=$('fcp'),inp=$('fcode'),add=$('fadd');
  if(cp&&inp&&add&&!o.querySelector('.yfk')){
    const kodSatir=cp.closest('.pl'),kod=(kodSatir.querySelector('b')||{}).textContent||'';
    const k=document.createElement('div');k.className='yfk';
    k.innerHTML='<div class="yku"><div><small>Arkadaş kodun</small><b>'+esc(kod)+'</b></div></div><div class="yki"></div>';
    kodSatir.before(k);
    k.querySelector('.yku').appendChild(cp);ik(cp,KOP,'Kodu kopyala');
    k.querySelector('.yki').append(inp,add);add.textContent='Ekle';
    kodSatir.remove();
  }
  // İstekler: Kabul / Reddet simge
  o.querySelectorAll('[data-a]').forEach(b=>{ik(b,EVET,'Kabul et');b.classList.add('ok')});
  o.querySelectorAll('[data-r]').forEach(b=>{ik(b,HAYIR,'Reddet');b.classList.add('no')});
  // 1v1 davet simgesi
  o.querySelectorAll('[data-i][data-n]').forEach(b=>ik(b,KILIC,'Maça davet et'));
  // Başlıklar
  o.querySelectorAll(':scope>p').forEach(p=>{const m=/^(.+?)(?: \((\d+)\))?$/.exec(p.textContent.trim());
    if(!m||!/^(İstekler|Arkadaşların|Sınıftakiler|Requests|Your friends|Classmates)/.test(m[1]))return;
    p.className='yfh';p.innerHTML='<span>'+esc(m[1])+'</span>'+(m[2]?'<span>'+m[2]+'</span>':'')});
  // Çevrimiçiler üstte (yalnız arkadaş / sınıf listesinde, isteklerde değil)
  const bas=[...o.querySelectorAll(':scope>.yfh')].find(h=>/Arkadaşların|Sınıftakiler|Your friends|Classmates/.test(h.textContent));
  if(bas){
    const rows=[];let e=bas.nextElementSibling;while(e&&e.classList.contains('pl')&&e.dataset.pu!==undefined){rows.push(e);e=e.nextElementSibling}
    const on=rows.filter(r=>r.querySelector('.dot.on')),off=rows.filter(r=>!r.querySelector('.dot.on'));
    if(on.length&&off.length)on.concat(off).forEach(r=>bas.parentNode.insertBefore(r,e));
  }
}
const _f=aFriends;
aFriends=async function(){const r=await _f.apply(this,arguments);try{arkadas()}catch(e){}return r};
$('fbtn').onclick=()=>aFriends('f');
function skor(){
  const o=$('online');if(!o||o.hidden)return;
  const s=[...o.querySelectorAll(':scope>.seg.sm')];
  if(s[0]&&$('t1')&&s[0].contains($('t1')))s[0].classList.add('ytb');
  if(s[1]&&$('c1'))s[1].classList.add('ytc');
  const t1=$('t1');if(t1&&t1.textContent==='Tüm zamanlar')t1.textContent='Tümü';
  const t3=$('t3');if(t3&&t3.textContent==='Geçen hafta')t3.textContent='Geçen h.';
  const lb=o.querySelector('.lb');if(!lb||o.querySelector('.ylpd'))return;
  const R=[...lb.querySelectorAll(':scope>.lbr')].slice(0,3);if(R.length<2)return;
  const kart=(r,cls,no)=>!r?'<div></div>':'<div class="'+cls+(r.classList.contains('me')?' me':'')+'" data-pu="'+esc(r.dataset.pu||'')+'"><span class="ylav">'+r.querySelector('.lba').innerHTML+'</span><b>'+esc(r.dataset.pu||'')+'</b><small>'+esc((r.querySelector('.lbv')||{}).textContent||'')+'</small><u>'+no+'</u></div>';
  const p=document.createElement('div');p.className='ylpd';
  p.innerHTML=kart(R[1],'ya2',2)+kart(R[0],'ya1',1)+kart(R[2],'ya3',3);
  lb.before(p);R.forEach(r=>r.classList.add('ypdx'));
}
const _b=aBoard;
aBoard=async function(){const r=await _b.apply(this,arguments);try{skor()}catch(e){}return r};
Object.assign(EN,{'Arkadaş kodun':'Your friend code','Ekle':'Add','Kodu kopyala':'Copy code','Kabul et':'Accept','Reddet':'Decline','Maça davet et':'Invite to match','Tümü':'All','Geçen h.':'Last wk'});
})();
