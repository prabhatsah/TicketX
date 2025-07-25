"use client";

import { useState } from "react";
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
import { useSession } from "@/hooks/use-session";

const organizations = [
  { id: "1", name: "Acme Corp", role: "Admin" },
  { id: "2", name: "TechStart Inc", role: "Member" },
  { id: "3", name: "Global Solutions", role: "Manager" },
];

export function OrgSwitcher() {
  //const [selectedOrg, setSelectedOrg] = useState(organizations[0]);
  const { session, setSelectedOrg, isLoading } = useSession();
  console.log("session - ", session);

  if (isLoading || !session) return null;

  const { organizations, org: selectedOrg } = session;

  // const handleOrgSwitch = (org: OrgSummary) => {
  //   if (org.id !== selectedOrg.id) {
  //     setSelectedOrg(org.id);
  //   }
  // };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-[200px] justify-between bg-transparent"
        >
          <div className="flex items-center">
            <Building2 className="mr-2 h-4 w-4" />
            <span className="truncate">{selectedOrg?.name}</span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]" align="end">
        <DropdownMenuLabel>Organizations</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {organizations?.map((org) => (
          <DropdownMenuItem
            key={org.id}
            onClick={() => setSelectedOrg(org)}
            className="flex items-center justify-between"
          >
            <div className="flex items-center">
              <Building2 className="mr-2 h-4 w-4" />
              <div>
                <div className="font-medium">{org.name}</div>
                <div className="text-xs text-muted-foreground">{org.role}</div>
              </div>
            </div>
            {selectedOrg.id === org.id && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
