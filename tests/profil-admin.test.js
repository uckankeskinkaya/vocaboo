// Kullanıcı adı değiştirme ve admin panelinde kullanıcı silme ekranları.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(async () => {
    const wait = ms => new Promise(r => setTimeout(r, ms));
    const calls = []; let sonraki = { data: 'ok' };
    sb = { rpc: async (n, a) => { if (n !== 'quest_list') calls.push([n, a]); return typeof sonraki === 'function' ? sonraki(n, a) : sonraki; }, from: () => ({}), auth: {} };
    prof = { id: 'me', username: 'ali', avatar: 'p:fox', frame: null, xp: 100, best_score: 5, best_streak: 2, words_solved: 3, words_failed: 1, total_points: 10, daily_streak: 0 };
    const metin = () => document.getElementById('online').innerText.replace(/\s+/g, ' ');
    const r = {};
    aProfile(); document.getElementById('pfed').click(); await wait(50);
    const ayarla = async (v, cevap) => { sonraki = cevap; document.getElementById('nu').value = v; document.getElementById('nk').click(); await wait(80); return document.getElementById('ne') ? document.getElementById('ne').textContent : '(ekran değişti)'; };
    r.kisa = await ayarla('ab', { data: 'ok' }); r.ayni = await ayarla('ali', { data: 'ok' }); r.cagri_yok = calls.length;
    r.var = await ayarla('veli', { data: 'var' }); r.bekle = await ayarla('veli2', { data: 'bekle' }); r.gecersiz = await ayarla('admin', { data: 'gecersiz' });
    r.kurulu_degil = await ayarla('veli3', { error: { message: 'Could not find the function public.set_username in the schema cache' } });
    await ayarla('yeniad', { data: 'ok' }); r.yeni = prof.username;
    AU = { u1: { id: 'u1', u: 'veli', c: true, b: false, a: false, bs: 3, xp: 100 }, a1: { id: 'a1', u: 'yonetici', c: true, b: false, a: true, bs: 9, xp: 900 } };
    aAdUser('a1'); r.admin_dugme = !!document.getElementById('u6');
    aAdUser('u1'); r.kullanici_dugme = !!document.getElementById('u6');
    calls.length = 0;
    document.getElementById('u6').click(); await wait(30); document.getElementById('cfn').click(); await wait(30); r.vazgec_cagri = calls.length;
    sb.rpc = async (n, a) => { calls.push([n, a]); return n === 'admin_users' ? { data: [], error: null } : { data: 'ok' }; };
    document.getElementById('u6').click(); await wait(30); document.getElementById('cfy').click(); await wait(30);
    r.iki_asamali = calls.filter(c => c[0] === 'admin_user_delete').length;
    document.getElementById('cfy').click(); await wait(120); r.silme = JSON.stringify(calls.find(c => c[0] === 'admin_user_delete'));
    return r;
  });
  assert.match(o.kisa, /3-16/); assert.match(o.ayni, /zaten/); assert.strictEqual(o.cagri_yok, 0, 'geçersiz ad sunucuya gitmemeli');
  assert.match(o.var, /alınmış/); assert.match(o.bekle, /günde bir/); assert.match(o.gecersiz, /kullanılamaz/); assert.match(o.kurulu_degil, /kurulmadı/);
  assert.strictEqual(o.yeni, 'yeniad');
  assert.strictEqual(o.admin_dugme, false, 'admin hesabında sil düğmesi olmamalı'); assert.strictEqual(o.kullanici_dugme, true);
  assert.strictEqual(o.vazgec_cagri, 0); assert.strictEqual(o.iki_asamali, 0, 'ilk onayda silinmemeli');
  assert.strictEqual(o.silme, '["admin_user_delete",{"_id":"u1"}]');
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok profil/admin: ad değiştirme ve iki aşamalı silme');
  await s.kapat();
})().catch(e => { console.error('HATA profil/admin:', e.message); process.exit(1); });
