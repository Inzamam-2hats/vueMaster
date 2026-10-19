<!--
  LESSON — ProductList
  1) Fetch products from API
  2) Loop with v-for
  3) Pass each product into <ProductCard>
-->
<script setup>
  import { ref, onMounted } from 'vue'
  import ProductCard from './productCard.vue'

  const products = ref([])
  const loading = ref(true)

  onMounted(() => {
    fetch('https://dummyjson.com/products?limit=10')
      .then((res) => res.json())
      .then((data) => {
        products.value = data.products
        loading.value = false
      })
      .catch(() => {
        loading.value = false
      })
  })
</script>

<template>
  <section class="product-list-wrap">
    <h1 class="page-title">Shop</h1>

    <p v-if="loading" class="status">Loading products...</p>

    <div v-else class="product-grid">
      <!--
        :product="product" passes the whole object as one prop.
        ProductCard reads title, price, thumbnail, etc. from it.
      -->
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
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
