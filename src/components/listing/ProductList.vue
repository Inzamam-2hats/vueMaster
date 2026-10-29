<!--
  Product grid + URL search + category + sort + pagination
  States: loading (skeleton), error + retry, empty, success
-->
<script setup>
  import { ref, computed, watch, onUnmounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import ProductCard from '@/components/product/ProductCard.vue'
  import ProductPagination from '@/components/listing/ProductPagination.vue'
  import ProductSkeleton from '@/components/listing/ProductSkeleton.vue'
  import SortDropdown from '@/components/listing/SortDropdown.vue'
  import { fetchProducts } from '@/services/productService.js'

  const route = useRoute()
  const router = useRouter()

  const pageSize = 12
  const products = ref([])
  const total = ref(0)
  const loading = ref(true)
  const error = ref(null)

  let abortController = null

  function toArray(value) {
    if (value == null || value === '') return []
    return Array.isArray(value) ? value.map(String) : [String(value)]
  }

  const currentPage = computed(() => {
    const n = Number(route.query.page) || 1
    return n < 1 ? 1 : n
  })

  const skip = computed(() => (currentPage.value - 1) * pageSize)

  const search = computed(() => String(route.query.search || '').trim())
  const categories = computed(() => toArray(route.query.category))
  const sortBy = computed(() => String(route.query.sortBy || '').trim())
  const order = computed(() => {
    const value = String(route.query.order || 'asc').toLowerCase()
    return value === 'desc' ? 'desc' : 'asc'
  })

  const totalPages = computed(() =>
    Math.max(1, Math.ceil(total.value / pageSize))
  )

  const rangeStart = computed(() =>
    total.value === 0 ? 0 : skip.value + 1
  )

  const rangeEnd = computed(() =>
    Math.min(skip.value + pageSize, total.value)
  )

  function goToPage(page) {
    const next = Math.min(Math.max(1, page), totalPages.value)

    router.push({
      query: {
        ...route.query,
        page: next === 1 ? undefined : String(next),
      },
    })
  }

  const emit = defineEmits(['add-to-cart'])

  async function loadProducts() {
    if (abortController) {
      abortController.abort()
    }
    const controller = new AbortController()
    abortController = controller

    loading.value = true
    error.value = null

    try {
      const cats = categories.value
      // Multi category, or search+category: DummyJSON can't do both fully → fetch all then filter/paginate
      const needsClientFilter =
        cats.length > 1 || (Boolean(search.value) && cats.length > 0)

      let list = []
      let listTotal = 0

      if (needsClientFilter) {
        const data = await fetchProducts({
          search: search.value,
          limit: 0,
          skip: 0,
          sortBy: sortBy.value,
          order: order.value,
          signal: controller.signal,
        })
        list = data.products.filter((p) => cats.includes(p.category))
        listTotal = list.length
        products.value = list.slice(skip.value, skip.value + pageSize)
        total.value = listTotal
      } else if (cats.length === 1 && !search.value) {
        // One category, no search → real category API
        const data = await fetchProducts({
          category: cats[0],
          limit: pageSize,
          skip: skip.value,
          sortBy: sortBy.value,
          order: order.value,
          signal: controller.signal,
        })
        products.value = data.products
        total.value = data.total
      } else {
        // Search only, or plain list
        const data = await fetchProducts({
          search: search.value,
          limit: pageSize,
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
      if (err?.name === 'AbortError') {
        return
      }
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
      currentPage.value,
      sortBy.value,
      order.value,
    ],
    () => {
      loadProducts()
    },
    { immediate: true }
  )

  onUnmounted(() => {
    if (abortController) {
      abortController.abort()
    }
  })
</script>

<template>
  <section class="product-list-wrap">
    <div class="listing-toolbar">
      <p v-if="!loading && !error" class="result-count">
        <template v-if="search && total > 0">
          {{ total }} results for “{{ search }}”
        </template>
        <template v-else-if="total > 0">
          {{ total }} products
        </template>
        <template v-else-if="search || categories.length">
          No products match your filters
        </template>
      </p>
      <p v-else class="result-count" />
      <SortDropdown />
    </div>

    <ProductSkeleton v-if="loading" :count="pageSize" />

    <div v-else-if="error" class="state-box state-error" role="alert">
      <p class="state-title">Something went wrong</p>
      <p class="state-text">{{ error }}</p>
      <button type="button" class="state-btn" @click="loadProducts">
        Retry
      </button>
    </div>

    <div v-else-if="products.length === 0" class="state-box state-empty">
      <p class="state-title">No products found</p>
      <p class="state-text">
        <template v-if="search || categories.length">
          Try clearing search or category filters.
        </template>
        <template v-else>
          Try another page or check back later.
        </template>
      </p>
    </div>

    <template v-else>
      <div class="product-grid">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          @add-to-cart="emit('add-to-cart', $event)"
        />
      </div>

      <ProductPagination
        :current-page="currentPage"
        :total-pages="totalPages"
        :range-start="rangeStart"
        :range-end="rangeEnd"
        :total="total"
        @prev="goToPage(currentPage - 1)"
        @next="goToPage(currentPage + 1)"
        @go-to="goToPage"
      />
    </template>
  </section>
</template>

<style scoped src="@/assets/css/product-list.css"></style>
