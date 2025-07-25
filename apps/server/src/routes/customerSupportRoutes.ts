import { Router } from "express";
import { getDashboardSummary } from "../controllers/customerSupportController";
import { requireAuth } from "../middlewares/requireAuth";

const router = Router();

// GET /api/auth/dashboard-summary after authenticating user
router.get("/dashboard-summary", requireAuth, getDashboardSummary);

export default router;
