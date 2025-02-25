<template >
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


            </div>
            <InvoiceCustomerModalButton/>
            <InvoiceCustomerTableSelect :customersProps="customers"/>

            <InvoiceProductModalButton/>
            <InvoiceProductTableSelect :productsProps="products"/>

            <div class="grid grid-cols-1 sm:grid-cols-2  gap-5">


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
                        max="100"
                        class="input input-bordered"
                        placeholder="Masukkan kota Discount"
                    />
                </div>
                <div class="">
                    <h1 class="text-lg font-bold">
                        Total All Product : {{ total.totalProducts }}
                    </h1>
                    <h1 class="text-lg font-bold">
                        Total All Product With Ongkir : {{ total.totalProductOngkir }}
                    </h1>
                    <h1 class="text-lg font-bold">
                        Total : {{ total.totalAfterDiscount }}
                    </h1>
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

            <button type="submit" class="btn btn-info btn-block">
                Simpan
            </button>
        </form>
    </div>
    <InvoiceCustomerModalSearch :onSelect="onSelectCustomer"/>
    <InvoiceProductModalSearch :onSelect="onSelectProduct"/>

</template>

<script lang="ts" setup>
import { useInvoice } from "~/composables/invoice";
import type { Customers, Products } from "@prisma/client";

const customers = ref<Customers[]>([]);
const products = ref<Products[]>([]);

const { onCreate, invoiceRef } = useInvoice()
const onSubmit = async () => {
    if (!customers.value) {
        alert("Customer Not Found!");
        return;
    }
    if (products.value.length === 0) {
        alert("Product Not Found!");
        return;
    }
    invoiceRef.value.productId = products.value.map(item => ({
        id: item.id,
        qty: item.jumlah
    }))
    invoiceRef.value.customerId = customers.value[0].id
    await onCreate()
    invoiceRef.value = {
        tanggal_invoice: new Date,
        ongkir: 0,
        discount: 0,
        total: 0,
        notes: "",
        status: "",
        uang_muka: 0,
        productId: [],
        customerId: 0
    };

    customers.value.splice(0);
    products.value.splice(0);
}
const onSelectCustomer = (item: Customers) => {
    customers.value[0] = item
}

const onSelectProduct = (item: Products) => {
    products.value.push(item)
}

const total = computed(() => {
    const totalProducts = products.value.reduce((a, b) => a + b.jumlah * b.harga, 0);
    const totalProductOngkir = totalProducts + invoiceRef.value.ongkir;
    const discountAmount = (invoiceRef.value.discount / 100) * totalProductOngkir; // Calculate discount
    const totalAfterDiscount = totalProductOngkir - discountAmount; // Apply discount
    invoiceRef.value.total = totalAfterDiscount
    return {
        totalProducts,
        totalProductOngkir,
        totalAfterDiscount,
    }
});

</script>
