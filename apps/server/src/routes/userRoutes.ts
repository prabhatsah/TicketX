import { Router } from "express";
import { requireAuth } from "../middlewares/requireAuth";
import { requireOrg } from "../middlewares/requireOrg";
import { requireRole } from "../middlewares/requireRole";
import { updateUserRole } from "../controllers/userController";

const router = Router();

router.patch(
  "/users/:userId/role",
  requireAuth,
  requireOrg,
  requireRole("ADMIN"),
  updateUserRole
);

export default router;
