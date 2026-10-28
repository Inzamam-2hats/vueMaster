<!--
  Listing page — sidebar UI + product list (sort + pagination via URL).
  Filters are display-only until the filters phase.
-->
<script setup>
  import FilterSidebar from '@/components/listing/FilterSidebar.vue'
  import ProductList from '@/components/listing/ProductList.vue'

  const emit = defineEmits(['add-to-cart'])
</script>

<template>
  <div class="listing-layout">
    <FilterSidebar />
    <ProductList @add-to-cart="emit('add-to-cart', $event)" />
  </div>
</template>

<style scoped>
  .listing-layout {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 20px;
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px 24px 40px;
    align-items: start;
  }

  /* Tablet: sidebar on top, then products */
  @media (max-width: 900px) {
    .listing-layout {
      grid-template-columns: 1fr;
      gap: 16px;
      padding: 16px 16px 32px;
    }
  }

  /* Mobile */
  @media (max-width: 520px) {
    .listing-layout {
      padding: 12px 12px 28px;
      gap: 12px;
    }
  }
</style>
