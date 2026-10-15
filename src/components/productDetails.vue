<script setup>
defineProps({
  details: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <ul class="product-details-list">
    <li v-for="detail in details" :key="detail">{{ detail }}</li>
  </ul>
</template>
