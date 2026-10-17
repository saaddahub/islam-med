import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
import { test } from 'node:test';

const source = await readFile(new URL('../public/startup.js', import.meta.url), 'utf8');

function boot({ mounted = true } = {}) {
  const timers = new Map();
  let timerId = 0;
  let reloaded = false;
  let focused = false;
  const element = () => {
    const classes = new Set();
    const attrs = new Set(['inert', 'aria-busy']);
    const listeners = new Map();
    return {
      attrs, listeners, classes, removed: false,
      classList: {
        add: value => classes.add(value), remove: value => classes.delete(value),
        toggle: (value, force) => force ? classes.add(value) : classes.delete(value),
      },
      addEventListener: (name, callback) => listeners.set(name, callback),
      removeEventListener: name => listeners.delete(name),
      setAttribute: name => attrs.add(name), removeAttribute: name => attrs.delete(name),
      contains: active => active === button,
      remove() { this.removed = true; },
    };
  };
  const loader = element();
  const root = { ...element(), childElementCount: mounted ? 1 : 0 };
  const status = { textContent: '' };
  const button = { ...element(), hidden: true, textContent: '' };
  const body = element();
  body.classes.add('is-loading');
  const window = { ...element(), location: { reload: () => { reloaded = true; } } };
  const document = {
    ...element(), body, hidden: false, activeElement: null,
    getElementById: id => ({ startup: loader, root, 'startup-status': status,
      'startup-continue': button, 'main-content': { focus: () => { focused = true; } } })[id],
  };
  runInNewContext(source, {
    window, document,
    setTimeout: (callback, ms) => { timers.set(++timerId, { callback, ms }); return timerId; },
    clearTimeout: id => timers.delete(id),
  });
  const advance = ms => {
    for (const [id, timer] of [...timers]) {
      if (timer.ms === ms) { timers.delete(id); timer.callback(); }
    }
  };
  return { loader, root, body, button, status, document, window, timers, advance,
    isReloaded: () => reloaded, isFocused: () => focused };
}

test('readiness unlocks the app and removes the screen even without transition events', () => {
  const state = boot();
  state.window.listeners.get('imc:ready')();
  assert.equal(state.root.attrs.has('inert'), false);
  assert.equal(state.root.attrs.has('aria-busy'), false);
  assert.equal(state.body.classes.has('is-loading'), false);
  assert.equal(state.loader.classes.has('is-ready'), true);
  assert.equal(state.loader.attrs.has('aria-hidden'), true);
  assert.equal(state.window.listeners.has('imc:ready'), false);
  state.advance(300);
  assert.equal(state.loader.removed, true);
  assert.equal(state.timers.size, 0);
});

test('slow loading offers an escape and restores keyboard focus when used', () => {
  const state = boot();
  state.advance(6000);
  assert.equal(state.button.hidden, false);
  assert.equal(state.button.textContent, 'Continue to website');
  state.document.activeElement = state.button;
  state.button.listeners.get('click')();
  assert.equal(state.isFocused(), true);
  assert.equal(state.root.attrs.has('inert'), false);
});

test('a stalled asset cannot keep a mounted website behind the loader indefinitely', () => {
  const state = boot();
  state.advance(12000);
  assert.equal(state.loader.classes.has('is-ready'), true);
  assert.equal(state.root.attrs.has('inert'), false);
});

test('bundle failure retains a usable retry instead of revealing an empty page', () => {
  const state = boot({ mounted: false });
  state.advance(12000);
  assert.equal(state.loader.classes.has('is-failed'), true);
  assert.equal(state.loader.classes.has('is-ready'), false);
  assert.equal(state.button.hidden, false);
  assert.equal(state.button.textContent, 'Reload website');
  state.button.listeners.get('click')();
  assert.equal(state.isReloaded(), true);
});

test('decorative loops pause in hidden tabs and release their visibility listener', () => {
  const state = boot();
  state.document.hidden = true;
  state.document.listeners.get('visibilitychange')();
  assert.equal(state.loader.classes.has('is-paused'), true);
  state.window.listeners.get('imc:ready')();
  state.advance(300);
  assert.equal(state.document.listeners.has('visibilitychange'), false);
});
