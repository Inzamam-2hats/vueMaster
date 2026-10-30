/** Shared listing defaults (URL + UI). */
export const PAGE_SIZE = 12
export const DEFAULT_MAX_PRICE = 2000

/** Normalize Vue Router query value → string[]. */
export function toQueryArray(value) {
  if (value == null || value === '') return []
  return Array.isArray(value) ? value.map(String) : [String(value)]
}

/** home-decoration → Home Decoration */
export function formatCategoryLabel(slug) {
  return String(slug)
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}
