import assert from 'node:assert/strict';
import { test } from 'node:test';
import { imageSources } from '../src/lib/imageSources.ts';

test('high-density candidates preserve the photograph and upgrade quality', () => {
  const source = 'https://images.unsplash.com/photo-example?auto=format&fit=crop&q=60&w=600';
  const candidates = imageSources(source).split(', ');
  assert.equal(candidates.length, 6);
  assert.equal(new Set(candidates).size, 6);
  for (const candidate of candidates) {
    const [href, descriptor] = candidate.split(' ');
    const url = new URL(href);
    assert.equal(url.pathname, '/photo-example');
    assert.equal(url.searchParams.get('q'), '90');
    assert.equal(url.searchParams.get('auto'), 'format');
    assert.equal(`${url.searchParams.get('w')}w`, descriptor);
  }
  assert.ok(candidates.at(-1).endsWith('3200w'));
});

test('local originals and other hosts retain their own source handling', () => {
  assert.equal(imageSources('/images/imc-pharmacy-2336.webp'), undefined);
  assert.equal(imageSources('https://example.com/photo.jpg'), undefined);
});
