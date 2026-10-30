-- Yönetici toplu bildirimi: bildirimi açık tüm kullanıcılara (ör. "Güncelleme bitti").
-- Metin sadece bu tabloda durur; sunucu işlevi (push-gonder) gövdedeki metne değil, yöneticinin hazırladığı satıra bakar.
create table if not exists public.push_duyuru (
  id bigserial primary key,
  by_user uuid not null references auth.users(id) on delete cascade,
  title text not null check (length(title) between 1 and 60),
  body text not null check (length(body) between 1 and 200),
  ts timestamptz not null default now(),
  sent_at timestamptz,
  sent int
);
alter table public.push_duyuru enable row level security;
revoke all on public.push_duyuru from anon, authenticated;

-- Kaç kişiye gider (aktif aboneliği olan kullanıcı sayısı ve cihaz sayısı)
create or replace function public.admin_push_count()
 returns jsonb language plpgsql security definer set search_path to 'public' as $$
begin
  if not is_admin() then raise exception 'yetki yok'; end if;
  return jsonb_build_object('kisi', (select count(distinct user_id) from push_subs where active),
                            'cihaz', (select count(*) from push_subs where active),
                            'son', (select max(sent_at) from push_duyuru));
end $$;

-- Mesajı hazırla: en fazla 2 dakikada bir, metin temizlenir. Döner: {id} ya da {err}
create or replace function public.admin_push_prep(_t text, _b text)
 returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare u uuid := auth.uid(); i bigint;
begin
  if u is null or not is_admin() then raise exception 'yetki yok'; end if;
  _t := btrim(regexp_replace(coalesce(_t, ''), '[<>\r\n\t]', ' ', 'g'));
  _b := btrim(regexp_replace(coalesce(_b, ''), '[<>\r\t]', ' ', 'g'));
  if length(_t) not between 1 and 60 or length(_b) not between 1 and 200 then return jsonb_build_object('err', 'uzunluk'); end if;
  if exists (select 1 from push_duyuru where ts > now() - interval '2 minutes') then return jsonb_build_object('err', 'bekle'); end if;
  insert into push_duyuru(by_user, title, body) values (u, _t, _b) returning id into i;
  return jsonb_build_object('id', i);
end $$;
revoke all on function public.admin_push_count() from public, anon;
revoke all on function public.admin_push_prep(text, text) from public, anon;
grant execute on function public.admin_push_count() to authenticated;
grant execute on function public.admin_push_prep(text, text) to authenticated;
