# Erik Role website

Static Astro portfolio at https://erikrole.com. Run `npm ci` and `npm run build` to build the site. Existing typography, content, assets and portfolio deployment remain unchanged by the RSS hostname repair.

The portfolio uses its canonical custom domain with Workers.dev and version preview aliases disabled. A host-only 30-day HSTS header starts HTTPS persistence conservatively; it does not apply to unrelated subdomains.

## RSS hostname

`ops/rss-proxy/` owns the separate `rss-reader` Worker route for `rss.erikrole.com/*`. The proxied DNS alias stays pointed at `reader.miniflux.app`; the Worker connects to that provider with its correct TLS hostname. Miniflux continues to enforce its existing login and API authentication. API methods, paths, queries and app credentials are preserved; Cloudflare Access credentials are stripped before forwarding. Requests and responses are uncached, redirects stay on the custom hostname, and request query strings are redacted from Worker observability. No new secret is required.

Run `node --test ops/rss-proxy/worker.test.mjs` and `wrangler deploy --dry-run --config ops/rss-proxy/wrangler.jsonc`, then deploy that explicit config. Never use the portfolio config for this Worker. Live checks must cover the login page, session cookie, redirects and unauthenticated API rejection; a synthetic test is not a signed-in Reeder session.
