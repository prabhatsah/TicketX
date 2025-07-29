import { Role } from "@prisma/client";
import { Request, Response } from "express";
import { Prisma } from "../prisma";

export async function updateUserRole(req: Request, res: Response) {
  const { role } = req.body as { role?: Role };
  const { userId } = req.params;

  //console.log("req.userInfo in userController", req.params.userId);

  const orgId = req.userInfo.orgId;

  if (!userId || !role || !orgId) {
    return res.status(400).json({ message: "Invalid request" });
  }

  if (!["ADMIN", "SUPPORT", "USER"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  if (userId === req.userInfo.userId) {
    return res
      .status(403)
      .json({ message: "You cannot change your own role." });
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
      .json({ message: "User doesn't belong to organization" });
  }

  await Prisma.membership.update({
    where: {
      id: membership.id,
    },
    data: { role },
  });

  return res.status(200).json({ success: true, message: "Role updated" });
}
