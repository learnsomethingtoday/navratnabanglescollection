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
});
