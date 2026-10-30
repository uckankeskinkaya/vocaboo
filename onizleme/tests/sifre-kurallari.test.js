// Kayıt ekranında şifre kuralları (en az 8 karakter, 1 harf, 1 rakam) görünür, yazarken işaretlenir;
// kurala uymayan şifreyle kayıt isteği gönderilmez; sunucunun "şifre zayıf" hatası doğru mesajla gösterilir.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(async () => {
    const wait = ms => new Promise(r => setTimeout(r, ms)), r = {};
    const h = document.getElementById('how'); if (h) h.hidden = true;
    let kayit = 0, cevap = { data: {}, error: { message: 'Password should contain at least one character of each: abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ, 0123456789.' } };
    sb = { rpc: async () => ({ data: null, error: null }), auth: { signUp: async () => { kayit++; return cevap; }, signInWithPassword: async () => ({ data: {}, error: { message: 'Invalid login credentials' } }) } };
    prof = null; aAuth();
    const yaz = v => { const i = document.getElementById('ap'); i.value = v; i.dispatchEvent(new Event('input')); return [...document.querySelectorAll('#apk .pwk')].map(e => e.classList.contains('ok')); };
    r.bos = yaz(''); r.harf = yaz('kedikedi'); r.tam = yaz('kedi2024');
    r.metin = document.getElementById('online').innerText;
    document.getElementById('au').value = 'ali_1';
    const dene = async p => { yaz(p); document.getElementById('as').click(); await wait(100); return document.getElementById('ae').textContent; };
    r.rakamsiz = await dene('kedikedi'); r.harfsiz = await dene('20242024'); r.kisa = await dene('ke2'); r.istek = kayit;
    r.sunucu = await dene('kedi2024'); r.istek2 = kayit;
    return r;
  });
  assert.deepStrictEqual(o.bos, [false, false, false]); assert.deepStrictEqual(o.harf, [true, true, false]); assert.deepStrictEqual(o.tam, [true, true, true]);
  assert.match(o.metin, /en az 1 harf ve en az 1 rakam/);
  assert.match(o.rakamsiz, /1 rakam/); assert.match(o.harfsiz, /1 harf/); assert.match(o.kisa, /8 karakter/); assert.strictEqual(o.istek, 0, 'kurala uymayan şifreyle istek gitmemeli');
  assert.match(o.sunucu, /Şifre kurala uymuyor/); assert.strictEqual(o.istek2, 1);
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok şifre kuralları: kayıtta kurallar ve canlı liste, kurala uymayan şifre gönderilmez, sunucu hatası anlaşılır');
  await s.kapat();
})().catch(e => { console.error('HATA şifre kuralları:', e.message); process.exit(1); });
