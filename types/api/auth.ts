import { Role } from "@prisma/client";

import { Organization, OrgSummary } from "@/models/org";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  requiresOrgSelection?: boolean;
  user: {
    id: string;
    email: string;
    name: string;
  };
  organization?: OrgSummary;
  organizations?: OrgSummary[];
  message?: string;
}

export interface JwtPayload {
  userId: string;
  name?: string;
  email: string;
  orgId: string;
  orgName?: string;
  role: Role;
}

export interface SessionUser extends JwtPayload {
  name: string;
}

//for sign-in
export interface LoginResponseMultiOrg {
  requiresOrgSelection: true;
  user: SessionUser;
  organizations: Organization[];
}

export interface LoginResponseSingleOrg {
  requiresOrgSelection: false;
  user: SessionUser;
  organization: Organization;
}

export type LoginResult = LoginResponseMultiOrg | LoginResponseSingleOrg;
