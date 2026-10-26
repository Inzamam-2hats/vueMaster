<!--
  LESSON — ProductList
  1) Fetch products from API
  2) Loop with v-for
  3) Pass each product into <ProductCard>
-->
<script setup>
  import { ref, computed, watch } from 'vue'
  import ProductCard from './ProductCard.vue'

  const products = ref([])
  const loading = ref(true)

  const props = defineProps({
    search: {
      type: String,
      default: ''
    },
    maxPrice: {
      type: Number,
      default: 2000
    },
    categories: {
      type: Array,
      default: () => []
    },
    brands: {
      type: Array,
      default: () => []
    },
    minRating: {
      type: Number,
      default: null
    }
  })

  const emit = defineEmits(['add-to-cart'])

  async function loadProducts() {
    loading.value = true

    const q = props.search.trim().toLowerCase()
    const url = q
      ? `https://dummyjson.com/products/search?q=${encodeURIComponent(q)}`
      : 'https://dummyjson.com/products?limit=100'

    try {
      const res = await fetch(url)
      const data = await res.json()
      products.value = data.products
    } catch {
      products.value = []
    } finally {
      loading.value = false
    }
  }

  let timer = null
  watch(
    () => props.search,
    () => {
      clearTimeout(timer)
      const q = props.search.trim()
      if(q.length > 0 && q.length < 3) {
        return;
      }
        timer = setTimeout(() => {
          loadProducts()
        }, 300)
      },
      { immediate: true }
    )

  // Sidebar filters stay FE for now (DummyJSON search ≠ full filter API)
  const filteredProducts = computed(() => {
    return products.value.filter((product) => {
      const matchPrice = product.price <= props.maxPrice
      const matchCategory =
        props.categories.length === 0 ||
        props.categories.includes(product.category)
      const matchBrand =
        props.brands.length === 0 ||
        props.brands.includes(product.brand)
      const matchRating =
        props.minRating == null || product.rating >= props.minRating

      return matchPrice && matchCategory && matchBrand && matchRating
    })
  })
</script>

<template>
  <section class="product-list-wrap">
    <h1 v-if="!loading && !filteredProducts.length" class="page-title">Shop</h1>

    <p v-if="loading" class="status">Loading products...</p>

    <p v-else-if="!loading && filteredProducts.length === 0" class="status">
      No products found
    </p>

    <div v-else class="product-grid">
      <!--
        :product="product" passes the whole object as one prop.
        ProductCard reads title, price, thumbnail, etc. from it.
      -->
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @add-to-cart="emit('add-to-cart', $event)"
      />
    </div>
  </section>
</template>

<style scoped>
  .product-list-wrap {
    flex: 1;
    min-width: 0;
  }

  .page-title {
    font-size: 28px;
    font-weight: 700;
    margin: 0 0 20px;
    color: #1f2937;
  }

  .status {
    color: #9ca3af;
  }

  .product-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  @media (max-width: 1100px) {
    .product-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 900px) {
    .product-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 520px) {
    .product-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
