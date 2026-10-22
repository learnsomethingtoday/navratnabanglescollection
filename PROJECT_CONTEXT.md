# Navira Jewels — Project Context

This file is the handoff context for future development sessions. Read it before changing the site.

## Context maintenance rule

Whenever the user approves a change to this project, update this file in the same implementation pass when that change affects the project’s requirements, decisions, architecture, content model, configuration, workflows, setup instructions, verification status, or launch checklist.

Do not document a proposed change as completed before the user approves it and the implementation has actually been made. Small code-only fixes that do not alter project context may be recorded under verification status only when useful.

## Project objective

Build a modern, responsive catalogue website for a Navratna bangles business. The website showcases products and brand information only.

The site must never include:

- Shopping-cart functionality
- Online ordering or order creation
- Checkout
- Payment processing
- User accounts or authentication

Visitors enquire by telephone or WhatsApp instead of purchasing through the website.

## Current business information

- Current brand name: **Navira Jewels**
- Brand status: provisional identity; trademark and domain availability have not been verified
- Product category: Navratna bangles
- The Home-page hero marquee uses the customer-facing label **Panchaloha Bangles**.
- Current catalogue: eight products, all with approved product photography
- Catalogue availability: all eight published products are marked **Available**
- Telephone and WhatsApp: `+91 7207742722`
- WhatsApp URL number: `917207742722`
- Local delivery: same-day delivery throughout Visakhapatnam
- Regional dispatch: orders across Andhra Pradesh and Telangana are dispatched within 24 business hours of being placed
- Expected response time: usually within 2 business hours
- Business hours: 9:00 AM–9:00 PM; operating days have not been specified
- Approved trust metrics: 500+ customers served and 2,000+ bangles sold
- Address: intentionally not collected or displayed
- Google Maps location: intentionally not included
- Social-media links: intentionally omitted until profiles are created
- Language: English

The phone number and other global business details are centralized in `src/data/site-config.ts`.

## Product photography policy

One sample image was shared during planning as a visual reference only. It is not committed to the project and does not have to appear in the final catalogue.

The user confirmed authorization to reuse one selected photograph from each of the three supplied Meesho listings. These photographs are stored locally and mapped in the order supplied:

| Catalogue entry | Local image | Authorized source page |
| --- | --- | --- |
| Navratna Stone Bangles | Four images in `/images/products/navratna-poise-preview-01/` | `https://www.meesho.com/s/p/11vu00`, `https://ajpunnagai.com/products/navratna-gold-finish-bangle`, and `https://www.flipkart.com/mayaenterprises-brass-pearl-cubic-zirconia-emerald-sapphire-ruby-gold-plated-bangle-set/p/itm0cd2a24ccefa7` |
| Emerald Green Bangles | Four images in `/images/products/emerald-green-preview-02/` | `https://ajpunnagai.com/products/fashionable-ad-green-stone-bangle-set-of-4`, `https://sfjgoldcovering.com/product/emerald-green-stone-bangle/`, and `https://dreamjwell.com/products/gold-tone-emerald-stone-south-indian-style-bangles2-4-dj-49683` |
| Pearl & Coral Bangles | Gallery images in `/images/products/navratna-leher-preview-03/` | `https://www.meesho.com/s/p/89v8c8` and `https://www.meesho.com/premium-quality-microplated-pearl-bangle/p/8zsrxh` |
| White Stone Bangles | Four images in `/images/products/white-pearl-preview-04/` | `https://www.flipkart.com/rujve-jewellery-brass-copper-cubic-zirconia-gold-plated-bangle-set/p/itma6ecf2374c4d8` and `https://www.flipkart.com/rangrozo-jewellery-brass-copper-cubic-zirconia-gold-plated-bangle-set/p/itm25696a50fc78e` |
| Coral Stone Bangles | Four images in `/images/products/coral-preview-05/` | `https://www.etsy.com/in-en/listing/4572300744/indian-bangles-coral-color-bangles-one`, `https://www.etsy.com/in-en/listing/4354800269/handcrafted-indian-bangles-golden-finish`, and `https://www.meesho.com/premium-quality-microplated-pearl-bangle/p/92vx05` |
| Ruby Stone Bangles | Four images in `/images/products/ruby-preview-06/` | `https://madeforhers.in/products/bangle-41`, `https://dreamjwell.com/products/gold-tone-ruby-stone-set-of-4-bangles-dj-40710`, and `https://ajpunnagai.com/products/lovely-pink-ad-stone-bangle-set-of-4` |

