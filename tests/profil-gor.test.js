// Başkasının profili: Arkadaşlar/Sınıf listesinde ve Skor tablosunda satıra dokununca açılır, geri düğmesi listeye döner,
// satırdaki 1v1 düğmesi profili açmaz. Yönetici şüpheli raporu puanlı gösterilir.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(async () => {
    const wait = ms => new Promise(r => setTimeout(r, ms)), r = { cagri: [] };
    const h = document.getElementById('how'); if (h) h.hidden = true;
    prof = { id: 'a1', username: 'ben', admin: true, xp: 10, avatar: null };
    const PV = { username: 'veli', avatar: 'p:fox', frame: null, xp: 3122, words_solved: 86, words_failed: 4, first_try: 43, best_score: 2905, best_streak: 50, best_daily_streak: 3, daily_streak: 2, daily_wins: 5, weekly_wins: 1, weekly_podiums: 0, joined: '2026-10-06T09:54:36Z', teacher: false, cls: true, me: false, on: true };
    sb = { rpc: async (n, a) => { r.cagri.push([n, a]);
        if (n === 'friend_list') return { data: { code: 'ABCD1234', incoming: [], outgoing: [], friends: [{ id: 'x1', u: 'veli', im: 'p:fox', fr: null, on: true, ls: 0, xp: 3122, bs: 2905, c: true }, { id: 'x2', u: 'ayse', im: 'p:cat', fr: null, on: false, ls: 7200, xp: 10, bs: 5, c: true }] }, error: null };
        if (n === 'profile_view') return { data: a._u === 'yok' ? null : PV, error: null };
        if (n === 'admin_suspects') return { data: [{ id: 'z', u: 'lenin', sc: 75, lvl: 'yuksek', reasons: ['İlk denemede çözme oranı %85 (86 kelime)', 'Kelime başına ortalama 1.24 tahmin'], ws: 86, wf: 4, ft: 85, ort: 1.24, sec: 27, n: 100 }, { id: 'y', u: 'ayse', sc: 40, lvl: 'orta', reasons: ['x'], ws: 15, wf: 0, ft: 80, ort: 1.2, sec: 40, n: 20 }], error: null };
        if (n === 'invite_send') return { data: { err: 'aktif degil' }, error: null };
        if (n === 'admin_users') return { data: [], error: null };
        return { data: null, error: null }; },
      from: () => { const q = { select: () => q, limit: () => q, eq: () => q, in: () => q, then: f => f({ data: [{ username: 'veli', avatar: 'p:fox', frame: null, xp: 3122, best_score: 2905, best_daily_streak: 3 }], error: null }) }; return q; },
      auth: {}, removeChannel() {} };
    // Arkadaş listesi -> profil -> geri
    await aFriends('f'); await wait(100);
    const satir = document.querySelector('#online [data-pu="veli"]'); r.satirVar = !!satir;
    r.aktif = [!!satir.querySelector('.act'), !!document.querySelector('#online [data-pu="ayse"] .act')]; r.aktifSag = satir.querySelector('.act').getBoundingClientRect().left > satir.getBoundingClientRect().left + satir.getBoundingClientRect().width / 2;
    const bt = satir.querySelector('button'); r.birV1 = !!bt;
    if (bt) { bt.click(); await wait(50); r.v1ProfilAcmadi = !r.cagri.some(x => x[0] === 'profile_view'); }
    satir.click(); await wait(100);
    const t = document.getElementById('online').innerText.replace(/\s+/g, ' ');
    r.profil = { ad: /veli/.test(t), seviye: /Seviye \d+/.test(t), dogruluk: /96%/.test(t), rozet: /Rozetler/.test(t), katilim: /Katılım/.test(t), cevrimici: /Çevrimiçi/.test(t) && !!document.querySelector('#online .chip.onl') };
    r.cagriProfil = r.cagri.find(x => x[0] === 'profile_view')[1];
    document.getElementById('ob').click(); await wait(100);
    r.geriListe = !!document.querySelector('#online [data-pu="veli"]');
    // Skor tablosu -> profil
    await aBoard('all'); await wait(100);
    const lb = document.querySelector('#online .lbr[data-pu="veli"]'); r.lbVar = !!lb; lb.click(); await wait(100);
    r.lbProfil = /Doğruluk/.test(document.getElementById('online').innerText);
    document.getElementById('ob').click(); await wait(100); r.geriTablo = !!document.querySelector('#online .lbr');
    // Olmayan profil
    aPView('yok'); await wait(80); r.olmayan = document.getElementById('online').innerText.includes('Profil bulunamadı.');
    // Şüpheli raporu
    aAdmin(); document.getElementById('ad4').click(); await wait(100);
    const kartlar = [...document.querySelectorAll('#online [data-su]')].map(b => b.innerText.replace(/\s+/g, ' '));
    r.supheli = kartlar;
    document.querySelector('[data-su="lenin"]').click(); await wait(80);
    r.suphAra = r.cagri.filter(x => x[0] === 'admin_users').map(x => x[1]);
    return r;
  });
  assert.ok(o.satirVar && o.birV1, 'liste satırı ve 1v1 düğmesi olmalı'); assert.ok(o.v1ProfilAcmadi, '1v1 düğmesi profili açmamalı');
  assert.deepStrictEqual(o.cagriProfil, { _u: 'veli' }); assert.deepStrictEqual(o.profil, { ad: true, seviye: true, dogruluk: true, rozet: true, katilim: true, cevrimici: true });
  assert.deepStrictEqual(o.aktif, [true, false], 'sadece çevrimiçi olanda yeşil işaret olmalı'); assert.ok(o.aktifSag, 'işaret satırın sağ tarafında olmalı');
  assert.ok(o.geriListe, 'geri düğmesi arkadaş listesine dönmeli');
  assert.ok(o.lbVar && o.lbProfil && o.geriTablo, 'skor tablosundan profil ve geri');
  assert.ok(o.olmayan);
  assert.strictEqual(o.supheli.length, 2); assert.match(o.supheli[0], /lenin.*Yüksek · 75.*%85/); assert.match(o.supheli[1], /ayse.*Orta · 40/);
  assert.deepStrictEqual(o.suphAra, [{ _q: 'lenin' }]);
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok profil görme: liste ve skor tablosundan profil, geri, 1v1 düğmesi ayrı, puanlı şüpheli raporu');
  await s.kapat();
})().catch(e => { console.error('HATA profil görme:', e.message); process.exit(1); });
