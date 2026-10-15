import { readFile, mkdir, rm, writeFile, stat } from 'node:fs/promises';

const source = new URL('../dayan.html', import.meta.url);
const output = new URL('../dist/', import.meta.url);
const before = await stat(source);
const html = await readFile(source, 'utf8');
const after = await stat(source);
if (before.size !== after.size || before.mtimeMs !== after.mtimeMs) {
  throw new Error('dayan.html está cambiando. Termina de guardarlo y ejecuta el comando otra vez.');
}
if (!/<\/html\s*>\s*$/i.test(html)) {
  throw new Error('dayan.html está incompleto: falta el cierre </html>. Termina de guardar el archivo antes de compilar.');
}
await rm(output, { recursive: true, force: true });
await mkdir(new URL('assets/', output), { recursive: true });
const types = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'audio/mpeg': 'mp3', 'audio/mp4': 'm4a', 'audio/ogg': 'ogg' };
let count = 0;
const assets = [];
const page = html.replace(/data:([\w.+-]+\/[\w.+-]+);base64,([A-Za-z0-9+/=\r\n]+)/g, (original, type, encoded) => {
  if (!types[type]) return original;
  const name = `assets/media-${++count}.${types[type]}`;
  const data = Buffer.from(encoded.replace(/\s/g, ''), 'base64');
  if (data.length > 25 * 1024 * 1024) throw new Error(`${name} supera el límite de 25 MiB por archivo.`);
  assets.push({ name, data });
  return `/${name}`;
});
for (const { name, data } of assets) await writeFile(new URL(name, output), data);
await writeFile(new URL('index.html', output), page);
await writeFile(new URL('dayan.html', output), page);
console.log(`Sitio preparado en dist/: HTML y ${count} archivos multimedia. Fuente original conservada.`);
