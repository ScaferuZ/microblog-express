const express = require("express");
const router = express.Router();

import { getPostById, postBlog, editPost, deletePost } from "./post.controller";

router.get("/:id", getPostById);
router.post("/", postBlog);
router.put("/:id", editPost);
router.delete("/:id", deletePost);

module.exports = router;
