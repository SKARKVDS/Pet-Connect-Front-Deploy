<script setup lang="ts">

  import {schema} from "~/form/badge/image";
  import type { InputBadgeUpdateImage } from "~/services/badge/types";

  const emits = defineEmits(['onSubmit'])

  defineProps<{badge : InputBadgeUpdateImage}>()

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const submit = handleSubmit((values) => emits('onSubmit', values))

</script>

<template>
  <form @submit="submit">
    <fieldset :disabled="isSubmitting" class="grid grid-cols-1 gap-2 ">
      <UiAvatar class="w-full h-full">
        <UiAvatarImage :src="badge.url" alt="image-badge" />
        <UiAvatarFallback>Loading</UiAvatarFallback>
      </UiAvatar>
      <AdminBadgeBaseFormFileInput/>
      <AdminBadgeBaseFormSubmit/>
    </fieldset>
  </form>
</template>