// Oyun ekranına özel sahneler: oyun açılınca temanın oyun sahnesi gelir, menü sahnesi (ve canvas döngüsü) durur; çıkınca geri döner.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(async () => {
    const wait = ms => new Promise(r => setTimeout(r, ms)), r = { tema: {} }, root = document.documentElement, game = document.getElementById('game');
    const T = ['cyber', 'witcher', 'minecraft', 'galaksi', 'yagmur', 'kis', 'okyanus', 'synthwave', 'buyulu', 'petal', 'kod', 'ejder'];
    for (const k of T) {
      game.hidden = true; setTheme(k); await wait(30);
      const menuDongu = !!SHN._stop;
      game.hidden = false; await wait(30);
      const os = document.getElementById('oyunsahne');
      const ic = [root.dataset.oyun === '1', os.dataset.s === k, os.children.length, getComputedStyle(document.getElementById('sahne')).display, getComputedStyle(os).display, !SHN._stop];
      game.hidden = true; await wait(30);
      r.tema[k] = { ic, dis: [root.dataset.oyun === undefined, getComputedStyle(os).display], menuDongu, donguGeri: !!SHN._stop };
    }
    // Sahnesiz tema: oyun sahnesi yok
    setTheme('dark'); game.hidden = false; await wait(30); r.sahnesiz = root.dataset.oyun === undefined; game.hidden = true;
    // Oyun sırasında tema değişirse yeni temanın oyun sahnesi gelir
    setTheme('kod'); game.hidden = false; await wait(30); setTheme('ejder'); await wait(30); r.temaDegisim = document.getElementById('oyunsahne').dataset.s; game.hidden = true;
    return r;
  });
  for (const [k, v] of Object.entries(o.tema)) {
    const [oyun, dogruTema, n, menuGizli, oyunGorunur, donguDurdu] = v.ic;
    assert.ok(oyun && dogruTema, k + ': oyun sahnesi açılmadı');
    assert.ok(n >= 3, k + ': oyun sahnesi boş');
    assert.strictEqual(menuGizli, 'none', k + ': menü sahnesi oyunda gizlenmedi');
    assert.strictEqual(oyunGorunur, 'block', k + ': oyun sahnesi görünmüyor');
    assert.ok(donguDurdu, k + ': menü canvas döngüsü oyunda durmadı');
    assert.deepStrictEqual(v.dis, [true, 'none'], k + ': oyundan çıkınca menü sahnesine dönülmedi');
    if (v.menuDongu) assert.ok(v.donguGeri, k + ': menü canvas döngüsü geri başlamadı');
  }
  assert.ok(o.tema.cyber.menuDongu && o.tema.minecraft.menuDongu, 'canvas temaları menüde döngüde olmalı');
  assert.ok(o.sahnesiz); assert.strictEqual(o.temaDegisim, 'ejder');
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok oyun sahnesi: 12 temada oyuna özel arka plan, menü sahnesi ve canvas döngüsü oyunda durup geri dönüyor');
  await s.kapat();
})().catch(e => { console.error('HATA oyun sahnesi:', e.message); process.exit(1); });
