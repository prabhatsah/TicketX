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

  // console.log("api fetch with endpoint - ", endpoint);
  // console.log("api fetch with data - ", res);
  // const d = await res.json();
  // console.log("api fetch with data1 - ", d);

  // if (!res.ok) {
  //   if (res.status === 401) {
  //     if (typeof window !== "undefined") {
  //       // Prevent multiple toasts
  //       toast.dismiss();
  //       toast.error("Session expired.", {
  //         description: "Redirecting to login page.",
  //       });

  //       setTimeout(() => {
  //         window.location.href = "/signin";
  //       }, 2500); // give time for toast to show
  //     }
  //   }
  //   const errorText = await res.text();
  //   throw new Error(`API error ${res.status}: ${errorText}`);
  // }

  const data = await res.json();

  return data;
  //return res;
}
