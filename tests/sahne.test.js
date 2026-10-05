// Sahneli temalar: 12 tema seçilince sahne çizilir, tema değişince temizlenir, yeni çerçeveler tanımlı.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(() => {
    const r = { temalar: [], cerceve: ['ates', 'simsek', 'galaksi', 'cyberc', 'piksel', 'kurt'].every(k => FRM[k] && frameHtml('<img width="40">', k).includes('fq')) };
    for (const k of ['cyber', 'witcher', 'minecraft', 'galaksi', 'yagmur', 'kis', 'okyanus', 'synthwave', 'buyulu', 'petal', 'kod', 'ejder']) {
      setTheme(k);
      r.temalar.push([k, document.documentElement.dataset.theme === k, document.documentElement.dataset.scene === '1', document.getElementById('sahne').children.length, PREMT.includes(k)]);
    }
    setTheme('dark'); r.temiz = [document.documentElement.dataset.scene === undefined, document.getElementById('sahne').children.length];
    return r;
  });
  assert.strictEqual(o.temalar.length, 12);
  for (const t of o.temalar) { assert.ok(t[1] && t[2] && t[3] > 5 && t[4], 'sahne eksik: ' + t[0]); }
  assert.ok(o.cerceve); assert.deepStrictEqual(o.temiz, [true, 0]);
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok sahne: 12 canlı tema çiziliyor, temizleniyor; 6 yeni çerçeve tanımlı');
  await s.kapat();
})().catch(e => { console.error('HATA sahne:', e.message); process.exit(1); });
