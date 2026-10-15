# Vue Mastery — Product Page

A Vue 3 product page demo (Vue Mastery socks) built with Vite. Shows reactive product data, variant images, stock state, and a simple cart.

## Features

- Product title and brand (`Socks` / `Vue Mastery`)
- Stock status (`In Stock` / `Out of Stock`)
- Material details list
- Color variants (green / blue) — hover a swatch to update the product image
- Add to cart button (disabled when out of stock)
- Cart count in the header

## Stack

- [Vue 3](https://vuejs.org/) (Composition API with `<script setup>`)
- [Vite](https://vitejs.dev/)

## Project setup

```sh
npm install
```

### Development (hot reload)

```sh
npm run dev
```

### Production build

```sh
npm run build
```

### Preview production build

```sh
npm run preview
```

## Project structure

```
src/
  App.vue              # Product page UI and state
  main.js              # App entry
  assets/
    main.css           # Styles
    images/
      socks_green.jpeg
      socks_blue.jpeg
```

## Notes

- Variant images switch on `@mouseover` via `updateImage`.
- Cart increments with `addToCart`; the button uses `:disabled` when `inStock` is `false`.
