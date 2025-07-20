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

const TotalTicketsWidget = () => {
  return (
    <Card className="@container/card flex flex-col justify-between">
      <CardHeader>
        <CardDescription>Total Tickets</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          565
        </CardTitle>
        <CardAction>
          <Badge variant="outline">
            <IconTrendingUp />
            +12.5%
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="flex w-full">
          <div className="bg-success h-2 w-[20%] rounded-l-full"></div>
          <div className="bg-warning h-2 w-[50%]"></div>
          <div className="bg-destructive h-2 w-[30%] rounded-r-full"></div>
        </div>
        <div className="flex justify-between w-full">
          <div>
            <span>20%</span>
            <div className="flex items-center gap-2">
              <div className="bg-success h-3 w-3 rounded"></div>
              <span>Resolved</span>
            </div>
          </div>
          <div>
            <span>50%</span>
            <div className="flex items-center gap-2">
              <div className="bg-warning h-3 w-3 rounded"></div>
              <span>Open</span>
            </div>
          </div>
          <div>
            <span>30%</span>
            <div className="flex items-center gap-2">
              <div className="bg-destructive h-3 w-3 rounded"></div>
              <span>Escalated</span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TotalTicketsWidget;
