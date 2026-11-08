# Athia — Static website for GitHub Pages
# https://mr-override.github.io/athia/

## SEO Configuration

This directory contains the static website served via GitHub Pages.

### Search Engine Optimization

The following SEO features are configured across all pages:

- **Meta descriptions** — Unique, descriptive meta descriptions per page
- **Meta keywords** — Relevant keywords per page
- **Canonical URLs** — Prevents duplicate content issues
- **Open Graph tags** — Rich link previews on Facebook, Discord, etc.
- **Twitter Card tags** — Rich link previews on Twitter/X
- **JSON-LD structured data** — Schema.org markup for search engines
- **Robots meta tags** — Index and follow directives
- **Theme color meta** — Browser UI color theming

### Files

- `robots.txt` — Search engine crawling instructions
- `sitemap.xml` — Page listing for search engine indexing
- `assets/images/favicon.svg` — Browser favicon

### Updating Content

When adding new pages:

1. Add the page URL to `sitemap.xml`
2. Include the same SEO meta tags as other pages
3. Add JSON-LD structured data with the correct page URL
