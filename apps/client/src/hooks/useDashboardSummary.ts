import useSWR from "swr";
import { apiFetch } from "@/lib/api";
import { DashboardSummaryResponse } from "@/types/api/customer-support";

const fetchDashboardSummary = () =>
  apiFetch<DashboardSummaryResponse>("/api/customer-support/dashboard-summary");

export function useDashboardSummary() {
  const { data, error, isLoading } = useSWR<DashboardSummaryResponse>(
    "/api/customer-support/dashboard-summary",
    fetchDashboardSummary
  );

  return {
    data,
    error,
    isLoading,
  };
}
