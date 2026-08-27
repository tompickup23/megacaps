# Taking card payments: Stripe setup

The site is wired for **Stripe Payment Links**. No backend, no API keys in the
repo, nothing to deploy. One person with the Stripe account does this once;
after that, adding a product is copy-paste.

## Why Payment Links

- Works on a static site (GitHub Pages / Cloudflare Pages), no server.
- Stripe hosts the checkout page: card details never touch megacaps.co.uk.
- Handles quantity, shipping address collection, receipts, VAT if configured.
- The link URL is public by design; committing it to the repo is safe.

## One-time setup (account owner)

1. Create the account at https://dashboard.stripe.com/register (business
   details, bank account for payouts). Note: whoever owns this account is the
   legal merchant of record and their details appear on customer card
   statements and receipts.
2. Set the public business name to **MEGA Caps** and the support email to
   hello@megacaps.co.uk (Settings, Business details) so receipts and
   statements show the brand.
3. Complete identity verification when Stripe asks (required for payouts).

## Per product (about 2 minutes each)

1. Dashboard, Product catalog, **Add product**: name (e.g. "MEGA Classic
   Red"), price in GBP (24.99), one product photo from `images/products/`.
2. Product catalog, **Payment links**, Create: pick the product, then enable
   - "Let customers adjust quantity"
   - "Collect customers' addresses": shipping
   - Add a shipping rate (or a free-shipping rate) when prompted
   - After payment: redirect to `https://megacaps.co.uk/success.html`
3. Copy the `https://buy.stripe.com/...` URL.
4. Paste it into the matching product's `stripeLink` in `js/products.js`.
5. Commit and push. The buy button switches from the reserve flow to
   "Buy Now" automatically.

## How the fallback works meanwhile

While `stripeLink` is empty, the cart shows a reserve form: the customer's
email plus an order summary goes to the Formspree endpoint in
`js/products.js`, and you reply with a Stripe invoice or payment link by
email. Nothing is charged on the site itself.

**Blocker as of 27 Aug 2026:** the Formspree form ID `mzylkbwd` does not
exist (the API returns FORM_NOT_FOUND), so the reserve form and the waitlist
signup silently fail. Create a form at https://formspree.io for
megacaps.co.uk and replace the ID in `index.html` and `js/products.js`.

## Later: one combined basket payment

One Stripe payment for a mixed basket needs a tiny server piece (a Cloudflare
Pages Function creating a Checkout Session with the secret key). That is a
Phase 2 job; nothing about today's setup is thrown away.
