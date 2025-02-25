<template>
    <div class="btm-nav sm:hidden">
        <NuxtLink href="/"
                  :class="`text-primary ${route.name==='index'&&'active' }` "
        >
            <IconHome/>
        </NuxtLink>
        <NuxtLink href="/customer"
                  :class="`text-primary ${route.path.includes('customer')&&'active' }` "
        >
            <IconCircleUser/>
        </NuxtLink>
        <NuxtLink href="/product"
                  :class="`text-primary ${route.path.includes('product')&&'active' }` "
        >
            <IconPackage/>
        </NuxtLink>
        <NuxtLink href="/invoice"
                  :class="`text-primary ${route.path.includes('invoice')&&'active' }` "
        >
            <IconNotebookText/>
        </NuxtLink>
    </div>
</template>
<script setup lang="ts">

const route = useRoute()
</script>