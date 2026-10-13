// Yeni profil: kısa yol kutuları ilgili ekranları açar, rozet şeridi tüm rozetlere gider, Ayarlar ve hesap menüsü açılır.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(async () => {
    const w = ms => new Promise(x => setTimeout(x, ms)), r = {};
    const q = { select: () => q, eq: () => q, or: () => q, order: () => q, in: () => q, limit: () => q, single: () => q, maybeSingle: () => q, then: f => f({ data: [], error: null }) };
    sb = { rpc: async () => ({ data: null, error: null }), from: () => q, auth: { getSession: async () => ({ data: { session: null } }) }, removeChannel() { }, getChannels: () => [] };
    prof = { id: 'u1', username: 'elif', xp: 2600, avatar: 'p:fox', best_score: 2100, words_solved: 10, words_failed: 2, cls: true };
    document.getElementById('home').hidden = true; document.getElementById('online').hidden = false;
    const ac = () => { aProfile(); return document.getElementById('online'); };
    let el = ac();
    r.kisa = [...el.querySelectorAll('.ypk [data-yk]')].map(b => b.dataset.yk);
    r.dort = el.querySelectorAll('.ypk button').length; r.ikon = el.querySelectorAll('.sg3 .st .yi').length;
    r.tanimsiz = /undefined/.test(el.innerText);
    const tikla = async id => { el = ac(); el.querySelector('.ypk [data-yk="' + id + '"]').click(); await w(80); return el.innerText.slice(0, 200).replace(/\s+/g, ' '); };
    r.gorev = await tikla('qab'); r.defter = await tikla('nb');
    el = ac(); el.querySelector('.bdr').click(); await w(80); r.rozet = el.innerText.slice(0, 120).replace(/\s+/g, ' ');
    el = ac(); el.querySelector('.ypk [data-ya]').click(); await w(80); r.menu = !!document.getElementById('pmn');
    return r;
  });
  assert.deepStrictEqual(o.kisa, ['qab', 'stb', 'nb']); assert.strictEqual(o.dort, 4, '4 kutu olmalı');
  assert.strictEqual(o.ikon, 6); assert.strictEqual(o.tanimsiz, false, 'profilde "undefined" görünmemeli');
  
  assert.notStrictEqual(o.defter, o.gorev, 'Kelime defteri farklı ekran açmalı');
  assert.match(o.rozet, /Rozet|Badge/i, 'rozet şeridi rozetleri açmalı: ' + o.rozet);
  assert.ok(o.menu, 'Ayarlar ve hesap menüsü açılmalı');
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok yeni profil: kısa yollar, rozet şeridi ve menü çalışıyor, istatistik ikonları');
  await s.kapat();
})().catch(e => { console.error('HATA yeni profil:', e.message); process.exit(1); });
