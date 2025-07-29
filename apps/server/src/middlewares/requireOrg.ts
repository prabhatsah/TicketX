// server/src/middlewares/requireOrg.ts
import { APIError } from "@/index";
import { Request, Response, NextFunction } from "express";

export function requireOrg(req: Request, res: Response, next: NextFunction) {
  if (!req.userInfo?.orgId) {
    return res.status(401).json({
      error: "Organization not selected",
    } satisfies APIError);
  }

  //console.log("req in requireOrg", req.userInfo);

  next();
}
