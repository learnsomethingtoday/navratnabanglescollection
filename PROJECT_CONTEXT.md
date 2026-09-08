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

- Working brand name: **Navira Jewels**
- Brand status: temporary working identity; trademark and domain availability have not been verified
- Product category: Navratna bangles
- Initial catalogue: nine placeholder products
- Telephone and WhatsApp: `+91 7207742722`
- WhatsApp URL number: `917207742722`
- Service area: clients in Visakhapatnam only
- Expected response time: usually within 2 business hours
- Business hours: 9:00 AM–9:00 PM; operating days have not been specified
- Address: intentionally not collected or displayed
- Business hours: dummy placeholder until supplied
- Google Maps location: intentionally not included
- Social-media profiles: dummy placeholders until supplied
- Language: English

The phone number and other global business details are centralized in `src/data/site-config.ts`.

## Product photography policy

One sample image was shared during planning as a visual reference only. It is not committed to the project and does not have to appear in the final catalogue.

Future product images may have different:

- Dimensions and aspect ratios
- Backgrounds
- Lighting
- Color palettes
- Resolutions

Do not derive the site-wide brand palette from one product photograph. Product cards use neutral, consistent media frames and `object-fit: contain` so portrait, landscape, square, and transparent images can be displayed without clipping.

The current catalogue uses a clearly labeled SVG placeholder at `public/images/placeholders/navratna-placeholder.svg`.

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
- `/contact/` — Call and WhatsApp actions plus dummy hours and social details; no address or map
- `/404.html` — Custom not-found page

The production build currently generates 14 pages: the five primary/static pages and nine product-detail pages.

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

## Design system

- Ivory: `#FBF7EF`
- White: `#FFFFFF`
- Deep maroon: `#5A1725`
- Emerald: `#0F5B4C`
- Antique gold: `#B58A3A`
- Dark ink: `#241D1B`

Gold is primarily ornamental. Maroon, emerald, and dark ink are used for accessible text and controls.

The interface is mobile-first, supports 320px-wide screens, preserves visible keyboard focus, respects reduced-motion preferences, and uses minimum 44×44px interactive targets where appropriate.

## Enquiry behavior

There is no contact form or backend submission.

A prominent notice appears above the primary navigation on every page: **“Catalogue only — no online ordering.”** The notice includes direct Call and WhatsApp links. Reusable enquiry panels reinforce that online ordering is unavailable and direct visitors to those two contact methods.

Reusable enquiry panels, the Contact page, and the footer also state that the business currently serves clients in Visakhapatnam only and usually replies within two business hours. This is a service-area statement, not a physical business address.

- Telephone actions use `tel:+917207742722`.
- WhatsApp actions use `https://wa.me/917207742722`.
- Product enquiries prefill the product name and SKU.
- General enquiries prefill a catalogue-information message.
- Every enquiry is conversational only and does not create an order.

## Approved USP messaging

The Home and About pages should prominently communicate the following positioning:

- Navratna bangles can offer a rich, colourful, gold-inspired appearance suitable for everyday wear, functions, and celebrations.
- When a confirmed design uses non-gold, gold-finished, or otherwise lower-cost materials, it may be more affordable than a solid-gold bangle.
- A lower-cost alternative may involve less financial exposure and therefore less everyday concern than wearing high-value gold jewellery.
- Depending on construction, a piece may also be lighter and easier to wear regularly.

Keep these statements qualified because final materials, finishes, weights, and prices have not yet been supplied. Never state that every product is cheaper or lighter than gold, and never describe any jewellery as risk-free or impossible to lose. Each piece should still be handled and stored with care.

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
- Generated routes: 14
- Vitest: four tests passing
- Desktop and mobile visual inspection in headless Chrome
- No horizontal overflow at tested desktop and mobile widths
- Catalogue search and reset behavior
- Mobile menu open, Escape-key close, and ARIA state changes
- Browser console check with no remaining errors

## Before production launch

- Replace all nine preview products with verified product information.
- Add final product photography and alt text.
- Confirm the business name and complete any trademark/domain checks.
- Replace dummy social links.
- Replace `https://example.com` in `astro.config.mjs` with the production domain.
- Reconfirm the telephone and WhatsApp number.
- Run `pnpm test` and `pnpm build`.
- Perform final accessibility, content, and device reviews using the real images and copy.
