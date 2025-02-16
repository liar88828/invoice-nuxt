<template>
    <div class=" card card-body bg-base-200">
        <div class="flex justify-between">
            <h2 class="card-title">Menu Customer</h2>
            <CustomerCreate/>
        </div>
        <PageLoading v-if="!data || status === 'pending'"/>
        <PageError v-else-if="!data"/>
        <CustomerTable v-else :customers="data" />
<!--        <CustomerTestData/>-->
    </div>
</template>

<script lang="ts" setup>
import { useCustomer } from "~/composables/customer";
const search=ref('')
const { onGet } = useCustomer()
const { status, data } = await onGet(search)
</script>

<style></style>
