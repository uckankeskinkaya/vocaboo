// Online emoji tepkileri: 1v1'de profil kartının yanında balon, grupta sadece soru beklerken sağdan bildirim, hız sınırı ve izinli emoji.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(async () => {
    const w = ms => new Promise(r => setTimeout(r, ms)), r = {}, sent = [];
    const A = myId, P = { [A]: [{ n: 'ben', im: '', fr: '', t: 1, p: 0, w: 0, a: 1 }], b: [{ n: 'rakip', im: '', fr: '', t: 2, p: 0, w: 0, a: 1 }], c: [{ n: 'ucuncu', im: '', fr: '', t: 3, p: 0, w: 0, a: 1 }] };
    ch = { presenceState: () => P, send: m => sent.push(m), track() {}, on() {} };
    started = true; mode = 'online';
    document.getElementById('home').hidden = true; document.getElementById('online').hidden = true; document.getElementById('game').hidden = false;
    // --- 1v1
    cfg = { max: 2, m: 'c', n: 10, l: 1 };
    document.getElementById('live').hidden = false;
    document.getElementById('live').innerHTML = '<div class="mvs"><div class="mv"><b>ben</b></div><span>VS</span><div class="mv r"><b>rakip</b></div></div>';
    tepkiGeldi({ k: 'b', e: '👋' }); await w(30);
    const b1 = [...document.querySelectorAll('.tpb')]; r.balonRakip = b1.length === 1 && b1[0].textContent === '👋';
    const kartR = document.querySelector('#live .mv.r').getBoundingClientRect(), bb = b1[0].getBoundingClientRect();
    r.sagda = bb.left > innerWidth / 2 || bb.left > kartR.left;
    tepkiGeldi({ k: 'b', e: '👏' }); r.hizSiniri = document.querySelectorAll('.tpb').length;
    tepkiGeldi({ k: A, e: '🔥' }); await w(30);
    const sol = [...document.querySelectorAll('.tpb')].find(x => x.textContent === '🔥'); r.benSolda = !!sol && sol.getBoundingClientRect().left < innerWidth / 2;
    tepkiGeldi({ k: 'c', e: '💀' }); r.izinsiz = ![...document.querySelectorAll('.tpb')].some(x => x.textContent === '💀');
    document.getElementById('live').querySelector('.mv').click(); await w(30); r.secici = !!document.getElementById('tpp') && document.querySelectorAll('#tpp button').length === 8;
    document.querySelector('#tpp button').click(); await w(30); r.gonderildi = sent.length === 1 && sent[0].event === 'emo' && sent[0].payload.k === A && sent[0].payload.e === '👋';
    document.querySelectorAll('.tpb').forEach(x => x.remove());
    // --- grup: yazarken gelen bildirim kuyruğa girer, soru bitince gösterilir
    cfg = { max: 50, m: 'c', n: 10, l: 1 }; over = false;
    tepkiGeldi({ k: 'c', e: '😮' }); await w(30); r.yazarkenYok = document.querySelectorAll('.tpn').length === 0;
    word = 'TEST'; def = 'a test'; guesses = []; mode = 'online';
    finish('Doğru!'); await w(60);
    r.bildirim = document.querySelectorAll('.tpn').length === 1 && /ucuncu/.test(document.querySelector('.tpn').textContent) && /😮/.test(document.querySelector('.tpn').textContent);
    r.cubuk = !!document.getElementById('tpbar') && document.querySelectorAll('#tpbar button').length === 8;
    await w(1300); tepkiGeldi({ k: 'b', e: '🤝' }); await w(30); r.beklerkenAninda = document.querySelectorAll('.tpn').length === 2;
    return r;
  });
  for (const [k, v] of Object.entries(o)) if (k !== 'hizSiniri') assert.ok(v, k + ' başarısız');
  assert.strictEqual(o.hizSiniri, 1, 'aynı kişiden 1.2 sn içinde ikinci tepki gösterilmemeli');
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok tepkiler: 1v1 balon (rakip sağ, ben sol), grup bildirimi sadece beklerken, emoji listesi ve hız sınırı');
  await s.kapat();
})().catch(e => { console.error('HATA tepkiler:', e.message); process.exit(1); });
