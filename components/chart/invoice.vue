<template>
    <div>
        <Line :data="chartData" :options="chartOptions"/>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from 'chart.js';
import type { ResponseChartType } from "~/interface/chart";

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

const props = defineProps<{ data: ResponseChartType[] }>();

// Compute chart data reactively
const chartData = computed(() => ({
    labels: props.data.map(item => item.title), // Display weeks
    datasets: [
        {
            label: 'Total Invoice per Week',
            borderColor: '#42A5F5',
            backgroundColor: 'rgba(66, 165, 245, 0.2)',
            data: props.data.map(item => item.count),
            fill: true,
        },
    ],
}));

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: true
        }
    }
};
</script>

<style scoped>
div {
    width: 100%;
    height: 400px;
}
</style>
