import { Request, Response } from "express";
import { prisma } from "../index";

export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: `Error retrieving message: ${error}` });
  }
};

export const postBlog = async (req: Request, res: Response) => {
  try {
    const { content, authorEmail } = req.body;
    const result = await prisma.post.create({
      data: {
        content,
        author: { connect: { email: authorEmail } },
      },
    });
  } catch (e) {
    res.status(500).json({ message: `Error creating post: ${e}` });
  }
};

export const editPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        ...req.body,
      },
    });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: `Error updating post: ${error}` });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.delete({
      where: { id: Number(id) },
    });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: `Error deleting post: ${error}` });
  }
};
