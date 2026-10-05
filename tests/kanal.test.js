// Oda kanalı: önce özel kanal; kurulamazsa bir kez açık kanala geri düşer; ikisi de olmazsa anlaşılır hata.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(async () => {
    const wait = ms => new Promise(r => setTimeout(r, ms)); const sonuc = {};
    const dene = async (ad, ozelDurum, acikDurum) => {
      const acilan = [], kaldirilan = [], olaylar = [];
      sb = {
        channel: (isim, opt) => {
          const k = { isim, ozel: opt.config.private, on(tip, f, g) { olaylar.push(f.event || f.event === undefined ? (f.event || tip) : tip); return k; }, track() { }, presenceState: () => ({}),
            subscribe(cb) { acilan.push(k); setTimeout(() => cb(k.ozel ? ozelDurum : acikDurum), 5); return k; } };
          return k;
        },
        removeChannel: k => kaldirilan.push(k.isim), rpc: async () => ({ data: null, error: null }), from: () => ({}), auth: {}
      };
      prof = { id: 'u', username: 'ali', avatar: null, xp: 0 }; oLobby = () => { sonuc[ad + '_lobi'] = true; }; oExit = m => { sonuc[ad + '_cikis'] = m || '(mesajsız)'; };
      sonuc[ad + '_lobi'] = false;
      oJoin('ABCD', false); await wait(80);
      sonuc[ad] = { kanallar: acilan.map(k => k.isim + (k.ozel ? ':özel' : ':açık')), kaldirilan, olaylar: [...new Set(olaylar)].sort().join(',') };
    };
    await dene('ozel_calisir', 'SUBSCRIBED', 'SUBSCRIBED');
    await dene('ozel_hata_acik_calisir', 'CHANNEL_ERROR', 'SUBSCRIBED');
    await dene('ozel_zaman_asimi', 'TIMED_OUT', 'SUBSCRIBED');
    await dene('ikisi_de_hata', 'CHANNEL_ERROR', 'CHANNEL_ERROR');
    return sonuc;
  });
  assert.deepStrictEqual(o.ozel_calisir.kanallar, ['ka-ABCD:özel'], 'önce özel kanal denenmeli'); assert.strictEqual(o.ozel_calisir_lobi, true);
  assert.deepStrictEqual(o.ozel_hata_acik_calisir.kanallar, ['ka-ABCD:özel', 'ka-ABCD:açık']); assert.deepStrictEqual(o.ozel_hata_acik_calisir.kaldirilan, ['ka-ABCD']); assert.strictEqual(o.ozel_hata_acik_calisir_lobi, true);
  assert.deepStrictEqual(o.ozel_zaman_asimi.kanallar, ['ka-ABCD:özel', 'ka-ABCD:açık']);
  assert.deepStrictEqual(o.ikisi_de_hata.kanallar, ['ka-ABCD:özel', 'ka-ABCD:açık'], 'yalnızca bir kez geri düşmeli'); assert.match(o.ikisi_de_hata_cikis, /Bağlantı kurulamadı/); assert.strictEqual(o.ikisi_de_hata_lobi, false);
  assert.ok(!/\bka\b/.test(o.ozel_calisir.olaylar.replace(/kq|kr|kf/g, '')) , 'eski cevap olayı (ka) dinlenmemeli');
  assert.ok(/kf/.test(o.ozel_calisir.olaylar) && /kq/.test(o.ozel_calisir.olaylar) && /kr/.test(o.ozel_calisir.olaylar), 'kq/kr/kf zilleri dinlenmeli');
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok kanal: özel kanal, tek seferlik geri dönüş, ikisi de olmazsa anlaşılır hata');
  await s.kapat();
})().catch(e => { console.error('HATA kanal:', e.message); process.exit(1); });
