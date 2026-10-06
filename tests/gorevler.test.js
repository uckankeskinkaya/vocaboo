// Günlük görevler ve başarılar: ana ekran kartı, görev/başarı listesi, ödül alma, TR/EN.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(async () => {
    const r = {}, cagri = [];
    prof = { username: 'ali', avatar: null, frame: null, xp: 0, best_score: 0, total_points: 0, points_spent: 0 };
    let alindi = false;
    sb = { rpc: async (n, a) => { cagri.push(n + ':' + (a && (a._k || '')));
      if (n === 'quest_list') return { data: { q: [{ k: 's5', cur: 5, goal: 5, rew: 400, claimed: alindi }, { k: 'f1', cur: 0, goal: 1, rew: 500, claimed: false }, { k: 'n8', cur: 2, goal: 8, rew: 800, claimed: false }], bonus: 500, bonus_claimed: false, all_done: false } };
      if (n === 'quest_claim') { alindi = true; return { data: { ok: true, rew: 400 } } }
      if (n === 'ach_list') return { data: [{ k: 'w10', m: 'solved', cur: 10, goal: 10, rew: 500, claimed: false }, { k: 'w50', m: 'solved', cur: 12, goal: 50, rew: 1000, claimed: false }, { k: 'fr1', m: 'friends', cur: 1, goal: 1, rew: 500, claimed: true }] };
      if (n === 'ach_claim') return { data: { ok: true, rew: 500 } };
      return { data: null } } };
    loadProf = async () => {};
    document.getElementById('home').hidden = false; rHome(); await new Promise(x => setTimeout(x, 200));
    r.kart = document.getElementById('mQuest') && document.getElementById('mQuest').innerText; r.rozet = document.getElementById('qD') && !document.getElementById('qD').hidden;
    await aQuests('g'); r.g = document.body.innerText;
    document.querySelector('[data-q="s5"]').click(); await new Promise(x => setTimeout(x, 200)); r.sonra = document.body.innerText;
    await aQuests('b'); r.b = document.body.innerText;
    aProfile(); r.profil = !!document.getElementById('qgb') && !!document.getElementById('qab');
    r.cagri = cagri;
    return r;
  });
  assert.match(o.kart, /Günlük görevler/); assert.match(o.kart, /1\/3/); assert.ok(o.rozet, 'alınabilir ödül işareti yok');
  assert.match(o.g, /5 kelime çöz/); assert.match(o.g, /1 kelimeyi ilk denemede bil/); assert.match(o.g, /Ödülü al/); assert.match(o.g, /Üç görevi de bitirince/);
  assert.match(o.sonra, /Alındı/);
  assert.match(o.b, /Isınma/); assert.match(o.b, /İlk arkadaş/); assert.ok(o.profil);
  assert.ok(o.cagri.includes('quest_claim:s5'));
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok görevler: ana ekran kartı, günlük görevler, başarılar, ödül alma');
  await s.kapat();
})().catch(e => { console.error('HATA görevler:', e.message); process.exit(1); });
