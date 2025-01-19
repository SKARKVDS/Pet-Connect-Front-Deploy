<template>

  <ForumSkeletonSection v-if="loading"/>
  <ForumSection v-else :forums="forums"/>

</template>

<script setup lang="ts">

  import {useBreadcrumbStore} from "~/stores/breadcrumb";
  import { useForumStore } from "~/stores/forum";
  import { ref } from "vue";

  definePageMeta({
    layout: 'dashboard'
  });

  useBreadcrumbStore().set([
    {label: "Forum"}
  ])

  const forumStore = useForumStore()
  const forums = computed(() => forumStore.forums);
  const loading = ref(true);


  onMounted(async() => {
    useSonner.promise(forumStore.dispatchGetAll().finally(() => loading.value = false), {
      error: () => "Error! It seems the server has a problem...",
    })
  })

</script>