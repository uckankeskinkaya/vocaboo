// Haftalık şampiyon: podyum penceresi, ödül mesajı, tek seferlik gösterim ve rozetler.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(async () => {
    const wait = ms => new Promise(r => setTimeout(r, ms)); const r = {};
    let cevap = null, calls = []; loadProf = async () => { calls.push('loadProf'); };
    sb = { rpc: async n => { calls.push(n); return n === 'champ_week' ? cevap : { data: null, error: null }; }, from: () => { const q = { select: () => q, eq: () => q, or: () => q, gt: () => q, order: () => q, limit: () => q, single: () => q, then: r => r({ data: [], error: null }) }; return q; }, auth: {} };
    const kutu = () => document.getElementById('cf').hidden ? null : document.getElementById('cft').textContent;
    const gecen = dStr(dayNum() - ((dayNum() + 3) % 7) - 7);
    const podyum = [{ r: 1, u: 'ali', s: 485 }, { r: 2, u: 'veli', s: 440 }];
    // 1) kazanan, ödül görülmedi: bu hafta ilk kez açsa bile mesaj çıkar
    localStorage.removeItem('ka_champ'); cevap = { data: { week: gecen, podium: podyum, me: { r: 1, pts: 500, seen: false } }, error: null };
    await champCheck(); await wait(50);
    r.kazanan = kutu(); r.seen_cagrildi = calls.includes('champ_seen'); document.getElementById('cfn').click();
    // 2) ödül zaten görüldü, bu cihazda hafta değişmemiş: gösterme
    calls = []; cevap = { data: { week: gecen, podium: podyum, me: { r: 1, pts: 500, seen: true } }, error: null };
    await champCheck(); await wait(30); r.tekrar_yok = kutu(); r.seen_tekrar = calls.includes('champ_seen');
    // 3) kazanan olmayan, yeni hafta (eski cihaz kaydı var): podyum gösterilir, ödül satırı yok
    localStorage.setItem('ka_champ', '1999-01-04'); cevap = { data: { week: gecen, podium: podyum, me: null }, error: null };
    await champCheck(); await wait(30); r.izleyici = kutu(); document.getElementById('cfn').click();
    // 4) sunucu kurulu değil / ödül yok: sessiz
    localStorage.setItem('ka_champ', '1999-01-04'); cevap = { data: null, error: { message: 'Could not find the function public.champ_week' } };
    await champCheck(); await wait(30); r.kurulu_degil = kutu();
    cevap = { data: null, error: null }; localStorage.setItem('ka_champ', '1999-01-04'); await champCheck(); await wait(30); r.odul_yok = kutu();
    // 5) rozetler
    const rozet = ad => BD.find(b => b[0] === ad)[2];
    r.rozet0 = [rozet('Haftanın şampiyonu')({}), rozet('3 hafta şampiyon')({ weekly_wins: 2 }), rozet('Podyum 5 kez')({ weekly_podiums: 4 })];
    r.rozet1 = [rozet('Haftanın şampiyonu')({ weekly_wins: 1 }), rozet('3 hafta şampiyon')({ weekly_wins: 3 }), rozet('Podyum 5 kez')({ weekly_podiums: 5 })];
    return r;
  });
  assert.match(o.kazanan, /🥇 ali, 485 puan/); assert.match(o.kazanan, /Sen 1\. oldun! \+500 puan ve rozet/); assert.strictEqual(o.seen_cagrildi, true);
  assert.strictEqual(o.tekrar_yok, null, 'görülen ödül tekrar gösterilmemeli'); assert.strictEqual(o.seen_tekrar, false);
  assert.match(o.izleyici, /🥈 veli, 440 puan/); assert.doesNotMatch(o.izleyici, /Sen /);
  assert.strictEqual(o.kurulu_degil, null); assert.strictEqual(o.odul_yok, null);
  assert.deepStrictEqual(o.rozet0, [false, false, false]); assert.deepStrictEqual(o.rozet1, [true, true, true]);
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok şampiyon: podyum, tek seferlik ödül mesajı, rozetler');
  await s.kapat();
})().catch(e => { console.error('HATA şampiyon:', e.message); process.exit(1); });
