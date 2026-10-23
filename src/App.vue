<script setup>
  import { ref } from 'vue'
  import Header from '@/layout/Header.vue'
  import Footer from '@/layout/Footer.vue'

  const searchText = ref('')
  const activeCategory = ref('All')
  const cart = ref([])

  const addToCart = (id) => {
    cart.value.push(id)
  }
</script>

<template>
  <Header
    :searchText="searchText"
    @update:searchText="searchText = $event"
    :activeCategory="activeCategory"
    @update:activeCategory="activeCategory = $event"
    :cart="cart.length"
  />
  <main>
    <RouterView
      :search="searchText"
      :category="activeCategory"
      @add-to-cart="addToCart"
    />
  </main>
  <Footer />
</template>
