import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { siteConfig, whatsappUrl } from '../src/data/site-config';

const projectRoot = fileURLToPath(new URL('..', import.meta.url));

describe('catalogue foundations', () => {
  it('publishes the current eight product entries', () => {
    const entries = readdirSync(join(projectRoot, 'src/content/products')).filter((file) => file.endsWith('.md'));
    expect(entries).toHaveLength(8);
  });

  it('uses the approved product names, summaries, and SKU scheme', () => {
    const expectedProducts = [
      ['catalogue-preview-01.md', 'Navratna Stone Bangles', 'NVR-NS-001', 'A graceful gold-tone bangle design with vibrant Navratna-coloured stone accents, suited to everyday styling and celebratory looks.'],
      ['catalogue-preview-04.md', 'White Stone Bangles', 'NVR-WS-002', 'A luminous gold-tone bangle design with round white stone accents for refined festive and occasion styling.'],
      ['catalogue-preview-03.md', 'Pearl & Coral Bangles', 'NVR-PC-003', 'A warm gold-tone bangle design with alternating pearl-like and coral-coloured accents for versatile everyday and occasion wear.'],
      ['catalogue-preview-02.md', 'Emerald Green Bangles', 'NVR-EG-004', 'A polished gold-tone bangle design with rich green accents, styled for elegant everyday and occasion wear.'],
      ['catalogue-preview-05.md', 'Coral Stone Bangles', 'NVR-CS-005', 'A polished gold-tone bangle design with coral-coloured stone accents, suited to functions and celebratory styling.'],
      ['catalogue-preview-06.md', 'Ruby Stone Bangles', 'NVR-RS-006', 'A contemporary gold-tone bangle design with ruby-coloured stone accents for striking occasion wear.'],
      ['catalogue-preview-07.md', 'Black Stone Bangles', 'NVR-BS-007', 'A richly detailed gold-tone bangle design with black accents for a bold, elegant finish.'],
      ['catalogue-preview-08.md', 'White Pearl Stone Bangles', 'NVR-WPS-008', 'An elegant gold-tone bangle design with white pearl-like stone accents for graceful festive styling.'],
    ];

    for (const [file, name, sku, summary] of expectedProducts) {
      const entry = readFileSync(join(projectRoot, 'src/content/products', file), 'utf8');
      expect(entry).toContain(`name: "${name}"`);
      expect(entry).toContain(`sku: "${sku}"`);
      expect(entry).toContain(`summary: "${summary}"`);
      expect(entry).not.toContain('DUMMY-NV-');
    }
  });

  it('uses clean product-name slugs without preview wording', () => {
    const productDirectory = join(projectRoot, 'src/content/products');
    const expectedSlugs = [
      ['catalogue-preview-01.md', 'navratna-stone-bangles'],
      ['catalogue-preview-04.md', 'white-stone-bangles'],
      ['catalogue-preview-03.md', 'pearl-and-coral-bangles'],
      ['catalogue-preview-02.md', 'emerald-green-bangles'],
      ['catalogue-preview-05.md', 'coral-stone-bangles'],
      ['catalogue-preview-06.md', 'ruby-stone-bangles'],
      ['catalogue-preview-07.md', 'black-stone-bangles'],
      ['catalogue-preview-08.md', 'white-pearl-stone-bangles'],
    ];

    for (const [filename, slug] of expectedSlugs) {
      const entry = readFileSync(join(productDirectory, filename), 'utf8');
      expect(entry).toContain(`slug: "${slug}"`);
      expect(entry).not.toMatch(/^slug: .*preview.*$/m);
    }
  });

  it('publishes every catalogue product as available', () => {
    const productDirectory = join(projectRoot, 'src/content/products');
    const availabilityValues = readdirSync(productDirectory)
      .filter((file) => file.endsWith('.md'))
      .map((file) => readFileSync(join(productDirectory, file), 'utf8'))
      .map((entry) => entry.match(/^availability: "([^"]+)"$/m)?.[1]);

    expect(availabilityValues).toHaveLength(8);
    expect(availabilityValues).toEqual(Array(8).fill('available'));
  });

  it('makes the upcoming catalogue expansion visible beside the available-design count', () => {
    const cataloguePage = readFileSync(join(projectRoot, 'src/pages/catalogue/index.astro'), 'utf8');

    expect(cataloguePage).toContain('class="catalogue-status"');
    expect(cataloguePage).toContain('class="catalogue-expansion-note">More designs arriving soon</span>');
  });

  it('groups every current product under Panchaloha Bangles', () => {
    const productDirectory = join(projectRoot, 'src/content/products');
    const categoryValues = readdirSync(productDirectory)
      .filter((file) => file.endsWith('.md'))
      .map((file) => readFileSync(join(productDirectory, file), 'utf8'))
      .map((entry) => entry.match(/^categories: \["([^"]+)"\]$/m)?.[1]);

    expect(categoryValues).toHaveLength(8);
    expect(categoryValues).toEqual(Array(8).fill('Panchaloha Bangles'));
  });

  it('presents the approved gold-inspired elegance USP without implying solid gold', () => {
    const home = readFileSync(join(projectRoot, 'src/pages/index.astro'), 'utf8');
    const about = readFileSync(join(projectRoot, 'src/pages/about.astro'), 'utf8');
    const approvedCopy = 'Designed with a rich gold-tone finish that brings the elegant look of traditional gold bangles at a more accessible price.';

    expect(home).toContain('<h3>Gold-inspired elegance</h3>');
    expect(home).toContain(approvedCopy);
    expect(about).toContain(approvedCopy);
    expect(`${home}\n${about}`).not.toContain('looks like real gold');
  });

  it('labels the Home-page hero marquee as Panchaloha Bangles', () => {
    const home = readFileSync(join(projectRoot, 'src/pages/index.astro'), 'utf8');

    expect(home).toContain('<span>Panchaloha Bangles</span>');
    expect(home).not.toContain('<span>Navratna Bangles</span>');
  });

  it('uses a real local product photograph for the Home hero with restrained motion', () => {
    const home = readFileSync(join(projectRoot, 'src/pages/index.astro'), 'utf8');

    expect(home).toContain('src={siteUrl(\'/images/products/navratna-poise-preview-01/01-wood-display.webp\')}');
    expect(home).toContain('alt="A pair of multicolour gold-tone bangles displayed against a carved wooden box"');
    expect(home).toContain('animation: hero-image-drift 10s ease-in-out infinite alternate;');
    expect(home).toContain('@keyframes hero-image-drift');
    expect(home).toContain('from { transform: scale(1.02); } to { transform: scale(1.10); }');
    expect(home).toContain('@media (prefers-reduced-motion: reduce)');
    expect(home).not.toContain('class="hero-orbit');
    expect(home).not.toContain('class="hero-stones"');
    expect(home).not.toContain('class="hero-number"');
    expect(existsSync(join(projectRoot, 'public/images/products/navratna-poise-preview-01/01-wood-display.webp'))).toBe(true);
  });

  it('keeps every hero phrase visible in a contained mobile grid', () => {
    const home = readFileSync(join(projectRoot, 'src/pages/index.astro'), 'utf8');

    expect(home).toContain('grid-template-columns: repeat(2, minmax(0, 1fr));');
    expect(home).toContain('.hero-marquee { min-width: 0;');
    expect(home).toContain('.hero-marquee span:first-child { grid-column: 1 / -1; }');
    expect(home).toContain('.hero-marquee span + span::before');
  });

  it('hides only the hero photograph on mobile while retaining it for larger screens', () => {
    const home = readFileSync(join(projectRoot, 'src/pages/index.astro'), 'utf8');

    expect(home).toContain('@media (max-width: 640px)');
    expect(home).toContain('.hero-art { display: none; }');
    expect(home).not.toContain('.hero-marquee { display: none; }');
  });

  it('switches the Home story link for a catalogue enquiry note on mobile', () => {
    const home = readFileSync(join(projectRoot, 'src/pages/index.astro'), 'utf8');

    expect(home).toContain('class="text-link hero-story-link"');
    expect(home).toContain('>Discover our story</a>');
    expect(home).toContain('.hero-story-link { display: none; }');
    expect(home).toContain('<p class="catalogue-note">Catalogue only · Order/Enquire by call or WhatsApp</p>');
    expect(home).not.toContain('<p class="catalogue-note">Catalogue only · Enquire by call or WhatsApp</p>');
    expect(home).toContain('.catalogue-note { display: none;');
    expect(home).toContain('.catalogue-note { display: block; }');
    expect(home).not.toContain('Order by call or WhatsApp');
  });

  it('removes the decorative vertical hero line from the mobile layout', () => {
    const home = readFileSync(join(projectRoot, 'src/pages/index.astro'), 'utf8');

    expect(home).toContain('@media (max-width: 640px) { .hero-art { display: none; } .hero::before { display: none; } }');
  });

  it('centres the story-artwork caption beneath its ring at desktop and mobile widths', () => {
    const home = readFileSync(join(projectRoot, 'src/pages/index.astro'), 'utf8');

    expect(home).toContain('.story-visual p { position: absolute; bottom: 34px; left: 50%; width: max-content; max-width: calc(100% - 40px);');
    expect(home).toContain('text-align: center; transform: translateX(-50%);');
    expect(home).not.toContain('.story-visual p { position: absolute; right: 30px;');
    expect(home).toContain('.story-ring { width: 190px; height: 190px; }');
  });

  it('keeps the Visakhapatnam trust metric within its cell across desktop and mobile widths', () => {
    const trustMetrics = readFileSync(
      join(projectRoot, 'src/components/shared/TrustMetrics.astro'),
      'utf8',
    );

    expect(trustMetrics).toContain('<dt class="trust-location">Visakhapatnam</dt>');
    expect(trustMetrics).toContain('.trust-metrics .trust-location { white-space: nowrap;');
    expect(trustMetrics).toContain('grid-template-columns: .85fr .85fr 1.3fr;');
    expect(trustMetrics).toContain('.trust-metrics .trust-location { white-space: nowrap; font-size: clamp(1.6rem, 2.4vw, 2.3rem); }');
    expect(trustMetrics).toContain('font-size: clamp(1.15rem, 7vw, 1.65rem);');
  });

  it('keeps placeholder messaging out of the decorative Home hero artwork', () => {
    const heroArtwork = readFileSync(
      join(projectRoot, 'public/images/placeholders/navratna-placeholder.svg'),
      'utf8',
    );

    expect(heroArtwork).toContain('<title id="title">Decorative Panchaloha bangle illustration</title>');
    expect(heroArtwork).not.toContain('Product photography coming soon');
    expect(heroArtwork).not.toContain('NAVIRA JEWELS · PLACEHOLDER');
    expect(heroArtwork).not.toContain('Product photography placeholder');
  });

  it('shows the confirmed catalogue-wide product highlights on every detail page', () => {
    expect(siteConfig.productHighlights).toEqual([
      'Zinc-free',
      'Skin-friendly',
      'Fade-resistant finish',
      'Lightweight for regular wear',
      'Quality checked',
      'Elegant Gold-Like Appearance',
    ]);

    const detailPage = readFileSync(join(projectRoot, 'src/pages/catalogue/[slug].astro'), 'utf8');
    expect(detailPage).toContain('<h2>Product highlights</h2>');
    expect(detailPage).toContain('siteConfig.productHighlights.map');
  });

  it('publishes the shared material and four available bangle sizes for every product', () => {
    const productDirectory = join(projectRoot, 'src/content/products');
    const products = readdirSync(productDirectory)
      .filter((file) => file.endsWith('.md'))
      .map((file) => readFileSync(join(productDirectory, file), 'utf8'));

    for (const product of products) {
      expect(product).toContain('material: ["Brass & Copper"]');
      expect(product).toContain('sizes: ["2.4", "2.6", "2.8", "2.10"]');
    }
  });

  it('shows only the approved care-instruction labels on every product', () => {
    const productDirectory = join(projectRoot, 'src/content/products');
    const products = readdirSync(productDirectory)
      .filter((file) => file.endsWith('.md'))
      .map((file) => readFileSync(join(productDirectory, file), 'utf8'));
    const approvedCare = 'careInstructions: ["Keep Dry", "Handle Gently", "Avoid Abrasive Cleaners", "Store Separately", "Wipe After Use"]';

    expect(products).toHaveLength(8);
    for (const product of products) {
      expect(product).toContain(approvedCare);
      expect(product).not.toContain('Care guidance will be shared when you enquire.');
    }
  });

  it('shows the approved feature labels on every product', () => {
    const productDirectory = join(projectRoot, 'src/content/products');
    const products = readdirSync(productDirectory)
      .filter((file) => file.endsWith('.md'))
      .map((file) => readFileSync(join(productDirectory, file), 'utf8'));
    const approvedFeatures = 'features: ["Gold-Tone Finish", "Elegantly Lightweight", "Premium Quality and Superior Finishing", "Suitable for Everyday & Occasion Wear", "Luxurious and Attractive Design"]';

    expect(products).toHaveLength(8);
    for (const product of products) {
      expect(product).toContain(approvedFeatures);
      expect(product).not.toContain('Product details available on enquiry');
      expect(product).not.toContain('Current stock can be confirmed by call or WhatsApp');
      expect(product).not.toContain('Comfortable for Regular Wear');
      expect(product).not.toContain('Available in Multiple Sizes');
      expect(product).not.toContain('Premium Polish and Plating');
    }
  });

  it('shows the ₹699 launch offer against an ₹849 MRP on every current product', () => {
    const productDirectory = join(projectRoot, 'src/content/products');
    const entries = readdirSync(productDirectory)
      .filter((file) => file.endsWith('.md'))
      .map((file) => readFileSync(join(productDirectory, file), 'utf8'));

    expect(entries).toHaveLength(8);
    for (const entry of entries) {
      expect(entry).toContain('price: 699');
      expect(entry).toContain('mrp: 849');
      expect(entry).toContain('currency: "INR"');
      expect(entry).toContain('showPrice: true');
      expect(entry).toContain('piecesPerSet: 2');
    }

    const schema = readFileSync(join(projectRoot, 'src/content.config.ts'), 'utf8');
    expect(schema).toContain('mrp: z.number().nonnegative().optional()');

    const detailPage = readFileSync(join(projectRoot, 'src/pages/catalogue/[slug].astro'), 'utf8');
    expect(detailPage).toContain("import ProductPrice from '@/components/catalogue/ProductPrice.astro';");
    expect(detailPage).toContain('mrp={data.mrp}');
    expect(detailPage).toContain('piecesPerSet={data.piecesPerSet}');
    expect(detailPage.indexOf('<ProductPrice')).toBeLessThan(detailPage.indexOf('class="top-size-selector"'));

    const productCard = readFileSync(join(projectRoot, 'src/components/catalogue/ProductCard.astro'), 'utf8');
    expect(productCard).toContain("import ProductPrice from '@/components/catalogue/ProductPrice.astro';");
    expect(productCard).toContain('<ProductPrice');
    expect(productCard).toContain('compact');
    expect(productCard).toContain('price={data.price}');
    expect(productCard).toContain('mrp={data.mrp}');
    expect(productCard).toContain('piecesPerSet={data.piecesPerSet}');
    expect(productCard).toContain('<div class="card-price">');
    expect(productCard).toContain('.card-price { margin-bottom: -7px; }');

    const priceComponent = readFileSync(join(projectRoot, 'src/components/catalogue/ProductPrice.astro'), 'utf8');
    expect(priceComponent).toContain('class="price-row"');
    expect(priceComponent).toContain('<span class="mrp-line"><del>{formattedMrp}</del></span>');
    expect(priceComponent).not.toContain('MRP <del>{formattedMrp}</del>');
    expect(priceComponent).toContain('<span class="offer-badge">Launch Offer</span>');
    expect(priceComponent).not.toContain('class="price-arrow"');
    expect(priceComponent).toContain('<span class="offer-price">');
    expect(priceComponent.indexOf('<span class="offer-badge">')).toBeLessThan(priceComponent.indexOf('<p class="price-row">'));
    expect(priceComponent.indexOf('<span class="mrp-line">')).toBeLessThan(priceComponent.indexOf('<span class="offer-price">'));
    expect(priceComponent).toContain('<span class="price-unit">/ pair</span>');
    expect(priceComponent).toContain('Price for a pair of {piecesPerSet} bangles');
    expect(priceComponent).toContain('.price-row { display: flex; align-items: center; gap: 14px; flex-wrap: nowrap;');
    expect(priceComponent).not.toContain('border-left: 1px solid');
    expect(priceComponent).toContain('.offer-badge {');
    expect(priceComponent).toContain('font-size: 1.05rem;');
    expect(priceComponent).not.toContain('<p class="mrp-line">');
    expect(priceComponent).not.toContain('.product-price span {');
    expect(priceComponent).toContain('compact?: boolean;');
    expect(priceComponent).toContain("class:list={['product-price', { 'product-price--compact': compact }]}");
    expect(priceComponent).toContain('.product-price--compact .offer-price { gap: 5px; font-size: 1.25rem; }');
  });

  it('renders card sizes as separate chips and uses the approved colour labels', () => {
    const card = readFileSync(join(projectRoot, 'src/components/catalogue/ProductCard.astro'), 'utf8');
    const detail = readFileSync(join(projectRoot, 'src/pages/catalogue/[slug].astro'), 'utf8');
    const globalStyles = readFileSync(join(projectRoot, 'src/styles/global.css'), 'utf8');
    expect(card).toContain('<dt>Colour</dt>');
    expect(card).toContain('class="card-size-options"');
    expect(card).not.toContain('<dt>Colors</dt>');
    expect(detail).toContain('<summary>Product details</summary>');
    expect(detail).toContain('<dt>Material</dt>');
    expect(detail).toContain('<dt>Colour</dt>');
    expect(detail).toContain('class="product-facts"');
    expect(detail).not.toContain('<summary>Material</summary>');
    expect(detail).not.toContain('<summary>Color</summary>');
    expect(detail).toContain('class="size-options size-options--top"');
    expect(detail).not.toContain('<summary>Available colors</summary>');
    expect(globalStyles).toContain('.size-options button {');
  });

  it('places the combined product details block below everyday-ease highlights', () => {
    const detail = readFileSync(join(projectRoot, 'src/pages/catalogue/[slug].astro'), 'utf8');
    const highlightsPosition = detail.indexOf('class="product-highlights"');
    const factsPosition = detail.indexOf('class="product-facts"');
    const featuresPosition = detail.indexOf('<summary>Features</summary>');

    expect(highlightsPosition).toBeGreaterThan(-1);
    expect(factsPosition).toBeGreaterThan(highlightsPosition);
    expect(featuresPosition).toBeGreaterThan(factsPosition);
  });

  it('replaces the product story with responsive two-column product information', () => {
    const detail = readFileSync(join(projectRoot, 'src/pages/catalogue/[slug].astro'), 'utf8');

    expect(detail).not.toContain('Product story');
    expect(detail).not.toContain('<Content />');
    expect(detail).not.toContain("import { render } from 'astro:content';");
    expect(detail).toContain('.details-grid { display: grid; align-items: start;');
    expect(detail).toContain('grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr);');
    expect(detail).toContain('@media (max-width: 880px) { .product-detail, .details-grid { grid-template-columns: 1fr; }');
    expect(detail).toContain('.product-facts dl { display: grid; gap: 0; margin: -2px 0 4px; }');
  });

  it('places available size selection above the product enquiry action', () => {
    const detailPage = readFileSync(join(projectRoot, 'src/pages/catalogue/[slug].astro'), 'utf8');
    const globalStyles = readFileSync(join(projectRoot, 'src/styles/global.css'), 'utf8');
    const statusPosition = detailPage.indexOf('class="status-row"');
    const sizePosition = detailPage.indexOf('class="top-size-selector"');
    const enquiryPosition = detailPage.indexOf('<ContactBand productName={data.name}');

    expect(statusPosition).toBeGreaterThan(-1);
    expect(sizePosition).toBeGreaterThan(statusPosition);
    expect(sizePosition).toBeLessThan(enquiryPosition);
    expect(detailPage.match(/class="size-options(?: [^"]*)?"/g)).toHaveLength(1);
    expect(detailPage).toContain('<p>Size</p>');
    expect(detailPage).not.toContain('Choose your size');
    expect(detailPage).not.toContain('Tap to select');
    expect(globalStyles).toContain('.top-size-selector > p {');
    expect(globalStyles).not.toContain('.size-selector-tray');
  });

  it('uses local approved photography for all eight published products', () => {
    const productDirectory = join(projectRoot, 'src/content/products');
    const entries = readdirSync(productDirectory)
      .filter((file) => file.endsWith('.md'))
      .map((file) => readFileSync(join(productDirectory, file), 'utf8'));
    const localProductImages = entries.filter((entry) => entry.includes('src: "/images/products/'));
    const placeholderImages = entries.filter((entry) => entry.includes('src: "/images/placeholders/'));
    expect(localProductImages).toHaveLength(8);
    expect(placeholderImages).toHaveLength(0);
    expect(entries.join('\n')).not.toContain('images.meesho.com');
    expect(entries.join('\n')).not.toContain('rukminim2.flixcart.com');
  });

  it('keeps each selected product photograph in the local public directory', () => {
    const localImages = [
      'public/images/products/navratna-poise-preview-01/01-wood-display.webp',
      'public/images/products/navratna-poise-preview-01/02-fabric-pair.webp',
      'public/images/products/navratna-poise-preview-01/03-worn-maroon.webp',
      'public/images/products/navratna-poise-preview-01/main.avif',
      'public/images/products/navratna-saanjh-preview-02/main.avif',
      'public/images/products/navratna-leher-preview-03/main.avif',
      'public/images/products/white-pearl-preview-04/01-pair-wood.webp',
      'public/images/products/white-pearl-preview-04/02-pair-dark-display.webp',
      'public/images/products/white-pearl-preview-04/03-worn-maroon-closeup.webp',
      'public/images/products/white-pearl-preview-04/04-worn-maroon-styled.webp',
    ];
    for (const image of localImages) expect(existsSync(join(projectRoot, image))).toBe(true);
  });

  it('keeps inactive gallery images hidden and provides previous and next controls', () => {
    const gallery = readFileSync(join(projectRoot, 'src/components/catalogue/ProductGallery.astro'), 'utf8');
    expect(gallery).toContain('.gallery-main > img[hidden] { display: none; }');
    expect(gallery).toContain('data-previous-image');
    expect(gallery).toContain('data-next-image');
    expect(gallery).toContain("document.addEventListener('keydown'");
    expect(gallery).toContain("target?.matches('input, textarea, select, [contenteditable=\"true\"]')");
    expect(gallery).toContain("event.key === 'ArrowLeft'");
    expect(gallery).toContain("event.key === 'ArrowRight'");
  });

  it('does not publish a coming-soon photography label in product galleries', () => {
    const gallery = readFileSync(join(projectRoot, 'src/components/catalogue/ProductGallery.astro'), 'utf8');
    const card = readFileSync(join(projectRoot, 'src/components/catalogue/ProductCard.astro'), 'utf8');

    expect(gallery).not.toContain('Product image coming soon');
    expect(gallery).not.toContain('usesPlaceholderPhotography');
    expect(gallery).not.toContain('.gallery-main .placeholder-label');
    expect(card).not.toContain('.product-image .placeholder-label');
  });

  it('provides image navigation on catalogue and home-page product cards', () => {
    const card = readFileSync(join(projectRoot, 'src/components/catalogue/ProductCard.astro'), 'utf8');
    const globalStyles = readFileSync(join(projectRoot, 'src/styles/global.css'), 'utf8');
    expect(card).toContain('data-card-image');
    expect(card).toContain('data-card-previous');
    expect(card).toContain('data-card-next');
    expect(globalStyles).toContain('.product-image img[hidden] { display: none; }');
    expect(globalStyles).toContain('.card-gallery-arrow {');
    expect(globalStyles).toContain('position: absolute;');
  });

  it('keeps the catalogue search icon positioned inside its input', () => {
    const cataloguePage = readFileSync(
      join(projectRoot, 'src/pages/catalogue/index.astro'),
      'utf8',
    );
    expect(cataloguePage).toContain('.input-wrap :global(svg) {');
    expect(cataloguePage).not.toContain('.input-wrap svg {');
  });

  it('lets selected card photography fill its frame without changing detail-page containment', () => {
    const schema = readFileSync(join(projectRoot, 'src/content.config.ts'), 'utf8');
    const card = readFileSync(join(projectRoot, 'src/components/catalogue/ProductCard.astro'), 'utf8');
    const whitePearl = readFileSync(join(projectRoot, 'src/content/products/catalogue-preview-04.md'), 'utf8');
    const gallery = readFileSync(join(projectRoot, 'src/components/catalogue/ProductGallery.astro'), 'utf8');
    expect(schema).toContain("cardFit: z.enum(['contain', 'cover']).optional()");
    expect(card).toContain("image.cardFit ?? 'contain'");
    expect(whitePearl.match(/cardFit: "cover"/g)).toHaveLength(4);
    expect(gallery).toContain('object-fit: contain;');
  });

  it('keeps the Home featured edit in its original three-card grid', () => {
    const grid = readFileSync(join(projectRoot, 'src/components/catalogue/ProductGrid.astro'), 'utf8');
    const home = readFileSync(join(projectRoot, 'src/pages/index.astro'), 'utf8');
    expect(grid).not.toContain('data-products-previous');
    expect(grid).not.toContain('data-products-next');
    expect(grid).not.toContain('product-grid--four');
    expect(home).toContain('getFeaturedProducts(3)');
    expect(home).toContain('<ProductGrid products={featured} />');
  });

  it('offers the full catalogue directly below the Home featured cards', () => {
    const home = readFileSync(join(projectRoot, 'src/pages/index.astro'), 'utf8');
    const gridPosition = home.indexOf('<ProductGrid products={featured} />');
    const ctaPosition = home.indexOf('class="featured-catalogue-cta"');

    expect(ctaPosition).toBeGreaterThan(gridPosition);
    expect(home).toContain('<a class="button button--outline" href={siteUrl(\'/catalogue/\')}>View full catalogue <Icon name="arrow" /></a>');
    expect(home).toContain('.featured-catalogue-cta { display: flex; justify-content: center; margin-top:');
    expect(home).toContain('.featured-catalogue-cta .button { width: 100%; justify-content: center; }');
  });

  it('reduces only the desktop whitespace below the Home catalogue CTA', () => {
    const home = readFileSync(join(projectRoot, 'src/pages/index.astro'), 'utf8');

    expect(home).toContain('@media (min-width: 901px) { .featured { padding-bottom: 72px; } }');
  });

  it('places White Stone second in the catalogue and featured ordering', () => {
    const productDirectory = join(projectRoot, 'src/content/products');
    const first = readFileSync(join(productDirectory, 'catalogue-preview-01.md'), 'utf8');
    const whitePearl = readFileSync(join(productDirectory, 'catalogue-preview-04.md'), 'utf8');
    const thirdCard = readFileSync(join(productDirectory, 'catalogue-preview-03.md'), 'utf8');
    expect(first).toContain('sortOrder: 1');
    expect(whitePearl).toContain('sortOrder: 2');
    expect(thirdCard).toContain('sortOrder: 3');
  });

  it('uses the approved four-image Emerald Green gallery on the fourth catalogue card', () => {
    const emeraldGreen = readFileSync(
      join(projectRoot, 'src/content/products/catalogue-preview-02.md'),
      'utf8',
    );
    expect(emeraldGreen).toContain('name: "Emerald Green Bangles"');
    expect(emeraldGreen).toContain('slug: "emerald-green-bangles"');
    expect(emeraldGreen).toContain('sortOrder: 4');
    expect(emeraldGreen.match(/src: "\/images\/products\/emerald-green-preview-02\//g)).toHaveLength(4);

    const imageDirectory = join(projectRoot, 'public/images/products/emerald-green-preview-02');
    for (const image of [
      '01-cream-hero.webp',
      '02-worn-view.webp',
      '03-black-display.webp',
      '04-sculptural-display.webp',
    ]) {
      expect(existsSync(join(imageDirectory, image))).toBe(true);
    }
  });

  it('uses the approved four-image Black Stone gallery on the seventh catalogue card', () => {
    const blackStone = readFileSync(
      join(projectRoot, 'src/content/products/catalogue-preview-07.md'),
      'utf8',
    );
    expect(blackStone).toContain('name: "Black Stone Bangles"');
    expect(blackStone).toContain('slug: "black-stone-bangles"');
    expect(blackStone).toContain('sortOrder: 7');
    expect(blackStone.match(/src: "\/images\/products\/black-stone-preview-07\//g)).toHaveLength(4);
    expect(blackStone.indexOf('02-upright-pair.webp')).toBeLessThan(
      blackStone.indexOf('01-brown-box.webp'),
    );

    const imageDirectory = join(projectRoot, 'public/images/products/black-stone-preview-07');
    for (const image of [
      '01-brown-box.webp',
      '02-upright-pair.webp',
      '03-worn-view.webp',
      '04-complete-set.webp',
    ]) {
      expect(existsSync(join(imageDirectory, image))).toBe(true);
    }
  });

  it('uses the approved three-image White Pearl Stone gallery on the eighth catalogue card', () => {
    const whitePearl = readFileSync(
      join(projectRoot, 'src/content/products/catalogue-preview-08.md'),
      'utf8',
    );
    expect(whitePearl).toContain('name: "White Pearl Stone Bangles"');
    expect(whitePearl).toContain('slug: "white-pearl-stone-bangles"');
    expect(whitePearl).toContain('sortOrder: 8');
    expect(whitePearl.match(/src: "\/images\/products\/white-pearl-preview-08\//g)).toHaveLength(3);
    expect(whitePearl.match(/cardFit: "cover"/g)).toHaveLength(3);

    const imageDirectory = join(projectRoot, 'public/images/products/white-pearl-preview-08');
    for (const image of [
      '01-upright-dark.webp',
      '02-relaxed-pair.webp',
      '03-worn-view.webp',
    ]) {
      expect(existsSync(join(imageDirectory, image))).toBe(true);
    }
    expect(existsSync(join(imageDirectory, '04-upright-enhanced.webp'))).toBe(false);
  });

  it('builds an encoded WhatsApp enquiry URL', () => {
    const url = whatsappUrl('Hello — Navratna Stone (NVR-NS-001)');
    expect(url).toContain(`wa.me/${siteConfig.whatsappNumber}`);
    expect(url).toContain('Hello%20%E2%80%94%20Navratna%20Stone');
  });

  it('labels the primary WhatsApp action for ordering and enquiries', () => {
    const contactBand = readFileSync(join(projectRoot, 'src/components/shared/ContactBand.astro'), 'utf8');

    expect(contactBand).toContain('Order/Enquire on WhatsApp');
    expect(contactBand).not.toContain('<Icon name="whatsapp" /> Enquire on WhatsApp');
    expect(contactBand).toContain('Call or WhatsApp us directly for product information, sizing guidance, availability, and personal assistance.');
    expect(contactBand).not.toContain('Online ordering is not available.');
  });

  it('keeps commerce and account flows out of application source', () => {
    const sourceFiles = [
      'src/pages/index.astro',
      'src/pages/catalogue/index.astro',
      'src/pages/catalogue/[slug].astro',
      'src/pages/about.astro',
      'src/pages/contact.astro',
    ];
    const forbiddenImplementations = /addToCart|checkoutSession|paymentIntent|createOrder|userAccount|signInUser/i;
    for (const file of sourceFiles) {
      expect(readFileSync(join(projectRoot, file), 'utf8')).not.toMatch(forbiddenImplementations);
    }
  });

  it('derives links from product slugs instead of hard-coded detail routes', () => {
    const productCard = readFileSync(join(projectRoot, 'src/components/catalogue/ProductCard.astro'), 'utf8');
    expect(productCard).toContain('/catalogue/${data.slug}/');
  });

  it('shows the no-online-ordering message with direct enquiry options site-wide', () => {
    const header = readFileSync(join(projectRoot, 'src/components/layout/Header.astro'), 'utf8');
    expect(header).toContain('Catalogue only — no online ordering.');
    expect(header).toContain('tel:${siteConfig.phoneHref}');
    expect(header).toContain('whatsappUrl(');
    const contactPage = readFileSync(join(projectRoot, 'src/pages/contact.astro'), 'utf8');
    expect(contactPage).toContain('Call directly for product information, assistance and orders.');
    const aboutPage = readFileSync(join(projectRoot, 'src/pages/about.astro'), 'utf8');
    expect(aboutPage).toContain('When a piece interests you, a call or WhatsApp conversation lets the business share the most current information personally and can help you to order as per your need.');
  });

  it('describes the nine Navratna gems and their traditional positive associations', () => {
    const aboutPage = readFileSync(join(projectRoot, 'src/pages/about.astro'), 'utf8');
    expect(aboutPage).toContain('The word “Navratna” refers to nine gems - ruby, pearl, red coral, emerald, yellow sapphire, diamond, blue sapphire, hessonite, and cat’s-eye. Each is associated with one of the nine celestial influences of the Navagraha, creating a colourful composition that symbolises completeness and harmony.');
    expect(aboutPage).toContain('In Indian tradition, Navratna jewellery is regarded as auspicious and is believed to encourage balance, protection, prosperity, and positive energy.');
    expect(aboutPage).not.toContain('For this catalogue, we focus on what can be responsibly presented');
  });

  it('renders the WhatsApp mark as a clean filled icon instead of overlapping outline paths', () => {
    const iconSource = readFileSync(join(projectRoot, 'src/components/shared/Icon.astro'), 'utf8');
    const whatsappMarkup = iconSource.match(/whatsapp: '([^']+)'/)?.[1] ?? '';
    expect(whatsappMarkup.match(/<path/g)).toHaveLength(1);
    expect(iconSource).toContain("const filled = name === 'whatsapp'");
    expect(iconSource).toContain("fill={filled ? 'currentColor' : 'none'}");
    expect(iconSource).toContain("stroke={filled ? 'none' : 'currentColor'}");
  });

  it('keeps provisional working-brand labels out of the public website', () => {
    const publicFiles = [
      'src/pages/index.astro',
      'src/pages/about.astro',
      'src/components/layout/Footer.astro',
    ];
    for (const file of publicFiles) {
      expect(readFileSync(join(projectRoot, file), 'utf8')).not.toMatch(/working brand/i);
    }

    const cataloguePage = readFileSync(join(projectRoot, 'src/pages/catalogue/index.astro'), 'utf8');
    expect(cataloguePage).not.toContain('9 preview products');
    expect(cataloguePage).toContain('{products.length} available designs');
  });

  it('keeps preview and placeholder language out of customer-facing catalogue copy', () => {
    const publicFiles = [
      'src/pages/index.astro',
      'src/pages/catalogue/index.astro',
      'src/pages/catalogue/[slug].astro',
      'src/pages/contact.astro',
      'src/components/catalogue/ProductCard.astro',
    ];
    for (const file of publicFiles) {
      expect(readFileSync(join(projectRoot, file), 'utf8')).not.toMatch(
        /preview content|preview product|related previews|catalogue preview|preview piece|preview entries/i,
      );
    }

    const productDirectory = join(projectRoot, 'src/content/products');
    for (const file of readdirSync(productDirectory).filter((entry) => entry.endsWith('.md'))) {
      const product = readFileSync(join(productDirectory, file), 'utf8');
      expect(product).not.toMatch(/^name: .*preview/im);
      expect(product).not.toMatch(/^collection: .*preview/im);
      expect(product).not.toMatch(/^summary: .*placeholder/im);
      expect(product).not.toMatch(/^This is placeholder catalogue copy/im);
    }
  });

  it('does not request or display a physical business address', () => {
    const contactPage = readFileSync(join(projectRoot, 'src/pages/contact.astro'), 'utf8');
    const siteConfiguration = readFileSync(join(projectRoot, 'src/data/site-config.ts'), 'utf8');
    expect(contactPage).not.toContain('siteConfig.address');
    expect(siteConfiguration).not.toMatch(/^\s*address:/m);
  });

  it('publishes the approved local delivery and regional dispatch commitments', () => {
    expect(siteConfig.localDelivery).toBe('Same-day delivery throughout Visakhapatnam');
    expect(siteConfig.regionalDispatch).toBe('Orders across Andhra Pradesh and Telangana are dispatched within 24 business hours of being placed');
    expect(siteConfig.responseTime).toBe('Usually replies within 2 business hours');
    expect(siteConfig.hours).toBe('9:00 AM–9:00 PM');
  });

  it('does not publish social-media links before the profiles are ready', () => {
    const siteConfiguration = readFileSync(join(projectRoot, 'src/data/site-config.ts'), 'utf8');
    const contactPage = readFileSync(join(projectRoot, 'src/pages/contact.astro'), 'utf8');
    const footer = readFileSync(join(projectRoot, 'src/components/layout/Footer.astro'), 'utf8');
    expect(siteConfiguration).not.toContain('socialLinks');
    expect(contactPage).not.toMatch(/social media|socialLinks/i);
    expect(footer).not.toMatch(/<h2>Follow<\/h2>|socialLinks/i);
  });

  it('keeps the service-information badge from inheriting muted detail text styling', () => {
    const contactPage = readFileSync(join(projectRoot, 'src/pages/contact.astro'), 'utf8');
    expect(contactPage).toContain('.details-card > div span {');
    expect(contactPage).not.toContain('.details-card span {');
  });

  it('aligns footer contact actions and service notes as distinct groups', () => {
    const footer = readFileSync(join(projectRoot, 'src/components/layout/Footer.astro'), 'utf8');

    expect(footer).toContain('class="footer-brand-area"');
    expect(footer).toContain('class="footer-brand-lockup"');
    expect(footer).toContain('class="footer-brand-gem" aria-hidden="true"><Icon name="sparkle"');
    expect(footer).toContain('class="footer-bulk-note"');
    expect(footer).toContain('Bulk orders are welcome — call or WhatsApp us to discuss your requirements.');
    expect(footer).toContain('class="footer-link-row"');
    expect(footer).toContain('class="footer-contact-links"');
    expect(footer).toContain('class="footer-contact-link"');
    expect(footer).toContain('class="footer-service-list"');
    expect(footer).toContain('<strong>Local delivery</strong>');
    expect(footer).toContain('<strong>Regional dispatch</strong>');
    expect(footer).toContain('<strong>Response time</strong>');
    expect(footer).toContain('.footer-contact-links { display: grid; gap: 10px; }');
    expect(footer).toContain('.footer-service-list { display: grid; gap: 12px;');
    expect(footer).toContain('grid-template-columns: minmax(0, .9fr) minmax(360px, 1.1fr);');
    expect(footer).toContain('.footer-links { padding-top: 28px; border-top: 1px solid rgb(230 210 170 / 24%); }');
    expect(footer).not.toContain('.footer-brand-area::after');
    expect(footer).not.toContain('grid-template-columns: minmax(0, 1.25fr) minmax(130px, .5fr) minmax(300px, 1.4fr);');
  });

  it('displays the approved customer and sales metrics at the end of the home page', () => {
    const homePage = readFileSync(join(projectRoot, 'src/pages/index.astro'), 'utf8');
    const trustSectionPosition = homePage.indexOf('<TrustMetrics />');
    const contactBandPosition = homePage.indexOf('<ContactBand />');
    expect(trustSectionPosition).toBeGreaterThan(contactBandPosition);
    const trustComponent = readFileSync(join(projectRoot, 'src/components/shared/TrustMetrics.astro'), 'utf8');
    expect(trustComponent).toContain('500<span>+</span>');
    expect(trustComponent).toContain('Customers served');
    expect(trustComponent).toContain('2,000<span>+</span>');
    expect(trustComponent).toContain('Bangles sold');
    expect(trustComponent).toContain('Over 2,000 bangles');
    expect(trustComponent).toContain('more than 500 happy customers');
    expect(trustComponent).not.toContain('300<span>+</span>');
    expect(trustComponent).not.toContain('1,000<span>+</span>');
  });
});
