# Trust Shield 🛡️

**A Chrome Extension for Real-Time Phishing Protection**

Trust Shield is a simple yet powerful Chrome browser extension that automatically scans every website you visit using the **LucideCrawl API** (`/trust_scan` endpoint). It provides instant visual feedback and alerts to help protect you from phishing, scams, and malicious sites.


### Features

- **Automatic Scanning**: Scans the URL every time you load or navigate to a new page.
- **Badge Indicator**:
  - 🛡️ Green badge for safe sites
  - ⚠️ Red badge for risky/dangerous sites
  - ❌ Gray if there's an error
- **Desktop Notifications**: Pops up a warning if a site is potentially unsafe.
- **Detailed Popup**: Click the extension icon to view:
  - Site URL
  - Safety score & label
  - User action recommendation
  - Summary of threats


### How It Works

1. On page load/complete, the background script fetches the current tab's URL.
2. Sends a POST request to `https://xmmh-djbw-xefx.n7e.xano.io/api:x9tl6bvx/trust_scan` with your API key.
3. Parses the response:
   - High safety score → Safe (green badge)
   - Low score or "Danger" label → Risky (red badge + notification)
4. Stores the latest result in session storage for the popup to display.

### Installation & Setup (Developer Mode)

1. **Get a Free API Key**:
   - Use any API tool (e.g., [Hoppscotch](https://hoppscotch.io), Postman, or curl) to sign up:
     ```bash
     curl -X POST https://xmmh-djbw-xefx.n7e.xano.io/api:x9tl6bvx/auth/signup \
       -H "Content-Type: application/json" \
       -d '{"name": "Your Name", "email": "you@example.com", "password": "securepass123"}'
     ```
   - Copy the `api_key` from the response (shown only once!).

2. **Load the Extension**:
   - Clone or download this repo: `git clone https://github.com/tope-olajide/trust-shield.git`
   - Open Chrome and go to `chrome://extensions/`
   - Enable **Developer mode** (top right)
   - Click **Load unpacked** and select the folder

3. **Add Your API Key**:
   - Click the Trust Shield icon in your toolbar
   - Enter your `sk_...` API key
   - Click **Save**

4. **Test It**:
   - Visit a safe site (e.g., https://example.com) → Green shield badge
   - Visit a suspicious/phishing test site → Red warning badge + notification

### Privacy

- Your API key is stored securely in `chrome.storage.sync` (synced across your devices if signed in).
- Only the current URL is sent to the LucideCrawl API for scanning.
- No browsing history or personal data is collected by the extension.

### Contributing

Feel free to open issues or pull requests! Ideas:
- Add whitelist/blacklist
- Support more scan details in popup
- Options page for customization

Built with ❤️ using the [LucideCrawl API](https://xmmh-djbw-xefx.n7e.xano.io/api:x9tl6bvx) – making the web safer, one tab at a time.