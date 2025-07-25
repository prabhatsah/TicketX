import { Role } from "@prisma/client";

export interface Organization {
  id: string;
  name: string;
}

export interface OrgSummary {
  id: string;
  name: string;
  role: Role;
}
