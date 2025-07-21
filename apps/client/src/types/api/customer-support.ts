export interface DashboardSummaryResponse {
  totalTickets: number;
  openTickets: number;
  resolvedTickets: number;
  ticketsPerDay: { date: string; count: number }[];
  priorityDist: { priority: string; _count: number }[];
  typeDist: { type: string; _count: number }[];
  statusDist: { status: string; _count: number }[];
}
