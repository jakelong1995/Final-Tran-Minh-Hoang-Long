import express from "express";
import {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  searchMovies,
  uploadImage,
} from "../controllers/movie.controller.js";
const router = express.Router();

// Routes for movie CRUD operations
router.get("/", getMovies);
router.get("/:movieId", getMovieById);
router.post("/", createMovie);
router.put("/:movieId", updateMovie);
router.delete("/:movieId", deleteMovie);
router.get("/search", searchMovies);
router.post("/movies/:movieId/upload-update-image", uploadImage);

export default router;
