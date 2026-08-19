# Trade A Jellycat! Guide

Independent, fact-checked guide site for `tradeajellycatguide.wiki`.

## Local checks

```bash
npm ci
npm run check
```

`npm run check` validates the four public pages, primary CTA, approved official link, canonical URLs, structured data, internal links, robots file, sitemap, and built output.

## Public pages

- `/` — overview and core loop
- `/beginner-guide/` — quick start, progression route, and common mistakes
- `/trading-guide/` — verified trading-board controls
- `/faq/` — fact-checked answers and explicit unknowns

## Fact policy

Public copy is limited to facts approved in `.launch/research/research-approved.json`. Exact crate odds, value lists, rarity tiers, codes, update dates, and other unsupported details are intentionally excluded. This is an unofficial guide and uses no external images, brand art, or fonts.

## Hosting preparation

The intended host is Cloudflare Pages connected to this independent repository. Build settings and the remaining gated steps are documented in `.launch/deployment/cloudflare-pages.md`. No deployment, DNS, domain, or GSC operation is performed by the source build.
