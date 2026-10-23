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
<style scoped>
  .product-card {
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .product-image {
    position: relative;
    background: #f9fafb;
    aspect-ratio: 1 / 0.85;
    display: grid;
    place-items: center;
    padding: 16px;
  }

  .product-image img {
    max-width: 85%;
    max-height: 140px;
    object-fit: contain;
    border: none;
    box-shadow: none;
    padding: 0;
    background: transparent;
    width: auto;
  }

  .wishlist {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: none;
    background: #ffffff;
    color: #9ca3af;
    display: grid;
    place-items: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
    cursor: pointer;
  }

  .wishlist:hover {
    color: #ec4899;
  }

  .product-body {
    padding: 14px 16px 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
  }

  .product-title {
    font-size: 14px;
    font-weight: 600;
    color: #1f2937;
    margin: 0;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .price-row {
    display: flex;
    align-items: baseline;
    gap: 8px;
    flex-wrap: wrap;
  }

  .price-current {
    color: #3b82f6;
    font-weight: 700;
    font-size: 16px;
  }

  .price-old {
    color: #9ca3af;
    text-decoration: line-through;
    font-size: 13px;
  }

  .discount {
    color: #ec4899;
    font-size: 12px;
    font-weight: 600;
  }

  .rating-row {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
  }

  .stars-row {
    display: flex;
    gap: 2px;
    color: #f59e0b;
  }

  .stars-row .empty {
    color: #d1d5db;
  }

  .rating-value {
    font-weight: 600;
    color: #1f2937;
  }

  .card-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-top: auto;
    padding-top: 4px;
  }

  .btn-cart,
  .btn-buy {
    padding: 8px 6px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
  }

  .btn-cart {
    border: 1.5px solid #3b82f6;
    background: #ffffff;
    color: #3b82f6;
  }

  .btn-buy {
    border: none;
    background: #3b82f6;
    color: #ffffff;
  }

  .btn-buy:hover {
    background: #2563eb;
  }
</style>
