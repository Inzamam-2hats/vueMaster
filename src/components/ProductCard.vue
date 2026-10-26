<!--
  LESSON — ProductCard
  Parent (productList) sends one product via props.
  This component only displays ONE card.
-->
<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    product: {
      type: Object,
      required: true,
    },
  })

  const emit = defineEmits(['add-to-cart'])

  // DummyJSON gives price + discountPercentage → estimate old price
  const oldPrice = computed(() => {
    const discount = props.product.discountPercentage || 0
    if (discount <= 0) return null
    return Math.round(props.product.price / (1 - discount / 100))
  })

  const discountLabel = computed(() => {
    const discount = props.product.discountPercentage
    if (!discount) return null
    return Math.round(discount) + '% off'
  })

  // Filled / empty star by rating number (e.g. 4.5)
  const starClass = (starNumber) => {
    return starNumber <= Math.round(props.product.rating) ? '' : 'empty'
  }
</script>

<template>
  <article class="product-card">
    <div class="product-image">
      <button class="wishlist" type="button" aria-label="Add to wishlist">♡</button>
      <img :src="product.thumbnail" :alt="product.title" />
    </div>

    <div class="product-body">
      <h2 class="product-title">{{ product.title }}</h2>

      <div class="price-row">
        <span class="price-current">${{ product.price }}</span>
        <span v-if="oldPrice" class="price-old">${{ oldPrice }}</span>
        <span v-if="discountLabel" class="discount">{{ discountLabel }}</span>
      </div>

      <div class="rating-row">
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
        <button class="btn-cart" 
        type="button" 
        @click="emit('add-to-cart', product.id);

      ">Add To Cart</button>
      <button class="btn-buy" type="button">Buy Now</button>
      </div>
    </div>
  </article>
</template>
<style scoped src="@/assets/css/product-card.css"></style>
