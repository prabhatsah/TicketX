import express from "express";
import { requireAuth } from "../middlewares/requireAuth";
import { requireOrg } from "../middlewares/requireOrg";
import { requireRole } from "../middlewares/requireRole";
import { getOrgUsers } from "../controllers/orgController";

const router = express.Router();

router.get(
  "/users",
  requireAuth,
  requireOrg,
  requireRole("ADMIN"),
  getOrgUsers
);

export default router;
