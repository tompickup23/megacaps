# MEGA Caps Task Board

Update this file as you pick up or complete work.

## Relaunch (2026-08-27)

- [x] Full site redesign: new design system (red/navy/gold, Archivo Black + Inter), all pages
- [x] Real product photography for all six caps (`images/products/`)
- [x] New logo system with baked vector paths (`public/brand/`, see BRAND_GUIDE.md)
- [x] Cinematic hero and OG image
- [x] Product catalogue as single data file (`js/products.js`)
- [x] Cart rebuilt: quantities, per-line totals, localStorage
- [x] Checkout: Stripe Payment Link per product, reserve-by-email fallback
- [x] Prices live on every product
- [x] House style pass: no em-dashes, British English

## Blocked on account owners (10 minutes each)

- [ ] **Create the Stripe account** and paste Payment Links into `js/products.js`
      (walkthrough: `docs/STRIPE-SETUP.md`)
- [ ] **Create the Formspree form.** The form ID `mzylkbwd` in `index.html` and
      `js/products.js` returns FORM_NOT_FOUND (verified 27 Aug 2026): email
      capture has never worked. Create a form at formspree.io for
      megacaps.co.uk and replace the ID in both files.
- [x] ~~Register megacaps.co.uk on plausible.io~~ Replaced 27 Aug: the site now
      carries a Cloudflare Web Analytics beacon (site-specific token), live as
      soon as this branch deploys. Plausible is not used.

## Phase 2

- [ ] Combined multi-item checkout (Cloudflare Pages Function + Stripe Checkout
      Session, replaces one-link-per-design)
- [ ] Additional product lines (hoodies, t-shirts)
- [ ] Fulfilment: pick a print-on-demand or stock supplier (see docs/SUPPLIERS.md)

*Last updated: 2026-08-27*
