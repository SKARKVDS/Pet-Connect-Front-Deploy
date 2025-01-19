<script setup lang="ts">

defineProps({
  isMobile: Boolean
})

</script>

<template>
  <UiSidebarMenuItem>
    <UiDropdownMenu>
      <UiDropdownMenuTrigger as-child>
        <UiSidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <slot name="trigger"/>
          <Icon name="lucide:chevrons-up-down" class="ml-auto size-4"/>
        </UiSidebarMenuButton>
      </UiDropdownMenuTrigger>
      <slot name="content"/>
    </UiDropdownMenu>
    <slot name="dialog"/>
  </UiSidebarMenuItem>
</template>
