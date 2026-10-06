// Hoca paneli: sınıf seviyesi görünürlüğü, panel ekranları, kelime ekleme/toplu ekleme, yönetici hoca yetkisi düğmesi.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(async () => {
    const r = {}, w = ms => new Promise(x => setTimeout(x, ms)), c = [];
    const cevap = { teacher_class: [{ id: 's1', u: 'ayse', xp: 500, ws: 8, wf: 2, ds: 2, w7: 6, d7: 3, ls: 100 }], teacher_hard: [{ w: 'budget', d: 'a plan', tr: 'bütçe', n: 4, ok: 1 }], teacher_words: [{ id: 7, w: 'harvest', d: 'to gather crops', tr: 'hasat', x: null }], teacher_student: { days: Array.from({ length: 14 }, (_, i) => ({ d: '2026-10-' + (i + 1), s: i % 3 })) } };
    sb = { rpc: async (n, a) => { c.push([n, a]); if (n === 'teacher_word_save') return { data: /^bad/.test(a._w) ? 'kelime' : 'ok' }; return { data: cevap[n] !== undefined ? cevap[n] : (n === 'admin_teacher' ? 'ok' : null) } } };
    prof = { username: 'x', cls: false }; rHome(); r.dis = document.querySelectorAll('#lvls .lvl').length === 4;
    prof = { username: 'x', cls: true }; rHome(); r.sinif = document.querySelectorAll('#lvls .lvl').length === 5 && LBL.length === 5;
    prof = { id: 'h', username: 'hoca', teacher: true, cls: false, xp: 10, words_solved: 1, words_failed: 0 }; rHome(); aProfile(); await w(40);
    r.giris = !!document.getElementById('hcb');
    document.getElementById('hcb').click(); await w(30);
    document.getElementById('t1').click(); await w(60);
    r.ozet = document.body.innerText.includes('ayse') && document.body.innerText.includes('Bu hafta 6 kelime');
    document.querySelector('[data-s]').click(); await w(60);
    r.ogrenci = document.body.innerText.includes('Son 14 gün');
    aTeacher(); document.getElementById('t2').click(); await w(60);
    r.zor = document.body.innerText.includes('budget') && document.body.innerText.includes('3/4');
    aTeacher(); document.getElementById('t3').click(); await w(60);
    r.liste = document.body.innerText.includes('harvest');
    document.getElementById('tn').click(); document.getElementById('tw').value = 'bad1'; document.getElementById('td').value = 'xx'; document.getElementById('ts').click(); await w(60);
    r.hata = document.getElementById('te').textContent.includes('3-14');
    aTBulk(); document.getElementById('tb').value = 'budget | a plan for money | bütçe\nbad1 | x\nharvest | to gather crops'; document.getElementById('ts').click(); await w(150);
    r.toplu = document.getElementById('te').innerText.includes('2 kelime eklendi') && document.getElementById('te').innerText.includes('2. satır');
    prof = { id: 'a', username: 'root', admin: true }; AU = { u1: { id: 'u1', u: 'veli', c: true, b: false, t: false, bs: 0, xp: 0 } };
    aAdUser('u1', ''); await w(30);
    r.hocaBtn = document.getElementById('u8') && document.getElementById('u8').innerText === 'Hoca yap';
    return r;
  });
  for (const [k, v] of Object.entries(o)) assert.ok(v, k + ' başarısız');
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok hoca paneli: sınıf seviyesi, özet, öğrenci, zor kelimeler, kelime ekleme/toplu ekleme, yönetici yetki düğmesi');
  await s.kapat();
})().catch(e => { console.error('HATA hoca:', e.message); process.exit(1); });
