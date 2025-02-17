export function useDebounceObject<T>(value: Ref<T>, delay: number = 1000): Ref<T> {
    const debouncedValue = ref(JSON.parse(JSON.stringify(value.value))) as Ref<T>;
    let timeout: ReturnType<typeof setTimeout>;

    watch(value, (newValue) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            debouncedValue.value = JSON.parse(JSON.stringify(newValue));
        }, delay);
    }, { deep: true }); // Memantau perubahan dalam objek

    return debouncedValue;
}
