const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(val) {
        if (!validator.isEmail(val)) {
          throw new Error(`Email is invalid. Try again!`);
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    watchList: {
      type: Array,
      default: [],
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString(), isAdmin: user.isAdmin },
    process.env.JWT_KEY,
    {
      expiresIn: "60000",
    }
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return { token, expIn: +jwt.decode(token).exp * 1000 };
};
UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};
UserSchema.statics.findByCredentials = async function ({
  password,
  username,
} = {}) {
  try {
    if (!username || !password) {
      throw Error(`Email/ username and password are required to login!`);
    }
    let user = await User.findOne({ email: username });
    if (!user) user = await User.findOne({ username });
    if (!user) {
      throw Error(
        `Sorry, we can't find your account with this email/ username.`
      );
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched)
      throw Error(`Your email/ username or password is incorrect!`);

    return user;
  } catch (error) {
    throw error;
  }
};
UserSchema.statics.getProperty = async function () {
  return Object.keys(this.schema.obj);
};
UserSchema.pre("save", async function (next) {
  const user = this;

  // users changed new password
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 12);
    console.log(`New password saved!`);
  }

  next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
