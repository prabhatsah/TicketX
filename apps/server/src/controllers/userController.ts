import { Role } from "@prisma/client";
import { Request, Response } from "express";

export async function updateUserRole(req: Request, res: Response) {
  const { role } = req.body as { role?: Role };
  const { userId } = req.params;

  const orgId = req.org
}
