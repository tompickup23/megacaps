# MEGA Caps

**Make England Great Again** — Premium quality caps, white-label ready.

## About

Niche merchandise for the UK market. Dropship and white-label options available.

## Website

- **Live:** https://megacaps.co.uk
- **Repo:** https://github.com/tompickup23/megacaps

## Collaboration

Managed by **@tompickup23**, **@gregjrothwell**, and **Claude** (AI dev).

See [CONTRIBUTING.md](CONTRIBUTING.md) for workflow, branch conventions, and coding standards.
See [TASKS.md](TASKS.md) for the shared task board.

## Project Structure

```
megacaps/
├── index.html            # Shop homepage (product grid + JSON-LD structured data)
├── cart.html             # Shopping cart (localStorage)
├── about.html            # About & contact page
├── success.html          # Post-payment confirmation
├── 404.html              # Custom error page
├── css/style.css         # Brand stylesheet (navy/red/gold palette, BEM, responsive)
├── js/shop.js            # Cart logic, Stripe checkout scaffold
├── images/               # Product photos (placeholders — to be replaced)
│   └── favicon.svg       # Site favicon
├── site.webmanifest      # Web app manifest
├── robots.txt            # Search engine crawl rules
├── sitemap.xml           # Page index for search engines
├── CONTRIBUTING.md       # How we work together
├── TASKS.md              # Shared task board
├── LOGO-PROMPTS.md       # 50 AI logo design prompts
├── README.md             # This file
└── .github/workflows/    # GitHub Pages deploy
```

## Status

MVP built — product grid, cart, Stripe checkout scaffold, about page, SEO, analytics. Waiting on product images and Stripe activation. See [TASKS.md](TASKS.md) for details.