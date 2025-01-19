<template>
  <AdminTopicHeader>
    <AdminTopicFormDialog v-model:open="showAddForm" title="Add a topic" desc="Fill the information about the topic">
      <template #trigger>
        <AdminTopicHeaderFormTrigger class="mb-3"/>
      </template>

      <template #content>
        <AdminTopicFormAdd :forumId="Number(route.params.id)" @close="showAddForm = false" />
      </template>
    </AdminTopicFormDialog>
  </AdminTopicHeader>

  <AdminTopicSkeletonSection v-if="loading"/>
  <AdminTopicSection v-else :topics="topics"/>
</template>

<script setup lang="ts">

  import {useBreadcrumbStore} from "~/stores/breadcrumb";
  import { useTopicStore } from "~/stores/topic";
  import { ref } from "vue";
  import { schema } from "~/form/topic";

  definePageMeta({
    layout: 'dashboard'
  });

  useBreadcrumbStore().set([
    {label: "Forum", link:"/admin/forum"},
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
