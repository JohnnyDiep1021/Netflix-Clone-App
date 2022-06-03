const usersRouter = require("express").Router();
const { check } = require("express-validator");

const auth = require("../../middleware/auth");
const User = require("../../db/model/User");
const usersController = require("../../controllers/users-controller");

// SIGNUP a new account
usersRouter.post(
  "/auth/signup",
  [
    check("username").not().isEmpty(),
    check("email").not().isEmpty().isEmail(),
    check("password").not().isEmpty().isStrongPassword(),
  ],
  usersController.signup
);

module.exports = usersRouter;
