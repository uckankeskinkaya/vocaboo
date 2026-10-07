// Oyun ekranı: Pas düğmesi ikon + yazı + kalan hak rozeti olarak çizilir, hak bitince gizlenir.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(() => {
    mode = 'streak'; word = 'SHOWER'; def = 'x'; guesses = []; cur = Array(6).fill(''); over = false; hintUsed = false; tries = 5;
    document.getElementById('home').hidden = true; document.getElementById('game').hidden = false;
    const b = document.getElementById('passbtn'), r = {};
    run = { passes: 3 }; draw();
    r.gorunur = !b.hidden; r.ikon = !!b.querySelector('svg'); r.yazi = b.querySelector('span').textContent; r.sayi = b.querySelector('b').textContent; r.etiket = b.getAttribute('aria-label');
    run = { passes: 0 }; draw(); r.gizli_sifirda = b.hidden;
    run = { passes: 1 }; over = true; draw(); r.gizli_bitince = b.hidden;
    return r;
  });
  assert.strictEqual(o.gorunur, true); assert.strictEqual(o.ikon, true); assert.strictEqual(o.yazi, 'Pas'); assert.strictEqual(o.sayi, '3');
  assert.match(o.etiket, /3 hakkın var/); assert.strictEqual(o.gizli_sifirda, true); assert.strictEqual(o.gizli_bitince, true);
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok oyun ekranı: Pas düğmesi ikon + yazı + sayı rozeti');
  await s.kapat();
})().catch(e => { console.error('HATA oyun ekranı:', e.message); process.exit(1); });
