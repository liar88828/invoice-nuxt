<template>
    <div>
        <Bar :data="chartData" :options="chartOptions"/>
    </div>
</template>

<script>
import {defineComponent} from 'vue';
import {Bar} from 'vue-chartjs';
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default defineComponent({
    name      : 'productChart',
    components: {Bar},
    data() {
        return {
            chartData   : {
                labels  : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label          : 'Monthly Sales',
                        backgroundColor: '#42A5F5',
                        data           : [40, 20, 80, 81, 56, 55, 40],
                    },
                ],
            },
            chartOptions: {
                responsive         : true,
                maintainAspectRatio: false,
            },
        };
    },
});
</script>

