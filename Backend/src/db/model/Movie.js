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
      file: { type: String, required: true },
      fileRef: {
        type: String,
        required: true,
      },
    },
    imageTitle: {
      file: { type: String, required: true },
      fileRef: {
        type: String,
        required: true,
      },
    },
    imgSm: {
      file: { type: String, required: true },
      fileRef: {
        type: String,
        required: true,
      },
    },
    trailer: {
      file: { type: String, required: true },
      fileRef: {
        type: String,
        required: true,
      },
    },
    video: {
      file: { type: String, required: true },
      fileRef: {
        type: String,
        required: true,
      },
    },
    genre: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    isSeries: {
      type: Boolean,
      default: false,
    },
    limit: {
      type: String,
    },
    casting: {
      type: String,
    },
    matching: {
      type: Number,
    },
    label: {
      type: String,
    },
    warning: {
      type: String,
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
