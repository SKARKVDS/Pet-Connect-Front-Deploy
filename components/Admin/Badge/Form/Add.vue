<script setup lang="ts">
  import { useBadgeStore } from "~/stores/badge";

  const emits = defineEmits(['close'])

  const badgeStore = useBadgeStore()

  const onSubmit = async (values: any) => {
    const result = await badgeStore.dispatchAdd(values)
    if (result.success) {
      useSonner.success("The badge has been added!")
      emits('close')
    } else {
      useSonner.error("Unable to add the badge... please try again later.")
    }
  }


</script>

<template>
  <AdminBadgeBaseFormAdd @onSubmit="onSubmit"/>
</template>

<style scoped>

</style>