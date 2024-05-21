import prisma from "../lib/prisma.js";

export const savePost = async (req, res) => {
  const { postId } = req.body;
  const tokenUserId = req.userId;

  try {
    const savedPost = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          userId: tokenUserId,
          postId,
        },
      },
    });

    if (savedPost) {
      await prisma.savedPost.delete({
        where: {
          id: savedPost.id,
        },
      });
      res.status(200).json({ message: "Post removed from saved list" });
    } else {
      await prisma.savedPost.create({
        data: {
          userId: tokenUserId,
          postId,
        },
      });
      res.status(200).json({ message: "Post saved" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to save or remove post!" });
  }
};

export const getPostStatus = async (req, res) => {
  const { postId } = req.body;
  const tokenUserId = req.userId;

  try {
    const savedPost = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          userId: tokenUserId,
          postId,
        },
      },
    });

    const status = savePost ? true : false;

    res.status(200).json({ status: status });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to check post status!" });
  }
};

export const getSavedPosts = async (req, res) => {
  const userId = req.userId;

  try {
    const savedPosts = await prisma.savedPost.findMany({
      where: { userId: userId },
      include: {
        post: true,
      },
    });

    res.status(200).json(savedPosts);
  } catch (error) {
    console.error("Error fetching saved posts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
