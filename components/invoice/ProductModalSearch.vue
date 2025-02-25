<script setup lang="ts">
import { ref } from 'vue';
import { useDebounce } from "~/composables/useDebounce";
import type { Products } from "@prisma/client";

const { onSearch } = useProduct();
const search = ref<string>('');
const debouncedQuery = useDebounce(search, 500);
const { refresh, data } = await onSearch(debouncedQuery);
const onSearchHandler = () => refresh();
defineProps<{ onSelect: (product: Products) => void }>()
</script>

<template>
    <dialog id="my_modal_product" class="modal">
        <div class="modal-box w-11/12 max-w-5xl">
            <h3 class="text-lg font-bold">Please select the product</h3>
            <div class="flex justify-between">
                <div class="join">
                <input
                    type="search" v-model="search"
                    class="input input-bordered join-item">
                <button
                    @click="onSearchHandler"
                    class="join-item btn btn-info">
                    <IconSearch/>
                </button>
            </div>
                <form method="dialog">
                    <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        <IconX/>
                    </button>
                </form>
            </div>

            <div class="mt-6 overflow-x-auto w-full">
                <table class="table table-xs">
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
                            <div class="modal-action flex justify-start items-start text-start ">
                                <form method="dialog" class="">
                                    <button
                                        @click="()=>{
                                            onSelect({ ...item, jumlah:0 })
                                            search=''
                                        }" class="btn btn-info btn-square btn-sm">
                                        <IconCheck/>
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
            <form method="dialog" class="modal-backdrop">
                <button>close</button>
            </form>
        </div>
    </dialog>
</template>

