"use client";
import { SectionCards } from "@/components/section-cards";
import { DataTable } from "./components/data-table-modifiled";

import data from "../data.json";
import { useSession } from "@/hooks/use-session";

const Page = () => {
  const { session, setSelectedOrg, isLoading } = useSession();
  console.log("session in open ticket - ", session);

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-2 md:gap-6 md:py-2">
          <SectionCards />
        </div>
        <div className="px-4 py-2">
          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
};

export default Page;
