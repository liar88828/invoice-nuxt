<template>
    <div class=" mx-auto card card-body bg-base-200">
        <div class="flex justify-between">
            <h2 class="card-title">Menu Produk</h2>
            <ProductCreate/>
        </div>
        <PageLoading v-if="!data || status === 'pending'"/>
        <PageError v-else-if="!data"/>
        <ProductTable v-else :products="data"/>
    </div>
</template>

<script lang="ts" setup>
import { ProductCreate } from "#components";
import { useProduct } from "~/composables/product";

const { onGet } = useProduct()
const { data, status } = await onGet()
</script>

<style></style>
