# Research: Add product variants — colours, sizes, embroidery options

Generated: 2026-04-07
Project: megacaps

### **Megacaps Product Variants Research Brief**
**Priority: M (Medium) – Product variant implementation**

---

#### **1. Key Findings**
- **Current Product Setup**: The project (`tompickup23/megacaps`) currently lacks structured product variants. The main product file (`index.html`) likely uses static product cards (check `PRODUCT-COPY.md` for details).
- **Stripe Integration**: Stripe is used for checkout (see `cart.html` for Stripe.js references). Variants must align with Stripe’s SKU system.
- **No Variant Logic**: No JavaScript or backend logic exists for dynamic variant selection (e.g., color/size dropdowns).

**Relevant Files**:
- `index.html` (product grid)
- `PRODUCT-COPY.md` (product descriptions)
- `TASKS.md` (open tasks)

---

#### **2. Next Steps**
**A. Define Variants in Product Data**
1. **Edit `PRODUCT-COPY.md`** to include variant metadata (e.g., colors, sizes, embroidery options).
   - Example:
     ```markdown
     - **Color**: Red, Blue, Black
     - **Size**: S, M, L, XL
     - **Embroidery**: Left Chest (£2), Back (£3)
     ```
2. **Update `index.html`** to include dropdowns for variants.
   - Use `<select>` elements for each variant type.

**B. Stripe SKU Mapping**
1. **Create Stripe SKUs** for each variant combination (e.g., `Red-S-LeftChest`).
   - Use Stripe CLI or Dashboard:
     ```bash
     stripe sku create --price=1500 --currency=gbp --inventory=in_stock --product=prod_red_cap
     ```
   - Reference: [Stripe SKU Docs](https://stripe.com/docs/api/skus)

**C. JavaScript Logic**
1. **Add Variant Selection Logic** (e.g., `cart.js`):
   ```javascript
   // Example: Update price when variant changes
   document.getElementById('size-select').addEventListener('change', (e) => {
     const price = e.target.dataset.price;
     document.getElementById('price-display').textContent = `£${price}`;
   });
   ```
   - File: `js/cart.js` (create if missing).

**D. Test Checkout Flow**
1. Verify Stripe checkout updates with selected variants.
   - Command to test locally:
     ```bash
     python -m http.server 8000
     ```
   - Test URL: `http://localhost:8000/cart.html`

---

#### **3. Resources**
- **Stripe Variants**: [Stripe SKU API](https://stripe.com/docs/api/skus)
- **Dropdown UI**: [W3Schools Dropdowns](https://www.w3schools.com/tags/tag_select.asp)
- **GitHub Repo**: [tompickup23/megacaps](https://github.com/tompickup23/megacaps)

---
#### **4. Risks/Blockers**
- **Stripe SKU Limits**: Stripe SKUs are deprecated (use `price` objects instead).
  - **Fix**: Migrate to Stripe `price` objects (see [Stripe Migration Guide](https://stripe.com/docs/products-prices/migrate-prices)).
- **No Backend**: Variants must be client-side only (no server logic).
  - **Fix**: Use JavaScript to dynamically update Stripe `data-price` attributes.

---
**Action**: Start with `PRODUCT-COPY.md` updates, then implement dropdowns in `index.html`. Test Stripe integration via localhost.