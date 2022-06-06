const express = require("express");
const apiRouter = express.Router();

const userRouter = require("./routes/users-routes");
apiRouter.use("/users", userRouter);

const movieRouter = require("./routes/movies-routes");
apiRouter.use("/movies", movieRouter);

module.exports = apiRouter;
