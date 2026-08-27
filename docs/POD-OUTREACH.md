# MEGA Caps POD Platform Outreach : setup & Integration Guide

**Document Created:** 12 February 2026  
**Purpose:** Zero-inventory POD setup, API integration, white-label branding  
**Timeline:** 2–3 weeks from setup to live launch

---

## PRIORITY OUTREACH SEQUENCE

### TIER 1: Primary (This Week)
- **Printful** : quality + API + proven track record
- Order samples, test embroidery quality

### TIER 2: Secondary (Week 2)
- **Printify** : cost optimization, partner vetting
- Compare quality with Printful

### TIER 3: Optional (Week 2)
- **Gelato** : eU/eco alternative (if applicable)
- **AOP+** : uK-focused alternative (if applicable)

---

## TEMPLATE 1: PRINTFUL ONBOARDING (No Email Needed : self-Service)

**Platform:** printful.com  
**Setup Type:** Automated, no manual outreach needed  
**Timeline:** 15 minutes account setup + sample ordering

### Step-by-Step Printful Setup

**1. Create Account (5 mins)**
- Go to printful.com
- Click "Start Free" or "Sign Up"
- Enter email, password
- Verify email

**2. Upload Logo & Design Assets (10 mins)**
- Logo file (PNG, vector, or JPG)
- Colour variants (if multiple options)
- Embroidery placement specs (front, back, chest)
- Thread colour preferences

**3. Create First Cap Design (15 mins)**
- Select cap style (recommend: Classic 6-panel baseball cap, trucker, snapback)
- Upload logo/design
- Configure embroidery: placement, thread colours, size
- Set up 2–3 colour variants (black, navy, khaki)

**4. Order Samples ($15–$25 total)**
- Select "Order Sample"
- Choose 1–2 designs to test
- Complete payment
- Sample ships in 2–3 days

**5. Sample Evaluation (3–5 days)**
- Inspect embroidery quality: stitching, colour accuracy, durability
- Test fit and comfort
- **Decision:** Approve for launch or adjust design

**6. Setup Integration (30 mins)**
- Choose integration method:
  - **Option A:** Shopify/WooCommerce native (easiest)
  - **Option B:** Printful's API (advanced automation)
  - **Option C:** Manual orders (if low volume)
- Connect store to Printful
- Sync products

**7. Configure Automation**
- Set up automatic order fulfillment
- Configure shipping notifications
- Track orders in real-time

### Printful Sample Order Quick Link
```
1. Go to: printful.com/order-sample
2. Select product: Cap (search "cap")
3. Select style: [Your chosen style]
4. Upload design: [MEGA Caps logo]
5. Preview & order
```

**Sample typically arrives in 5–7 business days**

---

## TEMPLATE 2: PRINTIFY PARTNER VETTING & SETUP

**Platform:** printify.com  
**Setup Type:** Partner selection required (more manual vetting)  
**Timeline:** 20 minutes account + 1 week partner testing

### Step 1: Create Printify Account (5 mins)

- Go to printify.com
- Click "Sign Up"
- Create account with email
- Verify email

### Step 2: Browse Cap Suppliers (15 mins)

**Goal:** Identify 2–3 cap suppliers to test

**How to Find:**
1. In Printify dashboard: "Catalog" → "Browse Products"
2. Search: "embroidered cap" or "baseball cap embroidery"
3. Filter by:
   - **Print Method:** Embroidery
   - **Location:** Europe (for faster UK shipping)
   - **Reviews:** 4.5+ stars
   - **Price:** $8–$12 per unit

**Compare 3 Suppliers:**
- Cost per unit
- Shipping times to UK
- Customer reviews (embroidery quality)
- Available colours

### Step 3: Upload Designs (10 mins per supplier)

For each supplier you're testing:
1. Create product in Printify
2. Upload logo/design
3. Set embroidery placement
4. Configure thread colours
5. Create product variants

### Step 4: Order Samples from Each Supplier ($10–$20 each)

1. Select "Create Sample Order"
2. Choose 1–2 designs per supplier
3. Complete payment
4. Note order date & expected arrival

**Recommended:** Order from 2 suppliers simultaneously for fair comparison

### Step 5: Partner Comparison Spreadsheet

Track samples in this format:

```
| Supplier | Cost/Unit | Thread Quality | Stitching | Fit | Shipping Time | Rating | Notes |
|----------|-----------|---|---|---|---|---|---|
| Partner A | $10 | ⭐⭐⭐ | Neat | Good | 5 days | 4/5 | Good value |
| Partner B | $12 | ⭐⭐⭐⭐ | Perfect | Great | 7 days | 4.5/5 | Best quality |
```

### Step 6: Select Primary Partner

Based on samples, choose 1–2 best partners for launch.

### Step 7: Setup Integration

