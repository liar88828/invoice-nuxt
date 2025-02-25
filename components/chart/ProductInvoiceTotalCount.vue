<template>
    <div>
        <Pie :data="chartData" :options="chartOptions"/>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Pie } from 'vue-chartjs';
import { ArcElement, CategoryScale, Chart as ChartJS, Legend, Title, Tooltip } from 'chart.js';
import type { ResponseChartType } from "~/interface/chart.js";
import { faker } from '@faker-js/faker';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

// Props to receive data
const props = defineProps<{ data: ResponseChartType[] }>();

const chartData = ref({
    labels: props.data.map(item => item.title),
    datasets: [ {
        label: 'Product Quantity',
        // backgroundColor: [ '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF' ],
        backgroundColor: props.data.map(() => faker.color.rgb({ format: 'hex', casing: 'upper' })),
        data: props.data.map(item => item.count),
    } ]
});

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
};

// Watch for data changes
// watch(() => props.data, (newData) => {
//     chartData.value.labels = newData.map(item => item.title);
//     chartData.value.datasets[0].data = newData.map(item => item.count);
// }, { immediate: true });
</script>

<style scoped>
div {
    width: 100%;
    max-width: 500px;
    height: 400px;
}
</style>
