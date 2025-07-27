// server/src/controllers/orgController.ts
import { Request, Response } from "express";
import { Prisma } from "../prisma";
import { APIError, SuccessResponse } from "@/index";

export async function getOrgUsers(req: Request, res: Response) {
  try {
    const organizationId = req.userInfo?.orgId;

    if (!organizationId) {
      return res
        .status(400)
        .json({ error: "Organization not selected" } satisfies APIError);
    }

    const users = await Prisma.user.findMany({
      where: {
        memberships: {
          some: { organizationId },
        },
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        memberships: {
          where: { organizationId },
          select: {
            role: true,
          },
        },
      },
    });

    const formattedUsers = users.map((user) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      role: user.memberships[0]?.role ?? "USER",
    }));

    return res.json({
      success: true,
      data: { users: formattedUsers },
      message: "Users fetched",
    } satisfies SuccessResponse<{ users: typeof formattedUsers }>);
  } catch (error: any) {
    return res.status(500).json({
      error: "Failed to fetch organization users",
      message: error.message,
    } satisfies APIError);
  }
}
