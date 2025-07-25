import express, { Application } from "express";
import dotenv from "dotenv";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes";
import cors from "cors";
import cookieParser from "cookie-parser";
import customerSupportRoutes from "./routes/customerSupportRoutes";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, "../../../.env") });

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

// CORS Setup
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true, // allow cookies
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/customer-support", customerSupportRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
