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

interface TypePieChartProps {
  typeDist: DashboardSummaryResponse["typeDist"];
}

export function TypeChart({ typeDist }: TypePieChartProps) {
  const total = typeDist.reduce((sum, s) => sum + s._count, 0);

  const typeColors: Record<string, string> = {
    Bug: "var(--chart-1)",
    Incident: "var(--chart-2)",
    Feature: "var(--chart-3)",
  };

  const chartData = typeDist.map(({ type, _count }) => ({
    type,
    count: _count,
    fill: typeColors[type] ?? "var(--default)",
  }));

  const chartConfig: ChartConfig = chartData.reduce(
    (acc, item) => {
      acc[item.type] = {
        label: item.type.replaceAll("_", " "),
        color: item.fill,
      };
      return acc;
    },
    {
      count: { label: "type" },
    } as ChartConfig
  );

  return (
    <Card className="flex flex-col w-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Type-Ticket Distribution</CardTitle>
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
                dataKey="type"
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
          {chartData.map((item) => {
            const percentage = Math.round((item.count / total) * 100);
            return (
              <div key={item.type} className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded"
                  style={{ backgroundColor: item.fill }}
                />
                <span>
                  {chartConfig[item.type]?.label} - {percentage}%
                </span>
              </div>
            );
          })}
        </div>
      </CardFooter>
    </Card>
  );
}
