#!/usr/bin/env python3
"""Henüz çalıştırılmamış, auth/cron/silme içeren SQL dosyalarını tek dosyada sırayla birleştirir: supabase/BEKLEYENLER.sql
Kullanım:  python3 tools/bekleyenler.py
SQL Editor'e bu dosyanın içeriği yapıştırılır. Dosyalar uygulandıktan sonra listeden çıkarılır."""
import pathlib
kok = pathlib.Path(__file__).resolve().parent.parent
SIRA = ['20261005_sifre_sifirlama.sql', '20261005_bakim.sql', '20261005_yedek_ve_zamanlama.sql']
parcalar = ['-- BEKLEYENLER: Supabase SQL Editor\'de tek seferde çalıştır. Otomatik üretildi (tools/bekleyenler.py), elle düzenleme.\n']
for ad in SIRA:
    parcalar.append(f'\n-- ================= {ad} =================\n' + (kok / 'supabase/migrations' / ad).read_text(encoding='utf-8'))
(kok / 'supabase/BEKLEYENLER.sql').write_text(''.join(parcalar), encoding='utf-8')
print('supabase/BEKLEYENLER.sql yazıldı:', ', '.join(SIRA))
