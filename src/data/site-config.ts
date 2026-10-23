export const siteConfig = {
  name: 'Navira Jewels',
  shortName: 'Navira',
  description: 'An elegant collection of Navratna bangles for everyday grace and special occasions.',
  phoneDisplay: '+91 72077 42722',
  phoneHref: '+917207742722',
  whatsappNumber: '917207742722',
  responseTime: 'Usually replies within 2 business hours',
  localDelivery: 'Same-day delivery throughout Visakhapatnam',
  regionalDispatch: 'Orders across Andhra Pradesh and Telangana are dispatched within 24 business hours of being placed',
  hours: '9:00 AM–9:00 PM',
  productHighlights: [
    'Zinc-free',
    'Skin-friendly',
    'Fade-resistant finish',
    'Lightweight for regular wear',
    'Quality checked',
    'Elegant Gold-Like Appearance',
  ],
} as const;

export function whatsappUrl(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
