<script setup lang="ts">
  import { defineProps } from "vue";
  import { useAccountStore } from "~/stores/account";

  const accountStore = useAccountStore()

  const props = defineProps<{firstName: string}>()

  const textEdit = ref(props.firstName)
  const MIN_LENGTH = 3;

  const handleSubmit = async() => {
    if (textEdit.value.length < MIN_LENGTH) {
      useSonner.error(`First name must be at least ${MIN_LENGTH} characters long.`);
      textEdit.value = props.firstName;
      return;
    }

    if(!(await accountStore.dispatchUpdateUserFirstName(textEdit.value)).success) {
      textEdit.value = props.firstName;
      useSonner.error('Unable to change your first name...');
    }
  };

  const handleReset = async() => {
    textEdit.value = props.firstName;
  };
</script>

<template>
    <dl>
      <div class="grid grid-cols-1 gap-y-2 border-b px-2 py-6 text-sm first: md:grid-cols-2 md:px-0">
        <dt class="font-medium ml-5">First Name</dt>

        <UiEditable v-slot="{ isEditing }" v-model="textEdit">
          <UiEditableArea>
            <UiEditablePreview as="dd" class="h-8 cursor-pointer text-muted-foreground">
              <span class="flex size-full items-center">{{ textEdit }}</span>
            </UiEditablePreview>
            <div class="flex items-center gap-2">
              <div class="shrink-0 grow">
                <UiEditableInput as-child>
                  <UiInput class="h-8 px-2" placeholder="First name"/>
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