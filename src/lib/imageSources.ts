/** Request enough native detail for both the layout and high-density displays. */
export function imageSources(src: string) {
  if (!src.startsWith('https://images.unsplash.com/')) return undefined;
  const url = new URL(src);
  url.searchParams.set('q', '90');
  return [480, 800, 1200, 1800, 2400, 3200].map(width => {
    url.searchParams.set('w', String(width));
    return `${url.href} ${width}w`;
  }).join(', ');
}
