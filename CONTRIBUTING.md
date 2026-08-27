# Contributing to MEGA Caps

## Workflow

1. **Branch from `main`**: create a feature branch for every change (`feature/add-product-page`, `fix/cart-bug`, etc.)
2. **Keep commits small**: one logical change per commit.
3. **Open a Pull Request**: describe what changed and why.
4. **Review and merge**: at least one approval before merging to `main`.
5. **Deploy is automatic**: pushing to `main` triggers the GitHub Pages deploy.

## Conventions

- **HTML**: semantic elements, no inline styles (use `css/style.css`).
- **CSS**: BEM-ish naming (`.product-card`, `.product-card__title`). Stick to the palette in `:root`.
- **JS**: vanilla JS, no frameworks. Product data lives ONLY in `js/products.js`; pages render from it.
- **Copy**: British English, no em-dashes anywhere, prices in £.
- **Images**: optimise before committing (products ~1200px JPEG, under 300 KB).
- **Secrets**: none in this repo, ever. Stripe Payment Links are public URLs and are fine; API keys are not.

## Quick Start

No build step. Open `index.html` in a browser, or push to `main` for live deploy.
