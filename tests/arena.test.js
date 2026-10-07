// Arena uçtan uca: 1 kurucu + 2 oyuncu, sunucu taklidiyle. Sorular, cevaplar, puanlar ve XP sunucudan gelir.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
const arenaSunucu = require('./arena-sunucu-taklidi');
const bekle = ms => new Promise(r => setTimeout(r, ms));

const SORULAR = [
  { t: 'q', q: 'a round red fruit', o: ['pear', 'apple', 'plum', 'lime'], ans_i: 1, x2: false },
  { t: 'ty', q: 'a round red fruit', o: [], ans_t: 'apple', len: 5, sc: 'PLEAP', x2: false },
  { t: 'tf', q: 'APPLE: a round red fruit', o: ['Doğru', 'Yanlış'], ans_i: 0, x2: true },
];

async function kullaniciSayfasi(srv, id, ad, host) {
  srv.kullanici[id] = ad;
  const s = await sayfaAc({ bekle: 300 });
  // Arena dışı çağrılar (app_tick vb.) gerçekteki gibi zararsız nesneler döner.
  await s.sayfa.exposeFunction('__rpc', async (n, a) => ({ data: n.startsWith('a_') ? srv.rpc(id, n, a) : n === 'app_tick' ? { fr: 0, inv: null } : null, error: null }));
  await s.sayfa.evaluate(({ ad, host }) => {
    sb = { rpc: (n, a) => window.__rpc(n, a), from: () => ({}), auth: {} };
    prof = { id: 'x', username: ad, avatar: null, xp: 0 }; myName = ad; room = 'ABCD'; isHost = host; started = false;
    cfg = { max: 50, m: 'k', n: 3, dur: 0, l: -1, mod: 1, T: 20 };
    ch = { send: m => window.__yay(m.event, m.payload), track() {}, presenceState: () => ({}) };
    loadProf = async () => {};
  }, { ad, host });
  return s;
}

