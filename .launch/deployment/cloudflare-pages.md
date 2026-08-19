# Cloudflare Pages handoff

This file is deployment preparation only. No Cloudflare project, upload, custom domain, DNS record, or credential was created or changed in this task.

## Source of truth

- Repository: `https://github.com/zhangtongxin888/trade-a-jellycat`
- Production branch: `main`
- Project name: `trade-a-jellycat`
- Production domain: `tradeajellycatguide.wiki`
- Framework: Vite static multi-page site
- Build command: `npm ci && npm run check`
- Build output directory: `dist`
- Root directory: repository root
- Node version tested locally: `22`
- Required build-time environment variables: none

## Non-browser verification completed

1. `wrangler.jsonc` records the project name and `./dist` Pages output.
2. `npm run check` performs source checks, builds all four public pages, then verifies the built output.
3. `public/_headers` adds security headers and immutable caching for hashed assets.
4. `public/robots.txt` and `public/sitemap.xml` use the final production domain.
5. No deployment command has been run.

## Commands reserved for the total-control task

Run these only after browser/Cloudflare access is explicitly released to this site and the Cloudflare Pages project is confirmed to be connected to the independent GitHub repository:

```bash
npm ci
npm run check
npx wrangler pages deployment list --project-name trade-a-jellycat
```

If the total-control task intentionally chooses Direct Upload instead of the required Git-connected project, the documented command is:

```bash
npx wrangler pages deploy dist --project-name trade-a-jellycat --branch main
```

Do not run the Direct Upload command during this preparation task. Cloudflare documents that a Direct Upload project cannot later be switched to Git integration without creating a new project, so Git integration remains the intended path.

## Remaining gated work

- Connect the Cloudflare Pages project to the independent GitHub repository.
- Verify the production deployment and record its deployment ID.
- Bind `tradeajellycatguide.wiki` and `www.tradeajellycatguide.wiki`.
- Configure and verify the chosen `www` redirect.
- Recheck HTTPS, canonical, key pages, `robots.txt`, and `sitemap.xml` on the production domain.
- Verify GSC ownership and submit the sitemap until its status is explicitly `Success`.
