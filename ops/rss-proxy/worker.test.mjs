import { test } from 'node:test';
import assert from 'node:assert/strict';
import { proxyReader } from './worker.mjs';
test('keeps API method, path, query and provider credentials; strips Cloudflare credentials and prevents caching',async()=>{
 const res=await proxyReader(new Request('https://rss.erikrole.com/v1/entries?status=unread',{method:'POST',body:'{}',headers:{authorization:'Basic synthetic','x-auth-token':'synthetic-api',cookie:'MinifluxSessionID=synthetic; CF_Authorization=private-edge','cf-access-jwt-assertion':'private-edge','cf-access-client-id':'synthetic-edge-id','cf-access-client-secret':'synthetic-edge-secret',origin:'https://rss.erikrole.com'}}),async(req,options)=>{
  assert.equal(req.url,'https://reader.miniflux.app/v1/entries?status=unread');assert.equal(req.method,'POST');assert.equal(await req.text(),'{}');assert.equal(req.headers.get('authorization'),'Basic synthetic');assert.equal(req.headers.get('x-auth-token'),'synthetic-api');assert.equal(req.headers.get('cookie'),'MinifluxSessionID=synthetic');assert.equal(req.headers.get('cf-access-jwt-assertion'),null);assert.equal(req.headers.get('cf-access-client-id'),null);assert.equal(req.headers.get('cf-access-client-secret'),null);assert.equal(req.headers.get('origin'),'https://reader.miniflux.app');assert.equal(req.redirect,'manual');assert.equal(options.cf.cacheTtl,0);return new Response('{}',{headers:{'cache-control':'public,max-age=60'}});
 });assert.equal(res.headers.get('cache-control'),'private, no-store');
});
test('rewrites provider redirects and session domain; leaves unrelated redirects alone',async()=>{
 const res=await proxyReader(new Request('https://rss.erikrole.com/login'),async()=>new Response(null,{status:302,headers:{location:'https://reader.miniflux.app/unread','set-cookie':'MinifluxSessionID=synthetic; Path=/; Domain=reader.miniflux.app; Secure; HttpOnly; SameSite=Lax'}}));
 assert.equal(res.headers.get('location'),'https://rss.erikrole.com/unread');assert.equal(res.headers.get('set-cookie'),'MinifluxSessionID=synthetic; Path=/; Secure; HttpOnly; SameSite=Lax');
});
test('rejects other hosts, preserves untrusted Origin for upstream CSRF checks and fails without leaking errors',async()=>{
 assert.equal((await proxyReader(new Request('https://other.erikrole.com/'),async()=>{throw new Error('must not fetch');})).status,404);
 await proxyReader(new Request('https://rss.erikrole.com/login',{headers:{origin:'https://untrusted.example'}}),async(req)=>{assert.equal(req.headers.get('origin'),'https://untrusted.example');return new Response('ok');});
 const res=await proxyReader(new Request('https://rss.erikrole.com/'),async()=>{throw new Error('private details');});assert.equal(res.status,502);assert.equal(await res.text(),'Reader temporarily unavailable');
});
test('protocol-relative paths cannot change the fixed upstream host',async()=>{
 await proxyReader(new Request('https://rss.erikrole.com//untrusted.example/v1'),async(req)=>{assert.equal(new URL(req.url).origin,'https://reader.miniflux.app');assert.equal(new URL(req.url).pathname,'//untrusted.example/v1');return new Response('ok');});
});
