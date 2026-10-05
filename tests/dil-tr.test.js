// Türkçe modda yeni ekranlarda (online menü, oda kurma, Pazar, tema önizleme, günlük bonus) İngilizce metin sızmamalı.
const assert = require('node:assert');
const { sayfaAc } = require('./yardimci');
(async () => {
  const s = await sayfaAc({ bekle: 300 });
  const out = await s.sayfa.evaluate(async () => {
    const wait = ms => new Promise(r => setTimeout(r, ms)), sonuc = {};
    try { localStorage.setItem('ka_lang', 'tr') } catch (e) {}
    const T = ['cyber', 'witcher', 'minecraft', 'galaksi', 'kod', 'aurora'], C = ['ates', 'cyberc', 'orkide', 'zehir'];
    sb = { rpc: async n => n === 'shop_list' ? { data: { bal: 7000, owned: ['theme:kod'], items: T.map(k => ({ id: 'theme:' + k, price: 100000, owned: k === 'kod' })).concat(C.map(k => ({ id: 'frame:' + k, price: 90000, owned: false }))) }, error: null } : { data: null, error: null } };
    window.supabase = { createClient: () => sb }; loadProf = async () => {};
    prof = { id: 'a', username: 'ali', avatar: null, frame: null, xp: 300, best_score: 90, total_points: 2000, points_spent: 0, admin: false, bonus_streak: 3 };
    document.getElementById('online').hidden = false;
    const al = sel => { const e = document.querySelector(sel), l = []; if (e) { const w = document.createTreeWalker(e, NodeFilter.SHOW_TEXT); let n; while (n = w.nextNode()) { const t = n.nodeValue.trim(); if (t) l.push(t) } } return l };
    const ekran = async (ad, f, sel) => { try { await f(); await wait(120); sonuc[ad] = al(sel || '#online') } catch (e) { sonuc[ad] = ['HATA ' + e.message] } };
    await ekran('online_menu', () => oHome());
    await ekran('oda_kur', () => oSetup());
    await ekran('oda_kur_hayatta', () => { document.querySelector('[data-mode=s]').click(); document.querySelector('[data-ppl="50"]').click() });
    await ekran('oda_kur_arena', () => document.querySelector('[data-mode=k]').click());
    await ekran('pazar_temalar', () => aShop('t'));
    await ekran('pazar_cerceveler', () => aShop('f'));
    await ekran('tema_sec', () => aTheme());
    await ekran('onizleme', async () => { aShop('t'); await wait(150); thPrev('witcher', 145000, false) }, '#tpv'); thPrevEnd();
    prof.last_bonus = null; document.getElementById('home').hidden = false; rHome(); sonuc.bonus_ilk = al('#gbonus');
    prof.last_bonus = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Istanbul' }).format(new Date()); rHome(); sonuc.bonus_alindi = al('#gbonus');
    return sonuc;
  });
  const EN = /\b(Preview|Buy|Close|Apply|Room|Join|Options|Level|Mixed|Survival|Points race|Group|Create room|Back|Owned|Balance|Choose|Random match|Have a|Game mode|players|questions|minutes|words|Moderator|Day \d|Themes|Frames|Live|fan-made)\b/;
  const kalan = [];
  for (const [ad, l] of Object.entries(out)) { const h = l.find(t => t.startsWith('HATA ')); if (h) kalan.push(ad + ': ' + h); for (const t of l.filter(t => EN.test(t))) kalan.push(ad + ': ' + t.slice(0, 80)); }
  assert.deepStrictEqual(kalan, [], 'Türkçe modda İngilizce metin:\n  ' + kalan.join('\n  '));
  assert.ok(Object.values(out).every(l => l.length > 2), 'bir ekran boş');
  assert.deepStrictEqual(s.hatalar, []);
  console.log('ok dil (Türkçe): ' + Object.keys(out).length + ' yeni ekranda İngilizce metin sızıntısı yok');
  await s.kapat();
})().catch(e => { console.error('HATA dil-tr:', e.message); process.exit(1); });
