// Ödev listesi: öğretmen ödev verir/siler, öğrenci listeyi görür ve ödevi sunucu akışıyla (h_next) çözer, bitince listeye döner.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(async () => {
    const r = {}, w = ms => new Promise(x => setTimeout(x, ms)), c = [];
    let kalan = 1;
    const ver = {
      teacher_words: [{ id: 7, w: 'harvest', d: 'to gather crops', tr: 'ürün toplamak', x: null }, { id: 8, w: 'budget', d: 'a plan for money', tr: null, x: null }],
      teacher_assign_list: [{ id: 3, title: 'Hafta 1', due: null, n: 2, created: 'x', students: 4, finished: 1 }],
      teacher_assign_progress: { title: 'Hafta 1', due: null, n: 2, students: [{ u: 'ayse', done: 2 }, { u: 'veli', done: 0 }] },
      teacher_assign_save: { ok: true, id: 4 }, teacher_assign_del: 'ok',
      h_list: [{ id: 3, title: 'Hafta 1', due: null, n: 2, done: 1 }, { id: 5, title: 'Bitti', due: null, n: 3, done: 3 }]
    };
    sb = { rpc: async (n, a) => { c.push([n, a]); if (n === 'h_next') return { data: kalan-- > 0 ? { def: 'to gather crops', dtr: 'ürün toplamak', len: 7, tries: 5, lvl: 4, guesses: [] } : { done: true } }; return { data: ver[n] !== undefined ? ver[n] : null } } };
    prof = { id: 'u', username: 'ali', cls: true, xp: 10, words_solved: 0, words_failed: 0 };
    rHome(); aProfile(); await w(40); aPMenu(); await w(30);
    r.menu = !!document.getElementById('odb');
    document.getElementById('odb').click(); await w(60);
    r.liste = document.body.innerText.includes('Hafta 1') && document.body.innerText.includes('1/2 kelime');
    document.querySelector('[data-o="5"]').click(); await w(30);
    r.bitmis = !c.some(x => x[0] === 'h_next');
    document.querySelector('[data-o="3"]').click(); await w(150);
    r.oyun = !document.getElementById('game').hidden && c.some(x => x[0] === 'h_next' && x[1]._aid === 3);
    r.kelimeUzunluk = word.length === 7;
    // TR düğmesi tanımın çevirisini göstermeli
    const bt = document.getElementById('trbtn'); r.tr = !bt.hidden; bt.click(); r.trMetin = document.getElementById('def').innerText.startsWith('Ürün toplamak');
    // sonraki kelime: ödev bitti -> listeye dön
    await pNext(); await w(100);
    r.donus = document.getElementById('game').hidden && document.body.innerText.includes('Ödevlerim');
    // öğretmen
    prof = { id: 't', username: 'hoca', teacher: true, cls: false, xp: 1, words_solved: 0, words_failed: 0 };
    aTeacher(); await w(30); r.t5 = !!document.getElementById('t5');
    document.getElementById('t5').click(); await w(60);
    r.tliste = document.body.innerText.includes('1/4 öğrenci bitirdi');
    document.querySelector('[data-a="3"]').click(); await w(60);
    r.ilerleme = document.body.innerText.includes('ayse') && document.body.innerText.includes('2/2');
    aTAssign(); await w(60); document.getElementById('an').click(); await w(60);
    document.getElementById('oh').value = 'Hafta 2'; document.querySelectorAll('.ok')[0].checked = true; document.getElementById('ts').click(); await w(80);
    const k = c.filter(x => x[0] === 'teacher_assign_save').pop();
    r.kaydet = k && k[1]._title === 'Hafta 2' && k[1]._wids.length === 1 && k[1]._wids[0] === 7;
    return r;
  });
  for (const [k, v] of Object.entries(o)) assert.ok(v, k + ' başarısız');
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok ödev: öğrenci listesi ve çözme akışı, TR düğmesi, bitince listeye dönüş, öğretmen ödev verme/ilerleme');
  await s.kapat();
})().catch(e => { console.error('HATA ödev:', e.message); process.exit(1); });
