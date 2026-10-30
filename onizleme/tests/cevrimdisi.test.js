// Çevrimdışı alıştırma: internet yokken sunucuya gitmeden pakete düşer, puan yok uyarısı, internet isteyen modlar engellenir, kelime tekrarı yok.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(async () => {
    const r = {}, w = ms => new Promise(x => setTimeout(x, ms));
    const pack = []; for (let i = 0; i < 1200; i++) pack.push([i % 4, 'alpha' + String.fromCharCode(97 + (i % 26)) + String.fromCharCode(97 + ((i / 26 | 0) % 26)) + String.fromCharCode(97 + ((i / 676 | 0) % 26)), 'definition ' + i, 'türkçe' + i, 'Example sentence ' + i]);
    PK = { t: Date.now(), d: pack };
    let rpc = 0; prof = { username: 'ali' }; sb = { rpc: async n => { rpc++; return { data: null } } };
    // internet yok
    Object.defineProperty(navigator, 'onLine', { configurable: true, get: () => false });
    dispatchEvent(new Event('offline')); await w(30);
    r.banner = !!document.getElementById('offb'); r.isaret = document.documentElement.dataset.off === '1';
    // seviye düğmesi
    document.getElementById('home').hidden = true; document.getElementById('menu').hidden = false;
    const bas = document.querySelector('#lvls .lvl'); bas.click(); await w(80);
    r.oyun = !document.getElementById('game').hidden; r.sunucuyaGitmedi = rpc === 0;
    r.kelime = word; r.uzunluk = word.length > 5; r.def = document.getElementById('def').innerText; r.mod = mode;
    const gor = new Set([word]);
    for (let i = 0; i < 5; i++) { next(); gor.add(word) } r.tekrarYok = gor.size === 6;
    r.ipucu = hintFor(word).startsWith('Örnek cümle');
    // İnternet isteyen mod
    document.getElementById('game').hidden = true; document.getElementById('home').hidden = false;
    document.getElementById('mStreak').click(); await w(30); r.seriEngel = rpc === 0 && document.getElementById('game').hidden;
    // internet geldi
    Object.defineProperty(navigator, 'onLine', { configurable: true, get: () => true });
    dispatchEvent(new Event('online')); await w(30); r.bannerGitti = !document.getElementById('offb');
    return r;
  });
  for (const [k, v] of Object.entries(o)) if (k !== 'kelime' && k !== 'def' && k !== 'mod') assert.ok(v, k + ' başarısız');
  assert.strictEqual(o.mod, 'practice'); assert.match(o.def, /[Dd]efinition/);
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok çevrimdışı: paketten alıştırma, sunucuya istek yok, banner, internet isteyen modlar uyarır, tekrar yok');
  await s.kapat();
})().catch(e => { console.error('HATA çevrimdışı:', e.message); process.exit(1); });
