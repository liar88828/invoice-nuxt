<template>
    <!-- <PageLoading v-if="!data || status === 'pending'" />
    <PageError v-else-if="!data" /> -->
    <!-- v-else :products="data"  -->
    <Product />
</template>

<script lang="ts" setup>
import { PageError, PageLoading } from "#components";

// const { data, status, refresh } = await useFetch('/api/product', {
//     key: 'product_list',
//     transform: ({ data }) => {
//         if (data) {
//             return data.map(item => ({
//                 id: item.id,
//                 nama: item.nama,
//                 keterangan: item.keterangan,
//                 harga: item.harga || 0,
//                 jumlah: item.jumlah || 0,
//             }))
//         }
//         if (!data) {
//             return null
//         }

//     }
// })
</script>
