const userRouter = require("express").Router();
const { check } = require("express-validator");

const auth = require("../../middleware/auth");
const usersController = require("../../controllers/users-controller");

// SIGNUP
userRouter.post(
  "/auth/signup",
  [
    check("username").isLength({ min: 6, max: 36 }),
    check("email").isEmail(),
    check("password").isStrongPassword(),
  ],
  usersController.signup
);

// LOGIN
userRouter.post("/auth/login", usersController.login);

// GET USER PROFILE
userRouter.get("/me", auth, usersController.getUserById);

// GET ALL USERS
userRouter.get("/", auth, usersController.getAllUser);

// GET USER STATS
userRouter.get("/stats", auth, usersController.getUserStats);
// UPDATE
userRouter.patch(
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
userRouter.delete("/:id", auth, usersController.deleteProfile);
module.exports = userRouter;
