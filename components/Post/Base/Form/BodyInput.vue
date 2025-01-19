<script setup lang="ts">

defineProps<{initialValue?: string}>()

</script>

<template>
  <UiVeeTextarea :model-value="initialValue" label="body" placeholder="Enter the post body" name="body" required />
</template>

<style scoped>

</style>