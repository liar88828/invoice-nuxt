<script setup lang="ts">
import type { Products } from "@prisma/client";
import { toPrice } from "~/utils/toPrice";

defineProps<{ productsProps: Products[] }>()
const increment = (item: Products) => {
    item.jumlah++;
}

const decrement = (item: Products) => {
    if (item.jumlah > 0) {
        item.jumlah--;
    }
}
</script>

<template>
    <div class="">

    <div class="overflow-x-auto">
        <h1 class="text-error text-xl" v-if="productsProps.length===0">Please Select</h1>
        <table class="table bg-base-200 table-xs">
            <thead>
            <tr class="uppercase text-sm">
                <th class="">Action</th>
                <th class="">Nama product</th>
                <th class="">Harga</th>
                <th class="text-center">Jumlah</th>
                <th class="">Total</th>
                <th class="">Keterangan</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in productsProps" :key="index" class="hover:bg-base-200/90">
                <td class="">
                        <div class="flex justify-start items-stretch">
                            <button
                                type="button"
                                @click="()=>{
                                        productsProps.splice(index,1)
                                    }"
                                class="btn btn-error btn-square btn-sm">
                                <IconX/>
                            </button>
                        </div>
                </td>
                <td class="">{{ item.nama }}</td>
                <td class="">{{ toPrice(item.harga) }}</td>
                <td class="">
                    <div class="flex justify-center gap-2 items-center">
                        <button
                            type="button"
                            @click="()=>decrement(item)"
                            class="btn btn-sm btn-error btn-square">
                            <IconMinus/>
                        </button>
                        <span class="">{{ item.jumlah }}</span>
                        <button
                            type="button"
                            @click="()=>increment(item)"
                            class="btn btn-sm btn-success btn-square">
                            <IconPlus/>
                        </button>
                    </div>
                </td>
                <td class="">{{ toPrice(item.jumlah*item.harga ) }}</td>
                <td class="">{{ item.keterangan }}</td>
            </tr>
            </tbody>
        </table>
    </div>
    </div>

</template>

