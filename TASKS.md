# MEGA Caps — Task Board

Shared task tracker for @tompickup23, @gregjrothwell, and Claude.
Update this file as you pick up / complete work.

## Status Key

- [ ] To do
- [x] Done
- **WIP** = Work in progress (add your name)

---

## Phase 1 — Shop MVP

- [x] Landing page & GitHub Pages deploy
- [x] Set up repo collaboration & project structure
- [x] **Product grid with 4 placeholder products** (Greg)
- [x] **Shopping cart with localStorage** (Greg)
- [x] **About / Contact page** (Greg)
- [x] **SEO meta tags & Open Graph** (Greg)
- [x] **Social media links** (Greg)
- [x] **Stripe Checkout integration (placeholder setup)** (Greg)
- [x] **Polished styling** (Greg)
- [x] **Technical SEO: robots.txt, sitemap.xml, JSON-LD structured data** (Claude)
- [x] **404 error page for GitHub Pages** (Claude)
- [x] **Analytics scaffold: Plausible snippet on all pages** (Claude)
- [x] **Favicon + web app manifest** (Claude)
- [x] **Email signup / notify list** (Claude)
- [ ] Source product images for caps (Tom)
- [ ] Add real product descriptions & pricing
- [ ] Activate Stripe (add live keys & Price IDs)
- [ ] Set up custom domain megacaps.co.uk
- [ ] Activate analytics (register megacaps.co.uk on plausible.io)
- [ ] Activate email capture (create Formspree form, update form ID in index.html)

## Phase 2 — Growth

- [ ] Additional product lines (hoodies, t-shirts, etc.)
- [ ] Netlify deploy previews for PRs (gives live URLs for each branch)

---

## Current Status — 2026-02-08

**PR #4 is open:** https://github.com/tompickup23/megacaps/pull/4
- Greg's complete MVP: product grid, cart, checkout, about page, SEO, polished design
- Supersedes PRs #1, #2, #3 (all closed)
- Ready for Tom to review and merge

**Claude's branch:** `claude/find-useful-prs-f0t5j`
- Technical SEO infrastructure (robots.txt, sitemap.xml, JSON-LD structured data)
- 404 error page for GitHub Pages
- Plausible analytics snippet on all pages (needs domain activation to go live)
- SVG favicon + web app manifest for browser tabs / mobile home screen
- Based on Greg's `feature/polished-design-final` — merges cleanly after PR #4

**After PR #4 + Claude's branch merge:**
1. Tom adds product images (replace placeholders in index.html)
2. Tom creates Stripe account → shares publishable key + Price IDs
3. Greg activates Stripe (update js/shop.js with live keys)
4. Tom registers megacaps.co.uk on plausible.io (analytics go live automatically)
5. Set up custom domain DNS (megacaps.co.uk)

*Last updated: 2026-02-08*
