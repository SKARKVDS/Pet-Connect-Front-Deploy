<script setup lang="ts">

import type { Memory } from "~/services/memory/types";

import {injectMemoriesContext} from "~/layers/memories/pages/memories/[id].vue"

const pageContext = injectMemoriesContext()

const memory = defineProps<Memory>()

</script>

<template>
  <UiCarouselItem :key="id" grab-cursor class="basis-96">
    <div class="p-1">
      <UiCard>
        <UiCardContent class="!p-4">
          <div class="relative aspect-square">
            <img class="object-cover h-full w-full" :src="url" alt="loading"/>
            <div class="space-x-2 absolute top-0 right-0 p-2">
              <UiButton @click="() => { pageContext.selectedMemory.value = memory; pageContext.isDeleteFormOpen.value = true }"
                        size="icon"
                        variant="destructive"
                        class="opacity-40 hover:opacity-90">
                <Icon class="size-4" name="lucide:trash"/>
              </UiButton>
            </div>
          </div>
          <p class="mt-2">
            {{ description }}
          </p>
        </UiCardContent>
      </UiCard>
    </div>
  </UiCarouselItem>
</template>