Customer-facing product URLs use clean slugs derived from the approved product names: `/catalogue/navratna-stone-bangles/`, `/catalogue/white-stone-bangles/`, `/catalogue/pearl-and-coral-bangles/`, `/catalogue/emerald-green-bangles/`, `/catalogue/coral-stone-bangles/`, `/catalogue/ruby-stone-bangles/`, `/catalogue/black-stone-bangles/`, and `/catalogue/white-pearl-stone-bangles/`. Preview-era wording and sequence numbers are not exposed in product routes. Existing internal content filenames and image directories may retain their historical names because they do not appear in customer-facing product URLs.

The original selected Meesho files for products 1–3 are 1024 pixels wide, retain AVIF encoding, and were not upscaled. Small serial numbers originally visible at the lower-left edge were removed using bottom-edge-only geometric crops; no jewellery, background, lighting, or colour details were reconstructed or retouched. Final original-image dimensions are 1024×1300, 1024×870, and 1024×872 pixels for products 1–3 respectively. Marketplace names, prices, specifications, reviews, and other claims were not imported. Alt text describes only visible characteristics and does not assert unverified materials or gemstones.

The approved Navratna Stone Bangles gallery for product 1 contains four images: two product-display photographs from AJ Punnagai, one worn view from Flipkart, and the previously approved Meesho photograph. The user confirmed that they handle the AJ Punnagai business and are authorized both to reuse those photographs and to remove the embedded AJ Punnagai labels. The two labels were removed with tightly scoped AI inpainting; the prompt required preservation of the jewellery, stone arrangement, colour, lighting, framing, and surrounding scene. The edited AJ Punnagai images were saved as 1254×1254 WebP files, the Flipkart worn view as a 1600×1600 WebP file, and the existing 1024×1300 AVIF remains unchanged. `01-wood-display.webp` is the primary catalogue image. Product 1's displayed name is **Navratna Stone Bangles**.

The approved White Stone Bangles gallery for product 2 contains four 1400×1868 WebP images: two product-display views and two worn views. The user selected preview candidates 2, 3, and 4 plus the third image from the Rangrozo Flipkart gallery. The pair on the polished wooden display is the primary catalogue image. Only web resizing and WebP compression were applied; there was no cropping, jewellery retouching, background replacement, or generative alteration. The supplied Meesho candidates were not used because they contained visible serial numbers, and the Amazon candidates were not used. **White Stone Bangles** is the approved customer-facing product name.

The fourth catalogue card (the `catalogue-preview-02.md` entry with `sortOrder: 4`) now uses the approved name **Emerald Green Bangles** and customer-facing slug `emerald-green-bangles`. Its four-image gallery contains, in order, a cream-tabletop set presentation from `https://ajpunnagai.com/products/fashionable-ad-green-stone-bangle-set-of-4`, a worn view from `https://sfjgoldcovering.com/product/emerald-green-stone-bangle/`, an enhanced black-display view from `https://dreamjwell.com/products/gold-tone-emerald-stone-south-indian-style-bangles2-4-dj-49683`, and a sculptural cream-tabletop presentation from the same AJ Punnagai source. The Dreamjwell photograph received a conservative image enhancement limited to clarity, exposure, background balance, and natural-looking green/gold colour; the edit was instructed to preserve the exact pair of bangles, settings, spacing, black display bar, angle, framing, shadows, and portrait composition. The user previously confirmed that they handle the AJ Punnagai business and are authorized to reuse its photographs and remove embedded labels. The selected AJP labels were removed with tightly scoped image edits instructed to preserve the jewellery, green accents, arrangements, flowers, brass decor, folded fabric, composition, lighting, and crop. All four displayed files are stored locally as optimized WebP images in `/images/products/emerald-green-preview-02/` and use `cardFit: "cover"`; no marketplace URLs, prices, ordering functions, or unverified product claims appear on the website. The former single maroon photograph and superseded `01-clean-hero.webp` and `03-complete-set.webp` files are retained locally as source/history assets but are no longer displayed. Materials, exact stone identity, sizes, and other factual specifications remain placeholders.

