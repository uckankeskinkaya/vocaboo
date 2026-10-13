// Sunucudan gelen kelime tanımı/çevirisi HTML olarak çalışmamalı (öğretmen kelime ekleyebildiği için).
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(async () => {
    const r = {}, w = ms => new Promise(x => setTimeout(x, ms));
    window.__x = 0;
    const kotu = '<img src=x onerror="window.__x=1"><b id=zz>';
    mode = 'practice'; PSV = true; lv = 0;
    SR = { def: kotu, tr: kotu, dtr: kotu, len: 5, lvl: 0, tries: 5, guesses: [] };
    next(); await w(100);
    r.defGuvenli = !document.querySelector('#def img') && !document.getElementById('zz') && document.getElementById('def').innerText.includes('<img');
    const bt = document.getElementById('trbtn'); if (bt) { bt.click(); await w(50) }
    r.trGuvenli = !document.querySelector('#def img') && !document.getElementById('zz');
    // oyun sonu satırı
    word = 'HELLO'; def = kotu; guesses = [{ w: 'HELLO', s: 'ggggg'.split('') }]; over = false; finish('Doğru!'); await w(100);
    r.bitisGuvenli = !document.querySelector('#res img') && !document.getElementById('zz');
    r.calismadi = window.__x === 0;
    return r;
  });
  for (const [k, v] of Object.entries(o)) assert.ok(v, k + ' başarısız');
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok XSS (kelime tanımı): açıklama, TR düğmesi ve oyun sonu satırı HTML olarak çalışmıyor');
  await s.kapat();
})().catch(e => { console.error('HATA xss-kelime:', e.message); process.exit(1); });
