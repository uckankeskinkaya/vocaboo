// Maç odaları: avatar + çerçeve + unvan, gerçek profilden (spoof edilemez), tek toplu sorgu, ekran yenileme.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(async () => {
    const wait = ms => new Promise(r => setTimeout(r, ms)); const r = {};
    const DB = { ali: { username: 'ali', frame: 'altin', xp: 5000 }, veli: { username: 'veli', frame: 'elmas', xp: 300 }, cem: { username: 'cem', frame: null, xp: 0 } };
    let sorgular = [];
    sb = { rpc: async () => ({ data: null, error: null }), auth: {},
      from: t => { const q = { select: () => q, limit: () => q, in: (kol, adlar) => { sorgular.push([t, kol, adlar.slice().sort().join(',')]); q.adlar = adlar; return q; }, then: f => f({ data: (q.adlar || []).map(a => DB[a]).filter(Boolean), error: null }) }; return q; } };
    prof = { id: 'p', username: 'ben', avatar: 'p:fox', frame: 'sakura', xp: 100 };
    // cem, presence'ta sahip olmadığı "prizma" çerçevesini ve "Efsane" unvanını iddia ediyor
    const pres = { k1: [{ n: 'ali', im: 'p:fox', fr: '', ti: '', h: 1, t: 1, p: 30, w: 3, a: 1, d: 0 }], k2: [{ n: 'veli', im: 'p:panda', fr: '', ti: '', t: 2, p: 20, w: 2, a: 1, d: 0 }], k3: [{ n: 'cem', im: 'p:cat', fr: 'prizma', ti: 'Efsane', t: 3, p: 10, w: 1, a: 1, d: 0 }] };
    pres[myId] = [{ n: 'ben', im: 'p:fox', fr: 'prizma', ti: 'Efsane', t: 0, p: 0, w: 0, a: 1, d: 0 }];
    ch = { presenceState: () => pres, track() { }, send() { } };
    room = 'ABCD'; isHost = true; started = false; mode = 'online'; cfg = { max: 6, m: 'c', n: 10, dur: 0, l: -1, mod: 0 };
    document.getElementById('home').hidden = true; document.getElementById('online').hidden = false;
    const satirlar = () => [...document.querySelectorAll('#online .pr')].map(e => ({ ad: e.querySelector('.pr-u b').childNodes[0].textContent.replace(' (sen)', ''), cerceve: !!e.querySelector('.fq'), unvan: (e.querySelector('.pr-t') || {}).textContent || '', no: (e.querySelector('.pr-n') || {}).textContent || '' }));
    // 1) Lobi: veri gelmeden başkalarında çerçeve/unvan görünmemeli (iddia edilen "prizma"/"Efsane" yok)
    oLobby(); r.once = satirlar();
    await wait(150);
    r.sonra = satirlar(); r.sorgu_sayisi = sorgular.length; r.sorgu = sorgular[0];
    r.ali_unvan_beklenen = titleOf({ xp: 5000 });
    // 2) Sonuç ekranı (sunucu verisi)
    started = true; ost = { fin: true };
    const d = { done: true, left: 0, mode: 'c', players: [{ u: 'ali', im: 'p:fox', sc: 900, w: 9, xp: 70, a: true, me: false }, { u: 'ben', im: 'p:fox', sc: 700, w: 7, xp: 50, a: true, me: true }, { u: 'cem', im: 'p:cat', sc: 100, w: 1, xp: 20, a: false, me: false }] };
    document.getElementById('game').hidden = true; RES_LAST = d; oResView(d);
    r.sonuc = satirlar(); r.sonuc_yazi = document.getElementById('online').innerText.replace(/\s+/g, ' ');
    // 3) 1v1 ekranı
    const L2 = [{ k: myId, n: 'ben', im: 'p:fox', fr: 'prizma', ti: 'x', p: 0, w: 0, a: 1 }, { k: 'x', n: 'veli', im: 'p:panda', fr: 'prizma', ti: 'x', p: 5, w: 1, a: 1 }];
    cfg.max = 2; r.vs = vsHTML(L2); r.vs_live = vsLive(L2);
    // 4) yenileme: veri sonradan gelirse ekran kendiliğinden yenilenir
    OV.zeynep = undefined; ost = { fin: false }; started = false; cfg.max = 6; document.getElementById('game').hidden = true;
    pres.k4 = [{ n: 'zeynep', im: 'p:fox', t: 4, p: 0, w: 0, a: 1, d: 0 }]; DB.zeynep = { username: 'zeynep', frame: 'elmas', xp: 9000 };
    oLobby(); const once4 = satirlar().find(x => x.ad === 'zeynep').cerceve; await wait(150); r.yenilendi = [once4, satirlar().find(x => x.ad === 'zeynep').cerceve];
    return r;
  });
  const sec = (d, ad) => d.find(x => x.ad === ad);
  assert.ok(o.once.every(x => !x.cerceve || x.ad === 'ben') && o.once.every(x => x.ad === 'ben' || x.unvan === ''), 'veri gelmeden başkasında çerçeve/unvan görünmemeli: ' + JSON.stringify(o.once));
  assert.strictEqual(o.sorgu_sayisi, 1, 'tek toplu sorgu olmalı'); assert.deepStrictEqual(o.sorgu, ['profiles', 'username', 'ali,cem,veli']);
  assert.strictEqual(sec(o.sonra, 'ali').cerceve, true, 'ali gerçek çerçevesini görmeli'); assert.strictEqual(sec(o.sonra, 'ali').unvan, o.ali_unvan_beklenen);
  assert.strictEqual(sec(o.sonra, 'veli').cerceve, true);
  assert.strictEqual(sec(o.sonra, 'cem').cerceve, false, 'cem sahip olmadığı "prizma" çerçevesini gösterememeli'); assert.notStrictEqual(sec(o.sonra, 'cem').unvan, 'Efsane');
  assert.strictEqual(sec(o.sonra, 'ben').cerceve, true, 'kendi çerçevem (profilden) görünmeli');
  assert.deepStrictEqual(o.sonuc.map(x => x.no), ['1', '2', '3']); assert.strictEqual(sec(o.sonuc, 'ali').cerceve, true); assert.strictEqual(sec(o.sonuc, 'ali').unvan, o.ali_unvan_beklenen);
  assert.match(o.sonuc_yazi, /\+70 XP/); assert.match(o.sonuc_yazi, /\(elendi\)/); assert.match(o.sonuc_yazi, /\(sen\)/);
  assert.ok(o.vs.includes('fq'), '1v1 ekranında çerçeve olmalı'); assert.ok(!o.vs.includes('prizma'), 'iddia edilen çerçeve görünmemeli');
  assert.deepStrictEqual(o.yenilendi, [false, true], 'veri gelince ekran yenilenmeli');
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok oda: çerçeve+unvan gerçek profilden, sahte çerçeve gösterilmez, tek sorgu, ekran yenilenir');
  await s.kapat();
})().catch(e => { console.error('HATA oda:', e.message); process.exit(1); });
