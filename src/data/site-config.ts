export const siteConfig = {
  name: 'Navira Jewels',
  shortName: 'Navira',
  description: 'An elegant catalogue of Navratna bangles for everyday grace and special occasions.',
  phoneDisplay: '+91 72077 42722',
  phoneHref: '+917207742722',
  whatsappNumber: '917207742722',
  responseTime: 'Usually replies within 2 business hours',
  serviceArea: 'Serving clients in Visakhapatnam only',
  hours: '9:00 AM–9:00 PM',
  socialLinks: [
    { label: 'Instagram', href: '#', placeholder: true },
    { label: 'Facebook', href: '#', placeholder: true },
    { label: 'Pinterest', href: '#', placeholder: true },
  ],
} as const;

export function whatsappUrl(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
