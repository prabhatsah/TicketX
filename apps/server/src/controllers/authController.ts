import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Prisma } from "../prisma";

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

    // Create JWT
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        orgId: org.id,
        role: "ADMIN",
      },
      JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 15, // 15 minutes
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

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await Prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    console.log("Setting jwt", JWT_SECRET);
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
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
      message: "Login successful.",
    });
  } catch (err) {
    res.status(500).json({ error: err.message, message: "Signin failed" });
  }
};

export const logout = (req: Request, res: Response) => {
  console.log("Logout", res.cookie);
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};
