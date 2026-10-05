// Alıştırma modu: sunucu hatasında yerel alıştırmaya düşer (kilitlenmez), sonra sunucu modu geri gelir; hata yokken sunucudan kelime alır.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(async () => {
    const wait = ms => new Promise(r => setTimeout(r, ms)), r = { toasts: [] };
    loadProf = async () => {}; prof = { id: 'u1', username: 'ali', xp: 5, banned: false, total_points: 0, points_spent: 0, avatar: null };
    let cagri = 0, mod = 'hata';
    sb = { rpc: async (n) => { cagri++; return n === 'p_next' ? (mod === 'ok' ? { data: { def: 'a test word', len: 6, tries: 5, lvl: 0, guesses: [] }, error: null } : { data: null, error: { message: 'Failed to fetch' } }) : { data: null, error: null } }, from: () => ({ select: () => ({}) }), auth: { getUser: async () => ({ data: { user: { id: 'u1' } } }) } };
    const _t = toast; toast = m => { r.toasts.push(m); _t(m) };
    const git = () => { document.getElementById('home').hidden = false; document.getElementById('mPractice').click(); };
    // 1) sunucu hatası: iki deneme sonra yerel alıştırma açılır
    git(); document.querySelector('#lvls .lvl').click(); await wait(1700);
    r.hataCagri = cagri; r.oyunAcik = !document.getElementById('game').hidden; r.modHata = mode; r.kelimeVar = typeof word === 'string' && word.length >= 3; r.psvDustu = PSV;
    // 2) oyundan çıkınca sunucu modu geri gelir
    document.getElementById('game').hidden = true; await wait(50); r.psvGeri = PSV;
    // 3) sunucu düzelince kelime sunucudan gelir
    mod = 'ok'; cagri = 0; git(); document.querySelector('#lvls .lvl').click(); await wait(400);
    r.okCagri = cagri; r.uzunluk = word.length; r.sunucuKelimesi = /\?+/.test('?'.repeat(6)) && def === 'a test word';
    return r;
  });
  assert.ok(o.hataCagri >= 2, 'yeniden denenmeli: ' + o.hataCagri); assert.ok(o.oyunAcik && o.kelimeVar, 'yerel alıştırma açılmalı');
  assert.ok(o.toasts.some(t => /Bağlantı sorunu, yerel alıştırma açıldı \(Failed to fetch\)/.test(t)), 'hata sebebi gösterilmeli: ' + o.toasts.join('|'));
  assert.strictEqual(o.psvDustu, false); assert.strictEqual(o.psvGeri, true, 'sunucu modu geri gelmeli');
  assert.strictEqual(o.okCagri, 1); assert.strictEqual(o.uzunluk, 6); assert.ok(o.sunucuKelimesi);
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok alıştırma: sunucu hatasında yeniden dener, yerel alıştırmaya düşer, sonra sunucu moduna döner');
  await s.kapat();
})().catch(e => { console.error('HATA alıştırma:', e.message); process.exit(1); });
