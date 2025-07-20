"use client";

import { ChartAreaInteractive } from "@/components/chart-area-interactive";

import { TopCards } from "./components/TopCards";
import { SeverityChart } from "./components/SeverityChart";
import { TypeChart } from "./components/TypeChart";
import { StatusChart } from "./components/StatusChart";

import { useEffect, useState } from "react";
import { useLoading } from "@/context/LoadingContext";
import { fetchDashboardSummary } from "@/services/dashboard";

export default function Page() {
  const [data, setData] = useState<any>(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetchDashboardSummary();
        setData(res);
        console.log("Data - ", res);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [setLoading]);

  if (!data) return null;

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-2 md:gap-6 md:py-2">
          <TopCards />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          <div className="flex w-full gap-4 justify-between px-4 lg:px-6">
            <SeverityChart />
            <TypeChart />
            <StatusChart />
          </div>
        </div>
      </div>
    </div>
  );
}
