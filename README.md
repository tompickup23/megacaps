# MEGA Caps

**Make England Great Again.** Premium quality caps, designed in England.

## Website

- **Live:** https://megacaps.co.uk

## Project Structure

```
megacaps/
├── index.html            # Shop homepage (product grid + JSON-LD)
├── cart.html             # Shopping cart (localStorage)
├── about.html            # Brand story
├── faq.html              # FAQ
├── press.html            # Press kit
├── returns.html          # Returns policy
├── terms.html            # Terms of sale
├── privacy.html          # Privacy policy
├── success.html          # Post-payment confirmation
├── thanks.html           # Post-form thank you
├── 404.html              # Custom error page
├── css/style.css         # Design system (red/navy/gold, Archivo Black + Inter)
├── js/products.js        # Product catalogue + Stripe Payment Link slots
├── js/shop.js            # Grid render, cart, checkout logic
├── images/               # Product photography, hero, OG image
├── public/brand/         # Logo system (baked-path SVGs) + brand guide
└── docs/                 # Internal docs (Stripe setup, suppliers, outreach)
```

## How the shop takes money

`js/products.js` holds one `stripeLink` slot per product. With a link set, the
buy button goes straight to a secure Stripe Payment Link. With no link set, the
cart falls back to a reserve-order flow (Formspree email, we reply with an
invoice). No keys or secrets live in this repo. Setup walkthrough:
[docs/STRIPE-SETUP.md](docs/STRIPE-SETUP.md).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for workflow and coding standards, and
[TASKS.md](TASKS.md) for the shared task board.
