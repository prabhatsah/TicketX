// server/src/middlewares/requireRole.ts
import { APIError } from "@/index";
import { Role } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

export function requireRole(requiredRole: Role) {
  return function (req: Request, res: Response, next: NextFunction) {
    const userRole = req.userInfo?.role;

    if (!userRole) {
      return res.status(403).json({
        error: "User role not found",
      } satisfies APIError);
    }

    if (userRole !== requiredRole) {
      return res.status(403).json({
        error: `Access denied. Requires ${requiredRole} role.`,
      } satisfies APIError);
    }

    next();
  };
}
