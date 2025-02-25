import type { Customers, Products } from "@prisma/client";
import type {
    InvoiceProductCustomer,
    InvoiceResponse,
    InvoiceSchemaType,
    InvoiceSchemaUpdateType
} from "~/schema/invoice";

export const useInvoice = () => {
    const invoiceRef = ref<InvoiceSchemaType>({
        tanggal_invoice: new Date()//.toISOString().split("T")[0]
        , ongkir: 0,
        discount: 0,
        total: 0,
        notes: "",
        status: "Pending", // Default
        uang_muka: 0,
        productId: [],
        customerId: 0
    });

    const onDelete = async (id: number) => {
        return await $fetch("/api/invoice/:id", {
            params: { id },
            method: "delete",
            onResponse: async ({ response }) => {
                const json = await response;
                const message = json._data.message;
                if (response.ok) {
                    useNuxtApp().$toast.success(message);
                    await refreshNuxtData("invoice_list");
                } else {
                    useNuxtApp().$toast.error(message);
                }
            },
        });
    };

// Handle form submission
    const onCreate = async () => {
        if (!invoiceRef.value.notes) {
            alert("data harus diisi!");
            return;
        }

        return await $fetch("/api/invoice", {
            body: invoiceRef.value,
            method: "post",
            onRequest: ({ request }) => {
                console.log(request);
            },
            onResponse: async ({ response,error }) => {
                const json = response;
                const message = json._data.message;
                // console.log(response);
                if (response.ok) {
                    useNuxtApp().$toast.success(message);
                    await refreshNuxtData("invoice_list");
                } else {
                    console.log(error);
                    console.log(json);
                    useNuxtApp().$toast.error(message);
                }
            },
        });

        // Object.assign(product, initialProductForm)
    };

// Handle form submission
    const onUpdate = async (
        invoices: InvoiceSchemaType,
        customers: Customers,
        products: Products[]
    ) => {
        if (!invoices.notes) {
            alert("data harus diisi!");
            return;
        }

        if (!customers) {
            alert("Customer Not Found!");
            return;
        }
        if (products.length === 0) {
            alert("Product Not Found!");
            return;
        }
        console.log(invoices);
        const data: InvoiceSchemaUpdateType = {
            ...invoices,
            tanggal_invoice: invoices.tanggal_invoice,
            // customerIdOld: invoices.customerId,
            customerId: customers.id,
            // productIdOld: invoices.productId,
            productId: products.map(item => ({
                id: item.id,
                qty: item.jumlah
            })),

        }

        return await $fetch("/api/invoice/:id", {
            body: data,
            params: { id: data.id },
            method: "put",
            onResponse: async ({ response }) => {
                console.log(response);
                const message = response._data.message;
                if (response.ok) {
                    useNuxtApp().$toast.success(message);
                    await refreshNuxtData("invoice_list");
                } else {
                    useNuxtApp().$toast.error(message);
                }
            },
        });
    };

    const onGet = async <T>(option: Ref<T>) => {
        return useFetch("/api/invoice", {
                key: "invoice_list",
            params: option,
            watch: [ option ],
                transform: ({ data }) => {
                    // console.log(data)

                    if (data) {
                        return data.map((item): InvoiceProductCustomer => ({
                                id: item.id,
                                tanggal_invoice: new Date(item.tanggal_invoice),
                                ongkir: item.ongkir,
                                discount: item.discount,
                                total: item.total,
                                notes: item.notes,
                                status: item.status,
                                uang_muka: item.uang_muka,
                            createdAt: new Date(item.createdAt),
                                Invoice_products: item.Invoice_products,
                                Invoice_customers: item.Invoice_customers
                            })
                        )
                    }
                    if (!data) {
                        return null;
                    }
                }
            }
        )
    }
    const onGetById = async () => {

        const route = useRoute()
        return useFetch('/api/invoice/:id/',
            {
                query: { id: route.params.id },
                transform: ({ data }): InvoiceResponse => {
                    if (!data) {
                        throw new Error('Invoice not found');
                    }
                    const { Invoice_customers, Invoice_products, ...invoice } = data
                    if (!Invoice_customers) {
                        throw new Error('Invoice_customers not found');
                    }
                    if (!Invoice_products) {
                        throw new Error('Invoice_products not found');
                    }
                    const { customersId, id, ...customer } = Invoice_customers
                    return {
                        invoiceProps: {
                            ...invoice,
                            customerId: id,
                            productId: Invoice_products.map((item) => ({
                                id: item.id,
                                qty: item.jumlah
                            })),
                            // @ts-expect-error
                            tanggal_invoice: toDateForm(invoice.tanggal_invoice)
                        },
                        customersProps: [ { id: customersId, ...customer } ],
                        productsProps: Invoice_products.map(item => ({
                            ...item,
                            id: item.productsId
                        })),
                    }
                }
            })
    }
    return {
        onUpdate, onCreate, onDelete, onGet, invoiceRef,onGetById
    }
}