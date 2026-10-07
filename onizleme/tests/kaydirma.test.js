// Dikey telefon ekranında ana ekran kartları sıkışıp kırpılmamalı; içerik taşarsa SAYFA kaydırılabilmeli (iç içe kaydırma kutusu yok,
// iPhone Safari dikeyde onu kaydırmıyordu) ve son kart alt menünün altında kalmamalı. Oyun ekranında sayfa sabit.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  for (const [ad, vp] of [['dikey 375x667', { width: 375, height: 667 }], ['küçük dikey 360x560', { width: 360, height: 560 }]]) {
    const s = await sayfaAc({ viewport: vp, bekle: 500 });
    const o = await s.sayfa.evaluate(async () => {
      prof = { id: '1', username: 'ali', xp: 100, words_solved: 5, words_failed: 1, cls: true, teacher: true, admin: true, best_score: 3 };
      loadProf = async () => {}; sb = { rpc: async () => ({ data: null }) };
      document.getElementById('online').hidden = true; document.getElementById('home').hidden = false; rHome();
      await new Promise(r => setTimeout(r, 300));
      const h = document.getElementById('home'), nav = document.getElementById('nav');
      const cocuklar = [...h.children].filter(e => e.offsetHeight > 0);
      const sikisan = cocuklar.filter(e => e.scrollHeight - e.clientHeight > 2 && getComputedStyle(e).overflow !== 'visible').map(e => e.id || e.className);
      const icKutu = getComputedStyle(h).overflowY;
      const se = document.scrollingElement, tasar = se.scrollHeight > innerHeight + 2;
      scrollTo(0, se.scrollHeight); await new Promise(r => setTimeout(r, 100));
      const kaydi = !tasar || scrollY > 0;
      const son = cocuklar[cocuklar.length - 1].getBoundingClientRect();
      const sonuc = { sikisan, sonAlt: Math.round(son.bottom), navUst: Math.round(nav.getBoundingClientRect().top), icKutu, kaydi };
      // oyun ekranı: sayfa sabit, başa dönülmüş
      document.getElementById('home').hidden = true; document.getElementById('game').hidden = false; await new Promise(r => setTimeout(r, 50));
      sonuc.oyun = [document.documentElement.classList.contains('oyunda'), getComputedStyle(document.body).overflowY, scrollY];
      document.getElementById('game').hidden = true; document.getElementById('home').hidden = false; await new Promise(r => setTimeout(r, 50));
      sonuc.oyunSonra = document.documentElement.classList.contains('oyunda');
      return sonuc;
    });
    assert.deepStrictEqual(o.sikisan, [], ad + ': sıkışan kartlar: ' + o.sikisan.join(','));
    assert.ok(o.sonAlt <= o.navUst + 1, ad + ': son kart alt menünün altında kaldı (' + o.sonAlt + ' > ' + o.navUst + ')');
    assert.strictEqual(o.icKutu, 'visible', ad + ': ana ekran iç içe kaydırma kutusu olmamalı');
    assert.ok(o.kaydi, ad + ': sayfa aşağı kaymalı');
    assert.deepStrictEqual(o.oyun, [true, 'hidden', 0], ad + ': oyun ekranında sayfa sabit olmalı');
    assert.strictEqual(o.oyunSonra, false);
    assert.deepStrictEqual(s.hatalar, []);
    await s.kapat();
  }
  console.log('ok kaydırma: dikey ekranda kartlar sıkışmıyor, son kart alt menünün altında kalmıyor');
})().catch(e => { console.error('HATA kaydirma:', e.message); process.exit(1); });
