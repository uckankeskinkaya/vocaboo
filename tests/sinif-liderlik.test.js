// Liderlik tablosu sadece sınıftan (sınıf üyesi ya da öğretmen) kişileri gösterir: sunucu sorgularında filtre var,
// Arkadaşlar sekmesinde sınıf dışından arkadaşlar listelenmez, sınıfta olmayan kullanıcı kendini tabloda görmez.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(async () => {
    const wait = ms => new Promise(r => setTimeout(r, ms)), r = { filtre: [] };
    const h = document.getElementById('how'); if (h) h.hidden = true;
    sb = { from: t => { const q = { select: () => q, eq: () => q, limit: () => q, or: f => { r.filtre.push(t + ':' + f); return q; }, then: f => f({ data: t === 'profiles' ? [{ id: 'a', username: 'ali', avatar: null, frame: null, xp: 10, best_score: 50, best_daily_streak: 1 }] : [], error: null }) }; return q; },
      rpc: async n => n === 'friend_list' ? { data: { code: 'ABCD1234', incoming: [], outgoing: [], friends: [{ id: 'f1', u: 'sinifli', im: null, fr: null, xp: 5, bs: 30, c: true }, { id: 'f2', u: 'disarida', im: null, fr: null, xp: 5, bs: 99, c: false }] }, error: null } : { data: null, error: null }, auth: {}, removeChannel() {} };
    prof = { id: 'p1', username: 'ben', avatar: null, frame: null, xp: 1, best_score: 10, cls: true };
    await aBoard('all'); await aBoard('week'); await aBoard('last');
    await aBoard('fr'); await wait(50);
    r.arkadaslar = [...document.querySelectorAll('#online .lbu b')].map(e => e.textContent);
    prof = { id: 'p2', username: 'disari', avatar: null, frame: null, xp: 1, best_score: 10, cls: false };
    await aBoard('fr'); await wait(50);
    r.disaridaki = [...document.querySelectorAll('#online .lbu b')].map(e => e.textContent);
    return r;
  });
  assert.strictEqual(o.filtre.length, 3, 'tüm zamanlar, haftalık ve geçen hafta sorgularında filtre olmalı: ' + o.filtre);
  assert.ok(o.filtre.every(f => f === 'profiles:cls.eq.true,teacher.eq.true'), o.filtre.join('|'));
  assert.ok(o.arkadaslar.includes('sinifli') && o.arkadaslar.includes('ben (sen)') && !o.arkadaslar.includes('disarida'), 'sınıf dışı arkadaş görünmemeli: ' + o.arkadaslar);
  assert.ok(o.disaridaki.includes('sinifli') && !o.disaridaki.includes('disari') && !o.disaridaki.includes('disarida'), 'sınıf dışı kullanıcı kendini tabloda görmemeli: ' + o.disaridaki);
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok sınıf liderliği: tüm sekmelerde sadece sınıf, sınıf dışı arkadaş ve kullanıcı görünmez');
  await s.kapat();
})().catch(e => { console.error('HATA sınıf liderliği:', e.message); process.exit(1); });
