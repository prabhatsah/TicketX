import { useSession } from "@/context/session-context";
import { User } from "@shared/models/user";
import { useEffect, useState } from "react";

interface UseOrgUsersResult {
  users: User[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export function useOrgUsers(): UseOrgUsersResult {
  const { session, isLoading: sessionLoading, refreshSession } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    if (!session) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${baseUrl}/api/org/users`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`Failed to load users (${res.status})`);
      }

      const json = (await res.json()) as {
        success: true;
        data: { users: User[] };
      };
      setUsers(json.data.users);
    } catch (error) {
      console.error("useOrgUsers error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!sessionLoading) {
      fetchUsers();
    }
  }, [session, sessionLoading]);

  return {
    users,
    loading: sessionLoading || loading,
    error,
    refresh: async () => {
      await refreshSession();
      await fetchUsers();
    },
  };
}
