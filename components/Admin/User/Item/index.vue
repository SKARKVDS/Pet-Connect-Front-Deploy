<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import type { User } from "~/services/user/types";

  const showEditForm = ref(false)
  const showEditImageForm = ref(false)
  defineProps<{user: User }>()


</script>

<template>
  <UiTableCell class="pl-0 text-right p-3 flex justify-end gap-2">
    <AdminUserFormAlertDialog v-if="user.url" v-model:open="showEditImageForm" title="Delete the user image" desc="Do you want to delete the user image ?">
      <template #trigger>
        <AdminUserItemActionEditImage/>
      </template>
      <template #content>
        <AdminUserFormEditImage :id="user.id" :url="user.url" @close="showEditImageForm = false" />
      </template>
    </AdminUserFormAlertDialog>
    <UiButton v-else size="icon" class="bg-blue-500 hover:bg-blue-600 text-white" :disabled="true">
      <Icon class="size-4" name="lucide:image" />
    </UiButton>


    <AdminUserFormDialog v-model:open="showEditForm" title="Edit the user" desc="Edit the information about the user">
      <template #trigger>
        <AdminUserItemActionEdit/>
      </template>
      <template #content>
        <AdminUserFormEdit :user="user" @close="showEditForm = false" />
      </template>
    </AdminUserFormDialog>


    <NuxtLink v-if="user.countProposal !== 0" :to="`/admin/user/proposal/${user.id}`">
      <UiButton size="icon" class="bg-blue-500 hover:bg-blue-600 text-white">
        <Icon class="size-4" name="lucide:hand-helping"/>
      </UiButton>
    </NuxtLink>
    <UiButton v-else size="icon" class="bg-blue-500 hover:bg-blue-600 text-white" :disabled="true">
      <Icon class="size-4" name="lucide:hand-helping" />
    </UiButton>

    <NuxtLink v-if="user.countPet !== 0" :to="`/admin/user/pet/${user.id}`">
      <UiButton size="icon" class="bg-blue-500 hover:bg-blue-600 text-white">
        <Icon class="size-4" name="lucide:dog"/>
      </UiButton>
    </NuxtLink>
    <UiButton v-else size="icon" class="bg-blue-500 hover:bg-blue-600 text-white" :disabled="true">
      <Icon class="size-4" name="lucide:dog" />
    </UiButton>
  </UiTableCell>
</template>

<style scoped>

</style>