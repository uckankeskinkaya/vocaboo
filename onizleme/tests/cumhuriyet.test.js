// 29 Ekim teması: sahne çizilir, oyun sahnesi ve harf blokları tanımlı; Cumhuriyet çerçevesi şimdilik kayıtlı değil.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(() => {
    const r = { temalar: [], cerceve: [] };
    for (const k of ['cumhuriyet']) {
      setTheme(k);
      r.temalar.push([k, document.documentElement.dataset.theme === k, document.getElementById('sahne').children.length > 5, PREMT.includes(k), !!TM[k],
        !!document.querySelector('style.ozel-blok-ek') && [...document.querySelectorAll('style.ozel-blok-ek')].some(e => e.textContent.includes('data-theme="' + k + '"') || e.textContent.includes(k))]);
    }
    // Çerçeve şimdilik kapalı: kayıtlı olmamalı, Pazar'da / profilde görünmemeli
    r.cerceve = [!FRM.cumhuriyet, !UNL.some(u => u.id === 'frame:cumhuriyet')];
    setTheme('dark');
    r.temiz = document.getElementById('sahne').children.length;
    return r;
  });
  for (const t of o.temalar) assert.ok(t.every(Boolean), 'tema eksik: ' + t[0] + ' ' + t.join());
  assert.ok(o.cerceve.every(Boolean), 'çerçeve kapalı olmalı: ' + o.cerceve.join());
  assert.strictEqual(o.temiz, 0);
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok yeni temalar: 29 Ekim sahnesi çiziliyor, çerçeve kapalı, tema değişince temizleniyor');
  await s.kapat();
})().catch(e => { console.error('HATA yeni temalar:', e.message); process.exit(1); });
