<template>
  <UiPopover v-model:open="open">
    <UiPopoverTrigger as-child>
      <UiButton size="icon" variant="outline">
        <Icon class="size-4" name="lucide:filter" />
      </UiButton>
    </UiPopoverTrigger>
    <UiPopoverContent class="w-[250px] p-0">
      <UiCommand v-model="value" :filter-function="filterFunction">
        <UiCommandInput placeholder="Filter by specie..."/>
        <UiCommandList>
          <UiCommandEmpty>No specie found.</UiCommandEmpty>
          <UiCommandGroup heading="Specie">
            <UiCommandItem
                v-for="specie in specieStore.species"
                :key="specie.id"
                :value="specie"
                @select="open = false"
            >
              <Icon
                  name="lucide:check"
                  :class="[
                    'mr-2 h-4 w-4',
                    model === specie.name ? 'opacity-100' : 'opacity-0',
                  ]"
              />
              {{ specie.name }}
            </UiCommandItem>
          </UiCommandGroup>
        </UiCommandList>
      </UiCommand>
    </UiPopoverContent>
  </UiPopover>
</template>

<script setup lang="ts">
import {useSpecieStore} from "~/stores/specie";

const model = defineModel()

const specieStore = useSpecieStore()

const open = ref(false);
const value = ref()

watch(value, () => {
  model.value = value?.value.name
})


const filterFunction = (list: [{name: string, id: string}], search: string) =>
    list.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()))

</script>
