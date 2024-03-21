import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import createError from "http-errors";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// TODO: Routing aplikasi

app.get("/feed", async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany({
    include: { author: true },
  });
  res.json(posts);
});

// post routes
// POST /post
app.post("/post", async (req: Request, res: Response) => {
  const { content, authorEmail } = req.body;
  const result = await prisma.post.create({
    data: {
      content,
      author: { connect: { email: authorEmail } },
    },
  });
  res.json(result);
});

// GET /post/:id
app.get("/post/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  });
  res.json(post);
});

// PUT /post/:id
app.put("/post/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await prisma.post.update({
    where: { id: Number(id) },
    data: {
      ...req.body,
    },
  });
  res.json(post);
});

// DELETE /post/:id
app.delete("/post/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await prisma.post.delete({
    where: { id: Number(id) },
  });
  res.json(post);
});

// /user routes
// post /user
app.post("/user", async (req: Request, res: Response) => {
  const result = await prisma.user.create({
    data: { ...req.body },
  });
  res.json(result);
});

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
