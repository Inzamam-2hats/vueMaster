<script setup>
  defineProps({
    options: { type: Array, default: () => [] },
    modelValue: { type: Number, default: null },
  })

  const emit = defineEmits(['update:modelValue'])

  function onToggle(stars) {
    emit('update:modelValue', stars)
  }
</script>

<template>
  <section class="filter-section">
    <h3>Ratings</h3>
    <ul class="filter-list">
      <li v-for="item in options" :key="item.stars">
        <label>
          <input
            type="checkbox"
            :checked="modelValue === item.stars"
            @change="onToggle(item.stars)"
          />
          <span class="stars-row" :aria-label="`${item.stars} stars and up`">
            <span
              v-for="n in 5"
              :key="n"
              :class="{ empty: n > item.stars }"
            >★</span>
          </span>
        </label>
        <span class="count">{{ item.count }}</span>
      </li>
    </ul>
  </section>
</template>
