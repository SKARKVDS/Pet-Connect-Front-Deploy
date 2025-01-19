<script setup lang="ts">

import {injectMemoriesContext} from "~/layers/memories/pages/memories/[id].vue"

import { schema } from "~/layers/memories/validators/create.validators"

const pageContext = injectMemoriesContext()

const {handleSubmit} = useForm({
  validationSchema: toTypedSchema(schema)
});

const submit = handleSubmit((values) => pageContext.onAddSubmit(values))

</script>

<template>
  <UiDialog v-model:open="pageContext.isAddFormOpen.value">
    <UiDialogContent
        class="sm:max-w-[425px]"
        title="Add a memory"
        description="Please fill the information down below."
    >
      <template #content>
        <form @submit="submit">
          <div class="grid gap-4 py-4">
            <MemoriesAddFormImageInput/>
            <MemoriesAddFormDescriptionInput/>
          </div>
          <div class="text-right space-x-2 mt-2 sm:mt-0">
            <UiButton
                variant="outline"
                type="button"
                @click="() => { pageContext.isAddFormOpen.value = false }"
            >Cancel
            </UiButton>
            <UiButton type="submit">Save</UiButton>
          </div>
        </form>
      </template>
    </UiDialogContent>
  </UiDialog>

</template>