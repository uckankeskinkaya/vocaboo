// Arkadaş listesinde "Son görülme" bilgisi: çevrimiçi / az önce / dakika / saat / gün, İngilizce karşılığı.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(async () => {
    const r = {};
    r.f = [0, 30, 100, 1800, 7200, 200000, 3000000].map(lastSeen);
    prof = { username: 'ben', avatar: null, frame: null, xp: 0 };
    const fr = (u, on, ls) => ({ id: u, u, im: null, fr: null, bs: 5, ws: 1, xp: 0, c: false, on, ls });
    sb = { rpc: async n => ({ data: n === 'friend_list' ? { code: 'ABCD2345', incoming: [], friends: [fr('ali', true, 3), fr('veli', false, 600), fr('ayse', false, null)] } : null }) };
    await aFriends('f');
    r.html = document.getElementById('panel') ? document.getElementById('panel').innerText : document.body.innerText;
    setLang && setLang('en'); await aFriends('f');
    r.en = document.body.innerText;
    return r;
  });
  assert.deepStrictEqual(o.f, ['az önce', 'az önce', '2 dk önce', '30 dk önce', '2 sa önce', '2 gün önce', '1 aydan uzun süre önce']);
  assert.match(o.html, /Çevrimiçi/); assert.match(o.html, /Son görülme: 10 dk önce/); assert.match(o.html, /Çevrimdışı/);
  assert.match(o.en, /Last seen: 10 min ago/);
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok son görülme: arkadaş listesinde çevrimiçi / az önce / dk / sa / gün, İngilizce çeviri');
  await s.kapat();
})().catch(e => { console.error('HATA son görülme:', e.message); process.exit(1); });
