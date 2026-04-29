(() => {
  const enabledInput = document.getElementById('enabled');
  const testButton = document.getElementById('test');
  const shortcutEl = document.getElementById('shortcut');

  const isMac = /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent);
  const keys = isMac ? ['⌥', '⇧', 'G'] : ['Alt', 'Shift', 'G'];
  shortcutEl.innerHTML = keys.map((k) => `<kbd>${k}</kbd>`).join('');

  chrome.storage.sync.get({ enabled: true }, ({ enabled }) => {
    enabledInput.checked = enabled;
  });

  enabledInput.addEventListener('change', () => {
    chrome.storage.sync.set({ enabled: enabledInput.checked });
  });

  testButton.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.id) {
      testButton.textContent = 'Not available here';
      testButton.disabled = true;
      return;
    }
    try {
      await chrome.tabs.sendMessage(tab.id, { type: 'copito:test' });
      window.close();
    } catch {
      testButton.textContent = 'Reload the page first';
      testButton.disabled = true;
    }
  });
})();
