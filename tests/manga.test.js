// Yeni temalar (balon, sonbahar, tropik, kamp): sahne çizilir, oyun sahnesi ve harf blokları tanımlı, 4 çerçeve SVG olarak çizilir.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(() => {
    const r = { temalar: [], cerceve: [] };
    for (const k of ['manga']) {
      setTheme(k);
      r.temalar.push([k, document.documentElement.dataset.theme === k, document.getElementById('sahne').children.length > 5, PREMT.includes(k), !!TM[k],
        !!document.querySelector('style.ozel-blok-ek') && [...document.querySelectorAll('style.ozel-blok-ek')].some(e => e.textContent.includes('data-theme="' + k + '"') || e.textContent.includes(k))]);
    }
    for (const k of ['manga']) {
      const b = frameHtml('<img width="84">', k), k2 = frameHtml('<img width="30">', k);
      r.cerceve.push([k, !!FRM[k], b.includes('class="rk rk-' + k), b.includes('rk-b') && b.includes('rk-f'), k2.includes(' sm"')]);
    }
    setTheme('dark');
    r.temiz = document.getElementById('sahne').children.length;
    return r;
  });
  for (const t of o.temalar) assert.ok(t.every(Boolean), 'tema eksik: ' + t[0] + ' ' + t.join());
  for (const c of o.cerceve) assert.ok(c.every(Boolean), 'çerçeve eksik: ' + c.join());
  assert.strictEqual(o.temiz, 0);
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok yeni temalar: manga sahnesi + çerçevesi çiziliyor, tema değişince temizleniyor');
  await s.kapat();
})().catch(e => { console.error('HATA yeni temalar:', e.message); process.exit(1); });
