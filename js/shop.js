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

    // ---- Init ----
    document.addEventListener('DOMContentLoaded', function () {
        updateCartBadge();
        bindAddButtons();
        renderCartPage();
    });

    // Expose for inline use if needed
    window.MegaCart = { addToCart: addToCart, getCart: getCart, removeFromCart: removeFromCart };
})();
