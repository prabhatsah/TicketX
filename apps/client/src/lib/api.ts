const API_URL = process.env.NEXT_PUBLIC_API_URL;
console.log(API_URL);

export async function apiFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include", //must for cookies
  });

  if (res.status === 401) {
    if (typeof window !== "undefined") {
      window.location.href = "/signin";
    }
    throw new Error("Unauthorized");
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Something went wrong");
  }

  return data;
}
