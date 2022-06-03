const User = require("../db/model/User");
const HttpError = require("../middleware/http-error");
const { validationResult } = require("express-validator");

const signup = async (req, res, next) => {
  try {
    console.log(`signing up...`);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new HttpError(
        `Invalid username/email or password passed! Please, check your inputs and try it again.`,
        422
      );
      throw error;
    }

    const { email, username } = req.body;
    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });
    if (existingEmail || existingUsername) {
      const error = new HttpError(
        `Username or email has existed. Please choose a new one!`,
        400
      );
      throw error;
    }
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

module.exports = {
  signup,
};
