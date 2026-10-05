// index.html'deki ?v= özetleri ve sw.js güncel mi (python3 tools/surum.py çalıştırılmış mı).
const { spawnSync } = require('node:child_process');
const r = spawnSync('python3', ['tools/surum.py', '--kontrol'], { cwd: require('path').resolve(__dirname, '..'), encoding: 'utf8' });
process.stdout.write(r.status === 0 ? 'ok ' + r.stdout : 'HATA ' + r.stdout + r.stderr);
process.exit(r.status);
