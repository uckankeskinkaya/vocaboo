const C='vocaboo-778fa3e8';
const PRE=['./', './index.html', './manifest.webmanifest', './logo.png', './icon-180.png', './icon-192.png', './icon-512.png', './css/app.css?v=6d7bb853', './js/01-oyun-cekirdegi.js?v=371f4f6e', './js/02-online-hesap-ana.js?v=d97d25c8', './js/03-muzik-ses.js?v=c2e6d088', './js/04-sunucu-kelime.js?v=a8a239ab', './js/05-arkadaslar.js?v=01c81fd9', './js/06-eslestirme-davet.js?v=48139a5c', './js/07-kelime-defteri.js?v=336d49b9', './js/08-avatar.js?v=2c8f9a0f', './js/09-moderator.js?v=a554fbb8', './js/10-yonetici.js?v=44fe1a52', './js/11-dil.js?v=fb867036', './js/12-arena.js?v=252acc09', './js/13-tema-istatistik.js?v=90277293', './js/14-performans.js?v=f38efc61', './js/15-profil-skor.js?v=9912a0b3', './js/16-seviye-unvan.js?v=4604325c', './js/17-cerceveler.js?v=5dd3f82f', './js/18-kullanici-adi-seviye.js?v=19ba73b3', './js/19-sunucu-oda.js?v=632baa78', './js/20-cerceve-vitrin.js?v=6bc77581', './js/21-pazar-bakiye.js?v=e14d8473', './js/22-cerceve-bayrak.js?v=5f2b4ffa', './js/23-pazar-tema.js?v=d446e650', './js/24-sifre-sifirlama.js?v=29f286d4'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(PRE)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res}).catch(()=>caches.match(r).then(m=>m||caches.match('./index.html'))));
});
