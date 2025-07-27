import { toast } from "sonner";

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const res = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    credentials: "include", // Important for secure cookie auth
  });

  if (!res.ok) {
    if (res.status === 401) {
      if (typeof window !== "undefined") {
        // Prevent multiple toasts
        toast.dismiss();
        toast.error("Session expired.", {
          description: "Redirecting to login page.",
        });

        setTimeout(() => {
          window.location.href = "/signin";
        }, 2500); // give time for toast to show
      }
    }

    // Try to extract JSON error
    let errorMessage = `API error ${res.status}`;
    try {
      const json = await res.json();
      if (json?.error) errorMessage = json.error;
    } catch {
      const text = await res.text();
      if (text) errorMessage = text;
    }

    const error = new Error(errorMessage);
    (error as any).status = res.status;
    throw error;
  }

  const data = await res.json();

  return data;
}
