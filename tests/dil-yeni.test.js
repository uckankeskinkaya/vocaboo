// İngilizce modda yeni ekranlarda (görevler, istatistik, profil/menü, öğretmen, ödev, bildirim, izleme, hata mesajları) Türkçe metin kalmamalı.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc({ bekle: 400 });
  const out = await s.sayfa.evaluate(async () => {
    const wait = ms => new Promise(r => setTimeout(r, ms)), sonuc = {};
    localStorage.setItem('ka_lang', 'en');
    const L = 'ERATDSILNO'.split('').map((l, i) => ({ l, n: 40 - i, g: 20 - i }));
    const D = {
      quest_list: { q: [{ k: 's5', cur: 5, goal: 5, rew: 400, claimed: false }, { k: 'f1', cur: 0, goal: 1, rew: 500, claimed: false }, { k: 'n8', cur: 2, goal: 8, rew: 800, claimed: true }], bonus: 500, bonus_claimed: false, all_done: false },
      ach_list: [{ k: 'w10', m: 'solved', cur: 10, goal: 10, rew: 500, claimed: false }, { k: 'w50', m: 'solved', cur: 12, goal: 50, rew: 1000, claimed: false }, { k: 'fr1', m: 'friends', cur: 1, goal: 1, rew: 500, claimed: true }],
      stats_me: { t: { solved: 50, failed: 8, first: 26, guesses: 106, hints: 14, streak: 10, dstreak: 1, dwins: 1 }, dist: [19, 5, 3, 6, 3], days: Array.from({ length: 14 }, (_, i) => ({ d: '2026-10-' + String(i + 1).padStart(2, '0'), w: i % 4 })), letters: L, modes: { s: 33, d: 1, p: 1, m: 1 } },
      teacher_class: [{ id: 's1', u: 'ayse', xp: 500, ws: 8, wf: 2, ds: 2, w7: 6, d7: 3, ls: 100 }, { id: 's2', u: 'veli', xp: 5, ws: 0, wf: 0, ds: 0, w7: 0, d7: 0, ls: null }],
      teacher_student: { days: Array.from({ length: 14 }, (_, i) => ({ d: '2026-10-' + (i + 1), s: i % 3 })) },
      teacher_hard: [{ w: 'budget', d: 'a plan', tr: 'bütçe', n: 4, ok: 1 }],
      teacher_words: [{ id: 7, w: 'harvest', d: 'to gather crops', tr: 'ürün toplamak', x: null }],
      teacher_assign_list: [{ id: 3, title: 'Week 1', due: '2099-01-01', n: 2, created: 'x', students: 4, finished: 1 }],
      teacher_assign_progress: { title: 'Week 1', due: null, n: 2, students: [{ u: 'ayse', done: 2 }, { u: 'veli', done: 0 }] },
      h_list: [{ id: 3, title: 'Week 1', due: '2099-01-01', n: 2, done: 1 }, { id: 5, title: 'Done', due: null, n: 3, done: 3 }, { id: 6, title: 'Late', due: '2020-01-01', n: 3, done: 0 }],
      admin_errors: [{ msg: 'Boom', src: 'a.js:1', n: 3, uname: 'ali', ts: new Date().toISOString() }],
      push_pub: null, push_test: 'ok'
    };
    sb = { rpc: async (n, a) => ({ data: D[n] !== undefined ? D[n] : null, error: null }), functions: { invoke: async () => ({}) } };
    loadProf = async () => {};
    prof = { id: 'a', username: 'ali', avatar: null, frame: null, xp: 300, best_score: 90, best_streak: 5, words_solved: 60, words_failed: 10, first_try: 12, total_points: 2000, daily_streak: 2, best_daily_streak: 3, daily_wins: 4, admin: true, teacher: true, cls: true };
    const topla = (ad, sel) => {
      sweep(); const e = document.querySelector(sel || '#online'); const l = []; if (e) { const w = document.createTreeWalker(e, NodeFilter.SHOW_TEXT); let n; while (n = w.nextNode()) { const t = n.nodeValue.trim(); if (t) l.push(t) } e.querySelectorAll('[placeholder],[aria-label],[title]').forEach(x => ['placeholder', 'aria-label', 'title'].forEach(a => { if (x.getAttribute(a)) l.push('[' + a + '] ' + x.getAttribute(a)) })) }
      sonuc[ad] = l.length ? l : ['HATA öğe yok: ' + ad];
    };
    const ekran = async (ad, f, sel) => { try { await f(); await wait(120); topla(ad, sel) } catch (e) { sonuc[ad] = ['HATA ' + e.message] } };
    document.getElementById('home').hidden = false; rHome(); await wait(150); topla('ana_ekran_karti', '#home');
    await ekran('gorevler', () => aQuests('g')); await ekran('basarilar', () => aQuests('b'));
    await ekran('istatistik', () => aStats());
    await ekran('profil', () => aProfile());
    await ekran('avatar_menusu', async () => { document.getElementById('pfav').click() });
    await ekran('kalem_kullanici_adi', () => aUsername());
    aProfile(); await ekran('menu', () => aPMenu());
    await ekran('odevlerim', () => aOdev());
    await ekran('ogretmen_paneli', () => aTeacher());
    await ekran('ogr_ozet', () => aTClass());
    await ekran('ogr_detay', () => aTStudent('s1', D.teacher_class[0]));
    await ekran('ogr_zor', () => aTHard());
    await ekran('ogr_kelimeler', () => aTWords());
    await ekran('ogr_kelime_form', () => aTWord(null));
    await ekran('ogr_kelime_duzenle', () => { TW = { 7: D.teacher_words[0] }; aTWord(7) });
    await ekran('ogr_toplu', () => aTBulk());
    await ekran('ogr_toplu_hata', async () => { aTBulk(); document.getElementById('tb').value = 'ab | x\nbudget'; sb.rpc = async () => ({ data: 'kelime' }); document.getElementById('ts').click(); await wait(200) });
    sb.rpc = async (n, a) => ({ data: D[n] !== undefined ? D[n] : null, error: null });
    await ekran('ogr_kelime_hatalari', async () => { aTWord(null); sb.rpc = async () => ({ data: 'var' }); document.getElementById('ts').click(); await wait(100) });
    sb.rpc = async (n, a) => ({ data: D[n] !== undefined ? D[n] : null, error: null });
    await ekran('odev_ogretmen', () => aTAssign());
    await ekran('odev_detay', () => aTAssignView(3));
    await ekran('odev_yeni', () => aTAssignNew());
    await ekran('odev_yeni_hata', async () => { aTAssignNew(); await wait(100); sb.rpc = async () => ({ data: { err: 'baslik' } }); document.getElementById('ts').click(); await wait(100) });
    sb.rpc = async (n, a) => ({ data: D[n] !== undefined ? D[n] : null, error: null });
    await ekran('ogr_odev_bos', async () => { sb.rpc = async () => ({ data: [] }); aTAssignNew(); await wait(100) });
    sb.rpc = async (n, a) => ({ data: D[n] !== undefined ? D[n] : null, error: null });
    await ekran('yonetici', () => aAdmin());
    await ekran('hata_gunlugu', () => aAdErrors());
    AU = { u1: { id: 'u1', u: 'veli', c: true, b: false, a: false, t: false, bs: 3, xp: 100 } };
    await ekran('admin_kullanici', () => aAdUser('u1'));
    await ekran('ayarlar', () => aSettings());
    // bildirim ayarları (açık)
    bdDestek = () => true; bdSub = async () => ({ endpoint: 'https://x.example/a' });
    Object.defineProperty(Notification, 'permission', { configurable: true, get: () => 'granted' }); BLD.acik = true;
    await ekran('ayarlar_bildirim_acik', () => aSettings());
    // bildirim ve ödev bildirimleri
    ['Bildirim için giriş yapmalısın', 'Bu tarayıcı bildirimi desteklemiyor (iPhone: önce "Ana ekrana ekle")', 'Bildirim izni verilmedi', 'Bildirim açılamadı', 'Bildirimler kapatıldı', 'Önce bildirimleri aç', 'Biraz bekle, sonra tekrar dene', 'Bildirim aboneliği bulunamadı', 'Test bildirimi gönderildi', 'Gönderilemedi', 'Ödev için internet gerekli', 'Ödev açılamadı', 'Ödev tamamlandı 🎉', 'Bu ödevi tamamladın ✓', 'Türkçe karşılık bulunamadı', 'Çevrimdışı alıştırma: puan ve XP yok', 'Bağlantı geri geldi', 'Bu mod için internet gerekli. Alıştırma çevrimdışı açılır.'].forEach(t => toast(t));
    sweep(); sonuc['bildirimler'] = [...document.querySelectorAll('.toast')].map(t => t.textContent);
    // oyun ekranı: TR düğmesi ve çevrimdışı şerit
    sonuc['tr_dugme'] = [document.getElementById('trbtn') ? (document.getElementById('trbtn').getAttribute('aria-label') || '') : 'Show this sentence in Turkish'];
    return sonuc;
  });
  const TR = /[çğıöşüÇĞİÖŞÜ]|\b(şifre|kullanıcı|rozet|puan|kelime|sıra|haftal|sınıf|giriş|talep|değiş|kaydet|geri|tamam|yönetici|hesab|oyuncu|soru|cevap|doğru|yanlış|süre|seviye|kazan|günlük|oda|ödev|öğretmen|öğrenci|başlık|hata|bugün|gün|yükle|ekle|sil|düzenle|bitir)\w*/i;
  if (process.env.DIL_DUMP) for (const [ad, l] of Object.entries(out)) if (new RegExp(process.env.DIL_DUMP).test(ad)) console.log('## ' + ad + '\n  ' + l.join(' | '));
  const kalan = [];
  // Veri olarak gelen Türkçe (öğretmen kelimesinin Türkçesi vb.) kullanıcı verisidir, çevrilmez
  const VERI = /bütçe|ürün toplamak|^Boom$/;
  for (const [ad, l] of Object.entries(out)) { if (l.some(t => t.startsWith('HATA '))) kalan.push(ad + ': ' + l.find(t => t.startsWith('HATA '))); for (const t of l.filter(t => TR.test(t) && !VERI.test(t) && t !== 'Türkçe')) kalan.push(ad + ': ' + t.slice(0, 100)) }
  assert.deepStrictEqual(kalan, [], 'Çevrilmemiş Türkçe metin:\n  ' + kalan.join('\n  '));
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok dil (yeni ekranlar): ' + Object.keys(out).length + ' ekran İngilizce modda çevrilmiş');
  await s.kapat();
})().catch(e => { console.error('HATA dil-yeni:', e.message); process.exit(1); });
