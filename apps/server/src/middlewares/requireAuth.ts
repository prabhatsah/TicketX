import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { SessionUser } from "@/auth";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Unauthorized1" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as Partial<SessionUser>;
    // console.log("Decoded in requireAuth", decoded);

    // Validate that all required properties exist
    if (
      !decoded.userId ||
      !decoded.email ||
      !decoded.name ||
      !decoded.orgId ||
      !decoded.orgName ||
      !decoded.role
    ) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.userInfo = decoded as SessionUser;

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
