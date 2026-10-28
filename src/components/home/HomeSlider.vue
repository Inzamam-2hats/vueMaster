<script setup>
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
  import 'swiper/css'
  import 'swiper/css/navigation'
  import 'swiper/css/pagination'
  import 'swiper/css/effect-fade'

  import summerSaleImg from '@/assets/images/slider/summer-sale.jpg'
  import newArrivalsImg from '@/assets/images/slider/new-arrivals.jpg'
  import freeShippingImg from '@/assets/images/slider/free-shipping.jpg'

  const modules = [Navigation, Pagination, Autoplay, EffectFade]

  const slides = [
    {
      id: 1,
      image: summerSaleImg,
      title: 'Summer Sale',
      description: 'Up to 50% off on selected styles. Refresh your wardrobe today.',
      cta: 'Shop deals',
    },
    {
      id: 2,
      image: newArrivalsImg,
      title: 'New Arrivals',
      description: 'Fresh products for the season — discover what’s new in store.',
      cta: 'Browse new',
    },
    {
      id: 3,
      image: freeShippingImg,
      title: 'Free Shipping',
      description: 'On orders over $50. Fast delivery to your door.',
      cta: 'Start shopping',
    },
  ]
</script>

<template>
  <Swiper
    :modules="modules"
    :slides-per-view="1"
    :loop="true"
    :effect="'fade'"
    :speed="700"
    navigation
    :pagination="{ clickable: true }"
    
    class="home-slider"
  >
    <SwiperSlide v-for="(slide, index) in slides" :key="slide.id">
      <div class="slide">
        <img
          class="slide-image"
          :src="slide.image"
          :alt="slide.title"
          :fetchpriority="index === 0 ? 'high' : 'auto'"
          :loading="index === 0 ? 'eager' : 'lazy'"
          decoding="async"
        />
        <div class="slide-overlay" />
        <div class="slide-content">
          <p class="slide-eyebrow">ShopVue</p>
          <h2>{{ slide.title }}</h2>
          <p class="slide-desc">{{ slide.description }}</p>
          <RouterLink class="slide-cta" to="/listing">{{ slide.cta }}</RouterLink>
        </div>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<style scoped src="@/assets/css/home-slider.css"></style>

