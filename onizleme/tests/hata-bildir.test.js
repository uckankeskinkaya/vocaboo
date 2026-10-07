// Hata bildir: Ayarlar'ın en altında düğme, konu + açıklama formu, bağlam bilgisi, hız sınırı mesajı, yöneticilere bildirim çağrısı;
// yönetici panelinde liste ve durum değiştirme. Giriş yapmamışsa giriş ekranına yönlendirir.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(async () => {
    const wait = ms => new Promise(r => setTimeout(r, ms)), r = { rpc: [], fetch: [], toasts: [] };
    const h = document.getElementById('how'); if (h) h.hidden = true;
    let gonder = { id: 42 };
    const liste = [{ id: 42, u: 'veli', k: 'online', m: '1v1 de <b>puan</b> görünmüyor', c: { cihaz: 'iOS 18 · Safari', boyut: '390x844 dikey' }, t: new Date().toISOString(), d: 'yeni' }];
    sb = { rpc: async (n, a) => { r.rpc.push([n, a]);
        if (n === 'bug_send') return { data: gonder, error: null };
        if (n === 'admin_bugs') return { data: { yeni: 1, list: liste }, error: null };
        if (n === 'admin_bug_set') { liste[0].d = a._durum; return { data: 'ok', error: null }; }
        return { data: null, error: null }; },
      auth: { getSession: async () => ({ data: { session: { access_token: 'tok' } } }) }, removeChannel() {} };
    window.fetch = async (u, o) => { r.fetch.push([u, JSON.parse(o.body)]); return { ok: true, json: async () => ({ sent: 1 }) }; };
    const _t = toast; toast = m => { r.toasts.push(m); _t(m) };
    // giriş yoksa giriş ekranı
    prof = null; aSettings(); document.getElementById('bgb').click(); r.girissiz = document.getElementById('online').innerText.includes('Hata bildirmek için giriş yap');
    prof = { id: 'u1', username: 'ali', admin: true, xp: 0, avatar: null };
    aSettings();
    const ob = document.getElementById('ob'); r.sonda = ob.previousElementSibling && ob.previousElementSibling.id === 'bgb';
    document.getElementById('bgb').click();
    document.querySelector('[data-bk="online"]').click();
    document.getElementById('bgm').value = 'abc'; document.getElementById('bgs').click(); await wait(30); r.kisa = document.getElementById('bge').textContent;
    document.getElementById('bgm').value = '1v1 maçında rakibin puanı görünmüyor'; document.getElementById('bgs').click(); await wait(100);
    const g = r.rpc.find(x => x[0] === 'bug_send'); r.gonderilen = g && [g[1]._k, g[1]._m, Object.keys(g[1]._c).sort().join(',')];
    // hız sınırı
    gonder = { err: 'bekle' }; aBug(); document.getElementById('bgm').value = 'tekrar deneme metni'; document.getElementById('bgs').click(); await wait(80); r.bekle = document.getElementById('bge').textContent;
    // yönetici paneli
    aAdmin(); await wait(80); r.adDugme = document.getElementById('ad11').textContent;
    document.getElementById('ad11').click(); await wait(80);
    const kart = document.querySelector('.bgr'); r.kart = kart.innerText.replace(/\s+/g, ' '); r.xss = !kart.querySelector('.bm b');
    kart.querySelector('[data-bd="cozuldu"]').click(); await wait(80);
    r.durum = r.rpc.filter(x => x[0] === 'admin_bug_set').map(x => x[1]);
    return r;
  });
  assert.ok(o.girissiz, 'giriş yoksa giriş ekranı'); assert.ok(o.sonda, 'düğme Ayarlar\'ın en altında (Geri\'den önce) olmalı');
  assert.match(o.kisa, /en az 5 karakter/);
  assert.deepStrictEqual(o.gonderilen, ['online', '1v1 maçında rakibin puanı görünmüyor', 'boyut,cihaz,dil,mod,surum,tema']);
  assert.strictEqual(o.fetch.length, 1); assert.deepStrictEqual(o.fetch[0][1], { bug: 42 }, 'işleve sadece kayıt numarası gitmeli');
  assert.match(o.fetch[0][0], /\/functions\/v1\/push-gonder$/);
  assert.ok(o.toasts.some(t => /Teşekkürler/.test(t)));
  assert.match(o.bekle, /Çok sık/);
  assert.strictEqual(o.adDugme, 'Hata bildirimleri (1 yeni)');
  assert.match(o.kart, /veli/); assert.match(o.kart, /iOS 18 · Safari/); assert.ok(o.xss, 'açıklama HTML olarak çalışmamalı');
  assert.deepStrictEqual(o.durum, [{ _id: 42, _durum: 'cozuldu' }]);
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok hata bildir: Ayarlar\'ın sonunda düğme, form + bağlam, hız sınırı, yöneticiye bildirim, yönetici listesi ve durum');
  await s.kapat();
})().catch(e => { console.error('HATA hata bildir:', e.message); process.exit(1); });
