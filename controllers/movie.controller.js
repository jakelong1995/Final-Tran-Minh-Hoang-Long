import Movie from "../models/movie.js";

export const getMovies = async (req, res) => {
  try {
    // Get query parameters for sorting
    const { sortByYear, sortOrder } = req.query;

    let movies;
    if (sortByYear && sortByYear.toLowerCase() === "true") {
      // Sort movies by year
      const sortOption =
        sortOrder && sortOrder.toLowerCase() === "desc" ? -1 : 1;
      movies = await Movie.find().sort({ year: sortOption });
    } else {
      // Default: Get movies without sorting
      movies = await Movie.find();
    }

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

// Get a movie by ID
export const getMovieById = async (req, res) => {
  try {
    const { movieId } = req.params;

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({
        msg: "Movie not found!",
      });
    }

    return res.status(200).json({
      msg: "Get movie by ID successfully!",
      data: movie,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

// Create a new movie
export const createMovie = async (req, res) => {
  try {
    const { name, time, year, image, introduce } = req.body;

    // Validation
    if (!name || !time || !year || !image || !introduce) {
      return res.status(400).json({
        msg: "All fields are required!",
      });
    }

    const existingMovie = await Movie.findOne({ name });
    if (existingMovie) {
      return res.status(409).json({
        msg: "A movie with the same name already exists!",
      });
    }

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

// Update an existing movie
export const updateMovie = async (req, res) => {
  try {
    const { name, time, year, image, introduce } = req.body;
    const { movieId } = req.params;

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({
        msg: "Movie not found!",
      });
    }

    movie.name = name;
    movie.time = time;
    movie.year = year;
    movie.image = image;
    movie.introduce = introduce;

    await movie.save();

    return res.status(200).json({
      msg: "Update movie successfully!",
      data: movie,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

// Delete an existing movie
export const deleteMovie = async (req, res) => {
  try {
    const { movieId } = req.params;

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({
        msg: "Movie not found!",
      });
    }

    await movie.deleteOne();

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

export const searchMovies = async (req, res) => {
  try {
    const { keyword } = req.query;

    // Search for movies whose name contains the keyword
    const movies = await Movie.find({
      name: { $regex: keyword, $options: "i" },
    });

    return res.status(200).json({
      message: `Movies containing "${keyword}" in their names`,
      data: movies,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
