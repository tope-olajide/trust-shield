document.addEventListener('DOMContentLoaded', async () => {
  const apiSection = document.getElementById('api-key-section');
  const scanSection = document.getElementById('scan-section');
  const keyInput = document.getElementById('api-key-input');
  const saveBtn = document.getElementById('save-key');
  const resultDiv = document.getElementById('result');
  const loading = document.getElementById('loading');

  const stored = await chrome.storage.sync.get('apiKey');
  if (stored.apiKey) {
    apiSection.style.display = 'none';
    scanSection.style.display = 'block';
    showLastScan();
  }

  saveBtn.addEventListener('click', async () => {
    const key = keyInput.value.trim();
    if (!key) {
      document.getElementById('key-error').style.display = 'block';
      return;
    }
    await chrome.storage.sync.set({ apiKey: key });
    apiSection.style.display = 'none';
    scanSection.style.display = 'block';
    location.reload(); // Refresh to scan current tab
  });

  document.getElementById('rescan')?.addEventListener('click', () => {
    loading.style.display = 'block';
    resultDiv.style.display = 'none';
    chrome.runtime.sendMessage({ action: 'rescan' });
  });

  document.getElementById('change-key')?.addEventListener('click', () => {
    chrome.storage.sync.remove('apiKey');
    location.reload();
  });

  async function showLastScan() {
    const session = await chrome.storage.session.get('lastScan');
    if (!session.lastScan) {
      loading.textContent = 'Open a website to scan...';
      return;
    }
    loading.style.display = 'none';
    resultDiv.style.display = 'block';

    const { url, data, isSafe } = session.lastScan;
    document.getElementById('site-url').textContent = url;
    const statusEl = document.getElementById('status');
    statusEl.textContent = isSafe ? '🛡️ Safe' : '⚠️ Risky';
    statusEl.className = 'status ' + (isSafe ? 'safe' : 'risky');

    document.getElementById('score').textContent = data.safety_score?.toFixed(2) || 'N/A';
    document.getElementById('label').textContent = data.safety_label || 'Unknown';
    document.getElementById('recommendation').textContent = data.user_action_recommendation || 'No info';
    document.getElementById('summary').textContent = data.content_summary?.tldr || 'No summary';
  }

  // Listen for updates from background
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === 'updatePopup') showLastScan();
  });
});