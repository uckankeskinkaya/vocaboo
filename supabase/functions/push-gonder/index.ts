// Web Push gönderici. Üç kapı var: (1) pg_cron'dan gelen x-cron-secret başlığı (günlük hatırlatma), (2) giriş yapmış kullanıcının kendi cihazına deneme bildirimi,
// (3) yöneticinin bildirimi açık herkese toplu duyurusu (admin_push_prep ile hazırlanan satır), (4) kullanıcının hata bildirimi -> yöneticilere.
// VAPID anahtarları ilk çağrıda üretilir ve sadece public.push_config tablosunda durur. verify_jwt kapalı: kimlik doğrulama kodun içinde.
import webpush from "npm:web-push@3.6.7";
import { createClient } from "npm:@supabase/supabase-js@2";

const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });
// Tarayıcıdan (test bildirimi) çağrılabilsin diye CORS: kimlik doğrulama yine kodun içinde (x-cron-secret ya da kullanıcı JWT'si).
const cors = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-cron-secret", "Access-Control-Allow-Methods": "POST, OPTIONS" };
const json = (o: unknown, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "Content-Type": "application/json", ...cors } });

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  const { data: cfg } = await sb.from("push_config").select("*").eq("id", 1).single();
  if (!cfg) return json({ err: "ayar yok" }, 500);
  if (!cfg.vapid_public || !cfg.vapid_private) {
    const k = webpush.generateVAPIDKeys();
    await sb.from("push_config").update({ vapid_public: k.publicKey, vapid_private: k.privateKey }).eq("id", 1);
    cfg.vapid_public = k.publicKey; cfg.vapid_private = k.privateKey;
  }
  const secret = req.headers.get("x-cron-secret");
  let body: any = {};
  try { body = await req.json(); } catch { /* boş gövde */ }
  let duyuruId: number | null = null;
  let targets: { endpoint: string; p256dh: string; auth: string; title: string; body: string }[] = [];
  if (secret) {
    if (secret !== cfg.cron_secret) return json({ err: "yetki" }, 401);
    const { data } = await sb.rpc("push_due");
    targets = data || [];
  } else if (body && body.test) {
    const jwt = (req.headers.get("authorization") || "").replace(/^Bearer /i, "");
    const { data: u } = await sb.auth.getUser(jwt);
    if (!u || !u.user) return json({ err: "yetki" }, 401);
    const { data: lg } = await sb.from("push_log").select("ts").eq("user_id", u.user.id).eq("kind", "test").gt("ts", new Date(Date.now() - 90000).toISOString());
    if (!lg || !lg.length) return json({ err: "bekle" }, 429);
    const { data: subs } = await sb.from("push_subs").select("endpoint,p256dh,auth").eq("user_id", u.user.id).eq("active", true);
    targets = (subs || []).map((s: any) => ({ ...s, title: "Vocaboo", body: "Bildirimler çalışıyor! 🐥🤓" }));
  } else if (body && body.duyuru) {
    // Yönetici toplu bildirimi: metin gövdeden değil, yöneticinin az önce hazırladığı push_duyuru satırından okunur (tek kullanımlık).
    const jwt = (req.headers.get("authorization") || "").replace(/^Bearer /i, "");
    const { data: u } = await sb.auth.getUser(jwt);
    if (!u || !u.user) return json({ err: "yetki" }, 401);
    const { data: pr } = await sb.from("profiles").select("admin").eq("id", u.user.id).single();
    if (!pr || !pr.admin) return json({ err: "yetki" }, 403);
    const { data: dy } = await sb.from("push_duyuru").update({ sent_at: new Date().toISOString() })
      .eq("id", Number(body.duyuru)).eq("by_user", u.user.id).is("sent_at", null)
      .gt("ts", new Date(Date.now() - 300000).toISOString()).select("id,title,body").maybeSingle();
    if (!dy) return json({ err: "yok" }, 404);
    duyuruId = dy.id;
    const { data: subs } = await sb.from("push_subs").select("endpoint,p256dh,auth").eq("active", true).limit(5000);
    targets = (subs || []).map((s: any) => ({ ...s, title: dy.title, body: dy.body }));
  } else if (body && body.bug) {
    // Hata bildirimi: gönderen kullanıcı kendi az önceki kaydını bildirir; bildirimi açık yöneticilere gider (tek kullanımlık).
    const jwt = (req.headers.get("authorization") || "").replace(/^Bearer /i, "");
    const { data: u } = await sb.auth.getUser(jwt);
    if (!u || !u.user) return json({ err: "yetki" }, 401);
    const { data: bg } = await sb.from("bug_reports").update({ notified_at: new Date().toISOString() })
      .eq("id", Number(body.bug)).eq("user_id", u.user.id).is("notified_at", null)
      .gt("ts", new Date(Date.now() - 120000).toISOString()).select("id,kat,msg").maybeSingle();
    if (!bg) return json({ err: "yok" }, 404);
    const { data: pr } = await sb.from("profiles").select("username").eq("id", u.user.id).single();
    const { data: ad } = await sb.from("profiles").select("id").eq("admin", true).limit(20);
    const ids = (ad || []).map((x: any) => x.id);
    if (!ids.length) return json({ sent: 0, dead: 0, total: 0, fails: [] });
    const { data: subs } = await sb.from("push_subs").select("endpoint,p256dh,auth").eq("active", true).in("user_id", ids);
    const kat: Record<string, string> = { oyun: "Oyun", online: "Online", gorunum: "Görünüm", hesap: "Hesap", diger: "Diğer" };
    const metin = ((pr && pr.username) || "?") + " · " + (kat[bg.kat] || "Diğer") + ": " + String(bg.msg).slice(0, 120);
    targets = (subs || []).map((s: any) => ({ ...s, title: "🐞 Yeni hata bildirimi", body: metin }));
  } else {
    return json({ ok: true, init: true });
  }
  webpush.setVapidDetails("https://uckankeskinkaya.github.io/vocaboo/", cfg.vapid_public, cfg.vapid_private);
  const dead: string[] = [];
  const fails: { status?: number; msg: string }[] = [];
  let ok = 0;
  await Promise.all(targets.map(async (t) => {
    try {
      await webpush.sendNotification({ endpoint: t.endpoint, keys: { p256dh: t.p256dh, auth: t.auth } }, JSON.stringify({ t: t.title, b: t.body }), { TTL: 3600 });
      ok++;
    } catch (e: any) {
      if (e && (e.statusCode === 404 || e.statusCode === 410)) dead.push(t.endpoint);
      else { console.error("push hatası", e && e.statusCode, e && e.body); if (fails.length < 3) fails.push({ status: e && e.statusCode, msg: String((e && (e.body || e.message)) || e).slice(0, 120) }); }
    }
  }));
  if (dead.length) await sb.rpc("push_dead", { _e: dead });
  if (duyuruId) await sb.from("push_duyuru").update({ sent: ok }).eq("id", duyuruId);
  return json({ sent: ok, dead: dead.length, total: targets.length, fails });
});
