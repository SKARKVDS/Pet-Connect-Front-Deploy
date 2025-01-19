<template>
  <TopicHeader>
    <TopicFormDialog v-model:open="showAddForm" title="Add a topic" desc="Fill the information about your topic">
      <template #trigger>
        <TopicHeaderFormTrigger class="mb-3"/>
      </template>

      <template #content>
        <TopicFormAdd v-model:forum-id="route.params.id" @close="showAddForm = false" />
      </template>
    </TopicFormDialog>
  </TopicHeader>

  <TopicSkeletonSection v-if="loading"/>
  <TopicSection v-else :topics="topics"/>
</template>

<script setup lang="ts">

  import {useBreadcrumbStore} from "~/stores/breadcrumb";
  import { useTopicStore } from "~/stores/topic";
  import { ref } from "vue";

  definePageMeta({
    layout: 'dashboard'
  });

  useBreadcrumbStore().set([
    {label: "Forum", link:"/forum"},
    {label: "Topic"}
  ])

  const route = useRoute()
  const topicStore = useTopicStore()
  const topics = computed(() => topicStore.topics);
  const showAddForm = ref(false)
  const loading = ref(true);

  onMounted(async() => {
    useSonner.promise(topicStore.dispatchGetAllByForumId(Number(route.params.id)).finally(() => loading.value = false), {
      error: () => "Error! It seems the server has a problem...",
    })
  })


</script>
