<script setup>
  import { ref } from 'vue'
  import AppHeader from '@/components/layout/AppHeader.vue'
  import AppFooter from '@/components/layout/AppFooter.vue'

  const cart = ref([])

  const addToCart = (id) => {
    cart.value.push(id)
  }
</script>

<template>
  <AppHeader :cart="cart.length" />
  <main>
    <RouterView @add-to-cart="addToCart" />
  </main>
  <AppFooter />
</template>
