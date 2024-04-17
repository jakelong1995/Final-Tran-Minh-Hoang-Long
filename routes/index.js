import express from "express";
const router = express.Router();
import ProfileRouter from "./movie.route.js";
import AuthRouter from "./auth.route.js";
import { authMdw } from "../middlewares/auth.mdw.js";

router.use("/movies", authMdw, ProfileRouter);

router.use("/auth", AuthRouter);

export default router;
