/**
 * Does a product pass the active filters?
 * OR within category/brand · AND across groups.
 * excludeGroup = skip that filter (used for facet counts).
 */
export function matchesProduct(product, filters, excludeGroup = null) {
  const {
    search = '',
    categories = [],
    brands = [],
    maxPrice,
    minRating = null,
    inStockOnly = false,
  } = filters

  if (excludeGroup !== 'search' && search) {
    const q = search.toLowerCase()
    const hay = `${product.title || ''} ${product.brand || ''}`.toLowerCase()
    if (!hay.includes(q)) return false
  }

  if (
    excludeGroup !== 'category' &&
    categories.length &&
    !categories.includes(product.category)
  ) {
    return false
  }

  if (
    excludeGroup !== 'brand' &&
    brands.length &&
    !brands.includes(product.brand)
  ) {
    return false
  }

  if (excludeGroup !== 'price' && product.price > maxPrice) {
    return false
  }

  if (
    excludeGroup !== 'rating' &&
    minRating != null &&
    product.rating < minRating
  ) {
    return false
  }

  if (excludeGroup !== 'stock' && inStockOnly && !(product.stock > 0)) {
    return false
  }

  return true
}
