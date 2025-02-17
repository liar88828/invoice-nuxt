import type { CustomerSchemaType } from "~/schema/customer";
import type { Customers } from ".prisma/client";

export const useCustomer = () => {

    // Product form
    const customerRef = ref<CustomerSchemaType>({
        nama: "",
        alamat: "",
        kota: "",
        tlp: "",
    });


    const onSearch = async (search: Ref<string,string>) => {
        return useFetch("/api/customer/search", {
                params: { search } ,
                watch: [ search ],
                key: `customer_list${search.value}`,
                transform: ({ data }) => {
                    if (data) {
                        return data.map(
                            (item): Customers => ({
                                id: item.id,
                                nama: item.nama,
                                alamat: item.alamat,
                                kota: item.kota,
                                tlp: item.tlp,
                            })
                        );
                    }
                    if (!data) {
                        return null;
                    }
                }
            }
        )
    }


    const onGet = async <T>(option: Ref<T>) => {
        return useFetch("/api/customer", {
            params: option,
            watch: [ option ],
            key: `customer_list`,
                transform: ({ data }) => {
                    if (data) {
                        return data.map(
                            (item): Customers => ({
                                id: item.id,
                                nama: item.nama,
                                alamat: item.alamat,
                                kota: item.kota,
                                tlp: item.tlp,
                            })
                        );
                    }
                    if (!data) {
                        return null;
                    }
                }
            }
        )
    }





    const createData = async (customer: CustomerSchemaType) => {
        return await $fetch("/api/customer", {
            body: customer,
            method: "post",
            onRequest: ({ request }) => {
                console.log(request);
            },
            onResponse: async ({ response }) => {
                const json = await response;
                const message = json._data.message;
                // console.log(response);
                if (response.ok) {
                    useNuxtApp().$toast.success(message);
                    await refreshNuxtData("customer_list");
                } else {
                    useNuxtApp().$toast.error(message);
                }
            },
        });
    };

    const updateData = async (customer: Customers) => {
        return await $fetch("/api/customer/:id", {
            body: customer,
            params: { id: customer.id },
            method: "put",
            onResponse: async ({ response }) => {
                const json = await response;
                const message = json._data.message;
                if (response.ok) {
                    useNuxtApp().$toast.success(message);
                    await refreshNuxtData("customer_list");
                } else {
                    useNuxtApp().$toast.error(message);
                }
            },
        });
    };

    const onDelete = async (id: number) => {
        return await $fetch("/api/customer/:id", {
            params: { id },
            method: "delete",
            onResponse: async ({ response }) => {
                const json = await response;
                const message = json._data.message;
                if (response.ok) {
                    useNuxtApp().$toast.success(message);
                    await refreshNuxtData("customer_list");
                } else {
                    useNuxtApp().$toast.error(message);
                }
            },
        });
    };

// Handle form submission
    const onCreate = async () => {
        if (!customerRef.value.nama) {
            alert("data harus diisi!");
            return;
        }

        await createData(customerRef.value);
        // reset
        customerRef.value = {
            nama: "",
            alamat: "",
            kota: "",
            tlp: "",
        };

        // Object.assign(product, initialProductForm)
    };

// Handle form submission
    const onUpdate = async (customer: Customers) => {
        if (!customer.nama) {
            alert("data harus diisi!");
            return;
        }

        await updateData(customer);
    };

    const getCity = async  <T>(option: Ref<T>) => {
        return useFetch("/api/customer/city", {
            params: option,
            watch: [ option ],
            transform: ({ data }): { kota: string }[] => {
                if (data) {
                    return data.map(item => ({ kota: item.kota }));
                }
                return []
            }
        });
    }
    return {
        onUpdate, onCreate, onDelete, onGet, customerRef, getCity,onSearch
    }
}