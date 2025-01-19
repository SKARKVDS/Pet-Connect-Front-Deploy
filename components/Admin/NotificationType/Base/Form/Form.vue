<script setup lang="ts">

import {schema} from "~/form/typeNotification";
import type { InputTypeNotificationAdd } from "~/services/typeNotification/types";

const emits = defineEmits(['onSubmit'])

defineProps<{notificationType? : InputTypeNotificationAdd}>()

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(schema),
});

const submit = handleSubmit((values) => emits('onSubmit', values))

</script>

<template>
  <form :initial-values="notificationType" @submit="submit">
    <fieldset :disabled="isSubmitting" class="grid grid-cols-1 gap-2">
      <AdminNotificationTypeBaseFormNameInput :initial-value="notificationType?.name"/>
      <AdminNotificationTypeBaseFormSubmit/>
    </fieldset>
  </form>
</template>