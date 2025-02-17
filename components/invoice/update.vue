<template>
    <InvoiceForm
        :customersProps="customersProps"
        :productsProps="productsProps"
        :invoiceProps="invoiceProps"
        :onSubmit="onSubmit"
        title="Please Add A New Invoice"
    >
        <InvoiceCustomerModalButton/>
        <InvoiceCustomerTableSelect :customersProps="customersProps"/>
        <InvoiceProductModalButton/>
        <InvoiceProductTableSelect :productsProps="productsProps"/>
    </InvoiceForm>
    <InvoiceCustomerModalSearch :onSelect="onSelectCustomer"/>
    <InvoiceProductModalSearch :onSelect="onSelectProduct"/>

</template>

<script lang="ts" setup>
import { useInvoice } from "~/composables/invoice";
import type { Customers, Products } from ".prisma/client";
import type { InvoiceResponse } from "~/schema/invoice";

const { onUpdate } = useInvoice()
const { productsProps, customersProps, invoiceProps } = defineProps<InvoiceResponse>()
const onSubmit = async () => {
    await onUpdate(invoiceProps, customersProps[0], productsProps)
}

const onSelectCustomer = (item: Customers) => {
    customersProps[0] = item; // Safe assignment
};

const onSelectProduct = (item: Products) => {
    productsProps.push(item)
}
</script>

