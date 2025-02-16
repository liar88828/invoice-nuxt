<script setup lang="ts">
import { Check } from 'lucide-vue-next';
import { ref } from 'vue';
import { useDebounce } from "~/composables/useDebounce";
import type { Invoice_products, Products } from ".prisma/client";

const { onGet } = useProduct();
const search = ref<string>('');
const debouncedQuery = useDebounce(search, 500);
const { refresh, data } = await onGet(debouncedQuery);
const onSearch = () => refresh();
defineProps<{ onSelect: (product: Products | Invoice_products) => void }>()

</script>

<template>
    <dialog id="my_modal_product" class="modal">
        <div class="modal-box w-11/12 max-w-5xl">
            <h3 class="text-lg font-bold">Please select the customer</h3>
            <div class="join">
                <input
                    type="search" v-model="search"
                    class="input input-bordered join-item">
                <button
                    @click="onSearch"
                    class="join-item btn btn-info">
                    <IconSearch/>
                </button>
            </div>
            <div class="mt-6 overflow-x-auto w-full">
                <table class="table" customers="">
                    <thead>
                    <tr class="uppercase text-sm">
                        <th class="">Action</th>
                        <th class="">Nama product</th>
                        <th class="">Keterangan</th>
                        <th class="">Harga</th>
                        <th class="">Jumlah</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in data" :key="index" class="hover:bg-base-200/90">
                        <td class="">
                            <div class="modal-action">
                                <form method="dialog">
                                    <button
                                        @click="()=>onSelect(item)" class="btn btn-info btn-square">
                                        <Check/>
                                    </button>
                                </form>
                            </div>
                        </td>
                        <td class="">{{ item.nama }}</td>
                        <td class="">{{ item.harga }}</td>
                        <td class="">{{ item.jumlah }}</td>
                        <td class="">{{ item.keterangan }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div class="modal-action">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn">Close</button>
                </form>
            </div>
        </div>
    </dialog>
</template>

