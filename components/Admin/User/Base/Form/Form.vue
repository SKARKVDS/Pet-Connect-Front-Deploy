<script setup lang="ts">

import {schema} from "~/form/userAdmin";
import type { InputUserUpdateAdmin } from "~/services/user/types";

const emits = defineEmits(['onSubmit'])

defineProps<{user? :InputUserUpdateAdmin}>()

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(schema),
});

const submit = handleSubmit((values) => emits('onSubmit', values))

</script>

<template>
  <form :initial-values="user" @submit="submit">
    <fieldset :disabled="isSubmitting" class="grid grid-cols-1 gap-2">
      <AdminUserBaseFormUserNameInput :initial-value="user?.userName"/>
      <AdminUserBaseFormFirstNameInput :initial-value="user?.firstName"/>
      <AdminUserBaseFormLastNameInput :initial-value="user?.lastName"/>
      <AdminUserBaseFormEmailInput :initial-value="user?.email"/>
      <AdminUserBaseFormPhoneNumberInput :initial-value="user?.phoneNumber"/>
      <AdminUserBaseFormCountServiceInput :initial-value="user?.countService"/>
      <AdminUserBaseFormSubmit/>
    </fieldset>
  </form>
</template>