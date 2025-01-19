<script setup lang="ts">

import { injectProposalCreateFormContext } from '~/layers/proposals/components/ProposalCreateForm.vue'
import {useTypeStore} from "~/stores/type/index.js";
import type {Type} from "~/services/type/types";

const rootContext = injectProposalCreateFormContext()

const loading = ref(true)

const items = ref<Type[]>([])

const typeStore = useTypeStore()

onMounted(async () => {
  const result = await typeStore.dispatchGetAll()
  if (result.success) {
    items.value = typeStore.types
  }

  loading.value = false;
})

</script>

<template>
  <UiVeeComboBox
      required
      name="typeId"
      label="Proposal type"
      placeholder="Search type..."
      text-button="Select proposal type"
      :items="items"
      :loading="loading"
      key-property="id"
      value-property="id"
      label-property="name"
      @update:model-value="(type: Type) => { rootContext.selectedType.value = type }"
  />
</template>