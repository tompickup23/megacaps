# Contributing to MEGA Caps

## Collaborators

| Who | GitHub | Role |
|-----|--------|------|
| Tom Pickup | @tompickup23 | Owner / Product |
| Greg Rothwell | @gregjrothwell | Collaborator / Dev |
| Claude | — | AI Dev (SEO, infrastructure, analytics) |

## Workflow

1. **Branch from `main`** — create a feature branch for every change (`feature/add-product-page`, `fix/cart-bug`, etc.)
2. **Keep commits small** — one logical change per commit.
3. **Open a Pull Request** — describe what changed and why. Tag the other collaborator for review.
4. **Review & merge** — at least one approval before merging to `main`.
5. **Deploy is automatic** — pushing to `main` triggers GitHub Pages deploy.

## Project Structure

```
megacaps/
├── index.html          # Shop homepage (product grid + JSON-LD)
├── cart.html           # Shopping cart
├── about.html          # About & contact page
├── success.html        # Post-payment confirmation
├── 404.html            # Custom error page (GitHub Pages)
├── css/
│   └── style.css       # Shared styles & branding
├── js/
│   └── shop.js         # Cart logic & interactions
├── images/             # Product photos & assets
│   └── favicon.svg     # Site favicon
├── site.webmanifest    # Web app manifest (favicon, theme)
├── robots.txt          # Search engine crawl rules
├── sitemap.xml         # Page index for search engines
├── CONTRIBUTING.md     # This file
├── TASKS.md            # Shared task board
├── README.md           # Project overview
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Pages CI
```

## Conventions

- **HTML** — semantic elements, no inline styles (use `css/style.css`).
- **CSS** — BEM-ish naming (`.product-card`, `.product-card__title`).
- **JS** — vanilla JS, no frameworks needed for now. Keep it simple.
- **Images** — optimise before committing (< 200 KB each). Use `images/` directory.
- **Colours** — stick to the brand palette defined in `css/style.css` (`:root` variables).

## Quick Start

No build step required. Just open `index.html` in a browser, or push to `main` for live deploy.
