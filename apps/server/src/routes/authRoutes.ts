import express from "express";
import {
  signup,
  signin,
  logout,
  orgSignup,
  selectOrg,
  switchOrg,
  me,
} from "../controllers/authControllers";
import { requireAuth } from "../middlewares/requireAuth";
import { requireUserWithoutOrg } from "../middlewares/requireUserWithoutOrg";

const router = express.Router();

// POST /api/auth/orgSignup
router.post("/orgSignup", orgSignup);

// POST /api/auth/selectOrg after authenticating user
router.post("/select-org", requireUserWithoutOrg, selectOrg);

// POST /api/auth/switchOrg
router.post("/switch-org", requireAuth, switchOrg);

// POST /api/auth/signup
// Disabled direct signup. Users sign up via /orgSignup or invite-only flow.
//router.post("/signup", signup);

// POST /api/auth/signin
router.post("/signin", signin);

// GET /api/auth/logout
router.get("/logout", logout);

// GET /api/auth/me after authenticating user
router.get("/me", requireAuth, me);

export default router;
