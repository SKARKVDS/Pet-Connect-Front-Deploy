<script setup lang="ts">

defineEmits(['open'])

</script>

<template>
  <UiButton variant="destructive" @click="$emit('open')">Report</UiButton>
</template>
