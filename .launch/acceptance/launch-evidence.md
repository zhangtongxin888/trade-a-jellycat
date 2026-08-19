# Launch evidence

This is a live evidence table, not a success declaration. Browser, deployment, DNS, domain, and GSC work is intentionally pending because this site has not received the total-control browser lock.

| Check | Formal URL or resource | Checked at (UTC) | Actual result | Evidence |
|---|---|---:|---|---|
| Independent repository | `https://github.com/zhangtongxin888/trade-a-jellycat` | 2026-08-19T14:06:18Z | Local clone confirmed; push pending | `git remote -v` points only to the independent repository |
| Formal repository commit | Independent repository `main` | 2026-08-19T14:06:18Z | Pending commit and push | To be filled after Codex commit |
| Research gate | `.launch/research/research-approved.json` | 2026-08-19T14:04:25Z | Passed | Handoff validator passed; 13 facts approved, including identity, developer, and 9 gameplay/progression facts |
| Design gate | `.launch/acceptance/design-approved.json` | 2026-08-19T14:06:18Z | Pending rendered 375/768/1440 checks | Static review passed after Codex corrections; browser render prohibited before lock |
| Local build | `dist/` | 2026-08-19T14:04:25Z | Passed | Vite 8.2.1 built four HTML pages plus hashed CSS/JS |
| Local tests | `scripts/check-site.mjs` | 2026-08-19T14:04:25Z | Passed | Four pages and four sitemap URLs passed source and built-output checks |
| Dependency audit | npm official audit API | 2026-08-19T14:04:25Z | Passed | `found 0 vulnerabilities` |
| Formal deployment ID/status | Cloudflare Pages project `trade-a-jellycat` | Not checked | Pending total-control release | No remote project or deployment command was used |
| Main-domain HTTPS | `https://tradeajellycatguide.wiki/` | Not checked | Pending deployment and DNS | Browser/network production verification not authorized |
| `www` redirect | `https://www.tradeajellycatguide.wiki/` | Not checked | Pending DNS and redirect configuration | Browser/network production verification not authorized |
| Home page | `https://tradeajellycatguide.wiki/` | Not checked | Local source/build passed; production pending | `dist/index.html` exists |
| Beginner guide | `https://tradeajellycatguide.wiki/beginner-guide/` | Not checked | Local source/build passed; production pending | `dist/beginner-guide/index.html` exists |
| Trading guide | `https://tradeajellycatguide.wiki/trading-guide/` | Not checked | Local source/build passed; production pending | `dist/trading-guide/index.html` exists |
| FAQ | `https://tradeajellycatguide.wiki/faq/` | Not checked | Local source/build passed; production pending | `dist/faq/index.html` exists |
| `robots.txt` HTTP | `https://tradeajellycatguide.wiki/robots.txt` | Not checked | Local file passed; production pending | Allows crawling and declares the final sitemap URL |
| Sitemap HTTP and URL count | `https://tradeajellycatguide.wiki/sitemap.xml` | 2026-08-19T14:04:25Z local only | Local file passed with 4 URLs; production pending | Test asserts all four canonical URLs and exact count |
| Canonical URLs | Four public HTML pages | 2026-08-19T14:04:25Z local only | Passed locally; production pending | Test asserts exact production canonical per page |
| GSC ownership | `tradeajellycatguide.wiki` | Not checked | Pending total-control release | GSC access was not used |
| GSC Sitemap | `https://tradeajellycatguide.wiki/sitemap.xml` | Not checked | Pending; no `Success` state yet | GSC access was not used |

## Actual providers

| Role | Provider | Model | Result or fallback |
|---|---|---|---|
| Research attempt | Grok | Wrapper default | Failed to return structured JSON after initial call and one retry |
| Approved research | Codex | `gpt-5.6-sol` | Fallback research completed and passed the fact gate |
| Candidate design | Kimi | `kimi-code/k3` | Produced the multi-page candidate on the one allowed retry after the first candidate run was stopped for missing fact text |
| Formal implementation and review | Codex | `gpt-5.6-sol` | Selectively integrated, corrected unsupported claims, added SEO, tests, accessibility fixes, and Cloudflare Pages preparation |

## Current state

The non-browser source phase is complete. This task is **not** `待总控验收`, because rendered viewport checks, formal deployment, HTTPS/domain checks, `www`, production robots/Sitemap/canonical verification, GSC ownership, and GSC Sitemap `Success` are still outstanding.
