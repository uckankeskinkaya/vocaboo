// Sınıf geri bildirimi: Pazar/Arkadaşlar ekranı alıştırma düğmelerini bozmaz, profil fotoğrafı seçici yerinde,
// boş Sınıf seviyesi çökmez, B2+ gizli, 1v1'de rakip puanı/çerçevesi sunucudan, rekabetçi modda kopyalama kapalı.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc();
  const o = await s.sayfa.evaluate(async () => {
    const wait = ms => new Promise(r => setTimeout(r, ms)), r = { toasts: [], cagri: [] };
    const h = document.getElementById('how'); if (h) h.hidden = true;
    loadProf = async () => {};
    prof = { id: 'u1', username: 'ali', xp: 5, banned: false, total_points: 0, points_spent: 0, avatar: null, frame: null, cls: true };
    let sonuc = { done: false, left: 2, mode: 'c', players: [{ u: 'ali', im: '', fr: null, sc: 50, w: 1, a: true, f: false, me: true }, { u: 'uzunkullaniciad1', im: 'p:panda', fr: 'altin', sc: 240, w: 3, a: true, f: false, me: false }] };
    sb = { rpc: async (n, a) => { r.cagri.push(n);
        if (n === 'shop_list') return { data: { bal: 10, owned: [], items: [{ id: 'theme:kod', price: 100, owned: false }] }, error: null };
        if (n === 'class_list') return { data: [{ id: 'x1', on: true, ls: 0, u: 'veli', im: '', fr: null, xp: 0, bs: 0 }], error: null };
        if (n === 'p_next') return a._l === 4 ? { data: null, error: { message: 'kelime yok' } } : { data: { def: 'a test word', len: 6, tries: 5, lvl: a._l, guesses: [] }, error: null };
        if (n === 'm_results') return { data: sonuc, error: null };
        if (n === 'm_join') return { data: { ok: true }, error: null };
        if (n === 'm_next') return { data: { def: 'a thing you sit on', len: 5, tries: 5, lvl: 0, idx: 0, guesses: [] }, error: null };
        return { data: null, error: null }; },
      from: () => { const q = { select: () => q, limit: () => q, in: () => q, eq: () => q, order: () => q, then: f => f({ data: [], error: null }) }; return q; },
      removeChannel() {}, auth: { getUser: async () => ({ data: { user: { id: 'u1' } } }) } };
    const _t = toast; toast = m => { r.toasts.push(m); _t(m) };
    // 1) Pazar ve Sınıftakiler ekranı açılıp kapanınca alıştırma düğmeleri hâlâ alıştırmayı açar
    rHome(); await wait(50); await aShop('t'); await wait(100);
    if (typeof aFriends === 'function') { await aFriends('c'); await wait(100); }
    oExit(); rHome(); document.getElementById('mPractice').click(); await wait(50);
    r.b2arti = getComputedStyle(document.querySelector('#lvls .lvl[data-i="3"]')).display;
    r.cagri = []; document.querySelector('#lvls .lvl[data-i="1"]').click(); await wait(400);
    r.alistirma = { oyun: !document.getElementById('game').hidden, mode, pnext: r.cagri.includes('p_next'), davet: r.cagri.includes('invite_send') };
    // 2) boş Sınıf seviyesi: çökmez, uyarı verir
    document.getElementById('game').hidden = true; document.getElementById('home').hidden = false; document.getElementById('mPractice').click();
    const sinif = document.querySelector('#lvls .lvl[data-i="4"]'); r.sinifVar = !!sinif;
    if (sinif) { sinif.click(); await wait(1200); }
    // 3) rekabetçi değil (alıştırma): kopyalama serbest
    // 4) profil: fotoğraf seçici sayfada kalır
    document.getElementById('menu').hidden = true;
    aProfile(); await wait(50);
    r.pfVar = !!document.getElementById('pf');
    document.getElementById('pfav').click(); let tik = 0; document.getElementById('pf').addEventListener('click', e => { tik++; e.preventDefault(); });
    document.getElementById('pf2').click(); r.pfTik = tik;
    // 5) 1v1: rakibin puanı ve çerçevesi presence'ta olmasa da sunucudan gelir
    oExit(); myName = 'ali';
    const pres = {};
    ch = { presenceState: () => { pres[myId] = [mine()]; return pres; }, track() {}, send() {}, unsubscribe() {} };
    room = 'ABCD'; isHost = true; started = false;
    oBegin({ c: { max: 2, m: 'c', n: 15, dur: 0, l: -1, mod: 0 }, seed: 1 });
    await wait(6800);
    const live = document.getElementById('live');
    r.vs = { yazi: live.innerText.replace(/\s+/g, ' '), cerceve: live.querySelectorAll('.mv.r .fq').length, rozet: document.getElementById('badge').textContent };
    // 6) rekabetçi modda kopyalama engelli
    await wait(500);
    r.nocp = document.body.classList.contains('nocp');
    const ev = new Event('copy', { bubbles: true, cancelable: true }); document.getElementById('defrow').dispatchEvent(ev); r.kopyaEngel = ev.defaultPrevented;
    oExit(); await wait(500);
    const ev2 = new Event('copy', { bubbles: true, cancelable: true }); document.body.dispatchEvent(ev2); r.kopyaSerbest = !ev2.defaultPrevented && !document.body.classList.contains('nocp');
    return r;
  });
  assert.strictEqual(o.b2arti, 'none', 'B2+ seviyesi gizli olmalı');
  assert.deepStrictEqual(o.alistirma, { oyun: true, mode: 'practice', pnext: true, davet: false }, 'Pazar/Arkadaşlar sonrası alıştırma açılmalı: ' + JSON.stringify(o.alistirma));
  assert.ok(o.sinifVar, 'sınıf üyesi Sınıf seviyesini görmeli');
  assert.ok(o.toasts.includes('Öğretmen henüz sınıf kelimesi eklemedi.'), 'boş sınıf seviyesi uyarısı: ' + o.toasts.join('|'));
  assert.ok(o.pfVar, 'fotoğraf seçici (#pf) sayfada kalmalı'); assert.strictEqual(o.pfTik, 1, '"Profil fotoğrafı yükle" seçiciyi açmalı');
  assert.match(o.vs.yazi, /uzunkullaniciad1/); assert.match(o.vs.yazi, /240 puan/, 'rakibin puanı sunucudan gelmeli: ' + o.vs.yazi);
  assert.strictEqual(o.vs.cerceve, 1, 'rakibin çerçevesi görünmeli'); assert.strictEqual(o.vs.rozet, 'Kelime 1/15');
  assert.ok(o.nocp && o.kopyaEngel, 'maçta kopyalama engellenmeli'); assert.ok(o.kopyaSerbest, 'maç dışında kopyalama serbest');
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok sınıf düzeltmeleri: alıştırma düğmeleri, boş sınıf seviyesi, profil fotoğrafı, B2+ gizli, 1v1 sunucu skoru/çerçeve, kopya engeli');
  await s.kapat();
})().catch(e => { console.error('HATA sınıf düzeltmeleri:', e.message); process.exit(1); });
