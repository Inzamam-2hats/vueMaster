<!--
  Listing page — filters (URL) + chips + product list + sort/pagination.
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
    gap: 40px;
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px 24px 40px;
    align-items: start;
  }

  /* Tablet: sidebar on top, then products */
  @media (max-width: 900px) {
    .listing-layout {
      grid-template-columns: 1fr;
      gap: 24px;
      padding: 16px 16px 32px;
    }
  }

  /* Mobile */
  @media (max-width: 520px) {
    .listing-layout {
      padding: 12px 12px 28px;
      gap: 24px;
    }
  }
</style>
