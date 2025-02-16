<script setup lang="ts">
import type { Customers } from ".prisma/client";
import { X } from "lucide-vue-next";

defineProps<{ customersProps: Customers[] }>()

</script>

<template>

        <div class="overflow-x-auto">
            <h1 class="text-error text-xl" v-if="customersProps.length===0">Please Select</h1>
            <table class="table" customers="" v-else>
                <thead>
                <tr class="uppercase text-sm">
                    <th class="">Action</th>
                    <th class="">Nama Customer</th>
                    <th class="">Telephone</th>
                    <th class="">alamat</th>
                    <th class="">Kota</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in customersProps" :key="index" class="hover:bg-base-200/90">
                    <td class="">
                        <button
                            type="button"
                            @click="()=>{
                                customersProps.splice(index,1)
                            }"
                            class="btn btn-error btn-square">
                            <X/>
                        </button>
                    </td>
                    <td class="">{{ item.nama }}</td>
                    <td class="">{{ item.tlp }}</td>
                    <td class="">{{ item.alamat }}</td>
                    <td class="">{{ item.kota }}</td>

                </tr>
                </tbody>
            </table>
    </div>

</template>

<style scoped>

</style>