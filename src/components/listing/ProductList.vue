<!--
  Product grid + URL sort + URL pagination
  States: loading (skeleton), error + retry, empty, success
-->
<script setup>
  import { ref, computed, watch } from 'vue'
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

  const currentPage = computed(() => {
    const n = Number(route.query.page) || 1
    return n < 1 ? 1 : n
  })

  const skip = computed(() => (currentPage.value - 1) * pageSize)

  // URL is source of truth for sort
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
    loading.value = true
    error.value = null

    try {
      const data = await fetchProducts({
        limit: pageSize,
        skip: skip.value,
        sortBy: sortBy.value,
        order: order.value,
      })
      products.value = data.products
      total.value = data.total

      // If URL page is past the last page after results change, fix it
      if (total.value > 0 && currentPage.value > totalPages.value) {
        goToPage(totalPages.value)
      }
    } catch (err) {
      products.value = []
      total.value = 0
      error.value = err?.message || 'Failed to load products'
    } finally {
      loading.value = false
    }
  }

  // Refetch when page OR sort changes (Back/Forward + dropdown)
  watch(
    () => [currentPage.value, sortBy.value, order.value],
    () => {
      loadProducts()
    },
    { immediate: true }
  )
</script>

<template>
  <section class="product-list-wrap">
    <div class="listing-toolbar">
      <p v-if="!loading && !error && total > 0" class="result-count">
        {{ total }} products
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
      <p class="state-text">Try another page or check back later.</p>
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
