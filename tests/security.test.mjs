import assert from 'node:assert/strict';
import { readFile, writeFile, unlink } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { after, before, test } from 'node:test';
import { createServer, preview } from 'vite';

let server;
let origin;
before(async () => {
  server = await preview({ preview: { host: '127.0.0.1', port: 0 } });
  origin = `http://127.0.0.1:${server.httpServer.address().port}`;
});
after(async () => { await server?.close(); });

test('production responses restrict executable content, framing, and form submission', async () => {
  const response = await fetch(origin);
  assert.equal(response.status, 200);
  const policy = response.headers.get('content-security-policy');
  assert.match(policy, /(?:^|; )script-src 'self'(?:;|$)/);
  assert.match(policy, /frame-ancestors 'none'/);
  assert.match(policy, /form-action 'none'/);
  assert.match(policy, /object-src 'none'/);
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
  assert.equal(response.headers.get('x-frame-options'), 'DENY');
  assert.equal(response.headers.get('referrer-policy'), 'no-referrer');
  const html = await response.text();
  assert.match(html, /http-equiv="Content-Security-Policy"/);
  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)];
  assert.ok(scripts.length > 0);
  for (const [, attrs, body] of scripts) {
    assert.match(attrs, /src="/);
    assert.equal(body.trim(), '');
  }
});

test('static hosts receive the same production security headers', async () => {
  const response = await fetch(origin);
  const headers = await readFile(new URL('../dist/_headers', import.meta.url), 'utf8');
  assert.ok(headers.includes(`Content-Security-Policy: ${response.headers.get('content-security-policy')}`));
  assert.match(headers, /X-Frame-Options: DENY/);
});

test('development serves HMR while denying environment and Git files', async () => {
  const fixturePath = `/.env.security-probe-${process.pid}`;
  const fixtureUrl = new URL('..' + fixturePath, import.meta.url);
  await writeFile(fixtureUrl, 'SECURITY_PROBE=must-not-be-served', { flag: 'wx' });
  const dev = await createServer({ server: { host: '127.0.0.1', port: 0 } });
  try {
    await dev.listen();
    const devOrigin = `http://127.0.0.1:${dev.httpServer.address().port}`;
    const page = await fetch(devOrigin);
    assert.equal(page.status, 200);
    assert.equal(page.headers.get('content-security-policy'), null);
    assert.equal((await fetch(`${devOrigin}/src/main.tsx`)).status, 200);
    for (const path of [fixturePath, '/.git/config']) {
      const response = await fetch(devOrigin + path);
      assert.ok([403, 404].includes(response.status), `${path}: HTTP ${response.status}`);
    }
  } finally {
    await dev.close();
    await unlink(fixtureUrl);
  }
});

test('oversized source-map section offsets are rejected before expensive work', () => {
  // Isolate the payload so a vulnerable dependency cannot hang the test runner.
  const probe = spawnSync(process.execPath, ['--input-type=module', '-e', `
    import { SourceMapConsumer, SourceNode } from 'source-map-js';
    const map = { version: 3, sections: [{
      offset: { line: 1e12, column: 0 },
      map: { version: 3, sources: ['a.js'], names: [], mappings: 'AAAA', sourcesContent: ['x'] }
    }] };
    try {
      SourceNode.fromStringWithSourceMap('x', new SourceMapConsumer(map));
      process.exitCode = 1;
    } catch (error) {
      if (!/offset line must not exceed/.test(error.message)) throw error;
    }
  `], { timeout: 3000, encoding: 'utf8' });
  assert.ifError(probe.error);
  assert.equal(probe.status, 0, probe.stderr);
});
