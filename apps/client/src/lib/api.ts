import { toast } from "sonner";

export class SessionExpiredError extends Error {
  constructor() {
    super("Session expired");
    this.name = "SessionExpiredError";
  }
}

let sessionExpired = false;

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

  if (res.status === 401 && typeof window !== "undefined") {
    if (!sessionExpired) {
      sessionExpired = true;

      toast.dismiss();
      toast.error("Session expired.", {
        description: "Redirecting to login...",
      });

      setTimeout(() => {
        window.location.href = "/signin";
      }, 2500);
    }
    throw new SessionExpiredError();
  }

  // Try to extract JSON error
  // let errorMessage = `API error ${res.status}`;
  // try {
  //   const json = await res.json();
  //   if (json?.error) errorMessage = json.error;
  // } catch {
  //   const text = await res.text();
  //   if (text) errorMessage = text;
  // }

  // const error = new Error(errorMessage);
  // (error as any).status = res.status;
  // throw error;

  if (!res.ok) {
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
