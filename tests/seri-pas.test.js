// Seri modu: sunucunun verdiği pas hakkı (3) başlangıçta hemen görünür ve Pas düğmesi açıktır.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(async () => {
    const h = document.getElementById('how'); if (h) h.hidden = true;
    prof = { id: 'u1', username: 'ali', xp: 5, avatar: null };
    sb = { rpc: async n => n === 'run_start' ? { data: { def: 'a test word', len: 6, tries: 5, lvl: 0, lives: 3, streak: 0, passes: 3, score: 0 }, error: null } : { data: null, error: null }, auth: {}, removeChannel() {}, from: () => ({ select: () => ({}) }) };
    await startStreak(); await new Promise(r => setTimeout(r, 100));
    return { passes: run.passes, rozet: document.getElementById('badge').textContent, pasGorunur: !document.getElementById('passbtn').hidden, pasYazi: document.getElementById('passbtn').textContent };
  });
  assert.strictEqual(o.passes, 3); assert.match(o.rozet, /Pas 3/); assert.ok(o.pasGorunur, 'Pas düğmesi başlangıçta görünmeli'); assert.match(o.pasYazi, /3/);
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok seri pas: 3 pas hakkıyla başlıyor, düğme görünür');
  await s.kapat();
})().catch(e => { console.error('HATA seri pas:', e.message); process.exit(1); });
