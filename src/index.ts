import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import createError from "http-errors";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// TODO: Routing aplikasi

// handle 404 errornodemon index.ts
app.use((req: Request, res: Response, next: Function) => {
  next(createError(404));
});

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
