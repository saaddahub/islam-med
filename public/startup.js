// Independent of the React bundle: recovery still works if the app fails to boot.
(() => {
  const loader = document.getElementById('startup');
  const root = document.getElementById('root');
  const status = document.getElementById('startup-status');
  const button = document.getElementById('startup-continue');
  if (!loader || !root || !status || !button) return;
  let finished = false;
  let removal;
  const syncVisibility = () => loader.classList.toggle('is-paused', document.hidden);
  document.addEventListener('visibilitychange', syncVisibility);
  syncVisibility();
  const remove = () => {
    clearTimeout(removal);
    document.removeEventListener('visibilitychange', syncVisibility);
    loader.remove();
  };
  const reveal = () => {
    if (finished) return;
    finished = true;
    clearTimeout(slow);
    clearTimeout(deadline);
    window.removeEventListener('imc:ready', reveal);
    document.body.classList.remove('is-loading');
    root.removeAttribute('inert');
    root.removeAttribute('aria-busy');
    const hadFocus = loader.contains(document.activeElement);
    loader.setAttribute('aria-hidden', 'true');
    loader.setAttribute('inert', '');
    loader.classList.add('is-ready');
    if (hadFocus) document.getElementById('main-content')?.focus({ preventScroll: true });
    loader.addEventListener('transitionend', event => {
      if (event.target === loader && event.propertyName === 'opacity') remove();
    }, { once: true });
    removal = setTimeout(remove, 300);
  };
  button.addEventListener('click', () => {
    if (root.childElementCount) reveal();
    else window.location.reload();
  });
  const slow = setTimeout(() => {
    status.textContent = 'Taking a little longer. You can continue when you’re ready.';
    button.textContent = root.childElementCount ? 'Continue to website' : 'Reload website';
    button.hidden = false;
  }, 6000);
  const deadline = setTimeout(() => {
    if (root.childElementCount) reveal();
    else {
      loader.classList.add('is-failed');
      status.textContent = 'The website couldn’t load. Please try again.';
      button.textContent = 'Reload website';
      button.hidden = false;
    }
  }, 12000);
  window.addEventListener('imc:ready', reveal);
})();
