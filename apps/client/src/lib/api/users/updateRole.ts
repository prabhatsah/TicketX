import { Role } from "@prisma/client";
import { apiFetch } from "../../api";

export const updateRole = async (userId: string, role: Role) => {
  try {
    const res = await apiFetch(`/api/users/${userId}/role`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });

    return res;
  } catch (err: any) {
    console.log("Role update failed", err.message);
  }
};
