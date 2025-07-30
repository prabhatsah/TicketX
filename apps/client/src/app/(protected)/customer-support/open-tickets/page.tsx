"use client";
import { SectionCards } from "@/components/section-cards";
import { DataTable, OpenTicketTable } from "./components/data-table-modifiled";

import data from "../data.json";
import TicketsTable from "./components/ticketsTable";

const Page = () => {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-2 md:gap-6 md:py-2">
          <SectionCards />
        </div>
        <div className="px-4 py-2">
          <OpenTicketTable data={data} />
        </div>
      </div>
    </div>
  );
};

export default Page;
