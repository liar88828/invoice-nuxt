<template>
    <div class=" flex gap-6">
        <div class="join">
            <button class="join-item btn btn-outline " @click="$emit('update:page', page - 1)">«</button>
            <button class="join-item btn btn-outline">Page {{ page }}</button>
            <button class="join-item btn btn-outline" @click="$emit('update:page', page + 1)">»</button>
        </div>
        <select
            :value="limit"
            @change="handleLimitChange"
            class="select select-bordered w-full max-w-xs"
        >
            <option disabled selected>Who shot first?</option>
            <option>10</option>
            <option>100</option>
            <option>1000</option>
        </select>
    </div>
</template>
<script setup lang="ts">

defineProps<{ limit: number, page: number }>();
const emit = defineEmits([ "update:page", "update:limit" ]);
const handleLimitChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    emit("update:limit", Number(target.value));
};
</script>