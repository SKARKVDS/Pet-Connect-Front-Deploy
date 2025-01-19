<script setup lang="ts">

import {injectServiceFindContext} from "~/layers/service/pages/service/find.vue"
import type {Service} from "~/services/service/types";

const pageContext = injectServiceFindContext()

const service = defineProps<Service>();

</script>

<template>
  <UiCard
      class="overflow-hidden"
      :description="service.description">
    <template #title>
      <UiCardTitle>
        {{ service.typeName }}
        <span class="ml-2 text-muted-foreground text-sm"><Icon name="lucide:map-pin"/> {{ service.address }}</span>
      </UiCardTitle>
    </template>

    <template #footer>
      <div class="flex items-center justify-between !p-4 bg-muted">
        <ServiceFindListItemOwner
            :first-name="firstName"
            :last-name="lastName"
            :user-name="userName"
            :url="url"
            :badge="badgeName"
        />
        <div class="justify-end flex gap-4">
          <ProposalListItemSpecie :items="service.species"/>
          <UiButton class="bg-green-800 hover:bg-green-700 text-white" @click="() => { pageContext.selectedService.value = service; pageContext.isFormOpen.value = true }">
            Apply
          </UiButton>
        </div>
      </div>
    </template>
  </UiCard>
</template>