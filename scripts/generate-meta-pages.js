import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

const baseHtmlPath = path.join(distDir, 'index.html');
if (!fs.existsSync(baseHtmlPath)) {
  console.error('Error: dist/index.html does not exist. Run vite build before generating meta pages.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(baseHtmlPath, 'utf8');

const locales = [
  {
    lang: 'he',
    dir: 'rtl',
    title: 'Tidoco — בקרוב',
    desc: 'Tidoco מגיעה בקרוב. דרך פשוטה יותר לגלות שירותים ולנהל תורים.',
    locale: 'he_IL',
    url: 'https://tidoco.com/he/',
  },
  {
    lang: 'ar',
    dir: 'rtl',
    title: 'Tidoco — قريباً',
    desc: 'Tidoco قريباً. طريقة أبسط لاكتشاف الخدمات وإدارة الحجوزات.',
    locale: 'ar_AR',
    url: 'https://tidoco.com/ar/',
  },
];

for (const loc of locales) {
  let html = baseHtml;

  // 1. Language and direction attribute on <html>
  html = html.replace(/<html[^>]*>/i, `<html lang="${loc.lang}" dir="${loc.dir}">`);

  // 2. Title tag
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${loc.title}</title>`);

  // 3. Meta description
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${loc.desc}" />`
  );

  // 4. Open Graph meta tags
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${loc.title}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${loc.desc}" />`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${loc.url}" />`
  );
  html = html.replace(
    /<meta\s+property="og:locale"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:locale" content="${loc.locale}" />`
  );

  // 5. Twitter Card meta tags
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${loc.title}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${loc.desc}" />`
  );

  const outDir = path.join(distDir, loc.lang);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
  console.log(`✓ Generated ${loc.lang.toUpperCase()} static landing page: dist/${loc.lang}/index.html`);
}

// Ensure 404.html is updated for SPA routing on GitHub Pages
fs.copyFileSync(baseHtmlPath, path.join(distDir, '404.html'));
console.log('✓ Copied dist/index.html -> dist/404.html for GitHub Pages fallback');

