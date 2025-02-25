<template>
    <!-- Open the modal using ID.showModal() method -->
    <button class="btn btn-info btn-square" onclick="modal_customer.showModal()">
        <IconPlus />
    </button>
    <dialog id="modal_customer" class="modal">
        <div class="modal-box">
            <h3 class="text-lg font-bold mb-5">Please Add A New Customer</h3>
            <!-- Form -->
            <form @submit.prevent="onCreate" class="space-y-4">
                <div class="form-control">
                    <label class="text-sm font-medium">Nama Produk</label>
                    <input
                        v-model="customerRef.nama"
                        type="text"
                        class="input input-bordered"
                        placeholder="Masukkan nama customer"
                    />
                </div>

                <div class="form-control">
                    <label class="text-sm font-medium">alamat</label>
                    <input
                        v-model="customerRef.alamat"
                        type="text"
                        class="input input-bordered"
                        placeholder="Masukkan alamat customer"
                    />
                </div>

                <div class="form-control">
                    <label class="text-sm font-medium">kota</label>
                    <input
                        v-model="customerRef.kota"
                        type="text"
                        class="input input-bordered"
                        placeholder="Masukkan kota customer"
                    />
                </div>

                <div class="form-control">
                    <label class="before: text-sm font-medium">tlp</label>
                    <input
                        v-model="customerRef.tlp"
                        class="input input-bordered"
                        type="tel"
                        placeholder="Masukkan telephone customer"
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
import { useCustomer } from "~/composables/customer";
const {onCreate,customerRef}=useCustomer()
</script>

<style></style>
