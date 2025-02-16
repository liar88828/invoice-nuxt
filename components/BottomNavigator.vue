<template>
    <div class="btm-nav sm:hidden">
        <NuxtLink href="/"
                  :class="`text-primary ${route.name==='index'&&'active' }` "
        >
            <Home/>
        </NuxtLink>
        <NuxtLink href="/customer"
                  :class="`text-primary ${route.path.includes('customer')&&'active' }` "
        >
            <CircleUser/>
        </NuxtLink>
        <NuxtLink href="/product"
                  :class="`text-primary ${route.path.includes('product')&&'active' }` "
        >
            <Package/>
        </NuxtLink>
        <NuxtLink href="/invoice"
                  :class="`text-primary ${route.path.includes('invoice')&&'active' }` "
        >
            <NotebookText/>
        </NuxtLink>
    </div>
</template>
<script setup lang="ts">
import { CircleUser, Home, NotebookText, Package } from 'lucide-vue-next';

const route = useRoute()
</script>