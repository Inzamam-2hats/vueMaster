<script setup>
  // Props — list of material / feature strings
  defineProps({
    details: {
      type: Array,
      required: true,
    },
  })
</script>

<template>
  <!-- Renders each detail item from the parent -->
  <ul class="product-details-list">
    <li v-for="detail in details" :key="detail">
      {{ detail }}
    </li>
  </ul>
</template>
