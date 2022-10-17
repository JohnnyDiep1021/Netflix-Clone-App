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

// LOGOUT
userRouter.post("/logout", auth, usersController.logout);

// LOGOUT ALL USER
userRouter.post("/logoutAll", auth, usersController.logoutAll);

// GET USER PROFILE
userRouter.get("/me", auth, usersController.getUserById);

// GET ALL USERS
userRouter.get("/", auth, usersController.getAllUser);

// GET USER STATS
userRouter.get("/stats", auth, usersController.getUserStats);

// GET MOVIE FROM WATCH LIST
userRouter.get("/watchlist", auth, usersController.getWatchList);

// ADD MOVIE TO WATCH LIST
userRouter.patch("/watchlist/add", auth, usersController.addWatchList);

// REMOVE MOVIE FROM WATCH LIST
userRouter.patch("/watchlist/remove", auth, usersController.removeWatchList);

// UPDATE
userRouter.patch(
  "/:id",
  auth,
  [
    check("email").isEmail(),
    check("username").isLength({ min: 6 }),
    check("password").isStrongPassword(),
    check("fname").isLength({ max: 64 }),
    check("lname").isLength({ max: 64 }),
    check("bio").isLength({ max: 256 }),
  ],
  usersController.updateUser
);

// DELETE
userRouter.delete("/:id", auth, usersController.deleteProfile);
module.exports = userRouter;
