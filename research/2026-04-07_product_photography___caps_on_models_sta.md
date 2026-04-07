# Research: Product photography — caps on models/stands

Generated: 2026-04-07
Project: megacaps

### **Research Brief: Product Photography for Megacaps (Caps on Models/Stands)**
**Priority: M (High)**

---

#### **1. Key Findings**
- **Project Scope**: Megacaps requires high-quality product photography for e-commerce (models/stands) to showcase caps effectively.
- **Current Gaps**:
  - No existing product photography assets in the repo (`/assets/` or `/images/` not referenced in `TASKS.md`).
  - No supplier/reseller guidelines for photography specs (e.g., background, lighting).
  - Stripe integration (`cart.html`) is live, but product images are placeholders (see `index.html` line 20: `<img src="assets/placeholder-cap.jpg" alt="Megacaps">`).

- **GitHub Context**:
  - `TASKS.md` (root dir) lists "product photography" as a blocker but lacks details.
  - `PRODUCT-COPY.md` may contain branding guidelines (check for color codes/fonts).

---

#### **2. Next Steps**
**A. Define Photography Specs**
- **Action**: Create a `PHOTOGRAPHY-SPECS.md` file in the repo root with:
  - Resolution: 2048x2048px (e-commerce standard).
  - Background: White seamless backdrop (or lifestyle shots with models/stands).
  - File Naming: `cap-[color]-[style].jpg` (e.g., `cap-red-trucker.jpg`).
- **Command**:
  ```bash
  touch PHOTOGRAPHY-SPECS.md
  ```
- **Reference**: Add to `TASKS.md` under "Product Photography".

**B. Source Photography Options**
- **Option 1: DIY (Low Cost)**
  - Use a smartphone (iPhone/Android) with natural light + white poster board.
  - **Tool**: [Canva’s Product Photo Background Remover](https://www.canva.com/photo-editor/) (free).
  - **Example Setup**:
    - Place cap on mannequin/stand (e.g., Amazon [mannequin head](https://www.amazon.co.uk/s?k=mannequin+head)).
    - Shoot in a well-lit room (avoid shadows).

- **Option 2: Professional (Higher Quality)**
  - **Supplier**: [Printful’s Photography Service](https://www.printful.com/photography) (integrates with Stripe).
  - **Cost**: ~£0.50–£2 per image.
  - **Alternative**: Local photographers (search "product photographer near Burnley" on [Fiverr](https://www.fiverr.com/) or [ Bark](https://www.bark.com/)).

**C. Update Website Assets**
- **Action**: Replace placeholders in `index.html` and `cart.html`:
  - **File Path**: `/assets/` (create if missing).
  - **Command**:
    ```bash
    mkdir -p assets/product
    ```
  - **Example Image URL**: `/assets/product/cap-red-trucker.jpg`.

**D. Stripe Integration Check**
- Ensure product images are linked in Stripe’s product catalog (check `cart.html` for `data-image` attributes).

---
#### **3. Resources**
| **Tool/Service**       | **URL**                          | **Purpose**                          |
|-------------------------|----------------------------------|--------------------------------------|
| Canva Background Remover | [canva.com/photo-editor](https://www.canva.com/photo-editor/) | Remove backgrounds. |
| Printful Photography    | [printful.com/photography](https://www.printful.com/photography) | Professional images. |
| Fiverr Photographers    | [fiverr.com](https://www.fiverr.com/) | Budget-friendly options. |
| Stripe Product Images   | [stripe.com/docs/products](https://stripe.com/docs/products) | API/image linking. |

---
#### **4. Risks/Blockers**
- **Time**: DIY photography may take 2–4 hours per cap style.
- **Cost**: Professional photography may exceed budget (~£50–£200 for 10–20 images).
- **Stripe Sync**: Ensure images are uploaded to Stripe’s dashboard (not just the website).

---
**Action Owner**: Tom Pickup (implement `PHOTOGRAPHY-SPECS.md` and source images).
**Deadline**: Within 2 weeks for launch readiness.