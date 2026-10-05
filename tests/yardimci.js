// Test yardımcısı: siteyi gerçek tarayıcıda (Chromium) açar. Supabase sahte bir nesneyle değiştirilir,
// internete çıkış engellenir. Dosyalar bir klasörden (varsayılan: repo kökü) sunulur.
const fs = require('fs');
const path = require('path');
function playwrightYukle() {
  for (const yol of ['playwright', '/opt/node22/lib/node_modules/playwright', '/opt/node-tools/node_modules/playwright']) {
    try { return require(yol); } catch (e) { /* sıradakini dene */ }
  }
  throw new Error('playwright bulunamadı (npm i playwright)');
}
const { chromium } = playwrightYukle();
const KOK = path.resolve(__dirname, '..');
const TUR = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.webmanifest': 'application/manifest+json', '.json': 'application/json' };
const SUPABASE_CDN = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.117.2/dist/umd/supabase.js';
// Her çağrıya {data:null,error:{message:'stub'}} dönen sahte Supabase istemcisi.
const STUB = `(function(){const mk=()=>new Proxy(function(){},{get:(t,p)=>p==='then'?(res=>res({data:null,error:{message:'stub'}})):p==='data'?null:p==='error'?{message:'stub'}:mk(),apply:()=>mk()});window.supabase={createClient:()=>mk()}})();`;

async function sayfaAc({ kok = KOK, viewport = { width: 400, height: 900 }, renk = 'light', bekle = 800 } = {}) {
  const tarayici = await chromium.launch();
  const baglam = await tarayici.newContext({ viewport, colorScheme: renk, deviceScaleFactor: 2 });
  const sayfa = await baglam.newPage();
  const hatalar = [];
  sayfa.on('pageerror', e => hatalar.push(e.message));
  await sayfa.route('https://test.local/**', r => {
    let yol = decodeURIComponent(new URL(r.request().url()).pathname);
    if (yol === '/stub.js') return r.fulfill({ contentType: 'text/javascript', body: STUB });
    if (yol === '/') yol = '/index.html';
    const dosya = path.join(kok, yol);
    if (!dosya.startsWith(kok) || !fs.existsSync(dosya) || fs.statSync(dosya).isDirectory()) return r.fulfill({ status: 404, body: '' });
    let govde = fs.readFileSync(dosya);
    if (yol === '/index.html') govde = Buffer.from(govde.toString('utf8').replace(/ integrity="[^"]*"/, '').replace(SUPABASE_CDN, '/stub.js'));
    r.fulfill({ contentType: TUR[path.extname(dosya)] || 'application/octet-stream', body: govde });
  });
  await sayfa.route(/^(?!https:\/\/test\.local).*/, r => r.abort());
  await sayfa.goto('https://test.local/');
  await sayfa.waitForTimeout(bekle);
  return { sayfa, tarayici, baglam, hatalar, kapat: () => tarayici.close() };
}

// Sayfadaki (tarayıcının kendi pencere nesneleri dışındaki) tüm global fonksiyonların kaynak kodu.
async function globalFonksiyonlar(sayfa) {
  return sayfa.evaluate(() => {
    const f = document.createElement('iframe'); document.body.appendChild(f);
    const taban = new Set(Object.getOwnPropertyNames(f.contentWindow)); f.remove();
    const o = {};
    for (const k of Object.getOwnPropertyNames(window)) {
      if (taban.has(k)) continue;
      try { if (typeof window[k] === 'function') o[k] = window[k].toString(); } catch (e) { /* atla */ }
    }
    return o;
  });
}
const normalize = s => s.replace(/^(async\s+)?function\s*\w*\s*\(/, '$1function(');
module.exports = { sayfaAc, globalFonksiyonlar, normalize, KOK };
