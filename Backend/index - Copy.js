const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 8800;

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const morgan = require("morgan");
app.use(morgan("dev"));

const apiRouter = require("./src/server/api");
app.use("/api", apiRouter);

// error-handler midlleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || `An unknown error occurred. Please try again!`,
  });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2lb1a.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        process.env.DB_NAME
      );
      console.log(`Server is up on PORT ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
