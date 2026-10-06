// Seçili karede silme: kareye dokununca sadece o kare silinir (seçim kalır); seçili kare yoksa son harf silinir.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(async () => {
    const r = {}, w = ms => new Promise(x => setTimeout(x, ms));
    mode = 'practice'; PSV = false; lv = 0; sess = []; next(); await w(50);
    word = 'SHOWER'; cur = ['S', 'H', 'O', '', '', '']; sel = -1; draw(); await w(30);
    // dolu kareye dokun -> seçilir
    const kare = document.querySelector('[data-s="1"]');
    kare.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX: 10, clientY: 10, button: 0 }));
    dispatchEvent(new PointerEvent('pointerup', { clientX: 10, clientY: 10 })); await w(30);
    r.secildi = sel === 1;
    press('DEL'); r.sadeceSecili = cur.join('') === 'SO' && cur[1] === '' && cur[0] === 'S' && cur[2] === 'O' && sel === 1;
    // seçili kare boşken yazılan harf o kareye gider
    press('A'); r.yerineYazildi = cur[1] === 'A' && cur[2] === 'O';
    // seçim yokken eski davranış: son harf silinir
    sel = -1; press('DEL'); r.sonHarf = cur[2] === '' && cur[1] === 'A';
    return r;
  });
  for (const [k, v] of Object.entries(o)) assert.ok(v, k + ' başarısız');
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok kare silme: seçili kare tek başına silinir, yerine yazılır, seçim yoksa son harf');
  await s.kapat();
})().catch(e => { console.error('HATA kare-sil:', e.message); process.exit(1); });
