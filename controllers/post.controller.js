import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

const postCount = 20;

const parseQueryParam = (param, parser) => (param ? parser(param) : undefined);

export const getRentPosts = async (req, res) => {
  const query = req.query;
  const { currentPage } = parseInt(req.body);

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
      gte: parseQueryParam(query.minLongitude, parseFloat),
      lte: parseQueryParam(query.maxLongitude, parseFloat),
    },
    latitude: {
      gte: parseQueryParam(query.minLatitude, parseFloat),
      lte: parseQueryParam(query.maxLatitude, parseFloat),
    },
    floor: query.floor || undefined,
    bedroom: query.bedroom || undefined,
    toilet: query.toilet || undefined,
  };

  try {
    const posts = await prisma.post.findMany({
      skip: (currentPage - 1) * postCount,
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
  const { currentPage } = parseInt(req.body);

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
      gte: parseQueryParam(query.minLongitude, parseFloat),
      lte: parseQueryParam(query.maxLongitude, parseFloat),
    },
    latitude: {
      gte: parseQueryParam(query.minLatitude, parseFloat),
      lte: parseQueryParam(query.maxLatitude, parseFloat),
    },
    floor: query.floor || undefined,
    bedroom: query.bedroom || undefined,
    toilet: query.toilet || undefined,
  };

  try {
    const posts = await prisma.post.findMany({
      skip: (currentPage - 1) * postCount,
      take: postCount,
      where: filters,
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get rent posts" });
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
