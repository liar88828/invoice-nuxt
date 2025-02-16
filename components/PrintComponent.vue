<script setup lang="ts">
import { useVueToPrint } from "vue-to-print";
import { ref } from "vue";

const componentRef = ref();
const { handlePrint } = useVueToPrint({
    content: componentRef,
    documentTitle: "AwesomeFileName",
});
</script>

<template>
    <button @click="handlePrint" class="btn btn-info mb-2">Print</button>
    <div ref="componentRef">
        <slot/>
    </div>
</template>