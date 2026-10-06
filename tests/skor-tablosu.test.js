// Skor tablosu: herkes sıralanır, çerçeve görünür, benim satırım vurgulanır, taşma yok.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  for (const renk of ['light', 'dark']) {
    const s = await sayfaAc({ renk });
    await s.sayfa.evaluate(async () => {
      const u = [['deneme2', 'elmas', 'p:fox', 485], ['fatih', 'altin', 'p:panda', 440], ['ceyda', 'sakura', 'p:cat', 300], ['cess', null, null, 90], ['ben', 'zumrut', 'p:fox', 80], ['can', null, 'p:panda', 80], ['sifir', null, null, 0]]
        .map(([username, frame, avatar, best_score], i) => ({ id: 'id' + i, username, frame, avatar, xp: 500 - i * 50, best_score, best_daily_streak: i % 3 }));
      sb = { from: t => { const q = { select: () => q, eq: () => q, or: () => q, limit: () => q, then: r => r({ data: t === 'profiles' ? u : [{ user_id: 'id3', best_score: 60 }], error: null }) }; return q; }, rpc: async () => ({ data: null, error: { message: 'x' } }) };
      prof = { id: 'id4', username: 'ben', avatar: 'p:fox', frame: 'zumrut', xp: 100, best_score: 80, cls: true };
      await aBoard('all');
    });
    const o = await s.sayfa.evaluate(() => ({
      satir: document.querySelectorAll('.lbr').length, ben: document.querySelector('.lbr.me .lbu b')?.textContent,
      cerceve: document.querySelectorAll('.lbr .fq').length, tasma: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      siralar: [...document.querySelectorAll('.lbr')].map(r => r.querySelector('.lbn').textContent.trim()).join(','),
      ozet: document.querySelector('.lbme')?.innerText.replace(/\s+/g, ' ')
    }));
    assert.strictEqual(o.satir, 7, 'tüm kullanıcılar listelenmeli');
    assert.strictEqual(o.ben, 'ben (sen)');
    assert.ok(o.cerceve >= 3, 'çerçeveler görünmeli');
    assert.strictEqual(o.tasma, false, 'yatay taşma var');
    assert.strictEqual(o.siralar, '🥇,🥈,🥉,4,5,5,7', 'aynı puan aynı sırayı almalı: ' + o.siralar);
    assert.strictEqual(o.ozet, 'Sıran 5 / 7');
    for (const sekme of ['week', 'last', 'fr']) { await s.sayfa.evaluate(t => aBoard(t), sekme); }
    assert.deepStrictEqual(s.hatalar, []);
    await s.kapat();
  }
  console.log('ok skor tablosu: 7 kullanıcı sıralı, çerçeveler görünür, açık/koyu tema');
})().catch(e => { console.error('HATA skor tablosu:', e.message); process.exit(1); });
