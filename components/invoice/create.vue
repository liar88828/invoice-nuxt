<template>
    <!--    <div class="flex items-center bg-red-200" >-->
    <div class="card card-body">

        <h3 class="text-lg font-bold mb-5">Please Add A New Invoice</h3>
        <form @submit.prevent="onSubmit" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">

                <div class="form-control">
                    <label class="text-sm font-medium">tanggal_invoice</label>
                    <input
                        v-model="invoiceRef.tanggal_invoice"
                        type="datetime-local"
                        class="input input-bordered"
                        placeholder="Masukkan nama tanggal invoice"
                    />
                </div>

                <div class="form-control">
                    <label class="text-sm font-medium">Ongkir</label>
                    <input
                        v-model="invoiceRef.ongkir"
                        type="number"
                        class="input input-bordered"
                        placeholder="Masukkan alamat Ongkir"
                    />
                </div>

                <div class="form-control">
                    <label class="text-sm font-medium">Discount</label>
                    <input
                        v-model="invoiceRef.discount"
                        type="number"
                        class="input input-bordered"
                        placeholder="Masukkan kota Discount"
                    />
                </div>

                <div class="form-control">
                    <label class=" text-sm font-medium">Total</label>
                    <input
                        v-model="invoiceRef.total"
                        class="input input-bordered"
                        type="number"
                        placeholder="Masukkan telephone Total"
                    />
                </div>


                <div class="form-control">
                    <label class=" text-sm font-medium">Status</label>
                    <select
                        v-model="invoiceRef.status"
                        class="select select-bordered"
                    >
                        <option value="Pending">Pending</option>
                        <option value="Selesai">Selesai</option>
                        <option value="Dibatalkan">Dibatalkan</option>
                    </select>
                </div>


                <div class="form-control">
                    <label class="text-sm font-medium">Note</label>
                    <textarea
                        v-model="invoiceRef.notes"
                        class="textarea input-bordered"
                        placeholder="Masukkan telephone Note"
                    ></textarea>
                </div>

            </div>
            <InvoiceModalButtonCustomer :customers="customers"/>
            <h1 class="text-error text-xl" v-if="!customers">Please Select</h1>
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
                <tr class="hover:bg-base-200/90">
                    <td class="">
                        <button
                            @click="()=>customers=null"
                            class="btn btn-error btn-square">
                            <X/>
                        </button>
                    </td>
                    <td class="">{{ customers.nama }}</td>
                    <td class="">{{ customers.tlp }}</td>
                    <td class="">{{ customers.alamat }}</td>
                    <td class="">{{ customers.kota }}</td>

                </tr>
                </tbody>
            </table>

            <InvoiceModalButtonProduct :customers="customers"/>

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
                <tr v-for="(item, index) in products" :key="index" class="hover:bg-base-200/90">
                    <td class="">
                        <div class="modal-action">
                            <form method="dialog">
                                <button
                                    @click="()=>{
                                            products.splice(index,1);
                                        }"
                                    class="btn btn-error btn-square">
                                    <X/>
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

            <button
                    type="submit"
                    class="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
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
        <!--        </div>-->
    </div>
    <InvoiceModalSearchCustomer :onSelect="onSelect"/>
    <InvoiceModalSearchProduct :onSelect="onSelectProduct"/>

</template>

<script lang="ts" setup>
import { useInvoice } from "~/composables/invoice";
import { X } from "lucide-vue-next";
import type { Customers, Products } from ".prisma/client";

const customers = ref<Customers | null>(null);
const products = ref<Products[]>([]);

const { onCreate, invoiceRef } = useInvoice()
const onSubmit = async () => {
    console.log('test');
    if (!customers.value) {
        alert("Customer Not Found!");
        return;
    }
    if (products.value.length === 0) {
        alert("Product Not Found!");
        return;
    }
    invoiceRef.value.productId = products.value.map(item => item.id)
    invoiceRef.value.customersId = customers.value.id
    await onCreate()
}

const onSelect = (item: Customers) => {
    customers.value = item
}

const onSelectProduct = (item: Products) => {
    products.value.push(item)
}
</script>

<style></style>
