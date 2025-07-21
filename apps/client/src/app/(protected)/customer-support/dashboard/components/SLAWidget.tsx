import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import React from "react";

import { ChartRadialText } from "./Test";
import { TicketSummary } from "@/types/ticket";

const SLAWidget: React.FC<TicketSummary> = ({
  totalTickets = 1,
  escalatedTickets = 0,
}) => {
  const escalatedPercentage = (escalatedTickets / totalTickets) * 100;

  return (
    <Card className="@container/card gap-2">
      <CardHeader>
        <CardDescription>SLA Performance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <div>
              <div className="flex items-center gap-2">
                <div className="bg-success h-3 w-3 rounded"></div>
                <span>Within SLA</span>
              </div>
              <span className="text-lg font-bold">
                {100 - escalatedPercentage}%
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <div className="bg-destructive h-3 w-3 rounded"></div>
                <span>SLA Breached</span>
              </div>
              <span className="text-lg font-bold">{escalatedPercentage}%</span>
            </div>
          </div>
          <div>
            <ChartRadialText />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SLAWidget;
