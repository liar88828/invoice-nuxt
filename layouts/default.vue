<template>
    <div class="m-2 gap-2 flex flex-col ">
        <AppHeader/>
        <div class="flex-none gap-2 h-screen sm:flex">
            <Sidebar/>
                <div class="pb-20 w-full">
                    <slot/>
                </div>
            <BottomNavigator/>
        </div>
        <!--        <AppFooter/>-->
    </div>
</template>

<script lang="ts" setup>
</script>

<style></style>
