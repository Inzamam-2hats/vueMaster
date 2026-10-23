<script setup>
</script>

<template>
  <section class="home">
    <h1>Welcome to ShopVue</h1>
    <p>Browse products on the listing page.</p>
    <RouterLink to="/listing">Go to Shop</RouterLink>
  </section>
</template>

<style scoped>
  .home {
    max-width: 1400px;
    margin: 0 auto;
    padding: 40px 24px;
  }

  h1 {
    margin: 0 0 8px;
    font-size: 28px;
    color: #1f2937;
  }

  p {
    margin: 0;
    color: #6b7280;
  }
</style>
