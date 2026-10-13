// Sayfa hatasız açılır, temel fonksiyonlar tanımlıdır.
const assert = require('node:assert');
const { sayfaAc, globalFonksiyonlar } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  assert.deepStrictEqual(s.hatalar, [], 'sayfa hatası var: ' + s.hatalar.join(' | '));
  const f = await globalFonksiyonlar(s.sayfa);
  for (const ad of ['aBoard', 'aProfile', 'aUsername', 'aAdUser', 'rHome', 'oExit', 'frameHtml', 'kClean', 'cfgClean'])
    assert.ok(f[ad], ad + ' tanımlı olmalı');
  console.log('ok yükleme:', Object.keys(f).length, 'fonksiyon, hata yok');
  await s.kapat();
})().catch(e => { console.error('HATA yükleme:', e.message); process.exit(1); });
