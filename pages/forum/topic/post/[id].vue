<template>
  <PostHeader>
    <PostFormDialog v-model:open="showAddForm" title="Add a post" desc="Fill the information about the post">
      <template #trigger>
        <PostHeaderFormTrigger/>
      </template>

      <template #content>
        <PostFormAdd :topicId="Number(route.params.id)" @close="showAddForm = false" />
      </template>
    </PostFormDialog>
  </PostHeader>

  <PostSkeletonItem v-if="loading" />

  <PostSection v-else-if="posts.length > 0">
    <Div v-for="post in posts" :key="post.id" class="topic-item">
      <PostItem :post="post" />
    </Div>
  </PostSection>

  <PostSection v-else>
    <UiPlaceholder class="h-[500px]">
      It looks like there aren’t any posts for this topic yet
    </UiPlaceholder>
  </PostSection>


</template>

<script setup lang="ts">

  import {useBreadcrumbStore} from "~/stores/breadcrumb";
  import { useTopicStore } from "~/stores/topic";
  import { ref } from "vue";
  import { schema } from "~/form/topic";
  import { usePostStore } from "~/stores/post";
  import { useForumStore } from "~/stores/forum";

  definePageMeta({
    layout: 'dashboard'
  });
  const route = useRoute()

  useBreadcrumbStore().set([
    {label: "Forum", link:"/forum"},
  ])
  const postStore = usePostStore()
  const forumStore = useForumStore()
  const posts = computed(() => postStore.posts);
  const showAddForm = ref(false)

  const loading = ref(true)

  onMounted(async() => {
    useSonner.promise(postStore.dispatchGetAllByTopicId(Number(route.params.id)).finally(() => { loading.value = false }), {
      error: () => "Error! It seems the server has a problem...",
    })

    useSonner.promise(forumStore.dispatchGetByTopicId(Number(route.params.id)).finally(() => {
      useBreadcrumbStore().set([
        {label: "Forum", link:"/forum"},
        {label: "Topic", link:`/forum/topic/${forumStore.forum?.id}`},
        {label: "Post"},
      ])

    }), {
      error: () => "Error! It seems the server has a problem...",
    })

  })
</script>
