<template>
    <div class="mt-6 overflow-x-auto ">
        <table class="table" invoices="">
            <thead>
            <tr class="uppercase text-sm">
                <th class="">Tanggal</th>
                <th class="">Ongkir</th>
                <th class="">Diskon</th>
                <th class="">Total</th>
                <th class="">Status</th>
                <th class="">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in invoices" :key="index" class="hover:bg-gray-100">
                <td class="">{{toDate (item.tanggal_invoice) }}</td>
                <td class="">{{ toPrice(item.ongkir) }}</td>
                <td class="">{{ item.discount  }} %</td>
                <td class="">{{ toPrice(item.total) }}</td>
                <td class="">{{ item.status }}</td>
                <td class="">
                    <div class="flex gap-2">
                        <button
                            @click="() => onDelete(item.id)"
                            class="btn btn-error btn-square"
                        >
                            <IconTrash/>
                        </button>
                        <NuxtLink
                            :href="`/invoice/update/${item.id}`"
                            class="btn btn-info btn-square">
                            <IconPen/>
                        </NuxtLink>
                        <NuxtLink
                            :href="`/invoice/print/${item.id}`"
                            class="btn btn-success btn-square">
                            <IconPrinter/>
                        </NuxtLink>

                    </div>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts" setup>
import { useInvoice } from "~/composables/invoice";
import type { InvoiceProductCustomer } from "~/schema/invoice";
import { toPrice } from "~/utils/toPrice";

defineProps<{ invoices: InvoiceProductCustomer[]; }>();
const { onDelete } = useInvoice()

</script>

<style></style>
