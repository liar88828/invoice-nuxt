
<template>
    <div class=" mx-auto card card-body bg-base-200">
        <h2 class="card-title">Menu Produk</h2>
        <div class="flex justify-between flex-wrap">
            <div class="join">
                <input type="search"
                       v-model="option.search" class="input input-bordered join-item"
                       placeholder="Search Product"
                >
                <button class="btn btn-info join-item">
                    <IconSearch/>
                </button>
            </div>

            <select v-model="option.price" class="select w-full max-w-xs">
                <option disabled selected>Price</option>
                <option>Default</option>
                <option>Low</option>
                <option>High</option>
            </select>

            <select v-model="option.name" class="select w-full max-w-xs">
                <option disabled selected>Name</option>
                <option>Default</option>
                <option>A-Z</option>
                <option>Z-A</option>
            </select>
            <ProductCreate/>
        </div>
        <PageLoading v-if="!data || status === 'pending'"/>
        <PageError v-else-if="!data"/>
        <ProductTable v-else :products="data"/>
        <Pagination
            :page="page"
            :limit="limit"
            @update:page="page = $event"
            @update:limit="limit=$event"
        />
    </div>

</template>

<script lang="ts" setup>
import { ProductCreate } from "#components";
import { useProduct } from "~/composables/product";
import Pagination from "~/components/Pagination.vue";

// const myData = {
//     currentPage: 1,
//     pageSize: 10,
//     totalCount: 2002,
//     totalPages: 201,
// }
const option = reactive({
    search: "", page: 1, limit: 10, price: "Default", name: "Default"
})
const { search, page, limit, price, name } = toRefs(option)
const searchDebounce = useDebounce(search, 1000)
const pageDebounce = useDebounce(page, 200)
const limitDebounce = useDebounce(limit, 200)
const nameDebounce = useDebounce(name, 200)
const priceDebounce = useDebounce(price, 200)
const combined = computed(() => ({
    search: searchDebounce.value,
    page: pageDebounce.value,
    limit: limitDebounce.value,
    name: nameDebounce.value,
    price: priceDebounce.value
}))

const { onGet } = useProduct()
const { data, status } = await onGet(combined)
</script>

<style></style>
