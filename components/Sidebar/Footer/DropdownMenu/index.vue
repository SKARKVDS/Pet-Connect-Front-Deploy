<script setup lang="ts">

defineProps({
  isMobile: Boolean
})

</script>

<template>
  <UiDropdownMenuContent
      class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
      :side="isMobile ? 'bottom' : 'right'"
      :side-offset="4"
      align="end"
  >
    <UiDropdownMenuLabel class="p-0 font-normal">
      <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
        <slot name="label"/>
      </div>
    </UiDropdownMenuLabel>
    <UiDropdownMenuSeparator/>
    <UiDropdownMenuGroup>
      <slot name="item"/>
    </UiDropdownMenuGroup>
    <UiDropdownMenuSeparator/>
    <slot name="footer"/>
  </UiDropdownMenuContent>
</template>