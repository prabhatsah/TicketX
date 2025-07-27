"use client";

import { apiFetch } from "@/lib/api";
import { isAuthPage } from "@/lib/utils";
import { SessionUser } from "@shared/api/auth";
import { OrgSummary } from "@shared/models/org";

import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface SessionData {
  userInfo: SessionUser;
  currentOrg: OrgSummary;
  organizations: OrgSummary[];
}

interface SessionContextType {
  session: SessionData | null;
  isLoading: boolean;
  refreshSession: () => Promise<void>;
  setSelectedOrg: (orgId: string) => Promise<void>;
  setSwitchOrg: (orgId: string) => Promise<void>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState<SessionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSession = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${baseUrl}/api/auth/me`, {
        credentials: "include",
      });

      if (res.ok) {
        const json = await res.json();
        setSession(json.data);
      } else {
        if (res.status === 401 && typeof window !== "undefined") {
          toast.dismiss();
          toast.error("Session expired.", {
            description: "Redirecting to login...",
          });

          setTimeout(() => {
            window.location.href = "/signin";
          }, 2500); // Delay for toast
        }
        setSession(null);
      }
    } catch (err) {
      setSession(null);
    } finally {
      setIsLoading(false);
    }
  };

  const setSelectedOrg = async (orgId: string) => {
    try {
      // const response = await fetch(`${baseUrl}/api/auth/select-org`, {
      //   method: "POST",
      //   credentials: "include",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ orgId }),
      // });

      // if (!response.ok) {
      //   throw new Error(
      //     `Failed to switch organization: ${response.statusText}`
      //   );
      // }
      await apiFetch("/api/auth/select-org", {
        method: "POST",
        body: JSON.stringify({ orgId }),
      });

      await new Promise((r) => setTimeout(r, 200)); //short wait to let cookie settle
      await fetchSession();
    } catch (error) {
      console.error("Error switching organization:", error);
      throw error; // Re-throw to handle in component
    }
  };

  const setSwitchOrg = async (orgId: string) => {
    try {
      // const res = await fetch(`${baseUrl}/api/auth/switch-org`, {
      //   method: "POST",
      //   credentials: "include",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ orgId }),
      // });

      // if (!res.ok) {
      //   throw new Error(`Failed to switch organization: ${res.statusText}`);
      // }

      await apiFetch("/api/auth/switch-org", {
        method: "POST",
        body: JSON.stringify({ orgId }),
      });

      await new Promise((r) => setTimeout(r, 200)); //short wait to let cookie settle
      await fetchSession();
    } catch (error) {
      console.error("Error switching organization:", error);
      throw error; // Re-throw to handle in component
    }
  };

  useEffect(() => {
    // if (window.location.pathname === "/signin") return;
    if (isAuthPage()) return;
    fetchSession();
  }, []);

  const contextValue: SessionContextType = {
    session,
    isLoading,
    refreshSession: fetchSession,
    setSelectedOrg,
    setSwitchOrg,
  };

  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within SessionProvider");

  return ctx;
};
