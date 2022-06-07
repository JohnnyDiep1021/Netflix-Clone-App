const List = require("../db/model/List");
const HttpError = require("../utils/http-error");

const { updateValidation } = require("../utils/utils.js");
const lodash = require("lodash");
const { validationResult } = require("express-validator");

const listParams = async (req, res, next) => {
  try {
    console.log(req.params.listId);
    const list = await List.findById(req.params.listId);
    if (!list) {
      throw new HttpError(`Found no list with provided id!`, 401);
    }
    req.list = list;
    next();
  } catch (error) {
    next(error);
  }
};

const createList = async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        throw new HttpError(
          `List title, type, genre, and content are required!`,
          422
        );
      const { title } = req.body;
      const existingList = title && (await List.findOne({ title }));
      if (existingList) {
        throw new HttpError(
          `A list with provided title found! Please, create a new list title!`,
          400
        );
      }
      const list = new List({ ...req.body });
      await list.save();
      console.log(`List created successfully!`);
      res.status(201).json({
        list: list.toObject({ getters: true }),
      });
    } else {
      throw new HttpError("You are not authorized to create a new list", 403);
    }
  } catch (error) {
    next(error);
  }
};

const getAllLists = async (req, res, next) => {
  try {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let lists = [];
    if (typeQuery) {
      if (genreQuery) {
        lists = await List.aggregate([
          {
            $match: { type: typeQuery, genre: genreQuery },
          },
          {
            // return 10 random list
            $sample: { size: 10 },
          },
        ]);
      } else {
        lists = await List.aggregate([
          {
            $match: { type: typeQuery },
          },
          {
            // return 10 random list
            $sample: { size: 10 },
          },
        ]);
      }
    } else {
      lists = await List.aggregate([{ $sample: { size: 10 } }]);
    }

    res.json({
      lists: lists,
    });
  } catch (error) {
    next(error);
  }
};

const deleteList = async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      await req.list.remove();
      res.json({ message: "List deleted successfully!" });
    } else {
      throw new HttpError("You are not authorized to delete a list", 403);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listParams,
  createList,
  getAllLists,
  deleteList,
};
