// Arena sunucu fonksiyonlarının (a_host, a_join, a_q, a_cur, a_ans, a_prog, a_reveal, a_final) JS taklidi.
// Gerçek SQL ile aynı kurallar: yalnızca kurucu soru ilerletir/açıklar, cevaplar yanıtta yok, erken/geç cevap reddedilir,
// puan = round(1000*(1-min(dt/T,1)/2))*(x2?2:1)+min(seri,5)*100, açıklama tekrar çağrılırsa aynı sonuç.
module.exports = function arenaSunucu({ hazirlik = 0, sorular }) {
  const A = { cur: -1, qStart: null, awarded: false, host: null, T: 20, n: sorular.length, qs: sorular.map(q => ({ ...q, rev: null })), uyeler: {}, cevap: {} };
  const kullanici = {};
  const top = () => Object.entries(A.uyeler).map(([id, s]) => ({ k: kullanici[id], n: kullanici[id], p: s.score })).sort((a, b) => b.p - a.p || a.n.localeCompare(b.n));
  const uye = id => A.host === id || A.uyeler[id];
  const gorunur = q => ({ i: A.cur, n: A.n, t: q.t, q: q.q, o: q.o || [], x2: !!q.x2, len: q.len || null, sc: q.sc || null });
  const cagrilar = [];
  const rpc = (id, ad, a = {}) => {
    cagrilar.push([id, ad, a]);
    const q = A.qs[A.cur];
    switch (ad) {
      case 'a_host': A.host = id; kullanici[id] = kullanici[id]; return 'ok';
      case 'a_join': if (A.host === id) return 'mod'; if (A.awarded) return 'yok'; A.uyeler[id] = A.uyeler[id] || { score: 0, streak: 0, correct: 0, answered: 0, xp: null }; return 'ok';
      case 'a_q': { if (A.host !== id) return null; if (a._i === A.cur + 1) { A.cur = a._i; A.qStart = Date.now() + hazirlik; } else if (a._i !== A.cur) return null; return gorunur(A.qs[A.cur]); }
      case 'a_cur': {
        if (!uye(id) || A.cur < 0) return null;
        const c = { m: 'k', max: 50, n: A.n, dur: 0, l: -1, mod: 1, T: A.T };
        if (A.awarded) return { c, f: top() };
        if (q.rev) return { c, i: A.cur, r: q.rev };
        return { c, ...gorunur(q), el: Date.now() - A.qStart };
      }
      case 'a_ans': {
        const u = A.uyeler[id]; if (!u || A.cur !== a._i) return 'yok';
        const t = Date.now(); if (t < A.qStart - 300 || t > A.qStart + A.T * 1000 + 1500) return 'gec';
        if (q.t === 'ty' ? !/^[a-z]{1,20}$/.test(a._c) : !/^[0-3]$/.test(a._c) || +a._c >= q.o.length) return 'gecersiz';
        A.cevap[A.cur + ':' + id] = A.cevap[A.cur + ':' + id] || { c: a._c, at: t }; return 'ok';
      }
      case 'a_prog': if (A.host !== id) return null; return { n: Object.keys(A.cevap).filter(k => k.startsWith(A.cur + ':')).length, m: Object.keys(A.uyeler).length };
      case 'a_reveal': {
        if (A.host !== id || A.cur < 0) return null; if (q.rev) return q.rev;
        const d = q.t === 'ty' ? [0, 0] : q.o.map(() => 0), pts = {}, st = {};
        for (const [uid, s] of Object.entries(A.uyeler)) {
          const an = A.cevap[A.cur + ':' + uid], nm = kullanici[uid];
          if (!an) { s.streak = 0; pts[nm] = -1; st[nm] = 0; continue; }
          const ok = q.t === 'ty' ? an.c === q.ans_t : +an.c === q.ans_i;
          if (q.t === 'ty') d[ok ? 0 : 1]++; else d[+an.c]++;
          if (ok) { const dt = Math.max(0, an.at - A.qStart); const p = Math.round(1000 * (1 - Math.min(dt / (A.T * 1000), 1) / 2)) * (q.x2 ? 2 : 1) + Math.min(s.streak, 5) * 100; s.score += p; s.streak++; s.correct++; pts[nm] = p; }
          else { s.streak = 0; pts[nm] = 0; }
          s.answered++; st[nm] = s.streak;
        }
        q.rev = { a: q.t === 'ty' ? q.ans_t : q.ans_i, d, pts, st, top: top(), t: q.t }; return q.rev;
      }
      case 'a_final': {
        if (!uye(id)) return null; if (!A.qs[A.n - 1].rev) return null;
        if (!A.awarded) { for (const s of Object.values(A.uyeler)) s.xp = 20 + s.correct * 10; A.awarded = true; }
        const xp = {}; for (const [uid, s] of Object.entries(A.uyeler)) xp[kullanici[uid]] = s.xp; return { top: top(), xp };
      }
      default: return null;
    }
  };
  return { rpc, A, kullanici, cagrilar };
};
