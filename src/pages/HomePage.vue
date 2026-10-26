<script setup>
    import HomeSlider from '@/components/HomeSlider.vue';
</script>

<template>
  <section class="home">
    <HomeSlider />
    <div class="home-intro">
      <h1>Welcome to ShopVue</h1>
      <p>Browse products on the listing page.</p>
      <RouterLink class="home-link" to="/listing">Go to Shop</RouterLink>
    </div>
  </section>
</template>

<style scoped>
  .home {
    max-width: 1400px;
    margin: 0 auto;
    padding: 28px 24px 48px;
  }

  .home-intro {
    margin-top: 28px;
  }

  h1 {
    margin: 0 0 8px;
    font-size: 28px;
    color: #1f2937;
  }

  p {
    margin: 0 0 14px;
    color: #6b7280;
  }

  .home-link {
    color: #3b82f6;
    font-weight: 600;
    text-decoration: none;
  }

  .home-link:hover {
    text-decoration: underline;
  }
</style>
