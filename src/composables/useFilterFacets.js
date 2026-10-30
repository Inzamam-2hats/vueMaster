import { ref, computed, onMounted } from 'vue'
import { fetchProducts } from '@/services/productService.js'
import { formatCategoryLabel } from '@/data/listing.js'
import { matchesProduct } from '@/utils/productFilters.js'
import { useListingQuery } from '@/composables/useListingQuery.js'

const catalog = ref([])
const loaded = ref(false)
const loading = ref(false)
let loadPromise = null

async function ensureCatalog() {
  if (loaded.value) return catalog.value
  if (loadPromise) return loadPromise

  loading.value = true
  loadPromise = fetchProducts({ limit: 0 })
    .then((data) => {
      catalog.value = data.products || []
      loaded.value = true
      return catalog.value
    })
    .finally(() => {
      loading.value = false
      loadPromise = null
    })

  return loadPromise
}

/**
 * Catalog + facet option lists with live counts.
 */
export function useFilterFacets() {
  const { filterState } = useListingQuery()

  onMounted(() => {
    ensureCatalog().catch(() => {
      catalog.value = []
    })
  })

  function pool(excludeGroup) {
    return catalog.value.filter((product) =>
      matchesProduct(product, filterState.value, excludeGroup)
    )
  }

  const categoryOptions = computed(() => {
    const counts = {}
    for (const product of pool('category')) {
      const slug = product.category
      if (!slug) continue
      counts[slug] = (counts[slug] || 0) + 1
    }
    return Object.keys(counts)
      .sort()
      .map((slug) => ({
        id: slug,
        label: formatCategoryLabel(slug),
        count: counts[slug],
      }))
  })

  const brandOptions = computed(() => {
    const counts = {}
    for (const product of pool('brand')) {
      const name = product.brand
      if (!name) continue
      counts[name] = (counts[name] || 0) + 1
    }
    return Object.keys(counts)
      .sort((a, b) => a.localeCompare(b))
      .map((name) => ({
        id: name,
        label: name,
        count: counts[name],
      }))
  })

  const ratingOptions = computed(() => {
    const products = pool('rating')
    return [5, 4, 3, 2, 1].map((stars) => ({
      stars,
      count: products.filter((p) => Number(p.rating) >= stars).length,
    }))
  })

  return {
    facetsLoading: loading,
    categoryOptions,
    brandOptions,
    ratingOptions,
  }
}
