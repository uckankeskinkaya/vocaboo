// Sayfaya ulaşan hiçbir veri (Realtime zili, hatta sunucu cevabı) sayfada kod çalıştırmamalı ve lobiyi çökertmemeli.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const hata = await s.sayfa.evaluate(async () => {
    const X = '<img src=x onerror="window.__x=(window.__x||0)+1">';
    const wait = ms => new Promise(r => setTimeout(r, ms)); loadProf = async () => {};
    const hata = [];
    const durumlar = {
      soru: { c: { m: 'k', n: X, T: X, max: X }, i: X, n: X, t: 'ty', q: 'soru', o: [], len: X, el: X },
      sonuc: { c: { m: 'k', n: 5, T: 20, max: 50 }, i: 1, r: { a: 'x', t: 'ty', d: [X, X], pts: { oyuncu: X }, st: { oyuncu: X }, top: [{ n: X, p: X }, { n: 'b', p: X }] } },
      final: { c: { m: 'k', n: 5, T: 20, max: 50 }, f: [{ n: X, p: X }, { n: 'b', p: X }, { n: 'c', p: X }, { n: 'd', p: X }] },
    };
    for (const [ad, veri] of Object.entries(durumlar)) {
      myName = 'oyuncu'; started = false; isHost = false; mode = 'online'; room = 'ABCD';
      cfg = { max: 50, m: 'k', n: 5, dur: 0, l: -1, mod: 1, T: 20 };
      K = { i: -1, my: -1, rv: false, sh: null, cq: null, rs: 1 };
      sb = { rpc: async n => ({ data: n === 'a_cur' ? veri : n === 'a_final' ? { top: veri.f || [], xp: { oyuncu: X } } : null, error: null }), from: () => ({}), auth: {} };
      try { await kSync(); await wait(150); } catch (e) { hata.push(ad + ': ' + e.message); }
    }
    // Realtime zili: yük taşıyor gibi görünse bile yok sayılır, yalnızca sunucudan çekmeyi tetikler
    started = true; K = { i: -1, my: -1, rv: false, sh: null, cq: null, rs: 1 };
    sb = { rpc: async () => ({ data: null, error: null }), from: () => ({}), auth: {} };
    try { kOn('kq', { i: X, html: X }); kOn('kr', X); kOn('ka', { c: X }); kOn('ks', { f: X }); } catch (e) { hata.push('zil: ' + e.message); }
    // Çerçeve / avatar anahtarları
    for (const k of ['constructor', '__proto__', 'toString']) { try { frameHtml('<b width="40"></b>', k); } catch (e) { hata.push('cerceve ' + k + ': ' + e.message); } }
    try { av('p:constructor', 40); } catch (e) { hata.push('avatar: ' + e.message); }
    return hata;
  });
  await s.sayfa.waitForTimeout(300);
  const xss = await s.sayfa.evaluate(() => ({ calisti: window.__x || 0, img: document.querySelectorAll('#online img[src="x"]').length }));
  assert.deepStrictEqual(hata, [], 'çökme: ' + hata.join(' | '));
  assert.strictEqual(xss.calisti, 0, 'enjekte kod çalıştı');
  assert.strictEqual(xss.img, 0, 'enjekte etiket sayfaya girdi');
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok XSS: sunucudan/zilden gelen kötü veri kod çalıştırmadı, lobi çökmedi');
  await s.kapat();
})().catch(e => { console.error('HATA XSS:', e.message); process.exit(1); });
