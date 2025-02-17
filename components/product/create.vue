<template>
    <!-- Open the modal using ID.showModal() method -->
    <button class="btn btn-info btn-square" onclick="modal_product.showModal()">
        <Plus />
    </button>
    <dialog id="modal_product" class="modal">
        <div class="modal-box">
            <h3 class="text-lg font-bold">Please Add A New Product</h3>
            <!-- Form -->
            <form @submit.prevent="onCreate" class="space-y-4">
                <div class="form-control">
                    <label class="text-sm font-medium">Nama Produk</label>
                    <input
                        v-model="productRef.nama"
                        type="text"
                        class="input input-bordered"
                        placeholder="Masukkan nama produk"
                    />
                </div>

                <div class="form-control">
                    <label class="text-sm font-medium">Harga</label>
                    <input
                        v-model="productRef.harga"
                        type="number"
                        class="input input-bordered"
                        placeholder="Masukkan harga produk"
                    />
                </div>

                <div class="form-control">
                    <label class="text-sm font-medium">Jumlah</label>
                    <input
                        v-model="productRef.jumlah"
                        type="number"
                        class="input input-bordered"
                        placeholder="Masukkan jumlah produk"
                    />
                </div>

                <div class="form-control">
                    <label class="before: text-sm font-medium">Keterangan</label>
                    <textarea
                        v-model="productRef.keterangan"
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
import type { ProductSchemaType } from "~/schema/product";
import { Plus } from "lucide-vue-next";
import { useProduct } from "~/composables/product";

 const {onCreate,productRef}=useProduct()
</script>

<style></style>
