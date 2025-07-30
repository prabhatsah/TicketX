import { apiFetch } from "@/lib/api";

export const removeUserFromOrg = async (userId: string) => {
  try {
    const res = await apiFetch(`/api/users/${userId}`, {
      method: "DELETE",
    });

    return res;
  } catch (err) {
    console.log("user removal failed", err.message);
    throw err;
  }
};
