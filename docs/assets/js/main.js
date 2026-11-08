/**
 * Athia Website - Main JavaScript
 *
 * Configuration:
 *   Set GITHUB_OWNER and GITHUB_REPO below to enable repository statistics.
 *   Leave them as empty strings to show a placeholder message.
 */

// === Configuration ===
const GITHUB_OWNER = 'Mr-Override';
const GITHUB_REPO = 'athia';
const REPO_URL = GITHUB_OWNER && GITHUB_REPO
  ? `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`
  : '#';
const WEBSITE_URL = 'https://mr-override.github.io/athia/';

// === In-memory cache ===
let statsCache = null;
let lastFetchTime = null;

// === Repository Link Resolver ===
// Resolves links with data-repo-path to GitHub blob URLs.
// Usage: <a href="#" data-repo-path="README.md">README</a>
function resolveRepoLinks() {
  if (!GITHUB_OWNER || !GITHUB_REPO) {
    // If not configured, leave href="#" — links will be non-functional but won't 404
    return;
  }
  const branch = 'main';
  const repoLinks = document.querySelectorAll('a[data-repo-path]');
  repoLinks.forEach(link => {
    const path = link.getAttribute('data-repo-path');
    if (path) {
      link.href = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/blob/${branch}/${path}`;
      link.target = '_blank';
      link.rel = 'noopener';
    }
  });
  // Resolve footer Repository links to the actual repo URL
  const footerRepoLinks = document.querySelectorAll('a[data-repo-link]');
  footerRepoLinks.forEach(link => {
    link.href = REPO_URL;
    link.target = '_blank';
    link.rel = 'noopener';
  });
}

// === Mobile Navigation ===
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  // Resolve repository links
  resolveRepoLinks();

  // Fetch stats if configured
  if (GITHUB_OWNER && GITHUB_REPO) {
    fetchStats();
  }

  // Scroll reveal animations
  initScrollReveal();
});

// === Scroll Reveal ===
function initScrollReveal() {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const sections = document.querySelectorAll('.section, .community-cta, .page-header, .content');
  if (!sections.length) return;

  // Add reveal class to sections
  sections.forEach(section => {
    section.classList.add('reveal');
  });

  // Use IntersectionObserver for performant scroll detection
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    sections.forEach(section => observer.observe(section));
  } else {
    // Fallback: show all sections immediately
    sections.forEach(section => section.classList.add('visible'));
  }
}

// === GitHub Stats ===
async function fetchStats() {
  if (!GITHUB_OWNER || !GITHUB_REPO) {
    showStatsPlaceholder();
    return;
  }

  const statsEl = document.getElementById('stats-grid');
  if (!statsEl) return;

  // Show loading state
  showStatsLoading(statsEl);

  try {
    // Fetch repository info
    const repoRes = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`
    );
    if (repoRes.status === 404) {
      throw new Error(
        `Repository "${GITHUB_OWNER}/${GITHUB_REPO}" not found. ` +
        'If this repository is private, the GitHub API cannot access it without authentication. ' +
        'To fix this: make the repository public, or set up a GitHub token for authenticated API access.'
      );
    }
    if (!repoRes.ok) throw new Error(`GitHub API returned ${repoRes.status}`);
    const repo = await repoRes.json();

    // Fetch contributors count (paginated)
    let contributors = 0;
    let contribPage = 1;
    while (true) {
      const contribRes = await fetch(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contributors?page=${contribPage}&per_page=100`
      );
      if (!contribRes.ok) break;
      const contribData = await contribRes.json();
      if (contribData.length === 0) break;
      contributors += contribData.length;
      if (contribData.length < 100) break;
      contribPage++;
    }

    // Fetch latest commit
    let latestCommit = '';
    try {
      const commitsRes = await fetch(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/commits?per_page=1`
      );
      if (commitsRes.ok) {
        const commits = await commitsRes.json();
        if (commits.length > 0) {
          const date = new Date(commits[0].commit.author.date);
          latestCommit = date.toLocaleDateString();
        }
      }
    } catch (_) {
      // Ignore commit fetch errors
    }

    // Fetch issues
    let openIssues = 0;
    let closedIssues = 0;
    try {
      const issuesRes = await fetch(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues?state=all&per_page=100`
      );
      if (issuesRes.ok) {
        const issues = await issuesRes.json();
        // Only count issues, not PRs
        for (const issue of issues) {
          if (!issue.pull_request) {
            if (issue.state === 'open') openIssues++;
            else closedIssues++;
          }
        }
      }
    } catch (_) {
      // Ignore issues fetch errors
    }

    // Cache results
    statsCache = {
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      contributors,
      openIssues,
      closedIssues,
      latestCommit,
      updatedAt: new Date().toISOString()
    };
    lastFetchTime = new Date().toISOString();

    renderStats(statsEl, statsCache);
  } catch (err) {
    console.error('Failed to fetch GitHub stats:', err);
    showStatsError(statsEl, err.message);
  }
}

function renderStats(container, stats) {
  const cards = [
    { icon: '★', value: stats.stars, label: 'Stars' },
    { icon: '⧉', value: stats.forks, label: 'Forks' },
    { icon: '👤', value: stats.contributors, label: 'Contributors' },
    { icon: '◉', value: stats.openIssues, label: 'Open Issues' },
    { icon: '✓', value: stats.closedIssues, label: 'Closed Issues' },
    { icon: '⏱', value: stats.latestCommit || '—', label: 'Last Commit' }
  ];

  container.innerHTML = cards.map(card => `
    <div class="stat-card">
      <div class="stat-icon">${card.icon}</div>
      <div class="stat-content">
        <div class="stat-value">${card.value}</div>
        <div class="stat-label">${card.label}</div>
      </div>
    </div>
  `).join('');

  // Update info text
  const infoEl = document.getElementById('stats-info');
  if (infoEl) {
    const time = new Date(lastFetchTime).toLocaleString();
    infoEl.innerHTML = `
      <p>Last refreshed: ${time}</p>
      <p>Statistics are fetched from the public GitHub API.</p>
      <button class="stats-refresh" onclick="refreshStats()">↻ Refresh stats</button>
    `;
  }
}

function showStatsLoading(container) {
  container.innerHTML = Array.from({length: 6}, () => `
    <div class="stat-loading">
      <div class="stat-loading-icon"></div>
      Loading...
    </div>
  `).join('');
}

function showStatsError(container, message) {
  container.innerHTML = `
    <div class="stat-card" style="grid-column: 1 / -1; flex-direction: column; align-items: flex-start;">
      <p style="color: var(--color-error); margin:0;">Unable to load repository statistics.</p>
      <p style="color: var(--color-text-secondary); font-size: var(--font-size-sm); margin-top: var(--space-sm);">${message}</p>
    </div>
  `;
}

function showStatsPlaceholder() {
  const statsEl = document.getElementById('stats-grid');
  if (!statsEl) return;
  statsEl.innerHTML = `
    <div class="stat-card" style="grid-column: 1 / -1; flex-direction: column; align-items: flex-start;">
      <p style="color: var(--color-text-secondary); margin:0;">
        Repository statistics will appear here once the GitHub repository is configured.
      </p>
      <p style="color: var(--color-text-secondary); font-size: var(--font-size-sm); margin-top: var(--space-sm);">
        Set <code>GITHUB_OWNER</code> and <code>GITHUB_REPO</code> in <code>assets/js/main.js</code>.
      </p>
    </div>
  `;
}

function refreshStats() {
  statsCache = null;
  lastFetchTime = null;
  const statsEl = document.getElementById('stats-grid');
  if (statsEl) {
    fetchStats();
  }
}
