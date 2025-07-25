"use client";

import { usePathname } from "next/navigation";
import * as React from "react";
import { Bot, GalleryVerticalEnd, Home, Tickets, User } from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavSecondary } from "./nav-secondary";
import { IconHelp, IconSettings } from "@tabler/icons-react";

const data = {
  user: {
    name: "Alisha Barik",
    email: "barik@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  nav: [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
    },
  ],
  navMain: [
    {
      title: "Customer Support",
      url: "/customer-support/dashboard",
      icon: Tickets,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: "/customer-support/dashboard",
        },
        {
          title: "Open tickets",
          url: "/customer-support/open-tickets",
        },
        {
          title: "Closed tickets",
          url: "/customer-support/closed-tickets",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "User Management",
      url: "/user-management",
      icon: User,
    },
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex justify-start items-center">
                <div className="bg-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-medium text-lg">CollabX</span>
                  {/* <span className="text-xs">A complete solution</span> */}
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="flex flex-col justify-between overflow-hidden">
        <div>
          <NavSecondary items={data.nav} currentPath={pathname} />
          <NavMain items={data.navMain} currentPath={pathname} />
        </div>
        <div>
          <NavSecondary
            items={data.navSecondary}
            className="mt-auto"
            currentPath={pathname}
          />
        </div>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
