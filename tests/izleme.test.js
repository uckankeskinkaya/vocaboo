// Hata izleme: beklenmeyen hata log_error ile gider (tekrar ve gürültü elenir), yönetici panelinde günlük görünür.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(async () => {
    const r = {}, w = ms => new Promise(x => setTimeout(x, ms)), c = [];
    prof = { username: 'root', admin: true };
    sb = { rpc: async (n, a) => { c.push([n, a]); return n === 'admin_errors' ? { data: [{ msg: 'Boom x', src: 'a.js:1', n: 3, uname: 'ali', ts: new Date().toISOString() }] } : { data: null } } };
    izGonder('Boom x', 'a.js:1'); izGonder('Boom x', 'a.js:1'); izGonder('ResizeObserver loop limit', 'x');
    r.bir = c.filter(x => x[0] === 'log_error').length === 1;
    aAdmin(); await w(40);
    r.dugme = !!document.getElementById('ad7');
    document.getElementById('ad7').click(); await w(80);
    r.liste = document.body.innerText.includes('Boom x') && document.body.innerText.includes('3×');
    return r;
  });
  for (const [k, v] of Object.entries(o)) assert.ok(v, k + ' başarısız');
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok izleme: hata kaydı, tekrar/gürültü filtresi, yönetici günlüğü');
  await s.kapat();
})().catch(e => { console.error('HATA izleme:', e.message); process.exit(1); });
