<!-- Placeholder cards while products load -->
<script setup>
  defineProps({
    count: { type: Number, default: 12 },
  })
</script>

<template>
  <div class="skeleton-grid" aria-hidden="true">
    <div v-for="n in 12" :key="n" class="skeleton-card">
      <div class="skeleton-image" />
      <div class="skeleton-body">
        <div class="skeleton-line short" />
        <div class="skeleton-line" />
        <div class="skeleton-line price" />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .skeleton-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  .skeleton-card {
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
    overflow: hidden;
  }

  .skeleton-image {
    aspect-ratio: 1 / 1;
    background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
    background-size: 200% 100%;
    animation: shimmer 1.2s ease-in-out infinite;
  }

  .skeleton-body {
    padding: 14px 16px 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .skeleton-line {
    height: 12px;
    border-radius: 6px;
    background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
    background-size: 200% 100%;
    animation: shimmer 1.2s ease-in-out infinite;
  }

  .skeleton-line.short {
    width: 40%;
  }

  .skeleton-line.price {
    width: 30%;
    height: 16px;
  }

  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  @media (max-width: 1100px) {
    .skeleton-grid { grid-template-columns: repeat(3, 1fr); }
  }

  @media (max-width: 900px) {
    .skeleton-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 520px) {
    .skeleton-grid { grid-template-columns: 1fr; }
  }
</style>
