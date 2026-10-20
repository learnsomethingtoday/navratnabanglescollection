/** Resolve local links and public assets beneath the configured hosting path. */
export function siteUrl(path: string) {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;
}
