<script setup lang="ts">
  import { useTopicStore } from "~/stores/topic";

  const emits = defineEmits(['close'])

  const topicStore = useTopicStore()
  const props = defineProps<{forumId :number}>()

  const onSubmit = async (values: any) => {
    values.forumId = props.forumId
    const result = await topicStore.dispatchAdd(values)
    if (result.success) {
      useSonner.success("The topic has been added!")
      emits('close')
    } else {
      useSonner.error("Unable to add the topic... please try again later.")
    }
  }


</script>

<template>
  <AdminTopicBaseForm @onSubmit="onSubmit"/>
</template>

<style scoped>

</style>