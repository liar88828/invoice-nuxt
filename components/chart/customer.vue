<template>
    <div>
        <Bar :data="chartData" :options="chartOptions"/>
    </div>
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import type { ResponseChartType } from "~/interface/chart";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps<{ data: ResponseChartType[] }>()


// Compute the chart data reactively
const chartData = computed(() => ({
    labels: props.data.map(item => item.title),
    datasets: [
        {
            label: 'Users per City',
            backgroundColor: '#42A5F5',
            data: props.data.map(item => item.count),
        },
    ],
}));

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
};
</script>

<style scoped>
div {
    width: 100%;
    max-width: 600px;
    height: 400px;
}
</style>
