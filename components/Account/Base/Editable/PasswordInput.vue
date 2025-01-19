<script setup lang="ts">
  import { defineProps } from "vue";
  import { useAccountStore } from "~/stores/account";

  const accountStore = useAccountStore()

  const props = defineProps<{password: string}>()

  const textEdit = ref(props.password)
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?/{}~|])[A-Za-z\d!@#$%^&*()_\-+=<>?/{}~|]{8,}$/;

  const MIN_LENGTH = 8;

  const handleSubmit = async() => {
    if (!regex.test(textEdit.value)) {
      useSonner.error(`Password must be at least ${MIN_LENGTH} characters long, have a number and a special character.`);
      textEdit.value = props.password;
      return;
    }

    if(!(await accountStore.dispatchUpdateUserPassword(textEdit.value)).success) {
      textEdit.value = props.password;
      useSonner.error('Unable to change your password...');
    }
  };

  const handleReset = async() => {
    textEdit.value = props.password;
  };
</script>

<template>
    <dl>
      <div class="grid grid-cols-1 gap-y-2 border-b px-2 py-6 text-sm first: md:grid-cols-2 md:px-0">
        <dt class="font-medium ml-5">Password</dt>

        <UiEditable v-slot="{ isEditing }" v-model="textEdit">
          <UiEditableArea>
            <UiEditablePreview as="dd" class="h-8 cursor-pointer text-muted-foreground">
              <span class="flex size-full items-center">********</span>
            </UiEditablePreview>
            <div class="flex items-center gap-2">
              <div class="shrink-0 grow">
                <UiEditableInput as-child>
                  <UiInput class="h-8 px-2" placeholder="Password" type="password" />
                </UiEditableInput>
              </div>
              <div v-if="isEditing" class="flex items-center gap-1">
                <UiEditableSubmit as-child @click.prevent="handleSubmit">
                  <UiButton class="size-8" size="icon-sm">
                    <Icon name="lucide:check" class="size-4" />
                  </UiButton>
                </UiEditableSubmit>
                <UiEditableCancel as-child @click.prevent="handleReset">
                  <UiButton variant="outline" class="size-8" size="icon-sm">
                    <Icon name="lucide:x" class="size-4" />
                  </UiButton>
                </UiEditableCancel>
              </div>
            </div>
          </UiEditableArea>
        </UiEditable>
      </div>
    </dl>
</template>

<style scoped>

</style>