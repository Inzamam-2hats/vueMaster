<script setup>
  // Imports
  import NavBar from './components/shop/navBar.vue'
  import productList from './components/shop/productList.vue'
  import FooterBar from './components/shop/footerBar.vue'

  const searchText = ref('')
</script>

<template>
  <NavBar />
  <productList />
  <FooterBar />
</template>
