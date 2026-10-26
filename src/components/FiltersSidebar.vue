<!--
  LESSON — FiltersSidebar (from shop-listing.html)
  One sidebar, four sections: Price | Category | Brands | Ratings
  Emits filter changes — parent owns the data and ProductList applies them
-->
<script setup>
  import { ref, computed } from 'vue'

  const props = defineProps({
    maxPrice: { type: Number, default: 2000 },
    categories: { type: Array, default: () => [] },
    brands: { type: Array, default: () => [] },
    minRating: { type: Number, default: null },
  })

  const emit = defineEmits([
    'update:maxPrice',
    'update:categories',
    'update:brands',
    'update:minRating',
  ])

  const showAllCategories = ref(false)
  const showAllBrands = ref(false)

  // DummyJSON-friendly slugs so FE filter works with real product data
  const categoryOptions = [
    { name: 'Beauty', slug: 'beauty', count: 12 },
    { name: 'Smartphones', slug: 'smartphones', count: 16 },
    { name: 'Laptops', slug: 'laptops', count: 10 },
    { name: 'Fragrances', slug: 'fragrances', count: 8 },
    { name: 'Groceries', slug: 'groceries', count: 20 },
    { name: 'Furniture', slug: 'furniture', count: 14 },
    { name: 'Tops', slug: 'tops', count: 18 },
    { name: 'Home Decoration', slug: 'home-decoration', count: 9 },
  ]

  const brandOptions = [
    { name: 'Apple', count: 8 },
    { name: 'Samsung', count: 12 },
    { name: 'Huawei', count: 6 },
    { name: 'OPPO', count: 5 },
    { name: 'HP Pavilion', count: 4 },
    { name: 'Microsoft Surface', count: 3 },
    { name: 'Infinix', count: 4 },
  ]

  const ratingOptions = [
    { stars: 5, count: 25 },
    { stars: 4, count: 54 },
    { stars: 3, count: 15 },
    { stars: 2, count: 67 },
    { stars: 1, count: 14 },
  ]

  const visibleCategories = computed(() =>
    showAllCategories.value ? categoryOptions : categoryOptions.slice(0, 5)
  )

  const visibleBrands = computed(() =>
    showAllBrands.value ? brandOptions : brandOptions.slice(0, 5)
  )

  function toggleCategory(slug) {
    const next = props.categories.includes(slug)
      ? props.categories.filter((c) => c !== slug)
      : [...props.categories, slug]
    emit('update:categories', next)
  }

  function toggleBrand(name) {
    const next = props.brands.includes(name)
      ? props.brands.filter((b) => b !== name)
      : [...props.brands, name]
    emit('update:brands', next)
  }

  function toggleRating(stars) {
    // Same star again → clear; otherwise set minimum ("X and up")
    emit('update:minRating', props.minRating === stars ? null : stars)
  }

  function starClass(index, filled) {
    return index <= filled ? '' : 'empty'
  }
</script>

<template>
  <aside class="filters">
    <div class="filters-title">
      Filters
      <svg width="18" height="18" fill="none" stroke="#9ca3af" stroke-width="1.8" viewBox="0 0 24 24">
        <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" />
      </svg>
    </div>

    <!-- Price Range -->
    <section class="filter-section">
      <h3>Price Range</h3>
      <input
        class="price-slider"
        type="range"
        min="0"
        max="2000"
        :value="maxPrice"
        @input="emit('update:maxPrice', Number($event.target.value))"
      />
      <p class="price-label">$0 - ${{ maxPrice }}</p>
    </section>

    <!-- Category -->
    <section class="filter-section">
      <h3>Category</h3>
      <ul class="filter-list">
        <li v-for="item in visibleCategories" :key="item.slug">
          <label>
            <input
              type="checkbox"
              :checked="categories.includes(item.slug)"
              @change="toggleCategory(item.slug)"
            />
            {{ item.name }}
          </label>
          <span class="count">{{ item.count }}</span>
        </li>
      </ul>
      <button
        v-if="categoryOptions.length > 5"
        type="button"
        class="see-more"
        @click="showAllCategories = !showAllCategories"
      >
        {{ showAllCategories ? 'See less' : 'See more' }}
      </button>
    </section>

    <!-- Brands -->
    <section class="filter-section">
      <h3>Brands</h3>
      <ul class="filter-list">
        <li v-for="item in visibleBrands" :key="item.name">
          <label>
            <input
              type="checkbox"
              :checked="brands.includes(item.name)"
              @change="toggleBrand(item.name)"
            />
            {{ item.name }}
          </label>
          <span class="count">{{ item.count }}</span>
        </li>
      </ul>
      <button
        v-if="brandOptions.length > 5"
        type="button"
        class="see-more"
        @click="showAllBrands = !showAllBrands"
      >
        {{ showAllBrands ? 'See less' : 'See more' }}
      </button>
    </section>

    <!-- Ratings -->
    <section class="filter-section">
      <h3>Ratings</h3>
      <ul class="filter-list">
        <li v-for="item in ratingOptions" :key="item.stars">
          <label>
            <input
              type="checkbox"
              :checked="minRating === item.stars"
              @change="toggleRating(item.stars)"
            />
            <span class="stars-row" :aria-label="`${item.stars} stars and up`">
              <span
                v-for="n in 5"
                :key="n"
                :class="starClass(n, item.stars)"
              >★</span>
            </span>
          </label>
          <span class="count">{{ item.count }}</span>
        </li>
      </ul>
    </section>
  </aside>
</template>

<style scoped src="@/assets/css/filters-sidebar.css"></style>
