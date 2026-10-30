<!-- Active filter chips — remove one or Clear All (keeps search + sort). -->
<script setup>
  import { computed } from 'vue'
  import {
    DEFAULT_MAX_PRICE,
    formatCategoryLabel,
  } from '@/data/listing.js'
  import { useListingQuery } from '@/composables/useListingQuery.js'

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
    clearFilters,
  } = useListingQuery()

  const chips = computed(() => {
    const list = []

    for (const slug of categories.value) {
      list.push({
        key: `category:${slug}`,
        label: formatCategoryLabel(slug),
        remove: () => toggleCategory(slug),
      })
    }

    for (const brand of brands.value) {
      list.push({
        key: `brand:${brand}`,
        label: brand,
        remove: () => toggleBrand(brand),
      })
    }

    if (maxPrice.value < DEFAULT_MAX_PRICE) {
      list.push({
        key: 'maxPrice',
        label: `Under $${maxPrice.value}`,
        remove: () => setMaxPrice(DEFAULT_MAX_PRICE),
      })
    }

    if (minRating.value != null) {
      list.push({
        key: 'minRating',
        label: `${minRating.value}+ stars`,
        remove: () => toggleRating(minRating.value),
      })
    }

    if (inStockOnly.value) {
      list.push({
        key: 'inStock',
        label: 'In stock',
        remove: () => toggleInStock(),
      })
    }

    return list
  })
</script>

<template>
  <div v-if="chips.length" class="chips-bar">
    <div class="chips-list">
      <button
        v-for="chip in chips"
        :key="chip.key"
        type="button"
        class="chip"
        :aria-label="`Remove filter ${chip.label}`"
        @click="chip.remove()"
      >
        <span>{{ chip.label }}</span>
        <span class="chip-x" aria-hidden="true">×</span>
      </button>
    </div>
    <button type="button" class="clear-all" @click="clearFilters">
      Clear All
    </button>
  </div>
</template>

<style scoped>
  .chips-bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    margin-bottom: 14px;
  }

  .chips-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    flex: 1;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    border: 1px solid #bfdbfe;
    border-radius: 999px;
    background: #eff6ff;
    color: #1e40af;
    font-size: 13px;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
  }

  .chip:hover {
    background: #dbeafe;
  }

  .chip-x {
    font-size: 15px;
    line-height: 1;
    opacity: 0.8;
  }

  .clear-all {
    border: none;
    background: transparent;
    color: #3b82f6;
    font-size: 13px;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    padding: 4px 2px;
    white-space: nowrap;
  }

  .clear-all:hover {
    text-decoration: underline;
  }
</style>
