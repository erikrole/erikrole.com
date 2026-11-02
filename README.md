# Erik Role website

Static Astro portfolio at https://erikrole.com. Run `npm ci` and `npm run build` to build the site. Existing typography, content and visual design remain unchanged by the RSS hostname repair.

The portfolio uses its canonical custom domain with Workers.dev and version preview aliases disabled. A host-only 30-day HSTS header starts HTTPS persistence conservatively; it does not apply to unrelated subdomains.

## RSS hostname

`ops/rss-proxy/` owns the separate `rss-reader` Worker route for `rss.erikrole.com/*`. The proxied DNS alias stays pointed at `reader.miniflux.app`; the Worker connects to that provider with its correct TLS hostname. Native Miniflux `/v1/`, Fever `/fever/`, Google Reader `/reader/api/0/` and `/accounts/ClientLogin`, plus `/healthcheck` stay proxied. API methods, paths, queries and app credentials are preserved; Cloudflare Access credentials are stripped before forwarding. Browser routes redirect to the provider: its passkeys use the `reader.miniflux.app` relying-party ID and OAuth also needs the native origin. Web POST bodies are never forwarded; they redirect with 303 to a fresh provider page. Requests and responses are uncached, API redirects stay on the custom hostname, and request query strings are redacted from Worker observability. No new secret is required.

Run `node --test ops/rss-proxy/worker.test.mjs` and `wrangler deploy --dry-run --config ops/rss-proxy/wrangler.jsonc`, then deploy that explicit config. Never use the portfolio config for this Worker. Live checks must cover the browser redirect to the provider and unauthenticated API rejection; synthetic transport tests are not a signed-in Reeder session or a completed passkey login. Official API routes: https://github.com/miniflux/v2/blob/main/internal/http/server/routes.go.
