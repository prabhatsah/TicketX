import { Role } from "@prisma/client";
import { MonitorCog, Eye, Crown } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isAuthRoute(path: string) {
  return path === "/signin" || path === "/signup";
}

export function roleHelper(role: Role): {
  color: string;
  icon: string;
} {
  const roleStruc = {
    ADMIN1: {
      color: "destructive",
      icon: <Crown />,
      value: "ADMIN",
    },
    ADMIN: {
      color: "warning",
      icon: <MonitorCog />,
      value: "SUPPORT",
    },
    USER: {
      color: "muted",
      icon: <Eye />,
      value: "USER",
    },
  } as const;

  return roleStruc[role as keyof typeof roleStruc];
}

export const isAuthPage = () =>
  ["/signin", "/signup", "/forgot-password"].includes(window.location.pathname);
