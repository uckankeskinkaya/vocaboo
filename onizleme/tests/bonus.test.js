// Günün ilk oyun bonusu: ana ekran kartı (1., art arda, alındı) ve bonus kazanınca bildirim.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(async () => {
    const gun = d => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Istanbul' }).format(d);
    const bugun = gun(new Date()), dun = gun(new Date(Date.now() - 864e5)), onceki = gun(new Date(Date.now() - 3 * 864e5));
    const baz = { id: 'u1', username: 'ali', xp: 0, banned: false, total_points: 0, points_spent: 0, bonus_streak: 0 };
    const kart = p => { prof = Object.assign({}, baz, p); document.getElementById('home').hidden = false; rHome(); const k = document.getElementById('gbonus'); return k ? k.textContent.replace(/\s+/g, ' ') : null; };
    const r = {};
    r.ilk = kart({ last_bonus: null });
    r.arti = kart({ last_bonus: dun, bonus_streak: 3 });
    r.atlama = kart({ last_bonus: onceki, bonus_streak: 5 });
    r.alindi = kart({ last_bonus: bugun, bonus_streak: 2 });
    prof = null; rHome(); r.cikis = !document.getElementById('gbonus');
    // loadProf: bonus gelince bildirim
    let sonraki = Object.assign({}, baz, { last_bonus: null });
    sb = { auth: { getUser: async () => ({ data: { user: { id: 'u1' } } }) }, from: () => ({ select: () => ({ eq: () => ({ single: async () => ({ data: sonraki }) }) }) }), rpc: async () => ({ data: null, error: null }) };
    checkBadges = () => {}; fbadge = () => {};
    const bildirimler = []; toast = m => bildirimler.push(m);
    prof = Object.assign({}, baz, { last_bonus: null });
    sonraki = Object.assign({}, baz, { last_bonus: bugun, bonus_streak: 1 });
    await loadProf(); r.bonusBildirim = bildirimler.slice();
    bildirimler.length = 0; await loadProf(); r.ikinciYenileme = bildirimler.slice();
    return r;
  });
  assert.match(o.ilk, /1\. gün · \+1[.,]000/);
  assert.match(o.arti, /4\. gün · \+1[.,]600/);
  assert.match(o.atlama, /1\. gün · \+1[.,]000/);
  assert.match(o.alindi, /Bugünün bonusunu aldın/); assert.match(o.alindi, /2\. gün/);
  assert.ok(o.cikis, 'giriş yoksa kart görünmemeli');
  assert.strictEqual(o.bonusBildirim.length, 1); assert.match(o.bonusBildirim[0], /Bonus kazandın: \+1[.,]000/);
  assert.deepStrictEqual(o.ikinciYenileme, [], 'aynı gün ikinci yenilemede bildirim çıkmamalı');
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok bonus: günün ilk oyun bonusu kartı (1., art arda, atlama, alındı) ve bildirim');
  await s.kapat();
})().catch(e => { console.error('HATA bonus:', e.message); process.exit(1); });
