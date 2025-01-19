<script setup lang="ts">
  import { useTopicStore } from "~/stores/topic";
  import type { Topic } from "~/services/topic/types";

  const emits = defineEmits(["close"]);

  const props = defineProps<{ topic: Topic, forumId: number }>();

  const topicStore = useTopicStore();

  const onSubmit = async (values: any) => {
    values.id = props.topic.id;

    const result = await topicStore.dispatchUpdate(values);
    if (result.success) {
      useSonner.success("Your topic has been updated!");
      emits("close");
    } else {
      useSonner.error("Unable to update your topic... please try again later.");
    }
  };
</script>

<template>
  <AdminTopicBaseForm :topic="{ ...topic, forumId: forumId }" @onSubmit="onSubmit" />
</template>