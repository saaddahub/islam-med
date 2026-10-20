import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

const source = await readFile(new URL('../src/lib/useLenis.ts', import.meta.url), 'utf8');
const script = ts.transpile(source.replace(/^import .*;\r?\n/gm, '').replace(/export default useLenis;/, '').replace('export function', 'function'), { target: ts.ScriptTarget.ES2022 });

test('native mobile anchors survive dialog handoff and refresh, and release listeners', () => {
  const listeners = new Map();
  const frames = new Map();
  const refreshListeners = new Set();
  let frameId = 0;
  let cleanup;
  const location = { hash: '#doctors' };
  const positions = { doctors: 1200, facilities: 2400 };
  const window = {
    scrollY: 0,
    addEventListener: (name, fn) => listeners.set(name, fn),
    removeEventListener: name => listeners.delete(name),
    scrollTo: ({ top }) => { window.scrollY = top; },
  };
  class Element {
    hash = location.hash;
    closest() { return this; }
  }
  const context = {
    window, location, Element,
    document: { getElementById: id => positions[id] === undefined ? null : {
      getBoundingClientRect: () => ({ top: positions[id] - window.scrollY }),
    } },
    getComputedStyle: () => ({ scrollMarginTop: '88px' }),
    useEffect: effect => { cleanup = effect(); },
    useReducedMotion: () => false,
    useMediaQuery: () => false,
    requestAnimationFrame: fn => { frames.set(++frameId, fn); return frameId; },
    cancelAnimationFrame: id => frames.delete(id),
    ScrollTrigger: {
      addEventListener: (_, fn) => refreshListeners.add(fn),
      removeEventListener: (_, fn) => refreshListeners.delete(fn),
    },
  };
  const flush = () => {
    for (const [id, fn] of [...frames]) { frames.delete(id); fn(); }
  };
  runInNewContext(`${script}\nuseLenis();`, context);
  flush();
  assert.equal(window.scrollY, 1112, 'deep link clears the fixed header');

  listeners.get('touchstart')();
  window.scrollY = 500;
  refreshListeners.forEach(fn => fn());
  flush();
  assert.equal(window.scrollY, 500, 'refresh must not pull a visitor back after touching');

  location.hash = '#facilities';
  listeners.get('hashchange')();
  assert.equal(window.scrollY, 500, 'navigation waits a frame for the modal to close');
  refreshListeners.forEach(fn => fn());
  flush();
  assert.equal(window.scrollY, 2312, 'refresh must not cancel pending menu navigation');

  window.scrollY = 100;
  listeners.get('click')({ button: 0, target: new Element() });
  flush();
  assert.equal(window.scrollY, 2312, 'clicking the current section still returns to it');
  cleanup();
  assert.equal(listeners.size, 0);
  assert.equal(refreshListeners.size, 0);
  assert.equal(frames.size, 0);
});
