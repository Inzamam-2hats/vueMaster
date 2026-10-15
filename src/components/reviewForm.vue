<script setup>
    import { reactive } from 'vue';

    const emit = defineEmits(['review-submitted'])

    const review = reactive({
        name: '',
        review: '',
        rating: null,
        recommend: null
    })

    const onSubmit = () => {

        if (review.name === '' || review.review === '' || review.rating === null || review.recommend === null) {
            alert('Please fill in all fields')
            return
        }

        const productReview = {
            name: review.name,
            review: review.review,
            rating: review.rating,
            recommend: review.recommend
        }
        emit('review-submitted', productReview)

        review.name = ''
        review.review = ''
        review.rating = null
        review.recommend = null
    }
</script>

<template>
    <form class="review-form" @submit.prevent="onSubmit">
        <h3>Leave a review</h3>

        <div class="form-group">
            <label for="name">Name</label>
            <input id="name" type="text" v-model="review.name" placeholder="Your name">
        </div>

        <div class="form-group">
            <label for="review">Review</label>
            <textarea id="review" v-model="review.review" placeholder="What did you think?"></textarea>
        </div>

        <div class="form-group">
            <label for="rating">Rating</label>
            <select id="rating" v-model.number="review.rating">
                <option :value="null" disabled>Select a rating</option>
                <option :value="5">5 stars</option>
                <option :value="4">4 stars</option>
                <option :value="3">3 stars</option>
                <option :value="2">2 stars</option>
                <option :value="1">1 star</option>
            </select>
        </div>

        <div class="form-group">
            <label class="recommend-label">Would you recommend this product?</label>
            <div class="recommend-options">
                <label class="recommend-option" for="recommend-yes">
                    <input id="recommend-yes" type="radio" v-model="review.recommend" value="yes">
                    <span>Yes</span>
                </label>
                <label class="recommend-option" for="recommend-no">
                    <input id="recommend-no" type="radio" v-model="review.recommend" value="no">
                    <span>No</span>
                </label>
            </div>
        </div>

        <input class="button" type="submit" value="Submit">
    </form>
</template>