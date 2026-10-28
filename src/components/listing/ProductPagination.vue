<script setup>
  defineProps({
    currentPage: { type: Number, required: true },
    totalPages: { type: Number, required: true },
    rangeStart: { type: Number, required: true },
    rangeEnd: { type: Number, required: true },
    total: { type: Number, required: true },
  })

  const emit = defineEmits(['prev', 'next', 'first', 'last'])
</script>

<template>
  <nav class="pagination" aria-label="Product pages">
    <p class="pagination-status">
      Showing {{ rangeStart }}–{{ rangeEnd }} of {{ total }}
      · Page {{ currentPage }} / {{ totalPages }}
    </p>

    <div class="pager">
      <button
        type="button"
        class="pager-btn"
        aria-label="First page"
        :disabled="currentPage <= 1"
        @click="emit('first')"
      >
        «
      </button>

      <button
        type="button"
        class="pager-btn"
        aria-label="Previous page"
        :disabled="currentPage <= 1"
        @click="emit('prev')"
      >
        ‹
      </button>

      <button
        type="button"
        class="pager-btn"
        aria-label="Next page"
        :disabled="currentPage >= totalPages"
        @click="emit('next')"
      >
        ›
      </button>

      <button
        type="button"
        class="pager-btn"
        aria-label="Last page"
        :disabled="currentPage >= totalPages"
        @click="emit('last')"
      >
        »
      </button>
    </div>
  </nav>
</template>

<style scoped>
  .pagination {
    margin-top: 24px;
    padding-top: 16px;
    border-top: 1px solid #e5e7eb;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .pagination-status {
    margin: 0;
    color: #6b7280;
    font-size: 14px;
  }

  .pager {
    display: flex;
    gap: 6px;
  }

  .pager-btn {
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    background: #fff;
    color: #374151;
    font-size: 18px;
    line-height: 1;
    cursor: pointer;
    transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
  }

  .pager-btn:hover:not(:disabled) {
    background: #f3f4f6;
    border-color: #d1d5db;
    color: #111827;
  }

  .pager-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
</style>
