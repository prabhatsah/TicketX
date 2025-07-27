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

interface StatusPieChartProps {
  statusDist: DashboardSummaryResponse["statusDist"];
}

export function StatusChart({ statusDist }: StatusPieChartProps) {
  const total = statusDist.reduce((sum, s) => sum + s._count, 0);

  const statusColors: Record<string, string> = {
    New: "var(--chart-1)",
    In_progress: "var(--chart-2)",
    Resolved: "var(--chart-3)",
    Assigned: "var(--chart-4)",
  };

  const chartData = statusDist.map(({ status, _count }) => ({
    status,
    count: _count,
    fill: statusColors[status] ?? "var(--default)",
  }));

  const chartConfig: ChartConfig = chartData.reduce(
    (acc, item) => {
      acc[item.status] = {
        label: item.status.replaceAll("_", " "),
        color: item.fill,
      };
      return acc;
    },
    {
      count: { label: "Status" },
    } as ChartConfig
  );

  return (
    <Card className="flex flex-col w-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Status-Ticket Distribution</CardTitle>
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
                dataKey="status"
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
      <CardFooter className="flex-col  gap-2 text-sm">
        <div>
          {chartData.map((item) => {
            const percentage = Math.round((item.count / total) * 100);
            return (
              <div key={item.status} className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded"
                  style={{ backgroundColor: item.fill }}
                />
                <span>
                  {chartConfig[item.status]?.label} - {percentage}%
                </span>
              </div>
            );
          })}
        </div>
      </CardFooter>
    </Card>
  );
}
