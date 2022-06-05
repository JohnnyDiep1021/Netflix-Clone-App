const User = require("../db/model/User");
const HttpError = require("../utils/http-error");
const { updateValidation } = require("../utils/utils");
const lodash = require("lodash");
const { validationResult } = require("express-validator");

const signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      throw new HttpError(
        `Invalid username/email or password passed! Please, check your inputs and try again.`,
        422
      );

    const { email, username } = req.body;
    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });
    if (existingEmail || existingUsername)
      throw new HttpError(
        `Username or email has existed. Please choose a new one!`,
        400
      );

    const user = new User({ ...req.body });
    await user.save();
    const token = await user.generateAuthToken();
    console.log(`Signing up successfully`, user);
    res.status(201).json({
      user: user.toObject({ getters: true }),
      token: token,
    });
  } catch (error) {
    console.log(error);
    error.status = error.status || 400;
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findByCredentials(req.body);
    const token = await user.generateAuthToken();
    res.json({
      user: user.toObject({ getters: true }),
      token,
    });
  } catch (error) {
    error.status = error.status || 400;
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    res.json({ user: req.user.toObject({ getters: true }) });
  } catch (error) {
    next(error);
  }
};

const getAllUser = async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const users = req.query.new
        ? await User.find().sort({ _id: -1 }).limit(2)
        : await User.find();
      res.json({
        users: users.map((user) => user.toObject({ getters: true })),
      });
    } else {
      throw new HttpError("You are not allowed to see all users", 403);
    }
  } catch (error) {
    next(error);
  }
};

const getUserStats = async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const data = await User.aggregate([
        {
          $project: {
            month: { $month: "$createdAt" },
            // year: { $year: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.json(data);
    }
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      throw new HttpError(
        `Invalid inputs passed! Please, check your data and try again.`,
        422
      );
    console.log(req.user._id.toString());
    if (req.user._id.toString() === req.params.id || req.user.isAdmin) {
      const updates = await updateValidation("User", req.body);
      if (updates.error) throw new HttpError(updates.error, 400);
      updates.forEach((update) => {
        req.user[update] = req.body[update];
      });
      await req.user.save();
      res.json({ updatedUser: req.user });
    } else {
      throw new HttpError("You can only update your account", 403);
    }
  } catch (error) {
    next(error);
  }
};

const deleteProfile = async (req, res, next) => {
  try {
    if (req.user._id.toString() === req.params.id || req.user.isAdmin) {
      await req.user.remove();
      res.json({ message: "Account deleted sucessfully!" });
    } else {
      throw new HttpError("You can only delete your account", 403);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  getUserById,
  getAllUser,
  getUserStats,
  updateUser,
  deleteProfile,
};
