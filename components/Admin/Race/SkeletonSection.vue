<script setup lang="ts">
  import type { Race } from "~/services/race/types";
  import type { ColumnDef, Table } from "@tanstack/vue-table";
  import { defineProps } from "vue";

  const tableRef = ref();
  const table = ref<Table<Race> | null>(null);
  const search = ref("");


  const columns: ColumnDef<Race>[] = [
    { accessorKey: "name", header: "Name", enableHiding: false },
  ];

</script>

<template>
  <div class="flex flex-col justify-between gap-5 md:flex-row md:items-center">
    <UiInput v-model="search" type="search" placeholder="Search" class="w-full md:w-96" />
  </div>

  <UiTanStackTable
    ref="tableRef"
    :search="search"
    :columns="columns"
    class="mt-5 rounded-md border"
    @ready="table = $event"
  >
    <template #empty>
      <div class="flex w-full flex-col items-center justify-center gap-5 py-5">
        <Icon name="lucide:hourglass" class="h-12 w-12 text-muted-foreground" />
        <span class="mt-2">Fetching data.</span>
      </div>
    </template>
  </UiTanStackTable>

</template>

<style scoped>

</style>