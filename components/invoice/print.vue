<template>
<!--    :name="invoiceProps.id+toDate(new Date())"-->
    <PrintComponent >
        <div class="max-w-4xl mx-auto p-8 bg-white shadow-lg print:h-screen print:w-screen">
            <!-- Invoice Header -->
            <div class="flex justify-between items-start mb-8">
                <div>
                    <h1 class="text-2xl font-bold mb-2">INVOICE</h1>
                    <p class="text-gray-600">Invoice #{{ invoiceProps.id }}</p>
                    <p class="text-gray-600">{{ toDate(invoiceProps.tanggal_invoice) }}</p>
                </div>
                <div class="text-right">
                    <div class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        {{ invoiceProps.status }}
                    </div>
                </div>
            </div>

            <!-- Customer Details -->
            <div class="mb-8">
                <h2 class="text-lg font-semibold mb-3">Customer Details</h2>
                <div class="bg-gray-50 p-4 rounded">
                    <p class="font-medium">{{ customersProps[0].nama }}</p>
                    <p>{{ customersProps[0].alamat }}</p>
                    <p>{{ customersProps[0].kota }}</p>
                    <p>Tel: {{ customersProps[0].tlp }}</p>
                </div>
            </div>

            <!-- Products Table -->
            <div class="mb-8">
                <table class="w-full">
                    <thead>
                    <tr class="border-b-2 border-gray-200">
                        <th class="text-left py-2">Product</th>
                        <th class="text-left py-2">Description</th>
                        <th class="text-right py-2">Price</th>
                        <th class="text-right py-2">Quantity</th>
                        <th class="text-right py-2">Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="product in productsProps" :key="product.id" class="border-b">
                        <td class="py-2">{{ product.nama }}</td>
                        <td class="py-2">{{ product.keterangan }}</td>
                        <td class="text-right py-2">{{ toPrice(product.harga) }}</td>
                        <td class="text-right py-2">{{ product.jumlah }}</td>
                        <td class="text-right py-2">{{ toPrice(product.harga * product.jumlah) }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <!-- Summary -->
            <div class="w-1/2 ml-auto">
                <div class="space-y-2">
                    <div class="flex justify-between">
                        <span>Subtotal:</span>
                        <span>{{ toPrice(toCalculate(productsProps)) }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Shipping:</span>
                        <span>{{ toPrice(invoiceProps.ongkir) }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Discount:</span>
                        <span>{{ invoiceProps.discount }}%</span>
                    </div>
                    <div v-if="invoiceProps.uang_muka > 0" class="flex justify-between">
                        <span>Down Payment:</span>
                        <span>{{ toPrice(invoiceProps.uang_muka) }}</span>
                    </div>
                    <div class="flex justify-between font-bold pt-2 border-t">
                        <span>Total:</span>
                        <span>{{ toPrice(calculateTotal()) }}</span>
                    </div>
                </div>
            </div>

            <!-- Notes -->
            <div class="mt-8 pt-4 border-t">
                <h3 class="font-semibold mb-2">Notes:</h3>
                <p class="text-gray-600">{{ invoiceProps.notes }}</p>
            </div>
        </div>
    </PrintComponent>
</template>

<script setup lang="ts">
import type { InvoiceResponse } from "~/schema/invoice";
import { toPrice } from "~/utils/toPrice";
import { toCalculate } from "~/utils/toCalculate";
import { toDate } from "~/utils/toDate";

const props = defineProps<InvoiceResponse>()

const calculateTotal = () => {
    const subtotal = toCalculate(props.productsProps)
    const discountAmount = subtotal * (props.invoiceProps.discount / 100)
    return subtotal + props.invoiceProps.ongkir - discountAmount - props.invoiceProps.uang_muka
}
</script>

