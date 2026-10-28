// All product API calls go through this file.
// Docs: https://dummyjson.com/docs/products

const BASE_URL = 'https://dummyjson.com'

/**
 * Load one page of products.
 * limit = how many products (e.g. 12)
 * skip  = how many to skip (page 2 → skip 12)
 */
export async function fetchProducts({ limit = 12, skip = 0 } = {}) {
  const params = new URLSearchParams({
    limit: String(limit),
    skip: String(skip),
  })

  const res = await fetch(`${BASE_URL}/products?${params}`)
  if (!res.ok) {
    throw new Error(`Products request failed (${res.status})`)
  }

  const data = await res.json()

  return {
    products: data.products || [],
    total: data.total || 0,
  }
}
