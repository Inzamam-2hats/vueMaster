// All product API calls go through this file.
// Docs: https://dummyjson.com/docs/products

const BASE_URL = 'https://dummyjson.com'

/**
 * Load products for the listing.
 * search   = URL ?search= → API q=
 * category = single category slug → /products/category/:slug
 * limit/skip/sortBy/order/signal = pagination, sort, abort
 *
 * Note: DummyJSON supports only ONE category in the API path.
 * Multiple categories are filtered in ProductList after fetch.
 */
export async function fetchProducts({
  search = '',
  category = '',
  limit = 12,
  skip = 0,
  sortBy = '',
  order = 'asc',
  signal,
} = {}) {
  const q = search.trim()
  const cat = category.trim()

  const params = new URLSearchParams({
    limit: String(limit),
    skip: String(skip),
  })

  if (sortBy) {
    params.set('sortBy', sortBy)
    params.set('order', order === 'desc' ? 'desc' : 'asc')
  }

  let url
  if (q) {
    params.set('q', q)
    url = `${BASE_URL}/products/search?${params}`
  } else if (cat) {
    url = `${BASE_URL}/products/category/${encodeURIComponent(cat)}?${params}`
  } else {
    url = `${BASE_URL}/products?${params}`
  }

  const res = await fetch(url, { signal })
  if (!res.ok) {
    throw new Error(`Products request failed (${res.status})`)
  }

  const data = await res.json()

  return {
    products: data.products || [],
    total: data.total || 0,
  }
}
