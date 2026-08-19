# Launch evidence

This is a live evidence table, not a success declaration. Production deployment, DNS, HTTPS, redirects, and public-site checks passed. GSC ownership and sitemap submission are still incomplete because the released Chrome connection timed out before the domain-property submission and the total-control task prohibited another reconnect.

| Check | Formal URL or resource | Checked at (UTC) | Actual result | Evidence |
|---|---|---:|---|---|
| Independent repository | `https://github.com/zhangtongxin888/trade-a-jellycat` | 2026-08-19T15:54:13Z | Passed | `git remote -v` points only to the independent repository |
| Production source commit | `1d2c0e59ab5533df8bf7b270f4ab35d35c5972ef` | 2026-08-19T15:54:13Z | Pushed to independent repository `main` | Local `HEAD` and `git ls-remote origin refs/heads/main` returned the same full SHA |
| Research gate | `.launch/research/research-approved.json` | 2026-08-19T14:04:25Z | Passed | Handoff validator passed; 13 facts approved, including identity, developer, and 9 gameplay/progression facts |
| Design gate | `.launch/acceptance/design-approved.json` | 2026-08-19T15:03:14Z | Passed | Rendered Chrome checks passed at 375x812, 768x900, and 1440x900 with no horizontal overflow; the primary CTA remained visually larger than the Roblox action at every width |
| Local build | `dist/` | 2026-08-19T15:10:28Z | Passed | Vite 8.2.1 built four HTML pages plus hashed CSS/JS from the production source commit |
| Local tests | `scripts/check-site.mjs` | 2026-08-19T15:10:28Z | Passed | Four source pages and four built sitemap URLs passed; the test also requires the rendered design gate and rejects the supplied radar ID from public copy |
| Dependency audit | npm official audit API | 2026-08-19T14:04:25Z | Passed | `found 0 vulnerabilities` |
| Git-connected production project | Vercel project `trade-a-jellycat` | 2026-08-19T15:10:28Z | Passed | The project is connected only to `zhangtongxin888/trade-a-jellycat`; pushes to `main` produced production deployments |
| Release content deployment | `dpl_GJxGm6GxE8UKzqKjNYsqiic7a2JH` | 2026-08-19T15:10:28Z | `READY`, production | Deployment URL: `https://trade-a-jellycat-4dqzwjkz9-zhangtongxin888s-projects.vercel.app`; production aliases were assigned |
| Main-domain HTTPS | `https://tradeajellycatguide.wiki/` | 2026-08-19T15:43:15Z | Passed, HTTP 200 over HTTPS | Vercel served the release HTML with HSTS; plain HTTP returned `308` to the same HTTPS apex |
| `www` redirect | `https://www.tradeajellycatguide.wiki/` | 2026-08-19T15:43:17Z | Passed, HTTP 308 | Vercel project-domain configuration stores `redirect=tradeajellycatguide.wiki` and `redirectStatusCode=308`; the live response location is `https://tradeajellycatguide.wiki/` |
| Home page | `https://tradeajellycatguide.wiki/` | 2026-08-19T15:54:13Z | Passed, HTTP 200 | Live HTML contains the exact apex canonical and the largest primary CTA to `/beginner-guide/` |
| Beginner guide | `https://tradeajellycatguide.wiki/beginner-guide/` | 2026-08-19T15:54:13Z | Passed, HTTP 200 | Live HTML contains the exact page canonical and the approved-fact/tip labels |
| Trading guide | `https://tradeajellycatguide.wiki/trading-guide/` | 2026-08-19T15:54:13Z | Passed, HTTP 200 | Live HTML contains the exact page canonical and approved trading facts |
| FAQ | `https://tradeajellycatguide.wiki/faq/` | 2026-08-19T15:54:13Z | Passed, HTTP 200 | Live HTML contains the exact page canonical and FAQPage structured data |
| `robots.txt` HTTP | `https://tradeajellycatguide.wiki/robots.txt` | 2026-08-19T15:42:39Z | Passed, HTTP 200 | Allows crawling and declares `https://tradeajellycatguide.wiki/sitemap.xml` |
| Sitemap HTTP and URL count | `https://tradeajellycatguide.wiki/sitemap.xml` | 2026-08-19T15:42:39Z | Passed, HTTP 200 with 4 URLs | The live XML contains the apex, beginner guide, trading guide, and FAQ canonical URLs |
| Canonical URLs and rejected-ID check | Four live public HTML pages | 2026-08-19T15:54:13Z | Passed | All four live canonicals are exact, the primary CTA is correct, the final copy correction is present, and rejected ID `84814013871277` is absent from public HTML |
| GSC ownership | Domain property `tradeajellycatguide.wiki` | 2026-08-19T15:53:00Z | Incomplete | The authenticated account's full property search returned no match. Add resource > Website > Domain was opened and the exact domain was entered, but Chrome timed out before `Continue`; no property or verification TXT was created |
| GSC Sitemap | `https://tradeajellycatguide.wiki/sitemap.xml` | 2026-08-19T15:53:00Z | Incomplete; no `Success` receipt | Ownership was not completed, so the sitemap was not submitted |

## Actual providers

| Role | Provider | Model | Result or fallback |
|---|---|---|---|
| Research attempt | Grok | Wrapper default | Failed to return structured JSON after initial call and one retry |
| Approved research | Codex | `gpt-5.6-sol` | Fallback research completed and passed the fact gate |
| Candidate design | Kimi | `kimi-code/k3` | Produced the multi-page candidate on the one allowed retry after the first candidate run was stopped for missing fact text |
| Formal implementation and review | Codex | `gpt-5.6-sol` | Selectively integrated, corrected unsupported claims, added SEO, tests, accessibility fixes, and Vercel production configuration |

## DNS state and exact recovery values

Authoritative nameservers were preserved: `launch1.spaceship.net` and `launch2.spaceship.net`. No unrelated records were present in the authoritative A/AAAA/CNAME/MX/TXT/CAA snapshot and no nameserver change was made.

Current production records, confirmed directly against both authoritative nameservers:

- Apex A: `216.198.79.1`
- Apex A: `64.29.17.1`
- `www` CNAME: `ed8957b8021c499e.vercel-dns-017.com.`

Exact pre-launch recovery state:

- Apex A: `54.149.79.189`
- Apex A: `34.216.117.25`
- `www`: no A, AAAA, CNAME, or TXT record

To restore the pre-launch state, replace the two current apex A values with the two pre-launch A values and remove the current `www` CNAME. Do not change the nameservers or any other record.

## Current state

The production site is live and all non-GSC acceptance checks are complete. This task is **not** `待总控验收`: the exact recovery point is GSC Add resource > Website > Domain for `tradeajellycatguide.wiki`, then obtain the DNS TXT value, add it without changing the three production routing records, verify ownership, submit the full sitemap URL, and capture the `Success` receipt. Chrome was not reconnected after the final timeout and must be reacquired only under a new total-control browser release.
