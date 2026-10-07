// Oda bağlantısı: ?oda=ABCD ile doğrudan katılma (giriş sonrası), lobide davet düğmesi, Pazar'da "alabilirsin" işareti.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  // 1) Bağlantıdan açılış: giriş yoksa bekler, giriş olunca katılır, adres temizlenir
  const s = await sayfaAc({ yol: '/?oda=ab12' });
  const o = await s.sayfa.evaluate(async () => {
    const wait = ms => new Promise(r => setTimeout(r, ms)), r = {};
    r.adres = location.search; prof = null; rHome(); r.bilgilendirme = [...document.querySelectorAll('.toast')].map(t => t.textContent);
    let katilan = null; oJoin = (k, h) => { katilan = [k, h] };
    sb = { rpc: async () => ({ data: null, error: null }) }; window.supabase = { createClient: () => sb }; loadProf = async () => {};
    prof = { id: 'a', username: 'ali', xp: 5, banned: false, total_points: 2000, points_spent: 0 }; rHome(); await wait(50);
    r.katilan = katilan; r.panelAcik = !document.getElementById('online').hidden;
    katilan = null; rHome(); r.ikinci = katilan;
    // 2) Lobi düğmesi ve bağlantı biçimi
    room = 'ZX9Q'; cfg = { max: 6, m: 'c', n: 10, dur: 0, l: -1, mod: 0 }; ch = { presenceState: () => ({}), track() {}, send() {} }; isHost = true; started = false;
    oLobby([]); r.dugme = !!document.getElementById('osh'); r.url = odaDavetUrl('ZX9Q');
    let kopya = null; Object.defineProperty(navigator, 'share', { value: undefined, configurable: true });
    navigator.clipboard.writeText = async t => { kopya = t }; document.getElementById('osh').click(); await wait(50); r.kopya = kopya;
    // 3) Pazar: alabilirsin işareti
    sb.rpc = async n => n === 'shop_list' ? { data: { bal: 100000, owned: [], items: [{ id: 'theme:kod', price: 100000, owned: false }, { id: 'theme:cyber', price: 150000, owned: false }] }, error: null } : { data: null };
    aShop('t'); await wait(80);
    const m = document.getElementById('online').innerText; r.alabilir = /100[.,]000 ✓/.test(m); r.alamaz = !/150[.,]000 ✓/.test(m); r.aciklama = /Alabilirsin/.test(m);
    return r;
  });
  assert.strictEqual(o.adres, '', 'adresteki ?oda temizlenmeli'); assert.ok(o.bilgilendirme.some(t => /giriş yap/.test(t)), 'giriş yoksa uyarı');
  assert.deepStrictEqual(o.katilan, ['AB12', false]); assert.ok(o.panelAcik); assert.strictEqual(o.ikinci, null, 'ikinci kez katılmamalı');
  assert.ok(o.dugme); assert.match(o.url, /\?oda=ZX9Q$/); assert.match(o.kopya, /\?oda=ZX9Q$/);
  assert.ok(o.alabilir && o.alamaz && o.aciklama, 'Pazar alabilirsin işareti');
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok oda bağlantısı: ?oda ile katılma, lobi davet düğmesi, Pazar alabilirsin işareti');
  await s.kapat();
})().catch(e => { console.error('HATA oda bağlantısı:', e.message); process.exit(1); });
