import express from "express";
import {
  signup,
  signin,
  logout,
  orgSignup,
  selectOrg,
  switchOrg,
  me,
} from "../controllers/authController";
import { requireAuth } from "../middlewares/requireAuth";
import { requireUserWithoutOrg } from "../middlewares/requireUserWithoutOrg";

const router = express.Router();

// POST /api/auth/orgSignup
router.post("/orgSignup", orgSignup);

// POST /api/auth/selectOrg after authenticating user
router.post("/select-org", requireUserWithoutOrg, selectOrg);

// POST /api/auth/switchOrg
router.post("/switch-org", switchOrg);

// POST /api/auth/signup
//router.post("/signup", signup);

// POST /api/auth/signin
router.post("/signin", signin);

// GET /api/auth/logout
router.get("/logout", logout);

// GET /api/auth/me after authenticating user
// router.get("/me", requireAuth, (req, res) => {
//   console.log(req.userInfo);

//   res.json({ userInfo: req.userInfo });
// });
router.get("/me", requireAuth, me);

export default router;
