import express from "express";
import {verifyToken} from "../middlewares/verifyToken.js";
import { addPost, deletePost, getPostById, getPosts, updatePost } from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/", addPost);
router.put("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);

export default router;