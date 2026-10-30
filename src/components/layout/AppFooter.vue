<!--
  LESSON — Simple Footer
  3 parts only: Brand | Links (v-for) | Copyright
  Match this with the footer in shop-listing.html
-->
<script setup>
  import { ref } from 'vue'

  const links = ref([
    { name: 'About', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'Help', href: '#' },
    { name: 'Privacy', href: '#' },
  ])
</script>

<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <!-- A) Brand -->
      <a class="footer-brand" href="#">
        <span class="logo-mark">S</span>
        ShopVue
      </a>

      <!-- B) Links — v-for loops over the array -->
      <ul class="footer-links">
        <li v-for="item in links" :key="item.name">
          <a :href="item.href">{{ item.name }}</a>
        </li>
      </ul>
    </div>

    <!-- C) Copyright -->
    <p class="footer-copy">© 2026 ShopVue. Built for learning Vue.</p>
  </footer>
</template>

<style scoped>
  .site-footer {
    background: #ffffff;
    border-top: 1px solid #e5e7eb;
    margin-top: 40px;
    padding: 28px 24px 20px;
  }

  .footer-inner {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    flex-wrap: wrap;
  }

  .footer-brand {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 700;
    color: #1f2937;
    text-decoration: none;
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

  .footer-links {
    display: flex;
    gap: 8px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .footer-links a {
    display: block;
    padding: 6px 10px;
    border-radius: 6px;
    color: #4b5563;
    font-size: 13px;
    font-weight: 500;
    text-decoration: none;
  }

  .footer-links a:hover {
    color: #3b82f6;
    background: #eff6ff;
  }

  .footer-copy {
    width: 100%;
    text-align: center;
    margin-top: 20px;
    padding-top: 16px;
    border-top: 1px solid #e5e7eb;
    color: #9ca3af;
    font-size: 12px;
  }
</style>
