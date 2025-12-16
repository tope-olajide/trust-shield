async function scanUrl(tabId, url) {
  const apiKey = await chrome.storage.sync.get('apiKey');
  if (!apiKey.apiKey) return;

  try {
    const response = await fetch('https://xmmh-djbw-xefx.n7e.xano.io/api:x9tl6bvx/trust_scan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey.apiKey
      },
      body: JSON.stringify({ url: url })
    });

    if (!response.ok) throw new Error('API error');

    const result = await response.json();

    const data = result.data || {};
    const score = data.safety_score || 0;
    const label = data.safety_label || 'Unknown';
    const isSafe = label === 'Safe' || score > 0.8;

    // Update badge
    chrome.action.setBadgeText({ text: isSafe ? '🛡️' : '⚠️', tabId });
    chrome.action.setBadgeBackgroundColor({ color: isSafe ? '#28a745' : '#dc3545', tabId });

    // Store result for popup
    await chrome.storage.session.set({ lastScan: { url, data, isSafe } });

    // Optional notification if risky
    if (!isSafe) {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
        title: '⚠️ Potential Risk Detected!',
        message: `This site may be unsafe: ${label} (Score: ${score.toFixed(2)})`
      });
    }
  } catch (err) {
    console.error('Scan error:', err);
    chrome.action.setBadgeText({ text: '❌', tabId });
    chrome.action.setBadgeBackgroundColor({ color: '#6c757d', tabId });
  }
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && tab.url.startsWith('http')) {
    scanUrl(tabId, tab.url);
  }
});

// Rescan active tab when icon clicked (if needed)
chrome.action.onClicked.addListener((tab) => {
  if (tab.url && tab.url.startsWith('http')) {
    scanUrl(tab.id, tab.url);
  }
});