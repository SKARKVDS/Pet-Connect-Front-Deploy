<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useVaccineStore } from "~/stores/vaccine";

  const vaccineStore = useVaccineStore()

  const props = defineProps<{initialValue?: number}>()
  const emit = defineEmits<{ (e: 'update:modelValue', value: number): void }>();
  const selectedVaccine = ref(props.initialValue);

  const onVaccineChange = (vaccineId: number) => {
    emit('update:modelValue', vaccineId);
    selectedVaccine.value = vaccineId;
  };
</script>

<template>
  <UiVeeMultiSelect @update:model-value="onVaccineChange" :model-value="vaccineStore.vaccines.find(vaccine => vaccine.id === initialValue)?.id" value-prop="id" label="name" :options="vaccineStore.vaccines" form-label="Vaccine" name="vaccineId" required />

</template>

<style scoped>

</style>