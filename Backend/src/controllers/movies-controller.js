const Movie = require("../db/model/Movie");
const HttpError = require("../utils/http-error");

const { updateValidation } = require("../utils/utils.js");
const lodash = require("lodash");
const { validationResult } = require("express-validator");

const movieParams = async (req, res, next) => {
  try {
    console.log(req.params.movieId);
    const movie = await Movie.findById(req.params.movieId);
    if (!movie) {
      throw new HttpError(`Found no movie with provided id!`, 401);
    }
    req.movie = movie;
    next();
  } catch (error) {
    next(error);
  }
};
const createMovie = async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        throw new HttpError(
          `Movie title, description, image, and genre are required!`,
          422
        );
      const { title } = req.body;
      const existingMovie = title && (await Movie.findOne({ title }));
      if (existingMovie) {
        throw new HttpError(
          `A movie with provided title found! Please,create a new movie title!`,
          400
        );
      }
      const movie = new Movie({ ...req.body });
      await movie.save();
      console.log(`Movie created successfully!`);
      res.status(201).json({
        movie: movie.toObject({ getters: true }),
      });
    } else {
      throw new HttpError("You are not authorized to create a new movie", 403);
    }
  } catch (error) {
    next(error);
  }
};
const updateMovie = async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        throw new HttpError(
          `Movie title, description, image, and genre are required!`,
          422
        );
      const updates = await updateValidation("Movie", req.body);
      console.log(updates);
      if (updates.error) throw new HttpError(updates.error, 400);
      updates.forEach((update) => {
        req.movie[update] = req.body[update];
      });
      await req.movie.save();
      res.json({ movie: req.movie.toObject({ getters: true }) });
    } else {
      throw new HttpError(
        "You are not authorized to update an existing movie",
        403
      );
    }
  } catch (error) {
    next(error);
  }
};
const getAllMovies = async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const movies = await (await Movie.find()).reverse();
      res.json({
        movies: movies.map((movie) => movie.toObject({ getters: true })),
      });
    } else {
      throw new HttpError(
        "You are not authorized to update an existing movie",
        403
      );
    }
  } catch (error) {
    next(error);
  }
};
const getMovieById = async (req, res, next) => {
  try {
    res.json({ movie: req.movie.toObject({ getters: true }) });
  } catch (error) {
    next(error);
  }
};
const getRandomMovie = async (req, res, next) => {
  try {
    const type = req.query.type;
    let movie;
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(movie);
  } catch (error) {
    next(error);
  }
};
const deleteMovie = async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      await req.movie.remove();
      res.json({ message: "Movie deleted successfully!" });
    } else {
      throw new HttpError("You are not authorized to delete movie", 403);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  movieParams,
  createMovie,
  updateMovie,
  getAllMovies,
  getMovieById,
  getRandomMovie,
  deleteMovie,
};
