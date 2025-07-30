import { Role } from "@prisma/client";
import { Request, Response } from "express";
import { Prisma } from "../prisma";

export async function updateUserRole(req: Request, res: Response) {
  const { role } = req.body as { role?: Role };
  const { userId } = req.params;

  //console.log("req.userInfo in userController", req.params.userId);

  const orgId = req.userInfo.orgId;

  if (!userId || !role || !orgId) {
    return res.status(400).json({ error: "Invalid request" });
  }

  if (!["ADMIN", "SUPPORT", "USER"].includes(role)) {
    return res.status(400).json({ error: "Invalid role" });
  }

  if (userId === req.userInfo.userId) {
    return res.status(403).json({ error: "You cannot change your own role." });
  }

  const membership = await Prisma.membership.findFirst({
    where: {
      userId,
      organizationId: orgId,
    },
  });

  if (!membership) {
    return res
      .status(404)
      .json({ error: "User doesn't belong to organization" });
  }

  await Prisma.membership.update({
    where: {
      id: membership.id,
    },
    data: { role },
  });

  return res.status(200).json({ success: true, message: "Role updated" });
}

export async function removeUserFromOrg(req: Request, res: Response) {
  const { userId } = req.params;

  const orgId = req.userInfo.orgId;

  if (!userId || !orgId) {
    return res.status(400).json({ success: false, error: "Invalid request" });
  }

  if (userId === req.userInfo.userId) {
    return res
      .status(403)
      .json({ success: false, error: "You cannot remove yourself" });
  }

  try {
    await Prisma.membership.delete({
      where: {
        userId_organizationId: {
          userId: userId,
          organizationId: orgId,
        },
      },
    });

    res
      .status(200)
      .json({ success: true, message: "User remove from the organization" });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: "Membership not found or already removed",
    });
  }
}