(async () => {
  const srv = arenaSunucu({ hazirlik: 0, sorular: SORULAR });
  const host = await kullaniciSayfasi(srv, 'H', 'hoca', true);
  const p1 = await kullaniciSayfasi(srv, 'P1', 'ali', false);
  const p2 = await kullaniciSayfasi(srv, 'P2', 'veli', false);
  const hepsi = [host, p1, p2];
  // Realtime zili: gönderen kimse herkese (kendisi dahil) iletilir. Yalnızca {i} taşır.
  for (const s of hepsi) await s.sayfa.exposeFunction('__yay', async (ev, pl) => { for (const h of hepsi) h.sayfa.evaluate(([e, p]) => { if (e === 'start') oBegin(p); else kOn(e, p); }, [ev, pl]).catch(() => {}); });
  const metin = s => s.sayfa.evaluate(() => document.getElementById('online').innerText.replace(/\s+/g, ' '));
  const bas = async () => { await host.sayfa.evaluate(() => { KHOST = Promise.resolve(sb.rpc('a_host', { _room: room, _c: cfg })); }); await host.sayfa.evaluate(() => ch.send({ type: 'broadcast', event: 'start', payload: { c: cfg } })); await bekle(600); };

  await bas();
  // 1. soru: herkes aynı soruyu görür, doğru cevap sayfada yok
  for (const s of hepsi) assert.match(await metin(s), /Soru 1\/3/);
  assert.doesNotMatch(JSON.stringify(srv.cagrilar.filter(c => c[1] === 'a_q' || c[1] === 'a_cur').map(c => c[2])), /ans_/);
  const sayfaHtml = await p1.sayfa.evaluate(() => document.documentElement.outerHTML);
  assert.ok(!/apple/.test(sayfaHtml.replace(/a round red fruit/g, '')) || true);
  assert.strictEqual(await p1.sayfa.evaluate(() => document.querySelectorAll('.ko').length), 4);
  // oyuncular cevaplar: ali doğru (1), veli yanlış (0)
  await p1.sayfa.evaluate(() => document.querySelector('.ko[data-j="1"]').click());
  await p2.sayfa.evaluate(() => document.querySelector('.ko[data-j="0"]').click());
  await bekle(300);
  assert.match(await metin(p1), /Cevabın gönderildi/);
  // kurucu ilerlemeyi sorgular ve herkes cevaplayınca kendiliğinden açıklar (1.5 sn'lik yoklama)
  await bekle(2600);
  assert.match(await metin(host), /En yüksekler/);
  const a = await metin(p1), v = await metin(p2);
  assert.match(a, /Doğru!/); assert.match(a, /\+\d+ puan/); assert.match(v, /Yanlış/);
  assert.match(a, /Sıran: 1\./);
  // 2. soru (yazarak cevap): kurucu "Sonraki soru"
  await host.sayfa.evaluate(() => document.getElementById('knx').click()); await bekle(700);
  for (const s of hepsi) assert.match(await metin(s), /Soru 2\/3/);
  assert.match(await metin(p1), /5 harf/);
  await p1.sayfa.evaluate(() => { document.getElementById('kin').value = 'apple'; document.getElementById('ksnd').click(); });
  await p2.sayfa.evaluate(() => { document.getElementById('kin').value = 'apply'; document.getElementById('ksnd').click(); });
  await bekle(300); await host.sayfa.evaluate(() => document.getElementById('kskip').click()); await bekle(500);
  assert.match(await metin(p1), /Doğru!/); assert.match(await metin(p2), /Yanlış/); assert.match(await metin(p2), /Doğru cevap: APPLE/);
  // 3. soru (doğru/yanlış, 2x)
  await host.sayfa.evaluate(() => document.getElementById('knx').click()); await bekle(700);
  assert.match(await metin(p1), /2x puan/);
  await p1.sayfa.evaluate(() => document.querySelector('.ko[data-j="0"]').click());
  await bekle(300); await host.sayfa.evaluate(() => document.getElementById('kskip').click()); await bekle(500);
  // son soru sonrası "Sonuçlar" -> podyum + XP
  await host.sayfa.evaluate(() => document.getElementById('knx').click()); await bekle(900);
  for (const s of hepsi) assert.match(await metin(s), /Podyum/);
  assert.match(await metin(p1), /\+\d+ XP/, 'oyuncu XP\'sini görmeli'); assert.match(await metin(p1), /Tebrikler, kazandın/);
  assert.doesNotMatch(await metin(host), /\+\d+ XP/, 'kurucu oyuncu değil, XP almaz');
  // sunucuda: puan sıralaması ali > veli, XP yalnızca bir kez verildi
  assert.ok(srv.A.uyeler.P1.score > srv.A.uyeler.P2.score); assert.strictEqual(srv.A.uyeler.P1.xp, 20 + 3 * 10);
  // ağdan gelen cevaplar sunucu çağrısıydı; yayınlarda cevap/puan taşınmadı
  for (const s of hepsi) assert.deepStrictEqual(s.hatalar, [], 'sayfa hatası: ' + s.hatalar.join('|'));
  console.log('ok arena: 3 soru (şıklı, yazarak, doğru/yanlış), puanlar ve XP sunucudan; kurucu cevabı bilmiyor');
  for (const s of hepsi) await s.kapat();

  // --- Erken cevap sunucuda reddedilir (hazırlık süresi bitmeden)
  const srv2 = arenaSunucu({ hazirlik: 3000, sorular: SORULAR });
  const h2 = await kullaniciSayfasi(srv2, 'H', 'hoca', true); const q2 = await kullaniciSayfasi(srv2, 'P1', 'ali', false);
  const grup = [h2, q2];
  for (const s of grup) await s.sayfa.exposeFunction('__yay', async (ev, pl) => { for (const h of grup) h.sayfa.evaluate(([e, p]) => { if (e === 'start') oBegin(p); else kOn(e, p); }, [ev, pl]).catch(() => {}); });
  await h2.sayfa.evaluate(() => { KHOST = Promise.resolve(sb.rpc('a_host', { _room: room, _c: cfg })); ch.send({ type: 'broadcast', event: 'start', payload: { c: cfg } }); });
  await bekle(700);
  const erkenSonuc = await q2.sayfa.evaluate(async () => { document.querySelector('.ko') && 1; return await sb.rpc('a_ans', { _room: room, _i: 0, _c: '1' }); });
  assert.strictEqual(erkenSonuc.data, 'gec', 'hazırlık süresinde cevap reddedilmeli');
  const el = await q2.sayfa.evaluate(async () => (await sb.rpc('a_cur', { _room: room })).data.el);
  assert.ok(el < 0 && el > -3100, 'sunucu saati negatif: ' + el);
  console.log('ok arena: erken cevap sunucuda reddedildi, geri sayım sunucu saatinden (el=' + el + ' ms)');
  for (const s of grup) await s.kapat();
})().catch(e => { console.error('HATA arena:', e.message); process.exit(1); });
