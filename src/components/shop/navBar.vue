<!--
  LESSON — Simple NavBar
  3 parts only: Logo | Categories (v-for) | Search
  Match this with the header in shop-listing.html
-->
<script setup>
  import { ref } from 'vue'

  const props = defineProps({
    searchText: {
      type: String,
      required: true
    }
  })

  // Categories list — later we can filter products by the active one
  const categories = ref([
    { name: 'All', href: '#' },
    { name: 'Accessories', href: '#' },
    { name: 'Appliances', href: '#' },
    { name: 'Bags', href: '#' },
    { name: 'Electronic', href: '#' },
    { name: 'Kitchen', href: '#' },
  ])

  const activeCategory = ref('All')

  const selectCategory = (name) => {
    activeCategory.value = name
  }
</script>

<template>
  <header class="top-nav">
    <!-- A) Logo -->
    <a class="logo" href="#">
      <span class="logo-mark">S</span>
      ShopVue
    </a>

    <!-- B) Categories — v-for loops over the array -->
    <ul class="nav-categories">
      <li v-for="item in categories" :key="item.name">
        <a
          :href="item.href"
          :class="{ active: activeCategory === item.name }"
          @click.prevent="selectCategory(item.name)"
        >
          {{ item.name }}
        </a>
      </li>
    </ul>

    <!-- C) Search — v-model keeps input text in searchText -->
    <div class="nav-search">
      <svg width="16" height="16" fill="none" stroke="#9ca3af" stroke-width="2" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3-3" />
      </svg>
      <input
        v-model="searchText"
        type="search"
        placeholder="Search products..."
      />
    </div>
  </header>
</template>

<style scoped>
  .top-nav {
    display: flex;
    align-items: center;
    gap: 32px;
    padding: 14px 24px;
    background: #ffffff;
    border-bottom: 1px solid #e5e7eb;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 18px;
    font-weight: 700;
    color: #1f2937;
    text-decoration: none;
    flex-shrink: 0;
  }

  .logo-mark {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: #3b82f6;
    color: #ffffff;
    display: grid;
    place-items: center;
    font-size: 14px;
    font-weight: 700;
  }

  .nav-categories {
    display: flex;
    align-items: center;
    gap: 8px;
    list-style: none;
    margin: 0;
    padding: 0;
    flex: 1;
  }

  .nav-categories a {
    display: block;
    padding: 8px 12px;
    border-radius: 8px;
    color: #4b5563;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
  }

  .nav-categories a:hover,
  .nav-categories a.active {
    color: #3b82f6;
    background: #eff6ff;
  }

  .nav-search {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #f3f4f6;
    border-radius: 8px;
    padding: 8px 14px;
    width: 260px;
    flex-shrink: 0;
  }

  .nav-search input {
    border: none;
    background: transparent;
    outline: none;
    width: 100%;
    color: #1f2937;
    font-family: inherit;
  }

  .nav-search input::placeholder {
    color: #9ca3af;
  }

  @media (max-width: 900px) {
    .top-nav {
      flex-wrap: wrap;
      gap: 12px;
    }

    .nav-categories {
      order: 3;
      width: 100%;
      overflow-x: auto;
    }

    .nav-search {
      margin-left: auto;
    }
  }

  @media (max-width: 520px) {
    .nav-search {
      width: 100%;
      margin-left: 0;
    }
  }
</style>
