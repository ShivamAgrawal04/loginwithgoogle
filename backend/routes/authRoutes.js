import express from "express";
import {
  googleLogin,
  loginUser,
  registerUser,
  userDetails,
} from "../controllers/authController.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.post("/google", googleLogin);
router.post("/login", loginUser);
router.get("/user", auth, userDetails);
router.post("/register", registerUser);

export default router;
