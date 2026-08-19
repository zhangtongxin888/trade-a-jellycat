import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const domain = 'https://tradeajellycatguide.wiki';
const officialRobloxUrl = 'https://www.roblox.com/games/126374004347567/Trade-A-Jellycat';
const rejectedTrackingId = '84814013871277';

const pages = [
  { source: 'index.html', output: 'dist/index.html', canonical: `${domain}/` },
  {
    source: 'beginner-guide/index.html',
    output: 'dist/beginner-guide/index.html',
    canonical: `${domain}/beginner-guide/`,
  },
  {
    source: 'trading-guide/index.html',
    output: 'dist/trading-guide/index.html',
    canonical: `${domain}/trading-guide/`,
  },
  { source: 'faq/index.html', output: 'dist/faq/index.html', canonical: `${domain}/faq/` },
];

const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};

const sourceText = new Map();
for (const page of pages) {
  const html = await readFile(resolve(root, page.source), 'utf8');
  sourceText.set(page.source, html);
  check(/<title>[^<]{20,}[^<]*<\/title>/.test(html), `${page.source}: missing useful title`);
  check(/<meta\s+name="description"[\s\S]*?content="[^"]{80,}"/.test(html), `${page.source}: missing useful meta description`);
  check(html.includes(`<link rel="canonical" href="${page.canonical}"`), `${page.source}: canonical mismatch`);
  check((html.match(/<h1(?:\s|>)/g) ?? []).length === 1, `${page.source}: expected exactly one h1`);
  check(html.includes('href="/beginner-guide/"'), `${page.source}: missing beginner-guide internal link`);
  check(html.includes('href="/trading-guide/"'), `${page.source}: missing trading-guide internal link`);
  check(html.includes('href="/faq/"'), `${page.source}: missing FAQ internal link`);
  check(!html.includes(rejectedTrackingId), `${page.source}: rejected tracking ID leaked into public copy`);
  check(!/<img\b/i.test(html), `${page.source}: image asset requires a documented license`);

  const structuredData = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  check(structuredData.length > 0, `${page.source}: missing structured data`);
  for (const [, json] of structuredData) {
    try {
      JSON.parse(json);
    } catch (error) {
      failures.push(`${page.source}: invalid structured data JSON (${error.message})`);
    }
  }

  const absoluteLinks = [...html.matchAll(/href="(https:\/\/[^"]+)"/g)].map((match) => match[1]);
  for (const url of absoluteLinks) {
    check(
      url.startsWith(domain) || url === officialRobloxUrl,
      `${page.source}: unexpected public external link ${url}`,
    );
  }
}

const home = sourceText.get('index.html');
check(
  home.includes('<a class="btn btn-primary" href="/beginner-guide/">Start the beginner guide</a>'),
  'index.html: largest primary CTA must target the on-site beginner guide',
);
check(home.includes(officialRobloxUrl), 'index.html: verified official Roblox link missing');

const allPublicCopy = [...sourceText.values()].join('\n');
for (const forbidden of [
  'where every new plush comes from',
  'Every Jellycat in your inventory starts life inside a plush crate',
  'Asking for more costs nothing',
  'no official tiers or values exist',
]) {
  check(!allPublicCopy.includes(forbidden), `public copy contains rejected overstatement: ${forbidden}`);
}

const sitemap = await readFile(resolve(root, 'public/sitemap.xml'), 'utf8');
for (const page of pages) {
  check(sitemap.includes(`<loc>${page.canonical}</loc>`), `sitemap missing ${page.canonical}`);
}
check((sitemap.match(/<loc>/g) ?? []).length === pages.length, 'sitemap URL count mismatch');

const robots = await readFile(resolve(root, 'public/robots.txt'), 'utf8');
check(robots.includes(`Sitemap: ${domain}/sitemap.xml`), 'robots.txt sitemap URL mismatch');

const design = JSON.parse(await readFile(resolve(root, '.launch/design/kimi-design-v1.json'), 'utf8'));
check(design.homepage?.hero?.primary_cta?.target === '/beginner-guide/', 'design package primary CTA mismatch');
check(design.provider?.model === 'kimi-code/k3', 'design package must record the actual Kimi K3 model');

if (process.argv.includes('--dist')) {
  for (const page of pages) await access(resolve(root, page.output));
  for (const asset of ['dist/404.html', 'dist/robots.txt', 'dist/sitemap.xml', 'dist/_headers']) {
    await access(resolve(root, asset));
  }
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join('\n'));
  process.exit(1);
}

console.log(`Site checks passed for ${pages.length} pages and ${pages.length} sitemap URLs.`);
