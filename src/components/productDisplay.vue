<script setup>
  // Imports
  import { ref, computed } from 'vue'
  import socksGreenImage from '@/assets/images/socks_green.jpeg'
  import socksBlueImage from '@/assets/images/socks_blue.jpeg'
  import ProductDetails from '@/components/productDetails.vue'
  import ReviewList from './reviewList.vue'
  import ReviewForm from './reviewForm.vue'

  // Props — premium changes shipping cost
  const props = defineProps({
    premium: {
      type: Boolean,
      required: true,
    },
  })

  // Emits — notify parent to update cart
  const emit = defineEmits(['add-to-cart', 'remove-from-cart'])

  // State
  const brand = ref('Vue Mastery')
  const product = ref('Socks')
  const onSale = ref(true)
  const selectedVariant = ref(0)
  const details = ref(['50% cotton', '30% wool', '20% polyester'])
  const variants = ref([
    { id: 2234, color: 'green', image: socksGreenImage, quantity: 50 },
    { id: 2235, color: 'blue', image: socksBlueImage, quantity: 0 },
  ])
  const reviews = ref([])

  // Computed — derived from state / props
  const title = computed(() => product.value + ' ' + brand.value)
  const image = computed(() => variants.value[selectedVariant.value].image)
  const inStock = computed(() => variants.value[selectedVariant.value].quantity > 0)
  const shipping = computed(() => (props.premium ? 'Free' : '2.99'))
  const saleMessage = computed(() =>
    onSale.value ? brand.value + ' ' + product.value + ' is on sale' : null
  )

  // Methods
  const addToCart = () => {
    emit('add-to-cart', variants.value[selectedVariant.value].id)
  }

  const removeFromCart = () => {
    emit('remove-from-cart', variants.value[selectedVariant.value].id)
  }

  const updateVariant = (index) => {
    selectedVariant.value = index
  }

  const addReview = (review) => {
    reviews.value.push(review)
  }
</script>

<template>
  <div class="product-display">
    <!-- Product image + info -->
    <div class="product-container">
      <div class="product-image" :class="{ 'out-of-stock-img': !inStock }">
        <img :src="image" :alt="title" />
      </div>

      <div class="product-info">
        <h1>{{ title }}</h1>

        <!-- Sale message (only when onSale is true) -->
        <p v-if="onSale" class="sale-badge">{{ saleMessage }}</p>

        <!-- Stock + shipping -->
        <div class="product-meta">
          <p v-if="inStock" class="stock in-stock">In Stock</p>
          <p v-else class="stock out-of-stock">Out of Stock</p>
          <p class="shipping">Shipping: <strong>{{ shipping }}</strong></p>
        </div>

        <!-- Material details (child component) -->
        <div class="product-details-block">
          <h4>Details</h4>
          <ProductDetails :details="details" />
        </div>

        <!-- Color variants — hover to switch image -->
        <div class="color-options">
          <h4>Colors</h4>
          <div class="color-circles">
            <div
              v-for="(variant, index) in variants"
              :key="variant.id"
              class="color-circle"
              :class="{ selected: selectedVariant === index }"
              :style="{ backgroundColor: variant.color }"
              :title="variant.color"
              @mouseover="updateVariant(index)"
            ></div>
          </div>
        </div>

        <!-- Cart actions -->
        <div class="product-actions">
          <button
            class="button"
            :class="{ disabledButton: !inStock }"
            :disabled="!inStock"
            @click="addToCart"
          >
            Add to cart
          </button>
          <button class="button button-secondary" @click="removeFromCart">
            Remove from cart
          </button>
        </div>
      </div>
    </div>

    <!-- Reviews list + form -->
    <div class="product-reviews">
      <ReviewList v-if="reviews.length > 0" :reviews="reviews" />
      <ReviewForm @review-submitted="addReview" />
    </div>
  </div>
</template>
