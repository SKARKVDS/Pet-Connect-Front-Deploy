<script setup lang="ts">

import {useTypeStore} from "~/stores/type";
import type { Type, TypeAdmin } from "~/services/type/types";

const emits = defineEmits(['close'])

const props = defineProps<{type :TypeAdmin}>()

const typeStore = useTypeStore()

const onSubmit = async (values: any) => {
  values.id = props.type.id
  const result = await typeStore.dispatchUpdate(values)
  if (result.success) {
    useSonner.success("The type has been updated!")
    emits('close')
  } else {
    useSonner.error("Unable to update the type... please try again later.")
  }
}

</script>

<template>
  <AdminTypeBaseForm :type="type" @onSubmit="onSubmit"/>
</template>