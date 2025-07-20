import { apiFetch } from "@/lib/api";

export async function fetchDashboardSummary() {
  return apiFetch<{
    totalTickets: number;
    openTickets: number;
    resolvedTickets: number;
    ticketsPerDay: { date: string; count: number }[];
    severityDist: { priority: string; _count: number }[];
    typeDist: { type: string; _count: number }[];
    statusDist: { status: string; _count: number }[];
  }>("/api/customer-support/dashboard-summary");
}
