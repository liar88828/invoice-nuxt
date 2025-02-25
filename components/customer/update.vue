<template>
    <!-- Open the modal using ID.showModal() method -->
    <!-- ${product.id} -->
    <button class="btn btn-info btn-square" @click="openModal">
        <IconPen />
    </button>
    <!-- ${product.id} -->
    <dialog ref="modal" class="modal">
        <div class="modal-box">
            <h3 class="text-lg font-bold">Update Add A New Product</h3>
            <!-- Form -->
            <form @submit.prevent="submitForm" class="space-y-4">
                  <div class="form-control">
                    <label class="text-sm font-medium">Nama Produk</label>
                    <input
                        v-model="customer.nama"
                        type="text"
                        class="input input-bordered"
                        placeholder="Masukkan nama produk"
                    />
                  </div>

                  <div class="form-control">
                    <label class="text-sm font-medium">alamat</label>
                    <input
                        v-model="customer.alamat"
                        type="text"
                        class="input input-bordered"
                        placeholder="Masukkan alamat produk"
                    />
                  </div>

                  <div class="form-control">
                    <label class="text-sm font-medium">kota</label>
                    <input
                        v-model="customer.kota"
                        type="number"
                        class="input input-bordered"
                        placeholder="Masukkan kota produk"
                    />
                  </div>

                  <div class="form-control">
                    <label class="before: text-sm font-medium">tlp</label>
                    <input
                        v-model="customer.tlp"
                        class="input input-bordered"
                        type="tel"
                        placeholder="Masukkan telephone produk"
                    />
                  </div>
                <button
                    type="submit"
                    class="btn btn-info btn-block"
                >
                    Simpan
                </button>
            </form>
            <div class="modal-action">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn">Close</button>
                </form>
            </div>
        </div>
    </dialog>
</template>

<script lang="ts" setup>
import type { Customers } from "@prisma/client";
defineProps<{
    customer: Customers;
    submitForm: () => void;
}>();

const modal = ref<HTMLDialogElement | null>(null);

const openModal = () => {
    if (modal.value) {
        modal.value.showModal();
    }
};
</script>

<style></style>
