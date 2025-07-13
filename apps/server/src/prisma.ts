// ESM‑safe singleton so the client is created once
import { PrismaClient } from "@prisma/client";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, "../../../.env") });

declare global {
  var prisma: PrismaClient | undefined;
}

export const Prisma =
  global.prisma ||
  new PrismaClient({
    log: ["error"],
  });

if (process.env.NODE_ENV !== "production") global.prisma = Prisma;
