<!--
  Product grid + URL pagination (?page=)
  Search / filters come back later.
-->
<script setup>
  import { ref, computed, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import ProductCard from '@/components/product/ProductCard.vue'
  import { fetchProducts } from '@/services/productService.js'

  const route = useRoute()

  const pageSize = 12
  const products = ref([])
  const total = ref(0)
  const loading = ref(true)

  const currentPage = computed(() => {
    const n = Number(route.query.page) || 1
    return n < 1 ? 1 : n
  })

  const skip = computed(() => (currentPage.value - 1) * pageSize)

  const emit = defineEmits(['add-to-cart'])

  async function loadProducts() {
    loading.value = true
    try {
      const data = await fetchProducts({
        limit: pageSize,
        skip: skip.value,
      })
      products.value = data.products
      total.value = data.total
    } catch {
      products.value = []
      total.value = 0
    } finally {
      loading.value = false
    }
  }

  // When ?page= changes → fetch that page from the API
  watch(currentPage, () => {
    loadProducts()
  }, { immediate: true })
</script>

<template>
  <section class="product-list-wrap">
    <p v-if="loading" class="status">Loading products...</p>

    <p v-else-if="products.length === 0" class="status">
      No products found
    </p>

    <div v-else class="product-grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add-to-cart="emit('add-to-cart', $event)"
      />
    </div>

    <!-- Step 5: add ProductPagination here -->
  </section>
</template>

<style scoped src="@/assets/css/product-list.css"></style>
