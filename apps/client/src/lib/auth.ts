import { apiFetch } from "./api";

export async function login(email: string, password: string) {
  const res = await apiFetch("/api/auth/signin", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    credentials: "include", // allow cookies to be sent/received
  });

  return res.user;
}

export async function signup(name: string, email: string, password: string) {
  const res = await apiFetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
    credentials: "include", // allow cookies to be sent/received
  });

  return res.user;
}

export async function logout() {
  const res = await apiFetch("/api/auth/logout", {
    method: "GET",
  });
  console.log(res);
}
