import { getCollection, type CollectionEntry } from 'astro:content';

export type ProductEntry = CollectionEntry<'products'>;

export async function getProducts(): Promise<ProductEntry[]> {
  const products = await getCollection('products', ({ data }) => !data.draft);
  return products.sort((a, b) => a.data.sortOrder - b.data.sortOrder || a.data.name.localeCompare(b.data.name));
}

export async function getFeaturedProducts(limit = 3): Promise<ProductEntry[]> {
  return (await getProducts()).filter(({ data }) => data.featured).slice(0, limit);
}

export function getRelatedProducts(current: ProductEntry, products: ProductEntry[], limit = 3) {
  const currentTerms = new Set([...current.data.categories, ...current.data.tags, current.data.collection].filter(Boolean));
  return products
    .filter((product) => product.id !== current.id)
    .map((product) => ({
      product,
      score: [...product.data.categories, ...product.data.tags, product.data.collection].filter(Boolean).reduce((sum, term) => sum + (currentTerms.has(term) ? 1 : 0), 0),
    }))
    .sort((a, b) => b.score - a.score || a.product.data.sortOrder - b.product.data.sortOrder)
    .slice(0, limit)
    .map(({ product }) => product);
}

export function formatAvailability(status: ProductEntry['data']['availability']) {
  return status.split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');
}
