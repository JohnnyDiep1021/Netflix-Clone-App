const User = require("../db/model/User");
const Movie = require("../db/model/Movie");
const List = require("../db/model/List");
const HttpError = require("./http-error");
const lodash = require("lodash");

const findDatabaseByName = function (name) {
  switch (name) {
    case "Movie":
      return Movie;
    case "User":
      return User;
    case "List":
      return List;
    default:
      return null;
  }
};

const updateValidation = async (modelType, instance) => {
  try {
    const model = findDatabaseByName(modelType);
    if (!model) {
      throw new HttpError(`Invalid database model!`, 500);
    }
    if (lodash.isEmpty(instance)) {
      throw HttpError("Please, provide new data to update", 400);
    }

    const updates = Object.keys(instance);
    const updateFields = await model.getProperty();
    // console.log(updates);
    // console.log(updateFields);
    const isValidUpdate = updates.every((update) =>
      updateFields.includes(update)
    );
    if (!isValidUpdate) {
      return { error: `Invalid updates!` };
    }
    return updates;
  } catch (error) {}
};

module.exports = {
  updateValidation,
};
