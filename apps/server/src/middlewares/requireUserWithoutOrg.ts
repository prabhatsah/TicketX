import { JwtPayload } from "@/api/auth";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const requireUserWithoutOrg = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Unauthorized2" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    //Accept if user is authenticated but has not selected org yet
    if (!decoded.orgId) {
      req.userInfo = decoded;
      return next();
    }

    return res.status(400).json({ error: "Organization already selected" });
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
