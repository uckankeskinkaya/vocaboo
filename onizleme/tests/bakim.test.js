// Bakım modu (istemci): yönetici olmayan için kilit ekranı ve oturum kapatma, yönetici için serbest + şerit, yönetici girişi, yönetici paneli düğmesi.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(async () => {
    const r = {}, w = ms => new Promise(x => setTimeout(x, ms)), c = [];
    let acik = true, yonetici = false, cikis = 0, girisOk = true;
    localStorage.setItem('sb-test-auth-token', '{"x":1}');
    sb = {
      auth: { signOut: async () => { cikis++; localStorage.removeItem('sb-test-auth-token') }, signInWithPassword: async () => girisOk ? { data: { session: { x: 1 } } } : { error: { message: 'x' } } },
      rpc: async (n, a) => { c.push([n, a]); if (n === 'maint_get') return { data: { on: acik, msg: 'Güncelleme var' } }; if (n === 'is_admin') return { data: yonetici }; if (n === 'admin_maint_set') { acik = a._on; return { data: 'ok' } } return { data: null } },
      from: () => { const q = { select: () => q, eq: () => q, single: async () => ({ data: { id: 'a', username: 'root', admin: true } }) }; return q }
    };
    loadProf = async () => { prof = { id: 'a', username: 'root', admin: true } };
    // 1) yönetici olmayan, oturumu var -> oturum kapanır, kilit ekranı
    prof = { id: 'u', username: 'ali', admin: false }; yonetici = false;
    await mnKontrol(); await w(30);
    r.kilit = !!document.getElementById('mnov') && document.getElementById('mnm').textContent === 'Güncelleme var';
    r.oturumKapandi = cikis === 1 && prof === null;
    // 2) bakım kapanınca ekran gider
    acik = false; await mnKontrol(); r.acildi = !document.getElementById('mnov');
    // 3) yönetici: kilit yok, şerit var
    acik = true; yonetici = true; localStorage.setItem('sb-test-auth-token', '{"x":1}'); prof = { id: 'a', username: 'root', admin: true };
    await mnKontrol(); await w(30);
    r.yoneticiSerbest = !document.getElementById('mnov') && !!document.getElementById('mnbn') && cikis === 1;
    // 4) kilit ekranından yönetici girişi: yönetici olmayan reddedilir
    prof = null; localStorage.removeItem('sb-test-auth-token'); document.getElementById('mnbn').remove(); yonetici = false;
    await mnKontrol(); await w(30);
    document.getElementById('mng').click();
    r.formGorunur = document.getElementById('mnf').offsetHeight > 0 && document.getElementById('mnu').offsetHeight > 0 && document.getElementById('mns').offsetHeight > 0;
    document.getElementById('mnu').value = 'ali'; document.getElementById('mnp').value = 'sifre123'; await mnGiris(); await w(30);
    r.yoneticiDegilReddedildi = !!document.getElementById('mnov') && /sadece yöneticiler/.test(document.getElementById('mne').textContent) && cikis === 2;
    // 5) yönetici girişi başarılı
    yonetici = true; await mnGiris(); await w(60);
    r.yoneticiGirdi = !document.getElementById('mnov') && !!prof && prof.admin;
    // 6) yanlış şifre sınırı
    girisOk = false; acik = true; yonetici = false; prof = null; await mnKontrol(); await w(30);
    document.getElementById('mng').click(); document.getElementById('mnu').value = 'ali'; document.getElementById('mnp').value = 'x';
    for (let i = 0; i < 6; i++) await mnGiris();
    r.sinir = /Çok fazla deneme/.test(document.getElementById('mne').textContent);
    // 7) ağ hatasında kilitlenmez
    document.getElementById('mnov').remove(); const eski = sb.rpc; sb.rpc = async () => ({ error: { message: 'fetch failed' } }); await mnKontrol();
    r.agHatasiKilitlemez = !document.getElementById('mnov'); sb.rpc = eski;
    // 8) yönetici paneli düğmesi ve açma
    acik = false; prof = { id: 'a', username: 'root', admin: true }; MN.on = false; aAdmin(); await w(30);
    r.panelDugme = !!document.getElementById('ad9') && /Kapalı/.test(document.getElementById('ad9').innerText);
    document.getElementById('ad9').click(); await w(60);
    document.getElementById('mmsg').value = 'Test <b>mesaj</b>'; document.getElementById('mt').click(); await w(30); document.getElementById('cfy').click(); await w(80);
    const k = c.filter(x => x[0] === 'admin_maint_set').pop();
    r.acildiRpc = k && k[1]._on === true && !/[<>]/.test(k[1]._msg);
    return r;
  });
  for (const [k, v] of Object.entries(o)) assert.ok(v, k + ' başarısız');
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok bakım modu (istemci): kilit ekranı, oturum kapatma, yönetici girişi, giriş sınırı, ağ hatasında kilit yok, yönetici paneli');
  await s.kapat();
})().catch(e => { console.error('HATA bakim:', e.message); process.exit(1); });
