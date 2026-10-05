// Sahneli temalara özel dokunuş efektleri ve harf blokları.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(async () => {
    const wait = ms => new Promise(r => setTimeout(r, ms)), r = { efekt: {}, blok: {} };
    const TEMALAR = ['cyber', 'witcher', 'minecraft', 'galaksi', 'yagmur', 'kis', 'okyanus', 'synthwave', 'buyulu', 'petal', 'kod', 'ejder'];
    document.getElementById('home').hidden = false;
    const dugme = document.createElement('button'); dugme.id = 'dz'; dugme.textContent = 'x'; dugme.style.cssText = 'position:fixed;left:50px;top:300px;width:80px;height:40px;z-index:5'; document.body.appendChild(dugme);
    const bas = () => dugme.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX: 90, clientY: 320 }));
    const kutu = (c) => { const t = document.createElement('div'); t.className = 'tile ' + c; t.textContent = 'A'; t.style.cssText = 'position:fixed;left:0;top:0;width:40px;height:40px'; document.body.appendChild(t); const cs = getComputedStyle(t), v = { img: cs.backgroundImage, bg: cs.backgroundColor, rad: cs.borderRadius, renk: cs.color }; t.remove(); return v };
    for (const k of TEMALAR) {
      setTheme(k); await wait(30);
      bas(); const n1 = document.querySelectorAll('.fxp').length; await wait(1300); const n2 = document.querySelectorAll('.fxp').length;
      r.efekt[k] = [n1, n2];
      const g = kutu('g'), oo = kutu('o'), rr = kutu('r'), e = kutu('');
      r.blok[k] = { ozel: [g, oo, rr].every(v => v.img !== 'none' || v.bg !== 'rgb(34, 163, 90)'), farkli: new Set([g.bg + g.img, oo.bg + oo.img, rr.bg + rr.img]).size === 3, bos: e.img !== 'none' || e.bg !== 'rgba(0, 0, 0, 0)' };
    }
    setTheme('dark'); bas(); r.sahnesiz = document.querySelectorAll('.fxp').length;
    setTheme('cyber'); document.documentElement.dataset.perf = 'low'; bas(); r.dusukPerf = document.querySelectorAll('.fxp').length; delete document.documentElement.dataset.perf;
    return r;
  });
  for (const [k, [a, b]] of Object.entries(o.efekt)) { assert.ok(a > 0, k + ': efekt çıkmadı'); assert.strictEqual(b, 0, k + ': efekt temizlenmedi'); }
  for (const [k, v] of Object.entries(o.blok)) { assert.ok(v.ozel, k + ': harf bloğu özel değil'); assert.ok(v.farkli, k + ': doğru/yeri yanlış/yok aynı görünüyor'); assert.ok(v.bos, k + ': boş kutu stilsiz'); }
  assert.strictEqual(o.sahnesiz, 0, 'sahnesiz temada efekt çıkmamalı'); assert.strictEqual(o.dusukPerf, 0, 'düşük performansta efekt çıkmamalı');
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok özel tema: 12 temada dokunuş efekti ve harf bloğu, sahnesiz/düşük performansta efekt yok');
  await s.kapat();
})().catch(e => { console.error('HATA özel tema:', e.message); process.exit(1); });
