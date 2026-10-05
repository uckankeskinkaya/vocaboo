// Kurtarma kodu: kayıttan sonra gösterilir, Profil'de yenilenir, "Şifremi unuttum" kodlu talep açar, yönetici listesi doğrulananı işaretler.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(async () => {
    const r = {}, cagri = [];
    prof = { username: 'ali', avatar: null, frame: null, xp: 0 };
    sb = { rpc: async (n, a) => { cagri.push([n, a]); return { data: n === 'recovery_new' ? 'ABCDE-FGHJK' : n === 'recovery_has' ? false : n === 'pw_request_code' ? (a._c === 'ABCDE-FGHJK' ? 'ok' : 'hatali') : n === 'admin_pw_requests' ? [{ id: 1, uid: 'u1', u: 'veli', t: '2026-10-05T10:00:00Z', v: true }, { id: 2, uid: 'u2', u: 'ayse', t: '2026-10-05T10:00:00Z', v: false }] : null } } };
    await yeniKod0();
    function yeniKod0() { return Promise.resolve() }
    // profil düğmesi
    aProfile(); r.profilDugme = !!document.getElementById('rkb');
    // unuttum + kod
    aForgot(); r.alan = !!document.getElementById('fk');
    document.getElementById('fu').value = 'ali'; document.getElementById('fk').value = 'yanlis-kod12';
    document.getElementById('fs').onclick && await document.getElementById('fs').onclick();
    r.yanlisMesaj = document.getElementById('fe') && document.getElementById('fe').textContent;
    document.getElementById('fk').value = 'ABCDE-FGHJK';
    await document.getElementById('fs').onclick();
    r.istek = cagri.filter(c => c[0] === 'pw_request_code').map(c => c[1]._c);
    // kodsuz: eski akış
    aForgot(); document.getElementById('fu').value = 'ali'; await document.getElementById('fs').onclick();
    r.eski = cagri.some(c => c[0] === 'pw_request');
    // yönetici
    await aAdPw(); r.admin = document.body.innerText;
    return r;
  });
  assert.ok(o.profilDugme, 'profilde kurtarma kodu düğmesi yok');
  assert.ok(o.alan, 'unuttum ekranında kod alanı yok');
  assert.match(o.yanlisMesaj, /Kod yanlış/);
  assert.deepStrictEqual(o.istek, ['yanlis-kod12', 'ABCDE-FGHJK']);
  assert.ok(o.eski, 'kodsuz talep eski akışla gitmeli');
  assert.match(o.admin, /✓ kurtarma kodu doğrulandı/); assert.match(o.admin, /veli/);
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok kurtarma kodu: profil düğmesi, kodlu/kodsuz şifre talebi, yönetici listesinde doğrulama işareti');
  await s.kapat();
})().catch(e => { console.error('HATA kurtarma kodu:', e.message); process.exit(1); });
