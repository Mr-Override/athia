# IndexNow Submission Log

## 2026-11-09

**Status:** Submitted successfully (HTTP 200)

**API endpoint:** `https://api.indexnow.org/IndexNow`

**Key:** `0e20da20a4f24df38d5e4039fb7d5fa1`

**Key location:** `https://mr-override.github.io/athia/indexnow_key.txt`

**URLs submitted:**

- `https://mr-override.github.io/athia/`
- `https://mr-override.github.io/athia/about.html`
- `https://mr-override.github.io/athia/architecture.html`
- `https://mr-override.github.io/athia/community.html`
- `https://mr-override.github.io/athia/contributing.html`
- `https://mr-override.github.io/athia/roadmap.html`
- `https://mr-override.github.io/athia/privacy.html`
- `https://mr-override.github.io/athia/sitemap.xml`

## How to Re-submit

When new pages are added or significant changes are made, re-send the IndexNow request:

```bash
curl -X POST 'https://api.indexnow.org/IndexNow' \
  -H 'Content-Type: application/json; charset=utf-8' \
  -d '{
  "host": "mr-override.github.io",
  "key": "0e20da20a4f24df38d5e4039fb7d5fa1",
  "keyLocation": "https://mr-override.github.io/athia/indexnow_key.txt",
  "urlList": [
    "https://mr-override.github.io/athia/",
    "https://mr-override.github.io/athia/about.html",
    "https://mr-override.github.io/athia/architecture.html",
    "https://mr-override.github.io/athia/community.html",
    "https://mr-override.github.io/athia/contributing.html",
    "https://mr-override.github.io/athia/roadmap.html",
    "https://mr-override.github.io/athia/privacy.html",
    "https://mr-override.github.io/athia/sitemap.xml"
  ]
}'
```

A successful response returns HTTP 200 with an empty body.
