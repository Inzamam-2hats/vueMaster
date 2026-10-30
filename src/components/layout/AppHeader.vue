<!--
  Header — Logo | Shop | Search (URL ?search=) | Cart
  Step A1: search only updates the URL (API wired in A2).
-->
<script setup>
  import { ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  defineProps({
    cart: {
      type: Number,
      default: 0,
    },
  })

  const route = useRoute()
  const router = useRouter()

  // What the user sees/types (local). Synced FROM the URL on load / back-forward.
  const searchInput = ref(String(route.query.search || ''))

  let debounceTimer = null

  // When URL search changes (refresh, back, forward, clear link), update the input
  watch(
    () => route.query.search,
    (value) => {
      const next = String(value || '')
      if (next !== searchInput.value) {
        searchInput.value = next
      }
    }
  )

  function writeSearchToUrl(raw) {
    const value = raw.trim()
    const query = { ...route.query }

    // New search → start at page 1
    delete query.page

    if (value) {
      query.search = value
    } else {
      delete query.search
    }

    const onListing = route.name === 'listing' || route.path.startsWith('/listing')

    router.push({
      path: onListing ? route.path : '/listing',
      query,
    })
  }

  function onSearchInput(event) {
    const value = event.target.value
    searchInput.value = value

    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      writeSearchToUrl(value)
    }, 300) // 250–350ms debounce (client brief)
  }

  function clearSearch() {
    clearTimeout(debounceTimer)
    searchInput.value = ''
    writeSearchToUrl('')
  }
</script>

<template>
  <header class="top-nav">
    <div class="site-header">
      <RouterLink class="logo" to="/">
        <span class="logo-mark">S</span>
        ShopVue
      </RouterLink>

      <RouterLink class="nav-link" to="/listing">Shop</RouterLink>

      <div class="nav-search">
        <svg width="16" height="16" fill="none" stroke="#9ca3af" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3-3" />
        </svg>
        <input
          :value="searchInput"
          type="search"
          name="search"
          placeholder="Search products..."
          aria-label="Search products"
          @input="onSearchInput"
        />
        <button
          v-if="searchInput"
          type="button"
          class="search-clear"
          aria-label="Clear search"
          @click="clearSearch"
        >
          ×
        </button>
      </div>

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
    </div>
  </header>
</template>

<style scoped>
  .top-nav {
    background: #ffffff;
    border-bottom: 1px solid #e5e7eb;
  }

  .site-header {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 14px 24px;
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

  .nav-link {
    color: #4b5563;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    flex-shrink: 0;
  }

  .nav-link:hover,
  .nav-link.router-link-active {
    color: #3b82f6;
  }

  .nav-search {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #f3f4f6;
    border-radius: 8px;
    padding: 8px 12px;
    width: min(320px, 100%);
    margin-left: auto;
    flex-shrink: 1;
  }

  .nav-search input {
    border: none;
    background: transparent;
    outline: none;
    width: 100%;
    color: #1f2937;
    font-family: inherit;
    font-size: 14px;
  }

  .nav-search input::placeholder {
    color: #9ca3af;
  }

  /* Hide browser’s built-in clear (✕) on type="search" — we use our own button */
  .nav-search input[type='search']::-webkit-search-cancel-button,
  .nav-search input[type='search']::-webkit-search-decoration {
    -webkit-appearance: none;
    appearance: none;
  }

  .search-clear {
    border: none;
    background: transparent;
    color: #9ca3af;
    font-size: 18px;
    line-height: 1;
    cursor: pointer;
    padding: 0 2px;
  }

  .search-clear:hover {
    color: #4b5563;
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

  @media (max-width: 700px) {
    .site-header {
      flex-wrap: wrap;
      gap: 12px;
    }

    .nav-search {
      order: 3;
      width: 100%;
      margin-left: 0;
    }
  }

  @media (max-width: 520px) {
    .cart-label {
      display: none;
    }
  }
</style>
