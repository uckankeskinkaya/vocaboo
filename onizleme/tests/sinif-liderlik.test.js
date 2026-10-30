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
    // sınıf dışı: tablo kapalı, sorgu yapılmaz
    prof = { id: 'p2', username: 'disari', avatar: null, frame: null, xp: 1, best_score: 10, cls: false };
    r.filtreOnce = r.filtre.length; await aBoard('all'); await wait(50);
    r.kapali = { yazi: document.getElementById('online').innerText.replace(/\s+/g, ' '), satir: document.querySelectorAll('#online .lbr').length, sorgu: r.filtre.length - r.filtreOnce };
    // yönetici sınıfta olmasa da görür
    prof = { id: 'p3', username: 'yonetici', avatar: null, frame: null, xp: 1, best_score: 10, cls: false, admin: true };
    await aBoard('all'); await wait(50); r.yoneticiGorur = document.querySelectorAll('#online .lbr').length > 0;
    return r;
  });
  assert.strictEqual(o.filtreOnce, 3, 'tüm zamanlar, haftalık ve geçen hafta sorgularında filtre olmalı: ' + o.filtre);
  assert.ok(o.filtre.every(f => f === 'profiles:cls.eq.true,teacher.eq.true'), o.filtre.join('|'));
  assert.ok(o.arkadaslar.includes('sinifli') && o.arkadaslar.includes('ben (sen)') && !o.arkadaslar.includes('disarida'), 'sınıf dışı arkadaş görünmemeli: ' + o.arkadaslar);
  assert.match(o.kapali.yazi, /Skor tablosu sadece sınıf içindir/); assert.strictEqual(o.kapali.satir, 0, 'sınıf dışı kullanıcı tabloyu görmemeli'); assert.strictEqual(o.kapali.sorgu, 0, 'sınıf dışı için sorgu yapılmamalı');
  assert.ok(o.yoneticiGorur, 'yönetici tabloyu görmeli');
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok sınıf liderliği: tüm sekmelerde sadece sınıf, sınıf dışı kullanıcıya tablo kapalı');
  await s.kapat();
})().catch(e => { console.error('HATA sınıf liderliği:', e.message); process.exit(1); });
