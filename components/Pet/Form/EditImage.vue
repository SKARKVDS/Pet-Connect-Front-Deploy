<script setup lang="ts">

  import {usePetStore} from "~/stores/pet";
  import type {Pet} from "~/services/pet/types";

  const emits = defineEmits(['close'])

  const props = defineProps<{pet :Pet}>()

  const petStore = usePetStore()

  const onSubmit = async (values: any) => {
    values.id = props.pet.id

    console.log(values)
    const result = await petStore.dispatchUpdateImage(values)
    if (result.success) {
      useSonner.success("Your pet image has been updated!")
      emits('close')
    } else {
      useSonner.error("Unable to update your pet image... please try again later.")
    }
  }

</script>

<template>
  <UiAvatar class="w-72 h-72 border border-black">
    <UiAvatarImage :src="pet.url" alt="https://png.pngtree.com/png-clipart/20190918/ourmid/pngtree-load-the-3273350-png-image_1733730.jpg" />
    <UiAvatarFallback>Loading</UiAvatarFallback>
  </UiAvatar>

  <PetBaseFormImage @onSubmit="onSubmit"/>
</template>