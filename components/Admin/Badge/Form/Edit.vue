<script setup lang="ts">

import type { Badge } from "~/services/badge/types";
import { useBadgeStore } from "~/stores/badge";
const emits = defineEmits(['close'])

const props = defineProps<{badge :Badge}>()


const badgeStore = useBadgeStore()

const onSubmit = async (values: any) => {
  values.id = props.badge.id

  const result = await badgeStore.dispatchUpdateAttributes(values)
  if (result.success) {
    useSonner.success("The badge has been updated!")
    emits('close')
  } else {
    useSonner.error("Unable to update the badge... please try again later.")
  }
}

</script>

<template>
  <AdminBadgeBaseFormEdit :badge="badge" @onSubmit="onSubmit"/>
</template>