The approved product 3 source-file gallery (`catalogue-preview-03.md`, now the third displayed card with `sortOrder: 3`) contains four images in this exact order: `01-display-maroon.webp` as the primary catalogue image, `02-upright-hero.webp`, `03-worn-maroon.webp`, and `04-black-satin.webp`. The primary image was derived from the authorized Meesho product photography using a tightly scoped image edit: the coloured accents were corrected from an overly red enhancement to a warmer coral-orange appearance based on the product's other photographs; background brightness was reduced toward the subdued maroon, cream, and walnut mood used by the first two catalogue cards; and visible serial or watermark marks were excluded. The jewellery pattern, pearl-like accents, display arrangement, and composition were required to remain unchanged. The approved worn view received the same restrained coral-orange colour correction, subdued maroon/walnut mood, clarity enhancement, and serial-mark removal. The upright hero and black-satin presentation views are the user-selected prepared candidates from the supplied Pearl source set. All four images are stored locally as WebP files and use `cardFit: "cover"` in cards. The older `main.avif` is retained locally as a source/history asset but is no longer displayed in the gallery.

The seventh catalogue card (`catalogue-preview-07.md`, `sortOrder: 7`) now uses the approved name **Black Stone Bangles** and customer-facing slug `black-stone-bangles`. Its four-image gallery contains, in order: an upright pair from `https://dreamjwell.com/products/gold-tone-black-stone-south-indian-style-bangles-dj-42105`, an overlapping-pair brown carved-box presentation from `https://www.sasitrends.com/products/ad-stone-bangles-collection-994a`, a worn view from `https://www.meesho.com/premium-quality-microplated-impon-panchaloha-stone-bangle/p/4te5bu`, and a complete-set hero from `https://nalva.in/shop/panchaloha-bangle-black-set-of-4-pcs-bg169/`. The user rejected the later front-facing four-bangle Sasitrends replacement, restored the initially selected overlapping-pair brown-box image, and exchanged the first two gallery positions so the Dreamjwell upright pair is now primary. At the user's direction, the Sasitrends watermark was removed from the restored brown-box image, the Meesho serial number was removed and the photograph received a restrained clarity/exposure enhancement, and the `BG169` label was removed from the Nalva photograph. Each image-edit prompt required preservation of the jewellery design, black accents, gold-tone settings, arrangement, composition, lighting, and surrounding scene except for the specifically requested label cleanup. The Dreamjwell upright-pair photograph received WebP optimization only. All four website assets are stored locally in `/images/products/black-stone-preview-07/`, use accurate visual alt text, and use `cardFit: "cover"`. Materials, stone identity, sizes, and other factual specifications remain placeholders.

The approved product 5 name is **Coral Stone Bangles**. Its four-image gallery uses, in order, the first and third photographs from the supplied Etsy listing on maroon fabric, the white hero photograph from the other supplied Etsy listing, and an enhanced worn view from the supplied Meesho listing. The worn view was conservatively enhanced and its lower-left serial number and small sparkle mark were removed; the edit was instructed to preserve the wrist, pose, bangle construction, stone count, proportions, and scene. A separately generated relaxed-pair enhancement was reviewed but deliberately excluded when the user selected the white hero instead. All four approved files are stored locally as optimized WebP images in `/images/products/coral-preview-05/`.

The approved product 6 name is **Ruby Stone Bangles**. Its four-image gallery uses, in order, the warm brown hero photograph from Made For Hers, the close-detail and clean upright set-of-four photographs from Dreamjwell, and the festive cream-fabric presentation from AJ Punnagai. The user previously confirmed that they handle the AJ Punnagai business and authorized removal of its embedded label; the label on the festive Ruby photograph was removed with a tightly scoped image edit instructed to preserve the four bangles, their arrangement, coloured accents, lighting, textile, leaf, flowers, brass prop, composition, and crop. All four approved files are stored locally as optimized WebP images in `/images/products/ruby-preview-06/` and use full-frame card presentation. The supplied Meesho alternatives were excluded because of their lower resolution and visible serial numbers; the Sasitrends and Flipkart alternatives were reviewed but not selected.

The eighth catalogue card (`catalogue-preview-08.md`, `sortOrder: 8`) uses the customer-facing name **White Pearl Stone Bangles** and customer-facing slug `white-pearl-stone-bangles`. Its approved three-image gallery contains, in order: the second product photograph from `https://www.meesho.com/premuim-quality-impon-panchaloha-pearl-bangle/p/6xjle4`, the first product photograph from `https://www.meesho.com/premium-quality-microplated-pearl-bangle/p/81wny8`, and the selected worn view from `https://www.flipkart.com/hi/madras-vault-alloy-gold-plated-bangle/p/itmb136e465cecfd?pid=BBAHN88CDZUHH25Z`. The user rejected both the Sasitrends detail view and its later Dreamjwell replacement; both website assets were removed, leaving exactly three displayed photographs. The two Meesho photographs received minimal bottom-edge crops that removed their serial labels without touching the jewellery; the worn view received WebP optimization only. All three displayed assets are stored locally in `/images/products/white-pearl-preview-08/`, use accurate visual alt text, and use `cardFit: "cover"`.

