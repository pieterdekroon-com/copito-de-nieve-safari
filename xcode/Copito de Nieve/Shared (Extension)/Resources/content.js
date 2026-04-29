// Gorilla Pop — 2% kans per page load op een random gorilla.
//
// Handmatig forceren tijdens het bouwen:
// - Keyboard: ⌥⇧G (Alt+Shift+G) op elke http(s)-pagina
// - Popup: klik op het extensie-icoon en gebruik "Test gorilla"
// - Console: switch in devtools naar context "Copito de Nieve" → __copito()

(() => {
  // Alleen in het top-level frame — geen gorilla's in ad-iframes.
  if (window.top !== window.self) return;

  // Alleen op echte http(s) pagina's, niet op chrome://, extension:// of file://
  if (!/^https?:$/.test(location.protocol)) return;

  const CHANCE = 0.02;
  const DELAY_MS = 600;
  const ENTRY_MS = 400;
  const STARE_MS = 1800;

  const GORILLAS = [
    'gorilla1.png',
    'gorilla2.png',
    'gorilla3.png',
    'gorilla4.png',
    'gorilla5.png'
  ];

  let enabled = true;

  function summonGorilla() {
    const pick = GORILLAS[Math.floor(Math.random() * GORILLAS.length)];

    const container = document.createElement('div');
    container.className = 'gorilla-pop__container';

    const img = document.createElement('img');
    img.src = chrome.runtime.getURL('assets/' + pick);
    img.className = 'gorilla-pop__img';
    img.alt = '';
    img.setAttribute('aria-hidden', 'true');
    container.appendChild(img);

    document.body.appendChild(container);

    requestAnimationFrame(() => {
      container.classList.add('gorilla-pop__container--visible');
    });

    setTimeout(() => {
      container.classList.remove('gorilla-pop__container--visible');
      container.classList.add('gorilla-pop__container--leaving');
      setTimeout(() => container.remove(), 500);
    }, ENTRY_MS + STARE_MS);
  }

  // Sneltoets — werkt alleen als de extensie aan staat.
  document.addEventListener('keydown', (e) => {
    if (!enabled) return;
    if (e.altKey && e.shiftKey && e.code === 'KeyG') {
      e.preventDefault();
      summonGorilla();
    }
  });

  // Test vanuit de popup — negeert de toggle, zodat je altijd kan testen.
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg && msg.type === 'copito:test') summonGorilla();
  });

  // Devtools-hook (negeert toggle).
  window.__copito = summonGorilla;

  // Random page-load pop respecteert de toggle.
  chrome.storage.sync.get({ enabled: true }, (s) => {
    enabled = s.enabled;
    if (enabled && Math.random() < CHANCE) {
      setTimeout(summonGorilla, DELAY_MS);
    }
  });

  // Live updaten als je de toggle in de popup omzet.
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync' && changes.enabled) {
      enabled = changes.enabled.newValue;
    }
  });
})();
