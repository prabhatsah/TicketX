import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { IconTrendingUp } from "@tabler/icons-react";

const TotalTicketsWidget = ({
  totalTickets = 1,
  openTickets = 0,
  resolvedTickets = 0,
  escalatedTickets = 0,
}) => {
  const resolvedPercentage = Math.floor((resolvedTickets / totalTickets) * 100);
  const openPercentage = Math.ceil((openTickets / totalTickets) * 100);
  const escalatedPercentage = (escalatedTickets / totalTickets) * 100;

  return (
    <div className="flex-1">
      <Card className="@container/card flex flex-col justify-between">
        <CardHeader>
          <CardDescription>Total Tickets</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalTickets}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex w-full overflow-hidden h-2">
            {resolvedPercentage > 0 && (
              <div
                className={`bg-success h-2`}
                style={{
                  width: `${resolvedPercentage}%`,
                  borderTopLeftRadius: "9999px",
                  borderBottomLeftRadius: "9999px",
                  borderTopRightRadius:
                    openPercentage === 0 && escalatedPercentage === 0
                      ? "9999px"
                      : "",
                  borderBottomRightRadius:
                    openPercentage === 0 && escalatedPercentage === 0
                      ? "9999px"
                      : "",
                }}
              />
            )}
            {openPercentage > 0 && (
              <div
                className={`bg-warning h-2`}
                style={{
                  width: `${openPercentage}%`,
                  borderTopLeftRadius: resolvedPercentage === 0 ? "9999px" : "",
                  borderBottomLeftRadius:
                    resolvedPercentage === 0 ? "9999px" : "",
                  borderTopRightRadius:
                    escalatedPercentage === 0 ? "9999px" : "",
                  borderBottomRightRadius:
                    escalatedPercentage === 0 ? "9999px" : "",
                }}
              />
            )}
            {escalatedPercentage > 0 && (
              <div
                className={`bg-destructive h-2`}
                style={{
                  width: `${escalatedPercentage}%`,
                  borderTopLeftRadius:
                    resolvedPercentage === 0 && openPercentage === 0
                      ? "9999px"
                      : "",
                  borderBottomLeftRadius:
                    resolvedPercentage === 0 && openPercentage === 0
                      ? "9999px"
                      : "",
                  borderTopRightRadius: "9999px",
                  borderBottomRightRadius: "9999px",
                }}
              />
            )}
          </div>

          <div className="flex justify-between w-full">
            <div>
              <span>{resolvedPercentage}%</span>
              <div className="flex items-center gap-2">
                <div className="bg-success h-3 w-3 rounded"></div>
                <span>Resolved</span>
              </div>
            </div>
            <div>
              <span>{openPercentage}%</span>
              <div className="flex items-center gap-2">
                <div className="bg-warning h-3 w-3 rounded"></div>
                <span>Open</span>
              </div>
            </div>
            <div>
              <span>{escalatedPercentage}%</span>
              <div className="flex items-center gap-2">
                <div className="bg-destructive h-3 w-3 rounded"></div>
                <span>Escalated</span>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TotalTicketsWidget;
