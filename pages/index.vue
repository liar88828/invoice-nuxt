<template>
    <div class="grid grid-cols-2 gap-5">
<!--        <div class="">-->
<!--            <Loading v-if="!dataProduct||statusProduct==='pending'"/>-->
<!--            <ChartProduct v-else-if="dataProduct" :data="dataProduct"/>-->
<!--        </div>-->

        <div class="">
            <!--    -->
            <Loading v-if="!dataProductInvoiceTotalCount||statusProductInvoiceTotalCount==='pending'"/>
            <ChartProductInvoiceTotalCount v-else-if="dataProductInvoiceTotalCount"
                                           :data="dataProductInvoiceTotalCount"/>
        </div>

        <div class="">

            <!--    -->
            <Loading v-if="!dataCustomer||statusCustomer==='pending'"/>
            <ChartCustomer v-else-if="dataCustomer" :data="dataCustomer"/>
        </div>

    </div>

    <div class="mt-5">
        <!--    -->
        <Loading v-if="!dataInvoice||statusInvoice==='pending'"/>
        <ChartInvoice v-else-if="dataInvoice" :data="dataInvoice"/>
    </div>
</template>

<script lang="ts" setup>

import type { ResponseChartType } from "~/interface/chart";
import Loading from "~/components/page/loading.vue";

const { data: dataCustomer, status: statusCustomer } = await useFetch('/api/chart/customer', {
    transform: (response) => {
        // console.log(response);
        if (response) {
            return response.map((item): ResponseChartType => ({
                count: item.count,
                title: item.title
            }));
        }
        return []
    }
})

// const { data: dataProduct, status: statusProduct } = await useFetch('/api/chart/product', {
//     transform: (response) => {
//         // console.log(response);
//         if (response) {
//             return response.map((item): ResponseChartType => ({
//                 count: item.count,
//                 title: item.title
//             }));
//         }
//         return []
//     }
// })

const { data: dataInvoice, status: statusInvoice } = await useFetch('/api/chart/invoice', {
    transform: (response) => {
        if (response) {
            return response.map((item): ResponseChartType => ({
                count: item.count,
                title: item.title
            }));
        }
        return []
    }
})

const {
    data: dataProductInvoiceTotalCount,
    status: statusProductInvoiceTotalCount
} = await useFetch('/api/chart/product-invoice-total-count', {
    transform: (response) => {
        if (response) {
            return response.map((item): ResponseChartType => ({
                count: item.count,
                title: item.title
            }));
        }
        return []
    }
})
</script>

<style></style>
