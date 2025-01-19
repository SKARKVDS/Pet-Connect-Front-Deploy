<script setup lang="ts">

  import type { Vaccine } from "~/services/vaccine/types";
  import type { ColumnDef, Table } from "@tanstack/vue-table";
  import { defineProps } from "vue";

  const tableRef = ref();
  const table = ref<Table<Vaccine> | null>(null);
  const search = ref("");

  const columns: ColumnDef<Vaccine>[] = [
    { accessorKey: "name", header: "Name", enableHiding: false },
    {
      accessorKey: "needBooster",
      header: "Need Booster",
      enableHiding: true,
      cell: ({ row }) => {
        const needBooster = row.original.needBooster;
        return h("div", { class: "" }, [
          h(resolveComponent("Icon"), {
            name: needBooster ? "lucide:check-circle" : "lucide:x-circle",
            class: `h-5 w-5 ${needBooster ? "text-green-500" : "text-red-500"}`,
          }),
        ]);
      },
    },
    {
      accessorKey: "actions",
      header: "",
      enableSorting: false,
      enableHiding: false,
      cell: ({ row }) => {
        return h(resolveComponent("AdminVaccineItem"), { vaccine: row.original });
      }
    },
  ];

  defineProps<{vaccines: Vaccine[] }>()
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
    :data="vaccines"
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