const PUBLIC_ORIGIN = 'https://rss.erikrole.com';
const UPSTREAM_ORIGIN = 'https://reader.miniflux.app';
const EDGE_COOKIES = /^(?:CF_Authorization|CF_AppSession|__cf_bm|cf_clearance)$/i;

function isReaderApi(path) {
  return /^\/(?:v1|fever)(?:\/|$)/.test(path)
    || /^\/reader\/api\/0(?:\/|$)/.test(path)
    || path === '/accounts/ClientLogin' || path === '/healthcheck';
}

export async function proxyReader(request, transport = fetch) {
  const url = new URL(request.url);
  if (url.origin !== PUBLIC_ORIGIN) return new Response('Not found', { status: 404 });
  const upstream = new URL(UPSTREAM_ORIGIN);
  upstream.pathname = url.pathname;
  upstream.search = url.search;
  // WebAuthn and OAuth must run on the provider's registered browser origin.
  // Native reader APIs keep the existing custom server URL and credentials.
  if (!isReaderApi(url.pathname)) return new Response(null, {
    status: ['GET', 'HEAD'].includes(request.method) ? 302 : 303,
    headers: { location: upstream.href, 'cache-control': 'private, no-store',
      'strict-transport-security': 'max-age=2592000' },
  });
  const headers = new Headers(request.headers);
  for (const name of [...headers.keys()]) if (name.toLowerCase().startsWith('cf-access-')) headers.delete(name);
  for (const name of ['host', 'cf-access-jwt-assertion', 'cf-access-authenticated-user-email', 'cf-authorization', 'x-forwarded-host']) headers.delete(name);
  const cookies = (headers.get('cookie') || '').split(';').map((v) => v.trim()).filter((v) => v && !EDGE_COOKIES.test(v.split('=', 1)[0]));
  if (cookies.length) headers.set('cookie', cookies.join('; ')); else headers.delete('cookie');
  if (headers.get('origin') === PUBLIC_ORIGIN) headers.set('origin', UPSTREAM_ORIGIN);
  const referer = headers.get('referer');
  try { if (referer && new URL(referer).origin === PUBLIC_ORIGIN) headers.set('referer', referer.replace(PUBLIC_ORIGIN, UPSTREAM_ORIGIN)); } catch { headers.delete('referer'); }
  headers.set('cache-control', 'no-cache');
  let response;
  try {
    response = await transport(new Request(upstream, { method: request.method, headers,
      body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body, redirect: 'manual', duplex: 'half' }),
    { cf: { cacheTtl: 0, cacheEverything: false } });
  } catch { return new Response('Reader temporarily unavailable', { status: 502, headers: { 'cache-control': 'no-store' } }); }
  const output = new Headers(response.headers);
  output.set('cache-control', 'private, no-store');
  output.set('pragma', 'no-cache');
  output.delete('expires');
  const location = output.get('location');
  if (location) {
    const target = new URL(location, UPSTREAM_ORIGIN);
    if (target.origin === UPSTREAM_ORIGIN && isReaderApi(target.pathname)) output.set('location', PUBLIC_ORIGIN + target.pathname + target.search + target.hash);
  }
  const setCookies = response.headers.getSetCookie();
  output.delete('set-cookie');
  for (const cookie of setCookies) output.append('set-cookie', cookie.replace(/;\s*Domain=(?:\.?reader\.miniflux\.app|\.?miniflux\.app)(?=;|$)/gi, ''));
  output.set('strict-transport-security', 'max-age=2592000');
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers: output });
}
export default { fetch: (request) => proxyReader(request) };
