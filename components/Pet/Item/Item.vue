<script setup lang="ts">
  import { defineProps } from "vue";
  import type { Pet } from "~/services/pet/types";

  defineProps<{pet: Pet }>()

  const showEditForm = ref(false)
  const showEditImageForm = ref(false)

  function getAge(timestamp: any) {
    // Convertir le timestamp en date
    const dateNaissance = new Date(Number(timestamp));

    // Obtenir la date actuelle
    const dateActuelle = new Date();

    // Calculer l'âge
    let age = dateActuelle.getFullYear() - dateNaissance.getFullYear();

    // Ajuster l'âge si l'anniversaire n'est pas encore passé cette année
    const moisActuel = dateActuelle.getMonth();
    const jourActuel = dateActuelle.getDate();

    const moisNaissance = dateNaissance.getMonth();
    const jourNaissance = dateNaissance.getDate();

    if (
      moisActuel < moisNaissance ||
      (moisActuel === moisNaissance && jourActuel < jourNaissance)
    ) {
      age--;
    }

    return age;
  }
</script>

<template>
  <UiCard>
    <UiCardContent class="p-3">
      <PetItemAvatar :img-src="pet.url"/>
    </UiCardContent>
    <UiCardFooter class="p-3 flex justify-between">
      <UiHoverCard>
        <UiHoverCardTrigger as-child>
          <PetItemTitle :name="pet.nickName" :age="getAge(pet.birthDate)"/>
        </UiHoverCardTrigger>
        <UiHoverCardContent class="w-80">
          <PetItemData :name="pet.nickName" :specie="pet.specie" :race="pet.race" :birthday="useDateFormat(new Date(pet.birthDate * 1), 'DD MMMM YYYY')"/>
        </UiHoverCardContent>
      </UiHoverCard>
      <PetItemAction>
        <PetItemActionVaccine :to="'/pet/vaccine/' + pet.id"/>
        <PetFormDialog v-model:open="showEditImageForm" title="Edit your pet image" desc="Edit the image about your pet">
          <template #trigger>
            <PetItemActionEditImage/>
          </template>
          <template #content>
            <PetFormEditImage :pet="pet" @close="showEditImageForm = false" />
          </template>
        </PetFormDialog>
        <PetFormDialog v-model:open="showEditForm" title="Edit your pet" desc="Edit the information about your pet">
          <template #trigger>
            <PetItemActionEdit/>
          </template>
          <template #content>
            <PetFormEdit :pet="pet" @close="showEditForm = false" />
          </template>
        </PetFormDialog>
        <PetFormAlertDialog title="Delete your pet" desc="Are you sure you want to delete your pet?">
          <template #trigger>
            <PetItemActionDelete/>
          </template>
          <template #content>
            <PetFormDelete :id="pet.id"/>
          </template>
        </PetFormAlertDialog>
      </PetItemAction>
    </UiCardFooter>
  </UiCard>
</template>

<style scoped>

</style>