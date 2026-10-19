<script setup>
  // Imports
  import { ref } from 'vue'
  import ProductDisplay from '@/components/productDisplay.vue'

  // State — cart holds variant ids; premium controls shipping
  const cart = ref([])
  const premium = ref(true)

  // Add a variant id to the cart
  const updateCart = (id) => {
    cart.value.push(id)
  }

  // Remove one matching variant id from the cart
  const removeFromCart = (id) => {
    const index = cart.value.indexOf(id)
    if (index > -1) {
      cart.value.splice(index, 1)
    }
  }
</script>

<template>
  <!-- Top navigation bar -->
  <div class="nav-bar"></div>

  <!-- Cart count (number of items) -->
  <div class="cart">Cart({{ cart.length }})</div>

  <!-- Product page: receives premium + cart events -->
  <ProductDisplay
    :premium="premium"
    @add-to-cart="updateCart"
    @remove-from-cart="removeFromCart"
  />
</template>
