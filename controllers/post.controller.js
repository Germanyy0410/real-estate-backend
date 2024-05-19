import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const getRentPosts = async (req, res) => {
  const query = req.query;

  try {
    const posts = await prisma.post.findMany({
      take: 1000,
      where: {
        estateType: "rent",
        area: {
          gte: parseInt(query.minArea) || undefined,
          let: parseInt(query.maxArea) || undefined,
        },
        price: {
          gte: parseInt(query.minPrice) || undefined,
          lte: parseInt(query.maxPrice) || undefined,
        },
        frontageArea: {
          gte: parseInt(query.minFrontageArea) || undefined,
          let: parseInt(query.maxFrontageArea) || undefined,
        },
        entranceArea: {
          gte: parseInt(query.minEntranceArea) || undefined,
          let: parseInt(query.maxEntranceArea) || undefined,
        },
        floor: query.floor || undefined,
        bedroom: query.bedroom || undefined,
        toilet: query.toilet || undefined,
      },
    });

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get rent posts" });
  }
}

export const getBuyPosts = async (req, res) => {
  const query = req.query;

  try {
    const posts = await prisma.post.findMany({
      take: 1000,
      where: {
        estateType: "buy",
        area: {
          gte: parseInt(query.minArea) || undefined,
          let: parseInt(query.maxArea) || undefined,
        },
        price: {
          gte: parseInt(query.minPrice) || undefined,
          lte: parseInt(query.maxPrice) || undefined,
        },
        frontageArea: {
          gte: parseInt(query.minFrontageArea) || undefined,
          let: parseInt(query.maxFrontageArea) || undefined,
        },
        entranceArea: {
          gte: parseInt(query.minEntranceArea) || undefined,
          let: parseInt(query.maxEntranceArea) || undefined,
        },
        floor: query.floor || undefined,
        bedroom: query.bedroom || undefined,
        toilet: query.toilet || undefined,
      },
    });

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get buy posts" });
  }
};

export const getPostById = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    const token = req.cookies?.token;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (!err) {
          const saved = await prisma.savedPost.findUnique({
            where: {
              userId_postId: {
                postId: id,
                userId: payload.id,
              },
            },
          });
          res.status(200).json({ ...post, isSaved: saved ? true : false });
        }
      });
    }
    res.status(200).json({ ...post, isSaved: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get posts" });
  }
};

export const addPost = async (req, res) => {
  const {
    title,
    price,
    images,
    url,
    address,
    city,
    latitude,
    longitude,
    userId,
    type,
    postCode,
    postDetail,
    savedPost,
  } = req.body;

  const newPost = await prisma.post.create({
    data: {
      title,
      price,
      images,
      url,
      address,
      city,
      latitude,
      longitude,
      userId,
      type,
      postCode,
      postDetail,
      savedPost,
    },
  });

  console.log(newPost);
  res.status(201).json(newPost);
};