<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    currentPage: { type: Number, required: true },
    totalPages: { type: Number, required: true },
    rangeStart: { type: Number, required: true },
    rangeEnd: { type: Number, required: true },
    total: { type: Number, required: true },
  })

  const emit = defineEmits(['prev', 'next', 'go-to'])

  /**
   * Build a compact page list, e.g.:
   * 1 2 3 … 17
   * 1 … 4 5 6 … 17
   * 1 … 15 16 17
   */
  const pageItems = computed(() => {
    const total = props.totalPages
    const current = props.currentPage

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1)
    }

    const items = []
    const showLeft = current <= 3
    const showRight = current >= total - 2

    items.push(1)

    if (showLeft) {
      items.push(2, 3, 4, '…', total)
    } else if (showRight) {
      items.push('…', total - 3, total - 2, total - 1, total)
    } else {
      items.push('…', current - 1, current, current + 1, '…', total)
    }

    return items
  })
</script>

<template>
  <nav class="pagination" aria-label="Product pages">
    <!-- <p class="pagination-status">
      Showing {{ rangeStart }}–{{ rangeEnd }} of {{ total }}
    </p> -->

    <div class="pager">
      <button
        type="button"
        class="pager-btn pager-nav"
        aria-label="Previous page"
        :disabled="currentPage <= 1"
        @click="emit('prev')"
      >
        ‹
      </button>

      <template v-for="(item, index) in pageItems" :key="`${item}-${index}`">
        <span v-if="item === '…'" class="pager-ellipsis" aria-hidden="true">…</span>
        <button
          v-else
          type="button"
          class="pager-btn pager-num"
          :class="{ active: item === currentPage }"
          :aria-label="`Page ${item}`"
          :aria-current="item === currentPage ? 'page' : undefined"
          @click="emit('go-to', item)"
        >
          {{ item }}
        </button>
      </template>

      <button
        type="button"
        class="pager-btn pager-nav"
        aria-label="Next page"
        :disabled="currentPage >= totalPages"
        @click="emit('next')"
      >
        ›
      </button>
    </div>
  </nav>
</template>

<style scoped>
  .pagination {
    margin-top: 40px;
    padding-top: 24px;
    border-top: 1px solid #e5e7eb;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .pagination-status {
    margin: 0;
    color: #6b7280;
    font-size: 13px;
    text-align: center;
  }

  .pager {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 6px;
  }

  .pager-btn {
    min-width: 36px;
    height: 36px;
    padding: 0 8px;
    display: grid;
    place-items: center;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    background: #fff;
    color: #374151;
    font-size: 14px;
    font-weight: 600;
    font-family: inherit;
    line-height: 1;
    cursor: pointer;
    transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
  }

  .pager-nav {
    font-size: 18px;
    font-weight: 500;
  }

  .pager-btn:hover:not(:disabled):not(.active) {
    background: #f3f4f6;
    border-color: #d1d5db;
    color: #111827;
  }

  .pager-btn.active {
    background: #3b82f6;
    border-color: #3b82f6;
    color: #ffffff;
    cursor: default;
  }

  .pager-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .pager-ellipsis {
    min-width: 24px;
    text-align: center;
    color: #9ca3af;
    font-size: 14px;
    user-select: none;
  }
</style>
