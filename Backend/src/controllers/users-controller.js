const lodash = require("lodash");
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

const User = require("../db/model/User");

const HttpError = require("../utils/http-error");
const { updateValidation } = require("../utils/utils");
const { validationResult } = require("express-validator");

const signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      throw new HttpError(`Invalid username/email or password passed!`, 422);

    const { email, username } = req.body;
    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });
    if (existingEmail || existingUsername)
      throw new HttpError(
        `Username/ email has existed! Please choose a new one.`,
        400
      );

    const user = new User({ ...req.body });
    await user.save();
    const token = await user.generateAuthToken();
    console.log(`Signing up successfully,`, user);
    res.status(201).json({
      user: user.toObject({ getters: true }),
      token,
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

const logout = async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.json({ message: `Logging out sucessfully!` });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const logoutAll = async (req, res, next) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.json({ message: "Logging out all devices sucessfully!" });
  } catch (error) {
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
      let users;
      if (req.query.page !== undefined) {
        const currentPage = req.query.page || 1;
        const perPage = 5;
        let totalUsers;
        totalUsers = await User.find().countDocuments();
        users = await User.find()
          .skip((currentPage - 1) * perPage)
          .limit(perPage);
        res.json({
          users: users.map((user) => user.toObject({ getters: true })),
          totalUsers,
        });
      } else {
        const users = await User.find();
        res.json({
          users: users.map((user) => user.toObject({ getters: true })),
        });
      }
    } else {
      throw new HttpError("You are not authorized to see all users data", 403);
    }
  } catch (error) {
    next(error);
  }
};

const getMonthlyStats = async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const monthlyData = await User.aggregate([
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
        {
          $sort: { _id: 1 },
        },
      ]);
      // console.log(monthlyData);
      res.json({
        monthlyStats: monthlyData,
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getRegisterStats = async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const membershipData = await User.aggregate([
        {
          $project: {
            membership: 1,
          },
        },
        {
          $group: {
            _id: "$membership",
            total: { $sum: 1 },
          },
        },
      ]);
      // console.log(membershipData);
      res.json({
        membershipStats: membershipData,
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty())
      throw new HttpError(
        `Invalid inputs passed! Please, check your data and try again.`,
        422
      );
    let id;
    if (req.body.id) {
      id = req.body.id;
      delete req.body.id;
    }
    if (req.user._id.toString() === req.params.id) {
      const updates = await updateValidation("User", req.body);
      if (updates.error) throw new HttpError(updates.error, 400);
      updates.forEach((update) => {
        req.user[update] = req.body[update];
      });
      await req.user.save();
      res.json({ updatedUser: req.user });
    } else if (req.user.isAdmin) {
      const updates = await updateValidation("User", req.body);
      if (updates.error) throw new HttpError(updates.error, 400);
      const user = await User.findById(id);
      updates.forEach((update) => {
        user[update] = req.body[update];
      });
      await user.save();
      res.json({ updatedUser: user });
    } else {
      throw new HttpError("You can only update your account", 403);
    }
  } catch (error) {
    next(error);
  }
};

const getWatchList = async (req, res, next) => {
  try {
    res.json({ watchList: req.user.watchList });
  } catch (error) {
    next(error);
  }
};

const addWatchList = async (req, res, next) => {
  try {
    const isMovieExisted = req.user.watchList.some(
      (movieId) => movieId === req.body.movie
    );
    if (isMovieExisted)
      return res.json({
        movieIsExisted: isMovieExisted,
        message: `movie existed on the watch list!`,
      });
    req.user.watchList.push(req.body.movie);
    await req.user.save();
    console.log(req.user.watchList);
    res.json({ watchList: req.user.watchList });
  } catch (error) {
    next(error);
  }
};

const processPayment = async (req, res, next) => {
  try {
    let { product, token: stripeToken } = req.body;
    // a key keep track the payment process and ensure customers won't be charged twice
    const idempontencyKey = req.user._id.toString();
    const newCustomer = await stripe.customers.create({
      email: stripeToken.email,
      source: stripeToken.id,
    });
    console.log(newCustomer);

    const payment = await stripe.charges.create(
      {
        amount: product.price * 100,
        currency: "usd",
        customer: newCustomer.id,
        receipt_email: stripeToken.email,
        description: product.name,
        // shipping: {
        //   name: stripeToken.card.name,
        //   address: {
        //     country: stripeToken.card.address_country,
        //   },
        // },
      },
      { idempontencyKey }
    );
    res.status(200).json({ msg: `Paid successfully`, payment });
  } catch (error) {
    next(error);
  }
};

const removeWatchList = async (req, res, next) => {
  try {
    const isMovieExisted = req.user.watchList.some(
      (movieId) => movieId === req.body.movie
    );
    if (!isMovieExisted)
      return res.json({
        movieIsExisted: !isMovieExisted,
        message: `No movie was found to remove!`,
      });
    req.user.watchList = req.user.watchList.filter(
      (movieId) => movieId !== req.body.movie
    );
    await req.user.save();
    res.json({ watchList: req.user.watchList });
  } catch (error) {
    next(error);
  }
};

const deleteProfile = async (req, res, next) => {
  try {
    if (req.user._id.toString() === req.params.id && !req.user.isAdmin) {
      await req.user.remove();
      res.json({ message: "Account deleted sucessfully!", isDeleted: true });
    } else if (req.user.isAdmin) {
      const deletedUser = await User.deleteOne({ _id: req.params.id });
      console.log(deletedUser);
      if (deletedUser.deletedCount > 0) {
        res.json({
          message: "Account deleted sucessfully!",
          isDeleted: !!deletedUser.deletedCount,
        });
      }
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
  logout,
  logoutAll,
  getUserById,
  getAllUser,
  getMonthlyStats,
  getRegisterStats,
  updateUser,
  processPayment,
  getWatchList,
  addWatchList,
  removeWatchList,
  deleteProfile,
};
