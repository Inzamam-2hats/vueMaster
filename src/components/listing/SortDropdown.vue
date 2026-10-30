<!--
  Sort control — writes sortBy + order into the URL (source of truth).
  Featured = no sort params (API default order).
-->
<script setup>
  import { computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  const route = useRoute()
  const router = useRouter()

  // value → API mapping
  const SORT_OPTIONS = [
    { value: 'featured', label: 'Featured', sortBy: '', order: 'asc' },
    { value: 'price-asc', label: 'Price: Low to High', sortBy: 'price', order: 'asc' },
    { value: 'price-desc', label: 'Price: High to Low', sortBy: 'price', order: 'desc' },
    {
      value: 'rating-desc',
      label: 'Customer Rating',
      sortBy: 'rating',
      order: 'desc',
      // Unrated / low ratings appear later when sorting high → low
    },
    {
      value: 'newest',
      label: 'Newest',
      sortBy: 'id',
      order: 'desc',
      // DummyJSON has no reliable "date published" sort for all items; higher id ≈ newer
    },
    {
      value: 'discount-desc',
      label: 'Biggest Discount',
      sortBy: 'discountPercentage',
      order: 'desc',
    },
    // Best Selling skipped — DummyJSON has no sales-count field
  ]

  const selected = computed(() => {
    const sortBy = String(route.query.sortBy || '')
    const order = String(route.query.order || 'asc')

    if (!sortBy) return 'featured'

    const match = SORT_OPTIONS.find(
      (opt) => opt.sortBy === sortBy && opt.order === order
    )
    return match?.value || 'featured'
  })

  function onChange(event) {
    const value = event.target.value
    const opt = SORT_OPTIONS.find((item) => item.value === value) || SORT_OPTIONS[0]

    const query = { ...route.query }

    // Changing sort resets to page 1
    delete query.page

    if (!opt.sortBy) {
      delete query.sortBy
      delete query.order
    } else {
      query.sortBy = opt.sortBy
      query.order = opt.order
    }

    router.push({ query })
  }
</script>

<template>
  <div class="sort-dropdown">
    <label class="sort-label" for="product-sort">Sort by</label>
    <select
      id="product-sort"
      class="sort-select"
      :value="selected"
      @change="onChange"
    >
      <option
        v-for="opt in SORT_OPTIONS"
        :key="opt.value"
        :value="opt.value"
      >
        {{ opt.label }}
      </option>
    </select>
  </div>
</template>

<style scoped>
  .sort-dropdown {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .sort-label {
    font-size: 14px;
    font-weight: 500;
    color: #4b5563;
    white-space: nowrap;
  }

  .sort-select {
    min-width: 200px;
    padding: 8px 12px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    background: #ffffff;
    color: #1f2937;
    font-size: 14px;
    font-family: inherit;
    cursor: pointer;
  }

  .sort-select:focus {
    outline: 2px solid #93c5fd;
    outline-offset: 1px;
  }
</style>
