# Operations follow-up

- Repaired `rss.erikrole.com` using the isolated, uncached Miniflux API proxy in `ops/rss-proxy/`. Browser pages redirect to the provider's native origin for passkeys/OAuth; native reader API paths keep the custom server URL. Five transport tests cover credential stripping, exact API routing, no caching, and browser redirects without forwarding web POST bodies.
- Preserve Miniflux native authentication and existing Reeder server URL. A signed-in Reeder read/write check requires the actual client session.
- Initial live TLS/API checks passed after DNS propagation. A later compatibility check found the provider's passkey relying-party ID was `reader.miniflux.app`; browser redirects preserve that security boundary. Initial feature source is `56a2bd4`; final commits, checks and proxy deployment versions are recorded in the private Cloudflare implementation report.
- Portfolio uses its canonical custom domain with version/Workers.dev aliases disabled after a source dependency check. Added host-only 30-day HSTS; portfolio visuals and content are unchanged.
