<!-- Product grid UI — logic lives in useProductList. -->
<script setup>
  import ProductCard from '@/components/product/ProductCard.vue'
  import ProductPagination from '@/components/listing/ProductPagination.vue'
  import ProductSkeleton from '@/components/listing/ProductSkeleton.vue'
  import SortDropdown from '@/components/listing/SortDropdown.vue'
  import ActiveFilterChips from '@/components/listing/ActiveFilterChips.vue'
  import { useProductList } from '@/composables/useProductList.js'

  const emit = defineEmits(['add-to-cart'])

  const {
    pageSize,
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
  } = useProductList()
</script>

<template>
  <section class="product-list-wrap">
    <ActiveFilterChips />

    <div class="listing-toolbar">
      <p v-if="!loading && !error" class="result-count">
        <template v-if="search && total > 0">
          {{ total }} results for “{{ search }}”
        </template>
        <template v-else-if="total > 0">
          {{ total }} products
        </template>
        <template v-else-if="hasActiveFilters">
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
        <template v-if="hasActiveFilters">
          Try clearing search or filters.
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
