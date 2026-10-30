// İstatistik ekranı: özet kartları, dağılım, harf listeleri, boş veri.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(async () => {
    const r = {};
    prof = { username: 'ali', avatar: null, frame: null, xp: 0, best_score: 0 };
    const L = 'ERATDSILNO'.split('').map((l, i) => ({ l, n: 40 - i, g: 20 - i })).concat('KZ'.split('').map(l => ({ l, n: 20, g: 1 })));
    sb = { rpc: async n => ({ data: n === 'stats_me' ? { t: { solved: 50, failed: 8, first: 26, guesses: 106, hints: 14, streak: 10, dstreak: 1, dwins: 1 }, dist: [19, 5, 3, 6, 3], days: Array.from({ length: 14 }, (_, i) => ({ d: '2026-10-' + String(i + 1).padStart(2, '0'), w: i % 4 })), letters: L, modes: { s: 33, d: 1, p: 1, m: 1 } } : null }) };
    await aStats(); r.dolu = document.body.innerText;
    sb = { rpc: async () => ({ data: { t: { solved: 0, failed: 0 }, dist: [0, 0, 0, 0, 0], days: [], letters: [], modes: {} } }) };
    await aStats(); r.bos = document.body.innerText;
    aProfile(); aPMenu(); r.dugme = !!document.getElementById('stb');
    return r;
  });
  assert.match(o.dolu, /%86/); assert.match(o.dolu, /2\.1/); assert.match(o.dolu, /Kaç denemede çözdün/); assert.match(o.dolu, /Zorlandığın harfler/); assert.match(o.dolu, /Seri Modu/);
  assert.match(o.bos, /Henüz yeterli veri yok/); assert.ok(o.dugme);
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok istatistik: özet kartları, dağılım, son 14 gün, harf listeleri, boş veri');
  await s.kapat();
})().catch(e => { console.error('HATA istatistik:', e.message); process.exit(1); });
