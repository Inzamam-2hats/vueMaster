<!--
  LESSON — ProductList
  1) Fetch products from API
  2) Loop with v-for
  3) Pass each product into <ProductCard>
-->
<script setup>
  import { ref, onMounted, computed } from 'vue'
  import ProductCard from './productCard.vue'

  const products = ref([])
  const loading = ref(true)

  const props = defineProps({
    search: {
      type: String,
      default: ''
    },
     category: {
      type: String,
      default: 'All'
    }
  })

  const emit = defineEmits(['add-to-cart'])

  onMounted(() => {
    fetch('https://dummyjson.com/products?limit=50')
      .then((res) => res.json())
      .then((data) => {
        products.value = data.products
        loading.value = false
      })
      .catch(() => {
        loading.value = false
      })
  })

  const filteredProducts = computed(() => {
    const q = props.search.trim().toLowerCase()
    const cat = props.category

    return products.value.filter((product) => {
      const matchSearch = 
      !q || product.title.toLowerCase().includes(q)

      const matchCategory = 
      cat === 'All' || product.category === cat

      return matchSearch && matchCategory
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
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px 24px 40px;
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
