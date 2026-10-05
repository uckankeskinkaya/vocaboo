// Tüm testleri sırayla çalıştırır:  node tests/calistir.js
const { readdirSync } = require('fs');
const { spawnSync } = require('child_process');
const testler = readdirSync(__dirname).filter(f => f.endsWith('.test.js')).sort();
let hata = 0;
for (const t of testler) { const r = spawnSync('node', [require('path').join(__dirname, t)], { encoding: 'utf8' }); process.stdout.write(r.stdout + r.stderr); if (r.status !== 0) hata++; }
console.log(hata ? `\n${hata}/${testler.length} test BAŞARISIZ` : `\n${testler.length}/${testler.length} test geçti`);
process.exit(hata ? 1 : 0);