Multi-image galleries explicitly hide inactive images so global image styling cannot override the HTML `hidden` state. Galleries provide accessible previous/next controls on both the main image and enlarged dialog, wrap from the last image to the first, and support the Left and Right Arrow keys from anywhere on the product page. Keyboard shortcuts are ignored while the visitor is typing in an input, textarea, select control, or editable region.

Product cards on the Home and Catalogue pages use the same multi-image principle. When a product has more than one image, its card displays visible previous/next buttons and an announced image count; single-image cards omit those redundant controls. This behavior is data-driven and automatically applies to future products without page-specific changes.

Product-card galleries retain lazy loading for cards outside the viewport. When a card approaches within 300px of the viewport, only the photographs immediately before and after its current image are promoted for loading and decoding. Gallery navigation keeps the current photograph visible until the selected photograph has decoded, preventing a blank-frame flash on the first image change without forcing every hidden catalogue image to download during the initial page load.

Each product image may optionally set `cardFit: "cover"` when its card preview should fill the square media frame. The White Stone Bangles gallery uses this setting for all four card images to eliminate empty side bands from its portrait photography. The product-detail gallery and zoom dialog continue to use `object-fit: contain`, so visitors can still see each complete uncropped photograph. Images without `cardFit` retain the safe `contain` default.

Full-frame card presentation is the intended standard for every catalogue product. As images are added to the remaining products one by one, review each image's crop and focal position and set `cardFit: "cover"` where needed so card frames do not show empty side bands. Do not bulk-change the current placeholders or existing products merely to enforce this rule; apply and visually verify it during each product's individual photography pass. Detail-page and zoom galleries should continue showing complete images without destructive cropping.

The product-card navigation overlay styles live in the shared global stylesheet so the controls remain positioned inside product photographs across Home, Catalogue, and related-product grids, including during Astro development hot reloads.

The Home page Featured Edit retains its original three-card layout: three columns on desktop, two on tablet, and one on mobile. It does not use section-level carousel controls. Previous/next controls appear inside the photograph itself only when a displayed product has multiple images, matching the product-detail gallery. The existing small catalogue link remains in the section introduction, and a second, more prominent solid-maroon **View full catalogue** button is centered directly below the three featured cards. That lower CTA becomes full-width on narrow mobile screens. On desktop only, the Featured Edit uses a 72px bottom inset so the CTA does not leave an oversized empty area; the established global and mobile section spacing remains unchanged. White Stone Bangles is deliberately assigned `sortOrder: 2`, making it the second card in both the full Catalogue and the Home Featured Edit. The former second and third products move to positions three and four. The full Catalogue page remains a standard responsive grid with the same per-card image behavior.

Future product images may have different:

- Dimensions and aspect ratios
- Backgrounds
- Lighting
- Color palettes
- Resolutions

Do not derive the site-wide brand palette from one product photograph. Product cards use neutral, consistent media frames and `object-fit: contain` so portrait, landscape, square, and transparent images can be displayed without clipping.

The former ninth placeholder product has been removed from the published catalogue at the user's request. It can be restored later by adding a new product content entry; no page-layout changes are required. The reusable SVG at `public/images/placeholders/navratna-placeholder.svg` remains available as an unused fallback asset and contains no visible placeholder or photography-coming-soon messaging. On screens wider than 640px, the Home hero uses the local Navratna Stone Bangles photograph at `public/images/products/navratna-poise-preview-01/01-wood-display.webp`; the photograph is intentionally hidden on mobile while the hero copy and three approved phrase-strip labels remain visible. Product galleries do not show a photography-coming-soon label; keep future products unpublished until their catalogue photographs are ready.

