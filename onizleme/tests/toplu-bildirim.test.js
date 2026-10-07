// Yönetici toplu bildirim: ekran kişi sayısını gösterir, hazır mesaj doldurur, önce sunucuda mesajı hazırlar (admin_push_prep),
// sonra sunucu işlevine sadece mesaj numarasını gönderir; bekleme ve hata durumları gösterilir.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(async () => {
    const wait = ms => new Promise(r => setTimeout(r, ms)), r = { toasts: [], rpc: [], fetch: [] };
    const h = document.getElementById('how'); if (h) h.hidden = true;
    prof = { id: 'a1', username: 'admin', admin: true, xp: 0, avatar: null };
    let prep = { id: 7 };
    sb = { rpc: async (n, a) => { r.rpc.push([n, a]);
        if (n === 'admin_push_count') return { data: { kisi: 12, cihaz: 14, son: null }, error: null };
        if (n === 'admin_push_prep') return { data: prep, error: null };
        return { data: null, error: null }; },
      auth: { getSession: async () => ({ data: { session: { access_token: 'tok' } } }) }, removeChannel() {} };
    window.fetch = async (u, o) => { r.fetch.push([u, JSON.parse(o.body), o.headers.Authorization]); return { ok: true, status: 200, json: async () => ({ sent: 13, total: 14, dead: 1 }) }; };
    const _t = toast; toast = m => { r.toasts.push(m); _t(m) };
    aAdmin(); r.dugme = !!document.getElementById('ad10');
    document.getElementById('ad10').click(); await wait(100);
    r.yazi = document.getElementById('online').innerText.replace(/\s+/g, ' ');
    document.querySelector('[data-bh="0"]').click();
    r.dolu = [document.getElementById('bpt').value, document.getElementById('bpb').value];
    document.getElementById('bps').click(); await wait(20);
    r.onay = document.getElementById('cft').textContent; document.getElementById('cfy').click(); await wait(200);
    // bekleme sınırı
    prep = { err: 'bekle' }; document.getElementById('bps').click(); await wait(20); document.getElementById('cfy').click(); await wait(100);
    r.bekle = document.getElementById('bpe').textContent;
    return r;
  });
  assert.ok(o.dugme, 'yönetici panelinde "Bildirim gönder" olmalı');
  assert.match(o.yazi, /12 kişi, 14 cihaz/);
  assert.strictEqual(o.dolu[0], 'Güncelleme bitti 🎉'); assert.match(o.dolu[1], /güncellendi/);
  assert.match(o.onay, /12 kişiye gönderilsin mi/);
  assert.deepStrictEqual(o.rpc.find(x => x[0] === 'admin_push_prep')[1], { _t: 'Güncelleme bitti 🎉', _b: o.dolu[1] });
  assert.strictEqual(o.fetch.length, 1); assert.match(o.fetch[0][0], /\/functions\/v1\/push-gonder$/);
  assert.deepStrictEqual(o.fetch[0][1], { duyuru: 7 }, 'işleve metin değil sadece numara gitmeli'); assert.strictEqual(o.fetch[0][2], 'Bearer tok');
  assert.ok(o.toasts.includes('13/14 cihaza gönderildi (1 geçersiz kayıt temizlendi)'), o.toasts.join('|'));
  assert.strictEqual(o.bekle, 'Biraz bekle, 2 dakikada bir gönderilebilir');
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok toplu bildirim: kişi sayısı, hazır mesaj, onay, sunucuda hazırlama + numarayla gönderim, bekleme sınırı');
  await s.kapat();
})().catch(e => { console.error('HATA toplu bildirim:', e.message); process.exit(1); });
