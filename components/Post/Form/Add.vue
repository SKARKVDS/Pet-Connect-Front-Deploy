<script setup lang="ts">
  import {usePostStore} from "~/stores/post";

  const emits = defineEmits(['close'])

  const postStore = usePostStore()
  const props = defineProps<{topicId :number}>()

  const onSubmit = async (values: any) => {
    values.topicId = props.topicId
    const result = await postStore.dispatchAdd(values)
    if (result.success) {
      useSonner.success("The post has been added!")
      emits('close')
    } else {
      useSonner.error("Unable to add the post... please try again later.")
    }
  }
</script>

<template>
  <PostBaseForm @onSubmit="onSubmit"/>
</template>

<style scoped>

</style>