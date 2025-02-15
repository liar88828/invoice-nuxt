import type { ProductSchemaType } from "~/schema/product";
import type { Products } from ".prisma/client";

export const useProduct = () => {

// Product form
    const product = ref<ProductSchemaType>({
        nama: "",
        keterangan: "",
        harga: 0,
        jumlah: 0,
    });

// Product list
    const onGet = async (search: Ref<string, string>) => {
        return useFetch("/api/product", {
            key: "product_list",
            params: { search: search },
            watch: [ search ],
            transform: ({ data }) => {
                if (data) {
                    return data.map((item):Products => ({
                        id: item.id,
                        nama: item.nama,
                        keterangan: item.keterangan,
                        harga: item.harga || 0,
                        jumlah: item.jumlah || 0,
                    }));
                }
                if (!data) {
                    return null;
                }
            },
        });
    }

    const createData = async (product: ProductSchemaType) => {
        return await $fetch("/api/product", {
            body: product,
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
                    await refreshNuxtData("product_list");
                } else {
                    useNuxtApp().$toast.error(message);
                }
            },
        });
    };

    const updateData = async (product: Products) => {
        return await $fetch("/api/product/:id", {
            body: product,
            params: { id: product.id },
            method: "put",
            onResponse: async ({ response }) => {
                const json = await response;
                const message = json._data.message;
                if (response.ok) {
                    useNuxtApp().$toast.success(message);
                    await refreshNuxtData("product_list");
                } else {
                    useNuxtApp().$toast.error(message);
                }
            },
        });
    };

    const onDelete = async (id: number) => {
        return await $fetch("/api/product/:id", {
            params: { id },
            method: "delete",
            onResponse: async ({ response }) => {
                const json = await response;
                const message = json._data.message;
                if (response.ok) {
                    useNuxtApp().$toast.success(message);
                    await refreshNuxtData("product_list");
                } else {
                    useNuxtApp().$toast.error(message);
                }
            },
        });
    };

    // Handle form submission
    const onCreate = async () => {
        if (!product.value.nama) {
            alert("Nama produk harus diisi!");
            return;
        }

        await createData(product.value);
        // reset
        product.value = {
            nama: "",
            keterangan: "",
            harga: 0,
            jumlah: 0,
        }

        // Object.assign(product, initialProductForm)
    };

// Handle form submission
    const onUpdate = async (product: Products) => {
        if (!product.nama) {
            alert("Nama produk harus diisi!");
            return;
        }

        await updateData(product);
    };
    return {
        onCreate, onUpdate,
        onDelete
        , onGet,
        productRef: product,
    }
}