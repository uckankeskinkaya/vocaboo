// Nasıl oynanır turu (ilk açılış + Ayarlar) ve Kelime defteri "Tekrar et" testi.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc({ bekle: 300 });
  const o = await s.sayfa.evaluate(async () => {
    const wait = ms => new Promise(r => setTimeout(r, ms)), r = {}, tik = id => document.getElementById(id).click();
    // 1) ilk açılışta tur açılır, atlayınca bir daha çıkmaz
    try { localStorage.removeItem('ka_how') } catch (e) {}
    document.getElementById('game').hidden = true; document.getElementById('home').hidden = false;
    window.nasilOynanir(); r.acildi = !document.getElementById('how').hidden; r.slayt1 = document.querySelector('#how h2').textContent;
    tik('hnx'); r.slayt2 = document.querySelector('#how h2').textContent; r.geriVar = !!document.getElementById('hbk');
    tik('hnx'); tik('hnx'); r.slayt4 = document.querySelector('#how h2').textContent; r.sonDugme = document.getElementById('hnx').textContent; r.atlaYok = !document.getElementById('hsk');
    tik('hnx'); r.kapandi = document.getElementById('how').hidden; r.bayrak = localStorage.getItem('ka_how');
    // 2) Ayarlar'da düğme
    loadProf = async () => {}; prof = { id: 'a', username: 'ali', xp: 10, banned: false, total_points: 0, points_spent: 0 };
    aSettings(); r.ayarDugme = !!document.getElementById('how1'); tik('how1'); r.ayardanAcildi = !document.getElementById('how').hidden; tik('hsk');
    // 3) Tekrar et: 3 kelime varken düğme yok
    const kelime = (w, ok) => ({ w, d: 'definition of ' + w, ex: 'We often use the ' + w + ' here.', n: 1, ok: ok || 0 });
    localStorage.setItem('ka_book', JSON.stringify([kelime('alpha'), kelime('bravo'), kelime('delta')]));
    aBook(); r.az = !document.getElementById('rpt');
    // 4) 5 kelime: düğme var; doğru cevaplar; 3. doğru olunca defterden çıkar
    localStorage.setItem('ka_book', JSON.stringify([kelime('alpha', 2), kelime('bravo'), kelime('delta'), kelime('echo'), kelime('foxtrot')]));
    aBook(); r.dugme = document.getElementById('rpt').textContent;
    tik('rpt'); r.secenek = document.querySelectorAll('.rqo button').length; r.maskeli = /_____/.test(document.querySelector('.rq .ex').textContent) && !/alpha|bravo|delta|echo|foxtrot/i.test(document.querySelector('.rq .ex').textContent);
    let dogru = 0, yanlisGoster = false;
    for (let i = 0; i < 5; i++) {
      const sorulan = document.querySelector('.rq div').textContent.replace('definition of ', '').trim();
      const buton = [...document.querySelectorAll('.rqo button')].find(b => b.dataset.w === sorulan);
      if (i === 2) { r.yanlisKelime = sorulan; const y = [...document.querySelectorAll('.rqo button')].find(b => b.dataset.w !== sorulan); y.click(); yanlisGoster = /Yanlış|Wrong/.test(document.querySelector('.rq').textContent); tik('rqn'); }
      else { buton.click(); dogru++; await wait(750); }
    }
    r.yanlisGoster = yanlisGoster; r.sonuc = document.querySelector('.rqs').textContent;
    r.defter = JSON.parse(localStorage.getItem('ka_book')).map(x => x.w).sort().join(',');
    return r;
  });
  assert.ok(o.acildi && /Gizli kelimeyi bul/.test(o.slayt1)); assert.match(o.slayt2, /Renkler/); assert.ok(o.geriVar); assert.match(o.slayt4, /Pazar/); assert.strictEqual(o.sonDugme, 'Başla'); assert.ok(o.atlaYok);
  assert.ok(o.kapandi); assert.strictEqual(o.bayrak, '1'); assert.ok(o.ayarDugme && o.ayardanAcildi);
  assert.ok(o.az, '4 kelimeden azken Tekrar et düğmesi çıkmamalı'); assert.match(o.dugme, /Tekrar et \(5 kelime\)/);
  assert.strictEqual(o.secenek, 4); assert.ok(o.maskeli, 'örnek cümlede kelime gizlenmeli'); assert.ok(o.yanlisGoster);
  assert.match(o.sonuc, /Doğru: 4\/5/);
  // alpha 2 kez doğru bilinmişti: bu testte doğru bilindiyse 3. doğruyla defterden çıkmalı, yanlış bilindiyse kalmalı
  assert.strictEqual(/alpha/.test(o.defter), o.yanlisKelime === 'alpha', 'öğrenilen kelime defterden çıkmalı: ' + o.defter + ' / yanlış: ' + o.yanlisKelime);
  assert.ok(o.defter.split(',').length === (o.yanlisKelime === 'alpha' ? 5 : 4));
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok yardım ve tekrar: nasıl oynanır turu (ilk açılış, Ayarlar) ve kelime defteri tekrar testi');
  await s.kapat();
})().catch(e => { console.error('HATA yardım ve tekrar:', e.message); process.exit(1); });
