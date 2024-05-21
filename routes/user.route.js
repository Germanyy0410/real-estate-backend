import express from "express";
import { savePost, getSavedPosts } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/save", verifyToken, savePost);
router.get("/saved-posts", verifyToken, getSavedPosts);

export default router;
