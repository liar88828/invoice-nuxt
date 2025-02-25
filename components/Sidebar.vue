<template>
    <ul class="menu  bg-base-200 rounded-box menu-lg  hidden sm:block space-y-5 py-5">
        <li class="">
            <NuxtLink
                :class=" route.name==='index'&&'active' "

                href="/">
                <IconHome/>
                Home
            </NuxtLink>
        </li>
        <li>
            <NuxtLink
                :class=" route.path.includes('customer')&&'active' "
                href="/customer">
                <IconCircleUser/>
                Customers
                <span class="badge badge-sm badge-info">{{ data?.customer }}</span>
            </NuxtLink>
        </li>
        <li>
            <NuxtLink
                :class=" route.path.includes('product')&&'active' "
                href="/product">
                <IconPackage/>
                Product
                <span class="badge badge-sm badge-info">{{ data?.product }}</span>
            </NuxtLink>
        </li>
        <li>
            <NuxtLink
                :class=" route.path.includes('invoice')&&'active' "
                href="/invoice">
                <IconNotebookText/>
                Invoice
                <span class="badge badge-sm badge-info">{{ data?.invoice }}</span>
            </NuxtLink>
        </li>
  </ul>
</template>

<script lang="ts" setup>
const { data } = await useFetch('/api/option/count', {
    transform: ({ data }) => (data)
})
const route = useRoute()

</script>

