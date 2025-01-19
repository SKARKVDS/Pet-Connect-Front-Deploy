<script setup lang="ts">
  import type { Topic } from "~/services/topic/types";
  import type { ColumnDef, Table } from "@tanstack/vue-table";
  import { defineProps } from "vue";

  const tableRef = ref();
  const table = ref<Table<Topic> | null>(null);
  const search = ref("");

  function formatDateFromTimestamp(timestamp:any) {
    // Créer un objet Date à partir du timestamp
    const date = new Date(Number(timestamp));

    // Obtenir le mois (ajouter 1 car les mois sont indexés à partir de 0)
    const month = String(date.getMonth() + 1).padStart(2, '0');

    // Obtenir le jour du mois
    const day = String(date.getDate()).padStart(2, '0');

    // Obtenir l'année
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');

    // Obtenir les minutes
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Retourner la date formatée en MM-DD-YYYY
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  const columns: ColumnDef<Topic>[] = [
    { accessorKey: "name", header: "Name", enableHiding: false },
    { accessorKey: "creatorName", header: "Creator Name", enableHiding: true },
    {
      accessorKey: "creationTime",
      header: "Creation Time",
      enableHiding: true,
      cell: ({ getValue }) => formatDateFromTimestamp(getValue()) // Utilisation de la méthode de formatage
    },
    {
      accessorKey: "updateTime",
      header: "Last Update Time",
      enableHiding: true,
      cell: ({ getValue }) => formatDateFromTimestamp(getValue()) // Utilisation de la méthode de formatage
    },
    { accessorKey: "countPosts", header: "Post Count", enableHiding: true },
    {
      accessorKey: "actions",
      header: "",
      enableSorting: false,
      enableHiding: false,
      cell: ({ row }) => {
        return h(resolveComponent("AdminTopicItem"), { topic: row.original });
      }
    },
  ];

  defineProps<{topics: Topic[] }>()
</script>

<template>
  <div class="flex flex-col justify-between gap-5 md:flex-row md:items-center">
    <UiInput v-model="search" type="search" placeholder="Search" class="w-full md:w-96" />
    <UiDropdownMenu>
      <UiDropdownMenuTrigger as-child>
        <UiButton variant="outline">
          <span>View</span>
          <Icon name="lucide:chevron-down" class="h-4 w-4" />
        </UiButton>
      </UiDropdownMenuTrigger>
      <UiDropdownMenuContent :side-offset="10" align="start" class="w-[300px] md:w-[200px]">
        <UiDropdownMenuLabel> Toggle Columns </UiDropdownMenuLabel>
        <UiDropdownMenuSeparator />
        <UiDropdownMenuGroup>
          <UiDropdownMenuCheckboxItem
            v-for="column in table?.getAllColumns().filter((column) => column.getCanHide())"
            :key="column.id"
            :checked="column.getIsVisible()"
            @update:checked="tableRef?.toggleColumnVisibility(column)"
          >
            <span class="text-sm capitalize">{{ column?.id }}</span>
          </UiDropdownMenuCheckboxItem>
        </UiDropdownMenuGroup>
      </UiDropdownMenuContent>
    </UiDropdownMenu>
  </div>

  <UiTanStackTable
    ref="tableRef"
    :search="search"
    :data="topics"
    :columns="columns"
    class="mt-5 rounded-md border"
    @ready="table = $event"
  >
    <template #empty>
      <div class="flex w-full flex-col items-center justify-center gap-5 py-5">
        <Icon name="lucide:database" class="h-12 w-12 text-muted-foreground" />
        <span class="mt-2">No data available.</span>
      </div>
    </template>
  </UiTanStackTable>
</template>

<style scoped>

</style>