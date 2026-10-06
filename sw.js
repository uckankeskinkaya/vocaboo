const C='vocaboo-3ecfa811';
const PRE=['./', './index.html', './manifest.webmanifest', './logo.png', './icon-180.png', './icon-192.png', './icon-512.png', './css/app.css?v=17727b5c', './js/01-oyun-cekirdegi.js?v=261b7b4b', './js/02-online-hesap-ana.js?v=ddf0f3e9', './js/03-muzik-ses.js?v=4416ab64', './js/04-sunucu-kelime.js?v=a8a239ab', './js/05-arkadaslar.js?v=fd059f87', './js/06-eslestirme-davet.js?v=48139a5c', './js/07-kelime-defteri.js?v=fa279b00', './js/08-avatar.js?v=2c8f9a0f', './js/09-moderator.js?v=07ce5b11', './js/10-yonetici.js?v=44fe1a52', './js/11-dil.js?v=406ccda3', './js/12-arena.js?v=252acc09', './js/13-tema-istatistik.js?v=90277293', './js/14-performans.js?v=f38efc61', './js/15-profil-skor.js?v=9912a0b3', './js/16-seviye-unvan.js?v=4604325c', './js/17-cerceveler.js?v=5dd3f82f', './js/18-kullanici-adi-seviye.js?v=19ba73b3', './js/19-sunucu-oda.js?v=386957c6', './js/20-cerceve-vitrin.js?v=6bc77581', './js/21-pazar-bakiye.js?v=e14d8473', './js/22-cerceve-bayrak.js?v=5f2b4ffa', './js/23-pazar-tema.js?v=6df27937', './js/24-sifre-sifirlama.js?v=af4b4b4e', './js/25-ceviri-ek.js?v=abaf82a7', './js/26-oda-oyunculari.js?v=e647d044', './js/27-sahne-temalari.js?v=4a675b58', './js/29-gece-sehri.js?v=bcf12970', './js/30-rutbe-cerceveleri.js?v=7078062f', './js/31-gunluk-bonus.js?v=6977a1b0', './js/32-online-arayuz.js?v=51971a29', './js/33-dokunus.js?v=b16c50e3', './js/34-ozel-efektler.js?v=450b3a6d', './js/35-oyun-sahneleri.js?v=8b8deb6c', './js/35b-oyun-sahneleri-2.js?v=12eed53c', './js/35c-yeni-temalar.js?v=5518e41a', './js/36-yardim-tekrar.js?v=39e29c01', './js/37-oda-baglantisi.js?v=b3fed1e1', './js/38-guclu-renkler.js?v=dad7a78f', './js/39-onizleme-mac.js?v=337ddfd1', './js/40-giris-siniri.js?v=3acba82e', './js/42-gorevler.js?v=9d1b1c69', './js/43-istatistik.js?v=99e7c1d0', './js/44-tepkiler.js?v=594df92a', './js/45-kelime-paketi.js?v=5d1b60bb', './js/46-cevrimdisi.js?v=7e30363d', './js/47-bildirim.js?v=8a061412', './js/48-izleme.js?v=f20e2c9e', './js/49-profil-menu.js?v=3cd48fba', './js/50-hoca.js?v=1a940432'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(PRE)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;
  const u=new URL(r.url);
  if(r.method!=='GET'||(u.origin!==location.origin&&!(u.hostname==='cdn.jsdelivr.net'&&u.pathname.startsWith('/npm/@supabase/'))))return;
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
