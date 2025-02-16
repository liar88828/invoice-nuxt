<template>
    <PageLoading v-if="!data || status === 'pending'"/>
    <PageError v-else-if="!data||status === 'error'"/>
    <InvoiceUpdate v-else-if="data||status === 'success'"
                   :invoiceProps="data.invoiceProps"
                   :customers-props="data.customersProps"
                   :products-props="data.productsProps"
    />
</template>

<script setup lang="ts">
import { useInvoice } from "~/composables/invoice";
const { onGetById } = useInvoice()
const { status, data } = await onGetById()
</script>