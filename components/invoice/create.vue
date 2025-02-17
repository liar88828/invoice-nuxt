<template>
    <InvoiceForm
        :customersProps="customers"
        :productsProps="products"
        :invoiceProps="invoiceRef"
        :onSubmit="onSubmit"
        title="Please Add A New Invoice"
    >
        <InvoiceCustomerModalButton/>
        <InvoiceCustomerTableSelect :customersProps="customers"/>

        <InvoiceProductModalButton/>
        <InvoiceProductTableSelect :productsProps="products"/>
    </InvoiceForm>
    <InvoiceCustomerModalSearch :onSelect="onSelectCustomer"/>
    <InvoiceProductModalSearch :onSelect="onSelectProduct"/>

</template>

<script lang="ts" setup>
import { useInvoice } from "~/composables/invoice";
import type { Customers, Products } from ".prisma/client";

const customers = ref<Customers[]>([]);
const products = ref<Products[]>([]);

const { onCreate, invoiceRef } = useInvoice()
const onSubmit = async () => {
    if (!customers.value) {
        alert("Customer Not Found!");
        return;
    }
    if (products.value.length === 0) {
        alert("Product Not Found!");
        return;
    }
    invoiceRef.value.productId = products.value.map(item => ({
        id: item.id,
        qty: item.jumlah
    }))
    invoiceRef.value.customerId = customers.value[0].id
    await onCreate()
    invoiceRef.value = {
        tanggal_invoice: new Date,
        ongkir: 0,
        discount: 0,
        total: 0,
        notes: "",
        status: "",
        uang_muka: 0,
        productId: [],
        customerId: 0
    };

    customers.value.splice(0);
    products.value.splice(0);
}
const onSelectCustomer = (item: Customers) => {
    customers.value[0] = item
}

const onSelectProduct = (item: Products) => {
    products.value.push(item)
}

const total = computed(() => {
    const totalProducts = products.value.reduce((a, b) => a + b.jumlah * b.harga, 0);
    const totalProductOngkir = totalProducts + invoiceRef.value.ongkir;
    const discountAmount = (invoiceRef.value.discount / 100) * totalProductOngkir; // Calculate discount
    const totalAfterDiscount = totalProductOngkir - discountAmount; // Apply discount
    invoiceRef.value.total = totalAfterDiscount
    return {
        totalProducts,
        totalProductOngkir,
        totalAfterDiscount,
    }
});

</script>