Customer-facing pages must not describe the current catalogue, products, collections, cards, or related designs as previews. All eight products have approved photography and are marked available. Public product names are **Navratna Stone Bangles**, **White Stone Bangles**, **Pearl & Coral Bangles**, **Emerald Green Bangles**, **Coral Stone Bangles**, **Ruby Stone Bangles**, **Black Stone Bangles**, and **White Pearl Stone Bangles**. Their corresponding SKUs are **NVR-NS-001**, **NVR-WS-002**, **NVR-PC-003**, **NVR-EG-004**, **NVR-CS-005**, **NVR-RS-006**, **NVR-BS-007**, and **NVR-WPS-008**. Collections are **Signature**, **Festive**, **Everyday**, **Occasion**, and **Modern**. Internal content filenames and image directories may retain historical `preview` wording, but public product slugs must use the approved product names and end in `-bangles`.

All eight products are grouped under the customer-facing category **Panchaloha Bangles**. Because catalogue filters are derived from product content, the category filter updates automatically without page-layout changes.

All eight products use the confirmed material label **Brass & Copper** and the available sizes **2.4**, **2.6**, **2.8**, and **2.10**. Catalogue cards display every size as a separate compact chip and label the colour row **Colour**. Product-detail pages place a reusable price component and the available sizes between availability/SKU and the enquiry action. The same reusable price component appears in a deliberately smaller, tightly spaced variant on every catalogue card, including the three Home Featured Edit cards; its reduced typography and shortened gap before the specification divider do not affect the larger product-detail treatment. Every current product displays a compact reference-inspired sale treatment: a soft ivory-and-gold outlined **Launch Offer** pill sits above the prices; the muted, struck-through **₹849** appears first without a visible “MRP” label, followed by the prominent **₹699 / pair** price on the same line. **Price for a pair of 2 bangles** appears directly below. The accessible label still identifies ₹849 as the MRP. Offer price, MRP, currency, visibility, and included quantity are stored independently in each product entry as `price: 699`, `mrp: 849`, `currency: "INR"`, `showPrice: true`, and `piecesPerSet: 2`, allowing future products to use different prices and set quantities without changing the component or layout. The prices are catalogue information only and do not enable online purchasing. The approved size presentation follows the supplied reference: a simple **Size** label above outlined pill controls, with no enclosing tray or card. The selected size uses deep maroon. The former “Choose your size” and “Tap to select” wording are intentionally omitted. The lower specifications area does not repeat the size selector. Product-detail pages label the material section **Material** and the colour section **Color**. Selecting a size is informational only and does not create an order, cart, checkout, or reservation.

Product-detail pages do not display the former **The piece / Product story** block or render the Markdown body beneath it. On desktop and tablet, the dark details section uses two columns: **Product highlights** on the left and the **Product details**, **Features**, and **Care instructions** disclosures on the right. At widths up to 880px, these sections stack into a single column in the same order for a compact mobile presentation.

On the Our Story page, the nine-gem wheel rotates on both desktop and mobile. The phone layout uses dedicated `turn-mobile` keyframes that preserve the reduced 75% scale throughout the rotation; do not reintroduce a standalone mobile `transform: scale(...)` on `.gem-wheel`, because it conflicts with the transform-based rotation animation.

The Our Story page uses a compact transition after the Navratna tradition copy: the copy aligns with the bottom of its artwork on desktop and the section has reduced lower padding at every breakpoint. The four numbered benefit cards use content-led heights with a 30px gap between their number and heading instead of the former tall fixed layout. In the shared **Have a piece in mind?** panel, the Call action uses the primary solid-maroon treatment and WhatsApp retains its original solid-green treatment.

The Home hero phrase strip (**Panchaloha Bangles · Timeless Colour · Everyday Grace**) uses its original centred desktop presentation, with compact decorative star separators between the three phrases. The Our Story principle strip (**Colour in balance · Grace in motion · Details with clarity**) keeps its evenly spaced desktop presentation, with its smaller star separators vertically centred against the phrase text. At phone widths, both strips place the first phrase across the full first row and the remaining two phrases side by side beneath it, with decorative stars hidden.

Within the product-detail disclosures, the Product details list uses only a 4px bottom margin after the Colour row. This keeps the transition into Features compact while retaining a small visual separation and the existing disclosure divider.

Every current product uses only these five concise care-instruction labels: **Keep Dry**, **Handle Gently**, **Avoid Abrasive Cleaners**, **Store Separately**, and **Wipe After Use**. Do not add explanatory sentences to the product-detail care list unless the user requests them.

