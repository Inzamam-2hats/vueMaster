<!-- Assembles filter sections; URL sync via useListingQuery. -->
<script setup>
  import { useListingQuery } from '@/composables/useListingQuery.js'
  import { useFilterFacets } from '@/composables/useFilterFacets.js'
  import FilterCheckboxGroup from '@/components/listing/filters/FilterCheckboxGroup.vue'
  import PriceFilter from '@/components/listing/filters/PriceFilter.vue'
  import RatingFilter from '@/components/listing/filters/RatingFilter.vue'
  import StockFilter from '@/components/listing/filters/StockFilter.vue'

  const {
    categories,
    brands,
    maxPrice,
    minRating,
    inStockOnly,
    toggleCategory,
    toggleBrand,
    setMaxPrice,
    toggleRating,
    toggleInStock,
  } = useListingQuery()

  const {
    facetsLoading,
    categoryOptions,
    brandOptions,
    ratingOptions,
  } = useFilterFacets()
</script>

<template>
  <aside class="filters">
    <div class="filters-title">
      Filters
      <svg width="18" height="18" fill="none" stroke="#9ca3af" stroke-width="1.8" viewBox="0 0 24 24">
        <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" />
      </svg>
    </div>

    <p v-if="facetsLoading" class="facets-loading">Loading filters…</p>

    <PriceFilter :model-value="maxPrice" @update:model-value="setMaxPrice" />

    <FilterCheckboxGroup
      title="Category"
      :options="categoryOptions"
      :selected="categories"
      @toggle="toggleCategory"
    />

    <FilterCheckboxGroup
      title="Brands"
      :options="brandOptions"
      :selected="brands"
      @toggle="toggleBrand"
    />

    <RatingFilter
      :options="ratingOptions"
      :model-value="minRating"
      @update:model-value="toggleRating"
    />

    <StockFilter
      :model-value="inStockOnly"
      @update:model-value="toggleInStock"
    />
  </aside>
</template>

<!-- Shared with child filter components (not scoped). -->
<style src="@/assets/css/filters-sidebar.css"></style>

<style scoped>
  .facets-loading {
    margin: 0 0 12px;
    font-size: 13px;
    color: #9ca3af;
  }
</style>
