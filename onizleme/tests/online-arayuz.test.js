// Online menü ve oda kurma: mod kartları, seçenek düğmeleri ve oluşan oda ayarı (cfg).
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(() => {
    loadProf = async () => {}; prof = { id: 'u1', username: 'ali', xp: 900, banned: false, total_points: 0, points_spent: 0, avatar: null, frame: null };
    sb = { rpc: async () => ({ data: null, error: null }) }; window.supabase = { createClient: () => sb };
    try { localStorage.removeItem('ka_room') } catch (e) {}
    const r = {}, tikla = sel => document.querySelector(sel).click();
    let kurulan = null; oJoin = (kod, h) => { kurulan = { kod, h, cfg: JSON.parse(JSON.stringify(cfg)) } };
    oHome();
    r.menu = ['orm', 'oc', 'cd', 'oj', 'ob'].every(i => !!document.getElementById(i)) && !document.getElementById('orj');
    tikla('#oc');
    r.kartlar = document.querySelectorAll('[data-mode]').length;
    tikla('#ok2'); r.varsayilan = kurulan.cfg; r.host = kurulan.h; r.kodUzun = kurulan.kod.length;
    tikla('[data-mode=s]'); tikla('[data-g=dur] [data-v="300"]'); tikla('[data-ppl="50"]'); tikla('[data-g=lv] [data-v="1"]'); tikla('[data-g=mod] [data-v="1"]');
    tikla('#ok2'); r.hayatta = kurulan.cfg;
    oSetup(); // geri gelince seçimler korunur
    r.korunan = document.querySelector('[data-mode=s]').classList.contains('on');
    tikla('[data-mode=k]'); r.arenaKisiYok = !document.querySelector('[data-ppl]'); r.arenaModYok = !document.querySelector('[data-g=mod]');
    tikla('[data-g=q] [data-v="20"]'); tikla('[data-g=t] [data-v="45"]');
    tikla('#ok2'); r.arena = kurulan.cfg;
    tikla('[data-mode=c]'); tikla('[data-ppl="2"]'); r.birebirModYok = !document.querySelector('[data-g=mod]');
    tikla('[data-g=cnt] [data-v="20"]'); tikla('#ok2'); r.puan = kurulan.cfg;
    return r;
  });
  assert.ok(o.menu, 'online menü düğmeleri eksik'); assert.strictEqual(o.kartlar, 3); assert.strictEqual(o.host, true); assert.strictEqual(o.kodUzun, 4);
  assert.deepStrictEqual(o.varsayilan, { max: 2, m: 'c', n: 15, dur: 0, l: -1, mod: 0 });
  assert.deepStrictEqual(o.hayatta, { max: 50, m: 's', n: 0, dur: 300, l: 1, mod: 1 });
  assert.ok(o.korunan); assert.ok(o.arenaKisiYok && o.arenaModYok);
  assert.deepStrictEqual(o.arena, { max: 50, m: 'k', n: 20, dur: 0, l: 1, mod: 1, T: 45 });
  assert.ok(o.birebirModYok);
  assert.deepStrictEqual(o.puan, { max: 2, m: 'c', n: 20, dur: 0, l: 1, mod: 0 });
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok online arayüz: mod kartları, seçenek düğmeleri ve oda ayarı (puan yarışı, hayatta kalma, Arena)');
  await s.kapat();
})().catch(e => { console.error('HATA online arayüz:', e.message); process.exit(1); });
