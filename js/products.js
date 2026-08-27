/* ============================================================
   MEGA Caps product catalogue. Single source of truth.

   To switch on card payments for a product:
   1. Create the product + price in the Stripe Dashboard.
   2. Create a Payment Link for it (Product catalog > Payment links),
      with "Let customers adjust quantity" and shipping address
      collection enabled.
   3. Paste the https://buy.stripe.com/... URL into stripeLink below.

   While stripeLink is empty the shop falls back to the reserve flow:
   the customer leaves their email and order, and we invoice them.
   See docs/STRIPE-SETUP.md for the full walkthrough.
   ============================================================ */

window.MEGA_PRODUCTS = [
    {
        id: 'mega-classic-red',
        name: 'MEGA Classic Red',
        price: 24.99,
        img: 'images/products/classic-red.jpg',
        badge: 'The Original',
        badgeClass: 'product-card__badge--red',
        desc: 'The cap that started it all. Bold red twill, crisp white MEGA embroidery and a St George flag patch on the side.',
        available: true,
        stripeLink: ''
    },
    {
        id: 'mega-classic-navy',
        name: 'MEGA Classic Navy',
        price: 24.99,
        img: 'images/products/classic-navy.jpg',
        badge: '',
        badgeClass: '',
        desc: 'Understated power. Deep navy twill with gold MEGA embroidery, brass eyelets and a curved brim you shape yourself.',
        available: true,
        stripeLink: ''
    },
    {
        id: 'mega-white-red',
        name: 'MEGA White & Red',
        price: 26.99,
        img: 'images/products/white-red.jpg',
        badge: '',
        badgeClass: '',
        desc: 'The flagbearer. Clean white canvas, a red cross running through the crown and a red brim. No doubt where you stand.',
        available: true,
        stripeLink: ''
    },
    {
        id: 'mega-black-gold',
        name: 'MEGA Black & Gold',
        price: 29.99,
        img: 'images/products/black-gold.jpg',
        badge: 'Limited Edition',
        badgeClass: 'product-card__badge--gold',
        desc: 'When ordinary will not do. Soft-touch black suede finish, gold crown detail and a leather strap with a gold buckle.',
        available: true,
        stripeLink: ''
    },
    {
        id: 'mega-camo',
        name: 'MEGA Camo Edition',
        price: 27.99,
        img: 'images/products/camo.jpg',
        badge: 'Coming Soon',
        badgeClass: '',
        desc: 'Tactical meets style. Woodland camo with tone-on-tone MEGA embroidery and a subdued Union flag patch.',
        available: false,
        stripeLink: ''
    },
    {
        id: 'mega-union-jack',
        name: 'MEGA Union Jack',
        price: 28.99,
        img: 'images/products/union-jack.jpg',
        badge: 'Coming Soon',
        badgeClass: '',
        desc: 'Wearable art. The full Union flag embroidered across the crown in navy, red and white, with MEGA stitched at the back.',
        available: false,
        stripeLink: ''
    }
];

/* Formspree endpoint used for the waitlist and the reserve-order flow. */
window.MEGA_FORMSPREE = 'https://formspree.io/f/mzylkbwd';
