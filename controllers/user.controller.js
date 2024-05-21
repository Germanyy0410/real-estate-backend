import prisma from "../lib/prisma.js";

export const savePost = async (req, res) => {
  const { postId } = req.body;
  const tokenUserId = req.userId;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: tokenUserId,
      },
      select: {
        savedPosts: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const postIndex = user.savedPosts.indexOf(postId);

    if (postIndex > -1) {
      user.savedPosts.splice(postIndex, 1);
      await prisma.user.update({
        where: { id: tokenUserId },
        data: { savedPosts: user.savedPosts },
      });
      res.status(200).json({ message: "Post removed from saved list" });
    } else {
      user.savedPosts.push(postId);
      await prisma.user.update({
        where: { id: tokenUserId },
        data: { savedPosts: user.savedPosts },
      });
      res.status(200).json({ message: "Post saved" });
    }
  } catch (error) {
    console.error("Error saving post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSavedPosts = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        savedPosts: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const savedPosts = await prisma.post.findMany({
      where: {
        id: {
          in: user.savedPosts,
        },
      },
    });

    res.status(200).json(savedPosts);
  } catch (error) {
    console.error("Error fetching saved posts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};