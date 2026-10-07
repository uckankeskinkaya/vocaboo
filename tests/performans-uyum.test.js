// Yavaş telefon algılama: yavaş kare süreleri hafif modu açar ve hatırlanır; hızlıda dokunmaz; "Tam" seçiliyse dokunmaz.
// Synthwave animasyonları artık GPU dönüşümüyle (transform) çalışır.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(async () => {
    const r = {};
    const hizli = Array(60).fill(16.7), yavas = Array(60).fill(60), karisik = [200, 200, 200].concat(Array(60).fill(16.7));
    r.hizli = yavasMi(hizli); r.yavas = yavasMi(yavas); r.baslangicAtilir = yavasMi(karisik); r.az = yavasMi(Array(10).fill(80));
    // otomatik mod + yavaş işareti -> hafif
    localStorage.removeItem('ka_slow'); localStorage.setItem('ka_perf', 'auto'); applyPerf(); r.once = document.documentElement.dataset.perf || '';
    localStorage.setItem('ka_slow', '1'); applyPerf(); r.yavasOtomatik = document.documentElement.dataset.perf;
    localStorage.setItem('ka_perf', 'full'); applyPerf(); r.tamSecili = document.documentElement.dataset.perf || '';
    localStorage.setItem('ka_perf', 'low'); applyPerf(); r.hafifSecili = document.documentElement.dataset.perf;
    localStorage.removeItem('ka_slow'); localStorage.setItem('ka_perf', 'auto'); applyPerf();
    // Synthwave: kare/ızgara animasyonları transform ile
    const css = [...document.querySelectorAll('style')].map(x => x.textContent).join('\n');
    r.gpu = /@keyframes sc-gridt\{from\{transform/.test(css) && /@keyframes sc-gridg\{from\{transform/.test(css) && /@keyframes os-dasht\{from\{transform/.test(css);
    r.eskiYok = !/animation:sc-grid [0-9.]+s linear infinite/.test(css.split('synthwave')[1] || '');
    return r;
  });
  assert.deepStrictEqual([o.hizli, o.yavas, o.baslangicAtilir, o.az], [false, true, false, false]);
  assert.strictEqual(o.once, ''); assert.strictEqual(o.yavasOtomatik, 'low', 'yavaş cihazda otomatik mod hafif olmalı');
  assert.strictEqual(o.tamSecili, '', '"Tam" seçiliyse dokunulmamalı'); assert.strictEqual(o.hafifSecili, 'low');
  assert.ok(o.gpu, 'synthwave animasyonları transform ile olmalı');
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok performans uyumu: yavaş telefon algılama, tercih korunur, synthwave GPU animasyonu');
  await s.kapat();
})().catch(e => { console.error('HATA performans uyumu:', e.message); process.exit(1); });