Every current product uses the same approved feature labels in this order: **Gold-Tone Finish**, **Elegantly Lightweight**, **Premium Quality and Superior Finishing**, **Suitable for Everyday & Occasion Wear**, and **Luxurious and Attractive Design**. Keep size availability and the two-bangle pair quantity in their dedicated product-detail sections rather than duplicating them in the Features block.

On product-detail pages, show **Made for everyday ease / Product highlights** first in the lower details area. Immediately below it, combine **Material** and **Colour** into one open **Product details** block with two semantic label/value rows. Keep Features and Care Instructions beneath that combined block.

Use a balanced two-column footer on desktop. The left column begins with a footer brand lockup that reuses the header’s circular sparkle mark immediately beside the large Navira wordmark, followed by the brand statement and the gold-accented note **“Bulk orders are welcome — call or WhatsApp us to discuss your requirements.”** Horizontally arranged Explore links sit beneath a subtle gold divider with compact spacing. The right column keeps **Get in touch** organized into prominent Call and WhatsApp links followed by a divided service-information list for local delivery, regional dispatch, and response time. Stack the two columns cleanly on tablets and phones, with full-width navigation links on narrow screens. Bulk-order enquiries remain personal call or WhatsApp conversations and do not create an online order flow.

The user confirmed that every catalogue product is **Zinc-free**, **Skin-friendly**, has a **Fade-resistant finish**, is **Lightweight for regular wear**, is **Quality checked**, and has an **Elegant Gold-Like Appearance**. These catalogue-wide attributes are centralized in `src/data/site-config.ts` and displayed in a responsive Product highlights block on every product-detail page. They are not repeated on catalogue cards so the grid remains easy to scan. The gold-like wording describes appearance only and must not imply that the products are made from gold.

The product-detail size-button presentation is defined in the shared global stylesheet. This avoids stale component-scoped styles on generated dynamic routes during Astro development hot reloads while retaining the same production presentation.

Public-facing Home, About, and Footer content must not display “Working brand,” “Working brand concept,” or “Working brand story” labels. Internal documentation may continue to note that trademark and domain availability are unverified, but the provisional-status wording is not shown to visitors.

The About-page cultural-context disclaimer directs visitors to each product page for its listed materials, sizes, and care instructions. It does not imply that those details are still awaiting publication.

The About page's **A colourful tradition** section identifies the traditional Navratna grouping as ruby, pearl, red coral, emerald, yellow sapphire, diamond, blue sapphire, hessonite, and cat’s-eye. It explains their association with the nine celestial influences of the Navagraha and describes completeness, harmony, auspiciousness, balance, protection, prosperity, and positive energy as traditional associations and beliefs. The former catalogue-process paragraph about responsibly presented details and future verification is intentionally omitted from this section.

## Technology decisions

- Framework: Astro
- Language: TypeScript
- Rendering: static output
- Content: Astro Content Collections with local Markdown product files
- Fonts: self-hosted Cormorant Garamond and Manrope through Fontsource packages
- Sitemap: `@astrojs/sitemap`
- Tests: Vitest
- CMS: not included in version one
- Hosting and domain: not selected

Astro was chosen because the site is primarily static and benefits from minimal client-side JavaScript. Product access is kept behind `src/lib/products.ts` so a CMS can be introduced later without redesigning the pages.

## Implemented pages

- `/` — Home page with hero, featured collection, value proposition, story, and contact callout
- `/catalogue/` — Searchable and filterable product grid
- `/catalogue/[slug]/` — Generated product-detail pages
- `/about/` — Navratna background, brand positioning, styling, and material-dependent comparisons
- `/contact/` — Call and WhatsApp actions plus delivery, dispatch, response-time, and business-hours details; no address, map, or social links
- `/404.html` — Custom not-found page

The production build currently generates 13 pages: the five primary/static pages and eight product-detail pages.

## Content model

Products live in `src/content/products/`. Each Markdown file supplies:

- Name and unique slug
- SKU
- Short summary and full Markdown description
- Categories, collection, and tags
- One or more images with required alt text
- Materials
- Available sizes and colors
- Availability
- Features and care instructions
- Featured-product status
- Optional seasonal launch and launch date
- Optional price and currency
- Sort order and draft status

The validated schema is in `src/content.config.ts`.

Prices are supported structurally but remain hidden unless a verified price is supplied and `showPrice` is explicitly set to `true`.

## Adding a product