Same as Printful:
- Connect Shopify/WooCommerce/Etsy
- Enable automatic order sync
- Test sample order through integration

---

## TEMPLATE 3: GELATO SETUP (EU ALTERNATIVE)

**Platform:** gelato.com  
**Setup Type:** Auto, but product selection more limited  
**Timeline:** 10 minutes account + sample verification

### Quick Gelato Setup

1. **Create Account**
   - Go to gelato.com
   - Sign up with email
   - Verify

2. **Check Cap Availability**
   - Browse "Headwear" section
   - Confirm embroidery support
   - Note: Smaller selection than Printful/Printify

3. **Upload Design**
   - Drag & drop logo
   - Set embroidery placement
   - Preview

4. **Order Sample (€12–€20)**
   - Test embroidery quality
   - Verify UK shipping times
   - Assess product fit

5. **Decide:** Use as primary or backup?

---

## TEMPLATE 4: PRINTFUL/PRINTIFY API INTEGRATION (Optional)

**For:** Custom website or advanced automation  
**Complexity:** Medium (requires basic API knowledge)  
**Benefit:** Complete automation, real-time inventory sync

### API Integration Overview

**Printful API:**
- Full REST API for orders, products, shipping
- Webhooks for event notifications
- Python/Node.js SDKs available
- Documentation: printful.com/api

**Printify API:**
- REST API for order management
- Webhook support
- Similar structure to Printful
- Documentation: printify.com/docs

### Basic Integration Steps

1. **Get API Keys**
   - Log in to platform (Printful/Printify)
   - Account → Integrations → API
   - Copy API key

2. **Setup Webhook** (Printful example)
   ```
   Event: order.created
   Webhook URL: yoursite.com/api/fulfill
   ```
   When customer orders, POD platform auto-notifies your system

3. **Integrate with Your Platform**
   - If Shopify: Use native Printful/Printify app (no API needed)
   - If custom: Use API to sync orders

4. **Test Integration**
   - Place test order
   - Verify order appears in POD dashboard
   - Track fulfillment

---

## TEMPLATE 5: WHITE-LABEL PACKAGING SETUP

### Printful White-Label Options

**Available:**
- Custom packaging (add logo to box)
- Custom packing slips
- Custom tissue paper
- Branded unboxing experience

**Cost:** +$1–$3 per order (optional add-on)

**Setup:**
1. In Printful: Settings → White Label
2. Upload logo/branding assets
3. Choose packaging type
4. Preview & approve
5. Enable on products

**MEGA Caps White-Label Strategy:**
- Add logo to shipping box (reinforces brand)
- Include branded insert/thank-you note
- Create unboxing video experience (social content)
- Premium positioning = justify +$2–3 per order

### Printify White-Label

Less centralized (partner-dependent), but available:
- Request white-label through specific partners
- Typically includes: custom packaging, branding
- Cost varies by partner

---

## TEMPLATE 6: STORE SETUP (Shopify Example)

**Assuming:** Shopify store already exists (or need to create)

### Connect Printful to Shopify

1. **Install Printful App**
   - Shopify Admin → Apps → Printful
   - Click "Add app"
   - Authorize connection

2. **Sync Products**
   - Printful dashboard → Products
   - Select products to sync to Shopify
   - Choose sync options (auto price, auto inventory)

3. **Configure Pricing**
   - Set markup for each product
   - MEGA Caps recommendation: £28–£35 per cap
   - Printful cost: $15 + £3 shipping = £14.40
   - Your markup: 94–143% (£13.60–£20.60 profit per unit)

4. **Go Live**
   - Create shop collections
   - Add product descriptions, images
   - Enable product reviews
   - Test checkout flow
   - Launch!

### Setup Automation

**Printful** handles:
- Inventory sync (automatic)
- Order sync (automatic)
- Fulfillment (automatic)
- Shipping tracking (automatic)

**Your workflow:**
- Customer places order
- ✅ Automatic fulfillment (no manual work)
- ✅ Track shipment (customer notification)
- ✅ Receive payment (minus POD costs)

---

## KEY PLATFORM FEATURES COMPARISON

### Order Fulfillment

| Feature | Printful | Printify | Gelato | AOP+ |
|---------|----------|----------|--------|------|
| Automatic order sync | ✅ | ✅ | ✅ | ✅ |
| Manual order option | ✅ | ✅ | ✅ | ✅ |
| Batch order processing | ✅ | ✅ | ✅ | ✅ |
| Webhook notifications | ✅ | ✅ | ✅ | ✅ |
| Order tracking (customer) | ✅ | ✅ | ✅ | ✅ |

### Product Customization

