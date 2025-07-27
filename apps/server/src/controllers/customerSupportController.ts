import { Request, Response } from "express";
import { Prisma } from "../prisma";
import { subDays, startOfDay } from "date-fns";
import { APIError } from "@/api/api";

type RawTicketPerDay = {
  date: Date;
  count: bigint;
};

export const getDashboardSummary = async (req: Request, res: Response) => {
  try {
    const [totalTickets, openTickets, resolvedTickets] = await Promise.all([
      Prisma.ticket.count(),
      Prisma.ticket.count({
        where: {
          status: {
            in: ["New", "Assigned", "In_progress", "On_hold"],
          },
        },
      }),
      Prisma.ticket.count({
        where: {
          status: {
            in: ["Resolved", "Closed"],
          },
        },
      }),
    ]);

    //tickets per day (last 90 days)
    const startDate = subDays(new Date(), 90);

    const rawTicketsPerDay = await Prisma.$queryRaw<
      RawTicketPerDay[]
    >`select DATE_TRUNC('day'::text, "created_at"::timestamptz) as date, COUNT(*) as count from ticket where "created_at" >= ${startDate} GROUP BY 
    DATE_TRUNC('day'::text, "created_at"::timestamptz) ORDER BY date ASC`;

    // Convert BigInt to Number
    const ticketsPerDay = rawTicketsPerDay.map((row: any) => ({
      ...row,
      count: Number(row.count),
    }));

    //severity/priority distribution
    const priorityDist = await Prisma.ticket.groupBy({
      by: ["priority"],
      _count: true,
    });

    //type distribution
    const typeDist = await Prisma.ticket.groupBy({
      by: ["type"],
      _count: true,
    });

    //status distribution
    const statusDist = await Prisma.ticket.groupBy({
      by: ["status"],
      _count: true,
    });

    res.json({
      totalTickets,
      openTickets,
      resolvedTickets,
      ticketsPerDay,
      priorityDist,
      typeDist,
      statusDist,
    });
  } catch (error) {
    res.status(500).json(<APIError>{ message: "Internal server error" });
  }
};
