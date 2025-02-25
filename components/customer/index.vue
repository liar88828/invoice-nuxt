<template>
    <div class=" card card-body bg-base-200">
        <h2 class="card-title">Menu Customer</h2>
        <div class="flex justify-between flex-wrap">
            <div class="join">
                <input type="search"
                       v-model="option.search" class="input input-bordered join-item"
                       placeholder="Search Customer"
                >
                <button class="btn btn-info join-item">
                    <IconSearch/>
                </button>
            </div>

            <select
                v-model="option.city" class="select w-full max-w-xs">
                <option selected>City</option>
                <option v-for="(itemCity,index) in cityData" :key="index">{{ itemCity.kota }}</option>
            </select>
            <select v-model="option.name" class="select w-full max-w-xs">
                <option disabled selected>Name</option>
                <option>Default</option>
                <option>A-Z</option>
                <option>Z-A</option>
            </select>
            <CustomerCreate/>
        </div>
        <PageLoading v-if="!data || status === 'pending'"/>
        <PageError v-else-if="!data"/>
        <CustomerTable v-else :customers="data" />
        <Pagination
            :page="option.page"
            :limit="option.limit"
            @update:page="option.page = $event"
            @update:limit="option.limit=$event"
        />
    </div>

</template>
<!--{{ // cityData.data.value?.map(itemCity => itemCity.kota) }}-->

<script lang="ts" setup>
import { useCustomer } from "~/composables/customer";
import Pagination from "~/components/Pagination.vue";

const { onGet, getCity } = useCustomer()

const option = ref({
    search: "", page: 1, limit: 10, city: "City", name: "Name"
})

const optionDebounce = useDebounceObject(option, 500)
const { status, data } = await onGet(optionDebounce)
const { data: cityData } = await getCity(optionDebounce)
// console.log(cityData.data.value?.map(item=>item.kota))
</script>

