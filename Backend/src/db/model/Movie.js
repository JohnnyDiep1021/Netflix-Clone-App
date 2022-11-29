const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    desc: {
      type: String,
      trim: true,
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
    type: {
      type: String,
      trim: true,
    },
    genre: {
      type: String,
      trim: true,
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
      trim: true,
    },
    casting: {
      type: String,
      trim: true,
      default: "",
    },
    matching: {
      type: Number,
      trim: true,
      default: 0,
    },
    label: {
      type: String,
      trim: true,
      default: "",
    },
    warning: {
      type: String,
      trim: true,
      default: "",
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
