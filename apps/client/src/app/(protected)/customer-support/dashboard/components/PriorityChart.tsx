"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { DashboardSummaryResponse } from "@/types";

export const description = "A pie chart with a label list";

interface PriorityPieChartProps {
  priorityDist: DashboardSummaryResponse["priorityDist"];
}

export function PriorityChart({ priorityDist }: PriorityPieChartProps) {
  console.log(priorityDist);

  const total = priorityDist?.reduce((sum, s) => sum + s._count, 0);

  const priorityColors: Record<string, string> = {
    Low: "var(--chart-1)",
    Medium: "var(--chart-2)",
    High: "var(--chart-3)",
  };

  const chartData = priorityDist?.map(({ priority, _count }) => ({
    priority,
    count: _count,
    fill: priorityColors[priority] ?? "var(--default)",
  }));

  const chartConfig: ChartConfig = chartData?.reduce(
    (acc, item) => {
      acc[item.priority] = {
        label: item.priority.replaceAll("_", " "),
        color: item.fill,
      };
      return acc;
    },
    {
      count: { label: "priority" },
    } as ChartConfig
  );

  return (
    <Card className="flex flex-col w-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Priority-Ticket Distribution</CardTitle>
        <CardDescription>All time data</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="count" hideLabel />}
            />
            <Pie data={chartData} dataKey="count">
              <LabelList
                dataKey="priority"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div>
          {chartData?.map((item) => {
            const percentage = Math.round((item.count / total) * 100);
            return (
              <div key={item.priority} className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded"
                  style={{ backgroundColor: item.fill }}
                />
                <span>
                  {chartConfig[item.priority]?.label} - {percentage}%
                </span>
              </div>
            );
          })}
        </div>
      </CardFooter>
    </Card>
  );
}
