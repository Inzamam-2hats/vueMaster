import { ref, computed, watch, onUnmounted } from 'vue'
import { fetchProducts } from '@/services/productService.js'
import { PAGE_SIZE } from '@/data/listing.js'
import { matchesProduct } from '@/utils/productFilters.js'
import { useListingQuery } from '@/composables/useListingQuery.js'

/**
 * Load + filter + paginate products from URL state.
 */
export function useProductList() {
  const {
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
    setPage,
  } = useListingQuery()

  const products = ref([])
  const total = ref(0)
  const loading = ref(true)
  const error = ref(null)

  let abortController = null

  const skip = computed(() => (currentPage.value - 1) * PAGE_SIZE)
  const totalPages = computed(() =>
    Math.max(1, Math.ceil(total.value / PAGE_SIZE))
  )
  const rangeStart = computed(() =>
    total.value === 0 ? 0 : skip.value + 1
  )
  const rangeEnd = computed(() =>
    Math.min(skip.value + PAGE_SIZE, total.value)
  )

  function goToPage(page) {
    const next = Math.min(Math.max(1, page), totalPages.value)
    setPage(next)
  }

  async function loadProducts() {
    if (abortController) abortController.abort()
    const controller = new AbortController()
    abortController = controller

    loading.value = true
    error.value = null

    try {
      const cats = categories.value
      // DummyJSON cannot express multi-category / brand / price / rating / stock
      const needsClientFilter =
        hasExtraFilters.value ||
        cats.length > 1 ||
        (Boolean(search.value) && cats.length > 0)

      if (needsClientFilter) {
        const data = await fetchProducts({
          search: search.value,
          category: !search.value && cats.length === 1 ? cats[0] : '',
          limit: 0,
          skip: 0,
          sortBy: sortBy.value,
          order: order.value,
          signal: controller.signal,
        })
        const filtered = data.products.filter((p) =>
          matchesProduct(p, filterState.value)
        )
        total.value = filtered.length
        products.value = filtered.slice(skip.value, skip.value + PAGE_SIZE)
      } else if (cats.length === 1 && !search.value) {
        const data = await fetchProducts({
          category: cats[0],
          limit: PAGE_SIZE,
          skip: skip.value,
          sortBy: sortBy.value,
          order: order.value,
          signal: controller.signal,
        })
        products.value = data.products
        total.value = data.total
      } else {
        const data = await fetchProducts({
          search: search.value,
          limit: PAGE_SIZE,
          skip: skip.value,
          sortBy: sortBy.value,
          order: order.value,
          signal: controller.signal,
        })
        products.value = data.products
        total.value = data.total
      }

      if (total.value > 0 && currentPage.value > totalPages.value) {
        goToPage(totalPages.value)
      }
    } catch (err) {
      if (err?.name === 'AbortError') return
      products.value = []
      total.value = 0
      error.value = err?.message || 'Failed to load products'
    } finally {
      if (!controller.signal.aborted) {
        loading.value = false
      }
    }
  }

  watch(
    () => [
      search.value,
      categories.value.join(','),
      brands.value.join(','),
      maxPrice.value,
      minRating.value,
      inStockOnly.value,
      currentPage.value,
      sortBy.value,
      order.value,
    ],
    loadProducts,
    { immediate: true }
  )

  onUnmounted(() => {
    if (abortController) abortController.abort()
  })

  return {
    pageSize: PAGE_SIZE,
    products,
    total,
    loading,
    error,
    search,
    currentPage,
    totalPages,
    rangeStart,
    rangeEnd,
    hasActiveFilters,
    loadProducts,
    goToPage,
  }
}
