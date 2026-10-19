<script setup>
    import { onMounted, ref, computed } from 'vue';
const products = ref([])
    onMounted(() => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(data => {
                products.value = data.products
            })
            console.log(products.value)
    })

    const productsData = computed(() => {
        return products.value
    })

    console.log(productsData.value)
</script>
<template>
{{ products }}
</template>