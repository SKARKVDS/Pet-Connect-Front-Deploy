<script setup lang="ts">

import {useForumStore} from "~/stores/forum";
import type { ForumAdmin } from "~/services/forum/types";
const emits = defineEmits(['close'])

const props = defineProps<{forum :ForumAdmin}>()


const forumStore = useForumStore()

const onSubmit = async (values: any) => {
  values.id = props.forum.id

  const result = await forumStore.dispatchUpdate(values)
  if (result.success) {
    useSonner.success("Your forum has been updated!")
    emits('close')
  } else {
    useSonner.error("Unable to update your forum... please try again later.")
  }
}

</script>

<template>
  <AdminForumBaseForm :forum="forum" @onSubmit="onSubmit"/>
</template>