import express from "express";
import {verifyToken} from "../middlewares/verifyToken.js";
import { getPostById, getRentPosts, getBuyPosts } from "../controllers/post.controller.js";

const router = express.Router();

router.get("/buy", getBuyPosts);
router.get("/rent", getRentPosts);
router.get("/:id", getPostById);

export default router;