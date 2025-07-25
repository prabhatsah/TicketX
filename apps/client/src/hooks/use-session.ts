import { apiFetch } from "@/lib/api";
import { usePathname } from "next/navigation";
import useSWR from "swr";

import type { SessionUser } from "@shared/api/auth";
import type { SuccessResponse } from "@shared/api/api";
import { OrgSummary } from "@shared/models/org";

interface SessionResponse
  extends SuccessResponse<{
    user: SessionUser;
    org: OrgSummary;
    organizations: OrgSummary[];
  }> {}

export function useSession() {
  const pathname = usePathname();

  const isAuthPage = pathname === "/signin" || pathname === "/signup";

  const { data, mutate, isLoading } = useSWR<SessionResponse>(
    !isAuthPage ? "/api/auth/me" : null,
    () => apiFetch<SessionResponse>("/api/auth/me")
  );
  console.log("from session - ", data);

  const setSession = async (session: { user: any; org: any }) => {
    console.log("Orgselected and session set", session);

    await apiFetch("/api/auth/select-org", {
      method: "POST",
      body: JSON.stringify({ orgId: session.org.id }),
    });
    await mutate(); // refresh session from server
  };

  const setSelectedOrg = async (orgId: string) => {
    await apiFetch("/api/auth/switch-org", {
      method: "POST",
      body: JSON.stringify({ orgId }),
    });
    await mutate(); // Refresh session from server
  };

  return {
    session: data,
    isLoading,
    setSession,
    mutateSession: mutate,
    setSelectedOrg,
  };
}
