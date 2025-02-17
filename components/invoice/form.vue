<template>
    <div class="card card-body">
        <h3 class="text-lg font-bold mb-5">{{ title }}</h3>
        <form @submit.prevent="onSubmit" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div class="form-control  ">
                    <label class="text-sm font-medium">tanggal_invoice</label>
                    <input
                        v-model="invoiceProps.tanggal_invoice"
                        type="datetime-local"
                        class="input input-bordered"
                        placeholder="Masukkan nama tanggal invoice"
                    />
                </div>
                <div class="form-control">
                    <label class=" text-sm font-medium">Status</label>
                    <select
                        v-model="invoiceProps.status"
                        class="select select-bordered"
                    >
                        <option value="Pending">Pending</option>
                        <option value="Selesai">Selesai</option>
                        <option value="Dibatalkan">Dibatalkan</option>
                    </select>
                </div>
            </div>
            <slot/>

            <div class="grid grid-cols-1 sm:grid-cols-2  gap-5">
                <div class="form-control">
                    <label class="text-sm font-medium">Ongkir</label>
                    <input
                        v-model="invoiceProps.ongkir"
                        type="number"
                        class="input input-bordered"
                        placeholder="Masukkan alamat Ongkir"
                    />
                </div>


                <div class="form-control">
                    <label class="text-sm font-medium">Discount</label>
                    <input
                        v-model="invoiceProps.discount"
                        type="number"
                        class="input input-bordered"
                        placeholder="Masukkan kota Discount"
                    />
                </div>

                    <div class="form-control">
                        <label class="text-sm font-medium">Uang Muka</label>
                        <input
                            v-model="invoiceProps.uang_muka"
                            type="number"
                            class="input input-bordered"
                            placeholder="Masukkan alamat Ongkir"
                        />
                    </div>

                <div class="form-control">
                    <label class="text-sm font-medium">Note</label>
                    <textarea
                        v-model="invoiceProps.notes"
                        class="textarea input-bordered"
                        placeholder="Masukkan telephone Note"
                    ></textarea>
                </div>
                    <div class="">
                    <h1 class="text-lg font-bold">
                        Total All Product : {{ toPrice(total.totalProducts) }}
                    </h1>
                    <h1 class="text-lg font-bold">
                        Total All Product With Ongkir : {{ toPrice(total.totalProductOngkir) }}
                    </h1>
                    <h1 class="text-lg font-bold">
                        Total : {{ toPrice(total.totalAfterDiscount) }}
                    </h1>
                </div>

            </div>
            <button type="submit"
                    class=" btn btn-success btn-block">
                Apply
            </button>


            <button
                @click="$router.push('/invoice')"
                type="submit"
                class="btn btn-info btn-block">
                Save
            </button>
        </form>
    </div>


</template>

<script lang="ts" setup>
import type { InvoiceResponse } from "~/schema/invoice";
import { toPrice } from "~/utils/toPrice";

const { productsProps, invoiceProps } = defineProps<InvoiceResponse & {
    onSubmit: () => any,
    title: string
}>()

const total = computed(() => {
    const totalProducts = productsProps.reduce((a, b) => a + b.jumlah * b.harga, 0);
    const totalProductOngkir = totalProducts + invoiceProps.ongkir-invoiceProps.uang_muka;
    const discountAmount = (invoiceProps.discount / 100) * totalProductOngkir; // Calculate discount
    const totalAfterDiscount = totalProductOngkir - discountAmount; // Apply discount
    invoiceProps.total = totalAfterDiscount
    return {
        totalProducts,
        totalProductOngkir,
        totalAfterDiscount,
    }
});

</script>
