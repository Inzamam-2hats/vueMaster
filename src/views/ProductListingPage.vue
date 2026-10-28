<!--
  Listing page — sidebar UI + product list.
  Filters are display-only until pagination is done.
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
    grid-template-columns: 300px 1fr;
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