| Feature | Printful | Printify | Gelato | AOP+ |
|---------|----------|----------|--------|------|
| Embroidery placement | ✅ | ✅ (partner-dependent) | ✅ | ✅ |
| Thread colour selection | ✅ (50+) | ✅ (varies) | ✅ | ✅ |
| Design complexity | Up to 6 colours | Up to 4 colours | Up to 4 colours | Up to 4 colours |
| Mockup generator | ✅ | ✅ | ✅ | ✅ |

### Branding & White-Label

| Feature | Printful | Printify | Gelato | AOP+ |
|---------|----------|----------|--------|------|
| Custom packaging | ✅ | ✅ (partner-dependent) | ✅ | ✅ |
| Custom labels | ✅ | ✅ (varies) | ✅ | ✅ |
| Branded unboxing | ✅ | ✅ | ✅ | ✅ |

---

## INTEGRATION CHECKLIST

### Before Going Live

- [ ] **Platform Selected:** Printful primary, Printify backup?
- [ ] **Samples Ordered & Approved:** Embroidery quality tested
- [ ] **Design Finalized:** 3–5 MEGA Caps designs ready
- [ ] **Pricing Set:** £28–£35 per cap (50%+ margin)
- [ ] **Store Created:** Shopify or WooCommerce connected
- [ ] **Products Synced:** All designs live on POD platform
- [ ] **Automation Configured:** Order → Fulfillment → Tracking
- [ ] **White-Label Setup:** Custom packaging/branding enabled
- [ ] **Payment Processing:** Stripe/PayPal configured
- [ ] **Analytics Enabled:** Track sales, margin, customer data
- [ ] **Marketing Ready:** Social, email list, launch plan

---

## LAUNCH DAY CHECKLIST

**Pre-Launch (24 hours before)**
- [ ] Test end-to-end order (place test order, verify fulfillment)
- [ ] Check product pages (photos, descriptions, pricing)
- [ ] Verify checkout process (test payment, shipping address)
- [ ] Prepare launch content (email, social posts, story)

**Launch Day (Go Live)**
- [ ] Publish store/products (make live)
- [ ] Send launch email to list
- [ ] Post launch announcement on social
- [ ] Reach out to influencers (if applicable)
- [ ] Monitor orders (first 12 hours)

**Post-Launch (Week 1)**
- [ ] Monitor customer feedback & reviews
- [ ] Track margin performance (profit per order)
- [ ] Verify fulfillment quality (are caps shipping on time?)
- [ ] Adjust pricing/marketing based on initial results

---

## CONTACT INFORMATION FOR SUPPORT

| Platform | Primary Contact | Alternative | Response Time |
|----------|-----------------|-------------|---|
| **Printful** | support@printful.com | Live chat (printful.com) | <24 hours |
| **Printify** | support@printify.com | Help center (help.printify.com) | <24 hours |
| **Gelato** | support@gelato.com | Help center (gelato.com/help) | <24 hours |

---

## SUCCESS METRICS (First 30 Days)

| Metric | Target | Track via |
|--------|--------|-----------|
| Orders placed | 10–20 | Platform dashboard |
| Conversion rate | 2–5% (typical ecom) | Analytics |
| Average order value | £30–£35 | Platform dashboard |
| Customer reviews | 4.5+ stars | Platform/store |
| Fulfillment time | <3 days | Tracking notifications |
| Embroidery quality | 95%+ approval | Customer feedback |
| Profit margin | 50–65% | Your accounting |

---

## COMMON ISSUES & TROUBLESHOOTING

### Issue 1: Embroidery Quality Not Meeting Standards
**Solution:**
- Request revision from POD platform
- If persistent: Switch to different supplier (Printify partners)
- Always order samples first before scaling

### Issue 2: Slow Shipping to UK Customers
**Solution:**
- Printful: 3–7 days is normal (EU fulfillment)
- Gelato: 2–4 days (faster EU network)
- AOP+: 1–3 days (if focusing on UK market)
- Set customer expectations in product description

### Issue 3: Margin Too Low
**Solution:**
- Increase retail price (if market allows)
- Switch to Printify for lower COGS ($8–$10 vs. $15)
- Reduce embroidery complexity (simpler = faster = cheaper)

### Issue 4: Design File Not Uploading
**Solution:**
- Ensure file is PNG or vector (300+ DPI)
- Keep file size <5MB
- Clear cache, try again
- Contact support if persistent

---

## NEXT STEPS

1. **This Week:** Create Printful account, order samples
2. **Next Week:** Receive samples, test quality
3. **Week 2:** Create store, sync products, configure automation
4. **Week 3:** Go live, launch MEGA Caps

**Total setup time:** 2–3 hours  
**Total investment:** £50–£100 (samples only)  
**Time to first sale:** 2–3 weeks  
**Fulfillment work:** ZERO (fully automated)

---

**Status:** Ready to implement immediately.  
**Next action:** Go to printful.com and create account.
