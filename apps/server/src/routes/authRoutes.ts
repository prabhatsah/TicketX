import express from "express";
import {
  signup,
  signin,
  logout,
  orgSignup,
} from "../controllers/authController";
import { requireAuth } from "../middlewares/requireAuth";

const router = express.Router();

router.post("/orgSignup", orgSignup);
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/logout", logout);
router.get("/me", requireAuth, (req, res) => {
  res.json({ user: req.user });
});

export default router;
