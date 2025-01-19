<script lang="ts">

import {Ref} from "vue/dist/vue";
import {createContext} from "radix-vue";
import type {Memory} from "~/services/memory/types";

type MemoriesContextContext = {
  fetchMemories: () => Promise<void>;
  isAddFormOpen: Ref<boolean>;
  onAddSubmit: (value: any) => void;
  isDeleteFormOpen: Ref<boolean>;
  selectedMemory: Ref<Memory | undefined>;
  onDeleteSubmit: (value: any) => void;
  error: Ref<boolean>;
}

export const [injectMemoriesContext, provideMemoriesContext]
    = createContext<MemoriesContextContext>('MemoriesContext')

</script>

<script lang="ts" setup>
import {useBreadcrumbStore} from "~/stores/breadcrumb.js";
import {useMemoryStore} from "~/stores/memory";

definePageMeta({
  layout: 'dashboard'
});

useBreadcrumbStore().set([
  {label: "Dashboard", link: "/dashboard"},
  {label: "Memory"},
])

const memoryStore = useMemoryStore()
const route = useRoute()

const error = ref<boolean>(false)

const loading = ref(true)
const fetchMemories = async () => {
  const result = await memoryStore.dispatchGetAllByProposalId(route.params.id)
  loading.value = false;
  error.value = !result.success;
}

onMounted(async () => await fetchMemories())

const isAddFormOpen = ref(false)
const onAddSubmit = (values) => {
  values.reservationId = route.params.id
  useSonner.promise(memoryStore.dispatchAddMemory(values), {
    loading: "Adding your memory",
    success: () => { isAddFormOpen.value = false; return "Your memory has been added!" },
    error: "An unexpected error occured",
  })
}

const isDeleteFormOpen = ref(false)
const selectedMemory = ref<Memory>()
const onDeleteSubmit = (values) => {
  useSonner.promise(memoryStore.dispatchDeleteById(selectedMemory.value?.id), {
    loading: "Deleting your memory",
    success: () => { isDeleteFormOpen.value = false; return "Your memory has been deleted!" },
    error: "An unexpected error occured",
  })
}

provideMemoriesContext({
  fetchMemories,
  isAddFormOpen,
  onAddSubmit,
  isDeleteFormOpen,
  selectedMemory,
  onDeleteSubmit,
  error
})

</script>


<template>
  <MemoriesHeader>
    <UiButton @click="() => isAddFormOpen = true">Add memories</UiButton>
  </MemoriesHeader>
  <TransitionSlide group tag="div">
    <MemoriesError v-if="error"/>
    <MemoriesCarousel v-else-if="!loading">
      <template v-for="memory in memoryStore.memories">
        <MemoriesCarouselItem v-bind="memory"/>
      </template>
    </MemoriesCarousel>
  </TransitionSlide>
  <MemoriesAddForm/>
  <MemoriesDeleteForm/>
</template>