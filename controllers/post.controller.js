import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const getRentPosts = async (req, res) => {
  const query = req.query;

  try {
    const posts = await prisma.post.findMany({
      take: 100,
      where: {
        estateType: 'rent' || undefined,
        area: {
          gte: parseInt(query.minArea) || undefined,
          lte: parseInt(query.maxArea) || undefined,
        },
        price: {
          gte: parseInt(query.minPrice) || undefined,
          lte: parseInt(query.maxPrice) || undefined,
        },
        frontageArea: {
          gte: parseInt(query.minFrontageArea) || undefined,
          lte: parseInt(query.maxFrontageArea) || undefined,
        },
        entranceArea: {
          gte: parseInt(query.minEntranceArea) || undefined,
          lte: parseInt(query.maxEntranceArea) || undefined,
        },
        longitude: {
          gte: parseFloat(query.minLongtitude) || undefined,
          lte: parseFloat(query.maxLongtitude) || undefined,
        },
        latitude: {
          gte: parseFloat(query.minLatitude) || undefined,
          lte: parseFloat(query.maxLatitude) || undefined,
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
};

export const getBuyPosts = async (req, res) => {
  const query = req.query;

  try {
    const posts = await prisma.post.findMany({
      take: 100,
      where: {
        estateType: "buy" || undefined,
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
        longitude: {
          gte: parseFloat(query.minLongtitude) || undefined,
          lte: parseFloat(query.maxLongtitude) || undefined,
        },
        latitude: {
          gte: parseFloat(query.minLatitude) || undefined,
          lte: parseFloat(query.maxLatitude) || undefined,
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

