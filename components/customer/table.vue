<template>
  <div class="mt-6 overflow-x-auto w-full">
    <table class="table" customers="">
      <thead>
      <tr class="uppercase text-sm">
        <th class="">Nama Customer</th>
        <th class="">Telephone</th>
        <th class="">alamat</th>
        <th class="">Kota</th>
        <th class="">Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in customers" :key="index" class="hover:bg-gray-100">
        <td class="">{{ item.nama }}</td>
        <td class="">{{ item.tlp }}</td>
        <td class="">{{ item.alamat }}</td>
        <td class="">{{ item.kota }}</td>
        <td class="">
          <div class="flex gap-2">
            <button
                @click="() => onDelete(item.id)"
                class="btn btn-error btn-square"
            >
              <Trash/>
            </button>
            <CustomerUpdate :customer="item" :submitForm="() => onUpdate(item)"/>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { Trash } from "lucide-vue-next";
import type { Customers } from ".prisma/client";

defineProps<{ customers: Customers[]; }>();



const {onDelete,onUpdate}=useCustomer()

</script>

<style></style>
