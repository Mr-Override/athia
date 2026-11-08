/**
 * Athia Website - Main JavaScript
 *
 * Configuration:
 *   Set GITHUB_OWNER and GITHUB_REPO below to enable repository statistics.
 *   Leave them as empty strings to show a placeholder message.
 */

// === Configuration ===
const GITHUB_OWNER = 'Mr-Override';     // e.g., 'athia-os'
const GITHUB_REPO = 'athia';      // e.g., 'athia'
const REPO_URL = GITHUB_OWNER && GITHUB_REPO
  ? `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`
  : '#';

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
});

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
  container.innerHTML = `
    <div class="stat-card">
      <div class="stat-value">${stats.stars}</div>
      <div class="stat-label">Stars</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${stats.forks}</div>
      <div class="stat-label">Forks</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${stats.contributors}</div>
      <div class="stat-label">Contributors</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${stats.openIssues}</div>
      <div class="stat-label">Open Issues</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${stats.closedIssues}</div>
      <div class="stat-label">Closed Issues</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${stats.latestCommit || '—'}</div>
      <div class="stat-label">Latest Commit</div>
    </div>
  `;

  // Update info text
  const infoEl = document.getElementById('stats-info');
  if (infoEl) {
    const time = new Date(lastFetchTime).toLocaleString();
    infoEl.innerHTML = `
      <p>Last refreshed: ${time}</p>
      <p>Statistics are fetched from the public GitHub API. Commit count represents only the accessible commit history.</p>
      <button class="stats-refresh" onclick="refreshStats()">Refresh</button>
    `;
  }
}

function showStatsLoading(container) {
  container.innerHTML = `
    <div class="stat-card"><div class="stat-loading">Loading...</div></div>
    <div class="stat-card"><div class="stat-loading">Loading...</div></div>
    <div class="stat-card"><div class="stat-loading">Loading...</div></div>
    <div class="stat-card"><div class="stat-loading">Loading...</div></div>
    <div class="stat-card"><div class="stat-loading">Loading...</div></div>
    <div class="stat-card"><div class="stat-loading">Loading...</div></div>
  `;
}

function showStatsError(container, message) {
  container.innerHTML = `
    <div class="stat-card" style="grid-column: 1 / -1;">
      <p style="color: var(--color-error);">Unable to load repository statistics.</p>
      <p style="color: var(--color-text-secondary); font-size: var(--font-size-sm); margin-top: var(--space-sm);">${message}</p>
    </div>
  `;
}

function showStatsPlaceholder() {
  const statsEl = document.getElementById('stats-grid');
  if (!statsEl) return;
  statsEl.innerHTML = `
    <div class="stat-card" style="grid-column: 1 / -1;">
      <p style="color: var(--color-text-secondary);">
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
