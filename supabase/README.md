# Supabase SQL kayıtları

`migrations/` altındaki dosyalar veritabanında yapılan (ya da yapılacak) değişikliklerdir. Geri dönüş: `GERI_DONUS.sql`.

| Dosya | Durum |
|---|---|
| `20261005_guvenlik_yetki_sikilastirma.sql` | uygulandı |
| `20261005_ban_oturum_duzeyi.sql` | uygulandı |
| `20261005_kullanici_adi_ve_silme.sql` | uygulandı |
| `20261005_realtime_ozel_kanal.sql` | uygulandı (panelde **Realtime > Settings > Allow public access** kapatılmalı) |
| `20261005_haftalik_sampiyon.sql` | uygulandı |
| `20261005_sifre_sifirlama.sql` | **BEKLİYOR** → `BEKLEYENLER.sql` içinde |
| `20261005_bakim.sql` | **BEKLİYOR** → `BEKLEYENLER.sql` içinde |
| `20261005_yedek_ve_zamanlama.sql` | **BEKLİYOR** → `BEKLEYENLER.sql` içinde |

**Bekleyenleri uygulamak:** `BEKLEYENLER.sql` dosyasının içeriğini Supabase **SQL Editor**'e yapıştırıp **Run**'a bas.
(Dosya `python3 tools/bekleyenler.py` ile üretilir. `auth` şemasına yazan, `pg_cron` kuran ve kayıt silen SQL'ler otomatik uygulanamadığı için burada toplanır.)

Yedekler:
- `yedek_20261005` şeması: güvenlik değişikliğinden önceki fonksiyon, politika ve yetki yedeği (elle alındı).
- `yedek_otomatik` şeması: `BEKLEYENLER.sql` çalıştırılınca 2 günde bir tarihli tablo kopyaları (son 4 gün saklanır).
- `.github/workflows/yedek.yml`: isteğe bağlı şifreli harici yedek (gizli değerler girilirse çalışır).
