import { Router } from "express";
const router = Router();
import {
  register,
  login,
  getProfile,
  updateProfile,
  deleteProfile,
} from "../controllers/user.controller";

router.post("/register", register);
router.post("/login", login);
router.get("/profile", getProfile);
router.put("/profile/update", updateProfile);
router.delete("/profile/delete", deleteProfile);

export default router;