1. Duplicate one file from `src/content/products/`.
2. Rename the file and assign a unique lowercase, hyphenated `slug`.
3. Replace every placeholder field with verified product information.
4. Put images in `public/images/products/<product-slug>/`.
5. Update the `images` list and provide meaningful alt text for every image.
6. Set `featured: true` only if the product should appear on the Home page.
7. Run the checks and production build.

Routes, catalogue cards, filters, featured products, related products, and sitemap entries are derived automatically. Adding a product must not require page or layout changes.

The catalogue search icon is rendered by the shared Astro `Icon` child component. Its positioning selector must use `.input-wrap :global(svg)` so the parent page's scoped CSS reaches the child SVG and keeps the icon centred inside the search field. The search input, category selector, collection selector, and clear-filters control remain bottom-aligned in the responsive filter grid.

The Catalogue introduction describes the collection as inspired by Navratna's rich tradition of colour and positions it for everyday elegance, festive moments, and special celebrations. It also tells visitors that more designs will be added soon without promising a specific launch date. Because every published product is currently available, the count badge reads dynamically as **“8 available designs”** rather than describing the products as previews. A second, visually distinct badge beside it reads **“More designs arriving soon”** and wraps cleanly with the count on narrow screens so the catalogue expansion is easy to notice.

## Design system

- Ivory: `#FBF7EF`
- White: `#FFFFFF`
- Deep maroon: `#5A1725`
- Emerald: `#0F5B4C`
- Antique gold: `#B58A3A`
- Dark ink: `#241D1B`

Gold is primarily ornamental. Maroon, emerald, and dark ink are used for accessible text and controls.

On the Contact page, muted detail-value styling is scoped only to spans inside service rows. It must not override the shared `placeholder-label` styling used by the “Service information” badge, which retains its higher-contrast gold/brown text on a pale background.

The interface is mobile-first, supports 320px-wide screens, preserves visible keyboard focus, respects reduced-motion preferences, and uses minimum 44×44px interactive targets where appropriate. On screens wider than 640px, the Home hero presents the real Navratna Stone Bangles product photograph without illustrated orbit rings, floating stones, or the decorative `09`. A clearly visible 10-second alternate zoom moves between 1.02× and 1.10× scale; visitors who request reduced motion receive the same photograph without animation. The photograph is intentionally hidden on mobile while the hero copy and phrase strip remain visible.

The Home hero keeps **Explore the catalogue** as its primary action. On screens wider than 640px, the secondary **Discover our story** link is visible and the catalogue enquiry note is hidden. On mobile screens up to 640px, **Discover our story** is hidden and the line **Catalogue only · Order/Enquire by call or WhatsApp** appears below the primary action. The global notice above the navigation still states that the website does not support online ordering.

On screens up to 540px, the Home hero phrase strip switches from its desktop single-row presentation to a contained two-row grid, with **Panchaloha Bangles** centred above **Timeless Colour** and **Everyday Grace**. This keeps all three phrases legible without horizontal overflow. The trust-metrics grid gives the location column more width than the two numeric columns, and the Visakhapatnam metric uses a dedicated responsive type size so the place name remains on one line and within its cell on both desktop and mobile.

The decorative vertical gold-gradient line used in the desktop Home hero is hidden at widths up to 640px so it does not appear as an unintended divider beside the mobile hero copy.

The Home-page story artwork centres the “Nine tones. One graceful whole.” caption beneath its decorative ring on both desktop and mobile. At phone widths, the ring scales down to 190px and the caption uses a smaller type size so the two elements do not overlap inside the shorter artwork.

## Enquiry behavior

There is no contact form or backend submission.

A prominent notice appears above the primary navigation on every page: **“Catalogue only — no online ordering. To order/enquire, call us or message on WhatsApp.”** The Call and WhatsApp wording is linked to the configured phone number and the approved prefilled WhatsApp enquiry respectively. The shared **Have a piece in mind?** panel omits the repeated online-ordering sentence and instead directly invites visitors to call or WhatsApp for product information, sizing guidance, availability, and personal assistance. Its primary WhatsApp action is labeled **“Order/Enquire on WhatsApp.”**

Reusable enquiry panels, the Contact page, and the footer state that same-day delivery is available throughout Visakhapatnam and that orders across Andhra Pradesh and Telangana are dispatched within 24 business hours of being placed. They also retain the two-business-hour response expectation. These are service and dispatch statements, not a physical business address. Order coordination remains by call or WhatsApp; the website does not accept or create online orders.

The Contact page phone card states that clients may call directly for product information, assistance, and orders. This describes a conversational phone-order channel and does not introduce website ordering.

