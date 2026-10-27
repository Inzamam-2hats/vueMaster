<script setup>
  import { ref } from 'vue'
  import Header from '@/layout/Header.vue'
  import Footer from '@/layout/Footer.vue'

  const searchText = ref('')
  const cart = ref([])

  const addToCart = (id) => {
    cart.value.push(id)
  }
</script>

<template>
  <Header
    :searchText="searchText"
    @update:searchText="searchText = $event"
    :cart="cart.length"
  />
  <main>
    <RouterView
      :search="searchText"
      @add-to-cart="addToCart"
    />
  </main>
  <Footer />
</template>
