import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import createError from "http-errors";

export const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// TODO: Routing aplikasi

app.get("/feed", async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany({
    include: { author: true },
  });
  res.json(posts);
});

// routes
app.use("/post", require("./post/post.routes"));
app.use("/user", require("./user/user.routes"));

// get username
app.get("/:username", async (req: Request, res: Response) => {
  const { username } = req.params;
  const user = await prisma.user.findUnique({
    where: { username: username },
  });
  res.json(user);
});

// handle 404 errornodemon index.ts
app.use((req: Request, res: Response, next: Function) => {
  next(createError(404));
});

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
