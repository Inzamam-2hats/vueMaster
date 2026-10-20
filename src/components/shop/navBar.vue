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
    },
    activeCategory: {
      type: String,
      required: true
    },
    cart: {
      type: Number,
      default: 0,
    },
  })

  const emit = defineEmits(['update:searchText', 'update:activeCategory'])

  // Categories list — later we can filter products by the active one
  const categories = ref([
    { name: 'All', slug: 'All' },
    { name: 'Beauty', slug: 'beauty' },
    { name: 'Smartphones', slug: 'smartphones' },
    { name: 'Laptops', slug: 'laptops' },
    { name: 'Fragrances', slug: 'fragrances' },
    { name: 'Groceries', slug: 'groceries' },
  ])

  const selectCategory = (name) => {
    emit('update:activeCategory', name)
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
          :href="item.slug || '#'"
          :class="{ active: activeCategory === item.slug }"
          @click.prevent="selectCategory(item.slug)"
        >
          {{ item.name }}
        </a>
      </li>
    </ul>

    <!-- C) Search — :value keeps input text in searchText -->
    <div class="nav-search">
      <svg width="16" height="16" fill="none" stroke="#9ca3af" stroke-width="2" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3-3" />
      </svg>
      <input
        :value="searchText"
        type="search"
        placeholder="Search products..."
        @input="emit('update:searchText', $event.target.value)"
      />
    </div>
    <!-- D) Cart — Flipkart-style icon + badge -->
    <a class="nav-cart" href="#" @click.prevent>
      <span class="cart-icon-wrap">
        <svg
          class="cart-icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="9" cy="20" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="18" cy="20" r="1.5" fill="currentColor" stroke="none" />
          <path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h9.2a1 1 0 0 0 1-.8L21 8H7" />
        </svg>
        <span v-if="cart > 0" class="cart-badge">{{ cart > 9 ? '9+' : cart }}</span>
      </span>
      <span class="cart-label">Cart</span>
    </a>
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

  .nav-cart {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
    color: #1f2937;
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
  }

  .nav-cart:hover {
    color: #3b82f6;
  }

  .cart-icon-wrap {
    position: relative;
    display: grid;
    place-items: center;
    width: 24px;
    height: 24px;
  }

  .cart-icon {
    display: block;
  }

  .cart-badge {
    position: absolute;
    top: -6px;
    right: -8px;
    min-width: 16px;
    height: 16px;
    padding: 0 4px;
    border-radius: 999px;
    background: #fbbf24;
    color: #1f2937;
    font-size: 10px;
    font-weight: 700;
    line-height: 16px;
    text-align: center;
    border: 1.5px solid #ffffff;
  }

  .cart-label {
    line-height: 1;
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

    .cart-label {
      display: none;
    }
  }
</style>
