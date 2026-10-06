// Web Push gönderici. İki kapı var: (1) pg_cron'dan gelen x-cron-secret başlığı (günlük hatırlatma), (2) giriş yapmış kullanıcının kendi cihazına deneme bildirimi.
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
  return json({ sent: ok, dead: dead.length, total: targets.length, fails });
});
