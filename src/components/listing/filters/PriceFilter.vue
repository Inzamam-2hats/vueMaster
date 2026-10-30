<script setup>
  import { ref, watch } from 'vue'
  import { DEFAULT_MAX_PRICE } from '@/data/listing.js'

  const props = defineProps({
    modelValue: { type: Number, required: true },
  })

  const emit = defineEmits(['update:modelValue'])

  const draft = ref(props.modelValue)
  watch(
    () => props.modelValue,
    (value) => {
      draft.value = value
    }
  )

  function commit() {
    emit('update:modelValue', draft.value)
  }
</script>

<template>
  <section class="filter-section">
    <h3>Price Range</h3>
    <input
      class="price-slider"
      type="range"
      min="0"
      :max="DEFAULT_MAX_PRICE"
      step="10"
      v-model.number="draft"
      @change="commit"
    />
    <p class="price-label">$0 - ${{ draft }}</p>
  </section>
</template>
