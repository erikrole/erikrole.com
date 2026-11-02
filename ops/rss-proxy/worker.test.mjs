import { test } from 'node:test';
import assert from 'node:assert/strict';
import { proxyReader } from './worker.mjs';
test('keeps API method, path, query and provider credentials; strips Cloudflare credentials and prevents caching',async()=>{
 const res=await proxyReader(new Request('https://rss.erikrole.com/v1/entries?status=unread',{method:'POST',body:'{}',headers:{authorization:'Basic synthetic','x-auth-token':'synthetic-api',cookie:'MinifluxSessionID=synthetic; CF_Authorization=private-edge','cf-access-jwt-assertion':'private-edge','cf-access-client-id':'synthetic-edge-id','cf-access-client-secret':'synthetic-edge-secret',origin:'https://rss.erikrole.com'}}),async(req,options)=>{
  assert.equal(req.url,'https://reader.miniflux.app/v1/entries?status=unread');assert.equal(req.method,'POST');assert.equal(await req.text(),'{}');assert.equal(req.headers.get('authorization'),'Basic synthetic');assert.equal(req.headers.get('x-auth-token'),'synthetic-api');assert.equal(req.headers.get('cookie'),'MinifluxSessionID=synthetic');assert.equal(req.headers.get('cf-access-jwt-assertion'),null);assert.equal(req.headers.get('cf-access-client-id'),null);assert.equal(req.headers.get('cf-access-client-secret'),null);assert.equal(req.headers.get('origin'),'https://reader.miniflux.app');assert.equal(req.redirect,'manual');assert.equal(options.cf.cacheTtl,0);return new Response('{}',{headers:{'cache-control':'public,max-age=60'}});
 });assert.equal(res.headers.get('cache-control'),'private, no-store');
});
test('keeps API redirects on the custom host and strips the provider cookie domain',async()=>{
 const res=await proxyReader(new Request('https://rss.erikrole.com/fever'),async()=>new Response(null,{status:301,headers:{location:'https://reader.miniflux.app/fever/','set-cookie':'MinifluxSessionID=synthetic; Path=/; Domain=reader.miniflux.app; Secure; HttpOnly; SameSite=Lax'}}));
 assert.equal(res.headers.get('location'),'https://rss.erikrole.com/fever/');assert.equal(res.headers.get('set-cookie'),'MinifluxSessionID=synthetic; Path=/; Secure; HttpOnly; SameSite=Lax');
 const login=await proxyReader(new Request('https://rss.erikrole.com/v1/me'),async()=>new Response(null,{status:302,headers:{location:'https://reader.miniflux.app/login'}}));
 assert.equal(login.headers.get('location'),'https://reader.miniflux.app/login');
});
test('rejects other hosts, preserves untrusted Origin for upstream CSRF checks and fails without leaking errors',async()=>{
 assert.equal((await proxyReader(new Request('https://other.erikrole.com/'),async()=>{throw new Error('must not fetch');})).status,404);
 await proxyReader(new Request('https://rss.erikrole.com/v1/me',{headers:{origin:'https://untrusted.example'}}),async(req)=>{assert.equal(req.headers.get('origin'),'https://untrusted.example');return new Response('ok');});
 const res=await proxyReader(new Request('https://rss.erikrole.com/v1/me'),async()=>{throw new Error('private details');});assert.equal(res.status,502);assert.equal(await res.text(),'Reader temporarily unavailable');
});
test('web navigation uses the provider origin for passkeys and OAuth without forwarding cookies or bodies',async()=>{
 for (const path of ['/', '/unread?search=coffee', '/oauth2/google', '/webauthn/login/begin', '//untrusted.example/v1']) {
  const res=await proxyReader(new Request('https://rss.erikrole.com'+path,{headers:{cookie:'MinifluxSessionID=synthetic'}}),async()=>{throw new Error('web routes must not fetch');});
  const target=new URL(res.headers.get('location'));assert.equal(target.origin,'https://reader.miniflux.app');assert.equal(res.status,302);assert.equal(res.headers.get('cache-control'),'private, no-store');
 }
 const post=await proxyReader(new Request('https://rss.erikrole.com/login',{method:'POST',body:'password=synthetic'}),async()=>{throw new Error('web credentials must not be proxied');});
 assert.equal(post.status,303);assert.equal(post.headers.get('location'),'https://reader.miniflux.app/login');
});
test('all native reader API families preserve their path and stay proxied even with HTML Accept',async()=>{
 for (const path of ['/v1/me','/fever/?api','/reader/api/0/token','/accounts/ClientLogin','/healthcheck']) {
  let called=false;
  await proxyReader(new Request('https://rss.erikrole.com'+path,{headers:{accept:'text/html'}}),async(req)=>{called=true;assert.equal(req.url,'https://reader.miniflux.app'+path);return new Response('ok');});
  assert.equal(called,true);
 }
 for (const path of ['/v10/me','/feverish','/accounts/ClientLoginExtra','/reader/api/01/token']) {
  assert.equal((await proxyReader(new Request('https://rss.erikrole.com'+path),async()=>{throw new Error('not an API route');})).status,302);
 }
});
