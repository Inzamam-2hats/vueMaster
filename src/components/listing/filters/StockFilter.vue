<script setup>
  defineProps({
    modelValue: { type: Boolean, default: false },
  })

  const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <section class="filter-section">
    <h3>Availability</h3>
    <ul class="filter-list">
      <li>
        <label>
          <input
            type="checkbox"
            :checked="modelValue"
            @change="emit('update:modelValue', !modelValue)"
          />
          In stock
        </label>
      </li>
    </ul>
  </section>
</template>
