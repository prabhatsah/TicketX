import { apiFetch } from "./api";

export async function login(email: string, password: string) {
  const res = await apiFetch("/auth/signin", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    credentials: "include", // allow cookies to be sent/received
  });

  return res.user;
}

export async function signup(name: string, email: string, password: string) {
  const res = await apiFetch("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
    credentials: "include", // allow cookies to be sent/received
  });

  return res.user;
}
