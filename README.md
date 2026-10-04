## Site Reputation - Frontend Only

This version does not use AI, Node/Express, API keys, or any backend.

| Linux | Windows |
|---|---|
| `node --version && npm --version` | `node --version && npm --version` |
| `sudo dnf install -y nodejs npm` | `winget install OpenJS.NodeJS.LTS` |
| `cd ~/Downloads/site-reputation` | `cd site-reputation` |
| `npm install` | `npm install` |
| `npm run dev` | `npm run dev` |

Upload the contents of `dist/` to any static host, including GitHub Pages.

### Add or change reputation records

Edit: `data/reputation.ts`

Unknown domains are marked **Unverified** and return manual-check links instead of pretending a live scan occurred.
