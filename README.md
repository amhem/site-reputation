# Site Reputation - Frontend Only

This version does not use Gemini, OpenAI, Node/Express, API keys, or any backend.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Upload the contents of `dist/` to any static host, including GitHub Pages.

## Add or change reputation records

Edit:

`data/reputation.ts`

Unknown domains are marked **Unverified** and return manual-check links instead of pretending a live scan occurred.
