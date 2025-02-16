<template>
    <ul class="menu  bg-base-200 rounded-box menu-lg  hidden sm:block space-y-5 py-5">
        <li class="">
            <NuxtLink
                :class=" route.name==='index'&&'active' "

                href="/">
                <Home/>
                Home
            </NuxtLink>
        </li>
        <li>
            <NuxtLink
                :class=" route.path.includes('customer')&&'active' "
                href="/customer">
                <CircleUser/>
                Customers
                <span class="badge badge-sm badge-info">{{ data?.customer }}</span>
            </NuxtLink>
        </li>
        <li>
            <NuxtLink
                :class=" route.path.includes('product')&&'active' "
                href="/product">
                <Package/>
                Product
                <span class="badge badge-sm badge-info">{{ data?.product }}</span>
            </NuxtLink>
        </li>
        <li>
            <NuxtLink
                :class=" route.path.includes('invoice')&&'active' "
                href="/invoice">
                <NotebookText/>
                Invoice
                <span class="badge badge-sm badge-info">{{ data?.invoice }}</span>
            </NuxtLink>
        </li>
  </ul>
</template>

<script lang="ts" setup>
import { CircleUser, Home, NotebookText, Package } from "lucide-vue-next";

const { data } = await useFetch('/api/option/count', {
    transform: ({ data }) => (data)
})
const route = useRoute()

</script>

