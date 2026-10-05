// Sahneli temalar: 12 tema seçilince sahne çizilir, tema değişince temizlenir, yeni çerçeveler tanımlı.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(() => {
    const r = { temalar: [], cerceve: ['ates', 'simsek', 'galaksi', 'cyberc', 'piksel', 'kurt'].every(k => FRM[k] && /class="(fq|rk) /.test(frameHtml('<img width="40">', k))) };
    for (const k of ['cyber', 'witcher', 'minecraft', 'galaksi', 'yagmur', 'kis', 'okyanus', 'synthwave', 'buyulu', 'petal', 'kod', 'ejder']) {
      setTheme(k);
      r.temalar.push([k, document.documentElement.dataset.theme === k, document.documentElement.dataset.scene === '1', k === 'minecraft' ? (document.querySelector('#sahne canvas.mc') && document.querySelector('#sahne canvas.mc').width > 0 ? 9 : 0) : document.getElementById('sahne').children.length, PREMT.includes(k)]);
    }
    r.doku = getComputedStyle(document.documentElement).getPropertyValue('--mc-stone').includes('data:image/png');
    setTheme('dark');
    thPrev('witcher', 150000, false);
    r.onizle = [document.documentElement.dataset.theme, !!document.getElementById('tpv'), localStorage.getItem('ka_theme'), document.getElementById('tpvy').textContent, document.querySelector('#tpv small').textContent];
    thPrevEnd();
    r.onizleKapat = [document.documentElement.dataset.theme, !!document.getElementById('tpv')];
    thPrev('kod', 100000, true); panel('<p>x</p>');
    r.onizleGezinti = [document.documentElement.dataset.theme, !!document.getElementById('tpv')];
    r.rutbe = ['cyberc', 'kurt', 'piksel'].every(k => frameHtml('<img width="84">', k).includes('class="rk rk-' + k)) && frameHtml('<img width="30">', 'kurt').includes(' sm"');
    setTheme('dark'); r.temiz = [document.documentElement.dataset.scene === undefined, document.getElementById('sahne').children.length];
    return r;
  });
  assert.strictEqual(o.temalar.length, 12);
  for (const t of o.temalar) { assert.ok(t[1] && t[2] && t[3] > 5 && t[4], 'sahne eksik: ' + t[0]); }
  assert.ok(o.cerceve);
  assert.deepStrictEqual(o.onizle.slice(0, 3), ['witcher', true, 'dark']); assert.strictEqual(o.onizle[3], 'Satın al'); assert.match(o.onizle[4], /^Önizleme · 🪙 150[.,]000$/);
  assert.deepStrictEqual(o.onizleKapat, ['dark', false]);
  assert.deepStrictEqual(o.onizleGezinti, ['dark', false]);
  assert.ok(o.rutbe, 'rütbe çerçeveleri çizilmedi'); assert.ok(o.doku, 'Minecraft dokuları üretilmedi'); assert.deepStrictEqual(o.temiz, [true, 0]);
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok sahne: 12 canlı tema çiziliyor, temizleniyor; 6 yeni çerçeve tanımlı, blok dünyası dokuları üretiliyor, Pazar tema önizlemesi ve rütbe çerçeveleri çalışıyor');
  await s.kapat();
})().catch(e => { console.error('HATA sahne:', e.message); process.exit(1); });
