import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Prisma } from "../prisma";

const JWT_SECRET = process.env.JWT_SECRET;

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
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};
