<script setup lang="ts">

import {injectServiceFindContext} from "~/layers/service/pages/service/find.vue"
import {fullSchema, noAddressSchema} from "~/layers/service/validators/send-request.validators";

const pageContext = injectServiceFindContext()

const typedSchema = computed(() => toTypedSchema(pageContext.selectedService.value?.address === '------' ? fullSchema : noAddressSchema));
const {handleSubmit} = useForm({
  validationSchema: typedSchema,
  validateOnMount: true
});

const submit = handleSubmit((values) => pageContext.onRequestSubmit(values))
</script>

<template>
  <UiDialog v-model:open="pageContext.isFormOpen.value">
      <UiDialogContent
          class="sm:max-w-[425px]"
          title="Send a request"
          description="Please note that once you send a request, it cannot be canceled."
      >
        <template #content>
          <form @submit="submit">
          <div class="grid gap-4 py-4">
            <ServiceRequestFormPetSelector/>
            <ServiceRequestFormTimeRangePicker/>
            <ServiceRequestFormAddressInput/>
          </div>
          <div class="text-right space-x-2 mt-2 sm:mt-0">
            <UiButton
                variant="outline"
                type="button"
                @click="() => { pageContext.isFormOpen.value = false }"
            >Cancel
            </UiButton>
            <UiButton type="submit">Save</UiButton>
          </div>
          </form>
        </template>
      </UiDialogContent>
  </UiDialog>

</template>