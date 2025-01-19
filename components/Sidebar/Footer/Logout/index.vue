<script setup lang="ts">

const open = defineModel<Boolean>('open')

</script>

<template>
  <UiDropdownMenuItem @click="open = true" class="cursor-pointer" icon="lucide:log-out" title="Log out"/>
</template>

<style scoped>

</style>