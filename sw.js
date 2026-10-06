const C='vocaboo-66cfecc8';
const PRE=['./', './index.html', './manifest.webmanifest', './logo.png', './icon-180.png', './icon-192.png', './icon-512.png', './css/app.css?v=efc30011', './js/01-oyun-cekirdegi.js?v=bd971ac6', './js/02-online-hesap-ana.js?v=62644f24', './js/03-muzik-ses.js?v=aa0acf43', './js/04-sunucu-kelime.js?v=a8a239ab', './js/05-arkadaslar.js?v=b3fe3d86', './js/06-eslestirme-davet.js?v=53c00653', './js/07-kelime-defteri.js?v=fa279b00', './js/08-avatar.js?v=2c8f9a0f', './js/09-moderator.js?v=07ce5b11', './js/10-yonetici.js?v=d569793a', './js/11-dil.js?v=67879761', './js/12-arena.js?v=252acc09', './js/13-tema-istatistik.js?v=90277293', './js/14-performans.js?v=44ce4f17', './js/15-profil-skor.js?v=9912a0b3', './js/16-seviye-unvan.js?v=4604325c', './js/17-cerceveler.js?v=5dd3f82f', './js/18-kullanici-adi-seviye.js?v=19ba73b3', './js/19-sunucu-oda.js?v=386957c6', './js/20-cerceve-vitrin.js?v=6bc77581', './js/21-pazar-bakiye.js?v=bceb892a', './js/22-cerceve-bayrak.js?v=5f2b4ffa', './js/23-pazar-tema.js?v=09a26eed', './js/24-sifre-sifirlama.js?v=92d4d414', './js/25-ceviri-ek.js?v=abaf82a7', './js/26-oda-oyunculari.js?v=e647d044', './js/27-sahne-temalari.js?v=4a675b58', './js/29-gece-sehri.js?v=bcf12970', './js/30-rutbe-cerceveleri.js?v=7078062f', './js/31-gunluk-bonus.js?v=6977a1b0', './js/32-online-arayuz.js?v=6adb9e01', './js/33-dokunus.js?v=b16c50e3', './js/34-ozel-efektler.js?v=450b3a6d', './js/35-oyun-sahneleri.js?v=8b8deb6c', './js/35b-oyun-sahneleri-2.js?v=12eed53c', './js/35c-yeni-temalar.js?v=5518e41a', './js/36-yardim-tekrar.js?v=c35c82b6', './js/37-oda-baglantisi.js?v=b3fed1e1', './js/38-guclu-renkler.js?v=dad7a78f', './js/39-onizleme-mac.js?v=337ddfd1', './js/40-giris-siniri.js?v=3acba82e', './js/42-gorevler.js?v=9d1b1c69', './js/43-istatistik.js?v=99e7c1d0', './js/44-tepkiler.js?v=594df92a', './js/45-kelime-paketi.js?v=0f9874f7', './js/46-cevrimdisi.js?v=7e30363d', './js/47-bildirim.js?v=42a5bf76', './js/48-izleme.js?v=f20e2c9e', './js/49-profil-menu.js?v=5b9e3496', './js/50-ogretmen.js?v=eb50087c', './js/51-odev.js?v=27a3d537', './js/52-ceviri-son.js?v=e5f60211', './js/53-bakim.js?v=ce5f6583', './js/54-sinif-duzeltmeleri.js?v=459b0c9d', './js/55-tema-onizleme.js?v=3b4b6779', './js/56-sayfa-kaydirma.js?v=e78c27e8', './js/57-hata-bildir.js?v=fc04c80d', './js/58-altin-gonder.js?v=234bbc2d'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(PRE)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C&&x!==EXT).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
// Hızlı açılış: sürümlü dosyalar (?v=özet), CDN, yazı tipleri ve ses önce önbellekten gelir; sayfa önbellekten açılır, arkada yenilenir.
const EXT='vocaboo-ext';
async function haberVer(){const l=await self.clients.matchAll({type:'window'});l.forEach(c=>c.postMessage({t:'yeni-surum'}))}
async function sayfa(e,r){
  const c=await caches.open(C),m=await c.match('./index.html');
  const ag=fetch(r).then(async res=>{
    if(res&&res.ok){const eski=m?await m.clone().text():null,yeni=await res.clone().text();await c.put('./index.html',res.clone());if(eski!==null&&eski!==yeni)haberVer()}
    return res}).catch(()=>null);
  e.waitUntil(ag);
  if(m)return m;
  return (await ag)||(await caches.match('./index.html'))||Response.error();
}
async function onceOnbellek(r,ad){
  const c=await caches.open(ad),m=await c.match(r);if(m)return m;
  const res=await fetch(r);if(res&&(res.ok||res.type==='opaque'))c.put(r,res.clone());return res;
}
async function eskiyiVerYenile(e,r,ad){
  const c=await caches.open(ad),m=await c.match(r);
  const ag=fetch(r).then(res=>{if(res&&(res.ok||res.type==='opaque'))c.put(r,res.clone());return res}).catch(()=>null);
  e.waitUntil(ag);
  return m||(await ag)||Response.error();
}
self.addEventListener('fetch',e=>{
  const r=e.request,u=new URL(r.url);
  if(r.method!=='GET')return;
  const own=u.origin===location.origin;
  const cdn=u.hostname==='cdn.jsdelivr.net'&&u.pathname.startsWith('/npm/@supabase/');
  const font=u.hostname==='fonts.googleapis.com'||u.hostname==='fonts.gstatic.com';
  if(!own&&!cdn&&!font)return;
  if(own&&(r.mode==='navigate'||u.pathname.endsWith('/index.html')||u.pathname.endsWith('/'))){e.respondWith(sayfa(e,r));return}
  if(cdn||(own&&u.search.startsWith('?v='))){e.respondWith(onceOnbellek(r,C).catch(()=>caches.match(r)));return}
  if(font){e.respondWith(eskiyiVerYenile(e,r,EXT));return}
  if(own&&/\.(mp3|png|webp|jpg|svg|woff2?)$/.test(u.pathname)){e.respondWith(eskiyiVerYenile(e,r,EXT));return}
  e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res}).catch(()=>caches.match(r).then(m=>m||caches.match('./index.html'))));
});
self.addEventListener('push',e=>{
  let d={};try{d=e.data.json()}catch(x){}
  e.waitUntil(self.registration.showNotification(String(d.t||'Vocaboo').slice(0,80),{body:String(d.b||'Hadi oynayalım! 🐥').slice(0,200),icon:'icon-192.png',badge:'icon-192.png',tag:'vocaboo-bildirim'}));
});
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{
    for(const c of l){if('focus' in c)return c.focus()}
    return self.clients.openWindow('./');
  }));
});
