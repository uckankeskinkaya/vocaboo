// Giriş denemesi sınırı: 5 yanlış denemeden sonra kilit, kilitliyken sunucuya istek gitmez, doğru girişte sayaç sıfırlanır.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(async () => {
    localStorage.removeItem('ka_gdeneme');
    let istek = 0; const r = {};
    sb = { auth: { signInWithPassword: async () => { istek++; return { error: { message: 'bad' } } } }, rpc: async () => ({ data: null }) };
    aAuth(); document.getElementById('au').value = 'deneme'; document.getElementById('ap').value = 'yanlis123';
    for (let i = 0; i < 5; i++) await aGo(false);
    r.dorduncu = istek; r.mesaj = document.getElementById('ae').textContent;
    await aGo(false); await aGo(false); r.kilitliIstek = istek;
    r.kayit = JSON.parse(localStorage.getItem('ka_gdeneme'));
    // süre dolunca tekrar denenebilir
    localStorage.setItem('ka_gdeneme', JSON.stringify({ n: 5, t: Date.now() - 1000 }));
    await aGo(false); r.sonraki = istek;
    return r;
  });
  assert.strictEqual(o.dorduncu, 5);
  assert.match(o.mesaj, /^Çok fazla yanlış deneme\. \d+ sn sonra tekrar dene\.$/);
  assert.strictEqual(o.kilitliIstek, 5, 'kilitliyken sunucuya istek gitmemeli');
  assert.ok(o.kayit.t > Date.now() && o.kayit.n === 5);
  assert.strictEqual(o.sonraki, 6);
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok giriş sınırı: 5 yanlışta kilit, kilitliyken istek yok, süre dolunca yeniden deneme');
  await s.kapat();
})().catch(e => { console.error('HATA giriş sınırı:', e.message); process.exit(1); });
