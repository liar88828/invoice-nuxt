<template>
  <div class="h-screen m-2 gap-2 flex flex-col">
    <AppHeader />
    <div class="flex gap-2">
      <Sidebar />
      <slot />
    </div>
    <AppFooter />
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
