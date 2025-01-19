<template>
  <UiSidebarProvider v-slot="{ isMobile, state }">
    <!-- App Sidebar -->
    <UiSidebar collapsible="icon">
      <UiSidebarContent>
        <!-- Main -->
        <UiSidebarGroup>
          <UiSidebarGroupLabel label="Platform"/>
          <UiSidebarMenu>
            <template v-for="(item, index) in data.navMain">
              <UiCollapsible
                  v-if="item.items"
                  :key="index"
                  v-slot="{ open }"
                  as-child
              >
                <UiSidebarMenuItem>
                  <UiCollapsibleTrigger as-child>
                    <UiSidebarMenuButton :tooltip="item.title">
                      <Icon mode="svg" :name="item.icon"/>

                      <span>{{ item.title }}</span>
                      <Icon
                          mode="svg"
                          name="lucide:chevron-right"
                          class="ml-auto transition-transform duration-200"
                          :class="[open && 'rotate-90']"
                      />
                    </UiSidebarMenuButton>
                  </UiCollapsibleTrigger>
                  <UiCollapsibleContent>
                    <UiSidebarMenuSub>
                      <UiSidebarMenuSubItem v-for="subItem in item.items" :key="subItem.title">
                        <UiSidebarMenuSubButton as-child>
                          <NuxtLink :href="subItem.url">
                            <span>{{ subItem.title }}</span>
                          </NuxtLink>
                        </UiSidebarMenuSubButton>
                      </UiSidebarMenuSubItem>
                    </UiSidebarMenuSub>
                  </UiCollapsibleContent>
                </UiSidebarMenuItem>
              </UiCollapsible>
              <UiSidebarMenuItem v-else>
                <NuxtLink :href="item.url">
                  <UiSidebarMenuButton>
                    <Icon mode="svg" :name="item.icon"/>
                    <span>{{ item.title }}</span>
                  </UiSidebarMenuButton>
                </NuxtLink>
              </UiSidebarMenuItem>
            </template>
          </UiSidebarMenu>
        </UiSidebarGroup>
      </UiSidebarContent>
      <UiSidebarRail/>
      <!-- Footer-->
      <SidebarFooter/>
    </UiSidebar>
    <!-- Sidebar main content -->
    <UiSidebarInset>
      <!-- Navbar -->
      <UiNavbar sticky class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <UiSidebarTrigger class="-ml-1"/>
        <UiSeparator orientation="vertical" class="mr-2 h-4"/>
        <UiBreadcrumbs :items="breadcrumbStore.breadcrumbs"/>
      </UiNavbar>
      <div class="p-4 flex-auto">
        <slot/>
      </div>
    </UiSidebarInset>
  </UiSidebarProvider>
</template>

<script lang="ts" setup>

import {useBreadcrumbStore} from "~/stores/breadcrumb";
import {useAuthStore} from "~/stores/auth";
import { useUserStore } from "~/stores/user";
import { useAccountStore } from "~/stores/account";

const breadcrumbStore = useBreadcrumbStore()

const router = useRouter()

const authStore = useAuthStore()
const accountStore = useAccountStore()

const logoutDialog = ref(false)

function onLogout() {
  authStore.logout()
  router.push("/login")
}

// This is sample data.
const data = ref({
  user: {
    name: "breezy",
    email: "m@example.com",
    avatar: "https://behonbaker.com/icon.png",
  },
  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: "lucide:house",
    },
    {
      title: "Pets",
      icon: "lucide:dog",
      items: [
        {
          title: "General",
          url: "/pet",
        },
        {
          title: "Memories",
          url: "/pet/memories",
        }
      ],
    },
    {
      title: "Find services",
      url: "/service/find",
      icon: "lucide:search"
    },
    {
      title: "Proposals",
      icon: "lucide:hand-helping",
      items: [
        {
          title: "General",
          url: "/proposals",
        },
        {
          title: "Memories",
          url: "/proposals/memories",
        },
      ],
    },
    {
      title: "My requests",
      icon: "lucide:bell",
      items: [
        {
          title: "Receive",
          icon: "lucide:plane-landing",
          url: "/request/receive",
        },
        {
          title: "Send",
          icon: "lucide:plane-takeoff",
          url: "/request/send",
        },
      ],
    },
    {
      title: "Forum",
      url: "/forum",
      icon: "lucide:message-circle"
    },

  ],
})

const admin = {
    title: "Admin",
    icon: "lucide:crown",
    items: [
      {
        title: "Manage User",
        icon: "lucide:plane-landing",
        url: "/admin/user",
      },
      {
        title: "Manage Vaccine",
        icon: "lucide:plane-takeoff",
        url: "/admin/vaccine",
      },
      {
        title: "Manage Type service",
        icon: "lucide:plane-takeoff",
        url: "/admin/type",
      },
      {
        title: "Manage Badge",
        icon: "lucide:plane-takeoff",
        url: "/admin/badge",
      },
      {
        title: "Manage Specie",
        icon: "lucide:plane-takeoff",
        url: "/admin/specie",
      },
      {
        title: "Moderation Forum",
        icon: "lucide:plane-takeoff",
        url: "/admin/forum",
      },
      {
        title: "Notification",
        icon: "lucide:plane-takeoff",
        url: "/admin/notification",
      },
    ],
}



onMounted(async () => {
  const result = await accountStore.dispatchGet()

  if (!result.success) {
    useSonner.error("Unable to fetch user data...")
  }

  console.log(accountStore.account?.isAdmin)

  if (accountStore.account?.isAdmin) {
    data.value.navMain.push(admin)
  }

})





</script>
