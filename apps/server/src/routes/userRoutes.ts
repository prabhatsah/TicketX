import { Router } from "express";
import { requireAuth } from "../middlewares/requireAuth";
import { requireOrg } from "../middlewares/requireOrg";
import { requireRole } from "../middlewares/requireRole";

const router = Router();

router.patch(
  "/users/:userId/role",
  requireAuth,
  requireOrg,
  requireRole("ADMIN"),
  updateUserRole
);
