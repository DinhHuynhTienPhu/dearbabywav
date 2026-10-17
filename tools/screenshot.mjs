// Chụp 1 vùng của trang bằng Chrome headless (qua DevTools protocol), không cần cài thêm package.
// Dùng: node tools/screenshot.mjs <url> <out.png> <width> <height> <mobile 0|1> [cssSelector] [waitMs] [jsBeforeShot]
// Ví dụ: node tools/screenshot.mjs http://localhost:5055/ out.png 390 844 1 ".links-grid-container"
// jsBeforeShot: đoạn JS chạy sau khi cuộn, trước khi chụp (vd mở menu: "document.querySelector('.nav-toggle').click()")
// cssSelector để "" nếu không cần cuộn. Biến môi trường AFTER_JS_WAIT (ms, mặc định 600) = thời gian chờ sau jsBeforeShot
// (tăng lên ~2500 nếu JS làm hiện ảnh lazy mới, vd đổi dropdown unit).
import { spawn } from 'node:child_process';
import { writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const [url, out, w, h, mobile, selector, waitMs = '5000', jsBeforeShot] = process.argv.slice(2);
const chrome = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const profile = mkdtempSync(join(tmpdir(), 'cdp-'));
const port = 9333 + Math.floor(Math.random() * 500);
const proc = spawn(chrome, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, '--no-first-run', '--hide-scrollbars', 'about:blank']);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let target;
for (let i = 0; i < 50 && !target; i++) {
  await sleep(200);
  try {
    const list = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
    target = list.find((t) => t.type === 'page');
  } catch {}
}
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r));
let id = 0;
const pending = new Map();
ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
});
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });

await send('Emulation.setDeviceMetricsOverride', { width: +w, height: +h, deviceScaleFactor: 1, mobile: mobile === '1' });
await send('Page.enable');
await send('Page.navigate', { url });
await sleep(3000);
if (selector) {
  // cuộn để phần tử nằm sát dưới header (header cao ~80px)
  await send('Runtime.evaluate', { expression: `(() => { const g = document.querySelector(${JSON.stringify(selector)}); window.scrollTo(0, g.getBoundingClientRect().top + window.scrollY - 80); })()` });
}
// ảnh có loading="lazy" cần thời gian tải sau khi cuộn
await sleep(+waitMs);
if (jsBeforeShot) {
  await send('Runtime.evaluate', { expression: jsBeforeShot });
  await sleep(+(process.env.AFTER_JS_WAIT || 600));
}
const shot = await send('Page.captureScreenshot', { format: 'png' });
writeFileSync(out, Buffer.from(shot.result.data, 'base64'));
console.log('saved', out);
ws.close();
proc.kill();
process.exit(0);
