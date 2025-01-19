<script setup lang="ts">

import {useUserStore} from "~/stores/user";
import type {User} from "~/services/user/types";
import type { Pet } from "~/services/pet/types";
import { usePetStore } from "~/stores/pet";

const emits = defineEmits(['close'])

const props = defineProps<{pet :Pet}>()

const petStore = usePetStore()

const onSubmit = async (values: any) => {
  values.id = props.pet.id
  const result = await petStore.dispatchUpdateAdmin(values)
  if (result.success) {
    useSonner.success("The pet has been updated!")
    emits('close')
  } else {
    useSonner.error("Unable to update the pet... please try again later.")
  }
}

</script>

<template>
  <AdminPetBaseForm :pet="pet" @onSubmit="onSubmit"/>
</template>