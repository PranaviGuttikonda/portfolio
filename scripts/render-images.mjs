// Given: the Open Graph image and favicon PNGs should come from editable sources.
// Approach: screenshot the sources in scripts/images/ with the local Chrome
//   (playwright-core, channel "chrome"). Run with `npm run images`.
import { chromium } from 'playwright-core';
import { copyFile, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const here = (p) => fileURLToPath(new URL(p, import.meta.url));
const out = (p) => fileURLToPath(new URL(`../public/${p}`, import.meta.url));

const browser = await chromium.launch({ channel: 'chrome' });

// og-image.png: 1200×630 from the HTML template (waits for the web fonts).
const og = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await og.goto(`file://${here('./images/og-image.html')}`, { waitUntil: 'networkidle' });
await og.evaluate(() => document.fonts.ready);
await og.screenshot({ path: out('og-image.png') });

// favicon.svg is copied as is; PNG fallbacks are rendered from it.
const svg = await readFile(here('./images/favicon.svg'), 'utf8');
await copyFile(here('./images/favicon.svg'), out('favicon.svg'));
const icons = [
  { file: 'favicon-32.png', size: 32, bg: 'transparent' },
  // iOS masks its own corners, so the touch icon gets a solid square background.
  { file: 'apple-touch-icon.png', size: 180, bg: '#0B1220' },
];
for (const { file, size, bg } of icons) {
  const page = await browser.newPage({ viewport: { width: size, height: size } });
  await page.setContent(
    `<style>*{margin:0}html,body{width:${size}px;height:${size}px;background:${bg}}svg{display:block;width:${size}px;height:${size}px}</style>${svg}`,
  );
  await page.screenshot({ path: out(file), omitBackground: bg === 'transparent' });
}

await browser.close();
console.log('Wrote public/og-image.png, favicon.svg, favicon-32.png, apple-touch-icon.png');
