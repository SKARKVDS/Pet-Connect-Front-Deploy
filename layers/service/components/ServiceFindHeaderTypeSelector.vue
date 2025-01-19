<script setup lang="ts">

import { injectServiceFindContext } from "~/layers/service/pages/service/find.vue"
import type { Type } from "~/services/type/types";
import {useTypeStore} from "~/stores/type";

const pageContext = injectServiceFindContext()

const items = ref<Type[] | undefined>()

const loading = ref<boolean>(true)
onMounted(async () => {
  const typeStore = useTypeStore()

  const result = await typeStore.dispatchGetAll().finally(() => loading.value = false)
  items.value = result.content

  pageContext.error.value = !result.success
})
</script>

<template>
  <UiComboBox
      v-model:model-value="pageContext.selectedType.value"
      class="xl:col-span-2"
      :items="items"
      :loading="loading"
      placeholder="Search type..."
      text-button="Select proposal type"
      key-property="id"
      value-property="id"
      label-property="name"
  />
</template>