import { Request, Response } from "express";
import { prisma } from "../index";

export const createUser = async (req: Request, res: Response) => {
  try {
    const result = await prisma.user.create({
      data: { ...req.body },
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: `Error creating user: ${error}` });
  }
};
