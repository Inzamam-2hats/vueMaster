<!--
  One product card: image, title, brand (if any), price.
-->
<script setup>
  import { computed, ref } from 'vue'

  const props = defineProps({
    product: {
      type: Object,
      required: true,
    },
  })

  const emit = defineEmits(['add-to-cart'])

  // Simple gray placeholder when image is missing or fails to load
  const FALLBACK_IMAGE =
    'data:image/svg+xml,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
        <rect width="400" height="400" fill="#f3f4f6"/>
        <text x="200" y="200" text-anchor="middle" dominant-baseline="middle"
          fill="#9ca3af" font-family="system-ui,sans-serif" font-size="18">No image</text>
      </svg>`
    )

  const imageBroken = ref(false)

  const imageSrc = computed(() => {
    if (imageBroken.value) return FALLBACK_IMAGE
    return props.product.thumbnail || props.product.images?.[0] || FALLBACK_IMAGE
  })

  function onImageError() {
    imageBroken.value = true
  }

  const oldPrice = computed(() => {
    const discount = props.product.discountPercentage || 0
    if (discount <= 0) return null
    return Math.round(props.product.price / (1 - discount / 100))
  })

  const discountLabel = computed(() => {
    const discount = props.product.discountPercentage
    if (!discount || discount <= 0) return null
    return Math.round(discount) + '% off'
  })

  const hasRating = computed(() => {
    const r = props.product.rating
    return typeof r === 'number' && !Number.isNaN(r)
  })

  const starClass = (starNumber) => {
    return starNumber <= Math.round(props.product.rating) ? '' : 'empty'
  }
</script>

<template>
  <article class="product-card">
    <div class="product-image">
      <button class="wishlist" type="button" aria-label="Add to wishlist">♡</button>
      <img
        :src="imageSrc"
        :alt="product.title || 'Product'"
        loading="lazy"
        @error="onImageError"
      />
    </div>

    <div class="product-body">
      <p v-if="product.brand" class="product-brand">{{ product.brand }}</p>
      <h2 class="product-title">{{ product.title }}</h2>

      <div class="price-row">
        <span class="price-current">${{ product.price }}</span>
        <span v-if="oldPrice" class="price-old">${{ oldPrice }}</span>
        <span v-if="discountLabel" class="discount">{{ discountLabel }}</span>
      </div>

      <div v-if="hasRating" class="rating-row">
        <span class="stars-row" :aria-label="product.rating + ' stars'">
          <span :class="starClass(1)">★</span>
          <span :class="starClass(2)">★</span>
          <span :class="starClass(3)">★</span>
          <span :class="starClass(4)">★</span>
          <span :class="starClass(5)">★</span>
        </span>
        <span class="rating-value">{{ product.rating }}</span>
      </div>

      <div class="card-actions">
        <button
          class="btn-cart"
          type="button"
          @click="emit('add-to-cart', product.id)"
        >
          Add To Cart
        </button>
        <button class="btn-buy" type="button">Buy Now</button>
      </div>
    </div>
  </article>
</template>

<style scoped src="@/assets/css/product-card.css"></style>
