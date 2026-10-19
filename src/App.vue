<script setup>
  // Imports
  import { ref } from 'vue'
  import NavBar from './components/shop/navBar.vue'
  import productList from './components/shop/productList.vue'
  import FooterBar from './components/shop/footerBar.vue'

  const searchText = ref('')
</script>

<template>
  <NavBar :searchText="searchText"
          @update:searchText="searchText = $event"
  />
  <productList :search="searchText" />
  <FooterBar />
</template>
