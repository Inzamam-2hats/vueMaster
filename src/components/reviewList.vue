<script setup>
  // Props — array of submitted reviews from the parent
  defineProps({
    reviews: {
      type: Array,
      required: true,
    },
  })
</script>

<template>
  <div class="review-container">
    <h3>Reviews</h3>

    <!-- One list item per review -->
    <ul class="review-list">
      <li
        v-for="(review, index) in reviews"
        :key="index"
        class="review"
      >
        <p class="review-name">{{ review.name }} · {{ review.rating }} stars</p>
        <p class="review-text">{{ review.review }}</p>
        <p class="review-recommend">Recommended: {{ review.recommend }}</p>
      </li>
    </ul>
  </div>
</template>
