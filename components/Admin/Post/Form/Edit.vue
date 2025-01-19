<script setup lang="ts">
import { usePostStore } from "~/stores/post";
import type { Post } from "~/services/post/types";

const emits = defineEmits(["close"]);

const props = defineProps<{ post: Post, topicId: number }>();

const postStore = usePostStore();

const onSubmit = async (values: any) => {
  values.id = props.post.id;

  const result = await postStore.dispatchUpdate(values);
  if (result.success) {
    useSonner.success("The post has been updated!");
    emits("close");
  } else {
    useSonner.error("Unable to update the post... please try again later.");
  }
};
/*const forumStore = useForumStore()

const onSubmit = async (values: any) => {
  values.id = props.forum.id

  const result = await forumStore.dispatchUpdate(values)
  if (result.success) {
    useSonner.success("Your forum has been updated!")
    emits('close')
  } else {
    useSonner.error("Unable to update your forum... please try again later.")
  }
}*/

</script>

<template>
  <AdminPostBaseForm :post="post" @onSubmit="onSubmit"/>
</template>