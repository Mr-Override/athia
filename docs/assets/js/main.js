/**
 * Athia Website - Main JavaScript
 *
 * Configuration:
 *   Set GITHUB_OWNER and GITHUB_REPO below to enable repository links.
 */

// === Configuration ===
const GITHUB_OWNER = 'Mr-Override';
const GITHUB_REPO = 'athia';
const REPO_URL = GITHUB_OWNER && GITHUB_REPO
  ? `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`
  : '#';

// === Repository Link Resolver ===
function resolveRepoLinks() {
  if (!GITHUB_OWNER || !GITHUB_REPO) {
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
  const footerRepoLinks = document.querySelectorAll('a[data-repo-link]');
  footerRepoLinks.forEach(link => {
    link.href = REPO_URL;
    link.target = '_blank';
    link.rel = 'noopener';
  });
}

// === Scroll Reveal ===
function initScrollReveal() {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const reveals = document.querySelectorAll('.section-reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Trigger staggered card reveal: keep .revealing for transition rules, add .revealed for visible state
        const grids = entry.target.querySelectorAll('.card-grid.revealing, .philosophy-grid.revealing, .info-grid.revealing, .steps-list.revealing');
        grids.forEach(grid => {
          grid.classList.add('revealed');
        });
        // After reveal animation completes, remove both classes so hover transitions work normally
        const maxDelay = grids.length ? 800 : 0;
        if (maxDelay) {
          setTimeout(() => {
            grids.forEach(grid => {
              grid.classList.remove('revealing');
              grid.classList.remove('revealed');
            });
          }, maxDelay);
        }
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(section => {
    observer.observe(section);
  });
}

// === Initialize ===
document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  // Resolve repository links
  resolveRepoLinks();

  // Scroll reveal animations
  initScrollReveal();
});
