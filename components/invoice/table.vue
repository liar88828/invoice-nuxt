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
                <td class="">{{ item.tanggal_invoice }}</td>
                <td class="">{{ item.ongkir }}</td>
                <td class="">{{ item.discount }}</td>
                <td class="">{{ item.total }}</td>
                <td class="">{{ item.status }}</td>
                <td class="">
                    <div class="flex gap-2">
                        <button
                            @click="() => onDelete(item.id)"
                            class="btn btn-error btn-square"
                        >
                            <Trash/>
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
import { Trash } from "lucide-vue-next";
import { useInvoice } from "~/composables/invoice";
import type { InvoiceProductCustomer } from "~/schema/invoice";

defineProps<{ invoices: InvoiceProductCustomer[]; }>();
const { onDelete } = useInvoice()

</script>

<style></style>
