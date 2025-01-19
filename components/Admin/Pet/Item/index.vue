<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import type { PetAdmin } from "~/services/pet/types";

  const showEditForm = ref(false)
  const showEditImageForm = ref(false)
  const showDisableForm = ref(false)
  const showDeleteForm = ref(false)
  const props = defineProps<{pet: PetAdmin }>()

</script>

<template>
  <UiTableCell class="pl-0 text-right p-3 flex justify-end gap-2">
    <AdminPetFormAlertDialog v-model:open="showEditImageForm" title="Reset the pet image" desc="Do you want to reset the pet image ?">
      <template #trigger>
        <AdminPetItemActionEditImage/>
      </template>
      <template #content>
        <AdminPetFormEditImage :id="pet.id" :url="pet.url" @close="showEditImageForm = false" />
      </template>
    </AdminPetFormAlertDialog>


    <AdminPetFormDialog v-model:open="showEditForm" title="Edit the pet" desc="Edit the information about the pet">
      <template #trigger>
        <AdminPetItemActionEdit/>
      </template>
      <template #content>
        <AdminPetFormEdit :pet="pet" @close="showEditForm = false" />
      </template>
    </AdminPetFormDialog>

    <AdminPetFormAlertDialog v-if="pet.isDisable" v-model:open="showDisableForm" title="Activate the pet" desc="Do you want to activate the pet ?">
      <template #trigger>
        <AdminPetItemActionActive/>
      </template>
      <template #content>
        <AdminPetFormActive :id="pet.id" @close="showDisableForm = false" />
      </template>
    </AdminPetFormAlertDialog>
    <AdminPetFormAlertDialog v-else v-model:open="showDisableForm" title="Disable the pet" desc="Do you want to disable the pet ?">
      <template #trigger>
        <AdminPetItemActionDisable/>
      </template>
      <template #content>
        <AdminPetFormDisable :id="pet.id" @close="showDisableForm = false" />
      </template>
    </AdminPetFormAlertDialog>

    <AdminPetFormAlertDialog v-model:open="showDeleteForm" title="Delete the pet" desc="Are you sure you want to delete the pet this can be dangerous?">
      <template #trigger>
        <AdminPetItemActionDelete/>
      </template>
      <template #content>
        <AdminPetFormDelete :id="pet.id" @close="showDeleteForm = false" />
      </template>
    </AdminPetFormAlertDialog>
  </UiTableCell>
</template>

<style scoped>

</style>