const usersRouter = require("express").Router();
const { check } = require("express-validator");

const auth = require("../../middleware/auth");
const User = require("../../db/model/User");
const usersController = require("../../controllers/users-controller");

// SIGNUP
usersRouter.post(
  "/auth/signup",
  [
    check("username").isLength({ min: 6 }),
    check("email").isEmail(),
    check("password").isStrongPassword(),
  ],
  usersController.signup
);

// LOGIN
usersRouter.post("/auth/login", usersController.login);

// GET USER PROFILE
usersRouter.get("/me", auth, usersController.getUserById);

// GET ALL USERS
usersRouter.get("/", auth, usersController.getAllUser);

// GET USER STATS
usersRouter.get("/stats", auth, usersController.getUserStats);
// UPDATE
usersRouter.patch(
  "/:id",
  auth,
  [
    check("username").isLength({ min: 6 }),
    check("email").isEmail(),
    check("password").isStrongPassword(),
  ],
  usersController.updateUser
);

// DELETE
usersRouter.delete("/:id", auth, usersController.deleteProfile);
module.exports = usersRouter;
