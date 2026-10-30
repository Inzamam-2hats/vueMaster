<!-- Reusable checkbox list with count + See more -->
<script setup>
  import { ref, computed } from 'vue'

  const props = defineProps({
    title: { type: String, required: true },
    options: { type: Array, default: () => [] },
    selected: { type: Array, default: () => [] },
    limit: { type: Number, default: 5 },
  })

  const emit = defineEmits(['toggle'])

  const expanded = ref(false)

  const visible = computed(() =>
    expanded.value ? props.options : props.options.slice(0, props.limit)
  )
</script>

<template>
  <section class="filter-section">
    <h3>{{ title }}</h3>
    <ul class="filter-list">
      <li v-for="item in visible" :key="item.id">
        <label>
          <input
            type="checkbox"
            :checked="selected.includes(item.id)"
            @change="emit('toggle', item.id)"
          />
          {{ item.label }}
        </label>
        <span class="count">{{ item.count }}</span>
      </li>
    </ul>
    <button
      v-if="options.length > limit"
      type="button"
      class="see-more"
      @click="expanded = !expanded"
    >
      {{ expanded ? 'See less' : 'See more' }}
    </button>
  </section>
</template>
