const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    imageTitle: {
      type: String,
    },
    imgSm: {
      type: String,
    },
    trailer: {
      type: String,
    },
    video: {
      type: String,
    },
    year: {
      type: String,
    },
    limit: {
      type: String,
    },
    genre: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
    },
    isSeries: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
MovieSchema.statics.getProperty = async function () {
  return Object.keys(this.schema.obj);
};
const Movie = mongoose.model("Movie", MovieSchema);
module.exports = Movie;
