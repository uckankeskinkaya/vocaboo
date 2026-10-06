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
    // alıştırma: cümle İngilizce açılır, TR düğmesi o cümleyi çevirir
    mode = 'practice'; SR = { def: 'a plan for money', tr: 'para planı', len: 6, lvl: 0, tries: 5, guesses: [] };
    next(); r.en = document.getElementById('def').innerText;
    const bt = document.getElementById('trbtn'); r.btnGorunur = !bt.hidden;
    bt.click(); r.tr = document.getElementById('def').innerText;
    bt.click(); r.geri = document.getElementById('def').innerText;
    SR = { def: 'a plan for money', tr: 'para planı', len: 6, lvl: 0, tries: 5, guesses: [] }; next(); r.yeniEn = document.getElementById('def').innerText;
    mode = 'daily'; next(); r.gizli = document.getElementById('trbtn').hidden;
    return r;
  });
  assert.ok(o.indi && o.sayi >= 1100 && o.sakli && o.ikinci);
  assert.strictEqual(o.trBudget, 'para planı');
  assert.match(o.defter, /para planı/);
  assert.match(o.en, /^A plan for money\./); assert.doesNotMatch(o.en, /para/); assert.ok(o.btnGorunur && o.gizli);
  assert.match(o.tr, /^Para planı\./); assert.doesNotMatch(o.tr, /plan for/);
  assert.match(o.geri, /^A plan for money\./); assert.match(o.yeniEn, /^A plan for money\./);
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok türkçe karşılık: paket indirme/saklama, kelime defterinde Türkçe, alıştırmada açıklama dili (cümle başına TR düğmesi)');
  await s.kapat();
})().catch(e => { console.error('HATA türkçe karşılık:', e.message); process.exit(1); });
