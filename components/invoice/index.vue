<template>
    <div class=" card card-body bg-base-200">
        <h2 class="card-title">Menu Invoice</h2>
        <div class="flex justify-between items-end gap-2 flex-wrap">
            <div class="form-control w-fit">
                <label class=" text-sm font-medium">Status</label>
                <select
                    v-model="option.search"
                    class="select select-bordered w-full"
                >
                    <option selected>Default</option>
                    <option value="Pending">Pending</option>
                    <option value="Selesai">Selesai</option>
                    <option value="Dibatalkan">Dibatalkan</option>
                </select>
            </div>
            <div class="form-control">
                <label class="text-sm font-medium">Date Start</label>
                <input
                    v-model="option.startDate"
                    type="datetime-local"
                    class="input input-bordered"
                    placeholder="Masukkan nama tanggal invoice"
                />
            </div>

            <div class="form-control">
                <label class="text-sm font-medium">Date End</label>
                <input
                    v-model="option.endDate"
                    type="datetime-local"
                    class="input input-bordered"
                    placeholder="Masukkan nama tanggal invoice"
                />
            </div>
            <!--            :data="[{ name:'jone doe', age:200 }]"-->
            <!--            {{// data[0]}}-->

            <InvoiceExcel v-if="data" :invoiceData="data"/>
            <NuxtLink
                href="/invoice/create"
                class="btn btn-info btn-square">
                <IconPlus/>
            </NuxtLink>
        </div>
        <PageLoading v-if="!data || status === 'pending'"/>
        <PageError v-else-if="!data"/>
        <InvoiceTable v-else :invoices="data"/>
        <Pagination
            :page="option.page"
            :limit="option.limit"
            @update:page="option.page = $event"
            @update:limit="option.limit=$event"
        />
    </div>

</template>

<script lang="ts" setup>
import { useInvoice } from "~/composables/invoice";
import Pagination from "~/components/Pagination.vue";

const option = ref({
    search: "Default", page: 1, limit: 10,
    startDate: toDateForm(new Date(), -1),
    endDate: toDateForm(new Date(), +1)
})

const optionDebounce = useDebounceObject(option, 500)
const { onGet, } = useInvoice()
const { status, data } = await onGet(optionDebounce)

</script>

<style></style>
