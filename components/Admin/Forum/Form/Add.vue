<script setup lang="ts">
  import {useForumStore} from "~/stores/forum";

  const emits = defineEmits(['close'])

  const forumStore = useForumStore()

  const onSubmit = async (values: any) => {
    const result = await forumStore.dispatchAdd(values)
    if (result.success) {
      useSonner.success("The forum has been added!")
      emits('close')
    } else {
      useSonner.error("Unable to add the forum... please try again later.")
    }
  }


</script>

<template>
  <AdminForumBaseForm @onSubmit="onSubmit"/>
</template>

<style scoped>

</style>