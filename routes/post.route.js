import express from "express";
import {verifyToken} from "../middlewares/verifyToken.js";
import { addPost, getPostById, getRentPosts, getBuyPosts } from "../controllers/post.controller.js";

const router = express.Router();

router.get("/buy", getBuyPosts);
router.get("/rent", getRentPosts);
router.get("/:id", getPostById);
router.post("/", addPost);

export default router;