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
const WEBSITE_URL = 'https://mr-override.github.io/athia/';

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

