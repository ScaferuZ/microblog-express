const express = require("express");
const router = express.Router();

import { createUser } from "./user.controller";

router.post("/", createUser);

module.exports = router;
