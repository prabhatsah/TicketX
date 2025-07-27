"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Building2, Check, ChevronsUpDown } from "lucide-react";
import { OrgSummary } from "@shared/models/org";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "@/context/session-context";

export function OrgSwitcher() {
  const router = useRouter();
  const { session, setSwitchOrg, isLoading } = useSession();

  const currentOrg = session?.currentOrg;
  const sortedOrgs = session?.organizations;

  const handleOrgSwitch = async (org: OrgSummary) => {
    if (!currentOrg || org.id === currentOrg.id) return;

    try {
      await setSwitchOrg(org.id); //  Switch org on server and update session
      toast.success("Organisation switched", {
        description: `Switched to ${org?.name}`,
      });
      router.refresh(); //  Reload current route to reflect changes
    } catch (err: any) {
      console.log(err);
      toast.error("Orgnization switch failed!", {
        description: err.message || "An unexpected error occurred",
      });
    }
  };

  if (isLoading || !currentOrg || !sortedOrgs) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-[200px] justify-between bg-transparent"
          aria-label="Switch organization"
        >
          <div className="flex items-center">
            <Building2 className="mr-2 h-4 w-4" />
            <span className="truncate">{currentOrg?.name}</span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]" align="end">
        <DropdownMenuLabel>Organizations</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {sortedOrgs?.map((org) => (
          <DropdownMenuItem
            key={org.id}
            onClick={() => handleOrgSwitch(org)}
            className="flex items-center justify-between"
          >
            <div className="flex items-center">
              <Building2 className="mr-2 h-4 w-4" />
              <div>
                <div className="font-medium">{org.name}</div>
                <div className="text-xs text-muted-foreground">{org.role}</div>
              </div>
            </div>
            {currentOrg?.id === org.id && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
