// Realtime üzerinden gelen kötü niyetli veri sayfada kod çalıştırmamalı ve lobiyi çökertmemeli.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const sonuc = await s.sayfa.evaluate(() => {
    const X = '<img src=x onerror="window.__x=(window.__x||0)+1">';
    myName = 'oyuncu'; started = true; isHost = false; mode = 'online';
    cfg = { max: 50, m: 'k', n: 5, dur: 0, l: -1, mod: 1, T: 20 };
    const hata = [];
    const dene = (ad, f) => { try { f(); } catch (e) { hata.push(ad + ': ' + e.message); } };
    dene('kq', () => kOn('kq', { i: X, n: X, t: 'ty', q: 'soru', o: [], len: X, rd: 0 }));
    dene('kr', () => kOn('kr', { i: 1, a: 'x', t: 'ty', d: [X, X], pts: { oyuncu: X }, st: { oyuncu: X }, top: [{ n: X, p: X }, { n: 'b', p: X }] }));
    dene('kf', () => kOn('kf', { top: [{ n: X, p: X }, { n: 'b', p: X }, { n: 'c', p: X }, { n: 'd', p: X }] }));
    dene('ks', () => kOn('ks', { c: { m: 'k', n: X, T: X, max: X }, i: X, len: X, t: 'ty', q: 'q', o: [], el: X }));
    for (const k of ['constructor', '__proto__', 'toString']) dene('cerceve ' + k, () => frameHtml('<b width="40"></b>', k));
    dene('avatar', () => av('p:constructor', 40));
    return hata;
  });
  await s.sayfa.waitForTimeout(400);
  const xss = await s.sayfa.evaluate(() => ({ calisti: window.__x || 0, img: document.querySelectorAll('#online img[src="x"]').length }));
  assert.deepStrictEqual(sonuc, [], 'çökme: ' + sonuc.join(' | '));
  assert.strictEqual(xss.calisti, 0, 'enjekte kod çalıştı');
  assert.strictEqual(xss.img, 0, 'enjekte etiket sayfaya girdi');
  console.log('ok XSS: enjekte kod çalışmadı, lobi çökmedi');
  await s.kapat();
})().catch(e => { console.error('HATA XSS:', e.message); process.exit(1); });
