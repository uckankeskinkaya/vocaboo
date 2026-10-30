// Market iadesi: 2 saat içindeki satın alımlar "İade edilebilir" bölümünde (kalan süre + geri gelecek fiyat), onaydan sonra shop_refund,
// kullanımdaki tema iade edilirse varsayılana dönülür; iade edilecek bir şey yoksa bölüm çıkmaz; sunucu hataları anlaşılır.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(async () => {
    const wait = ms => new Promise(r => setTimeout(r, ms)), r = { cagri: [], toasts: [] };
    const h = document.getElementById('how'); if (h) h.hidden = true;
    loadProf = async () => {};
    prof = { id: 'u1', username: 'ali', xp: 5, avatar: null, frame: null };
    let refund = { 'theme:kod': { s: 5400, p: 105000 }, 'frame:kalp': { s: 600, p: 75000 } }, iade = { ok: true, p: 105000 };
    sb = { rpc: async (n, a) => { r.cagri.push([n, a]);
        if (n === 'shop_list') return { data: { bal: 9000, owned: ['theme:kod', 'frame:kalp'], refund, items: [{ id: 'theme:kod', price: 105000, owned: true }, { id: 'frame:kalp', price: 75000, owned: true }, { id: 'theme:siber', price: 90000, owned: false }] }, error: null };
        if (n === 'shop_refund') { delete refund[a._id]; return { data: iade, error: null }; }
        return { data: null, error: null }; }, auth: {}, removeChannel() {}, from: () => ({ select: () => ({}) }) };
    const _t = toast; toast = m => { r.toasts.push(m); _t(m) };
    setTheme('kod');
    await aShop('t'); await wait(150);
    const kutu = document.getElementById('rfb'); r.var = !!kutu; r.metin = kutu && kutu.innerText.replace(/\s+/g, ' ');
    r.satir = kutu ? kutu.querySelectorAll('[data-rf]').length : 0;
    // temayı iade et (kullanımda)
    kutu.querySelector('[data-rf="theme:kod"]').click(); await wait(30);
    r.onay = document.getElementById('cft').textContent; document.getElementById('cfy').click(); await wait(250);
    r.cagri1 = r.cagri.filter(x => x[0] === 'shop_refund').map(x => x[1]);
    r.temaSonra = document.documentElement.dataset.theme; r.kalanSatir = document.querySelectorAll('#rfb [data-rf]').length;
    // süre dolmuş hata
    iade = { err: 'sure' }; document.querySelector('#rfb [data-rf="frame:kalp"]').click(); await wait(30); document.getElementById('cfy').click(); await wait(250);
    r.hata = r.toasts.includes('İade süresi doldu.');
    // iade edilecek bir şey kalmadı
    refund = {}; await aShop('f'); await wait(100); r.bosta = !document.getElementById('rfb');
    return r;
  });
  assert.ok(o.var && o.satir === 2, 'iade edilebilir bölümü iki satır göstermeli'); assert.match(o.metin, /Kalan süre: 1 sa 30 dk/); assert.match(o.metin, /\+105\.000 🪙/); assert.match(o.metin, /Kalan süre: 10 dk/);
  assert.match(o.onay, /iade edilsin mi\? 105\.000 🪙 bakiyene geri döner/);
  assert.deepStrictEqual(o.cagri1, [{ _id: 'theme:kod' }]); assert.ok(o.toasts.some(t => t === 'İade edildi: +105.000 🪙'), o.toasts.join('|'));
  assert.strictEqual(o.temaSonra, 'light', 'kullanımdaki tema iade edilince varsayılana dönmeli');
  assert.ok(o.hata, 'süre dolunca anlaşılır hata'); assert.ok(o.bosta, 'iade edilecek şey yoksa bölüm çıkmamalı');
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok market iadesi: 2 saatlik bölüm, onay, iade, kullanımdaki tema sıfırlanır, hata mesajları');
  await s.kapat();
})().catch(e => { console.error('HATA market iadesi:', e.message); process.exit(1); });
