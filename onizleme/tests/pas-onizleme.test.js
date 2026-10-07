// 1v1 Puan yarışında sınırsız pas (m_pass, 0 puan, cevap gösterilir), B2 sadece alıştırmada (oda kurarken seçilemez),
// Pazar tema önizlemesi: küçük telefon ekranında ana menü ve oyun içi (bloklar + klavye).
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(async () => {
    const wait = ms => new Promise(r => setTimeout(r, ms)), r = { rpc: [] };
    const h = document.getElementById('how'); if (h) h.hidden = true;
    loadProf = async () => {};
    prof = { id: 'u1', username: 'ali', xp: 5, avatar: null, frame: null, owned: [] }; myName = 'ali';
    sb = { rpc: async (n, a) => { r.rpc.push(n);
        if (n === 'm_join') return { data: { ok: true }, error: null };
        if (n === 'm_next') return { data: { def: 'a thing you sit on', len: 5, tries: 5, lvl: 0, idx: 0, guesses: [] }, error: null };
        if (n === 'm_pass') return { data: { s: '', done: true, win: false, pass: true, pts: 0, ans: 'chair', def: 'a thing you sit on', ex: '', score: 0, solved: 0, alive: true, fin: false, idx: 1 }, error: null };
        if (n === 'm_results') return { data: { done: false, left: 2, mode: 'c', players: [] }, error: null };
        if (n === 'shop_list') return { data: { bal: 10, owned: [], items: [{ id: 'theme:dark', price: 100, owned: false }, { id: 'theme:lofi', price: 100, owned: false }] }, error: null };
        return { data: null, error: null }; },
      from: () => { const q = { select: () => q, limit: () => q, in: () => q, eq: () => q, then: f => f({ data: [], error: null }) }; return q; },
      removeChannel() {}, auth: {} };
    // B2 oda kurarken yok, alıştırmada var
    oSetup(); r.odaSeviye = [...document.querySelectorAll('[data-g="lv"] button')].map(b => b.textContent);
    oExit(); rHome(); document.getElementById('mPractice').click();
    r.alistirmaB2 = getComputedStyle(document.querySelector('#lvls .lvl[data-i="2"]')).display !== 'none';
    document.getElementById('menu').hidden = true;
    // 1v1 pas
    const pres = {};
    ch = { presenceState: () => { pres[myId] = [mine()]; return pres; }, track() {}, send() {}, unsubscribe() {} };
    room = 'ABCD'; isHost = true; started = false;
    oBegin({ c: { max: 2, m: 'c', n: 15, dur: 0, l: -1, mod: 0 }, seed: 1 });
    await wait(4300);
    const pb = document.getElementById('passbtn');
    r.pasGorunur = !pb.hidden; r.pasYazi = pb.textContent;
    pb.click(); await wait(200);
    r.sonuc = document.getElementById('res').innerText.replace(/\s+/g, ' ');
    r.pasSonra = pb.hidden; r.mpass = r.rpc.filter(x => x === 'm_pass').length;
    // grup maçında pas yok
    oExit(); cfg = { max: 6, m: 'c', n: 15, dur: 0, l: -1, mod: 0 }; mode = 'online'; started = true; over = false; ch = { presenceState: () => ({}), track() {} };
    word = '?????'; guesses = []; draw(); r.grupPas = !document.getElementById('passbtn').hidden; started = false; ch = null; mode = 'practice';
    // Tema önizleme
    oExit(); await aShop('t'); await wait(50);
    document.querySelector('[data-i="theme:dark"]').click(); await wait(100);
    const tv = document.getElementById('tvw');
    r.onizleme = { var: !!tv, menu: !!tv.querySelector('.feat') && tv.querySelectorAll('.grid .cd').length === 4, tema: document.documentElement.dataset.theme };
    tv.querySelector('.tvt button[data-s="o"]').click();
    r.onizleme.oyun = [tv.querySelectorAll('.tile.g').length, tv.querySelectorAll('.tile.r').length, tv.querySelectorAll('.k').length];
    const f = tv.querySelector('.tvf').getBoundingClientRect(); r.onizleme.sigiyor = f.width > 100 && f.right <= innerWidth && f.bottom <= innerHeight;
    document.getElementById('tpvx').click(); r.onizleme.kapandi = !document.getElementById('tvw') && document.documentElement.dataset.tvw === undefined;
    return r;
  });
  assert.ok(!o.odaSeviye.includes('B2') && !o.odaSeviye.includes('B2+') && o.odaSeviye.includes('B1+'), 'oda kurarken B2 olmamalı: ' + o.odaSeviye);
  assert.ok(o.alistirmaB2, 'alıştırmada B2 görünmeli');
  assert.ok(o.pasGorunur && /∞/.test(o.pasYazi), '1v1 pas düğmesi ∞ ile görünmeli: ' + o.pasYazi);
  assert.strictEqual(o.mpass, 1); assert.match(o.sonuc, /Pas geçtin\. Cevap: CHAIR/); assert.ok(o.pasSonra, 'kelime bitince pas gizlenmeli');
  assert.strictEqual(o.grupPas, false, 'grup maçında pas olmamalı');
  assert.deepStrictEqual(o.onizleme, { var: true, menu: true, tema: 'dark', oyun: [11, 4, 28], sigiyor: true, kapandi: true });
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok pas + önizleme: 1v1 sınırsız pas, B2 sadece alıştırmada, Pazar tema önizlemesi (menü + oyun içi)');
  await s.kapat();
})().catch(e => { console.error('HATA pas + önizleme:', e.message); process.exit(1); });
