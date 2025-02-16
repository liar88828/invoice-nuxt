<template>
    <div class="card  card-compact sm:card-normal 	">
        <div class="card-body">
            <h3 class="card-title">Update Invoice {{ invoiceProps.id }}</h3>
            <form @submit.prevent="onSubmit" class="space-y-6   ">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
                    <div class="form-control  ">
                        <label class="text-sm font-medium">tanggal_invoice</label>
                    <input
                        v-model="invoiceProps.tanggal_invoice"
                        type="datetime-local"
                        class="input input-bordered"
                        placeholder="Masukkan nama tanggal invoice"
                    />
                    </div>

                    <div class="form-control">
                        <label class="text-sm font-medium">Ongkir</label>
                    <input
                        v-model="invoiceProps.ongkir"
                        type="number"
                        class="input input-bordered"
                        placeholder="Masukkan alamat Ongkir"
                    />
                    </div>

                    <div class="form-control">
                        <label class="text-sm font-medium">Discount</label>
                    <input
                        v-model="invoiceProps.discount"
                        type="number"
                        class="input input-bordered"
                        placeholder="Masukkan kota Discount"
                    />
                    </div>

                    <div class="form-control">
                        <label class=" text-sm font-medium">Total</label>
                    <input
                        v-model="invoiceProps.total"
                        class="input input-bordered"
                        type="number"
                        placeholder="Masukkan telephone Total"
                    />
                    </div>


                    <div class="form-control">
                        <label class=" text-sm font-medium">Status</label>
                        <select
                            v-model="invoiceProps.status"
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
                            v-model="invoiceProps.notes"
                            class="textarea input-bordered"
                            placeholder="Masukkan telephone Note"
                        ></textarea>
                    </div>
                </div>
                <div class="grid grid-cols-1 gap-6">
                    <InvoiceCustomerModalButton/>
                    <InvoiceCustomerTableSelect :customersProps="customersProps"/>
                    <InvoiceProductModalButton/>
                    <InvoiceProductTableSelect :productsProps="productsProps"/>
                </div>

                <button
                    type="submit"
                    class="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Simpan
                </button>
            </form>
        </div>
    </div>
    <InvoiceCustomerModalSearch :onSelect="onSelectCustomer"/>
    <InvoiceProductModalSearch :onSelect="onSelectProduct"/>
</template>

<script lang="ts" setup>
import { useInvoice } from "~/composables/invoice";
import type { Customers, Products } from ".prisma/client";
import type { InvoiceResponse } from "~/schema/invoice";

const { onUpdate } = useInvoice()

const { productsProps, customersProps, invoiceProps } = defineProps<InvoiceResponse>()

// const customers = ref<Customers|null>(customersProps);
// const products = ref<Products[]>(productsProps);
// const invoices = ref<InvoiceSchemaType>(invoiceProps);

const onSubmit = async () => {
    // console.log(invoiceProps,
    //     customersProps,
    //     productsProps)
    await onUpdate(invoiceProps, customersProps[0], productsProps)
}

const onSelectCustomer = (item: Customers) => {
    customersProps[0] = item; // Safe assignment
};

const onSelectProduct = (item: Products) => {
    productsProps.push(item)
}
</script>

