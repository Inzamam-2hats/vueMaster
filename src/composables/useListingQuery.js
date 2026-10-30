import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  DEFAULT_MAX_PRICE,
  toQueryArray,
} from '@/data/listing.js'

/**
 * Read/write listing filters from the URL (source of truth).
 */
export function useListingQuery() {
  const route = useRoute()
  const router = useRouter()

  const search = computed(() => String(route.query.search || '').trim())
  const categories = computed(() => toQueryArray(route.query.category))
  const brands = computed(() => toQueryArray(route.query.brand))

  const maxPrice = computed(() => {
    const n = Number(route.query.maxPrice)
    return Number.isFinite(n) ? n : DEFAULT_MAX_PRICE
  })

  const minRating = computed(() => {
    const n = Number(route.query.minRating)
    return Number.isFinite(n) ? n : null
  })

  const inStockOnly = computed(() => route.query.inStock === '1')

  const sortBy = computed(() => String(route.query.sortBy || '').trim())
  const order = computed(() =>
    String(route.query.order || 'asc').toLowerCase() === 'desc' ? 'desc' : 'asc'
  )

  const currentPage = computed(() => {
    const n = Number(route.query.page) || 1
    return n < 1 ? 1 : n
  })

  const hasExtraFilters = computed(
    () =>
      brands.value.length > 0 ||
      maxPrice.value < DEFAULT_MAX_PRICE ||
      minRating.value != null ||
      inStockOnly.value
  )

  const hasActiveFilters = computed(
    () =>
      Boolean(search.value) ||
      categories.value.length > 0 ||
      hasExtraFilters.value
  )

  const filterState = computed(() => ({
    search: search.value,
    categories: categories.value,
    brands: brands.value,
    maxPrice: maxPrice.value,
    minRating: minRating.value,
    inStockOnly: inStockOnly.value,
  }))

  /** Merge patch into URL query; clears page. Removes empty keys. */
  function patchQuery(patch) {
    const query = { ...route.query }
    delete query.page

    for (const [key, value] of Object.entries(patch)) {
      if (
        value == null ||
        value === '' ||
        (Array.isArray(value) && value.length === 0)
      ) {
        delete query[key]
      } else {
        query[key] = value
      }
    }

    if (Number(query.maxPrice) === DEFAULT_MAX_PRICE) {
      delete query.maxPrice
    }

    router.push({ query })
  }

  function toggleCategory(slug) {
    const current = categories.value
    const next = current.includes(slug)
      ? current.filter((c) => c !== slug)
      : [...current, slug]
    patchQuery({ category: next })
  }

  function toggleBrand(name) {
    const current = brands.value
    const next = current.includes(name)
      ? current.filter((b) => b !== name)
      : [...current, name]
    patchQuery({ brand: next })
  }

  function setMaxPrice(value) {
    patchQuery({ maxPrice: value })
  }

  function toggleRating(stars) {
    patchQuery({
      minRating: minRating.value === stars ? null : stars,
    })
  }

  function toggleInStock() {
    patchQuery({
      inStock: inStockOnly.value ? null : '1',
    })
  }

  function clearFilters() {
    patchQuery({
      category: null,
      brand: null,
      maxPrice: null,
      minRating: null,
      inStock: null,
    })
  }

  function setPage(page) {
    router.push({
      query: {
        ...route.query,
        page: page <= 1 ? undefined : String(page),
      },
    })
  }

  return {
    search,
    categories,
    brands,
    maxPrice,
    minRating,
    inStockOnly,
    sortBy,
    order,
    currentPage,
    hasExtraFilters,
    hasActiveFilters,
    filterState,
    patchQuery,
    toggleCategory,
    toggleBrand,
    setMaxPrice,
    toggleRating,
    toggleInStock,
    clearFilters,
    setPage,
  }
}
