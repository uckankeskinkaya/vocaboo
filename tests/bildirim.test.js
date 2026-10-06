// Bildirimler: Ayarlar düğmesi, aç/kapat akışı (push_save / push_remove), test bildirimi ve anahtar dönüştürme.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(async () => {
    const r = {}, w = ms => new Promise(x => setTimeout(x, ms)), cagri = [];
    prof = { username: 'ali' };
    sb = { rpc: async (n, a) => { cagri.push(n); return { data: n === 'push_test' ? 'ok' : true } }, functions: { invoke: async (n, a) => { cagri.push('fn:' + n + ':' + a.body.test); return { data: { sent: 1, dead: 0, total: 1 } } } } };
    r.anahtar = bdKey('AQID').join(',') === '1,2,3';
    let sub = null;
    bdDestek = () => true;
    bdSub = async () => sub;
    bdAc = async () => { cagri.push('ac'); sub = { endpoint: 'https://x.example/abc', unsubscribe: async () => { cagri.push('unsub') } }; return true };
    Object.defineProperty(Notification, 'permission', { configurable: true, get: () => 'granted' });
    aSettings(); await w(60);
    r.kapali = document.getElementById('s8').innerText.includes('Kapalı') && !document.getElementById('s9');
    document.getElementById('s8').click(); await w(80);
    r.acik = document.getElementById('s8').innerText.includes('Açık') && !!document.getElementById('s9');
    document.getElementById('s9').click(); await w(80);
    r.test = cagri.includes('push_test') && cagri.includes('fn:push-gonder:true');
    document.getElementById('s8').click(); await w(80);
    r.kapandi = cagri.includes('push_remove') && cagri.includes('unsub') && document.getElementById('s8').innerText.includes('Kapalı');
    return r;
  });
  for (const [k, v] of Object.entries(o)) assert.ok(v, k + ' başarısız');
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok bildirim: ayar düğmesi, aç/kapat, test gönderimi');
  await s.kapat();
})().catch(e => { console.error('HATA bildirim:', e.message); process.exit(1); });
