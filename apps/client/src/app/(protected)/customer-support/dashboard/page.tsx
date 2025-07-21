"use client";

import { ChartAreaInteractive } from "@/components/chart-area-interactive";

import { TopCards } from "./components/TopCards";
import { PriorityChart } from "./components/PriorityChart";
import { TypeChart } from "./components/TypeChart";
import { StatusChart } from "./components/StatusChart";

import { useEffect } from "react";
import { useLoading } from "@/context/LoadingContext";
import { useDashboardSummary } from "@/hooks/useDashboardSummary";

export default function Page() {
  const { data, error, isLoading } = useDashboardSummary();
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  if (error) return <p>Error loading data</p>;
  if (!data) return null;

  const {
    totalTickets,
    openTickets,
    resolvedTickets,
    ticketsPerDay,
    priorityDist,
    typeDist,
    statusDist,
  } = data;

  const escalatedTickets = 0;

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-2 md:gap-6 md:py-2">
          <TopCards
            totalTickets={totalTickets}
            openTickets={openTickets}
            resolvedTickets={resolvedTickets}
            escalatedTickets={escalatedTickets}
          />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive ticketsPerDay={ticketsPerDay} />
          </div>
          <div className="flex w-full gap-4 justify-between px-4 lg:px-6">
            <PriorityChart priorityDist={priorityDist} />
            <TypeChart typeDist={typeDist} />
            <StatusChart statusDist={statusDist} />
          </div>
        </div>
      </div>
    </div>
  );
}
