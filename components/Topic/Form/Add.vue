<script setup lang="ts">

import { usePostStore } from "~/stores/post";
import { useTopicStore } from "~/stores/topic";

const emits = defineEmits(['close'])

const forumId = defineModel('forumId')
const topicStore = useTopicStore()

const onSubmit = async (values: any) => {
  console.log("onSubmit")
  console.log(values)

  const data = {
    name: values.name,
    forumId: Number(forumId.value),
  }
  const result = await topicStore.dispatchAdd(data)
  if (result.success) {
    useSonner.success("Your topic has been added!")
    emits('close')
  } else {
    useSonner.error("Unable to add your topic... please try again later.")
  }
}


</script>

<template>
  <TopicBaseForm @onSubmit="onSubmit"/>
</template>

<style scoped>

</style>