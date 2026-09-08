export const siteConfig = {
  name: 'Navira Jewels',
  shortName: 'Navira',
  description: 'An elegant catalogue of Navratna bangles for everyday grace and special occasions.',
  phoneDisplay: '+91 72077 42722',
  phoneHref: '+917207742722',
  whatsappNumber: '917207742722',
  address: 'Dummy address — replace before launch',
  hours: 'Dummy business hours — replace before launch',
  mapLabel: 'Google Maps location placeholder',
  socialLinks: [
    { label: 'Instagram', href: '#', placeholder: true },
    { label: 'Facebook', href: '#', placeholder: true },
    { label: 'Pinterest', href: '#', placeholder: true },
  ],
} as const;

export function whatsappUrl(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
