<!--
  LESSON — Listing layout
  Left: FiltersSidebar (price, category, brands, rating)
  Right: ProductList
  Filter state lives here — App only keeps search + cart
-->
<script setup>
  import { ref } from 'vue'
  import FiltersSidebar from '@/components/FiltersSidebar.vue'
  import ProductList from '@/components/ProductList.vue'

  defineProps({
    search: { type: String, default: '' },
  })

  const emit = defineEmits(['add-to-cart'])

  const maxPrice = ref(2000)
  const categories = ref([])
  const brands = ref([])
  const minRating = ref(null)
</script>

<template>
  <div class="listing-layout">
    <FiltersSidebar
      :maxPrice="maxPrice"
      :categories="categories"
      :brands="brands"
      :minRating="minRating"
      @update:maxPrice="maxPrice = $event"
      @update:categories="categories = $event"
      @update:brands="brands = $event"
      @update:minRating="minRating = $event"
    />
    <ProductList
      :search="search"
      :maxPrice="maxPrice"
      :categories="categories"
      :brands="brands"
      :minRating="minRating"
      @add-to-cart="emit('add-to-cart', $event)"
    />
  </div>
</template>

<style scoped>
  .listing-layout {
    display: grid;
    grid-template-columns: 260px 1fr;
    gap: 20px;
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px 24px 40px;
    align-items: start;
  }

  @media (max-width: 900px) {
    .listing-layout {
      grid-template-columns: 1fr;
    }
  }
</style>
