// Yönetici: Pazar'da bedava erişim yok (satın alması gerekir), kendi seviyesini ayarlayamaz, kullanıcıya (kendine de) para ekleyebilir.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(async () => {
    const r = {}, w = ms => new Promise(x => setTimeout(x, ms)), c = [];
    prof = { id: 'a', username: 'root', admin: true, owned: ['theme:kod'], xp: 10 };
    r.bedavaYok = ownedHas('theme:cyber') === false && ownedHas('theme:kod') === true;
    sb = { rpc: async (n, a) => { c.push([n, a]); return { data: n === 'admin_add_points' ? 'ok' : null } }, auth: { getUser: async () => ({ data: null, error: null }) } };
    loadProf = async () => {};
    aAdmin(); await w(30); r.seviyeDugmesiYok = !document.getElementById('adl');
    AU = { a: { id: 'a', u: 'root', c: false, b: false, a: true, bs: 0, xp: 10 }, u1: { id: 'u1', u: 'veli', c: true, b: false, a: false, bs: 0, xp: 10 } };
    aAdUser('a', ''); await w(30);
    r.kendindeSeviyeYok = !document.getElementById('u5') && !!document.getElementById('u8p');
    document.getElementById('u8p').click(); await w(30);
    document.getElementById('pn').value = '999999999'; document.getElementById('pk').click(); await w(30);
    r.sinir = /10\.000\.000/.test(document.getElementById('pe').textContent) && !c.some(x => x[0] === 'admin_add_points');
    document.querySelector('[data-m="100000"]').click(); document.getElementById('pk').click(); await w(60);
    const k = c.find(x => x[0] === 'admin_add_points');
    r.eklendi = k && k[1]._id === 'a' && k[1]._n === 100000;
    aAdUser('u1', ''); await w(30); r.digerinde = !!document.getElementById('u5') && !!document.getElementById('u8p');
    return r;
  });
  for (const [k, v] of Object.entries(o)) assert.ok(v, k + ' başarısız');
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok yönetici: bedava erişim yok, kendi seviyesi kapalı, para ekleme');
  await s.kapat();
})().catch(e => { console.error('HATA yonetici-para:', e.message); process.exit(1); });
