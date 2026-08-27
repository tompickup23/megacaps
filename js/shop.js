/* ============================================================
   MEGA Caps shop logic: product grid, cart, checkout.

   Checkout has two modes per product, decided by products.js:
   - stripeLink set   -> secure Stripe Payment Link (card payment)
   - stripeLink empty -> reserve flow via Formspree (we invoice)
   No keys or secrets live in this file.
   ============================================================ */

(function () {
    'use strict';

    var PRODUCTS = window.MEGA_PRODUCTS || [];
    var FORMSPREE = window.MEGA_FORMSPREE || '';

    function byId(id) {
        return PRODUCTS.find(function (p) { return p.id === id; });
    }

    function money(n) {
        return '£' + n.toFixed(2);
    }

    // ---- Cart stored in localStorage ----
    function getCart() {
        try {
            var cart = JSON.parse(localStorage.getItem('megacaps_cart')) || [];
            // Drop anything no longer in the catalogue
            return cart.filter(function (item) { return !!byId(item.id); });
        } catch (e) {
            return [];
        }
    }

    function saveCart(cart) {
        try {
            localStorage.setItem('megacaps_cart', JSON.stringify(cart));
        } catch (e) { /* private mode: cart lives for the page only */ }
        updateCartBadge();
    }

    function addToCart(id, qty) {
        var cart = getCart();
        var existing = cart.find(function (item) { return item.id === id; });
        if (existing) {
            existing.qty += qty || 1;
        } else {
            cart.push({ id: id, qty: qty || 1 });
        }
        saveCart(cart);
    }

    function setQty(id, qty) {
        var cart = getCart();
        var item = cart.find(function (i) { return i.id === id; });
        if (!item) return;
        item.qty = qty;
        saveCart(cart.filter(function (i) { return i.qty > 0; }));
    }

    function cartTotal() {
        return getCart().reduce(function (sum, item) {
            var p = byId(item.id);
            return sum + (p ? p.price * item.qty : 0);
        }, 0);
    }

    function cartCount() {
        return getCart().reduce(function (sum, item) { return sum + item.qty; }, 0);
    }

    function updateCartBadge() {
        document.querySelectorAll('.cart-count').forEach(function (badge) {
            var count = cartCount();
            badge.textContent = count;
            badge.style.display = count > 0 ? 'inline-flex' : 'none';
        });
    }

    // ---- Product grid ----
    function renderProductGrid() {
        var grid = document.querySelector('#product-grid');
        if (!grid) return;

        PRODUCTS.forEach(function (p) {
            var card = document.createElement('div');
            card.className = 'product-card' + (p.available ? '' : ' coming-soon');

            var media = document.createElement('div');
            media.className = 'product-card__media';
            var img = document.createElement('img');
            img.src = p.img;
            img.alt = p.name + ' cap';
            img.loading = 'lazy';
            img.width = 600;
            img.height = 600;
            media.appendChild(img);
            if (p.badge) {
                var badge = document.createElement('span');
                badge.className = 'product-card__badge ' + (p.badgeClass || '');
                badge.textContent = p.badge;
                media.appendChild(badge);
            }

            var body = document.createElement('div');
            body.className = 'product-card__body';

            var title = document.createElement('h3');
            title.className = 'product-card__title';
            title.textContent = p.name;

            var desc = document.createElement('p');
            desc.className = 'product-card__desc';
            desc.textContent = p.desc;

            var meta = document.createElement('div');
            meta.className = 'product-card__meta';
            var price = document.createElement('span');
            price.className = 'product-card__price';
            price.textContent = money(p.price);
            var sizeBtn = document.createElement('button');
            sizeBtn.className = 'product-card__size-link open-size-guide';
            sizeBtn.type = 'button';
            sizeBtn.textContent = 'Size guide';
            meta.appendChild(price);
            meta.appendChild(sizeBtn);

            var actions = document.createElement('div');
            actions.className = 'product-card__actions';

            if (p.available) {
                var buy = document.createElement('button');
                buy.className = 'btn btn--primary';
                buy.type = 'button';
                buy.textContent = p.stripeLink ? 'Buy Now' : 'Add to Cart';
                buy.addEventListener('click', function () {
                    if (p.stripeLink) {
                        window.location.href = p.stripeLink;
                    } else {
                        addToCart(p.id, 1);
                        buy.textContent = 'Added';
                        setTimeout(function () { buy.textContent = 'Add to Cart'; }, 1200);
                    }
                });
                actions.appendChild(buy);
                if (p.stripeLink) {
                    var add = document.createElement('button');
                    add.className = 'btn btn--outline';
                    add.type = 'button';
                    add.textContent = 'Add to Cart';
                    add.addEventListener('click', function () {
                        addToCart(p.id, 1);
                        add.textContent = 'Added';
                        setTimeout(function () { add.textContent = 'Add to Cart'; }, 1200);
                    });
                    actions.appendChild(add);
                }
            } else {
                var notify = document.createElement('a');
                notify.className = 'btn btn--outline';
                notify.href = '#notify';
                notify.textContent = 'Notify Me';
                actions.appendChild(notify);
            }

            body.appendChild(title);
            body.appendChild(desc);
            body.appendChild(meta);
            body.appendChild(actions);
            card.appendChild(media);
            card.appendChild(body);
            grid.appendChild(card);
        });
    }

    // ---- Cart page ----
    function renderCartPage() {
        var wrap = document.querySelector('#cart-items');
        if (!wrap) return;

        var emptyEl = document.querySelector('#cart-empty');
        var panelEl = document.querySelector('#cart-panel');
        var cart = getCart();

        if (cart.length === 0) {
            if (emptyEl) emptyEl.style.display = 'block';
            if (panelEl) panelEl.style.display = 'none';
            return;
        }
        if (emptyEl) emptyEl.style.display = 'none';
        if (panelEl) panelEl.style.display = 'block';

        wrap.textContent = '';
        cart.forEach(function (item) {
            var p = byId(item.id);
            if (!p) return;

            var row = document.createElement('div');
            row.className = 'cart-row';

            var img = document.createElement('img');
            img.src = p.img;
            img.alt = p.name;

            var mid = document.createElement('div');
            var name = document.createElement('div');
            name.className = 'cart-row__name';
            name.textContent = p.name;
            var unit = document.createElement('div');
            unit.className = 'cart-row__unit';
            unit.textContent = money(p.price) + ' each';
            var qty = document.createElement('div');
            qty.className = 'cart-row__qty';
            var minus = document.createElement('button');
            minus.className = 'qty-btn';
            minus.type = 'button';
            minus.textContent = '−';
            minus.setAttribute('aria-label', 'Reduce quantity of ' + p.name);
            minus.addEventListener('click', function () { setQty(p.id, item.qty - 1); renderCartPage(); });
            var qn = document.createElement('span');
            qn.textContent = item.qty;
            var plus = document.createElement('button');
            plus.className = 'qty-btn';
            plus.type = 'button';
            plus.textContent = '+';
            plus.setAttribute('aria-label', 'Increase quantity of ' + p.name);
            plus.addEventListener('click', function () { setQty(p.id, item.qty + 1); renderCartPage(); });
            qty.appendChild(minus);
            qty.appendChild(qn);
            qty.appendChild(plus);
            mid.appendChild(name);
            mid.appendChild(unit);
            mid.appendChild(qty);

            var right = document.createElement('div');
            right.className = 'cart-row__line';
            var line = document.createElement('div');
            line.className = 'cart-row__price';
            line.textContent = money(p.price * item.qty);
            var remove = document.createElement('button');
            remove.className = 'cart-remove';
            remove.type = 'button';
            remove.textContent = 'Remove';
            remove.addEventListener('click', function () { setQty(p.id, 0); renderCartPage(); });
            right.appendChild(line);
            right.appendChild(remove);

            row.appendChild(img);
            row.appendChild(mid);
            row.appendChild(right);
            wrap.appendChild(row);
        });

        var totalEl = document.querySelector('#cart-total');
        if (totalEl) totalEl.textContent = money(cartTotal());

        renderCheckoutArea(cart);
    }

    function renderCheckoutArea(cart) {
        var area = document.querySelector('#checkout-area');
        if (!area) return;
        area.textContent = '';

        var allPayable = cart.length > 0 && cart.every(function (item) {
            var p = byId(item.id);
            return p && p.stripeLink;
        });

        if (allPayable && cart.length === 1) {
            // One design: straight to its Stripe page.
            var p = byId(cart[0].id);
            var pay = document.createElement('a');
            pay.className = 'btn btn--primary btn--block';
            pay.href = p.stripeLink;
            pay.textContent = 'Checkout with Stripe';
            area.appendChild(pay);
        } else if (allPayable) {
            // Several designs: one secure Stripe payment per design.
            var note = document.createElement('p');
            note.className = 'cart-note';
            note.textContent = 'Each design checks out on its own secure Stripe page. Set the quantity on the payment page.';
            area.appendChild(note);
            cart.forEach(function (item) {
                var prod = byId(item.id);
                var btn = document.createElement('a');
                btn.className = 'btn btn--primary btn--block';
                btn.style.marginTop = '0.6rem';
                btn.href = prod.stripeLink;
                btn.textContent = 'Pay for ' + prod.name + ' (' + item.qty + ')';
                area.appendChild(btn);
            });
        } else {
            // Payments not yet live: reserve flow. We reply with an invoice.
            renderReserveForm(area, cart);
        }
    }

    function renderReserveForm(area, cart) {
        var note = document.createElement('p');
        note.className = 'cart-note';
        note.textContent = 'Card payments are launching shortly. Reserve your order below and we will email you a secure payment link. Nothing is charged until you pay.';
        area.appendChild(note);

        var form = document.createElement('form');
        form.action = FORMSPREE;
        form.method = 'POST';
        form.style.marginTop = '0.8rem';
        form.style.display = 'grid';
        form.style.gap = '0.6rem';

        var summary = cart.map(function (item) {
            var p = byId(item.id);
            return item.qty + ' x ' + p.name + ' (' + money(p.price * item.qty) + ')';
        }).join('; ') + '; total ' + money(cartTotal());

        var hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.name = 'order';
        hidden.value = summary;

        var subject = document.createElement('input');
        subject.type = 'hidden';
        subject.name = '_subject';
        subject.value = 'MEGA Caps order reservation';

        var next = document.createElement('input');
        next.type = 'hidden';
        next.name = '_next';
        next.value = 'https://megacaps.co.uk/thanks.html';

        var email = document.createElement('input');
        email.type = 'email';
        email.name = 'email';
        email.required = true;
        email.placeholder = 'Your email address';
        email.className = 'input-light';

        var submit = document.createElement('button');
        submit.type = 'submit';
        submit.className = 'btn btn--navy btn--block';
        submit.textContent = 'Reserve Order (' + money(cartTotal()) + ')';

        form.appendChild(hidden);
        form.appendChild(subject);
        form.appendChild(next);
        form.appendChild(email);
        form.appendChild(submit);
        area.appendChild(form);
    }

    // ---- Header scroll state ----
    function handleHeaderScroll() {
        var header = document.getElementById('siteHeader');
        if (!header) return;
        header.classList.toggle('scrolled', window.scrollY > 50);
    }

    // ---- Size guide modal ----
    function bindSizeGuideModal() {
        var modal = document.getElementById('sizeGuideModal');
        if (!modal) return;

        document.addEventListener('click', function (e) {
            if (e.target.closest && e.target.closest('.open-size-guide')) {
                e.preventDefault();
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });

        var closeButton = modal.querySelector('.modal-close');
        if (closeButton) {
            closeButton.addEventListener('click', function () {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // ---- Init ----
    document.addEventListener('DOMContentLoaded', function () {
        renderProductGrid();
        updateCartBadge();
        renderCartPage();
        bindSizeGuideModal();
    });

    window.addEventListener('scroll', handleHeaderScroll);

    window.MegaCart = { addToCart: addToCart, getCart: getCart, setQty: setQty };
})();
