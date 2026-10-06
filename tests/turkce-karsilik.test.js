// Türkçe karşılıklar: kelime defterinde, alıştırma açıklama dili ayarı, paket önbelleği.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(async () => {
    const r = {}, w = ms => new Promise(x => setTimeout(x, ms));
    const pack = []; for (let i = 0; i < 1100; i++) pack.push([i % 4, 'word' + i, 'def ' + i, 'karşılık' + i, 'ex ' + i]);
    pack[0] = [0, 'budget', 'a plan for money', 'para planı', 'We need a budget.'];
    prof = { username: 'ali', avatar: null, frame: null, xp: 0 };
    let indirme = 0;
    sb = { rpc: async n => { if (n === 'words_pack') { indirme++; return { data: pack } } return { data: null } } };
    r.indi = await pkIndir(true); r.sayi = Object.keys(TRD).length; r.trBudget = trOf('Budget');
    r.sakli = !!localStorage.getItem('ka_pack');
    r.ikinci = (await pkIndir(false)) && indirme === 1;      // taze pakette yeniden indirme yok
    // kelime defteri
    bookSet([{ w: 'budget', d: 'a plan for money', ex: 'We need a budget.', n: 1 }]); aBook();
    r.defter = document.getElementById('wvl').innerText;
    // alıştırma açıklama dili
    mode = 'practice'; SR = { def: 'a plan for money', tr: 'para planı', len: 6, lvl: 0, tries: 5, guesses: [] };
    try { localStorage.setItem('ka_trdef', 'en') } catch (e) {}
    SR = { def: 'a plan for money', tr: 'para planı', len: 6, lvl: 0, tries: 5, guesses: [] }; next(); r.en = document.getElementById('def').innerText;
    localStorage.setItem('ka_trdef', 'tr');
    SR = { def: 'a plan for money', tr: 'para planı', len: 6, lvl: 0, tries: 5, guesses: [] }; next(); r.tr = document.getElementById('def').innerText;
    localStorage.setItem('ka_trdef', 'both');
    SR = { def: 'a plan for money', tr: 'para planı', len: 6, lvl: 0, tries: 5, guesses: [] }; next(); r.both = document.getElementById('def').innerText;
    // ayar düğmesi
    aSettings(); r.ayar = document.getElementById('s7') && document.getElementById('s7').innerText;
    return r;
  });
  assert.ok(o.indi && o.sayi >= 1100 && o.sakli && o.ikinci);
  assert.strictEqual(o.trBudget, 'para planı');
  assert.match(o.defter, /para planı/);
  assert.match(o.en, /^A plan for money\./); assert.doesNotMatch(o.en, /para/);
  assert.match(o.tr, /^Para planı\./); assert.doesNotMatch(o.tr, /plan for/);
  assert.match(o.both, /A plan for money\./); assert.match(o.both, /Para planı/);
  assert.match(o.ayar, /Alıştırma açıklaması: İkisi birden/);
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok türkçe karşılık: paket indirme/saklama, kelime defterinde Türkçe, alıştırmada açıklama dili (İngilizce/Türkçe/ikisi)');
  await s.kapat();
})().catch(e => { console.error('HATA türkçe karşılık:', e.message); process.exit(1); });
