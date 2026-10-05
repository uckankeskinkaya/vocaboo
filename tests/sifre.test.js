// Şifre sıfırlama: talep -> yönetici geçici kod -> zorunlu yeni şifre.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(async () => {
    const wait = ms => new Promise(r => setTimeout(r, ms)); const r = {};
    const calls = []; let cevap = {}; let guncelle = { error: null }; const yaz = [];
    sb = { rpc: async (n, a) => { calls.push([n, a]); const c = cevap[n]; return typeof c === 'function' ? c(a) : (c || { data: null, error: null }); },
           from: () => ({}), auth: { updateUser: async a => { yaz.push(a); return typeof guncelle === 'function' ? guncelle(a) : guncelle; }, signOut: async () => {} } };
    const metin = () => document.getElementById('online').innerText.replace(/\s+/g, ' ');
    const toasts = () => [...document.querySelectorAll('.toast')].map(t => t.textContent);
    // --- giriş ekranı + talep
    prof = null; aAuth();
    r.giris_buton = !!document.getElementById('af') && metin().includes('Şifremi unuttum');
    r.eski_metin_gitti = !metin().includes('kurtarma yolu yoktur');
    document.getElementById('af').click(); await wait(30);
    const gonder = async v => { document.getElementById('fu').value = v; document.getElementById('fs').click(); await wait(60); };
    await gonder('a!'); r.gecersiz_ad = document.getElementById('fe').textContent; r.gecersiz_cagri = calls.length;
    cevap = { pw_request: { data: 'ok', error: null } }; await gonder('Veli');
    r.talep_cagri = JSON.stringify(calls[calls.length - 1]); r.talep_sonrasi = metin().includes('Talebin yöneticiye iletildi');
    aForgot(); cevap = { pw_request: { data: null, error: { message: 'Could not find the function public.pw_request in the schema cache' } } }; await gonder('veli');
    r.kurulu_degil = document.getElementById('fe').textContent;
    // --- pwMust
    cevap = { pw_must_change: { data: true, error: null } }; r.must_true = await pwMust();
    cevap = { pw_must_change: { data: false, error: null } }; r.must_false = await pwMust();
    cevap = { pw_must_change: { data: null, error: { message: 'x' } } }; r.must_hata = await pwMust();
    // --- zorunlu yeni şifre
    prof = { id: 'u', username: 'veli', avatar: null, xp: 0, best_score: 0 };
    aNewPw(false); r.zorunlu_cikis_butonu = document.getElementById('ob').textContent;
    const kaydet = async (a, b) => { document.getElementById('p1').value = a; document.getElementById('p2').value = b; document.getElementById('pk').click(); await wait(80); return document.getElementById('pe') ? document.getElementById('pe').textContent : '(ekran değişti)'; };
    r.kisa = await kaydet('abc', 'abc'); r.uyusmuyor = await kaydet('12345678', '12345679'); r.guncelle_cagrisi_yok = yaz.length;
    guncelle = { error: { message: 'New password should be different from the old password.' } }; r.ayni_sifre = await kaydet('12345678', '12345678');
    guncelle = { error: { message: 'Password should be at least 8 characters' } }; r.zayif = await kaydet('12345678', '12345678');
    guncelle = { error: null }; cevap = { pw_changed: { data: false, error: null } }; r.dogrulanamadi = await kaydet('yeniSifre1', 'yeniSifre1');
    cevap = { pw_changed: { data: true, error: null } }; await kaydet('yeniSifre1', 'yeniSifre1');
    r.son_guncelleme = JSON.stringify(yaz[yaz.length - 1]); r.basari_toast = toasts().includes('Şifren değişti.');
    // --- profilden isteğe bağlı değiştirme
    aProfile(); r.profil_satiri = !!document.getElementById('pwc');
    document.getElementById('pwc').click(); await wait(30); r.manuel_geri = document.getElementById('ob').textContent;
    calls.length = 0; await kaydet('yeniSifre2', 'yeniSifre2'); r.manuel_pw_changed_cagrilmaz = calls.filter(c => c[0] === 'pw_changed').length;
    // --- yönetici
    prof = { id: 'adm', username: 'yonetici', admin: true, avatar: null };
    cevap = { admin_pw_requests: { data: [{ id: 1, uid: 'u1', u: 'veli', t: '2026-10-05T10:00:00Z' }, { id: 2, uid: 'u2', u: 'ayse', t: '2026-10-05T11:00:00Z' }], error: null } };
    aAdmin(); await wait(60); r.admin_buton = document.getElementById('ad6').textContent;
    document.getElementById('ad6').click(); await wait(60); r.talep_listesi = metin();
    cevap.admin_pw_reset = { data: { ok: true, u: 'veli', code: 'ABCD2345' }, error: null };
    document.querySelector('[data-p="u1"]').click(); await wait(30); r.onay_metni = document.getElementById('cft').textContent.slice(0, 40);
    document.getElementById('cfy').click(); await wait(80);
    r.kod_gorunur = document.getElementById('pwcode') && document.getElementById('pwcode').textContent; r.reset_cagri = JSON.stringify(calls.filter(c => c[0] === 'admin_pw_reset')[0]);
    r.kod_notu = metin().includes('bir daha gösterilmez'); r.kopyala_var = !!document.getElementById('pwk');
    // hata türleri
    for (const [e, ad] of [['kendin', 'kendin'], ['yonetici', 'yonetici'], ['yok', 'yok']]) {
      cevap.admin_pw_reset = { data: { err: e }, error: null }; aAdPwGo('u1', 'veli', () => {}); await wait(20); document.getElementById('cfy').click(); await wait(60); r['hata_' + ad] = toasts().slice(-1)[0];
    }
    // kullanıcı detayı
    AU = { u1: { id: 'u1', u: 'veli', c: true, b: false, a: false, bs: 1, xp: 0 }, a1: { id: 'a1', u: 'yonetici', c: true, b: false, a: true, bs: 1, xp: 0 } };
    aAdUser('u1'); r.detay_dugme_kullanici = !!document.getElementById('u7'); aAdUser('a1'); r.detay_dugme_admin = !!document.getElementById('u7');
    return r;
  });
  assert.strictEqual(o.giris_buton, true); assert.strictEqual(o.eski_metin_gitti, true);
  assert.match(o.gecersiz_ad, /3-16/); assert.strictEqual(o.gecersiz_cagri, 0, 'geçersiz ad sunucuya gitmemeli');
  assert.strictEqual(o.talep_cagri, '["pw_request",{"_u":"veli"}]', 'ad küçük harfe çevrilmeli'); assert.strictEqual(o.talep_sonrasi, true);
  assert.match(o.kurulu_degil, /kurulmadı/);
  assert.deepStrictEqual([o.must_true, o.must_false, o.must_hata], [true, false, false], 'hata durumunda zorunlu ekran açılmamalı');
  assert.strictEqual(o.zorunlu_cikis_butonu, 'Çıkış yap');
  assert.match(o.kisa, /8 karakter/); assert.match(o.uyusmuyor, /aynı değil/); assert.strictEqual(o.guncelle_cagrisi_yok, 0);
  assert.match(o.ayni_sifre, /farklı/); assert.match(o.zayif, /kabul edilmedi/); assert.match(o.dogrulanamadi, /doğrulanamadı/);
  assert.strictEqual(o.son_guncelleme, '{"password":"yeniSifre1"}'); assert.strictEqual(o.basari_toast, true);
  assert.strictEqual(o.profil_satiri, true); assert.strictEqual(o.manuel_geri, 'Geri'); assert.strictEqual(o.manuel_pw_changed_cagrilmaz, 0);
  assert.strictEqual(o.admin_buton, 'Şifre talepleri (2)'); assert.match(o.talep_listesi, /veli/); assert.match(o.talep_listesi, /ayse/);
  assert.match(o.onay_metni, /veli için geçici şifre/); assert.strictEqual(o.kod_gorunur, 'ABCD2345'); assert.strictEqual(o.reset_cagri, '["admin_pw_reset",{"_id":"u1"}]');
  assert.strictEqual(o.kod_notu, true); assert.strictEqual(o.kopyala_var, true);
  assert.match(o.hata_kendin, /Kendi şifreni/); assert.match(o.hata_yonetici, /Yönetici hesabı/); assert.match(o.hata_yok, /bulunamadı/);
  assert.strictEqual(o.detay_dugme_kullanici, true); assert.strictEqual(o.detay_dugme_admin, false);
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok şifre sıfırlama: talep, zorunlu yeni şifre, admin kodu, hata durumları');
  await s.kapat();
})().catch(e => { console.error('HATA şifre sıfırlama:', e.message); process.exit(1); });
