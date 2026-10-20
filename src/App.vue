<script setup>
  // Imports
  import { ref } from 'vue'
  import NavBar from './components/shop/navBar.vue'
  import productList from './components/shop/productList.vue'
  import FooterBar from './components/shop/footerBar.vue'

  const searchText = ref('')
  const activeCategory = ref('All')
  const cart = ref([])

  const addToCart = (id) => {
    cart.value.push(id)
  }
</script>

<template>
  <NavBar :searchText="searchText"
          @update:searchText="searchText = $event"
          :activeCategory="activeCategory"
          @update:activeCategory="activeCategory = $event"
          :cart="cart.length"
  />
  <productList :search="searchText"
               :category="activeCategory"
               @add-to-cart="addToCart"
  />
  <FooterBar />

</template>
