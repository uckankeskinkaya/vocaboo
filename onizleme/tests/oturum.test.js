// Oturum önbelleği: ağ sorununda şifre sormadan önbellekteki profille devam, gerçek oturum hatasında giriş, başarıda önbellek güncellenir.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(async () => {
    const r = {}, w = ms => new Promise(x => setTimeout(x, ms));
    localStorage.setItem('sb-test-auth-token', '{"x":1}');
    localStorage.setItem('ka_prof', JSON.stringify({ id: 'u1', username: 'ali', xp: 120, avatar: null }));
    const profil = { id: 'u1', username: 'ali', xp: 300, banned: false };
    let mod = 'ag';
    sb = {
      auth: { getUser: async () => mod === 'ag' ? { data: null, error: { name: 'AuthRetryableFetchError', message: 'Failed to fetch', status: 0 } } : mod === 'yetki' ? { data: null, error: { name: 'AuthApiError', message: 'invalid JWT', status: 401 } } : { data: { user: { id: 'u1' } }, error: null }, signOut: async () => {} },
      from: () => { const q = { select: () => q, eq: () => q, single: async () => mod === 'profilag' ? { data: null, error: { message: 'TypeError: Failed to fetch', status: 0 } } : { data: profil, error: null } }; return q },
      rpc: async () => ({ data: null })
    };
    prof = null; await loadProf();
    r.agdaOnbellek = !!prof && prof.username === 'ali' && prof._stale === 1 && prof.xp === 120;
    mod = 'yetki'; prof = null; await loadProf();
    r.yetkiHatasiGiris = prof === null;
    mod = 'profilag'; prof = null; await loadProf();
    r.profilAgHatasi = !!prof && prof._stale === 1;
    mod = 'tamam'; prof = null; await loadProf();
    r.basari = !!prof && !prof._stale && prof.xp === 300 && JSON.parse(localStorage.getItem('ka_prof')).xp === 300;
    // oturum yoksa önbellek kullanılmaz
    localStorage.removeItem('sb-test-auth-token'); mod = 'ag'; prof = null; await loadProf();
    r.oturumsuzOnbellekYok = prof === null;
    return r;
  });
  for (const [k, v] of Object.entries(o)) assert.ok(v, k + ' başarısız');
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok oturum önbelleği: ağ sorununda giriş ekranı yok, oturum hatasında giriş, başarıda önbellek tazelenir');
  await s.kapat();
})().catch(e => { console.error('HATA oturum:', e.message); process.exit(1); });
