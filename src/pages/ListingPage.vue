<script setup>
  import ProductList from '@/components/ProductList.vue'

  defineProps({
    search: { type: String, default: '' },
    category: { type: String, default: 'All' },
  })

  const emit = defineEmits(['add-to-cart'])
</script>

<template>
  <ProductList
    :search="search"
    :category="category"
    @add-to-cart="emit('add-to-cart', $event)"
  />
</template>
