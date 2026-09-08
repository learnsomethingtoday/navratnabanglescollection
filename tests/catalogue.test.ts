import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { siteConfig, whatsappUrl } from '../src/data/site-config';

const projectRoot = fileURLToPath(new URL('..', import.meta.url));

describe('catalogue foundations', () => {
  it('seeds nine product entries', () => {
    const entries = readdirSync(join(projectRoot, 'src/content/products')).filter((file) => file.endsWith('.md'));
    expect(entries).toHaveLength(9);
  });

  it('builds an encoded WhatsApp enquiry URL', () => {
    const url = whatsappUrl('Hello — Preview 01 (DUMMY-NV-001)');
    expect(url).toContain(`wa.me/${siteConfig.whatsappNumber}`);
    expect(url).toContain('Hello%20%E2%80%94%20Preview%2001');
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
  });

  it('does not request or display a physical business address', () => {
    const contactPage = readFileSync(join(projectRoot, 'src/pages/contact.astro'), 'utf8');
    const siteConfiguration = readFileSync(join(projectRoot, 'src/data/site-config.ts'), 'utf8');
    expect(contactPage).not.toContain('siteConfig.address');
    expect(siteConfiguration).not.toMatch(/^\s*address:/m);
  });

  it('publishes the approved service area and response time', () => {
    expect(siteConfig.serviceArea).toBe('Serving clients in Visakhapatnam only');
    expect(siteConfig.responseTime).toBe('Usually replies within 2 business hours');
    expect(siteConfig.hours).toBe('9:00 AM–9:00 PM');
  });
});
