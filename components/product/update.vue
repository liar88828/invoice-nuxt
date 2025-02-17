<template>
    <!-- Open the modal using ID.showModal() method -->
    <!-- ${product.id} -->
    <button class="btn btn-info btn-square" @click="openModal">
        <Pen />
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
                        v-model="product.nama"
                        type="text"
                        class="input input-bordered"
                        placeholder="Masukkan nama produk"
                    />
                </div>

                <div class="form-control">
                    <label class="text-sm font-medium">Harga</label>
                    <input
                        v-model="product.harga"
                        type="number"
                        class="input input-bordered"
                        placeholder="Masukkan harga produk"
                    />
                </div>

                <div class="form-control">
                    <label class="text-sm font-medium">Jumlah</label>
                    <input
                        v-model="product.jumlah"
                        type="number"
                        class="input input-bordered"
                        placeholder="Masukkan jumlah produk"
                    />
                </div>

                <div class="form-control">
                    <label class="before: text-sm font-medium">Keterangan</label>
                    <textarea
                        v-model="product.keterangan"
                        class="textarea textarea-bordered"
                        placeholder="Masukkan keterangan produk"
                    ></textarea>
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
import { Pen } from "lucide-vue-next";
import type { Products } from "@prisma/client";
defineProps<{
    product: Products;
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
