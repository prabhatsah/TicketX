import { AppSidebar } from "@/components/app-sidebar";
import { Breadcrumbs } from "@/components/breadcrumbs";

import { GlobalSpinner } from "@/components/global-spinner";
import { OrgSwitcher } from "@/components/org-switcher";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { LoadingProvider } from "@/context/LoadingContext";
import { Bell } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LoadingProvider>
      <GlobalSpinner />
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-background ">
          <header className="sticky top-0 z-50 bg-background border-b flex h-[3.5rem] mt-1 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper">
            <div className="flex justify-between w-full">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
                <Breadcrumbs />
              </div>
              <div className="mr-7 flex items-center gap-5 pt">
                <OrgSwitcher />
                <Bell />
              </div>
            </div>
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </LoadingProvider>
  );
}
