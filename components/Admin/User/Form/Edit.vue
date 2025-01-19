<script setup lang="ts">

import {useUserStore} from "~/stores/user";
import type {User} from "~/services/user/types";

const emits = defineEmits(['close'])

const props = defineProps<{user :User}>()

const userStore = useUserStore()

const onSubmit = async (values: any) => {
  values.id = props.user.id
  const result = await userStore.dispatchUpdateAdmin(values)
  if (result.success) {
    useSonner.success("The user has been updated!")
    emits('close')
  } else {
    useSonner.error("Unable to update the user... please try again later.")
  }
}

</script>

<template>
  <AdminUserBaseForm :user="user" @onSubmit="onSubmit"/>
</template>