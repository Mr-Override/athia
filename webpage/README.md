# Athia Project Website

This directory contains the static project website for Athia.

## Files

- `index.html` — Homepage with hero, philosophy, architecture, features, stats, and community CTA
- `about.html` — Project origin, vision, and founding principles
- `architecture.html` — System architecture overview
- `roadmap.html` — Phased development roadmap
- `community.html` — Community philosophy and contribution opportunities
- `contributing.html` — Practical contribution guide
- `assets/css/style.css` — Design system and styles
- `assets/js/main.js` — Mobile navigation and GitHub statistics
- `assets/images/` — Image assets (empty)

## Configuration

### GitHub Statistics

To enable repository statistics, edit `assets/js/main.js` and set:

```js
const GITHUB_OWNER = 'your-github-owner';
const GITHUB_REPO = 'your-repo-name';
```

The site fetches statistics from the public GitHub REST API without authentication. If the values are not configured, a friendly placeholder is displayed.

## Viewing Locally

Open `index.html` in a web browser. No build step or server is required.

## Design

The website uses the Athia modern fusion design philosophy:

- Dark navy and charcoal backgrounds
- Blue accent colors
- Elegant typography
- Subtle glass-like surfaces
- Responsive layouts
- Respects `prefers-reduced-motion`

No frameworks, external dependencies, or build tooling are used.
