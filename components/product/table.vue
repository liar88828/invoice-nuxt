<template>
    <!-- Table -->
    <div class="mt-6 overflow-x-auto ">
        <table class="table " products="">
            <thead>
            <tr class="uppercase text-sm">
                <th class="">
                    <div class="flex items-center ">
                        Nama Produk

<!--                        <IconChevronUp  v-if="price===true" @click="$emit('update:price',   true)"/>-->
<!--                        <IconChevronDown  v-if="" @click="$emit('update:price',   false)"/>-->
<!--                        <IconChevronsUpDown  v-if="" @click="$emit('update:price', undefined)"/>-->
                    </div>
                </th>
                <th class="">Keterangan</th>
                <th class="">
                    <div class="flex items-center ">
                        Harga
<!--                        <IconChevronUp-->
<!--                            @click="$emit('update:price',   + 1)"-->
<!--                        />-->
                    </div>
                </th>
                <th class="">Jumlah</th>
                <th class="">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(prod, index) in products" :key="index" class="hover:bg-gray-100">
                <td class="">{{ prod.nama }}</td>
                <td class="">{{ prod.harga }}</td>
                <td class="">{{ prod.jumlah }}</td>
                <td class="">{{ prod.keterangan }}</td>
                <td class="">
                    <div class="flex gap-2">
                        <button
                            @click="() => onDelete(prod.id)"
                            class="btn btn-error btn-square"
                        >
                            <Trash/>
                        </button>
                        <ProductUpdate :product="prod" :submitForm="() => onUpdate(prod)"/>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts" setup>
import { Trash } from "lucide-vue-next";
import type { Products } from "@prisma/client";
import { useProduct } from "~/composables/product";

defineProps<{
    products: Products[];
    // price?: boolean,
    // name?: boolean,
}>();
// const emit = defineEmits([ "update:price", "update:name" ]);
const { onDelete, onUpdate } = useProduct()

</script>
<style></style>
