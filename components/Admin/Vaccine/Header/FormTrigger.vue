<script setup lang="ts">

defineEmits(['open'])

</script>

<template>
  <UiButton @click="$emit('open')">Add Vaccine</UiButton>
</template>
