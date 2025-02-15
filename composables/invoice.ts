import type { InvoiceProductCustomer, InvoiceSchemaType } from "~/schema/invoice";

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
        customersId: 0
    });


    const createData = async (invoice: InvoiceSchemaType) => {
        return await $fetch("/api/invoice", {
            body: invoice,
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
    };

    const updateData = async (invoice: InvoiceSchemaType) => {
        return await $fetch("/api/invoice/:id", {
            body: invoice,
            params: { id: invoice.id },
            method: "put",
            onResponse: async ({ response }) => {
                const json = response;
                const message = json._data.message;
                if (response.ok) {
                    useNuxtApp().$toast.success(message);
                    await refreshNuxtData("invoice_list");
                } else {
                    console.log(json);
                    useNuxtApp().$toast.error(message);
                }
            },
        });
    };

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
        console.log(invoiceRef.value)
        await createData(invoiceRef.value);
        // reset
        invoiceRef.value = {
            tanggal_invoice: new Date,
            ongkir: 0,
            discount: 0,
            total: 0,
            notes: "",
            status: "",
            uang_muka: 0,
            productId: [],
            customersId: 0
        };

        // Object.assign(product, initialProductForm)
    };

// Handle form submission
    const onUpdate = async (invoice: InvoiceProductCustomer) => {
        if (!invoiceRef.value.notes) {
            alert("data harus diisi!");
            return;
        }
        const data: InvoiceSchemaType = {
            ...invoice,
            tanggal_invoice: invoice.tanggal_invoice,
            customersId: invoice.Invoice_customers.id,
            productId: invoice.Invoice_products.map(item => item.id)
        }

        await updateData(data);
    };

    const onGet = async () => {
        return useFetch("/api/invoice", {
                key: "invoice_list",
                transform: ({ data }) => {
                    console.log(data)

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

    return {
        onUpdate, onCreate, onDelete, onGet, invoiceRef
    }
}