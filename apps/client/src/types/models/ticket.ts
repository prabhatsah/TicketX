export type TicketPriority = "Low" | "Medium" | "High";
export type TicketStatus =
  | "New"
  | "Assigned"
  | "In_progress"
  | "On_hold"
  | "Resolved"
  | "Closed";
export type TicketType = "Feature" | "Bug" | "Incident";

export interface Ticket {
  id: number;
  ticket_no: number;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  type: TicketType;
  created_at: string;
  issue_date: string;
  closed_at?: string;
}

export interface TicketSummary {
  totalTickets?: number;
  openTickets?: number;
  resolvedTickets?: number;
  escalatedTickets?: number;
}
