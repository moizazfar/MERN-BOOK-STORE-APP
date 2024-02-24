import express from "express";
const router = express.Router();

import { login, userRegister } from "../controllers/user.controller.js";

router.post("/register", userRegister);
router.post("/login", login);

export default router;