Social-media links and “Follow” sections are intentionally absent from the website until the business creates and supplies its profiles. Do not add dummy social links in the interim.

The shared WhatsApp icon uses a single filled vector mark rather than layered outline paths. This prevents the speech-bubble and handset shapes from visually overlapping at the small sizes used inside enquiry buttons. Other shared icons, including the phone mark, retain their outlined treatment.

- Telephone actions use `tel:+917207742722`.
- WhatsApp actions use `https://wa.me/917207742722`.
- Product enquiries prefill the product name and SKU.
- General enquiries prefill a catalogue-information message.
- Every enquiry is conversational only and does not create an order.
- On the About page, clarify that a call or WhatsApp conversation can provide current information personally and help customers order according to their needs, while retaining the preceding statement that there is no online checkout.

## Approved USP messaging

The Home and About pages should prominently communicate the following positioning:

- Navratna bangles can offer a rich, colourful, gold-inspired appearance suitable for everyday wear, functions, and celebrations.
- The approved customer-facing USP heading and copy are **“Gold-inspired elegance”** and **“Designed with a rich gold-tone finish that brings the elegant look of traditional gold bangles at a more accessible price.”** This wording appears in the Home Why Choose Us section and the About comparison section.
- When a confirmed design uses non-gold, gold-finished, or otherwise lower-cost materials, it may be more affordable than a solid-gold bangle.
- A lower-cost alternative may involve less financial exposure and therefore less everyday concern than wearing high-value gold jewellery.
- Depending on construction, a piece may also be lighter and easier to wear regularly.

Use **gold-inspired** and **gold-tone** rather than saying the pieces “look like real gold,” which could imply that they are made from gold. Keep broader weight and risk statements qualified. Never describe any jewellery as risk-free or impossible to lose. Each piece should still be handled and stored with care.

The approved trust metrics appear in the self-contained `TrustMetrics.astro` component at the end of the Home page, after the enquiry section: **500+ customers served** and **2,000+ bangles sold**, with same-day local delivery in Visakhapatnam. The supporting statement reads: **“Over 2,000 bangles have become part of everyday moments and special celebrations for more than 500 happy customers.”** The panel uses a light champagne-gold gradient with deep-maroon text so it remains distinct from the dark-maroon footer. It must not use a green/emerald or footer-like dark background. Do not increase or alter these user-supplied figures without approval.

## Local development on macOS

Node.js was installed with Homebrew. The Homebrew Node installation did not expose `corepack`, so pnpm should be installed directly:

The repository `README.md` now contains the complete prerequisite, installation, development-command, and troubleshooting guide. Keep its commands synchronized with this section when the toolchain changes.

```bash
brew install pnpm
```

From the repository directory:

```bash
pnpm install
pnpm dev
```

Open `http://localhost:4321` after Astro reports that the development server is ready.

Useful commands:

```bash
pnpm dev
pnpm check
pnpm test
pnpm build
pnpm preview
```

If the normal pnpm executable is unavailable inside a Codex environment, Astro can be started directly with the bundled runtime:

```bash
/Users/ruthwikkancharla/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node \
  node_modules/astro/astro.js dev
```

## Verification status

The implementation was verified with:

- Astro check: zero errors, warnings, or hints
- Production build: successful
- Generated routes: 13
- Vitest: fifty-six tests passing, including regression coverage for adjacent card-image preloading, decode-before-swap behavior, the approved Navratna tradition copy, and the responsive two-column product-information layout
- Desktop, 768px tablet, and 320px mobile visual inspection in the in-app browser
- No horizontal overflow at tested desktop, tablet, and mobile widths
- Products 1–8 load local product photographs on the Catalogue and product-detail layouts; products 1–7 have four-image galleries and product 8 has three images
- All eight published products use real local photographs and omit the “Preview photography” gallery label
- Catalogue search and reset behavior
- Mobile menu open, Escape-key close, and ARIA state changes
- Browser console check with no remaining errors

## Before production launch

- Replace the placeholder copy and specifications across all eight preview products with verified product information.
- Reconfirm products 1–8 against the final physical catalogue.
- Confirm the business name and complete any trademark/domain checks.
- Replace `https://example.com` in `astro.config.mjs` with the production domain.
- Reconfirm the telephone and WhatsApp number.
- Run `pnpm test` and `pnpm build`.
- Perform final accessibility, content, and device reviews using the real images and copy.
