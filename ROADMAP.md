# Operations follow-up

- Repaired `rss.erikrole.com` using the isolated, uncached Miniflux proxy in `ops/rss-proxy/`. Live TLS and login-page checks pass, with private/no-store responses. Four transport tests preserve native credentials and reject upstream-host changes while stripping Cloudflare service credentials.
- Preserve Miniflux native authentication and existing Reeder server URL. A signed-in Reeder read/write check requires the actual client session.
- Portfolio uses its canonical custom domain with version/Workers.dev aliases disabled after a source dependency check. Added host-only 30-day HSTS; portfolio visuals and content are unchanged.
