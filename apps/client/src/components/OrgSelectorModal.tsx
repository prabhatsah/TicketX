"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { OrgSummary } from "@shared/models/org";

interface OrgSelectorModalProps {
  isOpen: boolean;
  organizations: OrgSummary[];
  onSelect: (org: OrgSummary) => void;
  onClose: (open: boolean) => void;
}

export default function OrgSelectorModal({
  isOpen,
  organizations,
  onSelect,
  onClose,
}: OrgSelectorModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select your organization</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          {organizations.map((org) => (
            <Button key={org.id} onClick={() => onSelect(org)}>
              {org.name} ({org.role})
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
