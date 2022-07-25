const movieRouter = require("express").Router();
const { check } = require("express-validator");

const auth = require("../../middleware/auth");
const moviesController = require("../../controllers/movies-controller");

movieRouter.use("/:movieId$", auth, moviesController.movieParams);
// CREATE MOVIE
movieRouter.post(
  "/",
  auth,
  [
    check("title").not().isEmpty(),
    check("desc").not().isEmpty(),
    check("image").not().isEmpty(),
    check("genre").not().isEmpty(),
  ],
  moviesController.createMovie
);

// UPDATE movie
movieRouter.patch(
  "/:movieId",
  auth,
  [
    check("title").not().isEmpty(),
    check("desc").not().isEmpty(),
    check("image").not().isEmpty(),
    check("genre").not().isEmpty(),
  ],
  moviesController.updateMovie
);

// GET ALL MOVIES
movieRouter.get("/", auth, moviesController.getAllMovies);

// GET RANDOM MOVIE
movieRouter.get("/find/random", auth, moviesController.getRandomMovie);

// GET MOVIE BY ID
movieRouter.get("/:movieId", auth, moviesController.getMovieById);

// DELETE
movieRouter.delete("/:movieId", auth, moviesController.deleteMovie);
module.exports = movieRouter;
