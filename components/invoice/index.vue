<template>
    <div class=" card card-body bg-base-200">
        <div class="flex justify-between">
            <h2 class="card-title">Menu Invoice</h2>
            <NuxtLink
                href="/invoice/create"
                class="btn btn-info btn-square">
                <Plus/>
            </NuxtLink>
        </div>
        <PageLoading v-if="!data || status === 'pending'"/>
        <PageError v-else-if="!data"/>
        <InvoiceTable v-else :invoices="data"/>
    </div>
</template>

<script lang="ts" setup>
import { useInvoice } from "~/composables/invoice";
import { Plus } from 'lucide-vue-next'

const { onGet, } = useInvoice()
const { status, data } = await onGet()

</script>

<style></style>
