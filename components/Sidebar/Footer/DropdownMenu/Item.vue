<script setup lang="ts">

defineProps({
  title: String,
  icon: String
})

</script>

<template>
  <UiDropdownMenuItem class="cursor-pointer" :icon="icon" :title="title"/>
</template>

<style scoped>

</style>