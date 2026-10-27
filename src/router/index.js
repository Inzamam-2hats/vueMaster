import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import ListingPage from '@/pages/ListingPage.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/listing', name: 'listing', component: ListingPage },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
