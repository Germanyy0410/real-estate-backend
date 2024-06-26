import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import { getBoundingBox } from "../utils/getBoundingBox.js";
import { get } from "mongoose";

const postCount = 20;

const parseQueryParam = (param, parser) => (param ? parser(param) : undefined);

export const getRentPosts = async (req, res) => {
  const query = req.query;

  let minLat, maxLat, minLon, maxLon;

  if (query.longitude && query.latitude) {
    ({ minLat, maxLat, minLon, maxLon } = getBoundingBox(query.longitude, query.latitude));
  }

  console.log(minLat, maxLat, minLon, maxLon);

  const filters = {
    estateType: "rent" || undefined,
    area: {
      gte: parseQueryParam(query.minArea, parseInt),
      lte: parseQueryParam(query.maxArea, parseInt),
    },
    price: {
      gte: parseQueryParam(query.minPrice, parseInt),
      lte: parseQueryParam(query.maxPrice, parseInt),
    },
    frontageArea: {
      gte: parseQueryParam(query.minFrontageArea, parseInt),
      lte: parseQueryParam(query.maxFrontageArea, parseInt),
    },
    entranceArea: {
      gte: parseQueryParam(query.minEntranceArea, parseInt),
      lte: parseQueryParam(query.maxEntranceArea, parseInt),
    },
    longitude: {
      gte: parseQueryParam(minLon, parseFloat),
      lte: parseQueryParam(maxLon, parseFloat),
    },
    latitude: {
      gte: parseQueryParam(minLat, parseFloat),
      lte: parseQueryParam(maxLat, parseFloat),
    },
    floor: {
      equals: parseQueryParam(query.floor, parseInt),
    },
    bedroom: {
      equals: parseQueryParam(query.bedroom, parseInt),
    },
    toilet: {
      equals: parseQueryParam(query.toilet, parseInt),
    },
  };

  try {
    const posts = await prisma.post.findMany({
      skip: (query.currentPage - 1) * postCount,
      take: postCount,
      where: filters,
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get rent posts" });
  }
};

export const getBuyPosts = async (req, res) => {
  const query = req.query;

  let minLat, maxLat, minLon, maxLon;

  if (query.longitude && query.latitude) {
    ({ minLat, maxLat, minLon, maxLon } = getBoundingBox(query.longitude, query.latitude));
  }

  console.log(minLat, maxLat, minLon, maxLon);

  const filters = {
    estateType: "buy" || undefined,
    area: {
      gte: parseQueryParam(query.minArea, parseInt),
      lte: parseQueryParam(query.maxArea, parseInt),
    },
    price: {
      gte: parseQueryParam(query.minPrice, parseInt),
      lte: parseQueryParam(query.maxPrice, parseInt),
    },
    frontageArea: {
      gte: parseQueryParam(query.minFrontageArea, parseInt),
      lte: parseQueryParam(query.maxFrontageArea, parseInt),
    },
    entranceArea: {
      gte: parseQueryParam(query.minEntranceArea, parseInt),
      lte: parseQueryParam(query.maxEntranceArea, parseInt),
    },
    longitude: {
      gte: parseQueryParam(minLon, parseFloat),
      lte: parseQueryParam(maxLon, parseFloat),
    },
    latitude: {
      gte: parseQueryParam(minLat, parseFloat),
      lte: parseQueryParam(maxLat, parseFloat),
    },
    floor: {
      equals: parseQueryParam(query.floor, parseInt),
    },
    bedroom: {
      equals: parseQueryParam(query.bedroom, parseInt),
    },
    toilet: {
      equals: parseQueryParam(query.toilet, parseInt),
    },
  };

  try {
    const posts = await prisma.post.findMany({
      skip: (query.currentPage - 1) * postCount,
      take: postCount,
      where: filters,
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
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
