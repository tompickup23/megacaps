/* ===========================
   MEGA Caps — Shop Logic
   Cart management & interactions
   =========================== */

(function () {
    'use strict';

    // ---- Cart stored in localStorage ----
    function getCart() {
        try {
            return JSON.parse(localStorage.getItem('megacaps_cart')) || [];
        } catch {
            return [];
        }
    }

    function saveCart(cart) {
        localStorage.setItem('megacaps_cart', JSON.stringify(cart));
        updateCartBadge();
    }

    function addToCart(product) {
        var cart = getCart();
        var existing = cart.find(function (item) { return item.id === product.id; });
        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
        }
        saveCart(cart);
    }

    function removeFromCart(productId) {
        var cart = getCart().filter(function (item) { return item.id !== productId; });
        saveCart(cart);
    }

    function cartTotal() {
        return getCart().reduce(function (sum, item) { return sum + item.price * item.qty; }, 0);
    }

    function cartCount() {
        return getCart().reduce(function (sum, item) { return sum + item.qty; }, 0);
    }

    // ---- Badge ----
    function updateCartBadge() {
        var badge = document.querySelector('.cart-count');
        if (badge) {
            var count = cartCount();
            badge.textContent = count;
            badge.style.display = count > 0 ? 'inline-flex' : 'none';
        }
    }

    // ---- Add-to-cart buttons on shop page ----
    function bindAddButtons() {
        document.querySelectorAll('[data-add-to-cart]').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                var product = {
                    id: btn.getAttribute('data-id'),
                    name: btn.getAttribute('data-name'),
                    price: parseFloat(btn.getAttribute('data-price'))
                };
                addToCart(product);
                btn.textContent = 'Added!';
                setTimeout(function () { btn.textContent = 'Add to Cart'; }, 1200);
            });
        });
    }

    // ---- Stripe Checkout (client-only mode) ----
    // TODO: Replace with your actual Stripe publishable key and Price IDs
    var STRIPE_PUBLISHABLE_KEY = 'pk_test_YOUR_KEY_HERE'; // Replace with pk_live_... for production
    
    // Map product IDs to Stripe Price IDs (create these in your Stripe Dashboard)
    var STRIPE_PRICE_IDS = {
        'mega-classic-red': 'price_1234567890',    // Replace with actual Price ID
        'mega-classic-navy': 'price_1234567891',   // Replace with actual Price ID
        'mega-white-red': 'price_1234567892',      // Replace with actual Price ID
        'mega-black-gold': 'price_1234567893'      // Replace with actual Price ID
    };

    function redirectToStripeCheckout() {
        var cart = getCart();
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        // Build line items for Stripe Checkout
        var lineItems = cart.map(function (item) {
            var priceId = STRIPE_PRICE_IDS[item.id];
            if (!priceId || priceId.indexOf('price_') !== 0) {
                alert('Checkout not configured for: ' + item.name + '. Please contact support.');
                throw new Error('Missing Stripe Price ID for: ' + item.id);
            }
            return {
                price: priceId,
                quantity: item.qty
            };
        });

        // Build Stripe Checkout URL (client-only mode)
        var successUrl = window.location.origin + '/success.html';
        var cancelUrl = window.location.origin + '/cart.html';
        
        // Encode line items for URL
        var params = new URLSearchParams();
        params.append('mode', 'payment');
        params.append('success_url', successUrl);
        params.append('cancel_url', cancelUrl);
        
        lineItems.forEach(function (item, index) {
            params.append('line_items[' + index + '][price]', item.price);
            params.append('line_items[' + index + '][quantity]', item.quantity);
        });

        // Redirect to Stripe Checkout
        var checkoutUrl = 'https://checkout.stripe.com/c/pay/cs_test_' + btoa(JSON.stringify({
            publishableKey: STRIPE_PUBLISHABLE_KEY,
            lineItems: lineItems,
            successUrl: successUrl,
            cancelUrl: cancelUrl
        })) + '?' + params.toString();

        // Simpler approach: Use Stripe's checkout redirect with session creation via fetch
        // For now, alert user that Stripe needs setup
        alert('Stripe Checkout configured!\n\nTo complete setup:\n1. Add your Stripe Publishable Key\n2. Create Price IDs in Stripe Dashboard\n3. Update STRIPE_PRICE_IDS in js/shop.js');
        
        // Uncomment below when Stripe is configured:
        // window.location.href = checkoutUrl;
    }

    function bindCheckoutButton() {
        var btn = document.querySelector('#checkout-btn');
        if (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                redirectToStripeCheckout();
            });
        }
    }

    // ---- Render cart page ----
    function renderCartPage() {
        var tbody = document.querySelector('#cart-body');
        var totalEl = document.querySelector('#cart-total');
        var emptyEl = document.querySelector('#cart-empty');
        var tableEl = document.querySelector('#cart-table-wrap');
        if (!tbody) return; // not on cart page

        var cart = getCart();

        if (cart.length === 0) {
            if (emptyEl) emptyEl.style.display = 'block';
            if (tableEl) tableEl.style.display = 'none';
            return;
        }

        if (emptyEl) emptyEl.style.display = 'none';
        if (tableEl) tableEl.style.display = 'block';

        tbody.innerHTML = '';
        cart.forEach(function (item) {
            var tr = document.createElement('tr');
            tr.innerHTML =
                '<td>' + item.name + '</td>' +
                '<td>' + item.qty + '</td>' +
                '<td>&pound;' + (item.price * item.qty).toFixed(2) + '</td>' +
                '<td><button class="remove-btn" data-remove="' + item.id + '">Remove</button></td>';
            tbody.appendChild(tr);
        });

        if (totalEl) {
            totalEl.textContent = 'Total: \u00a3' + cartTotal().toFixed(2);
        }

        // Bind remove buttons
        document.querySelectorAll('[data-remove]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                removeFromCart(btn.getAttribute('data-remove'));
                renderCartPage();
            });
        });
    }

    // ---- Scroll behavior for header ----
    function handleHeaderScroll() {
        var header = document.getElementById('siteHeader');
        if (!header) return;
        
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // ---- Size Guide Modal ----
    function bindSizeGuideModal() {
        var modal = document.getElementById('sizeGuideModal');
        if (!modal) return;

        var openButtons = document.querySelectorAll('.open-size-guide');
        var closeButton = document.querySelector('.modal-close');

        openButtons.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        if (closeButton) {
            closeButton.addEventListener('click', function () {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }

        // Close on background click
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // ---- Init ----
    document.addEventListener('DOMContentLoaded', function () {
        updateCartBadge();
        bindAddButtons();
        bindCheckoutButton();
        renderCartPage();
        bindSizeGuideModal();
    });

    // Scroll event listener
    window.addEventListener('scroll', handleHeaderScroll);

    // Expose for inline use if needed
    window.MegaCart = { addToCart: addToCart, getCart: getCart, removeFromCart: removeFromCart };
})();
