"use client";

import { usePathname } from "next/navigation";
import * as React from "react";
import {
  Bot,
  Crown,
  GalleryVerticalEnd,
  Home,
  Tickets,
  User,
} from "lucide-react";
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
  SidebarMenuSkeleton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavSecondary } from "./nav-secondary";
import { IconHelp, IconSettings } from "@tabler/icons-react";

import { useSession } from "@/context/session-context";
import { BoxSpinner } from "./BoxSpinner";

// const data1 = {
//   user: {
//     name: "Alisha Barik",
//     email: "barik@gmail.com",
//     avatar: "/avatars/shadcn.jpg",
//   },
//   nav: [
//     {
//       title: "Dashboard",
//       url: "/",
//       icon: Home,
//     },
//   ],
//   navMain: [
//     {
//       title: "Customer Support",
//       url: "/customer-support/dashboard",
//       icon: Tickets,
//       isActive: true,
//       items: [
//         {
//           title: "Dashboard",
//           url: "/customer-support/dashboard",
//         },
//         {
//           title: "Open tickets",
//           url: "/customer-support/open-tickets",
//         },
//         {
//           title: "Closed tickets",
//           url: "/customer-support/closed-tickets",
//         },
//       ],
//     },
//     {
//       title: "Models",
//       url: "#",
//       icon: Bot,
//       items: [
//         {
//           title: "Genesis",
//           url: "#",
//         },
//         {
//           title: "Explorer",
//           url: "#",
//         },
//         {
//           title: "Quantum",
//           url: "#",
//         },
//       ],
//     },
//   ],
//   navSecondary: [
//     {
//       title: "User Management",
//       url: "/user-management",
//       icon: User,
//     },
//     {
//       title: "Settings",
//       url: "#",
//       icon: IconSettings,
//     },
//     {
//       title: "Get Help",
//       url: "#",
//       icon: IconHelp,
//     },
//   ],
// };

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { session, isLoading: sessionLoading } = useSession();

  const pathname = usePathname();

  if (sessionLoading || !session?.userInfo) {
    return (
      <>
        <div className="p-2 w-64 border-r"></div>
        <BoxSpinner />
      </>
    );
  }
  const isAdmin = session?.currentOrg?.role === "ADMIN";

  const data = {
    user: {
      name: session?.userInfo?.name,
      email: session?.userInfo?.email,
      avatar: "/avatars/shadcn.jpg",
    },
    nav: [
      {
        title: "Home",
        url: "/home",
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
      ...(isAdmin
        ? [
            {
              title: "User Management",
              url: "/user-management",
              icon: User,
            },
          ]
        : []),
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

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex justify-start items-end">
                <div className="bg-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col  items-center">
                  <span className="font-medium text-lg ">
                    CollabX
                    <span className="ms-2 text-[12px] border-2 px-2 rounded-sm ">
                      {session?.currentOrg?.role}
                    </span>
                  </span>
                  <span className="text-xs flex items-center ">
                    {/* A complete app */}
                  </span>
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
