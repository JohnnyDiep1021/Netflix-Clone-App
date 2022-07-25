const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    content: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ListSchema.statics.getProperty = async function () {
  return Object.keys(this.schema.obj);
};
const List = mongoose.model("List", ListSchema);
module.exports = List;
