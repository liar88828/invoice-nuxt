<script setup lang="ts">
import { X } from "lucide-vue-next";
import type { Products } from ".prisma/client";
import { toPrice } from "../../utils/toPrice";
defineProps<{ productsProps: Products[] }>()
</script>

<template>
    <div class="">

    <div class="overflow-x-auto">
        <h1 class="text-error text-xl" v-if="productsProps.length===0">Please Select</h1>
        <table class="table">
            <thead>
            <tr class="uppercase text-sm">
                <th class="">Action</th>
                <th class="">Nama product</th>
                <th class="">Harga</th>
                <th class="">Jumlah</th>
                <th class="">Total</th>
                <th class="">Keterangan</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in productsProps" :key="index" class="hover:bg-base-200/90">
                <td class="">
                    <div class="modal-action">
                        <form method="dialog">
                            <button
                                type="button"
                                @click="()=>{
                                productsProps.splice(index,1)
                            }"
                                class="btn btn-error btn-square">
                                <X/>
                            </button>
                        </form>
                    </div>
                </td>
                <td class="">{{ item.nama }}</td>
                <td class="">{{ toPrice(item.harga) }}</td>
                <td class="">{{ item.jumlah }}</td>
                <td class="">{{ toPrice(item.jumlah*item.harga ) }}</td>
                <td class="">{{ item.keterangan }}</td>
            </tr>
            </tbody>
        </table>
    </div>
    </div>

</template>

