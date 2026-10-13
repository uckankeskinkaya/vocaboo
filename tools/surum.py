#!/usr/bin/env python3
"""index.html içindeki css/js bağlantılarına dosya içeriğinin özetini (?v=...) yazar ve sw.js önbelleğini günceller.

GitHub Pages dosyaları 10 dk önbelleğe aldığı için, değişen bir dosyanın adresi de değişmeli.
Böylece index.html ile js dosyaları hiçbir zaman eski/yeni karışık yüklenmez.
Her değişiklikten sonra çalıştır:  python3 tools/surum.py
Yalnızca kontrol için:             python3 tools/surum.py --kontrol
"""
import hashlib, re, sys, pathlib

KOK = pathlib.Path(__file__).resolve().parent.parent
INDEX = KOK / 'index.html'
SW = KOK / 'sw.js'

def ozet(yol):
    return hashlib.sha256((KOK / yol).read_bytes()).hexdigest()[:8]

def main():
    kontrol = '--kontrol' in sys.argv
    html = INDEX.read_text(encoding='utf-8')
    yeni = re.sub(r'(?P<on>(?:src|href)=")(?P<yol>(?:js|css)/[^"?]+)(?:\?v=[0-9a-f]+)?(?P<son>")',
                  lambda m: f"{m['on']}{m['yol']}?v={ozet(m['yol'])}{m['son']}", html)
    dosyalar = sorted({m.group(1) for m in re.finditer(r'(?:src|href)="((?:js|css)/[^"?]+)', yeni)})
    toplam = hashlib.sha256((''.join(ozet(d) for d in dosyalar) + hashlib.sha256(yeni.replace('?v=', '?').encode()).hexdigest()).encode()).hexdigest()[:8]
    sw = SW.read_text(encoding='utf-8')
    onbellek = "const C='vocaboo-" + toplam + "';"
    yeni_sw = re.sub(r"const C='[^']*';", onbellek, sw, count=1)
    # Önbellekten çevrimdışı açılabilmesi için tüm js/css dosyaları ön yüklenir
    liste = ['./', './index.html', './manifest.webmanifest', './logo.png', './icon-180.png', './icon-192.png', './icon-512.png'] + ['./' + d + '?v=' + ozet(d) for d in dosyalar]
    yeni_sw = re.sub(r"const PRE=\[.*?\];", "const PRE=" + repr(liste).replace('"', "'") + ";", yeni_sw, count=1, flags=re.S)
    if kontrol:
        if yeni != html or yeni_sw != sw:
            print('SURUM ESKI: python3 tools/surum.py çalıştır'); sys.exit(1)
        print('sürüm güncel (' + toplam + ')'); return
    INDEX.write_text(yeni, encoding='utf-8'); SW.write_text(yeni_sw, encoding='utf-8')
    print(f'{len(dosyalar)} dosya, önbellek: vocaboo-{toplam}')

main()
