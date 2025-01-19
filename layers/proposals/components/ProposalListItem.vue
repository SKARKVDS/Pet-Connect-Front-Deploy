<template>
  <UiCard
      :title="props.typeName"
      :description="props.description">
    <template #footer>
      <div class="flex items-center justify-between !p-4 bg-muted">
        <ProposalListItemSpecie :items="species"/>
        <div class="justify-end flex gap-2">
          <ProposalListItemCalendar :id="id"/>
          <ProposalListItemDelete :id="id"/>
        </div>
      </div>
    </template>
  </UiCard>
</template>

<script setup lang="ts">

import type {Proposal} from "~/services/proposal/types.ts";

const props = defineProps<Proposal>()

</script>