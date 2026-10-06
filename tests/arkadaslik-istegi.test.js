// Profilden arkadaşlık: istek gönder, gönderildi durumu, gelen isteği kabul/reddet, arkadaşlıktan çıkar; kendi profilinde düğme yok.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(async () => {
    const wait = ms => new Promise(r => setTimeout(r, ms)), r = { cagri: [], toasts: [] };
    const h = document.getElementById('how'); if (h) h.hidden = true;
    prof = { id: 'p1', username: 'ben', avatar: null, xp: 1, cls: true };
    let rel = 'none', istekCevap = { ok: 'istek', n: 'veli' };
    const PV = () => ({ id: 'u-veli', rel, username: 'veli', avatar: 'p:fox', frame: null, xp: 300, words_solved: 10, words_failed: 1, first_try: 2, best_score: 100, best_streak: 4, best_daily_streak: 1, daily_streak: 0, daily_wins: 0, weekly_wins: 0, weekly_podiums: 0, joined: '2026-10-06T09:00:00Z', teacher: false, cls: true, me: false, on: false });
    sb = { rpc: async (n, a) => { r.cagri.push([n, a]);
        if (n === 'profile_view') return { data: a._u === 'ben' ? { ...PV(), username: 'ben', me: true, rel: 'none' } : PV(), error: null };
        if (n === 'friend_request') { if (istekCevap.ok) rel = istekCevap.ok === 'kabul' ? 'friend' : 'sent'; return { data: istekCevap, error: null }; }
        if (n === 'friend_respond') { rel = a._acc ? 'friend' : 'none'; return { data: 'ok', error: null }; }
        if (n === 'friend_remove') { rel = 'none'; return { data: null, error: null }; }
        return { data: null, error: null }; }, auth: {}, removeChannel() {} };
    const _t = toast; toast = m => { r.toasts.push(m); _t(m) };
    const yazi = () => document.getElementById('online').innerText.replace(/\s+/g, ' ');
    await aPView('veli'); r.once = !!document.getElementById('pvq');
    document.getElementById('pvq').click(); await wait(150);
    r.istek = r.cagri.find(x => x[0] === 'friend_request')[1]; r.gonderildi = /isteği gönderildi/.test(yazi()) && !document.getElementById('pvq');
    // zaten durumu
    rel = 'none'; istekCevap = { err: 'zaten' }; await aPView('veli'); document.getElementById('pvq').click(); await wait(100); r.zaten = r.toasts.includes('Zaten istek var veya arkadaşsınız.');
    // gelen istek -> kabul
    istekCevap = { ok: 'istek', n: 'veli' }; rel = 'incoming'; await aPView('veli'); r.gelen = !!document.getElementById('pva') && !!document.getElementById('pvr');
    document.getElementById('pva').click(); await wait(150); r.kabul = r.cagri.find(x => x[0] === 'friend_respond')[1]; r.arkadas = /Arkadaşsınız/.test(yazi());
    // çıkar
    document.getElementById('pvx').click(); await wait(30); document.getElementById('cfy').click(); await wait(150);
    r.cikar = r.cagri.find(x => x[0] === 'friend_remove')[1]; r.cikinca = !!document.getElementById('pvq');
    // kendi profili
    await aPView('ben'); r.kendi = !document.getElementById('pvq') && !document.getElementById('pvx');
    return r;
  });
  assert.ok(o.once, 'arkadaş değilse "Arkadaşlık isteği gönder" olmalı');
  assert.deepStrictEqual(o.istek, { _u: 'veli' }); assert.ok(o.gonderildi, 'gönderince "istek gönderildi" durumu görünmeli');
  assert.ok(o.zaten); assert.ok(o.gelen, 'gelen istekte Kabul/Reddet olmalı');
  assert.deepStrictEqual(o.kabul, { _id: 'u-veli', _acc: true }); assert.ok(o.arkadas);
  assert.deepStrictEqual(o.cikar, { _id: 'u-veli' }); assert.ok(o.cikinca); assert.ok(o.kendi, 'kendi profilinde arkadaşlık düğmesi olmamalı');
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok arkadaşlık isteği: gönder, bekliyor, kabul, çıkar, kendi profilinde yok');
  await s.kapat();
})().catch(e => { console.error('HATA arkadaşlık isteği:', e.message); process.exit(1); });
