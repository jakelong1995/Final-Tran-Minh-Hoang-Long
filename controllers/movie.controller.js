import User from "../models/user.js";
import Movie from "../models/movie.js";

export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json({
      msg: "Get movies successfully!",
      data: movies,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

export const createMovie = async (req, res) => {
  try {
    const { name, time, year, image, introduce } = req.body; // c1

    // 1. Validation

    // 2. Check if user is existed

    // 3. Create movie
    const movie = new Movie({
      name,
      time,
      year,
      image,
      introduce,
    });
    await movie.save();

    return res.status(201).json({
      msg: "Create movie successfully!",
      data: movie,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};
/**
 * c1: check người call api có phải là người sở hửu movie cần update hay không? => check xem movie với ủeId có tồn tại hay không?
 * c2: check movie có tồn tại hay không? => check xem người call api có id giống với ủeId của movie cần update hay không?
 */
export const updateMovie = async (req, res) => {
  try {
    const { userId, skills = [], hobbies = [], targets = [] } = req.body; // c1
    const { _id: requestUserId } = req.user;
    // c2: const {movieId} = req.params; /:movieId

    // 0. Check owner
    console.log(requestUserId, userId);
    if (userId !== requestUserId.toString()) {
      return res.status(401).json({
        msg: "You are not owner of this movie!",
      });
    }
    // 1. Validation
    if (!userId) {
      return res.status(400).json({
        msg: "userId is required!",
      });
    }

    if (skills && !Array.isArray(skills)) {
      return res.status(400).json({
        msg: "Skills is not array!",
      });
    }

    if (hobbies && !Array.isArray(hobbies)) {
      return res.status(400).json({
        msg: "Hobbies is not array!",
      });
    }

    if (targets && !Array.isArray(targets)) {
      return res.status(400).json({
        msg: "Targets is not array!",
      });
    }

    // 2. Check if user is existed
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({
        msg: "User is not found!",
      });
    }
    const movie = await Movie.findOne({ userId }); // c1
    // c2: const movie = await Movie.findById(movieId); // c2
    if (!movie) {
      return res.status(401).json({
        msg: "Movie is not found!",
      });
    }
    // if (movie.userId!== requestUserId) {
    // 3. Update movie, do not update userId
    movie.skills = skills;
    movie.hobbies = hobbies;
    movie.targets = targets;

    const updatedMovie = await movie.save();
    // upsert

    return res.status(200).json({
      msg: "Update movie successfully!",
      data: updatedMovie,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const { userId } = req.body;
    const { _id: requestUserId } = req.user;
    // c2: const {movieId} = req.params; /:movieId

    // 0. Check owner
    if (userId !== requestUserId.toString()) {
      return res.status(401).json({
        msg: "You are not owner of this movie!",
      });
    }
    // 1. Validation
    if (!userId) {
      return res.status(400).json({
        msg: "userId is required!",
      });
    }
    // 2. Check if user is existed
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({
        msg: "User is not found!",
      });
    }
    const movie = await Movie.findOne({ userId });
    if (!movie) {
      return res.status(401).json({
        msg: "Movie is not found!",
      });
    }
    // 3. Delete movie
    await Movie.findOneAndDelete({ _id: movie._id }); // c1
    return res.status(200).json({
      msg: "Delete movie successfully!",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};
