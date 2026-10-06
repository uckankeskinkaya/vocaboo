// Yönetici "Altın gönder": hedef seçimi (herkes/sınıf/dışarıdan/öğretmen/liste), miktar kontrolü, önizleme + onay, sunucuya doğru parametreler.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(async () => {
    const wait = ms => new Promise(r => setTimeout(r, ms)), r = { cagri: [], toasts: [] };
    const h = document.getElementById('how'); if (h) h.hidden = true;
    loadProf = async () => {};
    prof = { id: 'a1', username: 'admin', admin: true, xp: 0, avatar: null };
    let sayim = { n: 17, yok: [] };
    sb = { rpc: async (n, a) => { r.cagri.push([n, a]);
        if (n === 'admin_gold_count') return { data: sayim, error: null };
        if (n === 'admin_gold_send') return { data: { ok: true, n: sayim.n, toplam: sayim.n * a._n }, error: null };
        return { data: null, error: null }; }, auth: {}, removeChannel() {} };
    const _t = toast; toast = m => { r.toasts.push(m); _t(m) };
    aAdmin(); r.dugme = document.getElementById('ad12').textContent;
    document.getElementById('ad12').click();
    // miktar yok / çok büyük
    document.getElementById('gs').click(); await wait(30); r.bos = document.getElementById('ge').textContent;
    document.getElementById('gn').value = '2000000'; document.getElementById('gs').click(); await wait(30); r.buyuk = document.getElementById('ge').textContent;
    // sınıfa 500 (varsayılan hedef)
    document.querySelector('[data-gm="500"]').click(); document.getElementById('gs').click(); await wait(60);
    r.onay = document.getElementById('cft').textContent; document.getElementById('cfy').click(); await wait(80);
    // iptal: gönderilmemeli
    document.querySelector('[data-gh="hepsi"]').click(); document.getElementById('gn').value = '100'; document.getElementById('gs').click(); await wait(60);
    document.getElementById('cfn').click(); await wait(30);
    // liste
    document.querySelector('[data-gh="liste"]').click(); document.getElementById('gl').value = 'Ali, veli\nAli  zeynep'; document.getElementById('gn').value = '50';
    sayim = { n: 2, yok: ['zeynep'] }; document.getElementById('gs').click(); await wait(60); r.onayListe = document.getElementById('cft').textContent; document.getElementById('cfy').click(); await wait(80);
    // boş liste
    document.getElementById('gl').value = ''; document.getElementById('gn').value = '5'; document.getElementById('gs').click(); await wait(30); r.bosListe = document.getElementById('ge').textContent;
    return r;
  });
  assert.strictEqual(o.dugme, 'Altın gönder');
  assert.match(o.bos, /1 ile 1\.000\.000/); assert.match(o.buyuk, /1 ile 1\.000\.000/);
  assert.match(o.onay, /17 kişiye kişi başı 500 🪙 gönderilsin mi\? Toplam 8\.500 🪙/);
  const g = o.cagri.filter(x => x[0] === 'admin_gold_send');
  assert.strictEqual(g.length, 2, 'iptal edilen gönderim yapılmamalı: ' + JSON.stringify(g));
  assert.deepStrictEqual(g[0][1], { _h: 'sinif', _l: null, _n: 500 });
  assert.deepStrictEqual(g[1][1], { _h: 'liste', _l: ['ali', 'veli', 'zeynep'], _n: 50 }, 'liste küçük harf ve tekrarsız gönderilir');
  assert.match(o.onayListe, /Bulunamadı: zeynep/);
  assert.ok(o.toasts.includes('17 kişiye 500 🪙 gönderildi'), o.toasts.join('|'));
  assert.match(o.bosListe, /en az bir kullanıcı adı/);
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok altın gönder: hedefler, miktar sınırı, önizleme + onay, iptal, kullanıcı listesi');
  await s.kapat();
})().catch(e => { console.error('HATA altın gönder:', e.message); process.exit(1); });
