import { TicketSummary } from "@/types";
import SLAWidget from "./SLAWidget";
import TotalTicketsWidget from "./TotalTicketsWidget";

export function TopCards(props: TicketSummary) {
  return (
    // <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
    <div className="flex gap-4 mx-5">
      <TotalTicketsWidget
        totalTickets={props.totalTickets}
        openTickets={props.openTickets}
        resolvedTickets={props.resolvedTickets}
        escalatedTickets={props.escalatedTickets}
      />
      <SLAWidget
        totalTickets={props.totalTickets}
        escalatedTickets={props.escalatedTickets}
      />
    </div>
  );
}
