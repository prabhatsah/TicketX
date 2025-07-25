import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Prisma } from "../prisma";
import { JwtPayload, LoginPayload, LoginResponse, SessionUser } from "@/auth";
import { OrgSummary } from "@/models/org";
import { LoginApiResponse } from "@/index";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const orgSignup = async (req: Request, res: Response) => {
  const { orgName, fullName, email, password } = req.body;

  try {
    const existingOrg = await Prisma.organization.findUnique({
      where: { name: orgName },
    });
    if (existingOrg) {
      return res.status(400).json({
        success: false,
        error: {
          message: "Organization already exists.",
          code: "ORG_EXISTS",
        },
      });
    }

    const existingUser = await Prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: {
          message:
            "Email already in use. Use a different email or request for an invite.",
          code: "EMAIL_EXISTS",
        },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { org, user } = await Prisma.$transaction(async (tx) => {
      const org = await tx.organization.create({
        data: { name: orgName },
      });

      const user = await tx.user.create({
        data: {
          name: fullName,
          email,
          password: hashedPassword,
          role: "ADMIN",
          memberships: {
            create: {
              organizationId: org.id,
              role: "ADMIN",
            },
          },
        },
      });

      return { org, user };
    });

    // Return success response
    res.status(201).json({
      message: "Organization and admin user created.",
      organization: {
        id: org.id,
        name: org.name,
      },
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Signup failed:", error);
    res.status(500).json({ error: "Org signup failed" });
  }
};

export const selectOrg = async (
  req: Request<{}, {}, { orgId: string }>,
  res: Response
) => {
  const { orgId } = req.body;
  const user = req.userInfo as SessionUser; // comes from temporary token via middleware

  if (!user || !user.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const membership = await Prisma.membership.findFirst({
      where: {
        userId: user.userId,
        organizationId: orgId,
      },
      include: {
        organization: true,
      },
    });

    if (!membership) return res.status(403).json({ error: "Access denied" });

    // Final token with org data
    const fullToken = jwt.sign(
      {
        userId: user.userId,
        name: user.name,
        email: user.email,
        orgId,
        orgName: membership.organization.name,
        role: membership.role,
      } satisfies JwtPayload,
      JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.cookie("token", fullToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 15,
    });

    return res.status(200).json({
      message: "Organization selected and session started.",
      user: {
        id: user.userId,
        name: user.name,
        email: user.email,
      },
      organization: {
        id: orgId,
        role: membership.role,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: "Organization selection failed" });
  }
};

export const switchOrg = async (req: Request, res: Response) => {
  const { orgId } = req.body;
  const user = req.user as SessionUser;

  const membership = await Prisma.membership.findUnique({
    where: {
      userId_organizationId: {
        userId: user.userId,
        organizationId: orgId,
      },
    },
  });

  if (!membership) {
    return res
      .status(403)
      .json({ error: "You do not belong to this organization." });
  }

  const token = jwt.sign(
    {
      userId: user.userId,
      email: user.email,
      orgId,
      role: membership.role,
    } satisfies JwtPayload,
    JWT_SECRET,
    { expiresIn: "15m" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 15,
  });

  return res.status(200).json({ message: "Switched organization" });
};

// DEPRECATED
export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await Prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(400).json({ error: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "15m",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // send only on HTTPS
      sameSite: "lax",
      maxAge: 1000 * 60 * 15, // 15 minutes
    });

    res.json({
      user: { id: user.id, email: user.email, name: user.name },
      message: "User created successfully.",
    });
  } catch (err) {
    res.status(500).json({ error: "Signup failed" });
  }
};

export const signin = async (
  req: Request<{}, {}, LoginPayload>,
  res: Response
) => {
  const { email, password } = req.body;

  try {
    const user = await Prisma.user.findUnique({
      where: { email },
      include: {
        memberships: {
          include: {
            organization: true,
          },
        },
      },
    });
    if (!user) return res.status(404).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    // Get all orgs user belongs to
    const orgs: OrgSummary[] = user.memberships.map((m) => ({
      id: m.organizationId,
      name: m.organization.name,
      role: m.role,
    }));

    // Auto-select if only one org
    if (orgs.length === 1) {
      const token = jwt.sign(
        {
          userId: user.id,
          name: user.name,
          email: user.email,
          orgId: orgs[0].id,
          orgName: orgs[0].name,
          role: orgs[0].role,
        } satisfies JwtPayload,
        JWT_SECRET,
        { expiresIn: "15m" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 1000 * 60 * 15,
      });

      return res.status(200).json({
        message: "Login successful (single org).",
        user: { id: user.id, name: user.name ?? "", email: user.email },
        organization: orgs[0],
      });
    } else {
      //  Issue temporary token with no org
      const tempToken = jwt.sign(
        {
          userId: user.id,
          name: user.name,
          email: user.email,
        } satisfies JwtPayload,
        JWT_SECRET,
        { expiresIn: "10m" } // short-lived
      );

      res.cookie("token", tempToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 1000 * 60 * 10, // 10 minutes
      });

      // Let frontend show org selection
      return res.status(200).json(<LoginApiResponse>{
        requiresOrgSelection: true,
        user: { id: user.id, name: user.name ?? "", email: user.email },
        organizations: orgs,
      });
    }
  } catch (err) {
    return res.status(500).json(<LoginApiResponse>{
      error: err instanceof Error ? err.message : "Unknown error",
      message: "Signin failed",
    });
  }
};

export const logout = (req: Request, res: Response) => {
  console.log("Logout", res.cookie);
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};

export const me = async (req: Request, res: Response) => {
  console.log("req", req.userInfo);
  const user = await Prisma.user.findUnique({
    where: { id: req.userInfo.userId },
    include: {
      memberships: {
        include: { organization: true },
      },
    },
  });
  console.log("user", user);

  if (!user) return res.status(401).json({ error: "Unauthorized" });

  const organizations: OrgSummary[] = user.memberships.map((m) => ({
    id: m.organizationId,
    name: m.organization.name,
    role: m.role,
  }));

  const selectedOrg = organizations.find(
    (org) => org.id === req.userInfo.orgId
  );

  return res.json({
    success: true,
    userInfo: {
      id: user.id,
      name: user.name ?? "",
      email: user.email,
    },
    org: selectedOrg,
    organizations,
  });
};
