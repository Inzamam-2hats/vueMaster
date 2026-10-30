import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import ProductListingPage from '@/views/ProductListingPage.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/listing', name: 'listing', component: ProductListingPage },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
