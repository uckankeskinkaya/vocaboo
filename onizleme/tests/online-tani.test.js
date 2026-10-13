// Online tanı: kanal hatası ve hata mesajıyla çıkış sunucuya kaydedilir; kanal kurma akışı bozulmaz.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(async () => {
    const w = ms => new Promise(x => setTimeout(x, ms)), logs = [], r = {};
    let cb = null;
    const kanal = { on() { return kanal; }, subscribe(f) { cb = f; return kanal; }, track() { }, unsubscribe() { }, presenceState: () => ({}) };
    sb = { rpc: async (n, a) => { if (n === 'log_error') logs.push(a._m); return { data: null, error: null }; }, channel: () => kanal, removeChannel() { }, getChannels: () => [], from: () => { const q = { select: () => q, in: () => q, then: f => f({ data: [], error: null }) }; return q; } };
    prof = { id: 'p', username: 'ben', avatar: 'p:fox', xp: 1 };
    const asil = sb.channel;
    room = 'ABCD'; cfg = { max: 2, m: 'c', n: 15, dur: 0, l: -1 };
    oKanal('ABCD', false);
    r.geri = sb.channel === asil;
    cb && cb('CHANNEL_ERROR', { message: 'kapali' });
    await w(60);
    r.kanalHatasi = logs.some(x => /oda kanalı CHANNEL_ERROR \(açık\) kapali/.test(x));
    oExit('Rakip bağlanamadı, tekrar dene.'); await w(60);
    r.cikis = logs.some(x => /online çıkış: Rakip bağlanamadı/.test(x));
    return r;
  });
  assert.ok(o.geri, 'sb.channel eski haline dönmeli'); assert.ok(o.kanalHatasi, 'kanal hatası kaydedilmedi'); assert.ok(o.cikis, 'çıkış mesajı kaydedilmedi');
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok online tanı: kanal hatası ve hata mesajlı çıkış sunucuya kaydediliyor');
  await s.kapat();
})().catch(e => { console.error('HATA online tanı:', e.message); process.exit(1); });
